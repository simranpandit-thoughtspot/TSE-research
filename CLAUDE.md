# RadiantPlay — Claude Code Guide

## What This Project Is

**Radiant Play** is a prototyping playground built on ThoughtSpot's **Radiant** design system. It uses Radiant components to create interactive prototypes with realistic data and interactions. It is NOT a designer-developer handoff tool, NOT a code learning platform, NOT a tutorial site, and NOT a generic React starter.

## Behavior Rules

- When asked to save or write content, write directly to the file. Do NOT create sub-tasks, todo items, or intermediate plans unless explicitly asked.
- Do NOT add unsolicited UI elements, features, badges, or enhancements not in the request. Build exactly what was asked.
- The project is branded as **Radiant Play** — not figmaradiant, RadiantPlay, or other legacy names in user-facing content.

## Workflow Preferences

When asked to save or write recommendations/analysis, write directly to files. Do NOT create Task agents or sub-tasks unless explicitly asked to. Prefer simple file writes for document deliverables.

## Code Changes

Do NOT add unsolicited UI elements, badges, tooltips, or visual embellishments that weren't requested. Make only the changes explicitly asked for.

## Git & Deployment

**If `galaxy` remote exists** (main maintainer setup): push to BOTH `origin` and `galaxy` after every commit. Verify remote URLs are current before pushing.

**If only `origin` exists** (designer fork): push to `origin` only. Do not attempt to add or push to `galaxy`.

Run `git remote -v` to determine which applies before pushing. Default deploy target is **staging**, not main — do not push to main unless explicitly asked.

## Tech Stack

Primary stack: TypeScript, HTML, Markdown, JSON. Deployment target: Vercel. When building or modifying pages, verify the build succeeds before considering the task complete.

React 19 + TypeScript + Vite 7, deployed on Vercel.

## Commands

```bash
npm run dev            # Start dev server
npm run build          # Production build
npm run build:strict   # TypeScript check + production build
npm run typecheck      # TypeScript only (--noEmit)
npm run new-prototype  # Scaffold a new prototype
```

## Path Aliases

| Alias | Path |
|-------|------|
| `@/*` | `src/*` |
| `@tokens/*` | `src/tokens/*` |
| `@components/*` | `src/components/*` |

## Project Structure

```
src/
├── components/    # 72+ shared Radiant design system components (DO NOT add prototype-specific components here)
├── prototypes/    # Per-prototype folders (each is an independent experiment)
├── tokens/        # Design tokens — colors, spacing, typography, radius, shadows, etc.
├── mocks/         # Mock data for realistic prototype content
├── pages/         # App pages / routes
├── styles/        # Global styles
├── data/          # Static data
├── utils/         # Utility functions
└── context/       # React context providers
```

## Critical Conventions

### 1. Design Tokens — NEVER hard-code values

```typescript
// Colors (3-layer: reference → system → component)
import { systemColors, referenceColors, rdComponentColors } from '@tokens/colors';

// Spacing (4px base: A=4, B=8, C=12, D=16, E=20, F=24, G=28, H=32, I=40, J=48)
import { spacing, componentSpacing } from '@tokens/spacing';

// Typography
import { fontFamily, fontSize, fontWeight, lineHeight, v2TextStyles } from '@tokens/typography';
```

Common system colors: `background-base`, `background-sunken`, `background-subtle`, `content-primary`, `content-secondary`, `content-brand`, `border-default`, `border-divider`.

In CSS Modules use CSS variables: `var(--rd-sys-color-content-primary)`, `var(--spacing-4)`, `var(--radius-md)`.

**Forbidden:** hardcoded hex (`#2770EF`), raw `rgb()`/`rgba()`, magic spacing (`17px`), hardcoded font families.

### 2. Always Use Radiant Components

Use `Button` not `<button>`, `TextInput` not `<input>`, `Table` not `<table>`, `Select` not `<select>`, etc. Check the component inventory (72+ components) before building anything custom.

Key categories: **Input** (TextInput, TextArea, SearchInput, DatePicker, Select), **Actions** (Button, Link), **Feedback** (Alert, Toast, Tooltip, LoadingIndicator), **Layout** (Tabs, Sidebar, AppShell, Accordion), **Data** (Table, Card, Chip, Avatar, Pagination, Tree), **Overlays** (Modal, ConfirmDialog, Menu, Popover).

### 3. Layout Primitives

Use `Horizontal`, `Vertical`, `View` instead of inline flex. Use `Grid`/`RdGrid` + `RdGridItem` instead of inline grid. Use `AppShell` for full-page layouts with header + sidebar.

Responsive grids: always `repeat(auto-fill, minmax(220px, 1fr))` — never fixed column counts.

### 4. Prototype-Local Components

New components for a prototype go in `src/prototypes/<Name>/components/`, **not** in `src/components/`. The shared `src/components/` directory is reserved for the design system.

### 5. Content Guidelines (ThoughtSpot style)

- **Sentence case** always (titles, buttons, labels, tooltips)
- **Buttons:** 1-2 words, imperative verbs (Create, Add, Delete, Save, Cancel, Edit, Export)
- **Labels:** max 3 words, no articles, no punctuation
- **Titles:** max 4 words; modal titles start with a verb
- **Errors:** Issue + Remedy + CTA pattern
- Capitalize ThoughtSpot features: Answer, Liveboard, SpotIQ, Worksheet, Monitor

### 6. Component Creation Standards

When creating components (even prototype-local ones):
- Use `forwardRef` for interactive components
- Extend native HTML element props
- Use CSS Modules (`.module.css`) with camelCase class names
- Always include focus styles and keyboard navigation
- Use `Icon` component with `isValidIconName()` validation

## Key Layout Constants

```
HEADER_HEIGHT = 56, SIDEBAR_WIDTH = 240, SIDEBAR_COLLAPSED = 64
CONTENT_MAX_WIDTH = 1200, MODAL_WIDTH = 600
```

## Mock Data

Import from `@/mocks` or `../../mocks` for realistic content in prototypes.

## Cursor Rules Reference

The `.cursor/rules/` directory contains 16 detailed rule files (~5,300 lines). These are not auto-loaded by Claude Code — use the table below to know when to read each one.

### When to read rule files

| Task | Read these files |
|------|-----------------|
| Building any prototype | `.cursor/rules/prototype-generation.md` + `.cursor/rules/component-inventory.md` |
| Styling / design tokens | `.cursor/rules/token-usage.md` |
| Full-page layouts, dashboards, admin panels | `.cursor/rules/layout-patterns.md` |
| Tables, alerts, menus, empty states, drag-and-drop | `.cursor/rules/widget-patterns.md` |
| Modals, wizards, confirmation dialogs | `.cursor/rules/modal-patterns.md` |
| Loading, error, disabled, transition states | `.cursor/rules/interaction-patterns.md` |
| Liveboard prototype | `.cursor/rules/liveboard-ia.md` |
| Writing UI text (buttons, labels, titles, errors) | `.cursor/rules/content-guidelines.md` |
| Creating or modifying shared components in `src/components/` | `.cursor/rules/design-system.md` |
| Prototype references ThoughtSpot features (Answer, Liveboard, SpotIQ…) | `.cursor/rules/product-knowledge.md` |
| Scaffolding a new prototype folder | `.cursor/rules/prototype-structure.md` |
| Translating Figma layers/screenshots to code | `.cursor/rules/figma-component-mapping.md` |
| Pre-ship quality check | `.cursor/rules/compliance-checklist.md` |

## Pre-Flight Checklist (Before Finishing a Prototype)

1. Zero raw HTML for elements covered by Radiant components
2. All colors/spacing/typography from tokens
3. Layout uses AppShell + layout primitives
4. Content follows sentence case + imperative verb rules
5. Responsive grids use auto-fill + minmax
6. `npm run build` passes

## Workflow

### Branching Model

| Branch | Purpose | Deploys to |
|--------|---------|------------|
| `main` | Production | radiantplay.vercel.app |
| `staging` | Preview / QA | staging-radiantplay.vercel.app |
| `feat/*`, `fix/*`, `chore/*` | Work branches | — |

### Remotes

**Designer forks** have one remote:
- `origin` — the designer's own fork (GitHub or galaxy)

**Main maintainer** has two remotes that must stay in sync:
- `origin` — GitHub (`https://github.com/faris-ts/radiantplay.git`)
- `galaxy` — ThoughtSpot (`https://galaxy.corp.thoughtspot.com/mohammed-faris/radiantplay.git`)

Always run `git remote -v` to confirm which remotes exist before pushing.

### Skills (Slash Commands)

| Command | What it does |
|---------|-------------|
| `/start <description>` | Create a work branch from main |
| `/ship [message]` | Build, commit, push to staging |
| `/release [version]` | Write changelog, prep production merge |
| `/status` | Branch, commits, uncommitted changes |
| `/sync-upstream` | Pull latest from upstream, resolve registry.ts conflict, push to fork |


### Typical Session Flow

```
/start Add filter panel to dashboard
  ... write code ...
/status                    # check progress
/ship                      # push to staging for preview
  ... iterate ...
/ship "fix: alignment"     # ship again with custom message
/release                   # prep changelog + production merge instructions
```

### Changelog

Maintained at `docs/CHANGELOG.md` using [Keep a Changelog](https://keepachangelog.com/) format. Updated via `/release`.

## Active Task Tracker

See `TODO.md` for in-progress items, known issues, and planned improvements. Check before starting work to avoid conflicts.
