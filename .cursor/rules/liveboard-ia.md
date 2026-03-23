---
description: Information architecture, component map, and scaffolding guide for all Liveboard prototypes. Consult this file whenever a user asks to create or modify a Liveboard-related prototype.
globs: ["src/prototypes/*Liveboard*/**", "src/prototypes/*liveboard*/**"]
---

# Liveboard Prototype — Information Architecture & Component Guide

> **Source of truth:** FigJam board — `figma.com/board/RqcvObudOBTNdkHkEszuZg/Liveboard-RadiantPlay`
> Last synced: 2026-03-13

---

## 0. Before You Start — Ask the User

When a user requests a new Liveboard prototype, scaffold **both view and edit modes** by default — do not ask which mode(s) to include.

The user will typically provide a **Figma link or screenshot** as the starting point. Use the Figma MCP tools (`get_design_context` or `get_screenshot`) to extract the design, then map it against the IA below. Tile types and layout should be inferred from the design input — do not ask separately.

Then scaffold accordingly using the IA below.

> **Important:** All Liveboard prototypes MUST use the global ThoughtSpot header (`GlobalHeader` from `@components/GlobalHeader`). Do NOT build a custom header — always import and use the shared Radiant `GlobalHeader` component for the top-level navigation bar.

> **Visual references:** When a Figma link or PNG/screenshot is provided, use the `--liveboard` scaffolding as the **structural foundation** (file layout, component patterns, data shape) but drive the **visual output** from the reference. The scaffold is for structure; the reference is for look and feel. Customize the generated components (tiles, charts, layout, colors, spacing) to match the design reference while keeping the scaffolded file structure and patterns intact.

### Reference: Online Retail Sales Liveboard

See `src/prototypes/OnlineRetailSales/` for a working example of a Liveboard prototype built from this IA.

### Liveboard Template & Scaffolding

Use `npm run new-prototype MyDashboard -- --liveboard` to scaffold a new Liveboard prototype from the template at `src/prototypes/_liveboard-template/`. This includes LiveboardHeader, AnswerTile, sample charts, styles, and mock data.

---

## 1. Liveboard Modes

A Liveboard has two top-level modes:

### View Mode
The default consumption experience. Users can view data, switch tabs, apply filters, and interact with tiles (hover actions, expand, etc.).

### Edit Mode
The authoring experience. Replaces the primary nav bar with an edit toolbar. Users can add/remove tiles, rearrange layout, style the Liveboard, and use SpotterViz.

---

## 2. Information Architecture — View Mode

```
Liveboard (View Mode)
├── ThoughtSpot Primary Nav Bar
├── Header
│   ├── LB details (name, description)
│   ├── Tabs
│   │   ├── Tab Filters
│   │   └── Switch tabs (interaction)
│   ├── Share icon button
│   ├── 3 dot menu
│   │   └── Edit, Rename, Make a copy...
│   ├── Personalised View
│   │   ├── Select view
│   │   ├── Save view
│   │   ├── Manage views
│   │   └── Reset Liveboard
│   └── Liveboard Filters
│       └── Change filter value (interaction)
└── Body
    ├── Answer Tile
    │   ├── Charts (visualization content)
    │   └── Hover actions: Ask Spotter, Expand, More actions
    │       └── More actions: Pin, Add to watchlist, Show underlying data, Download, Present, Copy link, Manage alerts
    ├── Note Tile
    │   ├── Content (text, image, hyperlink, table)
    │   └── Hover actions: Actions (Pin, Present)
    ├── Group Tile
    │   ├── Multiple tiles (Answer, Note, Insight)
    │   ├── Filters
    │   └── Hover actions: Ask Spotter, Expand, More actions
    │       └── More actions: Pin, Download, Present, Copy link
    ├── Insight Tile
    │   ├── AI generated summary
    │   └── Hover actions: Ask Spotter, More actions
    │       └── More actions: Copy as PNG, Copy as text, Present
    └── Canvas behaviour
        └── react-grid-layout (drag-and-drop tile arrangement)
```

---

## 3. Information Architecture — Edit Mode

```
Liveboard (Edit Mode)
├── Edit Header (replaces Primary Nav in edit mode)
│   └── Toolbar
│       ├── Add (dropdown menu)
│       │   ├── Answer → Opens answer search/add window
│       │   ├── Note tile → Adds note to LB
│       │   ├── Filter → Opens add filter modal
│       │   ├── Parameter → Opens add parameter modal
│       │   └── Tab → Adds new tab in the header
│       ├── Styling (side panel overlay)
│       │   ├── Liveboard properties (Color, corners, density)
│       │   ├── Group properties (when group tile selected)
│       │   ├── Answer properties (when answer tile selected)
│       │   └── Note properties (when note tile selected)
│       ├── SpotterViz (side panel overlay)
│       │   └── AI chat interface
│       │       ├── Prompt bar
│       │       │   ├── Text box
│       │       │   ├── Send button
│       │       │   └── Referencing
│       │       └── AI response
│       │           ├── Thinking
│       │           ├── Toolcall
│       │           ├── Summary
│       │           └── Checkpoints/Versioning
│       ├── Save
│       └── Cancel
├── LB Header
│   ├── Name and description
│   │   ├── Edit (interaction)
│   │   └── Rename (interaction)
│   ├── Tabs
│   │   ├── Delete
│   │   └── Reorder
│   └── Filters
│       ├── Remove
│       └── Edit filter (Filter modal)
└── LB Body
    ├── Answer Tile
    │   ├── Title → Edit
    │   ├── Description → Edit
    │   ├── Drag
    │   ├── Resize
    │   └── Floating toolbar actions
    │       ├── Edit
    │       ├── Resize
    │       ├── Move to → Group / Tab
    │       └── Delete
    ├── Note Tile
    │   ├── Content
    │   │   ├── Text style (Title, Heading, Body, Numbered list, Bulleted list)
    │   │   ├── Text alignment
    │   │   ├── Text format
    │   │   ├── Font color
    │   │   ├── Link
    │   │   └── Insert objects (Image, Table, iframe, Divider)
    │   ├── Drag
    │   ├── Resize
    │   └── Floating toolbar actions
    │       ├── Resize
    │       ├── Move to
    │       └── Delete
    ├── Group Tile
    │   ├── Title → Edit
    │   ├── Description → Edit
    │   ├── Filters → Edit
    │   ├── Content (Answer tile, Note tile, Insight tile)
    │   ├── Drag
    │   ├── Resize
    │   └── Floating toolbar actions
    │       ├── Ungroup
    │       ├── Move to
    │       └── Delete
    └── Insight Tile (AI generated summary)
        ├── Drag
        ├── Resize
        └── Floating toolbar actions
            ├── View prompt (AI prompt for summary generation)
            ├── Edit (Using AI)
            ├── Content templates
            │   ├── Header only
            │   ├── Header + body
            │   ├── Body only
            │   └── Bulleted list
            ├── Resize
            ├── Move to
            └── Delete
```

---

## 4. Component Inventory for Liveboard Prototypes

### Available in RadiantPlay (`src/components/`) — Use Directly

These are global Radiant design system components. Import from `@/components/` or `../../components/`.

| Component | Use in Liveboard |
|-----------|-----------------|
| `GlobalHeader` | ThoughtSpot primary nav bar (`src/components/GlobalHeader/`) |
| `Button` | Save, Cancel, toolbar actions |
| `Tabs` | Liveboard tabs, tab switching |
| `Table` | Data tables within Answer tiles |
| `Typography` | All text content |
| `Modal` | Add filter modal, add parameter modal |
| `Menu` | 3-dot menu, Add dropdown, Personalised View menu |
| `Tooltip` | Hover hints on toolbar icons |
| `Chip` | Filter chips, tag display |
| `Icon` | All iconography (use `isValidIconName()` for validation) |
| `SearchInput` | Answer search in Add flow |
| `TextInput` | Rename, edit fields |
| `TextArea` | Note tile rich text editing |
| `Select` | Filter value selection, view selection |
| `Alert` | Save confirmation, error states |
| `Toast` | Action feedback (saved, deleted, etc.) |
| `LoadingIndicator` | Loading states for tiles, AI responses |
| `Popover` | Personalised view dropdown, filter popover |
| `Accordion` | Styling panel sections |
| `Pagination` | Large data tables within tiles |
| `LiveboardHeader` | Complete Liveboard header — PrimaryNav + ViewHeader (view) or EditToolbar + EditSubHeader (edit). Import from `@components/LiveboardHeader`. |

### Dependencies

| Package | Use in Liveboard |
|---------|-----------------|
| `react-grid-layout` | Canvas tile arrangement — drag-and-drop, resize. Used in both View and Edit modes. |

### Available in Liveboard Prototype (`src/prototypes/Liveboard/components/`) — Reuse Across Liveboard Variants

These are Liveboard-specific components already built. Import from the Liveboard prototype's components folder.

| Component | Status | Description |
|-----------|--------|-------------|
| `Header` | Built | Liveboard header with title, tabs area |
| `FilterBar` | Built | Filter bar with active filter chips |
| `KPICard` | Built | KPI display with variants: highlight, chart, dual-metric |
| `AreaChart` | Built | Area/line chart visualization |
| `DonutChart` | Built | Donut/pie chart visualization |
| `StackedBarChart` | Built | Stacked bar chart visualization |
| `USMapChart` | Built | US geographic map visualization |
| `StylingPanel` | Built | Edit mode styling side panel (color, corners, density) |
| `NavigationSidebar` | Built | Sidebar navigation component |
| `OptionButtonGroup` | Built | Segmented button group for toolbar |

### Available in Shared Components or Liveboard Template — Already Built

These Liveboard-specific components have been built and are available for use:

| Component | Location | Description |
|-----------|----------|-------------|
| `LiveboardHeader` | `src/components/LiveboardHeader/` (shared) | Unified header: PrimaryNav + ViewHeader (view) or EditToolbar + EditSubHeader (edit) |
| `EditToolbar` | Inside `LiveboardHeader` | Dark toolbar for edit mode (Add, Styling, SpotterViz, Save, Cancel) |
| `EditSubHeader` | Inside `LiveboardHeader` | Edit mode LB header with editable name, tabs, filters |
| `AnswerTile` | `_liveboard-template/components/` | Tile container with mode-aware hover toolbar (Ask Spotter / Edit / Move to / Delete) |
| `TileHoverActions` | Built into `AnswerTile` (ActionPalette) | Hover overlay with contextual actions per mode |

### Not Yet Built — To Be Created

These components are defined in the IA but do not exist in RadiantPlay yet. When building a Liveboard prototype that needs them, create them in `src/prototypes/<PrototypeName>/components/` first. They will be promoted to shared Liveboard components later.

> **Note:** Tile components (AnswerTile, NoteTile, GroupTile, InsightTile) are **custom containers** — do NOT wrap them in the Radiant `Card` component. Each tile type has its own container with specific hover states, selection behavior, and toolbar integration.

| Component | Priority | Description |
|-----------|----------|-------------|
| `NoteTile` | High | Rich text tile with formatting toolbar |
| `GroupTile` | High | Container tile that holds multiple sub-tiles |
| `InsightTile` | High | AI-generated summary tile with content templates |
| `FloatingToolbar` | High | Contextual action bar on tile selection (Edit, Resize, Move to, Delete) |
| `SpotterVizPanel` | Medium | AI chat side panel with prompt bar and response display |
| `PersonalisedViewMenu` | Medium | Dropdown for Select/Save/Manage views, Reset Liveboard |
| `AddMenu` | Medium | Dropdown for adding Answer, Note, Filter, Parameter, Tab |
| `FilterModal` | Medium | Modal for adding/editing filters |
| `ParameterModal` | Low | Modal for adding/editing parameters |
| `RichTextEditor` | Low | Note tile content editor (text styles, alignment, formatting, inserts) |

---

## 5. Scaffolding Guide

### Quick Start (Recommended)

```bash
npm run new-prototype MyDashboard -- --liveboard
```

This scaffolds from `src/prototypes/_liveboard-template/` and creates:

```
src/prototypes/MyDashboard/
├── index.tsx                    # Main component using LiveboardHeader (view + edit)
├── styles.ts                    # Token-based style constants
├── data/
│   └── mockData.ts              # Sample tabs, filters, KPIs, chart data
├── components/
│   ├── AnswerTile.tsx           # Tile container with hover toolbar
│   ├── SampleBarChart.tsx       # Example bar chart
│   └── SampleKPITile.tsx        # Example KPI sparkline
└── README.md
```

The template includes both view and edit modes out of the box. Customize by updating mock data and adding your own chart/tile components.

### Using LiveboardHeader

The shared `LiveboardHeader` component (`@components/LiveboardHeader`) handles both modes. Pass the `mode` prop to switch between view and edit:

```tsx
import { LiveboardHeader } from '@components/LiveboardHeader';

const [mode, setMode] = useState<'view' | 'edit'>('view');

<LiveboardHeader
  mode={mode}
  title={liveboardName}
  activeTab={activeTab}
  tabs={tabsData}
  filters={filterData}
  onTabChange={setActiveTab}
  onEdit={() => setMode('edit')}
  onSave={() => setMode('view')}
  onCancel={() => setMode('view')}
  onToggleSpotter={() => setSpotterOpen(!spotterOpen)}
  spotterOpen={spotterOpen}
/>
```

- **View mode** renders: PrimaryNav + ViewHeader (title, tabs with scroll, personalised view, filters, 3-dot menu)
- **Edit mode** renders: EditToolbar (Add, Styling, SpotterViz, Save, Cancel) + EditSubHeader (editable title, tabs, filters)

### View Mode Only

Use the same scaffolding but remove edit mode state and callbacks. Pass `mode="view"` to `LiveboardHeader` and `AnswerTile`.

### Edit Mode Only

Use the same scaffolding but initialize with `mode="edit"`. Pass `mode="edit"` to `LiveboardHeader` and `AnswerTile`.

---

## 6. Liveboard Variations

Each Liveboard variation (Business Overview, Sales Funnel, Online Retail Sales, etc.) is a **separate prototype folder** but shares the same structural IA above. The variation determines the mock data theme, filter set, and tab structure. Infer these from the Figma input provided by the user.

### Reference Examples

- **Template**: `src/prototypes/_liveboard-template/` — minimal scaffolding with LiveboardHeader, AnswerTile, sample charts
- **Full prototype**: `src/prototypes/OnlineRetailSales/` — complete Liveboard with custom charts, data tables, and themed mock data
