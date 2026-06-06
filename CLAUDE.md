# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build
npm run lint     # run ESLint
```

No test suite is configured.

## Architecture

**AlignDev** is a single-page Next.js 16 app (App Router) that runs a 7-step wizard, then generates a Markdown conventions document and a `SKILL.md` for AI coding agents.

### Data flow

1. User selections live in a single **Zustand store** at [lib/wizard-store.ts](lib/wizard-store.ts), which combines `WizardState` (wizard selections) and `UIState` (current step, generation status, output strings).
2. All TypeScript types for wizard options are in [types/wizard.ts](types/wizard.ts). `DEFAULT_WIZARD_STATE` and `STEP_LABELS` (the 7 step names) live there too.
3. On the final step the store calls `startGeneration()`, which fetches live npm major versions from the internal API route (`/api/versions`), then calls `generateDocument()` and `generateSkill()` to produce plain Markdown strings stored in the Zustand state.

### Generation layer

- [lib/document-generator.ts](lib/document-generator.ts) — full team standards doc. Uses a module-level `_v: VersionMap` (set at call time) and helpers `mv(pkg, fallback)` / `pd(pkg, fallback)` to inline live package versions into the output.
- [lib/skill-generator.ts](lib/skill-generator.ts) — `SKILL.md` output using the same version helpers.
- [lib/theme-tokens.ts](lib/theme-tokens.ts) — CSS variable presets for each of the 49 theme styles.
- [lib/typography-utils.ts](lib/typography-utils.ts) — typography token maps keyed by scale (`minor-third`, `major-third`, etc.).
- [lib/wcag-utils.ts](lib/wcag-utils.ts) — WCAG contrast ratio calculations used in the preview.
- [lib/pkg-versions.ts](lib/pkg-versions.ts) — `fetchVersions()` calls `/api/versions`; falls back to `FALLBACK_VERSIONS` on failure. Update `FALLBACK_VERSIONS` here when adding new packages.

### UI structure

`WizardShell` ([components/wizard/wizard-shell.tsx](components/wizard/wizard-shell.tsx)) renders a fixed three-column layout:

- **Left** — `StepNav`: step indicator sidebar
- **Center** — `StepForm`: lazy-loads the active step component from `components/wizard/steps/`
- **Right** — `PreviewPanel`: live preview that updates on every selection change

Step components are dynamically imported in `StepForm` via the `STEP_LOADERS` array; add new steps there and in `STEP_LABELS` in `types/wizard.ts`.

### API route

`app/api/versions/route.ts` fetches the latest major version for ~30 packages from the npm registry in parallel, with 1-hour server-side revalidation. It always falls back to `FALLBACK_VERSIONS` per package.

### Tailwind / shadcn

Uses **Tailwind CSS v4** (PostCSS plugin, no `tailwind.config.js`). Tokens are defined in [app/globals.css](app/globals.css). shadcn/ui component source lives in [components/ui/](components/ui/); add new shadcn components with `npx shadcn add <component>`.
