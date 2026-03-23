Run a Radiant compliance health check on the current prototype. Shows what's reused from the design system, what's been customised, what's hardcoded, and where easy improvements exist. This is a status check — not a blocker.

## Instructions

Follow these steps in order.

---

### 1. Identify the prototype

Run `git branch --show-current`.

- If the branch is `prototype/<slug>`, find the matching folder in `src/prototypes/` using `git diff --name-only main...HEAD` to confirm the exact folder name.
- If not on a prototype branch, identify the most recently modified `src/prototypes/<Name>/` folder from the git diff.
- If ambiguous, ask: "Which prototype should I check?"

---

### 2. Collect all files

Read every `.tsx` and `.module.css` file under `src/prototypes/<Name>/`.

Also scan `src/components/` to get the full list of available Radiant components.

---

### 3. Analyse the prototype across four dimensions

#### Dimension 1 — Radiant components in use
From the imports (`../../components` or `@components/*`), list every Radiant component being used. For each, note how many times it appears and whether it's being used as-is or wrapped/extended with custom logic or styles on top.

Classify each as:
- **Reused as-is** — imported and used with no overrides
- **Extended** — imported but wrapped in a custom component or has additional inline styles/overrides layered on top

#### Dimension 2 — Custom components
List everything in `src/prototypes/<Name>/components/`. For each custom component:
- Understand what it does
- Check if a Radiant component could fully cover it → mark as **"Radiant equivalent exists"**
- If it extends a Radiant component with prototype-specific logic → mark as **"Built on Radiant"**
- If it's truly custom with no design system overlap → mark as **"Fully custom"**

#### Dimension 3 — Hardcoded values
Scan for hardcoded values across all files. These are **not errors** — just documented so the designer knows what's there:
- Hex colors (`#...`), rgb/rgba
- Pixel values outside the spacing scale (4px increments)
- Hardcoded font families
- Inline `style={{}}` blocks

For each, note the file and what was hardcoded. Where a token exists that would directly replace it, mention it as an easy win — but only if it's a straightforward swap.

#### Dimension 4 — Layout approach
Note whether the prototype uses:
- Radiant layout primitives (`Horizontal`, `Vertical`, `View`, `Grid`, `RdGrid`) — good
- Inline flex/grid styles — custom but fine; flag only if a layout primitive would simplify it

---

### 4. Calculate a compliance score

Based on the analysis:

- **Radiant coverage** = (Radiant components used + custom components built on Radiant) ÷ total distinct UI elements × 100
- **Token coverage** = (token-based values) ÷ (token-based + hardcoded values) × 100

Present these as rough percentages — they're directional indicators, not exact measurements.

---

### 5. Output the report

Print in this format:

```
Radiant Check — <PrototypeName>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HEALTH OVERVIEW
  Radiant coverage:   ~X%   (Y of Z components from the design system)
  Token coverage:     ~X%   (colors, spacing, typography)
  Custom components:  N     (breakdown below)

──────────────────────────────
RADIANT COMPONENTS IN USE
──────────────────────────────
  Reused as-is:
    ✓ Button        6 uses
    ✓ TextInput     3 uses
    ✓ Modal         1 use

  Extended / wrapped:
    ~ Table         1 use — custom sort logic added on top
    ~ Chip          2 uses — inline color override applied

──────────────────────────────
CUSTOM COMPONENTS
──────────────────────────────
  Built on Radiant:
    • FilterRow.tsx        — wraps TextInput + Select, prototype-specific layout
    • StatusBadge.tsx      — built on Chip, adds icon slot

  Fully custom:
    • ChartTooltip.tsx     — no Radiant equivalent, custom overlay

  Radiant equivalent exists (easy swap if needed):
    • IconButton.tsx       → Button variant="tertiary" + Icon would cover this

──────────────────────────────
HARDCODED VALUES
──────────────────────────────
  Colors (X found):
    • FilterRow.tsx:42     #2770EF  — easy swap: systemColors.light['content-brand']
    • ChartTooltip.tsx:18  rgba(0,0,0,0.4)  — custom, no direct token equivalent

  Spacing (X found):
    • StatusBadge.tsx:11   padding: 7px  — easy swap: spacing.A (4px) or spacing.B (8px)
    • ChartTooltip.tsx:24  gap: 10px  — custom

  Fonts (X found):
    • FilterRow.tsx:6      fontFamily: '"Inter", sans-serif'  — easy swap: fontFamily.primary

──────────────────────────────
EASY WINS  (optional improvements)
──────────────────────────────
  These are quick swaps that would improve token coverage with minimal effort:
  1. Replace #2770EF with systemColors.light['content-brand'] in FilterRow.tsx
  2. Replace fontFamily string with fontFamily.primary in FilterRow.tsx
  3. Replace padding: 7px with spacing.B (8px) in StatusBadge.tsx — visually identical

  These are fine as-is (custom/complex, not worth changing):
  • rgba overlay in ChartTooltip.tsx — no token equivalent, keep hardcoded
  • ChartTooltip.tsx custom layout — prototype-specific, Radiant primitives won't help here

──────────────────────────────
SUMMARY
  This prototype is in good shape. Most UI is built on or with Radiant components.
  X hardcoded values documented — Y have easy token swaps if you want to improve coverage.
  Run /radiant-check again after any updates to re-check.
```

Keep the tone neutral and informational throughout. Hardcoded values are not failures — they're just documented. Only surface easy wins where a token swap is direct and obvious.
