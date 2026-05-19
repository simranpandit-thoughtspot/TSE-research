# Spotter roadmap

Last updated: 2026-05-19 (Standalone Spotter IA rewrite initiative added; showcase Phase 1 + Phase 2 marked done; CSS aligned to ComponentDocPage conventions).

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
| Standalone Spotter | **Built (26.5.3)** — IA rewrite in progress (2026-05-19) | `src/prototypes/Spotter/` |
| Spotter Model (embedded) | **Built** (as DataModelEditor's agent loop) | `src/prototypes/DataModelEditor/` + `_agentic/` |
| Spotter Viz (embedded) | **Planned** — design pending | n/a |
| Spotter Code (embedded) | **Planned** — design pending | n/a |
| Spotter in Liveboard (future, separate from Viz) | **Documented only** — coming soon | n/a |

---

## Active initiatives

### Spotter showcase page (new)

A single library-level reference page that previews every Spotter component in one place. Today the only way to see Spotter components is to open the Spotter prototype and chat through them — many block renderers, prompt states, and shell variants stay hidden unless you hit the exact fixture that triggers them. The showcase fixes that.

**Decisions (locked):**
- Route: **`/radiant/spotter`** (sits under the Radiant section sidebar, consistent with the other `/radiant/*` pages)
- Page: **single long vertical scroll** with `<h2>` section headings and `<h3>` per component (not tabs — volume is fine in one page)
- Variants: each variant renders as its own labeled sub-card stacked vertically under the component header
- Style: static previews only, no live prop playground
- Entry points: tile on the `/radiant` home page **and** a sidebar entry inside the Radiant layout
- Scope: built components first, planned components shown as ghosted placeholders
- Includes token bumps tied to the IA rewrite (handled in the Standalone Spotter IA initiative below): `spotterLayout.chatMaxWidth` 880px → **936px**, new `spotterLayout.textMaxWidth = 844px`

**Phases:**

#### Phase 1 — Skeleton + Chat section ✅
- Created `src/pages/SpotterShowcase/` folder
- `index.tsx` — page shell with title, table of contents (anchor links), section structure
- `PreviewCard.tsx` — shared wrapper (name, path, description, variant slots, planned mode)
- Chat section: `UserBubble`, `AgentMessage` (streaming / done / done-with-feedback), `TypingIndicator`, `ReasoningBlock` (collapsed / expanded / streaming), `SpotterPrompt` (empty / filled / disabled), `QuickAction`, `QuickActionRow`
- Ghosted placeholders for Source picker, Model picker
- Route landed at **`/radiant/spotter`** (under Radiant section sidebar, consistent with the other `/radiant/*` pages)
- Tile added on `/radiant` home page (`RadiantHomePage.tsx`)
- Sidebar entry added in Radiant layout
- Status: ✅ shipped — `915ce5b` (initial) + `6df8003` (route fix) on staging (2026-05-19)

#### Phase 2 — Blocks section ✅
- Appended Blocks section to the page
- Components: `TextBlock` (short / long), `VizBlock` (line / bar / pie / table / empty), `SourcesBlock`, `FollowUpsBlock`, `RefineBlock`, `ErrorBlock`
- Ghosted placeholder for `AnswerCard` linking to its spec doc
- Visual style aligned to `ComponentDocPage.tsx` conventions (1000px container, 36px title, 20px section title, 32px card padding, 12px radius)
- Showcase root now wrapped in `SpotterChatProvider mode="canned"` so blocks that call `useSpotterChat()` (RefineBlock, FollowUpsBlock) render correctly
- Status: ✅ shipped (2026-05-19)

#### Phase 3 — Page shell section
- Append Shell section
- Components: `SpotterShell`, `SpotterLeftSide` (rail mode / panel mode), `SpotterRail` + `SpotterRailItem`, `SpotterPanel` + `SpotterPanelSection` + `SpotterPanelItem` + `SpotterPanelAction`, `SpotterWelcome` (default greeting / custom greeting), `SpotterLeftToggle`
- Ghosted placeholder for topbar variants
- Status: ⏳ planned

#### Phase 4 — Icons, Tokens
- Append Icons section: 5 Spotter-local icons (`PanelToggle`, `Bell`, `ThoughtSpotMark`, `ChartSearch`, `Orbits`) at sizes XS / S / M / L / XL
- Append Tokens section: visual swatches for `spotterGlow`, `spotterChartBg` (3 swatches), `spotterLayout.chatMaxWidth`, `spotterLayout.textMaxWidth`
- Token values themselves are bumped in the **Standalone Spotter IA rewrite** initiative (Stage A), not here — this phase only visualises them
- Status: ⏳ planned

**Each phase ships its own commit on staging**, so progress is visible and reversible if anything misbehaves. Phase 1 lays the skeleton; phases 2–4 append sections without restructuring.

---

### Standalone Spotter IA rewrite (2026-05-19)

Detailed information architecture rewrite for the **standalone** Spotter page. Today's spec captures the page's actual product shape (left pane + right pane structure, Analysts vs Chats, Settings menu, hover menus, exact widths). Documentation lands first; prototype catches up.

**Decisions (locked):**

- **Page split** — Left pane 260px (fixed) · Right pane scrollable
- **Right pane widths** — Content container **936px**, text content inside **844px**, sticky prompt bar 936px
- **Left pane sections** (top to bottom): Spotter title · Collapse/expand toggle · "+ New chat" button · **Analysts** section · **Chats** section · **Settings** button at the bottom
- **Analysts section** — Shows 2 recently used analysts + "View all >". Clicking an analyst opens its **landing page** on the right; clicking "View all >" opens the **list page** on the right
- **Chats section** — All chats sorted by recency. Clicking a chat opens it on the right
- **Hover menus**:
  - Analyst row → Edit (privilege-gated), Share, Make a copy, Delete
  - Chat row → Rename, Favorite / Star, Share, Delete
- **Right-pane states** — Chat thread (default) · Analyst landing page · Analyst list page · Settings modal overlays
- **Settings menu (6 items, 4 visual groups by divider):**
  1. **Spotter instructions** — in-page modal
  2. *(divider)*
  3. **Usage monitoring** — opens in new tab (external icon)
  4. **Admin settings** — opens in new tab (external icon)
  5. *(divider)*
  6. **Manage memory sources** — opens in new tab (external icon)
  7. **Personal memory** — inline toggle (no navigation)
  8. *(divider)*
  9. **Spotter best practices** — in-page modal
- **Terminology:** "Analyst" = custom AI agent (left-pane concept). "Data model" = data source (used by the existing prompt's model picker). Separate concepts, separate UI.
- **Streaming behaviour tightened:** while a response is generating, the reasoning is shown in a **semi-collapsed** form with the current stage upfront. Clicking expands the full trace up to the current step. After completion, collapses to a "Thought for X seconds" button.

**Stages:**

#### Stage A — Docs + tokens (Stage A first, B follows after review)
- `.cursor/rules/spotter-ia.md` — major expansion: page layout with exact widths, left panel (Analysts / Chats / Settings), right-pane states, hover menus, settings menu mapping
- `.cursor/rules/spotter-components.md` — add 7 new planned components (see Planned components summary below)
- `.cursor/rules/spotter-logic.md` — tighten ReasoningBlock semi-collapsed-while-streaming behavior
- `src/spotter/tokens.ts` — bump `spotterLayout.chatMaxWidth` 880 → 936; add `spotterLayout.textMaxWidth = 844`
- Status: ⏳ ready to start

#### Stage B — Prototype updates to match IA
- `src/prototypes/Spotter/index.tsx` — switch to new layout (widths, sections, settings button)
- Add Analysts section in `SpotterPanel` (2 recent + "View all >") with hover menu
- Add hover menu on chat items (Rename / Favorite / Share / Delete)
- Add Settings button + menu at the bottom of the left panel
- Wire up the right-pane state machine: chat thread / analyst landing / analyst list
- May require new `@spotter/page` primitives for Settings menu shell — decide during Stage B based on reusability
- Status: ⏳ blocked on Stage A

---

## Active scope

### Standalone Spotter — IA rewrite + polish

**Done:**
- ✅ Chat thread, streaming, blocks (text, viz, sources, follow-ups, refine, error)
- ✅ Welcome state v1 (blank)

**In flight (IA rewrite — 2026-05-19):**
- ⏳ Left panel structure (title, collapse, +new, Analysts, Chats, Settings)
- ⏳ Right-pane states (chat / analyst landing / analyst list / settings modals)
- ⏳ Settings menu (6 items, 4 groups, mixed modal / new tab / toggle)
- ⏳ Hover menus on chats (Rename / Favorite / Share / Delete)
- ⏳ Hover menus on analysts (Edit privilege-gated / Share / Make a copy / Delete)
- ⏳ Width bumps — `spotterLayout.chatMaxWidth` 880 → 936, new `textMaxWidth = 844`

**Welcome variants (design backlog):**
- ⏳ Welcome state — returning user (design pending — Figma reference needed)
- ⏳ Welcome state — topical / model-aware (design pending)
- ⏳ Welcome state — guided / starter questions (design pending)

**Other open:**
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

**Chat / answer surface:**
- **AnswerCard** — Figma-spec'd, still placeholder via VizBlock
- **Model picker (full)** — richer data-model selection than the prompt's inline picker (recently used, search, metadata). *Note: `Source picker` and `Model picker` previously listed separately; both referred to data-source selection — consolidating into one entry.*

**Left panel — Analysts:**
- **AnalystCard** — row item shown in the left-pane Analysts list (avatar + name + hover menu)
- **AnalystRowMenu** — hover menu for an Analyst row (Edit privilege-gated, Share, Make a copy, Delete)

**Right-pane states:**
- **AnalystLandingPage** — right-pane state when the user clicks an Analyst
- **AnalystListPage** — right-pane state when the user clicks "View all >"

**Left panel — Chats:**
- **ChatRowMenu** — hover menu for a Chat row (Rename, Favorite / Star, Share, Delete)

**Left panel — Settings:**
- **SettingsMenu** — 6-item Settings shell at the bottom of the left panel; handles modal-vs-new-tab-vs-toggle behaviour per item
- **PersonalMemoryToggle** — inline toggle row inside SettingsMenu (no navigation)

**Other surfaces:**
- **Spotter topbar variants** — light vs dark, with / without breadcrumbs
- **Spotter Viz panel components** — preview card, refine controls, commit affordance
- **Spotter Code components** — file tree, code editor wrapper, diff preview

Figma-first workflow: spec a planned component in Figma, then add a Code Connect mapping, then build.

---

## Open questions

- How does Spotter Viz hand off a viz to a Liveboard? (atomic tile commit, or batch?)
- What's the relationship between Spotter Code and any existing developer-docs prototypes? (avoid duplication)
- Should `_agentic/` legacy components be deprecated in favour of `@spotter/chat`, or kept as DME's stable entry point?
- When does dark mode for Spotter become a real requirement?
- **Spotter best practices** menu item — confirmed in-page modal (no external icon in the screenshot, matches Spotter instructions pattern). Re-confirm if behaviour changes.

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
