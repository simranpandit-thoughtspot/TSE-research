// @ts-nocheck
/**
 * Command Palette Prototype
 * 
 * A command palette (⌘K) interface for quick navigation and actions.
 * 
 * Features:
 * - Type "/" to show filter options
 * - Context-aware filter ranking based on current page
 * - Multiple UI variants (Figma Spec, Compact, Spacious, Two-Line)
 * - Full keyboard navigation
 * - Liveboard preview background
 * 
 * Based on ThoughtSpot Radiant design system.
 */

// Default export is the full app-shell prototype
export { default } from './CmdkApp';

// Named exports for individual components
export { CmdkDemo } from './CmdkDemo';
export { CmdkApp } from './CmdkApp';
export { CommandPalette } from './CommandPalette';

// Component exports
export {
  CommandSearch,
  KeyboardShortcuts,
  ResultCard,
  ResultCardCompact,
  ResultCardSpacious,
  ResultCardTwoLine16,
  ResultCardTwoLine20,
  FilterChip,
  FilterOptions,
  VariantDropdown,
  ContextDropdown,
} from './components';

// Type exports
export type {
  CommandItem,
  FilterOption,
  PageContext,
  CardVariant,
  ResultCardProps,
  CommandPaletteProps,
  CommandGroup,
  KeyboardShortcut,
  ContextOption,
} from './types';

// Data exports
export {
  FILTER_OPTIONS,
  CONTEXT_OPTIONS,
  CONTEXT_RANKINGS,
  allItems,
  commandGroups,
  keyboardShortcuts,
  getItemsByFilter,
  getRankedFilterOptions,
} from './data/mockData';
