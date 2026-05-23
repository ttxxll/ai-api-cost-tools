# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - start the Next.js development server.
- `npm run build` - create a production build.
- `npm run start` - run the production server after building.
- `npm run lint` - run ESLint with Next.js core-web-vitals and TypeScript rules.
- `npm run preview` - build with OpenNext for Cloudflare and run a local Cloudflare preview.
- `npm run deploy` - build and deploy to Cloudflare with OpenNext.
- `npm run upload` - build and upload the Cloudflare artifact.
- `npm run cf-typegen` - generate Cloudflare environment types into `cloudflare-env.d.ts`.

There is no test script configured in `package.json`; use `npm run lint` and `npm run build` for validation unless a test runner is added.

## Project architecture

This is a Next.js 16 App Router application using React 19, TypeScript, Tailwind CSS 4, and OpenNext Cloudflare deployment. The app is a bilingual AI API cost tools site for estimating token and API costs across providers.

### Routing and pages

- English routes live directly under `src/app/`; Chinese routes mirror them under `src/app/zh/`.
- Shared root metadata, fonts, Google Analytics, JSON-LD app schema, and the global dark layout are defined in `src/app/layout.tsx`.
- `src/app/zh/layout.tsx` overrides metadata for Chinese pages but otherwise passes through children.
- Each tool page generally composes `Header`, one calculator component or local calculator state, SEO FAQ content, `RelatedTools`, and `Footer`.
- Static SEO helpers are in `src/app/sitemap.ts`, `src/app/robots.ts`, and per-route `metadata`/`layout.tsx` files. When adding or renaming public pages, update the sitemap page list and bilingual alternates.

### Pricing data and calculations

- `src/lib/data/modelPricing.ts` is the stable import surface for model data; it re-exports from `src/lib/data/modelsPricing.ts`.
- `src/lib/data/modelsPricing.ts` contains manually maintained model pricing records, provider metadata, and lookup helpers such as `getModelById` and `getModelsByProvider`.
- Core calculator math lives in `src/lib/calculators/`: `apiCost.ts`, `budgetPlanner.ts`, and `batchEstimator.ts`. Components should use these helpers where available instead of duplicating formulas.
- `/api/pricing` is a static route (`src/app/api/pricing/route.ts`) that exposes the manual pricing data as JSON.

### Components and content

- Calculator UI components are under `src/components/calculators/`. `ApiCostCalculator` is the primary reusable calculator and supports provider filtering, cache-hit discounts, and custom model pricing. `ModelSelector` groups options by provider from the manual model data.
- `LiveComparisonCalculator` powers the homepage live pricing comparison with unit conversion, provider filters, sorting, and model selection handoff back to `ApiCostCalculator`.
- Layout components live in `src/components/layout/`. `Header` and `Footer` derive their tool links from `src/lib/content/tools.ts`; `LocaleDetector` sets the document `lang` based on the current route.
- `src/lib/content/tools.ts` is the canonical list of tool IDs, slugs, icons, and categories used by navigation and related-tool links. Add new tools there and provide matching English and Chinese routes.
- `src/lib/content/pages.ts` stores centralized metadata for several pages, while many existing routes also define metadata inline; keep canonical URLs and language alternates consistent across both patterns.
- `src/lib/i18n/en.json` and `src/lib/i18n/zh.json` contain dictionary content, but much page copy is currently hardcoded in each route. When changing user-facing copy, check both the mirrored route files and the dictionaries.

### Styling and deployment notes

- Global styling and Tailwind theme tokens are in `src/app/globals.css`; the site uses a dark glassmorphism style with shared classes such as `glass-card`, `gradient-text`, and background orb utilities.
- Path alias `@/*` maps to `src/*` via `tsconfig.json`.
- `next.config.ts` sets security headers and initializes `@opennextjs/cloudflare` for development. OpenNext Cloudflare configuration is in `open-next.config.ts`.
- This repository targets a newer Next.js version than many examples. Before changing framework-specific APIs or conventions, check the installed Next.js docs in `node_modules/next/dist/docs/` when available.
