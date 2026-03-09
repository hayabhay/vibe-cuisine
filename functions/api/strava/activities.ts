interface Env {
  STRAVA_KV: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const stored = await env.STRAVA_KV.get('club_activities', 'json') as { activities: unknown[] } | null;
  if (!stored) return Response.json([]);
  return Response.json(stored.activities, { headers: { 'Cache-Control': 'no-store' } });
};
