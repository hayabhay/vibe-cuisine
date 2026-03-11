export function fmt(meters: number) { return (meters / 1000).toFixed(1) + 'km'; }

export function fmtTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

const DEFAULT_PROMPT = `Roast each of these Strava activities. For each one, fully become a DIFFERENT iconic personality — Trump, The Rock, Arnab Goswami, Stone Cold Steve Austin, Gordon Ramsay, or similar. Use their real catchphrases and speech patterns. Be specific about the distance, time, or pace. 2-3 sentences per roast, no emojis, no formatting. Do not include the character name — just the roast.`;

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent';
const MAX_GENERATE_PER_REQUEST = 5;
const BATCH_SIZE = 5;

interface RoastConfig<T> {
  kv: KVNamespace;
  apiKey: string;
  items: T[];
  keyPrefix: string;
  getKey: (item: T) => string;
  buildDesc: (item: T) => string;
  putOptions?: KVNamespacePutOptions;
}

export async function generateRoasts<T>(config: RoastConfig<T>): Promise<Record<string, string>> {
  const { kv, apiKey, items, keyPrefix, getKey, buildDesc, putOptions } = config;

  const results = await Promise.allSettled(
    items.map(item => kv.get(`${keyPrefix}${getKey(item)}`))
  );

  const roasts: Record<string, string> = {};
  const missing: T[] = [];

  for (let i = 0; i < items.length; i++) {
    const result = results[i];
    if (result.status === 'fulfilled' && result.value) {
      roasts[getKey(items[i])] = result.value;
    } else {
      missing.push(items[i]);
    }
  }

  const toGenerate = missing.slice(0, MAX_GENERATE_PER_REQUEST);

  for (let i = 0; i < toGenerate.length; i += BATCH_SIZE) {
    const batch = toGenerate.slice(i, i + BATCH_SIZE);
    try {
      const prompt = DEFAULT_PROMPT +
        '\n\nActivities:\n' + batch.map((item, idx) => `${idx + 1}. ${buildDesc(item)}`).join('\n') +
        `\n\nRespond with exactly ${batch.length} roasts numbered 1-${batch.length}, one per line.`;

      const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 800 },
        }),
      });

      const data = await response.json() as { candidates?: { content: { parts: { text: string }[] } }[] };
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      const lines = text.split('\n').filter(l => /^\d+\./.test(l.trim()));

      for (let j = 0; j < batch.length; j++) {
        const line = lines[j];
        if (!line) continue;
        const roast = line.replace(/^\d+\.\s*/, '').trim();
        if (roast) {
          const key = getKey(batch[j]);
          roasts[key] = roast;
          await kv.put(`${keyPrefix}${key}`, roast, putOptions);
        }
      }
    } catch {
      // skip failed batches, picked up next time
    }
  }

  return roasts;
}
