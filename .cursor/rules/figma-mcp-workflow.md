---
description: Step-by-step workflow for using Figma MCP tools (get_design_context, get_metadata, get_variable_defs, get_screenshot) to convert Figma URLs into Radiant prototypes. Use when the user provides a Figma URL (figma.com/design/...). Do NOT use for screenshots or text descriptions without a Figma URL.
alwaysApply: false
---

# Figma MCP Workflow

This guide defines the exact tool-call sequence when a designer provides a Figma URL or node ID. Consult this file whenever the input is a Figma link rather than a text description or screenshot.

---

## URL Parsing

Extract `fileKey` and `nodeId` from the URL before calling any tool:

| URL format | fileKey | nodeId |
|------------|---------|--------|
| `figma.com/design/:fileKey/:name?node-id=1-2` | `:fileKey` | `1:2` (convert `-` to `:`) |
| `figma.com/design/:fileKey/branch/:branchKey/:name` | `:branchKey` | from `node-id` param |
| `figma.com/make/:makeFileKey/:name` | `:makeFileKey` | from `node-id` param |

If no `node-id` param is present, ask the designer which frame or component to target.

---

## Tool-Call Sequence

### Step 1: Get design context (primary tool)

```
get_design_context(
  nodeId,
  fileKey,
  clientLanguages: "typescript",
  clientFrameworks: "react"
)
```

This returns:
- **Reference code** (React + Tailwind — treat as a starting point, NOT final output)
- **Screenshot** of the node
- **Contextual hints** (Code Connect snippets, design tokens, annotations)

Proceed to Step 3 if the response is complete (code + screenshot returned).

### Step 2: Handle large nodes

If `get_design_context` returns metadata-only (no code) because the node is too large:

1. Call `get_metadata(nodeId, fileKey)` to see the full layer tree (XML structure with IDs, names, positions)
2. Identify the major child frames from the metadata
3. Call `get_design_context` on each child frame individually
4. Compose the prototype by assembling the child outputs

### Step 3: Extract variable definitions (optional, when precision matters)

```
get_variable_defs(nodeId, fileKey)
```

Returns Figma Variables (e.g. `icon/default/secondary → #949494`). Use these to verify token mappings when the design uses Figma's variable system. Skip this step if the design doesn't use variables or if `get_design_context` already resolved the tokens.

### Step 4: Get a standalone screenshot (optional)

```
get_screenshot(nodeId, fileKey)
```

Use when you need a fresh screenshot for visual comparison after making changes, or when `get_design_context` was called with `excludeScreenshot: true`.

---

## Adapting MCP Output to Radiant

The MCP returns React + Tailwind code. **Never use it verbatim.** Always adapt:

| MCP output | Radiant equivalent |
|------------|-------------------|
| Tailwind classes (`className="bg-white p-4"`) | Inline styles with tokens (`backgroundColor: systemColors.light['background-base']`) |
| Raw `<button>`, `<input>` | `<Button>`, `<TextInput>` from `../../components` |
| Hardcoded hex values | `systemColors.light[...]` or `referenceColors` tokens |
| Hardcoded pixel spacing | `spacing.A` through `spacing.H` tokens |
| Tailwind font sizes | `fontFamily.primary` from `../../tokens/typography` |

### Interpreting contextual hints

The response may include these enrichments — use them appropriately:

- **Code Connect snippets** → The design links to an existing codebase component. Use that component directly.
- **Component documentation links** → Follow them for usage context and prop APIs.
- **Design annotations** → Follow any notes, constraints, or instructions from the designer.
- **Design tokens as CSS variables** → Map to the project's `systemColors` / `referenceColors` token system.
- **Raw hex colors / absolute positioning** → The design is loosely structured; rely more on the screenshot for layout intent.

---

## Failure Modes

### MCP connection fails or times out

1. Ask the designer if the Figma file is accessible (not in a draft or restricted team)
2. If still failing, fall back to screenshot-based workflow:
   - Ask the designer to paste a screenshot of the frame
   - Follow `figma-component-mapping.md` for visual-to-token mapping
   - Set fidelity expectations lower (see `prototype-generation.md` screenshot section)

### `get_design_context` returns empty or minimal data

Possible causes:
- The node ID points to an empty frame or a component set (not an instance)
- The frame contains only images/bitmaps with no structured layers

Recovery:
1. Call `get_metadata` to inspect the layer tree
2. Look for child frames that contain actual UI layers
3. Re-call `get_design_context` on those specific children

### Token mapping conflicts

When MCP returns hex values that don't match any `systemColors` token exactly:

1. Check `figma-component-mapping.md` for the closest Radiant token
2. Use the **semantic meaning** (e.g. "this looks like secondary text") rather than exact hex matching
3. Document the approximation with a comment if the mapping is ambiguous

---

## Quick Reference

```
Designer pastes Figma URL
  │
  ├─ Parse fileKey + nodeId from URL
  │
  ├─ Call get_design_context(nodeId, fileKey)
  │   ├─ Success (code + screenshot) → Adapt to Radiant → Build prototype
  │   └─ Too large (metadata only) → Call get_metadata → Drill into children
  │
  ├─ Optionally call get_variable_defs for precise token mapping
  │
  └─ After building → Call get_screenshot for visual verification
```

---

## What NOT to Do

- **Don't use MCP output as final code** — it's a reference, not a deliverable
- **Don't skip the adaptation step** — Tailwind → inline styles, raw HTML → Radiant components
- **Don't call `get_metadata` first** — always try `get_design_context` first (it includes metadata when needed)
- **Don't hardcode hex values from the MCP response** — always map to `systemColors` / `referenceColors`
