---
description: Master orchestration guide for AI — determines which rule files to read and in what order for every task
globs: ["src/**/*.tsx", "src/**/*.ts", "src/**/*.css"]
alwaysApply: true
---

# Radiant Rules Orchestration

CRITICAL: Before writing ANY code for a prototype, you MUST scan the designer's request and proactively load every relevant rule file listed below. Do NOT wait for the designer to tell you which rules to use. Most prototype requests need multiple rule files loaded simultaneously.

---

## Task: Generating a Prototype

### Step 1: Scan the request and load ALL relevant rules

Read the designer's request and check EVERY row below. If the condition matches, you MUST read that rule file BEFORE writing code. Most requests match 3-5 conditions.

| Condition | Rule file to read | Examples that match |
|-----------|-------------------|---------------------|
| **Any Liveboard prototype** | `liveboard-ia.md` | **Priority 0** — IA structure, component map, mode scaffolding. Ask user about mode (View/Edit/Both) before starting. |
| **Any prototype work** | `prototype-generation.md` | Always |
| **Any prototype work** | `component-inventory.md` | Always — loaded automatically via globs |
| **Any prototype work** | `compliance-checklist.md` | Always — loaded automatically |
| Building a full page, dashboard, admin panel, settings page, or any layout with header/sidebar | `layout-patterns.md` | "build a dashboard", "create a settings page", "admin panel", any full-page UI |
| Building a table, list, alert, toast, menu, tooltip, empty state, date picker, or delete confirmation | `widget-patterns.md` | "data table", "action menu", "empty state", "toast notification", "filter list" |
| Building a modal, dialog, wizard, or confirmation prompt | `modal-patterns.md` | "settings modal", "delete confirmation", "multi-step wizard", "filter dialog" |
| Building loading states, error handling, disabled controls, or animations | `interaction-patterns.md` | "loading spinner", "error state", "disabled button with tooltip", "skeleton screen" |
| Input is a Figma URL (figma.com/design/...) | `figma-mcp-workflow.md` | Any Figma URL |
| Input is a Figma screenshot or mentions Figma layers | `figma-component-mapping.md` | Pasted screenshot, Figma layer names, "convert this Figma" |
| Prototype references ThoughtSpot features | `product-knowledge.md` | "Liveboard", "Answer", "SpotIQ", "Worksheet", "Monitor" |
| Creating a new prototype folder or registering it | `prototype-structure.md` | "create new prototype", "add to registry", organizing files |

**Common combinations — load ALL listed files:**
- "Build a dashboard with data table" → `layout-patterns.md` + `widget-patterns.md`
- "Build a settings page with a filter modal" → `layout-patterns.md` + `modal-patterns.md` + `widget-patterns.md`
- "Build a table page with action menus and delete confirmation" → `widget-patterns.md` + `modal-patterns.md`
- "Implement this Figma" → `figma-mcp-workflow.md` + `figma-component-mapping.md` + `layout-patterns.md`

### Step 2: Follow the generation workflow

After loading all relevant rules, follow `prototype-generation.md` for the step-by-step build process.

### Input-type quick reference

```
Figma URL (figma.com/design/...)
  → Read figma-mcp-workflow.md + figma-component-mapping.md
  → Then prototype-generation.md
  → MUST drill into sub-nodes when design is too large (§10)
  → MUST visually verify against Figma before declaring done (§9)

Figma screenshot (pasted image, no URL)
  → Read figma-component-mapping.md
  → Then prototype-generation.md

Text description
  → Scan for layout/widget/modal/interaction keywords (see table above)
  → Load matching rule files
  → Then prototype-generation.md
```

---

## Task: Creating or Modifying a Component

When creating or modifying a component in `src/components/`, read these files:

| File | When |
|------|------|
| `design-system.md` | **Always** — forwardRef, TypeScript, CSS Modules, accessibility |
| `token-usage.md` | **Always** — CSS variables, TypeScript token imports |
| `content-guidelines.md` | **Always** — default labels, placeholder text, error messages |
| `component-inventory.md` | **Always** — check if a component already exists before creating |

---

## Task: Writing UI Text or Labels

For any user-facing text (buttons, titles, errors, descriptions, toasts, tooltips, empty states):

| File | Scope |
|------|-------|
| `content-guidelines.md` | Hard constraints by element type — word counts, approved verbs, casing, punctuation |
| `docs/ux-writing-rules.md` | Full 79-rule source of truth — consult for edge cases |
| `product-knowledge.md` | Capitalized ThoughtSpot terms (Answer, Liveboard, SpotIQ, etc.) |

---

## How Rules Load

**Auto-loaded (always in context for prototype files):**
- `_orchestration.md` — this file (alwaysApply)
- `compliance-checklist.md` — quality gate (alwaysApply)
- `prototype-generation.md` — core workflow (globs: prototype files)
- `component-inventory.md` — 72+ components (globs: prototype + component files)
- `token-usage.md` — design tokens (globs: prototype + component files)
- `content-guidelines.md` — UX writing (globs: prototype + component files)

**On-demand (you must proactively read these based on the task — see the condition table above):**
- `layout-patterns.md` — dashboards, admin panels, AppShell, responsive grids
- `widget-patterns.md` — alerts, tables, menus, tooltips, empty states, date pickers
- `modal-patterns.md` — modal sizes M1-M4, wizards, dialogs, confirmation prompts
- `interaction-patterns.md` — loading, error, disabled, transition states
- `figma-mcp-workflow.md` — Figma URL → MCP tool-call sequence
- `figma-component-mapping.md` — Figma layers/colors/icons → Radiant tokens
- `prototype-structure.md` — folder organization, thumbnails, registry
- `product-knowledge.md` — ThoughtSpot terminology and domain context
- `design-system.md` — component creation standards (src/components/ only)

---

## Key Rules (Always Apply)

1. **Run compliance checklist** on every file before declaring done — see `compliance-checklist.md`
2. **Always use Radiant components** — check `component-inventory.md`, never use raw HTML for covered patterns
3. **Follow UX writing rules** — every UI string through `content-guidelines.md`
4. **Use mock data** — import from `../../mocks` for realistic content
5. **Local components only** — prototype-specific components go in `src/prototypes/MyPrototype/components/`, NOT in `src/components/`
6. **Use layout primitives** — `Horizontal`/`Vertical`/`View` not inline flex; `Grid`/`RdGrid` not inline grid
