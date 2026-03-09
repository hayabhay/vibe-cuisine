interface Env {
  STRAVA_KV: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const scraped = await env.STRAVA_KV.get('club_scraped', 'json') as { scraped_at: number; athletes: unknown[] } | null;
  if (!scraped) return Response.json([]);

  return Response.json(scraped.athletes, {
    headers: { 'Cache-Control': 'no-store' },
  });
};
