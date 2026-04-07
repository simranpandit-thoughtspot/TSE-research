# Orchestrator Refactor Plan

## Problem Statement

The `.cursor/rules/` orchestrator has three issues:

1. **Over-loading** — 6 files (~76KB / ~19K tokens) auto-load for every prototype file, including trivial edits. This wastes context and slows responses.
2. **Keyword-only classification** — Tasks are matched by keywords ("dashboard", "modal") not intent. "Make the grid responsive" doesn't trigger layout rules even though it's a layout concern.
3. **No exploratory mode** — All work is forced through Radiant constraints. Designers can't explore custom styles, third-party libraries (shadcn, Tailwind), or new visual directions without fighting the compliance system.
4. **Figma routing gap** — Figma input is treated as a Tier 2 (full build) concern only. "Match this button to the Figma" loads the full build stack instead of just the mapping tables.

## Constraints

- **Tool-agnostic** — Rules must work for Claude Code, Cursor, and any future AI tool. Designers on forks use both.
- **Files stay in `.cursor/rules/`** — Both tools already work with this location. Moving creates migration risk and maintenance burden for zero functional gain. Cursor frontmatter is harmless to Claude Code.
- **Plan before implement** — All changes reviewed before any files are touched.

## Recommendation: 5 changes, no file moves

### Change 1: Rewrite `_orchestration.md` with tier system

**File:** `.cursor/rules/_orchestration.md`

Replace the current keyword-matching table with intent-based classification:

**Step 0 — Exploratory check:** Before classifying, check if `/explore` was invoked or if the file has an `@explore` marker. If yes, suspend Radiant constraints for that scope.

**Tier 0 — Minor tweak:** Fix a value, swap a prop, wrap with Tooltip. No rule files loaded. CLAUDE.md is sufficient. (~0KB context cost)

**Tier 1 — Moderate change:** Add a section, modal, table, or interaction to an existing prototype. Load 1-3 files matched by semantic concern:

| Concern | Rule file | Semantic triggers |
|---------|-----------|-------------------|
| Page structure | `layout-patterns.md` | Layout, sidebar, header, grid, responsive, dashboard, content areas |
| Interactive widgets | `widget-patterns.md` | Tables, alerts, toasts, menus, tooltips, empty states, filters, delete flows |
| Modals & dialogs | `modal-patterns.md` | Any overlay — confirmation, wizard, form modal, multi-step |
| State handling | `interaction-patterns.md` | Loading, skeletons, error states, disabled controls, transitions |
| Component lookup | `component-inventory.md` | Unsure which component to use, checking if one exists |
| Token deep-dive | `token-usage.md` | Full color scale, component tokens, CSS variables, anti-patterns |
| UX copy | `content-guidelines.md` | Writing buttons, titles, labels, errors, approved words |
| ThoughtSpot terms | `product-knowledge.md` | Answer, Liveboard, SpotIQ, Worksheet, Monitor |
| Figma URL | `figma-mcp-workflow.md` + `figma-component-mapping.md` | User provides figma.com URL |
| Figma screenshot | `figma-component-mapping.md` | Pasted screenshot or Figma layer references |

**Tier 2 — Full build:** New prototype from scratch or Figma. 3 mandatory files + concern-matched from Tier 1 table. (~60-100KB)

**Tier 3 — Design system:** Create/modify shared component in `src/components/`. 4 fixed files. (~50KB)

**Design mapping pipeline section:** Document that Figma input is a cross-tier concern — classify by scope not input type. Same translation steps (resolve → map → adapt → verify) at every tier, only verification depth changes.

Keep Cursor frontmatter (`globs`, `alwaysApply: true`) but write all instructions in tool-neutral language.

### Change 2: Slim auto-loading (4 files)

Remove `globs` from files that shouldn't auto-load on every `.tsx` edit. They become on-demand, loaded by the orchestrator when the tier requires them.

| File | Current | After |
|------|---------|-------|
| `component-inventory.md` | `globs: ["src/prototypes/**", "src/components/**"]` | Remove globs |
| `token-usage.md` | `globs: ["src/prototypes/**", "src/components/**"]` | Remove globs |
| `content-guidelines.md` | `globs: ["src/prototypes/**", "src/components/**"]` | Remove globs |
| `prototype-generation.md` | `globs: ["src/prototypes/**"]` | Remove globs |

**Stays auto-loaded (Cursor):**
- `_orchestration.md` — `alwaysApply: true` (the router itself)
- `compliance-checklist.md` — `alwaysApply: true` (scoped to prototype + component files)

**Context savings:** ~50KB / ~12K tokens saved for Tier 0 tasks. Tier 1 saves 30-40KB. Tier 2 loads the same total but intentionally.

### Change 3: Update CLAUDE.md

Replace the 13-row duplicate rule-loading table with a compact tier summary:

```markdown
## Rules Reference

The `.cursor/rules/` directory contains 16 rule files (~177KB).
The orchestrator (`_orchestration.md`) classifies tasks by intent:

| Tier | Intent | Rules loaded | Context cost |
|------|--------|-------------|-------------|
| Exploratory | Freeform UI, outside Radiant | None — constraints relaxed | ~0KB |
| 0 — Minor tweak | Fix a value, swap a prop | None — CLAUDE.md sufficient | ~0KB |
| 1 — Moderate | Add section, modal, table | 1-3 targeted by concern | ~15-45KB |
| 2 — Full build | New prototype or Figma page | 3-5 mandatory + concerns | ~60-100KB |
| 3 — Design system | Create/modify shared component | 4 fixed files | ~50KB |
```

No other CLAUDE.md changes needed — the existing Critical Conventions section already covers Tier 0 needs (tokens, components, layout primitives, content rules).

### Change 4: Create `/explore` skill

**File:** `.claude/commands/explore.md`

A lightweight context modifier — not a workflow or scaffold. When invoked:

1. Reads the argument to understand scope and intent
2. Adds `// @explore: <description>` marker to the relevant file
3. Instructs the orchestrator to suspend Radiant constraints for that scope

**Usage examples:**
```
/explore shadcn form components           — new exploration
/explore tailwind for the chart section   — partial, within existing prototype
/explore custom color palette             — freeform
```

**What's suspended:** Radiant component enforcement, token-only values, compliance checklist, content guidelines (for explored scope only).

**What stays:** TypeScript, accessibility basics, build must pass, file placement conventions.

**Key behaviors:**
- Works mid-conversation — can relax rules for a specific part while the rest stays Radiant
- Whole-file or partial scope — `@explore` marker on a file = whole file, user saying "just the sidebar" = partial
- Not restrictive — it removes constraints, doesn't add new ones
- Radiant components can still be used alongside custom code (partial adoption is fine)

### Change 5: Test matrix

**File:** `docs/orchestration-test-matrix.md`

Validate the tier system against 15+ scenarios across all tiers plus edge cases:
- Tier 0: fix color, swap icon, build error, Figma color lookup
- Tier 1: add delete confirm, loading state, rewrite labels, add Figma section, make grid responsive
- Tier 2: build settings page, implement Figma, Liveboard, rebuild from screenshot
- Tier 3: new component, modify accessibility
- Edge cases: ambiguous tier, Figma URL at Tier 0, multi-concern, tier escalation
- Exploratory: new visual direction, third-party library, partial exploration, exploration within existing prototype

Save as reference for validating future orchestrator changes.

## Execution order

1. Rewrite `_orchestration.md` (Change 1) — this is the core change everything else depends on
2. Slim auto-loading (Change 2) — remove globs from 4 files
3. Update CLAUDE.md (Change 3) — update reference section
4. Create `/explore` skill (Change 4)
5. Run test matrix (Change 5) — validate all scenarios, save to docs

## What's deferred

- **Exploration → Radiant adoption path** — how to "graduate" an exploration into a Radiant prototype. Address when the pattern is established and there's a real use case.
- **Moving files out of `.cursor/rules/`** — not needed now. Both tools work with current location. Revisit if a third tool needs a different convention.
- **Merging small rule files** — some files could be combined (e.g., `figma-mcp-workflow.md` + `figma-component-mapping.md`). Low priority, defer until maintenance becomes an issue.

## Risk

- **Cursor auto-loading changes** — removing globs from 4 files means Cursor users won't get those files in context automatically. The orchestrator (which IS auto-loaded) tells them to read the files, but Cursor's rule loading is less dynamic than Claude Code's. Mitigation: the orchestrator's instructions are clear enough that Cursor's AI should follow them.
- **Exploratory mode abuse** — designers might `/explore` everything to avoid compliance. Mitigation: this is a trust-based tool for designers, not a production gate. The marker makes it visible in code review.
