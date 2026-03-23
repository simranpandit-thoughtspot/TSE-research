# Contributing Back

How to contribute your improvements back to the main Radiant Play.

## Why Contribute?

When you create something useful—a new component, a helpful pattern, better documentation—consider sharing it:

- Help other designers benefit from your work
- Get feedback and improvements from the community
- Build a better shared tool for everyone

## What to Contribute

### Good Contributions

- **New components** that follow Radiant patterns
- **Bug fixes** for existing components
- **Documentation improvements**
- **Example prototypes** that demonstrate patterns
- **Mock data** that's useful for common scenarios

### Not for Contribution

- **Personal prototypes** (keep in your fork)
- **Project-specific code**
- **Incomplete features**
- **Breaking changes** without discussion

## Contribution Process

### 1. Prepare Your Change

Start from a clean, updated main:

```bash
# Update your fork
git fetch upstream
git checkout main
git merge upstream/main

# Create a contribution branch
git checkout -b contribution/your-feature-name
```

### 2. Make Your Changes

Follow these guidelines:

**Code Quality:**
- Follow existing patterns in the codebase
- Use TypeScript properly
- Add JSDoc comments to components
- Use design tokens, not hard-coded values

**Component Standards:**
- Create folder with component name
- Include `.tsx`, `.module.css`, and `index.ts`
- Add displayName
- Export all types

**Documentation:**
- Update relevant docs
- Add usage examples
- Include props documentation

### 3. Test Your Changes

```bash
# Start dev server
npm run dev

# Verify your changes work
# Test in different scenarios
# Check for console errors
```

### 4. Commit Your Changes

Use clear, descriptive commits:

```bash
git add .
git commit -m "Add: DatePicker component

- Basic date selection
- Range selection mode
- Keyboard navigation
- Uses design tokens"
```

### 5. Push and Create PR

```bash
git push origin contribution/your-feature-name
```

Then on galaxy:

1. Go to `https://galaxy.corp.thoughtspot.com/mohammed-faris/radiantplay`
2. Click "Pull requests" → "New pull request"
3. Click "compare across forks"
4. Select your fork and branch
5. Fill out the PR template

## Pull Request Template

Use this template for your PR description:

```markdown
## Summary

Brief description of what this PR adds/changes.

## Changes

- List of specific changes
- One bullet per change
- Be specific

## Screenshots

[If visual changes, add before/after screenshots]

## Testing

How to test these changes:
1. Step one
2. Step two

## Checklist

- [ ] Follows code patterns
- [ ] Uses design tokens
- [ ] Has TypeScript types
- [ ] Includes documentation
- [ ] Tested in browser
```

## Review Process

After submitting:

1. **Automated checks** run (if configured)
2. **Maintainer review** within a few days
3. **Feedback** may be requested
4. **Approval and merge** when ready

### Responding to Feedback

- Be open to suggestions
- Ask questions if unclear
- Make requested changes promptly
- Update the PR with new commits

## Component Contribution Checklist

When contributing a new component:

```
□ Component file (ComponentName.tsx)
  □ Props interface with JSDoc
  □ forwardRef for interactive elements
  □ displayName set
  □ Default export

□ Styles file (ComponentName.module.css)
  □ Uses CSS variables
  □ Follows naming conventions
  □ Has focus states

□ Index file (index.ts)
  □ Exports component
  □ Exports types

□ Update components/index.ts
  □ Add export line

□ Documentation
  □ Usage examples in JSDoc
  □ Props documented

□ Testing
  □ Works in browser
  □ Keyboard accessible
  □ No console errors
```

## Example: Contributing a Component

### Step 1: Create Files

```
src/components/Badge/
├── Badge.tsx
├── Badge.module.css
└── index.ts
```

### Step 2: Implement Component

```tsx
// Badge.tsx
import React, { forwardRef } from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Text content */
  label: string;
  /** Visual variant */
  variant?: BadgeVariant;
}

/**
 * Badge
 * 
 * A small label for status or counts.
 * 
 * @example
 * ```tsx
 * <Badge label="New" variant="success" />
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({
  label,
  variant = 'default',
  className,
  ...props
}, ref) => {
  const classes = [
    styles.badge,
    styles[variant],
    className,
  ].filter(Boolean).join(' ');

  return (
    <span ref={ref} className={classes} {...props}>
      {label}
    </span>
  );
});

Badge.displayName = 'Badge';
export default Badge;
```

### Step 3: Add Styles

```css
/* Badge.module.css */
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-sm);
}

.default {
  background-color: var(--color-brand-gray-20);
  color: var(--color-brand-gray-70);
}

.success {
  background-color: var(--color-brand-green-10);
  color: var(--color-brand-green-70);
}
/* ... */
```

### Step 4: Export

```ts
// index.ts
export { Badge, default } from './Badge';
export type { BadgeProps, BadgeVariant } from './Badge';
```

### Step 5: Update Main Index

```ts
// components/index.ts
export * from './Badge';
```

### Step 6: Create PR

Follow the process above to create your pull request.

## Getting Help

If you're unsure about contributing:

- Open a discussion before starting large changes
- Ask in the PR if you need guidance
- Reference existing components for patterns
