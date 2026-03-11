import type { Env, Activity } from './_types';
import { generateRoasts, fmt, fmtTime } from './_roast';

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const activities = await env.STRAVA_KV.get('activities', 'json') as Activity[] | null;
  if (!activities?.length) return Response.json({});

  const nicks = await env.STRAVA_KV.get('nicknames', 'json') as Record<string, string> | null ?? {};

  const roasts = await generateRoasts({
    kv: env.STRAVA_KV,
    apiKey: env.GEMINI_API_KEY,
    items: activities,
    keyPrefix: 'roast:activity:',
    getKey: a => a.id,
    buildDesc: a => {
      const name = nicks[a.firstname] ?? a.firstname;
      const stats = [
        a.distance > 0 && fmt(a.distance),
        a.moving_time > 0 && fmtTime(a.moving_time),
        a.elevation_gain > 0 && `${Math.round(a.elevation_gain)}m elevation`,
      ].filter(Boolean).join(', ');
      return `${name} did "${a.name}" (${a.sport_type})${stats ? `, ${stats}` : ''}`;
    },
  });

  return Response.json(roasts);
};
