# Upstream Update Notification Plan

## Goal

Designers on forks see a notification at the start of every AI session when new components, rules, or tokens are available upstream — without blocking their work.

## What gets built

### 1. Shell script: `scripts/check-upstream.sh`

A ~15 line script that:
- Runs `git fetch upstream --quiet` to get latest refs
- Compares `HEAD` against `upstream/main` using `git rev-list --count`
- If upstream is ahead: prints a notification with commit count
- If up to date or no upstream remote: prints nothing (silent exit)

**Output format:**
```
📦 Radiant Play: 12 new commits upstream. Run /sync-upstream to get latest components and rules.
```

**Edge cases:**
- No `upstream` remote → silent exit (no error)
- No network → silent exit (fetch fails quietly)
- Already up to date → no output
- Upstream is behind fork → no output (fork is ahead, nothing to sync)

### 2. CLAUDE.md instruction

Add to the Behavior Rules section:

```markdown
At the start of every conversation, silently run `scripts/check-upstream.sh`.
If it outputs a message, show it to the designer before doing anything else.
If it outputs nothing, proceed normally without mentioning it.
```

This is tool-agnostic — any AI tool that reads CLAUDE.md will follow it.

### 3. Script travels with the repo

Since `scripts/check-upstream.sh` is committed to the repo, every fork gets it automatically on their next sync. No per-designer setup beyond having the `upstream` remote (already part of onboarding in guide.html).

## What the designer experiences

**Case 1: Updates available**
```
Designer: "Add a filter panel to the dashboard"

AI: 📦 Radiant Play: 12 new commits upstream. Run /sync-upstream to get latest components and rules.

    Sure, let me add a filter panel...
```

**Case 2: Up to date**
```
Designer: "Add a filter panel to the dashboard"

AI: Sure, let me add a filter panel...
```

No friction. No blocking. Just awareness.

## What this does NOT do

- Does not auto-sync — designer decides when to run `/sync-upstream`
- Does not block their work — notification only
- Does not run repeatedly in the same session — once at start
- Does not conflict with Claude Code's own "Update available" message — different wording and prefix

## Prerequisites for designers

- `upstream` remote configured (one-time setup during onboarding)
- Network access for `git fetch`

## Files touched

| File | Change |
|------|--------|
| `scripts/check-upstream.sh` | New — the notification script |
| `CLAUDE.md` | Add one instruction to Behavior Rules |

## Open questions

1. **Should the notification include what changed?** e.g. "3 new components, 2 rule updates" — this requires parsing commit messages which adds complexity. Could start simple (just commit count) and add detail later.
2. **Should it run on every conversation or just the first per day?** Running every time ensures they don't miss updates but could be noisy if they start many sessions. A timestamp check (e.g. skip if checked within last hour) adds complexity.
3. **Should the main repo (non-fork) also show this?** Currently the script silently exits if no `upstream` remote exists, so it won't show anything on your main setup. But if you want to see notifications about galaxy when working from origin, the script would need to check both remotes.

## Recommendation

Start simple: commit count only, run every session, fork-only. Add commit detail parsing and frequency throttling only if designers ask for it.
