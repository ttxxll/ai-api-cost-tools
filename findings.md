# Findings & Decisions

## Requirements
- Continue the unfinished task from a previous long session.
- Use current uncommitted changes as the primary context.
- Identify remaining work, complete it, and verify locally.

## Research Findings
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
