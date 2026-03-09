import { parseRoasts } from './_shared';

interface Env {
  STRAVA_KV: KVNamespace;
  AI: Ai;
}

interface ScrapedAthlete {
  firstname: string;
  lastname: string;
  recent_km: string;
  activity_count: number;
  recent_activity_names: string[];
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000;


export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
  const force = new URL(request.url).searchParams.has('force');

  if (!force) {
    const cached = await env.STRAVA_KV.get('roast_cache', 'json') as { roasts: Record<string, string>; generated_at: number } | null;
    if (cached && Date.now() - cached.generated_at < ONE_DAY_MS) {
      return Response.json({ roasts: cached.roasts });
    }
  }

  const scraped = await env.STRAVA_KV.get('club_scraped', 'json') as { athletes: ScrapedAthlete[] } | null;
  if (!scraped?.athletes.length) return Response.json({ roasts: {} });

  const defaultPrompt = `You are Donald Trump roasting your Bangalore friend group's Strava activity. One sentence per person, Trump style — superlatives, nicknames, self-congratulation. Mix in Kannada/Hinglish. Be brief and brutal.`;
  const systemPrompt = (await env.STRAVA_KV.get('roast_prompt')) ?? defaultPrompt;

  const athleteLines = scraped.athletes
    .map(a => `- ${a.firstname} ${a.lastname}: ${a.recent_km}km across ${a.activity_count} activities. Recent: ${a.recent_activity_names.join(', ') || 'nothing'}`)
    .join('\n');

  const prompt = `${systemPrompt}

Here's the crew's recent data:
${athleteLines}

Respond ONLY with a JSON object mapping each person's first name to their roast. Example:
{"Firstname": "roast", "Firstname2": "roast"}
No other text.`;

  const response = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 400,
  }) as { response: unknown };

  const roasts = parseRoasts(response.response);
  await env.STRAVA_KV.put('roast_cache', JSON.stringify({ roasts, generated_at: Date.now() }));

  return Response.json({ roasts });
};
