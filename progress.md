# Progress Log

## Session: 2026-05-20 OpenRouter pricing migration

### Restore and Re-scope
- **Status:** complete
- Actions taken:
  - Restored existing planning files and ran planning-with-files session catchup.
  - Replaced the completed LiteLLM plan with a new OpenRouter Models endpoint migration plan.
  - Created visible task tracking for planning, inspection, implementation, and verification.
- Files created/modified:
  - `task_plan.md`
  - `findings.md`
  - `progress.md`

### Phase 1: Inspect Current Pricing Pipeline
- **Status:** complete
- Actions taken:
  - Found `scripts/sync-litellm-pricing.mjs` as the current equivalent of the requested pricing updater.
  - Inspected generated `src/lib/data/modelsPricing.ts`, `package.json`, the weekly workflow, `/api/pricing`, and calculator custom model construction.
  - Confirmed OpenRouter's endpoint shape and key pricing fields.
- Files read/inspected:
  - `scripts/sync-litellm-pricing.mjs`
  - `src/lib/data/modelsPricing.ts`
  - `package.json`
  - `.github/workflows/sync-litellm-pricing.yml`
  - `src/app/api/pricing/route.ts`
  - `src/lib/calculators/apiCost.ts`

### Phase 2: Implement OpenRouter Models Sync
- **Status:** complete
- Actions taken:
  - Added `scripts/update-prices.mjs` to fetch OpenRouter Models with a User-Agent header.
  - Added OpenRouter ID mapping for target providers/models and optional handling for missing legacy models.
  - Converted prompt/completion/cache prices to per-million-token pricing.
  - Added cache fallback ratios per provider when cache fields are missing/zero on cache-capable models.
  - Added canonical `openRouterId` to generated records and removed `litellmId` from generated TypeScript.
  - Updated `npm run sync:pricing` to call the new script.
  - Kept `scripts/sync-litellm-pricing.mjs` as a compatibility shim.
  - Updated API route source metadata and custom-model typing compatibility.
  - Replaced user-visible LiteLLM source copy with OpenRouter copy.
- Files created/modified:
  - `scripts/update-prices.mjs`
  - `scripts/sync-litellm-pricing.mjs`
  - `package.json`
  - `src/lib/data/modelsPricing.ts`
  - `src/app/api/pricing/route.ts`
  - `src/lib/calculators/apiCost.ts`
  - English and Chinese page copy files that referenced LiteLLM.

### Phase 3: Regenerate Data
- **Status:** complete
- Actions taken:
  - Ran `npm run sync:pricing`; generated 22 OpenRouter-backed model pricing records.
  - Confirmed representative generated data includes `gpt-5.5`, `deepseek-v4-flash`, per-million prompt/completion prices, `openRouterId`, and cache read/write pricing.
  - Confirmed no `LiteLLM`, `litellm`, or `litellmId` strings remain under `src` or `scripts`.

### Phase 4: Verification
- **Status:** complete
- Actions taken:
  - Ran lint successfully.
  - Ran production build successfully.
  - Started local dev server and checked `/`, `/zh`, `/api/pricing`, `/deepseek-api-cost-calculator`, and `/ai-model-price-comparison`; all returned 200.
  - Confirmed `/api/pricing` reports `source=openrouter-static`, `count=22`, and includes `deepseek-v4-flash`.
  - Stopped the local dev server.
  - Browser UI interaction testing was not performed because no browser automation tool is available in this environment.

## Test Results
| Test | Input | Expected | Actual | Status |
|------|-------|----------|--------|--------|
| OpenRouter endpoint inspection | PowerShell `Invoke-RestMethod` with User-Agent | Returns model `data[]` | Returned target model IDs/prices | pass |
| Pricing sync | `npm run sync:pricing` | Generate OpenRouter static pricing | Synced 22 model pricing records from OpenRouter | pass |
| Stale source search | Grep `LiteLLM`, `litellm`, `litellmId` under `src`/`scripts` | No matches | No matches found | pass |
| Lint | `npm run lint` | No ESLint errors | No errors | pass |
| Build | `npm run build` | Next.js production build succeeds | Build passed; 34 app routes generated | pass |
| Local route checks | HTTP GET selected routes on localhost:3000 | 200 responses and OpenRouter pricing API metadata | All selected routes returned 200; pricing API source `openrouter-static` | pass |

## Error Log
| Timestamp | Error | Attempt | Resolution |
|-----------|-------|---------|------------|
| 2026-05-20 | Local Node fetch to OpenRouter failed with `ECONNRESET` before TLS | 1 | Retried via PowerShell with a User-Agent, which succeeded; added User-Agent to sync script. |
| 2026-05-20 | Edit refused files that had not yet been read | 1 | Read the target file snippets, then applied exact replacements. |
