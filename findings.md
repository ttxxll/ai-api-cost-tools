# Findings & Decisions

## Requirements
- Refactor model pricing data for a pure static/no-backend Next.js architecture.
- Create a strong typed `ModelPricing` interface and `MODELS_DATA` static array.
- Add a Node.js sync script that fetches LiteLLM's latest model cost JSON and extracts model pricing, context window, and prompt caching price fields.
- Replace frontend data consumers with the new typed data source while preserving UI style.
- Add a weekly GitHub Actions workflow that runs the sync and commits deterministic changes.
- Do not commit changes unless explicitly asked.

## Prior Session Requirements
- Continue the unfinished task from a previous long session.
- Use current uncommitted changes as the primary context.
- Identify remaining work, complete it, and verify locally.

## Research Findings
- Current static pricing lives in `src/lib/data/modelPricing.ts` with lowercase provider IDs, `name`, `inputPricePerMillion`, `outputPricePerMillion`, `maxOutput`, and optional `cacheHitPricePerMillion`.
- Existing calculator modules consume `getModelById` and price fields directly: `apiCost.ts`, `batchEstimator.ts`, and `budgetPlanner.ts`.
- `ModelSelector`, `ComparisonCalculator`, and many pages consume `modelPricing`/`providers` directly.
- `LiveComparisonCalculator` currently performs a client-side fetch to `/api/pricing`, which dynamically calls OpenRouter at runtime and is not compatible with the requested no-backend static data flow.
- Existing `/api/pricing` route pulls OpenRouter model data and has a small fallback list; it should be removed from the frontend path or adapted to static data only.
- LiteLLM model cost JSON relevant fields include `litellm_provider`, `max_input_tokens`, `max_output_tokens`, `input_cost_per_token`, `output_cost_per_token`, `supports_prompt_caching`, `cache_creation_input_token_cost`, and `cache_read_input_token_cost`.
- LiteLLM prices are per-token and need conversion to USD per 1M tokens by multiplying by 1,000,000.
- No `.github/workflows/*` or `scripts/*` files currently exist, so the sync script and weekly workflow will be new files.
- Package scripts currently include build/dev/start/lint and Cloudflare OpenNext commands, but no data sync command.
- Read Next.js 16 route handler docs for `/api/pricing`; `route.ts` supports returning JSON via Web Response APIs, but the target architecture should avoid a runtime route for pricing data.
- No `task_plan.md`, `progress.md`, `findings.md`, or `.planning/**/task_plan.md` existed at the start of this session.
- `session-catchup.py` ran successfully but produced no output.
- `git status --short` shows a large set of untracked website files plus a modified `src/app/page.tsx`.
- `git diff --stat` only reports tracked-file changes, currently just `src/app/page.tsx`; untracked files need explicit review.
- `src/app/page.tsx` changed `ApiCostCalculator` to include a key derived from `selectedModelId` and `customModel`, likely to force remount/reset when selected model changes.
- The untracked work appears to convert the starter app into a bilingual AI API cost tools website with calculators, SEO/PWA files, legal/support pages, Chinese pages, and an OpenRouter pricing API route.
- Shared implementation areas include `src/components/calculators`, `src/components/layout`, `src/components/seo`, and `src/lib` calculator/data/content modules.
- Potential inspection targets: App Router layout/script usage, API pricing fallback status, mismatched hard-coded model pricing copy, partial localization, duplicate/unused comparison and metadata systems.
- `npm run build` passes on Next.js 16.2.6; the `<Script>` usage in `src/app/layout.tsx` did not block production build.
- DeepSeek V4 Flash canonical data is `$0.112/$0.224` per million input/output tokens, but DeepSeek and comparison page FAQ/example copy said `$0.14/$0.28`.
- Next route handlers can return JSON responses directly; the pricing API fallback can use an HTTP 200 response while marking `success: false` so the app can display fallback data without surfacing a failed request status.

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| Keep `src/lib/data/modelPricing.ts` as a compatibility re-export | Existing imports across the app can keep working while the canonical data source moves to `modelsPricing.ts`. |
| Use LiteLLM model IDs in `litellmId` and local UI IDs in `id` | Keeps stable frontend IDs while allowing deterministic sync from upstream LiteLLM keys. |
| Replace runtime OpenRouter fetching with static LiteLLM data | User requested a no-backend static architecture, and Next build confirms `/api/pricing` can be static. |
| Keep custom model legacy price field compatibility | Existing page selection code may still pass `inputPricePerMillion`/`outputPricePerMillion`; accepting both avoids breaking UI handoff. |
| GitHub Action commits only `src/lib/data/modelsPricing.ts` | Keeps automated changes narrowly scoped to generated pricing data. |
|----------|-----------|
| Review untracked files directly | `git diff --stat` omits untracked content and most of the work appears untracked. |
| Use planning files for the resumed task | The prior session context is absent, and this task will require multiple exploration and verification steps. |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| Prior session context unavailable | Reconstruct task from current working tree and keep new planning files updated. |

## Resources
- `src/app/page.tsx`
- `package.json`

## Visual/Browser Findings
-
