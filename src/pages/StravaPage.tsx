import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { House, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

function lsGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch { return null; }
}

function lsSet(key: string, data: unknown) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
}

// Clean up stale cache keys from previous approaches
try { ['sv_activities_v2', 'sv_athletes_v2', 'sv_activity_roasts'].forEach(k => localStorage.removeItem(k)); } catch {}

interface Totals {
  distance: number;
  moving_time: number;
  elevation_gain: number;
  count: number;
}

interface Athlete {
  id: number;
  firstname: string;
  lastname: string;
  profile: string;
  stats: { totals: Totals };
}

interface Activity {
  id: string;
  firstname: string;
  lastname: string;
  profile: string | null;
  name: string;
  sport_type: string;
  distance: number;
  moving_time: number;
  elevation_gain: number;
}

function fmt(meters: number) {
  return (meters / 1000).toFixed(1) + ' km';
}

function fmtTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

type Tab = 'feed' | 'leaderboard';
type Metric = 'distance' | 'elevation' | 'count';

function metricVal(totals: Totals | undefined, metric: Metric) {
  if (!totals) return 0;
  if (metric === 'distance') return totals.distance;
  if (metric === 'elevation') return totals.elevation_gain;
  return totals.count;
}

function fmtMetric(val: number, metric: Metric) {
  if (metric === 'distance') return fmt(val);
  if (metric === 'elevation') return `${Math.round(val)}m`;
  return `${val} activities`;
}

const MEDALS = ['🥇', '🥈', '🥉'];

export default function StravaPage() {
  const { isDark, toggle } = useTheme();
  const [tab, setTab] = useState<Tab>('feed');

  const [activities, setActivities] = useState<Activity[]>([]);
  const [activityRoasts, setActivityRoasts] = useState<Record<string, string>>(
    () => lsGet<Record<string, string>>('sv_act_roasts') ?? {}
  );
  const [visibleCount, setVisibleCount] = useState(20);
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [roasts, setRoasts] = useState<Record<string, string>>(
    () => lsGet<Record<string, string>>('sv_board_roasts') ?? {}
  );
  const [metric, setMetric] = useState<Metric>('distance');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch everything on load. The roast endpoints are smart — they only call
    // Llama for activities/athletes missing from KV cache. If all roasts exist
    // in KV already, it's just a cache read, no AI triggered.
    Promise.allSettled([
      fetch('/api/strava/activities').then(r => r.json()),
      fetch('/api/strava/athletes').then(r => r.json()),
      fetch('/api/strava/activity-roasts').then(r => r.json()),
      fetch('/api/strava/roast').then(r => r.json()),
    ]).then(([acts, aths, actRoastRes, boardRoastRes]) => {
      if (acts.status === 'fulfilled' && Array.isArray(acts.value)) {
        setActivities(acts.value);
      }
      if (aths.status === 'fulfilled' && Array.isArray(aths.value)) {
        setAthletes(aths.value);
      }
      if (actRoastRes.status === 'fulfilled' && actRoastRes.value) {
        const r = (actRoastRes.value as { roasts: Record<string, string> }).roasts ?? {};
        if (Object.keys(r).length > 0) {
          setActivityRoasts(prev => {
            const merged = { ...prev, ...r };
            lsSet('sv_act_roasts', merged);
            return merged;
          });
        }
      }
      if (boardRoastRes.status === 'fulfilled' && boardRoastRes.value) {
        const r = (boardRoastRes.value as { roasts: Record<string, string> }).roasts ?? {};
        if (Object.keys(r).length > 0) {
          setRoasts(prev => {
            const merged = { ...prev, ...r };
            lsSet('sv_board_roasts', merged);
            return merged;
          });
        }
      }
      setLoading(false);
    });
  }, []);


  const sorted = [...athletes].sort((a, b) => metricVal(b.stats?.totals, metric) - metricVal(a.stats?.totals, metric));
  const max = sorted[0] ? metricVal(sorted[0].stats?.totals, metric) : 1;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-white flex flex-col transition-colors">

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-white/10">
        <Link to="/" className="text-zinc-400 hover:text-zinc-700 dark:text-white/40 dark:hover:text-white/80 transition-colors">
          <House className="w-5 h-5" />
        </Link>
        <h1 className="font-mono text-lg font-bold tracking-tight">strava shata</h1>
        <button onClick={toggle} className="text-zinc-400 hover:text-zinc-700 dark:text-white/40 dark:hover:text-white/80 transition-colors">
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </header>

      {/* Tabs */}
      <div className="flex justify-center border-b border-zinc-200 dark:border-white/10 px-6">
        {(['feed', 'leaderboard'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`font-mono text-sm px-4 py-3 border-b-2 transition-colors ${
              tab === t
                ? 'border-[#fc4c02] text-zinc-900 dark:text-white'
                : 'border-transparent text-zinc-400 dark:text-white/30 hover:text-zinc-600 dark:hover:text-white/50'
            }`}>
            {t}
          </button>
        ))}
      </div>

      <main className="flex-1 px-6 py-8 max-w-2xl w-full mx-auto flex flex-col gap-6">
        {loading ? (
          <p className="font-mono text-zinc-400 dark:text-white/30 text-sm text-center py-20">loading...</p>
        ) : tab === 'feed' ? (

          /* ── Activity Feed ── */
          <div className="flex flex-col gap-6">
            {activities.length === 0 ? (
              <p className="font-mono text-zinc-400 dark:text-white/30 text-sm text-center py-20">no activities yet</p>
            ) : (
              <>
                {activities.slice(0, visibleCount).map(activity => {
                  const roast = activityRoasts[activity.id];
                  return (
                    <div key={activity.id} className="flex gap-4">
                      {/* Avatar */}
                      {activity.profile ? (
                        <img src={activity.profile} alt={activity.firstname}
                          className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-zinc-100 dark:ring-white/10 mt-0.5" />
                      ) : (
                        <div className="w-10 h-10 rounded-full shrink-0 bg-zinc-100 dark:bg-white/5 mt-0.5" />
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                          <span className="font-mono font-bold text-sm">{activity.firstname} {activity.lastname[0]}.</span>
                          <span className="font-mono text-xs text-zinc-400 dark:text-white/30 shrink-0">{activity.sport_type}</span>
                        </div>
                        <p className="font-mono text-base font-semibold mb-1">{activity.name}</p>
                        <div className="flex gap-3 mb-2">
                          {activity.distance > 0 && (
                            <span className="font-mono text-xs text-zinc-400 dark:text-white/30">{fmt(activity.distance)}</span>
                          )}
                          {activity.moving_time > 0 && (
                            <span className="font-mono text-xs text-zinc-400 dark:text-white/30">{fmtTime(activity.moving_time)}</span>
                          )}
                          {activity.elevation_gain > 0 && (
                            <span className="font-mono text-xs text-zinc-400 dark:text-white/30">↑{Math.round(activity.elevation_gain)}m</span>
                          )}
                        </div>
                        {roast && (
                          <p className="font-mono text-sm text-zinc-500 dark:text-white/50 italic leading-relaxed border-l-2 border-zinc-200 dark:border-white/10 pl-3">
                            {roast}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}

                {visibleCount < activities.length && (
                  <button onClick={() => setVisibleCount(c => c + 20)}
                    className="font-mono text-xs text-zinc-400 dark:text-white/30 hover:text-zinc-600 dark:hover:text-white/50 transition-colors w-full text-center py-2">
                    load more ({activities.length - visibleCount} remaining)
                  </button>
                )}

              </>
            )}
          </div>

        ) : (

          /* ── Leaderboard ── */
          <div className="flex flex-col gap-6">
            {/* Metric toggle */}
            <div className="flex gap-2 flex-wrap justify-end">
              {(['distance', 'elevation', 'count'] as Metric[]).map(m => (
                <button key={m} onClick={() => setMetric(m)}
                  className={`font-mono text-xs px-3 py-1.5 rounded border transition-colors ${
                    metric === m
                      ? 'border-[#fc4c02]/60 text-[#fc4c02]'
                      : 'border-zinc-200 dark:border-white/10 text-zinc-400 dark:text-white/40 hover:text-zinc-600 dark:hover:text-white/60'
                  }`}>
                  {m}
                </button>
              ))}
            </div>

            {athletes.length === 0 ? (
              <p className="font-mono text-zinc-400 dark:text-white/30 text-sm text-center py-20">no data yet</p>
            ) : (
              <>
                {sorted.map((athlete, i) => {
                  const val = metricVal(athlete.stats?.totals, metric);
                  const pct = max > 0 ? (val / max) * 100 : 0;
                  const roast = roasts[athlete.firstname];

                  return (
                    <div key={athlete.id} className="flex gap-4">
                      <div className="relative shrink-0">
                        <img src={athlete.profile} alt={athlete.firstname}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-zinc-100 dark:ring-white/10" />
                        {i < 3 && (
                          <span className="absolute -bottom-1 -right-1 text-sm leading-none">{MEDALS[i]}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between mb-1.5">
                          <span className="font-mono font-bold text-base">{athlete.firstname} {athlete.lastname[0]}.</span>
                          <span className="font-mono text-base font-semibold text-zinc-700 dark:text-white/70 ml-2 shrink-0">
                            {fmtMetric(val, metric)}
                          </span>
                        </div>

                        <div className="h-1.5 bg-zinc-100 dark:bg-white/5 rounded-full overflow-hidden mb-2">
                          <div className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${pct}%`, backgroundColor: i === 0 ? '#fc4c02' : `rgba(252,76,2,${0.5 - i * 0.05})` }} />
                        </div>

                        {roast && (
                          <p className="font-mono text-sm text-zinc-500 dark:text-white/50 italic leading-relaxed border-l-2 border-zinc-200 dark:border-white/10 pl-3">
                            {roast}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}

              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
