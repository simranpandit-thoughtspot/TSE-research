---
description: Information architecture for the standalone Spotter prototype — the full-page agentic chat surface. Covers welcome states, chat thread, sticky prompt, left panel, header. Pairs with spotter-components.md, spotter-logic.md, spotter-response-style.md.
globs: ["src/prototypes/Spotter/**/*", "src/prototypes/Spotter*/**/*"]
alwaysApply: false
---

# Spotter — Information Architecture (standalone)

> Standalone Spotter is the **full-page agentic chat** at `src/prototypes/Spotter/`. For the embedded agentic chat used inside Spotter Model / Spotter Viz / Spotter Code, see `spotter-agentic-chat-ia.md`. For the component inventory, see `spotter-components.md`.

Last updated: 2026-05-18.

---

## Page layout

```
GlobalHeader (light theme — used by Spotter)
SpotterShell
├── SpotterLeftSide                    ← collapsible: 64px rail ↔ 260px panel
│   ├── SpotterLeftToggle              ← width-toggle pill (rail/panel)
│   └── SpotterRail | SpotterPanel     ← varies by mode
└── Canvas                             ← chat thread OR welcome
    └── SpotterPrompt                  ← sticky bottom, full-width, gradient-on-focus
```

The shell is built once. The canvas swaps between **welcome state** and **chat-active state** based on whether `state.messages.length === 0`.

---

## Welcome states

A "welcome state" is what the canvas shows before any user prompt is submitted. Spotter currently has one production variant — others are catalogued here as design lands. Add a new sub-section when you bring a new variant from Figma; include a short description, key elements, and a screenshot link.

### 1. Blank (default — current production)

The "first prompt" hero. No history, no model preselected, full attention on the prompt.

**Elements:**
- Centred hero copy — "Welcome to Spotter" / "Ask anything about your data"
- Radial brand glow behind the hero (`spotterGlow` token)
- Sticky `SpotterPrompt` at bottom (chat input)
- Optional `QuickActionRow` with 2–4 starter prompts (e.g., "Show me total sales by month")

**When to use:** First-time user, after `clear()`, anonymous session.

### 2. Returning (planned)

Shows recent chats + prompt. Designed for users who have prior sessions.

**Elements (planned):**
- "Welcome back, <name>"
- Recent chats list (clickable to resume)
- Sticky prompt at bottom

**Status:** Design pending. Add Figma reference here when available.

### 3. Topical (planned)

Pre-seeded with a topic / dataset context. Used when a user arrives via a deep link or model selection.

**Elements (planned):**
- "Welcome to <model name>" header
- Suggested questions specific to that model
- Sticky prompt

**Status:** Design pending.

### 4. Guided / starter questions (planned)

Hero with pre-suggested questions as chips. Variation of Blank with stronger prompting.

**Status:** Design pending.

> When a new welcome variant is brought from Figma, add a section above with: name, when-to-use, elements, screenshot link, and any data dependencies.

---

## Chat-active state

When `state.messages.length > 0`, the canvas swaps to the thread view.

```
ChatThread (scrolls)
├── MessageRow (per message — dispatches role)
│   ├── UserBubble    (role: 'user')
│   └── AgentMessage  (role: 'agent')
│       ├── ReasoningBlock      ← collapsible "Show work ⌄"
│       ├── AgentResponseBlock  ← iterates content.blocks
│       └── Feedback row        ← only when stage === 'done'
└── TypingIndicator  ← between submit and first reasoning chunk
```

Auto-scroll on append + streaming. See `spotter-logic.md` for state machine and chunk protocol.

---

## Sticky prompt

`SpotterPrompt` lives at the bottom of the canvas in BOTH welcome and chat-active states. Its sticky position keeps it aligned with the chat thread on wide canvases (`spotterLayout.chatMaxWidth = 880px`).

Properties:
- Auto-resize textarea (grows with content, capped)
- Mode toggle — `ChartSearch` / `Orbits` icons (search vs explore mode)
- Model picker — current model display + dropdown
- Controls icon — more actions (placeholder)
- Submit button (blue, disabled when empty)
- Purple → blue gradient border on `:focus-within`
- Disclaimer beneath: "Spotter responses should be reviewed. Learn more"

---

## Left panel (`SpotterLeftSide`)

Collapsible between **rail** (64px, icons only) and **panel** (260px, with labels and sections).

### Rail mode
```
SpotterRail
├── SpotterRailItem  ← icon-only, tooltip on hover
└── (multiple)
```

### Panel mode
```
SpotterPanel
├── SpotterPanelAction   ← top-level action button (e.g., "New chat")
├── SpotterPanelSection  ← grouped items with a label
│   └── SpotterPanelItem ← nav row with icon + label
└── (multiple sections)
```

Switching modes is animated (smooth 64↔260 transition). `SpotterLeftToggle` is the pill button that triggers the switch.

---

## Header

Use Radiant's `GlobalHeader` from `@components/GlobalHeader` in **light mode**. Do not build a custom header. Spotter prototypes rely on:
- App switcher
- Search
- Notifications (Bell — Spotter-local icon)
- User avatar

---

## Provider wiring

Standalone Spotter wraps the page in `SpotterChatProvider`:

```tsx
<SpotterChatProvider mode="canned">
  <SpotterInner />
</SpotterChatProvider>
```

`mode="canned"` uses fixtures from `src/spotter/runtime/cannedResponses.ts`. `mode="live"` is reserved for future API wiring.

Inside the provider, use `useSpotterChat()` to read state and call `send` / `abort` / `clear`.

---

## Theme — light mode by default

Standalone Spotter ships in light mode. Dark mode is not blocked, but no current design exists for it. If dark mode is requested, derive system tokens from `systemColors.dark` and verify contrast on every Spotter-local token (especially the brand glow).

---

## Cross-references

- **Components:** `spotter-components.md`
- **State machine / streaming:** `spotter-logic.md`
- **Voice and block usage:** `spotter-response-style.md`
- **Embedded agentic chat (Code/Viz/Model):** `spotter-agentic-chat-ia.md`
- **VizBlock behavior (still relevant):** `docs/2026-05-07-spotter-viz-block-behaviour.md`
- **AnswerCard spec (unbuilt):** `docs/2026-05-07-spotter-answer-card.md`
