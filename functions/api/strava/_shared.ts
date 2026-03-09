export function parseRoasts(raw: unknown): Record<string, string> {
  try {
    if (typeof raw === 'object' && raw !== null) return raw as Record<string, string>;
    const match = (raw as string).match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
  } catch {}
  return {};
}
