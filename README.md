> test [hookcode][hookcode]

# HookCode Issue System (Frontend)

A minimal, modern GitHub-style issue system UI built with React + TypeScript. This repo focuses on the **frontend only** and provides a clean layout, filters, and detail preview for issues.

Test commit: this line is added to verify the commit pipeline.
Test commit 2: added on 2026-01-27 to verify direct-to-main submission.
Test commit 3: added on 2026-01-27 to continue verifying the commit pipeline.
Test commit 4: added to verify automated main-branch commit by hookcode-build-codex.
Test commit 5: added on 2026-01-27 02:19:42 +0800 to verify code submission.

- Light / Dark / System theme support
- i18n for English and Chinese
- Clear type definitions and mock data for easy API integration

## Tech Stack

- React 18
- TypeScript
- Vite

## Structure

- `src/App.tsx`: page composition and state management
- `src/components/`: UI components (header, sidebar, list, detail panel)
- `src/data/issues.ts`: mock issue data
- `src/i18n.tsx`: translations and locale helpers
- `src/styles.css`: theme tokens and UI styles

## Run (optional)

```bash
npm install
npm run dev
```

---

中文说明请查看 [README.zh.md][readme-zh]

[readme-zh]: README.zh.md
[hookcode]: https://github.com/hookvibe/hookcode
