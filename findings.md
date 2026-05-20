# Findings & Decisions

## Requirements
- Deprecate LiteLLM as the pricing source.
- Use OpenRouter official Models endpoint: `https://openrouter.ai/api/v1/models`.
- Match core model records such as `gpt-5.5`, `claude-3-5-sonnet`, and `deepseek-v4-flash`.
- Normalize OpenRouter `pricing.prompt` and `pricing.completion` by multiplying by 1,000,000 to produce per-million-token pricing.
- Normalize OpenRouter `pricing.input_cache_write` and `pricing.input_cache_read` by multiplying by 1,000,000 for `caching.writePricePerM` and `caching.readPricePerM`.
- If cache fields are zero and the model supports caching, infer cache prices using the provider's official discount ratios.
- Regenerate the strongly typed `modelsPricing.ts` static file.
- Do not commit changes unless explicitly asked.

## Research Findings
- Current repo had `scripts/sync-litellm-pricing.mjs`, not `scripts/update-prices.mjs`.
- `package.json` previously mapped `npm run sync:pricing` to `node scripts/sync-litellm-pricing.mjs`; it now maps to `node scripts/update-prices.mjs`.
- OpenRouter Models endpoint returns a top-level object with a `data` array.
- OpenRouter model objects include `id`, `name`, `context_length`, `pricing`, `top_provider`, `architecture`, and `supported_parameters`.
- OpenRouter `pricing` includes `prompt`, `completion`, `input_cache_read`, and `input_cache_write` fields.
- OpenRouter IDs observed for user examples include `openai/gpt-5.5`, `openai/gpt-5.5-pro`, `deepseek/deepseek-v4-flash`, and `deepseek/deepseek-v4-flash:free`.
- OpenRouter currently did not expose Claude 3.5 Sonnet in the fetched model list; it is optional in the script so generation continues when absent.
- OpenRouter currently exposes newer xAI Grok models (`x-ai/grok-4.3`, `x-ai/grok-4.20`) rather than the prior Grok 3 records.
- Node fetch initially failed locally with a TLS `ECONNRESET`, while PowerShell fetch with a User-Agent worked; the script includes a User-Agent header.
- `deepseek/deepseek-v4-flash` generated prompt/completion prices are `$0.112/$0.224` per 1M tokens; cache read is `$0.022` per 1M and cache write falls back to input price `$0.112` because OpenRouter does not return a cache write field.

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| Use OpenRouter as the upstream pricing source | User explicitly selected the official Models endpoint for unified cross-platform pricing. |
| Add `scripts/update-prices.mjs` and leave `sync-litellm-pricing.mjs` as a shim | Satisfies the requested script name while preserving compatibility for any external caller still using the old file. |
| Remove generated `litellmId` and add `openRouterId` | The source is no longer LiteLLM and app code can resolve models by local ID or OpenRouter ID. |
| Keep missing legacy model mappings optional | Some legacy/user-example IDs are not present in OpenRouter's current data; optional mappings avoid blocking all pricing updates. |
| Update user-visible copy from LiteLLM to OpenRouter | The UI and legal/source pages should match the actual data source. |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| Requested script name differs from repo state | Added `scripts/update-prices.mjs` and made the old script import it. |
| OpenRouter fetch failed through Node once with `ECONNRESET` | Used User-Agent header in endpoint inspection and sync script. |
| Several page files had not been read before editing | Read snippets first, then applied exact replacements. |

## Resources
- `scripts/update-prices.mjs`
- `scripts/sync-litellm-pricing.mjs`
- `src/lib/data/modelsPricing.ts`
- `src/app/api/pricing/route.ts`
- `src/lib/calculators/apiCost.ts`
