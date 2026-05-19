# Spotter roadmap

Last updated: 2026-05-19.

This is the **resume-here tracker** for all Spotter work across modes. If you open one Spotter doc, open this one. It absorbs the high-level status and points to deeper references.

> Tracking convention — bump the "Last updated" date above whenever this file changes meaningfully. See `CLAUDE.md` for the docs / planning conventions.

---

## What is Spotter

Spotter is ThoughtSpot's agentic analytics product. In Radiant Play, Spotter is a **two-layer DS** (`@spotter/*`) layered on top of Radiant primitives, plus a family of prototypes that use it.

There are **four Spotter surface modes**:

| Mode | One-liner |
|---|---|
| **Standalone Spotter** | Full-page agentic chat — the canonical Spotter experience |
| **Spotter Model** (embedded) | Canvas + chat for building/refining a SpotterModel — tables, joins, columns |
| **Spotter Viz** (embedded) | Visualization agent for instant dashboards — turn business questions into trusted, decision-ready dashboards |
| **Spotter Code** (embedded) | Developer-facing code generation for embedded analytics — turn requirements into production-ready code in the IDE |

---

## Status per mode

| Mode | State | Where |
|---|---|---|
| Standalone Spotter | **Built and shipped** in 26.5.3 | `src/prototypes/Spotter/` |
| Spotter Model (embedded) | **Built** (as DataModelEditor's agent loop) | `src/prototypes/DataModelEditor/` + `_agentic/` |
| Spotter Viz (embedded) | **Planned** — design pending | n/a |
| Spotter Code (embedded) | **Planned** — design pending | n/a |
| Spotter in Liveboard (future, separate from Viz) | **Documented only** — coming soon | n/a |

---

## Active initiatives

### Spotter showcase page (new)

A single library-level reference page that previews every Spotter component in one place. Today the only way to see Spotter components is to open the Spotter prototype and chat through them — many block renderers, prompt states, and shell variants stay hidden unless you hit the exact fixture that triggers them. The showcase fixes that.

**Decisions (locked):**
- Route: **`/spotter`** (new top-level area, peer to `/radiant`)
- Page: **single long vertical scroll** with `<h2>` section headings and `<h3>` per component (not tabs — volume is fine in one page)
- Variants: each variant renders as its own labeled sub-card stacked vertically under the component header
- Style: static previews only, no live prop playground
- Entry points: tile on the `/radiant` home page **and** a sidebar entry inside the Radiant layout
- Scope: built components first, planned components shown as ghosted placeholders
- Includes one token bump: `spotterLayout.chatMaxWidth` 880px → **936px** (matches the IA spec from 2026-05-19)

**Phases:**

#### Phase 1 — Skeleton + Chat section
- Create `src/pages/SpotterShowcase/` folder
- `index.tsx` — page shell with title, table of contents (anchor links), section structure
- `PreviewCard.tsx` — shared wrapper (name, path, description, variant slots)
- Implement Chat section: `UserBubble`, `AgentMessage` (streaming / done / done-with-feedback), `TypingIndicator`, `ReasoningBlock` (collapsed / expanded / streaming), `SpotterPrompt` (empty / filled / focused / disabled), `QuickAction`, `QuickActionRow`
- Ghosted placeholders for Source picker, Model picker
- Add `/spotter` route in `src/App.tsx`
- Add tile on `/radiant` home page (`RadiantHomePage.tsx`)
- Add sidebar entry in Radiant layout
- Status: ⏳ ready to start

#### Phase 2 — Blocks section
- Append Blocks section to the page
- Components: `TextBlock` (short / long), `VizBlock` (line / bar / pie / table / empty), `SourcesBlock`, `FollowUpsBlock`, `RefineBlock`, `ErrorBlock`
- Ghosted placeholder for `AnswerCard` linking to its spec doc
- Status: ⏳ planned

#### Phase 3 — Page shell section
- Append Shell section
- Components: `SpotterShell`, `SpotterLeftSide` (rail mode / panel mode), `SpotterRail` + `SpotterRailItem`, `SpotterPanel` + `SpotterPanelSection` + `SpotterPanelItem` + `SpotterPanelAction`, `SpotterWelcome` (default greeting / custom greeting), `SpotterLeftToggle`
- Ghosted placeholder for topbar variants
- Status: ⏳ planned

#### Phase 4 — Icons, Tokens, and the layout token bump
- Append Icons section: 5 Spotter-local icons (`PanelToggle`, `Bell`, `ThoughtSpotMark`, `ChartSearch`, `Orbits`) at sizes XS / S / M / L / XL
- Append Tokens section: visual swatches for `spotterGlow`, `spotterChartBg` (3 swatches), `spotterLayout.chatMaxWidth`
- Bump `spotterLayout.chatMaxWidth` 880 → 936 in `src/spotter/tokens.ts`
- Status: ⏳ planned

**Each phase ships its own commit on staging**, so progress is visible and reversible if anything misbehaves. Phase 1 lays the skeleton; phases 2–4 append sections without restructuring.

---

## Active scope

### Standalone Spotter — polish & welcome variants
- ✅ Chat thread, streaming, blocks (text, viz, sources, follow-ups, refine, error)
- ✅ Welcome state v1 (blank)
- ⏳ Welcome state — returning user (design pending — Figma reference needed)
- ⏳ Welcome state — topical / model-aware (design pending)
- ⏳ Welcome state — guided / starter questions (design pending)
- ⏳ AnswerCard component (still placeholder via VizBlock) — spec at `docs/2026-05-07-spotter-answer-card.md`

### Spotter Model — already shipped
- ✅ Agent panel inside DataModelEditor, full agent loop
- ⏳ Migration consideration: should DataModelEditor's `_agentic` panel migrate to `@spotter/chat`? Currently uses legacy `_agentic/` components.

### Spotter Viz — design and build
- ⏳ IA design (canvas + chat for viz generation)
- ⏳ Components — viz preview card, refine controls, "commit to Liveboard" affordance
- ⏳ Behaviour — multi-tile vs single-tile per turn? preview-then-commit flow?

### Spotter Code — design and build
- ⏳ IA design (IDE-like canvas + chat for code generation)
- ⏳ Components — file tree, code editor wrapper, diff preview
- ⏳ Behaviour — agent-proposed edits with diff approval?

### Spotter in Liveboard — future
- ⏳ Entry points from Liveboard tiles / filters
- ⏳ Presentation — side-panel vs modal vs inline
- ⏳ Conversation scope — per-tile vs Liveboard-wide

---

## Planned components (not yet in code)

Tracked in detail at `.cursor/rules/spotter-components.md` → "Planned components" section. Summary:

- **AnswerCard** — Figma-spec'd, still placeholder via VizBlock
- **Source picker** — for selecting which SpotterModel to query
- **Model picker** — for switching between data models in a session
- **Spotter topbar variants** — light vs dark, with/without breadcrumbs
- **Spotter Viz panel components** — preview card, refine controls, commit affordance
- **Spotter Code components** — file tree, code editor wrapper, diff preview

Figma-first workflow: spec a planned component in Figma, then add a Code Connect mapping, then build.

---

## Open questions

- How does Spotter Viz hand off a viz to a Liveboard? (atomic tile commit, or batch?)
- What's the relationship between Spotter Code and any existing developer-docs prototypes? (avoid duplication)
- Should `_agentic/` legacy components be deprecated in favour of `@spotter/chat`, or kept as DME's stable entry point?
- When does dark mode for Spotter become a real requirement?

---

## Linked docs

**Cursor rules (auto-attach when working on Spotter files):**
- `.cursor/rules/spotter-components.md` — component inventory + planned components
- `.cursor/rules/spotter-ia.md` — standalone IA
- `.cursor/rules/spotter-agentic-chat-ia.md` — embedded chat IA (Code / Viz / Model)
- `.cursor/rules/spotter-scaffolding.md` — how to create a new Spotter prototype
- `.cursor/rules/spotter-logic.md` — state machine + streaming chunk protocol
- `.cursor/rules/spotter-response-style.md` — voice + block usage

**Reference docs:**
- `docs/2026-05-07-spotter-answer-card.md` — AnswerCard spec (unbuilt)
- `docs/2026-05-07-spotter-viz-block-behaviour.md` — VizBlock slot model and behaviour

**Archived (historical, work is done):**
- `docs/archive/2026-05-07-spotter-ds-plan.md` — original DS scaffolding plan
- `docs/archive/2026-05-07-spotter-prototype-shell.md` — shell + welcome plan
- `docs/archive/2026-05-07-spotter-chat-extraction.md` — chat extraction from DME plan

**Related (other surfaces that touch Spotter):**
- `.cursor/rules/data-model-editor-ia.md` — DataModelEditor host for Spotter Model
- `.cursor/rules/liveboard-ia.md` — Liveboard host for Spotter Viz (when built)

---

## Update protocol

When you ship or design something Spotter-related:
1. Update the "Status per mode" table if a state changed.
2. Add or remove items from "Active scope" as work is started or completed.
3. Add a planned-component entry to `spotter-components.md` (and link it from this file's Planned components summary).
4. Bump the "Last updated" date at the top.
