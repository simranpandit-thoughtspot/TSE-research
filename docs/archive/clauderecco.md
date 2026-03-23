# Claude Recommendations — RadiantPlay Project Evaluation
_Generated: 2026-02-20_

---

## Project Summary

RadiantPlay is a designer-facing prototyping playground built on React 19, TypeScript, and Vite. It wraps ThoughtSpot's Radiant design system into a fork-ready repo so designers can build interactive prototypes using real components — aided by Cursor AI rules — and share them with developers for handoff.

The foundation is strong. The gaps are mostly around the _output_ side: there's no NPM package, no Figma sync pipeline, no Storybook, and the tool-agnostic goal is partially realized. Below are detailed recommendations ordered by priority.

---

## What's Working Well

- **3-tier token system** (Brand → Semantic → Component) directly mirrors how Figma Variables work — ideal for eventual sync
- **40+ components** with consistent patterns: forwardRef, CSS Modules, CSS custom properties, TypeScript
- **Cursor AI rules** in `.cursor/rules/` are a standout feature — they give AI the right context to generate token-compliant code without hallucinating component APIs
- **Fork workflow** with `npm run new-prototype` is smart for designer onboarding
- **Mock data system** (`src/mocks/`) is reusable and well-structured
- **`project.config.ts`** is a good idea for tracking prototype metadata per fork
- **Vercel deployment** lets stakeholders view prototypes without local setup

---

## Recommendations

---

### 1. Build an NPM Library Output
**Priority: High | Effort: Medium | Impact: Unlocks developer adoption**

The stated goal of "npm library from components" hasn't been started. Currently the project is a standalone app only. Developers can't `npm install` the components.

**What to do:**
- Add a `vite.lib.config.ts` configured in Vite library mode
- Set `build.lib` with an entry point at `src/components/index.ts`
- Configure `rollupOptions.external` to exclude React from the bundle
- Add proper `package.json` fields: `main`, `module`, `types`, `exports`
- Generate TypeScript declaration files with `vite-plugin-dts`
- Add a `build:lib` script to `package.json`
- Ensure CSS (tokens + component styles) is bundled or documented as a peer import

**Output:** Designers and developers can `npm install @thoughtspot/radiant` (or similar) in any project and import components directly.

---

### 2. Make It Truly Tool-Agnostic
**Priority: High | Effort: Low | Impact: Fulfills the core stated goal**

The `.cursor/rules/` folder only works in Cursor IDE. Designers using VS Code, Claude Code, or GitHub Copilot get no AI context.

**What to do:**
- Create `CLAUDE.md` at the root — Claude Code reads this automatically for project context
- Create `.github/copilot-instructions.md` — GitHub Copilot reads this for repo-wide context
- Create `.vscode/extensions.json` recommending GitHub Copilot, Prettier, ESLint
- Create `.vscode/settings.json` with formatOnSave, default formatter
- Create a `AGENTS.md` (or `AI-CONTEXT.md`) that consolidates the key rules from `.cursor/rules/` into one file all tools can reference
- Update `README.md` with a section on using the repo in VS Code, Cursor, and Claude Code

---

### 3. Automate Figma → Token Sync
**Priority: High | Effort: Medium | Impact: Closes the Figma ↔ Code gap**

Tokens are currently hand-authored in TypeScript. When Figma Variables change, developers manually update `src/tokens/`. This breaks the single source of truth.

**What to do:**
- Adopt **Style Dictionary** as the token transformation layer
- Export tokens from Figma using the Figma Tokens plugin (tokens.json format) or the Figma Variables REST API
- Write a Style Dictionary config that transforms `tokens.json` → `src/tokens/` TypeScript files + `src/styles/tokens.css`
- Add a `sync:tokens` script that pulls from Figma and regenerates token files
- Document the full workflow in `docs/token-sync.md`

**Result:** When a designer updates a color in Figma, running `npm run sync:tokens` updates all components automatically.

---

### 4. Add Storybook for Component Documentation
**Priority: Medium | Effort: Medium | Impact: Standard dev handoff tool**

The custom `ComponentDocPage` is functional but doesn't support interactive prop editing, visual regression testing, or the accessibility audits developers expect. Storybook is the industry standard.

**What to do:**
- Install Storybook 8+ with the Vite builder (`@storybook/react-vite`)
- Write `.stories.tsx` files for every component, covering all variants, sizes, and states
- Add the `@storybook/addon-a11y` accessibility addon
- Add the `@storybook/addon-interactions` addon for interaction testing
- Add a `build:storybook` script
- Deploy Storybook to a separate Vercel project or `/storybook` subdomain
- Link from the main app's component docs pages

---

### 5. Add Component Testing
**Priority: Medium | Effort: Medium | Impact: Prevents silent regressions**

There are currently zero tests. Token or style changes can silently break component behavior with no warning.

**What to do:**
- Install `vitest`, `@testing-library/react`, `@testing-library/user-event`, `jsdom`
- Configure `vitest.config.ts` with jsdom environment
- Write baseline tests for the most-used components:
  - `Button` — all variants render, click handler fires, disabled state blocks clicks
  - `Modal` — opens/closes, focus trap works, Escape key closes
  - `TextInput` — controlled/uncontrolled, error state, disabled state
  - `Table` — renders rows, sorting works, pagination works
  - `Select` — opens dropdown, selects option, controlled value updates
- Add a `test` script and a `test:coverage` script to `package.json`
- Add a GitHub Actions workflow to run tests on every PR

---

### 6. Wire `project.config.ts` into the App UI
**Priority: Medium | Effort: Low | Impact: Better handoff experience**

`project.config.ts` contains designer name, PM, Figma link, Jira epic, and prototype status — but none of this is visible in the running app. It's documentation-only right now.

**What to do:**
- Import `project.config.ts` in `PlaygroundGallery.tsx` to show status badges on prototype cards (planning / active / ready-for-dev / handed-off)
- Add a "Project Info" drawer or panel in `PlaygroundProject.tsx` showing:
  - Designer name, PM name
  - Clickable links to Figma file, Jira epic, Confluence docs
  - Current status with color-coded badge
  - Target release
- This makes handoff context visible at the prototype URL — useful when sharing with devs/PMs

---

### 7. Build a Spec / Annotation Mode
**Priority: Medium | Effort: High | Impact: Unique handoff differentiator**

This is the biggest missing piece for developer handoff. Figma's redline/inspect panel shows spacing, tokens, and component names. The playground has no equivalent.

**What to do:**
- Add a "Spec Mode" toggle button in the prototype viewer toolbar
- When enabled, hovering any element shows an overlay panel with:
  - Component name (e.g., `Button / Primary / Large`)
  - Applied token values (color, spacing, radius, typography)
  - Computed spacing to adjacent elements
- Alternatively (simpler): add a sidebar panel showing token usage for selected components
- This is the feature that turns the playground from "prototype tool" into "handoff tool"

---

### 8. Add Error Boundaries Around Prototypes
**Priority: Low | Effort: Low | Impact: Stability as the library grows**

A broken prototype currently crashes the entire playground. As more designers add prototypes, this becomes a real risk.

**What to do:**
- Create an `ErrorBoundary` component in `src/components/`
- Wrap the lazy-loaded prototype in `PlaygroundProject.tsx` with this boundary
- Show a friendly fallback UI with the error message and a "Report Issue" link pointing to a GitHub issue template
- This is a 30-minute fix with high return as the prototype library grows

---

## Gap Summary Table

| Area | Current State | Recommended State |
|------|--------------|-------------------|
| NPM package | App only | Vite lib mode + publishable package |
| Token sync | Manual TypeScript | Style Dictionary + Figma export script |
| AI tool support | Cursor only | CLAUDE.md, Copilot instructions, AGENTS.md |
| Component docs | Custom page (read-only) | Storybook with controls + a11y |
| Testing | None | Vitest + Testing Library |
| Handoff metadata | Config file only | Visible in prototype UI |
| Spec/redline | Not implemented | Spec mode overlay |
| Error handling | None | Error boundaries |

---

## Suggested Order of Work

1. **Error boundaries** — small, immediate, protects the playground today
2. **Tool-agnostic AI context** (CLAUDE.md etc.) — low effort, high reach
3. **Wire project.config.ts to UI** — low effort, immediately visible to stakeholders
4. **NPM library build** — foundational for developer adoption
5. **Figma token sync** — closes the design ↔ code loop
6. **Storybook** — improves developer onboarding
7. **Testing** — long-term health
8. **Spec mode** — the premium handoff feature, worth doing once the rest is stable
