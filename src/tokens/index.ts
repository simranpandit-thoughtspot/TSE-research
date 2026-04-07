/**
 * Design Tokens
 * 
 * Main export file for all design tokens.
 * 
 * Architecture:
 * - Brand (Primitives): Raw values like colors, sizes
 * - Alias (Semantic): Purpose-driven tokens
 * - Mapped (Components): Component-specific tokens with theme support
 */

// Colors
export * from './colors';

// Typography
export * from './typography';
export {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  textStyles,
  v2TextStyles,
} from './typography';

// Spacing
export * from './spacing';
export {
  spacing,
  componentSpacing,
  gap,
  margin,
  padding,
  SPACING_UNIT,
} from './spacing';

// Border Radius
export * from './radius';
export { radius, componentRadius } from './radius';

// Shadows
export * from './shadows';
export { shadows, elevation, componentShadows } from './shadows';

// Borders
export * from './borders';
export { borderWidth, borderStyle, border, componentBorders } from './borders';

// Animation
export * from './animation';
export {
  duration,
  easing,
  transition,
  componentAnimation,
} from './animation';

// Breakpoints
export * from './breakpoints';
export {
  breakpoints,
  mediaQueries,
  containerMaxWidth,
} from './breakpoints';

// Z-Index
export * from './zIndex';
export { zIndex, componentZIndex } from './zIndex';

// Icons
export * from './icons';
export { iconSize, iconSizeAlias, iconStrokeWidth } from './icons';

// CSS Variables
export * from './css-variables';
export {
  generateCSSVariables,
  generateThemeVariables,
  variablesToCSS,
  generateCSSStylesheet,
  cssVar,
} from './css-variables';

// Theme
export * from './theme';
export {
  lightTheme,
  darkTheme,
  themes,
  getTheme,
  getSystemTheme,
  applyTheme,
  watchSystemTheme,
} from './theme';

// Convenience re-exports
import { referenceColors as brandColors } from './colors';
import { textStyles, v2TextStyles } from './typography';
import { spacing, componentSpacing } from './spacing';
import { radius, componentRadius } from './radius';
import { shadows, componentShadows } from './shadows';
import { componentBorders } from './borders';
import { componentAnimation } from './animation';
import { breakpoints, mediaQueries } from './breakpoints';
import { zIndex, componentZIndex } from './zIndex';
import { themes } from './theme';
import { iconSize, iconSizeAlias } from './icons';

/**
 * Complete tokens object for easy access
 */
export const tokens = {
  colors: {
    brand: brandColors,
  },
  typography: textStyles,
  typographyV2: v2TextStyles,
  spacing: {
    scale: spacing,
    components: componentSpacing,
  },
  radius: {
    scale: radius,
    components: componentRadius,
  },
  shadows: {
    scale: shadows,
    components: componentShadows,
  },
  borders: componentBorders,
  animation: componentAnimation,
  breakpoints,
  mediaQueries,
  zIndex: {
    scale: zIndex,
    components: componentZIndex,
  },
  icons: {
    size: iconSize,
    sizeAlias: iconSizeAlias,
  },
  themes,
} as const;

export type Tokens = typeof tokens;

export default tokens;

