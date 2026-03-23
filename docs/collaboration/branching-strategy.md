# Branching Strategy

A guide to organizing your work with Git branches in the Radiant Play.

## Branch Types

### Main Branch (`main`)

- The stable, production-ready branch
- Contains the base prototyping kit
- Should always be in a working state
- Only updated via pull requests or upstream syncs

### Prototype Branches (`prototype/*`)

For individual prototype projects:

```
prototype/user-onboarding
prototype/analytics-dashboard
prototype/settings-redesign
```

### Feature Branches (`feature/*`)

For new components or enhancements:

```
feature/datepicker-component
feature/drag-drop-support
feature/dark-mode
```

### Fix Branches (`fix/*`)

For bug fixes:

```
fix/modal-close-button
fix/table-sorting
fix/responsive-layout
```

## Workflow

### Starting a New Prototype

```bash
# Ensure you're on main and up to date
git checkout main
git pull origin main

# Create your prototype branch
git checkout -b prototype/my-project

# Start working...
```

### Daily Workflow

```bash
# Start of day - make sure your branch is current
git checkout prototype/my-project
git fetch origin

# Make changes throughout the day
# Commit regularly with meaningful messages

git add .
git commit -m "Add filter dialog component"

git add .
git commit -m "Implement search functionality"

# End of day - push your work
git push origin prototype/my-project
```

### Finishing a Prototype

```bash
# Ensure all changes are committed
git status

# Push final changes
git push origin prototype/my-project

# Optionally, merge back to main for your fork
git checkout main
git merge prototype/my-project
git push origin main
```

## Commit Messages

### Format

```
<type>: <short description>

[optional longer description]
```

### Types

| Type | Use Case |
|------|----------|
| `Add` | New files or features |
| `Update` | Changes to existing code |
| `Fix` | Bug fixes |
| `Remove` | Deleted files or features |
| `Refactor` | Code restructuring |
| `Docs` | Documentation changes |
| `Style` | Formatting, no logic change |

### Examples

```
Add: User profile settings prototype

Add: Table component with sorting

Update: Improve button hover states

Fix: Modal not closing on escape key

Remove: Deprecated chip variants

Docs: Add prototyping guide
```

## Managing Multiple Prototypes

### Switching Between Projects

```bash
# Save current work
git add .
git commit -m "WIP: progress on current feature"

# Switch to another project
git checkout prototype/other-project

# When returning
git checkout prototype/my-project
```

### Parallel Development

You can have multiple prototype branches active:

```
main
├── prototype/project-a (active)
├── prototype/project-b (in progress)
└── prototype/project-c (completed)
```

## Visual Overview

```
main ─────────────────────────────────────────────────────────
       │                            ↑
       │                            │ merge
       └─ prototype/my-project ─────┘
           │     │     │
           ↓     ↓     ↓
         (commits over time)
```

## Best Practices

### Do

- Create a branch for each distinct prototype
- Commit frequently with clear messages
- Push your work at least daily
- Keep branches focused on one project

### Don't

- Commit directly to main
- Mix multiple unrelated changes in one commit
- Leave uncommitted work overnight
- Create overly long-lived branches

## Cleaning Up

### Delete Merged Branches

```bash
# Delete local branch
git branch -d prototype/completed-project

# Delete remote branch
git push origin --delete prototype/completed-project
```

### List All Branches

```bash
# Local branches
git branch

# All branches including remote
git branch -a
```

## Troubleshooting

### Accidentally Committed to Main

```bash
# If not pushed yet
git reset --soft HEAD~1
git checkout -b prototype/my-project
git commit -m "Your message"

# If already pushed, create a new branch from current state
git checkout -b prototype/my-project
# Then reset main (be careful!)
```

### Need to Update Branch with Main Changes

```bash
git checkout prototype/my-project
git merge main
# Resolve any conflicts
git push origin prototype/my-project
```
