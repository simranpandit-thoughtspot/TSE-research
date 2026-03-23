# Orchestration & Instruction Set — Recommendation Plan
_Evaluation of the AI design-to-code pipeline in radiantplay_
_Date: 2026-02-25_

---

## What This Document Covers

This is a focused analysis of **how designer intent flows through the AI instruction layer** — from the moment a designer types a prompt, pastes a screenshot, or connects a Figma node, to the moment prototype code is generated. It covers the current `.cursor/rules/` system, identifies the gaps in the logic chain, and recommends specific improvements.

---

## Current Architecture: The 12-File Instruction Stack

The AI orchestration layer lives entirely in `.cursor/rules/`. There are 12 files that act as the AI's "brain" when generating prototypes.

```
.cursor/rules/
├── _orchestration.md          ← Master dispatcher (read first)
├── prototype-generation.md    ← Core 11-step workflow
├── component-inventory.md     ← Decision tree: what component to use
├── token-usage.md             ← How to apply design tokens
├── figma-component-mapping.md ← Figma layer → Radiant component translation
├── design-system.md           ← Component architecture rules (shared library)
├── widget-patterns.md         ← Multi-component patterns (alerts, menus, tables)
├── modal-patterns.md          ← Dialog sizing, types, footer patterns
├── layout-patterns.md         ← Page templates (AppShell, dashboard, form pages)
├── content-guidelines.md      ← UI text rules (voice, tone, labeling)
├── product-knowledge.md       ← ThoughtSpot product terms and context
└── prototype-structure.md     ← File and folder organization
```

### The Intended Flow

```
Designer Input (text / screenshot / Figma MCP node)
        ↓
_orchestration.md   →   Routes to the right rule files
        ↓
prototype-generation.md   →   Runs 11-step workflow:
    Step 0: Pre-flight (inventory components, no raw HTML, all tokens)
    Steps 1–8: Layout → Components → Interactions → Modals → Tokens → Text → Files
    Step 9: Visual verification (screenshot compare)
    Step 10: Compliance check (no hardcoded values)
    Step 11: Figma sub-node drill (if design is large)
        ↓
Component selection (component-inventory.md decision tree)
        ↓
Token application (token-usage.md / figma-component-mapping.md)
        ↓
Code output → registry.ts auto-registration → /playground
```

### The Three Input Paths

| Input Type | Entry Point | Unique Steps |
|------------|-------------|--------------|
| Text prompt | _orchestration.md → prototype-generation.md | Steps 1–10 linearly |
| Figma screenshot | _orchestration.md → figma-component-mapping.md first | Mapping pass before generation |
| Figma MCP node | `.cursor/settings.json` enables plugin → `get_design_context()` | Direct node data, then mapping |

---

## What Is Working Well

### 1. The master dispatcher (_orchestration.md) is the right idea
Having a single "read me first" file that routes the AI to the correct sub-rules prevents the AI from hallucinating component names or making up token values. The 10-priority consultation order is logical (layout → components → tokens → content).

### 2. The Figma-to-token mapping table is precise
`figma-component-mapping.md` contains a complete hex-to-token lookup (e.g., `#2770EF` → `systemColors.light['content-brand']`) and a spacing-to-scale table (e.g., `16px gap` → `spacing.D`). This prevents AI from hardcoding Figma values directly into prototype code.

### 3. Component selection uses use-case, not name-matching
`component-inventory.md` phrases every decision as "what does the user need to do?" rather than "what does this look like?" This produces more semantically correct component choices.

### 4. The compliance check (Step 10) is a quality gate
Requiring the AI to verify no hardcoded hex, no raw HTML, no magic pixels before declaring done is the right enforcement pattern.

### 5. The three-tier escalation for component creation is sensible
Use existing → use with overrides → create local → only promote to shared after 3+ prototypes. This keeps shared components stable and prototypes fast to iterate.

---

## Gaps and Problems

### GAP 1: The Figma MCP connection has no defined workflow
**Where it breaks:** `.cursor/settings.json` enables the Figma plugin with one line, but no rule file tells the AI *how* to use it or *when* to call specific MCP tools.

**What is missing:**
- Which MCP calls to make and in what order (`get_design_context` → `get_screenshot` → `get_variable_defs`?)
- What to do when `get_design_context` returns too much data
- What to do when the MCP connection fails or returns no data
- Whether to use `get_variable_defs` to pull Figma Variables and map them to tokens
- No mention of `get_metadata` for structure overview before diving into context

**Impact:** When a designer pastes a Figma URL or node ID, the AI has to infer what to do. Sometimes it calls the right tool, sometimes it doesn't. The behavior is inconsistent.

---

### GAP 2: No defined flow for image input (screenshot without Figma MCP)
**Where it breaks:** `prototype-generation.md` says "determine input type (Figma/text/existing)" but `figma-component-mapping.md` assumes you have exact Figma data (hex values, layer names, spacing numbers). A screenshot gives you none of that — only visual information.

**What is missing:**
- A distinct workflow for screenshot-only input
- Guidance on how to visually parse a screenshot and approximate tokens
- What level of fidelity is acceptable for screenshots vs. Figma MCP (approximation is OK for screenshots, exact mapping is expected for MCP)
- How to handle parts of the screenshot that don't match any Radiant component

**Impact:** The AI tries to apply the same rigorous mapping logic to a screenshot that it would to a Figma node. This either produces over-confident approximations or causes the AI to ask too many clarifying questions.

---

### GAP 3: The orchestration file assumes linear reading but Cursor doesn't guarantee it
**Where it breaks:** `_orchestration.md` says "Read me first when working in Radiant codebase." But Cursor loads `.cursor/rules/` files based on relevance scoring, not a guaranteed order. There is no mechanism to enforce that `_orchestration.md` is always loaded first.

**What is missing:**
- A way to embed the most critical routing logic inside every rule file as a header (so even if a file is loaded without orchestration, it still references the right chain)
- Or: consolidating the most critical rules (no raw HTML, no hardcoded values) into a single always-loaded context that cannot be missed
- A `description` frontmatter field in each rule file (Cursor supports this for relevance scoring)

**Impact:** If a designer asks a narrow question (e.g., "what size is this modal?"), Cursor may load only `modal-patterns.md` and skip the pre-flight compliance checks entirely.

---

### GAP 4: Interactive behavior has no instruction layer
**Where it breaks:** The rules cover static layout, component selection, and token application thoroughly. But they say almost nothing about *behavior*.

**What is missing rules for:**
- Transitions and animations (should a modal fade in? slide? what duration from animation tokens?)
- Loading states (when does a button become disabled + show spinner? which LoadingIndicator variant?)
- Error states (when a form fails, how does the input change? Alert above form or inline error message?)
- Empty states (when a table has no rows, what does the empty state look like? which pattern from widget-patterns.md applies?)
- Optimistic UI (does an action take effect immediately before API confirms?)
- Skeleton loading vs. spinner vs. progress bar — when to use which

**Impact:** Every prototype handles these differently. Designers get inconsistent interactive behavior depending on how they phrase the prompt.

---

### GAP 5: The token system has a version conflict inside the rules
**Where it breaks:** `token-usage.md` lists `brandColors` as deprecated and tells the AI to use `systemColors` instead. But `prototype-generation.md`'s own code template still imports `brandColors`. And the `npm run new-prototype` script also generates a template with deprecated imports.

**What is missing:**
- A single authoritative code template that is kept in sync across all rule files
- Automated linting to catch deprecated token usage before it ships
- A migration note in the template explaining what's deprecated and what to use instead

**Impact:** The AI reads conflicting instructions and sometimes uses the deprecated `brandColors`, causing runtime warnings or incorrect token resolution.

---

### GAP 6: Accessibility is mentioned but not enforced
**Where it breaks:** `design-system.md` lists accessibility requirements (focus-visible, ARIA labels, semantic HTML, `role="alert"`) but they appear only in the section about building shared components. `prototype-generation.md`'s Step 10 compliance check has no accessibility items.

**What is missing:**
- Accessibility items in the Step 10 checklist (focus management, ARIA roles, color contrast)
- Guidance on focus trapping in modals (which Radiant components handle this automatically vs. which need manual handling)
- Color contrast minimums tied to the token system (which token combinations pass AA/AAA?)
- Keyboard navigation requirements per component type

**Impact:** Prototypes pass the compliance check but can still be inaccessible. When designers share prototypes with developers, accessibility debt is invisible until engineering review.

---

### GAP 7: Dark mode is architecturally supported but never demonstrated
**Where it breaks:** The token system fully supports light/dark switching via CSS custom properties and `[data-theme="dark"]`. But no rule file explains how to implement this in a prototype, and no prototype currently demonstrates it.

**What is missing:**
- A rule explaining how to add a theme toggle to a prototype
- Documentation on which token path supports runtime theme switching (CSS variables vs. TS imports — they behave differently for dark mode)
- A theme toggle pattern in `widget-patterns.md`
- At least one prototype example with dark mode

**Impact:** All prototypes are light-mode only. ThoughtSpot's product supports dark mode, so this limits handoff fidelity.

---

### GAP 8: The registry auto-registration script is fragile
**Where it breaks:** `scripts/create-prototype.js` finds insertion points in `registry.ts` by searching for specific comment strings (`/** All registered projects */` and `// Add more projects here...`). If someone reformats the file or changes a comment, the script breaks silently.

**What is missing:**
- AST-based code modification (using a tool like `ts-morph` or `jscodeshift`) instead of comment-anchored string replacement
- A validation step that confirms registration was successful
- A fallback manual registration guide when the script fails

**Impact:** Designers who run `npm run new-prototype` may not have their prototype auto-registered, and won't know why it's not showing up in the playground.

---

### GAP 9: The design logic has no fallback for "no matching component"
**Where it breaks:** `component-inventory.md` says "if no match → create LOCAL component in prototype folder." But it doesn't say:
- What the local component must look like (must it use forwardRef? CSS Modules? tokens?)
- Whether to mimic Radiant component API patterns
- Whether local components should be reviewed before shipping (quality gate)

**What is missing:**
- A "local component creation" template or checklist
- Rules stating local components must still use tokens (no hardcoded values)
- A question the AI should ask the designer before creating a local component ("Are you sure no Radiant component covers this?")

**Impact:** Local components in prototypes sometimes use hardcoded colors and magic pixel values because the local component path bypasses the pre-flight checklist.

---

### GAP 10: No instruction for handing off to developers
**Where it breaks:** The project's stated goal includes developer handoff ("create specs and how the design can be handed off"). The rules cover prototype generation but stop there. There is nothing in the instruction set about:
- What to include in a handoff-ready prototype
- How to document component usage for developers
- How to surface token values visually in the prototype
- What `project.config.ts` fields should be complete before marking a prototype as "ready-for-dev"

**Impact:** Prototypes are created but the final mile — handing off to engineering with full context — is entirely undocumented and unguided.

---

## Recommendations

---

### REC 1: Create a dedicated Figma MCP rule file
**File to create:** `.cursor/rules/figma-mcp-workflow.md`

This file should define the exact tool-call sequence when a Figma URL or node ID is present:

```
Step 1: get_metadata(nodeId)           → Get structural overview (layer tree, node types)
Step 2: get_design_context(nodeId)     → Get full design data (colors, spacing, typography)
Step 3: get_variable_defs(nodeId)      → Pull Figma Variables → map to Radiant tokens
Step 4: get_screenshot(nodeId)         → Visual reference for verification
Step 5: If node too large → drill into 4-6 sub-nodes with get_design_context
Step 6: Map results through figma-component-mapping.md
Step 7: Generate code with prototype-generation.md
Step 8: Visual verify by comparing get_screenshot output with rendered prototype
```

Also define failure modes:
- If MCP returns no data → fall back to screenshot-only workflow
- If color has no token match → use nearest token, add a code comment flagging it
- If a Figma component has no Radiant equivalent → follow local component creation rules

---

### REC 2: Split the screenshot workflow from the Figma MCP workflow
**File to update:** `prototype-generation.md` (or create `screenshot-workflow.md`)

Screenshots need a different logic path than Figma MCP:

**Screenshot workflow:**
1. Describe what you see visually (layout, components, rough hierarchy)
2. Match visual elements to component-inventory.md by shape/purpose, not by exact value
3. Approximate colors to nearest system token (don't try to extract hex from pixels)
4. Approximate spacing to nearest scale step
5. Use `get_screenshot` from Figma MCP only if available as a visual reference
6. Apply lower fidelity expectation: screenshot → 80% match is acceptable, Figma MCP → 95%+ expected

---

### REC 3: Add frontmatter descriptions to every rule file
**All 12 rule files need a header block:**

```markdown
---
description: "Translate Figma layer names, colors, and spacing into Radiant components and tokens. Always consult when input is a Figma screenshot or MCP node."
globs: ["src/prototypes/**"]
alwaysApply: false
---
```

Cursor uses these descriptions for relevance scoring. Without them, rule file selection is unpredictable. The `_orchestration.md` file should use `alwaysApply: true` so it is always included.

---

### REC 4: Fix the token version conflict — create one canonical template
**Files to update:** `prototype-generation.md`, `scripts/create-prototype.js`

Both currently reference `brandColors` which is deprecated. A single canonical template should live in one place (suggest `src/prototypes/_template/index.tsx`) and all references in rule files should point to it rather than embedding code inline.

The canonical template should:
- Import from `systemColors` and `referenceColors` only
- Import from `v2TextStyles` for typography (not raw `fontSize` + `fontWeight`)
- Include a comment block at the top listing what's available
- Be the source of truth that gets copied by `npm run new-prototype`

---

### REC 5: Create an interaction patterns rule file
**File to create:** `.cursor/rules/interaction-patterns.md`

This file should cover what widget-patterns.md currently skips — the *behavioral* layer:

**Contents to define:**
- **Loading states:** Button loading prop usage, LoadingIndicator variants, skeleton screen pattern
- **Error states:** Inline field error vs. Alert above form vs. Toast — when to use which
- **Empty states:** Which Alert variant, what illustration, what CTA
- **Transition defaults:** Modal open/close (fade, 300ms, `var(--easing-standard)`), Sidebar collapse (slide, 200ms), Tooltip appear (1s delay, fade)
- **Optimistic UI:** When to show immediate feedback vs. wait for confirmation
- **Disabled states:** When a CTA is disabled, what the disabled state should communicate

---

### REC 6: Add accessibility items to the Step 10 compliance checklist
**File to update:** `prototype-generation.md`

Step 10 currently checks: color tokens, font family, raw HTML, spacing, responsive. Add:

```
Step 10f: Accessibility compliance
  - All interactive elements reachable by Tab key
  - Modal has focus trap (Radiant Modal handles this — verify not overriding)
  - Icon-only buttons have aria-label
  - Form inputs have associated labels (not just placeholder)
  - Alert/Toast has role="alert" (Radiant Alert handles this — verify)
  - Color contrast: content-primary on background-base passes AA (verified by token system)
```

---

### REC 7: Document the dark mode implementation pattern
**File to update:** `token-usage.md` or create `dark-mode-patterns.md`

Add a section explaining:
- CSS variables (`var(--rd-sys-color-*)`) switch automatically when `[data-theme="dark"]` is applied to `<html>` — use these in CSS Modules for theme-aware components
- TypeScript imports (`systemColors.light['...']`) do NOT switch automatically — hardcoded to light mode only
- For a prototype to support dark mode: use CSS variables for all colors (not TS inline styles)
- How to add a theme toggle: `document.documentElement.setAttribute('data-theme', 'dark')`
- Reference the `AppShell` component which handles theme toggling if used

---

### REC 8: Harden the registry script
**File to update:** `scripts/create-prototype.js`

Replace comment-anchored string injection with a more reliable approach:
- Use `ts-morph` to parse and modify `registry.ts` as an AST
- Or: move the registry to a JSON file (`prototypes.json`) that is easier to append to programmatically, then import it in `registry.ts`
- Add a validation step: after running the script, import the registry and confirm the new prototype appears

---

### REC 9: Add a "local component" creation checklist to component-inventory.md
**File to update:** `component-inventory.md`

When the AI decides to create a local component, it should follow a checklist:

```
Before creating a local component, confirm:
□ No Radiant component covers this use case (checked component-inventory.md)
□ This is not a composition of existing Radiant components
□ This element appears at least twice in the prototype (not one-off)

When creating a local component:
□ File goes in src/prototypes/MyPrototype/components/
□ Uses tokens (no hardcoded colors or spacing)
□ Has a TypeScript props interface
□ Has a JSDoc description
□ Uses React.FC or forwardRef (if it wraps a focusable element)
```

---

### REC 10: Add a handoff readiness checklist to prototype-generation.md
**File to update:** `prototype-generation.md` (or create `handoff-patterns.md`)

A prototype is "ready for dev" when it passes:

```
Handoff Readiness Check:
□ project.config.ts is complete (designer, PM, Figma link, Jira, status = "ready-for-dev")
□ All Radiant components used are the stable versions (not beta-only)
□ All tokens are documented (no inline approximations without comments)
□ Interactive states are covered (hover, active, disabled, loading, error, empty)
□ Responsive breakpoints are noted (which layout changes at which breakpoint)
□ Component names match Figma layer names (for developer cross-reference)
□ A README exists in the prototype folder with: what this is, how to run it, what's left to build
```

---

## Priority Order

| # | Recommendation | Why This First |
|---|---------------|----------------|
| 1 | Fix the token version conflict (REC 4) | Breaking inconsistency in the current system — every new prototype starts with deprecated code |
| 2 | Add frontmatter descriptions to rule files (REC 3) | Makes rule loading reliable — foundational to everything else working correctly |
| 3 | Create Figma MCP workflow rule (REC 1) | The MCP integration is a core feature with zero documentation |
| 4 | Split screenshot vs. MCP workflow (REC 2) | Different inputs need different fidelity expectations |
| 5 | Create interaction patterns rule (REC 5) | Currently the biggest content gap in the instruction set |
| 6 | Add accessibility to Step 10 (REC 6) | Low effort, high impact on handoff quality |
| 7 | Add local component checklist (REC 9) | Closes the last compliance gap in prototype generation |
| 8 | Add handoff readiness checklist (REC 10) | Completes the pipeline from prototype to dev |
| 9 | Document dark mode pattern (REC 7) | Medium effort, important for product fidelity |
| 10 | Harden registry script (REC 8) | Reliability fix, less urgent than content gaps |

---

## The Ideal Orchestration Flow (After Improvements)

```
Designer Input
    ↓
_orchestration.md (alwaysApply: true)
    ├─ Text prompt? → prototype-generation.md
    ├─ Screenshot? → screenshot-workflow.md → prototype-generation.md
    └─ Figma URL/node? → figma-mcp-workflow.md → figma-component-mapping.md → prototype-generation.md
    ↓
prototype-generation.md (11 steps)
    Step 0: Pre-flight (components, no raw HTML, tokens, layout)
    Steps 1–8: Generate code
    Step 9: Visual verify
    Step 10: Compliance (tokens + accessibility)
    Step 11: Figma sub-node drill (if needed)
    ↓
Supporting lookups (called as needed):
    component-inventory.md  → What component?
    token-usage.md          → What token?
    widget-patterns.md      → What multi-component pattern?
    interaction-patterns.md → What behavior?
    modal-patterns.md       → What dialog type/size?
    layout-patterns.md      → What page structure?
    content-guidelines.md   → What UI text?
    product-knowledge.md    → What product terms?
    prototype-structure.md  → What file structure?
    ↓
Local component needed?
    → component-inventory.md local component checklist
    ↓
Compliance passed?
    → registry.ts auto-registration (hardened script)
    ↓
Handoff ready?
    → handoff-patterns.md checklist
    ↓
/playground → developer review
```
