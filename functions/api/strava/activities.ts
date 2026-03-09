import type { Env } from './_types';

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const activities = await env.STRAVA_KV.get('activities', 'json') as unknown[] | null;
  return Response.json(activities ?? [], { headers: { 'Cache-Control': 'no-store' } });
};
