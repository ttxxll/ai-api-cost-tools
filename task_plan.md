# Task Plan: LiteLLM-backed model pricing refactor

## Goal
Refactor the Next.js project's model pricing data flow for a static no-backend architecture: strong typed pricing config, deterministic LiteLLM sync script, frontend wiring to the new source, and a weekly GitHub Actions updater.

## Current Phase
Complete

## Phases

### Phase 1: Explore Current Data Flow
- [x] Inspect existing pricing data files and imports
- [x] Inspect calculators/pages/API routes that consume model pricing
- [x] Inspect scripts/package/CI setup for automation patterns
- **Status:** complete

### Phase 2: Implement Typed Pricing Source
- [x] Create or refactor `modelsPricing.ts` with `ModelPricing` and `MODELS_DATA`
- [x] Preserve model coverage needed by existing UI
- [x] Keep data suitable for future cache and mixed-route billing calculations
- **Status:** complete

### Phase 3: Add LiteLLM Sync Automation
- [x] Write a Node.js script that fetches LiteLLM model cost JSON
- [x] Normalize provider, context window, input/output, and cache pricing fields
- [x] Produce deterministic TypeScript output for the static config
- **Status:** complete

### Phase 4: Wire UI to New Data Source
- [x] Replace old pricing imports/calls with the typed static source
- [x] Preserve existing UI style and behavior
- [x] Remove or adapt obsolete runtime data dependencies if needed
- **Status:** complete

### Phase 5: Add Scheduled GitHub Action
- [x] Create a weekly workflow to run the sync script
- [x] Commit changes only when generated pricing data changes
- [x] Avoid adding deploy logic unless the repo already requires it
- **Status:** complete

### Phase 6: Verification
- [x] Run sync script and inspect generated output
- [x] Run lint/build checks
- [x] Verify key routes locally when possible
- **Status:** complete

## Key Questions
1. Where is pricing data currently stored and consumed?
2. Which model IDs must remain available for existing pages and calculators?
3. What LiteLLM JSON fields map to context window and prompt caching prices?
4. Does the repo already have a CI/deploy workflow pattern to preserve?

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| Use planning files for this refactor | The task spans data modeling, automation, frontend wiring, CI, and verification. |
| Keep the architecture static/no-backend | User explicitly requires a pure frontend static architecture. |
| Do not commit changes unless asked | Project/user instructions require explicit commit authorization. |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| Prior planning files described a completed older task | 1 | Replaced plan content with the new LiteLLM pricing refactor scope. |

## Notes
- Planning files are intentionally in the project root per the planning-with-files skill.
- Follow `AGENTS.md`: read relevant Next.js docs in `node_modules/next/dist/docs/` before changing Next.js-specific code.
