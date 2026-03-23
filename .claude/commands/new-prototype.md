Start a new prototype for: $ARGUMENTS

## Instructions

Follow these steps in order. Stop immediately if any step fails and explain what went wrong.

---

### 1. Pull latest main

```
git checkout main
git pull origin main
```

---

### 2. Confirm the prototype name

Derive a PascalCase prototype name from the description in $ARGUMENTS.

- Examples: "filter panel" → `FilterPanel`, "user onboarding flow" → `UserOnboarding`, "liveboard comments" → `LiveboardComments`
- Keep it short (1–3 words, no articles or filler)

Ask the designer:

> **Prototype name:** `<DerivedName>` — does this work, or would you like a different name?

Wait for confirmation before continuing. Use the confirmed name for all remaining steps.

---

### 3. Ask discovery questions

Before writing any code, ask the designer these questions in a single message so they can answer all at once:

> To get started, a few quick questions:
>
> 1. **Goal** — What problem does this prototype explore or demonstrate?
> 2. **User** — Who is the target user? (e.g. admin, analyst, data manager, end user)
> 3. **Key screens or flows** — What are the main screens or interaction flows to prototype? (bullet list is fine)
> 4. **ThoughtSpot features** — Any specific ThoughtSpot features involved? (Answer, Liveboard, SpotIQ, Worksheet, Monitor, Spotter — or none)
> 5. **Layout type** — Single page, multi-page, wizard/stepper, or dashboard?
> 6. **References** — Any Figma links, screenshots, or existing prototypes to reference? (optional)

Wait for the designer's answers before continuing.

---

### 4. Create the branch

Slugify the confirmed prototype name for the branch:
- Lowercase, hyphen-separated
- Example: `FilterPanel` → `prototype/filter-panel`

```
git checkout -b prototype/<slug>
```

---

### 5. Scaffold the prototype files

Create the following files. Use the designer's answers from step 3 to write a meaningful description comment in `index.tsx`.

**`src/prototypes/<Name>/index.tsx`**

```tsx
import React from 'react';

/**
 * <Name>
 *
 * Goal: <goal from step 3>
 * User: <user from step 3>
 * Flows: <key screens/flows from step 3>
 */
export const <Name>: React.FC = () => {
  return (
    <div>
      {/* Start building your prototype here */}
    </div>
  );
};

export default <Name>;
```

**`src/prototypes/<Name>/components/.gitkeep`**

Empty file — reserves the components folder.

---

### 6. Register in registry.ts

Open `src/prototypes/registry.ts` and make two additions:

**A — Add the lazy import** after the last existing import line:

```ts
const <Name> = React.lazy(() => import('./<Name>'));
```

**B — Add the registry entry** before the closing `];` of `projectRegistry`:

```ts
  {
    id: '<Name>',
    name: '<Display name in title case>',
    description: '<One sentence from the designer's goal answer>',
    author: '<leave blank for designer to fill>',
    lastModified: '<today's date as YYYY-MM-DD>',
    component: <Name>,
    section: 'mine',
  },
```

---

### 7. Report

Print a summary in this format:

```
Prototype created: <Name>
Branch: prototype/<slug>

Files created:
  src/prototypes/<Name>/index.tsx
  src/prototypes/<Name>/components/   ← put your local components here

Registered in registry.ts — it will appear in the gallery under "My prototypes".

What's next:
  • Describe your UI or paste a Figma screenshot — Claude will build it using Radiant components
  • When ready to preview: /ship
  • To check progress anytime: /status
```
