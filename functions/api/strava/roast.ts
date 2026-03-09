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


export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const cached = await env.STRAVA_KV.get('roast_cache', 'json') as { roasts: Record<string, string>; generated_at: number } | null;
  if (cached && Date.now() - cached.generated_at < ONE_DAY_MS) {
    return Response.json({ roasts: cached.roasts });
  }

  const scraped = await env.STRAVA_KV.get('club_scraped', 'json') as { athletes: ScrapedAthlete[] } | null;
  if (!scraped?.athletes.length) return Response.json({ roasts: {} });

  const defaultPrompt = `You are Donald Trump roasting your Bangalore friend group's Strava activity. One sentence, Trump style — superlatives, nicknames, self-congratulation. Mix in Kannada/Hinglish. Be brief and brutal.`;
  const systemPrompt = (await env.STRAVA_KV.get('roast_prompt')) ?? defaultPrompt;

  const roasts: Record<string, string> = cached?.roasts ?? {};

  for (const a of scraped.athletes) {
    if (roasts[a.firstname]) continue; // already roasted
    try {
      const desc = `${a.firstname} ${a.lastname}: ${a.recent_km}km across ${a.activity_count} activities. Recent: ${a.recent_activity_names.join(', ') || 'nothing'}`;
      const response = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
        messages: [{ role: 'user', content: `${systemPrompt}\n\nRoast this person: ${desc}\n\nRespond with ONLY the roast sentence, nothing else.` }],
        max_tokens: 150,
      }) as { response: string };

      const roast = (response.response ?? '').trim();
      if (roast) roasts[a.firstname] = roast;
    } catch {
      // skip, pick up next time
    }
  }

  await env.STRAVA_KV.put('roast_cache', JSON.stringify({ roasts, generated_at: Date.now() }));
  return Response.json({ roasts });
};
