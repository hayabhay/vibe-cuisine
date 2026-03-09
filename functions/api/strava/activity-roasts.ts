interface Env {
  STRAVA_KV: KVNamespace;
  AI: Ai;
}

interface Activity {
  id: string;
  firstname: string;
  lastname: string;
  name: string;
  sport_type: string;
  distance: number;
  moving_time: number;
  elevation_gain: number;
}

function fmt(meters: number) { return (meters / 1000).toFixed(1) + 'km'; }
function fmtTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}


export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
  const force = new URL(request.url).searchParams.has('force');

  const stored = await env.STRAVA_KV.get('club_activities', 'json') as { activities: Activity[] } | null;
  if (!stored?.activities.length) return Response.json({ roasts: {} });

  const cache = (await env.STRAVA_KV.get('activity_roasts', 'json') as Record<string, string> | null) ?? {};

  const missing = force ? stored.activities : stored.activities.filter(a => !cache[a.id]);

  if (missing.length > 0) {
    const defaultPrompt = `You are Donald Trump roasting your Bangalore friend group's Strava activities. One sentence, Trump style — superlatives, brutal observations, self-congratulation. Mix in Kannada/Hinglish. Be brief and savage.`;
    const systemPrompt = (await env.STRAVA_KV.get('roast_prompt')) ?? defaultPrompt;

    for (const a of missing) {
      try {
        const desc = `${a.firstname} ${a.lastname} did "${a.name}" (${a.sport_type}), distance: ${fmt(a.distance)}, time: ${fmtTime(a.moving_time)}, elevation: ${Math.round(a.elevation_gain)}m`;
        const response = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
          messages: [{ role: 'user', content: `${systemPrompt}\n\nRoast this activity: ${desc}\n\nRespond with ONLY the roast sentence, nothing else.` }],
          max_tokens: 150,
        }) as { response: string };

        const roast = (response.response ?? '').trim();
        if (roast) cache[a.id] = roast;
      } catch {
        // skip failed roasts, they'll get picked up next time
      }
    }
    await env.STRAVA_KV.put('activity_roasts', JSON.stringify(cache));
  }

  return Response.json({ roasts: cache });
};
