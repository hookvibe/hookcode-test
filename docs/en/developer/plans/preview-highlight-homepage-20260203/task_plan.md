<!-- Validate hookcode-preview-highlight by sweeping homepage selectors. docs/en/developer/plans/preview-highlight-homepage-20260203/task_plan.md preview-highlight-homepage-20260203 -->
# Task Plan: Preview highlight homepage sweep

## Goal
Verify that `hookcode-preview-highlight` can reliably highlight key homepage UI elements in the task-group preview by sending a sequence of highlight requests (one selector at a time).

## Current Phase
Completed

## Phases

### Phase 1: Discovery
- [x] Confirm preview instance name + status
- [x] Confirm highlight API returns `subscribers > 0`
- **Status:** complete

### Phase 2: Implementation (tooling)
- [x] Add a script that extracts homepage selectors (class-based) and sends highlight requests sequentially
- [x] Keep logs free of secrets (PAT redaction)
- **Status:** complete

### Phase 3: Verification
- [x] Run the script against the running preview instance
- [x] Record request results (HTTP status + subscribers) and any errors
- **Status:** complete

### Phase 4: Delivery
- [x] Update changelog entry for traceability
- [x] Commit directly to `main`
- **Status:** complete

## Key Questions
- Do highlight requests reach the preview bridge (non-zero subscribers)?
- Are selectors stable enough to cover the homepage UI without DOM introspection?
