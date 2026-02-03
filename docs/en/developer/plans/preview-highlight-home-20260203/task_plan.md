# Task Plan: Preview Highlight Sweep (Homepage)

## Goal
Verify `hookcode-preview-highlight` can connect to the HookCode backend and highlight key homepage elements for task group `01505c19-3656-4360-8fca-7f9c2b428e1b`, then document repeatable commands.

## Current Phase
Phase 5

## Phases

### Phase 1: Requirements & Discovery
- [x] Confirm the request: highlight homepage elements to validate preview highlighting.
- [x] Identify constraints (subscriber requirement, selector semantics).
- [x] Capture discoveries in findings.md.
- **Status:** complete

### Phase 2: Planning & Structure
- [x] Define repeatable workflow: status → start (if needed) → highlight commands.
- [x] Decide scope: highlight "as many as possible" via stable CSS selectors.
- **Status:** complete

### Phase 3: Implementation
- [x] Re-try API connectivity to `HOOKCODE_API_BASE_URL`.
- [x] Call preview status and confirm instance names.
- [x] Execute highlight operations (single + multi-selector sweep).
- **Status:** complete

### Phase 4: Testing & Verification
- [x] Confirm highlight API returns success with `subscribers > 0`.
- [x] Record API responses and key commands in progress.md.
- **Status:** complete

### Phase 5: Delivery
- [x] Update changelog entry for traceability.
- [x] Commit changes directly to `main`.
- **Status:** complete

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| Highlight stable homepage selectors instead of attempting a full DOM enumeration from the backend. | The preview bridge highlights only one element per request (`querySelector`), and "as much as possible" is acceptable for this test. |

## Errors Encountered
| Error | Resolution |
|-------|------------|
| `fetch failed` when calling preview status (earlier attempt). | Re-tried after network became available; validated backend response via `curl` and the skill scripts. |
