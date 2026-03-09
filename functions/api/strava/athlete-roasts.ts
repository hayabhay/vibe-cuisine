import type { Env, ScrapedAthlete } from './_types';
import { generateRoasts } from './_roast';

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const athletes = await env.STRAVA_KV.get('athletes', 'json') as ScrapedAthlete[] | null;
  if (!athletes?.length) return Response.json({});

  const nicks = await env.STRAVA_KV.get('nicknames', 'json') as Record<string, string> | null ?? {};

  const roasts = await generateRoasts({
    kv: env.STRAVA_KV,
    ai: env.AI,
    items: athletes,
    keyPrefix: 'roast:athlete:',
    getKey: a => a.firstname,
    buildDesc: a => {
      const name = nicks[a.firstname] ?? a.firstname;
      return `${name}: ${a.recent_km}km across ${a.activity_count} activities. Recent: ${a.recent_activity_names.join(', ') || 'nothing'}`;
    },
    promptAction: 'Roast this person:',
    putOptions: { expirationTtl: 86400 },
  });

  return Response.json(roasts);
};
