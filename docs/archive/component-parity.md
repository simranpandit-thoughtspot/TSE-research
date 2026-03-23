# Component Parity Analysis
## Radiant Play (hand-authored) vs Scaligent radiant-react (real)

> Researched: 2026-02-27
> Purpose: Map what exists in both codebases, identify gaps, and plan migration

---

## Legend

| Symbol | Meaning |
|--------|---------|
| 🔄 | Exists in both — Radiant Play version is hand-authored and should be replaced with the real Scaligent component |
| 🔴 | Only in Scaligent — missing from Radiant Play entirely |
| 🟢 | Only in Radiant Play — playground scaffolding or wrappers (keep, but rebuild on top of real components) |
| ✅ | Scaligent component confirmed working, no equivalent needed in Radiant Play |

---

## LAYOUT

| Component | Radiant Play | Scaligent | Status | Notes |
|-----------|-------------|-----------|--------|-------|
| Page Layout Shell | AppShell | `Layout` + `Header` + `LeftSideBar` + `Content` + `Footer` | 🟢 | RP's AppShell is a wrapper — rebuild it using Scaligent's slot-based layout primitives |
| Sidebar / Side Nav | Sidebar, AppSidebar | `SideNavigation` (with `ListSection`, `CustomSection`) | 🟢 | RP's Sidebar wraps Scaligent's SideNavigation — keep wrapper, swap internals |
| Global Header | GlobalHeader | `Layout.Header` | 🟢 | RP's GlobalHeader is ThoughtSpot-specific — rebuild using Scaligent's header slot |
| Flex Row | — | `Horizontal` | 🔴 | Not in RP. Key layout primitive — add to prototype toolkit |
| Flex Column | — | `Vertical` | 🔴 | Not in RP. Key layout primitive — add to prototype toolkit |
| Generic Flex View | — | `View` | 🔴 | Not in RP. Base flex container |
| CSS Grid | — | `Grid`, `RdGrid`, `RdGridItem` | 🔴 | Not in RP |
| Divider | Divider | `Divider` | 🔄 | Replace |

---

## FORM CONTROLS

| Component | Radiant Play | Scaligent | Status | Notes |
|-----------|-------------|-----------|--------|-------|
| Button | Button (3 variants, 3 sizes) | `Button` (ButtonSize enum) | 🔄 | Replace — Scaligent has same pattern |
| Text Input | TextInput | `Input` | 🔄 | Replace |
| Text Area | TextArea | `TextArea` | 🔄 | Replace |
| Checkbox | Checkbox | `Checkbox` | 🔄 | Replace — Scaligent also has `NestedCheckbox` |
| Nested Checkbox | — | `NestedCheckbox` | 🔴 | Not in RP |
| Radio | Radio | `Radio` | 🔄 | Replace |
| Toggle / Switch | Toggle | `Toggle` | 🔄 | Replace |
| Select / Dropdown | Select (searchable) | `Select` | 🔄 | Replace |
| Search Input | SearchInput | `Input` (styled variant) | 🔄 | Replace with Scaligent Input + search styling |
| Segmented Control | SegmentedControl | `SegmentControl` | 🔄 | Replace |
| Date Picker | DatePicker | `DatePicker` | 🔄 | Replace |
| Form Field Wrapper | — | `FormControl` | 🔴 | Not in RP — label association utility |
| Color Picker | — | `ColorPicker` (SELECTOR_TYPE enum) | 🔴 | Not in RP |
| Gradient Picker | — | `GradientColorPicker` | 🔴 | Not in RP |
| Direction Control | — | `DirectionControl` | 🔴 | Not in RP |
| Numeric Filter Input | — | `NumericFilterInput` | 🔴 | Not in RP |
| Mention Input | — | `InputMentions` | 🔴 | Not in RP |
| Filter Dialog | FilterDialog | `FilterModal` | 🔄 | Replace with Scaligent FilterModal |

---

## NAVIGATION

| Component | Radiant Play | Scaligent | Status | Notes |
|-----------|-------------|-----------|--------|-------|
| Tabs | Tabs | `Tab` (TabTraySize, TabTrayLayout) | 🔄 | Replace |
| Menu / Dropdown | Menu | `Menu` (MenuVariant, MenuTheme) | 🔄 | Replace |
| Action Menu | — | `ActionMenu` + `ActionMenuItem` + `ActionMenuItemGroup` | 🔴 | Not in RP — contextual action menus |
| Breadcrumbs | Breadcrumbs | via `Link` | 🔄 | Replace using Scaligent Link |
| Pagination | Pagination (Numbers/Dots/Range) | `Pagination` | 🔄 | Replace |
| Stepper (horizontal) | Stepper | `Stepper` | 🔄 | Replace |
| Vertical Stepper | — | `VerticalStepper` (with TaskCard variants) | 🔴 | Not in RP — complex onboarding flows |

---

## DATA DISPLAY

| Component | Radiant Play | Scaligent | Status | Notes |
|-----------|-------------|-----------|--------|-------|
| Card | Card (Header/Body/Footer) | `Card` (CardHeader/CardBody/CardFooter) | 🔄 | Replace — near-identical API |
| Table | Table (sortable, selectable) | `Table` (TABLE_CONTENT_DENSITY, TABLE_THEME, ag-grid) | 🔄 | Replace — Scaligent's is far more powerful (ag-grid based) |
| Avatar | Avatar + AvatarGroup | `Avatar` (AvatarSize enum) | 🔄 | Replace |
| Chip | Chip (attribute/measure/filter/skeleton) | `Chip` | 🔄 | Replace |
| Typography | Typography (V2 variants + legacy) | `Typography` (Variants, Colors enums) | 🔄 | Replace |
| List | — | `List` + `DraggableList` | 🔴 | Not in RP |
| Managed List | — | `ManagedList` | 🔴 | Not in RP — list with add/remove management |
| No Data / Empty State | — | `NoData` | 🔴 | Not in RP — empty state placeholder |
| Trending / Popular | — | `Trending` + `TrendingSection` | 🔴 | Not in RP |
| Explainer Card | — | `ExplainerCard` | 🔴 | Not in RP — educational/onboarding card |
| Accordion | Accordion (allowMultiple, variants) | `Accordion` + `AccordionList` | 🔄 | Replace — Scaligent also has data-driven AccordionList |
| Illustration | — | `Illustration` (IllustrationId, IllustrationSize) | 🔴 | Not in RP — decorative illustration assets |
| Image | — | `Image` | 🔴 | Not in RP |
| Video | — | `Video` (VideoConfig, VideoSize) | 🔴 | Not in RP |
| Safe HTML | — | `SafeHTML` | 🔴 | Not in RP — XSS-safe HTML rendering |
| Selectors (Color/Font/Gradient/Thumbnail) | — | `Selectors` (compound) | 🔴 | Not in RP |
| Formatters | — | `Formatters` (Text/Number/Line/Interval/Background/Marker) | 🔴 | Not in RP — data viz formatters |

---

## OVERLAYS & MODALS

| Component | Radiant Play | Scaligent | Status | Notes |
|-----------|-------------|-----------|--------|-------|
| Modal | Modal (simple/wizard/subnavigation/splashscreen) | `Modal` (ModalSize, ModalType) | 🔄 | Replace — very similar API |
| Tooltip | Tooltip | `Tooltip` (TooltipAlignment, TooltipPosition) | 🔄 | Replace |
| Popover | Popover | `Popover` (PopoverPositionable, PopoverToggle) | 🔄 | Replace |
| Wizard Modal | WizardModal | `Wizard` + `ModalWizard` + `WizardModal` | 🔄 | Replace — Scaligent has richer step navigation |
| Confirm Dialog | ConfirmDialog | via `Modal` | 🟢 | Keep as a thin wrapper over Scaligent Modal |
| Form Modal | FormModal | via `Modal` | 🟢 | Keep as a thin wrapper over Scaligent Modal |
| Overlay Loading | — | `OverlayLoading` | 🔴 | Not in RP — full-screen blocking overlay |
| Custom List Builder Modal | — | `CustomListBuilderModal` | 🔴 | Not in RP |
| Filter Modal | — | `FilterModal` | 🔴 | Not in RP |
| Tour / Guided Walkthrough | — | `Tour` (TourSteps, EVENTS, LIFECYCLE, STATUS) | 🔴 | Not in RP — full guided tour system via react-joyride |

---

## FEEDBACK & STATUS

| Component | Radiant Play | Scaligent | Status | Notes |
|-----------|-------------|-----------|--------|-------|
| Alert / Banner | Alert (info/success/warning/failure/muted, page/section variants) | `Alert` (compound — Alert.Banner, Alert.Toast, Alert.Muted, Alert.Dialogue) | 🔄 | Replace — Scaligent's Alert is compound |
| Toast | Toast | `Alert.Toast` (via Alert compound) | 🔄 | Replace with Alert.Toast |
| Loading Indicator | LoadingIndicator (+ Skeleton, LoadingOverlay) | `LoadingIndicator` | 🔄 | Replace |
| Progress Bar | ProgressBar (colors, indeterminate) | `ProgressBar` (ProgressBarColor) | 🔄 | Replace |

---

## COMPLEX / SPECIALIZED COMPONENTS

| Component | Radiant Play | Scaligent | Status | Notes |
|-----------|-------------|-----------|--------|-------|
| Icon | Icon (name, size, color) | `Icon` (IconID, IconColor, IconSize enums) | 🔄 | Replace — Scaligent uses SVG sprite via `<use href>` |
| Link | Link (internal/external) | `Link`, `RoutedLink`, `BaseLink` | 🔄 | Replace |
| Rich Text Editor | — | `RichTextEditor` | 🔴 | Not in RP |
| Drag & Drop | — | `useDraggable`, `useDroppable`, `PragmaticDnDProvider` hooks | 🔴 | Not in RP — full DnD system |
| Search Bar | — | `SearchBar` (inside CustomListBuilderModal) | 🔴 | Not in RP as standalone |
| Slider | — | `Slider` | 🔴 | Not in RP |
| Tree | — | `Tree` | 🔴 | Not in RP |
| Tree Table | — | `TreeTable` | 🔴 | Not in RP |
| Legend | — | `Legend` | 🔴 | Not in RP |
| Split Pane | — | `SplitPane` | 🔴 | Not in RP |
| Skeleton | LoadingIndicator.Skeleton | `LoadingIndicator` (includes skeleton) | 🔄 | Replace |
| Form Builder | — | `FormBuilder` (ElementType, RadioGroupFieldConfig) | 🔴 | Not in RP — dynamic form from config |
| Dynamic Form | — | `DynamicForm` | 🔴 | Not in RP |
| Facet Sort Bar | — | `FacetSortBar` + `SegmentControlFacet` | 🔴 | Not in RP |
| Manage Tags | — | `TagsModal` + `ManageTags` | 🔴 | Not in RP |
| Cord (Collaboration) | — | `CordContextProvider`, `WrapAsCordComponent` | 🔴 | Not in RP — Cord comments integration |

---

## SUMMARY COUNTS

| Status | Count | Description |
|--------|-------|-------------|
| 🔄 Replace | **32** | Components in both — RP version is hand-authored, replace with real Scaligent component |
| 🔴 Missing | **38** | In Scaligent only — not available in RP at all |
| 🟢 Keep (wrappers) | **5** | AppShell, Sidebar, GlobalHeader, ConfirmDialog, FormModal — playground scaffolding built on top of real components |

---

## MIGRATION PRIORITY

### Phase 1 — High impact, low complexity (replace first)
These are the components used in almost every prototype:

| Component | Used in prototypes |
|-----------|-------------------|
| Button | All prototypes |
| Modal | AdminGroups, MuseChat, SpotterModel |
| Table | SpotterMemory, Liveboard |
| Input / TextInput | AdminGroups, SpotterModel |
| Select | AdminGroups, SpotterModel |
| Checkbox / Radio / Toggle | AdminGroups, ImpersonationV2 |
| Alert / Toast | ImpersonationV2, MuseChat |
| Tabs | Liveboard, AdminGroups |
| Card | Liveboard, SpotterModel |
| Avatar | All prototypes with user data |
| Typography | All prototypes |
| LoadingIndicator | All prototypes |
| Icon | All prototypes |

### Phase 2 — High impact, adds new capability
Components that would unlock new prototype types:

| Component | Unlocks |
|-----------|---------|
| `Horizontal` / `Vertical` / `View` | Proper layout primitives — no more custom flex CSS |
| `ActionMenu` | Contextual menus, right-click flows |
| `SideNavigation` | Real nav with all ThoughtSpot features |
| `NoData` | Empty states in every data screen |
| `Tour` | Onboarding flow prototypes |
| `OverlayLoading` | Loading state prototypes |
| `Wizard` / `ModalWizard` | Multi-step flow prototypes |
| `Illustration` | Richer empty states and onboarding |
| `VerticalStepper` + `TaskCard` | Onboarding and setup flows |

### Phase 3 — Specialized (add when needed)
| Component | Use case |
|-----------|---------|
| `RichTextEditor` | Document/annotation features |
| `DragDrop` hooks | Drag-and-drop interactions |
| `FormBuilder` / `DynamicForm` | Complex form configuration |
| `Tree` / `TreeTable` | Hierarchical data exploration |
| `ColorPicker` / `GradientPicker` | Theming / customization flows |
| `FacetSortBar` | Search and filter experiences |
| `Formatters` | Data visualization configurations |
| `Cord` | Collaboration features |

---

## DESIGN TOKENS: PARITY

| Category | Radiant Play (hand-authored) | Scaligent radiant-styles | Status |
|----------|------------------------------|--------------------------|--------|
| Color tokens (3-tier) | ✅ `referenceColors`, `systemColors`, `rdComponentColors` | ✅ SCSS in `css/` — `_external-variables.scss`, `_internal-variables.scss` | 🔄 Replace JS tokens with SCSS CSS variables |
| Typography | ✅ JS token object | ✅ SCSS `foundations/typography/` | 🔄 Replace |
| Spacing | ✅ JS token object | ✅ SCSS `foundations/spacing/` + `_spacing.scss` | 🔄 Replace |
| Shadows | ✅ JS token object | ✅ SCSS `_ui-styles.scss` | 🔄 Replace |
| Borders | ✅ JS token object | ✅ SCSS `_borders.scss` | 🔄 Replace |
| Radius | ✅ JS token object | ✅ SCSS `_params.scss` | 🔄 Replace |
| Animations | ✅ JS token object | ✅ SCSS `_animations.scss`, `_animations-library.scss` | 🔄 Replace |
| Breakpoints | ✅ JS token object | ✅ SCSS `foundations/media-queries/` | 🔄 Replace |
| Z-Index | ✅ JS token object | ✅ SCSS (in params) | 🔄 Replace |
| Icons | SVG components | SVG sprites via `<use href>` | 🔄 Replace — different rendering model |
| Theme (light/dark) | ✅ `lightTheme`, `darkTheme` JS | ✅ SCSS `_theme.scss` | 🔄 Replace |

**Key token migration note:** Radiant Play uses JS-based tokens; Scaligent uses SCSS CSS variables. Once migrated inside Scaligent's workspace, all tokens come automatically via `@import '@thoughtspot/radiant-styles/css/external-variables'` — no JS token system needed.

---

## PROTOTYPES: WHAT REAL COMPONENTS THEY'D USE

| Prototype | Key Scaligent components needed |
|-----------|-------------------------------|
| Liveboard | `Table`, `Card`, `Horizontal`/`Vertical`, `Tab`, `LoadingIndicator`, `Avatar`, `Chip` |
| Cmdk | `Input` (search), `Menu`, `ActionMenu`, `Popover`, `Icon` |
| SpotterMemory | `Table`, `Input`, `Checkbox`, `Pagination`, `Select`, `NoData` |
| AdminGroups | `Wizard`/`ModalWizard`, `Input`, `Checkbox`, `Select`, `Avatar`, `Table`, `Tab` |
| ImpersonationV2 | `Alert.Toast`, `Modal`, `Button`, `Avatar`, `Icon` |
| MuseChat | `Input`, `Button`, `Avatar`, `Icon`, `LoadingIndicator`, `Chip` |
| SpotterModel | `Table`, `Modal`, `Button`, `Input`, `Select`, `Stepper`, `AccordionList` |
| ModalPatterns | `Modal`, `Wizard`, `WizardModal`, `ModalSize` variants |

---

## Reference

| Codebase | Component source |
|----------|-----------------|
| Scaligent radiant-react | `js/ts-packages/radiant-react/src/` — 70 components |
| Scaligent radiant-styles | `js/ts-packages/radiant-styles/css/` — SCSS tokens |
| Radiant Play | `src/components/` — 41 hand-authored components |
| Radiant Play prototypes | `src/prototypes/` — 8 deployed prototypes |
