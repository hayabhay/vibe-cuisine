import type { Env } from './_types';

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const nicknames = await env.STRAVA_KV.get('nicknames', 'json') as Record<string, string> | null;
  return Response.json(nicknames ?? {});
};
