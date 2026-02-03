<!-- Record findings for preview highlight sweep. docs/en/developer/plans/preview-highlight-homepage-20260203/task_plan.md preview-highlight-homepage-20260203 -->
# Findings

## Preview status
- Task group preview is available and the `app` instance is running (port assigned by HookCode preview).

## Highlight behavior
- Highlight API responds with `{ success: true, subscribers: 1 }`, indicating at least one live subscriber is connected to the SSE topic.

## Constraints
- The bridge implementation uses `document.querySelector(selector)` (first match only), so “highlight all DOM nodes” must be approximated by sweeping representative selectors (e.g., class selectors) rather than attempting to target every element instance.

## Implementation choice
- Added a small Node script that extracts `className` tokens from homepage-related components and highlights each selector sequentially (one selector per request).
