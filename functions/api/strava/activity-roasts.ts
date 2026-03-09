import { parseRoasts } from './_shared';

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
    try {
      const defaultPrompt = `You are Donald Trump roasting your Bangalore friend group's Strava activities. One sentence per activity, Trump style — superlatives, brutal observations, self-congratulation. Mix in Kannada/Hinglish. Be brief and savage.`;
      const systemPrompt = (await env.STRAVA_KV.get('roast_prompt')) ?? defaultPrompt;

      // Batch in chunks of 10 so Llama can actually fit all roasts in its output
      const BATCH = 10;
      for (let i = 0; i < missing.length; i += BATCH) {
        const batch = missing.slice(i, i + BATCH);
        const activityLines = batch.map(a =>
          `- id: "${a.id}", athlete: "${a.firstname} ${a.lastname}", activity: "${a.name}", type: ${a.sport_type}, distance: ${fmt(a.distance)}, time: ${fmtTime(a.moving_time)}, elevation: ${Math.round(a.elevation_gain)}m`
        ).join('\n');

        const prompt = `${systemPrompt}

Roast each of these activities:
${activityLines}

Respond ONLY with a JSON object mapping each id to its roast sentence:
{"id1": "roast", "id2": "roast"}
No other text.`;

        const response = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 800,
        }) as { response: unknown };

        Object.assign(cache, parseRoasts(response.response));
      }
      await env.STRAVA_KV.put('activity_roasts', JSON.stringify(cache));
    } catch {
      // AI unavailable — return existing cache
    }
  }

  return Response.json({ roasts: cache });
};
