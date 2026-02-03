# Findings & Decisions

## Requirements
- Re-try connecting to the HookCode backend and execute preview highlight operations for the homepage.
- Highlight "as many elements as possible" using `hookcode-preview-highlight` skill scripts.

## Research Findings
- The highlight API is `POST /api/task-groups/:id/preview/:instance/highlight` (via `.codex/skills/hookcode-preview-highlight/scripts/preview_highlight.mjs`).
- Successful highlight publishing returns `{ success, requestId, subscribers }`; to see a visual highlight, `subscribers` must be `> 0` (the console UI must be connected).
- The preview bridge (`hookcode-test/shared/preview-bridge.js`) uses `document.querySelector(selector)`, so a single highlight request can only target the first match of a selector; sweeping "all elements" requires a list of unique selectors (e.g., `:nth-of-type(...)`) generated from within the browser DOM.

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| Use stable class selectors to sweep the homepage (header/sidebar/main/page header/stats/filter/list). | Provides a practical "as much as possible" coverage without needing browser-side selector generation. |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| Backend appeared to listen on port 4000 but requests failed in a prior restricted environment. | Re-tried once network access was available; confirmed responses via `curl` and the skill scripts. |

## Resources
- `.codex/skills/hookcode-preview-highlight/SKILL.md`
- `.codex/skills/hookcode-preview-highlight/scripts/preview_status.mjs`
- `.codex/skills/hookcode-preview-highlight/scripts/preview_highlight.mjs`
- `hookcode-test/src/App.tsx`
- `hookcode-test/src/components/Header.tsx`
