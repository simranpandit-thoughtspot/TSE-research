---
description: Scaffolding guide for new Spotter prototypes — file layout, provider wiring, registry entry, mock data, theme. Load when creating a new Spotter-flavoured prototype (Tier 2).
alwaysApply: false
---

# Spotter — Scaffolding guide

> For the component map, see `spotter-components.md`. For IA, see `spotter-ia.md` (standalone) or `spotter-agentic-chat-ia.md` (embedded).

Last updated: 2026-05-18.

---

## Pick a mode first

Before writing any code, decide which Spotter mode the prototype is:

| Mode | When to pick | Reference prototype |
|---|---|---|
| **Standalone Spotter** | Full-page agentic chat is the entire experience | `src/prototypes/Spotter/` |
| **Spotter Model (embedded)** | Canvas + chat where canvas is a data-model editor | `src/prototypes/DataModelEditor/` |
| **Spotter Viz (embedded)** | Canvas + chat where canvas is a Liveboard / viz surface | Not built — see `spotter-agentic-chat-ia.md` |
| **Spotter Code (embedded)** | Canvas + chat where canvas is an IDE-like surface | Not built — see `spotter-agentic-chat-ia.md` |

This determines which IA doc to load and what canvas the prototype needs.

---

## Standard file layout

```
src/prototypes/<PrototypeName>/
├── index.tsx                       ← provider + page composition
├── components/
│   ├── <PrototypeName>Canvas.tsx   ← the canvas, mode-specific
│   └── <PrototypeName>Canvas.module.css
└── data/
    └── mockData.ts                 ← chats, models, custom Spotter data
```

Prototype-specific components belong in `components/` (per the Radiant convention — never in `src/components/`). Mock data belongs in `data/mockData.ts` — never inline.

---

## Provider wiring

Every Spotter prototype wraps in `SpotterChatProvider` at the page root so any subtree can call `useSpotterChat()`:

```tsx
import { SpotterChatProvider, useSpotterChat } from '@spotter/chat';

export const MyPrototype: React.FC = () => (
  <SpotterChatProvider mode="canned">
    <MyPrototypeInner />
  </SpotterChatProvider>
);

const MyPrototypeInner: React.FC = () => {
  const { state, send, abort, clear } = useSpotterChat();
  // page composition
};
```

**`mode="canned"`** — uses fixtures from `src/spotter/runtime/cannedResponses.ts`. Default for prototypes.
**`mode="live"`** — reserved for future API wiring. Don't use unless you've wired the runtime.

---

## Standalone Spotter scaffold

```tsx
import { GlobalHeader } from '@components/GlobalHeader';
import {
  SpotterShell,
  SpotterLeftSide,
  SpotterRail,
  SpotterPanel,
  SpotterLeftToggle,
  SpotterWelcome,
} from '@spotter/page';
import { SpotterChatProvider, useSpotterChat } from '@spotter/chat';

export const MyPrototype: React.FC = () => (
  <SpotterChatProvider mode="canned">
    <MyPrototypeInner />
  </SpotterChatProvider>
);

const MyPrototypeInner: React.FC = () => {
  const { state, send, clear } = useSpotterChat();
  const isEmpty = state.messages.length === 0;

  return (
    <>
      <GlobalHeader theme="light" />
      <SpotterShell>
        <SpotterLeftSide mode={leftMode}>
          {/* SpotterRail or SpotterPanel based on mode */}
        </SpotterLeftSide>
        <Canvas>
          {isEmpty ? <WelcomeState /> : <ChatActive />}
        </Canvas>
      </SpotterShell>
    </>
  );
};
```

Use `src/prototypes/Spotter/index.tsx` as the canonical reference.

---

## Embedded scaffold (canvas + chat)

```tsx
<SpotterChatProvider mode="canned">
  <ProductShell>
    <Canvas>{/* mode-specific UI: schema editor, viz, IDE */}</Canvas>
    <AgentPanel collapsible resizable>
      <ChatThread />
      <SpotterPrompt />
    </AgentPanel>
  </ProductShell>
</SpotterChatProvider>
```

For embedded chat, use `@spotter/chat` directly. The `_agentic/` components are the legacy entry used inside DataModelEditor; new prototypes go via `@spotter/chat`.

---

## Registry entry

Register the prototype so it appears in the gallery. The file depends on whether it's shared (galaxy-bound) or personal.

**Shared sample (visible to all designers via galaxy):**

Add to `src/prototypes/registry-core.ts`:

```ts
import MyPrototypeThumbnail from './thumbnails/MyPrototype.svg';
const MyPrototype = React.lazy(() => import('./MyPrototype'));

// in the array (append to the end — gallery reverses order)
{
  id: 'MyPrototype',
  name: 'My prototype',
  description: 'One-line description, sentence case.',
  author: 'Design Team',
  lastModified: '<today YYYY-MM-DD>',
  thumbnail: MyPrototypeThumbnail,
  component: MyPrototype,
  dsComponents: <count>,
  customComponents: <count>,
  section: 'sample',
},
```

**Personal (origin-only, your fork):**

Add to `src/prototypes/registry-mine.ts` with `section: 'mine'`. Per CLAUDE.md — never add personal prototypes to `registry-core.ts`.

---

## Mock data

`data/mockData.ts` exports:
- `chats` — recent chat history (id, title, timestamp)
- `customSpotters` — bounded-context Spotter configurations (if applicable)
- `dataModels` — available SpotterModels (if applicable)

Keep it realistic — use product-relevant names and timestamps. Random Lorem-style data weakens the prototype.

---

## Theme

Spotter prototypes ship in **light mode**. The `GlobalHeader` uses its light variant. System tokens come from `systemColors.light`.

Dark mode is not blocked but no design exists. If you build dark mode, verify every Spotter-local token (especially `spotterGlow`) has sensible contrast on dark backgrounds.

---

## Pre-flight checklist

Before considering the prototype done:
- [ ] All 5 Radiant conventions applied (tokens, components, layout primitives, local components, sentence case)
- [ ] `npm run build` passes
- [ ] Registered in `registry-mine.ts` (or `registry-core.ts` for shared)
- [ ] Mock data realistic, not Lorem ipsum
- [ ] Light theme verified
- [ ] Welcome state implemented (or explicitly skipped for embedded)
- [ ] Chat thread streams correctly with canned fixtures
- [ ] `SpotterPrompt` gradient focus border visible
- [ ] No console errors / TypeScript errors

---

## Cross-references

- **Components:** `spotter-components.md`
- **Standalone IA:** `spotter-ia.md`
- **Embedded IA:** `spotter-agentic-chat-ia.md`
- **Logic / state machine:** `spotter-logic.md`
- **Response voice:** `spotter-response-style.md`
- **Branching / registries:** `CLAUDE.md`
- **Roadmap and open work:** `docs/spotter-roadmap.md`
