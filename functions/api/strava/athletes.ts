import type { Env } from './_types';

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const athletes = await env.STRAVA_KV.get('athletes', 'json') as unknown[] | null;
  return Response.json(athletes ?? [], { headers: { 'Cache-Control': 'no-store' } });
};
