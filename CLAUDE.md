# MapViz — Global Cuisines Map

## Commands
- `pnpm dev` — Start dev server (localhost:5173)
- `pnpm build` — Type-check + production build
- `pnpm preview` — Preview production build
- `pnpm lint` — ESLint

## Architecture
Single-page app: interactive SVG world map with 12 clickable culinary regions. No backend, no routing.

### Stack
Vite + React 19 + TypeScript + TailwindCSS v3 + react-simple-maps + framer-motion

### Key directories
- `src/data/` — Region definitions (`regions.ts`) and ISO country→region mapping (`countryRegionMap.ts`)
- `src/components/` — WorldMap, RegionModal, RegionTooltip, PhotoGallery, Header, Legend
- `src/hooks/` — `useMapInteraction` manages selected/hovered region state
- `src/utils/` — Helper functions for country→region lookups
- `src/types/` — TypeScript interfaces (CulinaryRegion, Dish, UnsplashImage)

### Map data
- TopoJSON from `cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json`
- Country IDs are ISO 3166-1 numeric codes (e.g., "840" = USA)
- `countryRegionMap.ts` maps ~150 country codes to 12 culinary region IDs

## Conventions
- Use `import type` for type-only imports (verbatimModuleSyntax is enabled)
- Region colors are defined in `regions.ts`, not in Tailwind config
- Dark theme: surface-900 (#0B0F19) background, surface-800 (#111827) cards
- Use pnpm (not npm)
