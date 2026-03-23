# Changelog

All notable changes to the Radiant Play will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.0] - 2026-02-03

### Added

- **Surfaces Showcase** (`/radiant/surfaces`): New dedicated section for Modal patterns with interactive examples
  - Displays all 4 modal sizes (M1: 394px, M2: 788px, M3: 1182px, M4: Full Screen)
  - Shows all 4 modal types (Simple, Wizard, Sub-navigation, Splash Screen)
  - Includes usage code examples with copy functionality
  - Spacing reference and footer button alignment documentation
- **Modal Sub-components**: Reusable modal building blocks
  - `ModalFooter`: Footer with tertiary (left), secondary and primary (right) action slots
  - `ModalHeader`: Header with title, eyebrow, and close button
  - `ModalWizardProgress`: Progress bar for wizard modals (2-4 steps)
  - `ModalNavPanel` & `ModalNavItem`: Left navigation panel for sub-navigation modals
  - `ModalSplashContent`: Content component for splash screen modals

### Changed

- **Modal Spacing**: Updated to match exact Figma specifications
  - Header padding: 20px vertical, 24px horizontal
  - Content padding: 24px
  - Footer padding: 20px vertical, 24px horizontal
- **Modal Footer Alignment**: Fixed CTA buttons to be right-aligned
  - Primary actions now use `margin-left: auto` for proper right alignment
  - Tertiary actions remain on the left
  - Footer layout follows Figma spec: `[Tertiary] ... [Secondary] [Primary]`

### Removed

- **ModalPatterns from Playground**: Removed from prototype gallery (now accessible via Surfaces showcase)

### Migration Notes

- Modal patterns are now part of the Radiant design system (Surfaces section) rather than playground prototypes
- Access modals at `/radiant/surfaces` instead of `/playground/ModalPatterns`
- Modal sub-components are exported from `@/components/Modal` for custom compositions

---

## [1.1.0] - 2026-01-30

### Added

- **New Home Page**: Simple split landing page with two large cards for navigating to Radiant (design system) and Playground (projects)
- **Playground Gallery** (`/playground`): Grid view of all registered projects with project cards showing name, description, and author
- **Full-Page Project View** (`/playground/:projectName`): Distraction-free environment for individual projects with:
  - Floating back button (top-left)
  - Project name badge (top-right)
  - Escape key support to return to gallery
  - Lazy loading with Suspense
- **Project Registry** (`src/prototypes/registry.ts`): Central registry for discovering and managing playground projects with metadata support

### Changed

- **URL Structure**: Reorganized routes under `/radiant/*` for design system content:
  - `/radiant` - Component overview
  - `/radiant/components/*` - Component documentation pages
  - `/radiant/architecture` - Token architecture
  - `/radiant/icons` - Icon gallery
  - `/radiant/examples/*` - Example prototypes
- **Renamed `HomePage.tsx` to `RadiantHomePage.tsx`**: The original component overview page is now dedicated to the Radiant section
- **Updated App.tsx routing**: Complete restructure with new route definitions and legacy redirects

### Removed

- **`PlaygroundShowcase.tsx`**: Replaced by the new Playground system (Gallery + Project views)
- **`WelcomePage.tsx`**: Replaced by the new simple split HomePage

### Migration Notes

- Old routes like `/components`, `/architecture`, `/icons` now redirect to their `/radiant/*` equivalents
- The playground is no longer a component demo; it's now a project workspace
- To add new projects to the Playground:
  1. Create a folder in `src/prototypes/`
  2. Export a default component from `index.tsx`
  3. Register the project in `src/prototypes/registry.ts`

---

## [1.0.0] - Initial Release

### Added

- Core component library (17 components)
- 3-tier design token system (Brand, Alias, Mapped)
- Icon library (46 icons)
- Component documentation pages
- Example prototypes (Filter Dialog, Data Dashboard, Settings Panel)
- AI-assisted prototyping workflow
- Collaboration documentation (forking, branching, contributing)
