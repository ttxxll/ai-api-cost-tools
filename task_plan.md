# Task Plan: OpenRouter-backed model pricing sync

## Goal
Replace the deprecated LiteLLM pricing source with OpenRouter's official Models endpoint so `modelsPricing.ts` is regenerated from OpenRouter pricing fields, including prompt/completion and cache read/write prices normalized to USD per 1M tokens.

## Current Phase
Complete

## Phases

### Phase 1: Inspect Current Pricing Pipeline
- [x] Locate the requested `scripts/update-prices.mjs` or equivalent current sync script
- [x] Inspect `src/lib/data/modelsPricing.ts` type/schema and existing target model IDs
- [x] Identify package scripts/workflows that invoke pricing generation
- **Status:** complete

### Phase 2: Implement OpenRouter Models Sync
- [x] Fetch `https://openrouter.ai/api/v1/models`
- [x] Traverse OpenRouter results and match core tracked models
- [x] Convert `pricing.prompt` and `pricing.completion` to per-million prices
- [x] Read `pricing.input_cache_write` and `pricing.input_cache_read` and convert to per-million prices
- [x] Infer cache prices via provider discount ratios only when OpenRouter cache fields are zero and the model is cache-capable
- [x] Emit deterministic, strongly typed `modelsPricing.ts`
- **Status:** complete

### Phase 3: Regenerate Data
- [x] Run the pricing sync script
- [x] Inspect generated pricing for representative target models
- [x] Ensure generated output remains deterministic and compatible with current app code
- **Status:** complete

### Phase 4: Verification
- [x] Run lint/build or targeted checks practical for the change
- [x] Record any failures and resolutions
- **Status:** complete

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| Keep planning files for this migration | The task requires exploration, implementation, generation, and verification across multiple files. |
| Do not commit changes unless asked | Project/user instructions require explicit commit authorization. |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| Existing planning files described a completed LiteLLM task | 1 | Replaced plan content with the new OpenRouter migration scope. |

## Notes
- Planning files are intentionally in the project root per the planning-with-files skill.
- Follow `AGENTS.md`: read relevant Next.js docs before changing Next.js-specific code. This task is script/data focused, so no Next.js API behavior changes are planned.
