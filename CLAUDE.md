# slum vibes — a collection of silly little apps

## Vision
Personal vibe-coded project hub. Each app is a small, opinionated, fun thing — built fast, with personality. The index page is a mood board / personal homepage that reflects the vibe of the crew behind it.

## Commands
- `pnpm dev` — Start dev server (localhost:5173)
- `pnpm build` — Type-check + production build
- `pnpm preview` — Preview production build
- `python3 scripts/fetch-images.py` — Fetch Unsplash images for a batch of countries (cuisine app)

## Architecture
Multi-app site with React Router. Each app lives at its own route. Index page at `/` lists all apps.

**Previously**: single-page cuisine explorer at `vibe-cuisine.abhay.fyi` (repo: `vibe-cuisine`). Migrated to `slum-vibes` monorepo with multi-app routing. Cuisine now lives at `/cuisine`. Old domain redirects there on Cloudflare.

### Stack
Vite + React 19 + TypeScript + TailwindCSS v3 + React Router v7 + framer-motion + shadcn/ui

### Routing
- `src/main.tsx` — BrowserRouter + Routes setup, wrapped in `PasswordGate`
- `src/pages/IndexPage.tsx` — Home launcher with photo strips + app cards
- `src/pages/CuisinePage.tsx` — Route wrapper for `/cuisine`
- Add new apps as: `src/pages/NewAppPage.tsx` + route in `main.tsx` + entry in `IndexPage.tsx` apps array

### Password gate
- `src/components/PasswordGate.tsx` — wraps entire app, prompts for password on first visit
- Correct password saved to `localStorage` key `sv_pass`, checked on subsequent visits
- Password set via `VITE_SITE_PASSWORD` env var — baked into JS bundle at build time (fine for bot prevention, not true server-side security)
- If `VITE_SITE_PASSWORD` is unset, gate is skipped (safe for local dev without `.env.local`)
- Set in `.env.local` for local dev, and in Cloudflare Pages → Settings → Environment Variables for prod

### Index page (`/`)
Dark ambient homepage with dual infinite-scrolling polaroid film strips (personal photos).
- Top strip scrolls left (32s), bottom strip scrolls right (28s)
- Polaroids: white border + pb-8 for the classic polaroid look, subtle drop shadow, deterministic tilts
- Seamless loop: each strip's image list is duplicated, animation runs `-50%` translateX
- Edge fades via gradient overlays (left/right sides of each strip)
- Keyframes in `src/index.css`: `scroll-left` / `scroll-right`
- Photos live in `assets/` (originals, EXIF-stripped, scrambled filenames) and `public/vibes/` (800px web thumbnails)
- To add photos: run `python3 -c "..."` to resize to 800px longest-side → `public/vibes/`, add filename to STRIP_1 or STRIP_2 arrays in IndexPage.tsx

### Cuisine app (`/cuisine`)
- `src/App.tsx` — Root cuisine component
- `src/data/countries.ts` — 158 countries, each with description, keyIngredients, signatureDishes, images, funFact
- `src/data/countryRegionMap.ts` — ISO numeric country code → culinary region ID
- `src/data/regions.ts` — 12 culinary regions with name and color
- `src/components/WorldMap.tsx` — SVG map via react-simple-maps, geoNaturalEarth1 projection
- `src/components/RegionModal.tsx` — Country detail modal (dishes, ingredients, gallery, fun fact)
- `src/components/Sidebar.tsx` — Left drawer with search + region-grouped country list
- `src/components/Header.tsx` — Title bar with sidebar toggle (left) and theme toggle (right)
- `src/hooks/useMapInteraction.ts` — selected/hovered country state
- `src/hooks/useScrollDrag.ts` — drag-to-pan on the map container
- `src/hooks/useTheme.ts` — dark/light mode with localStorage persistence

### Map data (cuisine)
- TopoJSON from `cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json`
- Country IDs are ISO 3166-1 numeric codes (e.g. `'840'` = USA)
- Map fills use `withAlpha(hex, alpha)` over a `var(--ocean)` SVG rect background

### Images (cuisine)
- Stored as flat `images[]` on each country (up to 25 per country)
- Fetched via Unsplash API (`"{country} food"` query, 25 results)
- `scripts/fetch-images.py` handles batch fetching — update `BATCH` dict and run
- 32 countries still have no images (low Unsplash coverage for obscure nations)
- Gallery hidden automatically when `images.length === 0`

### Strava app (`/strava`)
- `src/pages/StravaPage.tsx` — activity feed (primary) + leaderboard tabs
- `functions/api/strava/_types.ts` — shared `Env`, `Activity`, `ScrapedAthlete` interfaces
- `functions/api/strava/_roast.ts` — shared `generateRoasts` helper (parallel KV read → AI fill → write)
- `functions/api/strava/activities.ts` — returns `activities` KV (Activity[])
- `functions/api/strava/athletes.ts` — returns `athletes` KV (Athlete[])
- `functions/api/strava/activity-roasts.ts` — per-activity AI roasts (Record<string, string>)
- `functions/api/strava/athlete-roasts.ts` — per-person AI roasts, 24h TTL (Record<string, string>)
- `functions/api/strava/nicknames.ts` — returns `nicknames` KV (Record<firstname, nickname>)
- `scripts/sync-strava-club.mjs` — daily sync: fetches club members + activities, writes KV
- `.github/workflows/sync-strava.yml` — cron at 6am UTC, runs sync script

**Data flow:** No OAuth connect flow. One account (athlete `199191837`) is pre-authorized.
GitHub Actions syncs daily using stored tokens + Strava club API (club `1954938`).
Frontend fetches fresh from KV on each load (no localStorage caching).

**KV keys:**
- `athlete:{id}` — stored OAuth token for the sync account (e.g. `athlete:199191837`)
- `athletes` — `[...athletes array...]` — leaderboard data (overwritten daily by sync)
- `activities` — `[...activities array...]` — full activity list (up to 600, overwritten daily)
- `roast:activity:{activityId}` — plain roast string per activity (immutable)
- `roast:athlete:{firstname}` — plain roast string per person (24h TTL via KV expiration)
- `nicknames` — `{"Swaroop":"Shanda Swa",...}` — display names for UI + roast descriptions
- `roast_prompt` — optional custom system prompt (shared by both roast endpoints)

**Cloudflare bindings required** (set in Pages project settings):
- KV namespace: `STRAVA_KV` (id: `b3039d030a994346bb7b165dcbd86140`)
- Env vars: `STRAVA_CLIENT_ID`, `STRAVA_CLIENT_SECRET`, `GEMINI_API_KEY`

**Local dev:**
- `pnpm dev:full` — vite watch + wrangler pages dev on localhost:8788
- Seed local KV before testing: `LOCAL=1 STRAVA_CLUB_ID=1954938 STRAVA_ATHLETE_ID=199191837 node scripts/sync-strava-club.mjs`
- CF Workers AI returns 502 in local dev — roasts won't generate locally, test on deployed site
- To give a collaborator KV-only Cloudflare access: dash.cloudflare.com → My Profile → API Tokens → Create Custom Token → Permissions: `Account: Workers KV Storage: Edit` (scoped to specific account). Share the token string — they add `CLOUDFLARE_API_TOKEN=xxx` to their `.env.local`. Edit permission covers read.

**GitHub Actions secrets required:** `CF_API_TOKEN`, `STRAVA_CLIENT_ID`, `STRAVA_CLIENT_SECRET`
- `CF_API_TOKEN` — create at dash.cloudflare.com → API Tokens → "Edit Cloudflare Workers" template
- Wrangler in CI reads it as `CLOUDFLARE_API_TOKEN` env var automatically

**Useful KV commands:**
```bash
# Seed local KV for dev
LOCAL=1 STRAVA_CLUB_ID=1954938 STRAVA_ATHLETE_ID=199191837 node scripts/sync-strava-club.mjs
# Seed remote KV manually (same as GitHub Actions)
STRAVA_CLUB_ID=1954938 STRAVA_ATHLETE_ID=199191837 node scripts/sync-strava-club.mjs
# Set a custom roast prompt
npx wrangler kv key put --remote --namespace-id=b3039d030a994346bb7b165dcbd86140 roast_prompt "your prompt"
# List roast keys
npx wrangler kv key list --remote --namespace-id=b3039d030a994346bb7b165dcbd86140 --prefix=roast:
# Purge all cached roasts (to regenerate with new prompt)
npx wrangler kv key list --remote --namespace-id=b3039d030a994346bb7b165dcbd86140 --prefix=roast: | grep -o '"roast:[^"]*"' | sed 's/"//g' | while read key; do npx wrangler kv key delete --remote --namespace-id=b3039d030a994346bb7b165dcbd86140 "$key"; done
# Update nicknames
npx wrangler kv key put --remote --namespace-id=b3039d030a994346bb7b165dcbd86140 nicknames '{"Swaroop":"Shanda Swa","Deepak":"Thulla Deepak","Pradeep":"Penga Catty","Paneendra":"Shani Pani","Nishchit":"Bewarsi Bolar","Manjunath":"Mental Manja","Abhay":"Cool Abhay","Pramod":"Poli Pammi"}'
# List all KV keys
npx wrangler kv key list --remote --namespace-id=b3039d030a994346bb7b165dcbd86140
```

**AI model:** `gemini-2.5-flash-lite` via Google AI Studio (free tier, 1500 req/day). API key stored as `GEMINI_API_KEY` env var in Cloudflare Pages. Get/rotate keys at aistudio.google.com.

**Roast generation:** Generates roasts in batches of 5 using Gemini, capped at 5 per request to avoid timeout. Each batch uses a single prompt asking for different iconic personalities (Trump, The Rock, Arnab Goswami, Stone Cold, Ramsay etc). Roasts cached indefinitely in KV per activity, 24h TTL per athlete. Endpoint only generates for missing keys. Nicknames passed in descriptions so roasts use them naturally.

**Strava API gotchas:**
- Club activities (`/clubs/{id}/activities`) return `ClubActivity` — no `start_date`, no athlete ID, lastname truncated to initial (e.g. `"K."`)
- Match activities to members by `firstname + lastname[0]` — build a `Map` for O(n) lookup, not O(n×m) filter
- Sandbox limit (1 connected athlete) bypassed by using club endpoints with one pre-authorized member account

**Wrangler gotchas:**
- `wrangler pages dev` does NOT support `--remote` flag (v4) — local KV is always a simulation
- `wrangler kv key get/put` without `--remote` targets local simulation, not production — always pass `--remote` for prod

### Deployment
- Cloudflare Pages: build command `pnpm build`, output dir `dist`, install command `pnpm install`
- Repo: https://github.com/hayabhay/slum-vibes
- Live: https://slum-vibes.abhay.fyi
- Cuisine was previously at `vibe-cuisine.abhay.fyi` — reroute to `/cuisine` on Cloudflare

## Crew
The main developer is Abhay (hayabhay). Collaborators and their nicknames:
- Pradeep → **Penga Catty** (also goes by Sakkat Catty, Gatti Catty — he keeps trying to rebrand)
- Deepak → Thulla Deepak
- Swaroop → Shanda Swa
- Paneendra → Shani Pani
- Nishchit → Bewarsi Bolar
- Manjunath → Mental Manja
- Pramod → Poli Pammi

**At the start of every session, run `git config user.name` and use the result to identify who you're talking to. Use their nickname from the list above automatically — no need to ask.** Pradeep (`pradeep sadashiv` / `Psadashiv`) should be addressed as Penga Catty.

## Conventions
- Use `import type` for type-only imports (verbatimModuleSyntax is enabled)
- Package manager: pnpm (not npm)
- Region colors defined in `regions.ts`
- Ocean color shared via CSS var `--ocean` between header bg and SVG rect
- `[&_svg]:size-auto` needed on Button when overriding icon size (shadcn forces `size-4` on all SVGs)
- Personal photos: always EXIF-strip and scramble filenames before committing (see assets/ workflow above)
