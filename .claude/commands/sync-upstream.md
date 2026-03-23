Sync this fork with the latest changes from the upstream main repo (galaxy: mohammed-faris/radiantplay).

## Instructions

Follow these steps in order. Stop immediately if any step fails and explain what went wrong.

---

### 1. Check working tree and stashes

**Check the working tree:**

Run `git status`.

- If the output is `nothing to commit, working tree clean` — proceed to the stash check.
- If there are modified or untracked files — stage and commit them:
  ```
  git add .
  git commit -m "chore: save WIP before syncing with upstream"
  ```

**Check for stashes:**

Run `git stash list`.

- If there are no stashes — proceed to step 2.
- If stashes exist — show the user what is in each stash:
  ```
  git stash show stash@{0}
  git stash show stash@{1}
  ...
  ```
  Then ask: **"You have stashed work. Do you want to apply it before syncing, or leave it stashed?"**
  - If the user wants to apply it: run `git stash pop` and handle any conflicts before continuing.
  - If the user wants to leave it stashed: proceed to step 2. The stash is safe — merging upstream does not affect stashed work.

---

### 2. Check upstream remote

Run `git remote -v`.

- If `upstream` is listed — proceed to step 3.
- If `upstream` is missing — add it:
  ```
  git remote add upstream https://galaxy.corp.thoughtspot.com/mohammed-faris/radiantplay.git
  ```

---

### 3. Fetch upstream

```
git fetch upstream
```

---

### 4. Show what is coming

Run:
```
git log --oneline HEAD..upstream/main
```

Print the result to the user with a brief summary:
- How many commits behind they are
- One-line summary of the most significant changes (new components, deleted files, etc.)

If the output is empty, print:
```
Already up to date with upstream. Nothing to merge.
```
And stop — there is nothing to do.

---

### 5. Merge upstream

```
git merge upstream/main
```

Two outcomes:

**A — Clean merge (no conflicts)**
Git prints `Merge made by the 'ort' strategy`. Proceed directly to step 7.

**B — Conflict**
Git prints `CONFLICT (content): Merge conflict in src/prototypes/registry.ts`.
This is expected — proceed to step 6.

If the conflict is in any file OTHER than `src/prototypes/registry.ts`, stop and explain what conflicted and why before attempting to resolve it.

---

### 6. Resolve the `registry.ts` conflict

Read `src/prototypes/registry.ts` and find all conflict marker blocks (`<<<<<<<`, `=======`, `>>>>>>>`).

For each conflict block:

1. **Identify upstream entries** — the block after `=======` up to `>>>>>>>`. These are new sample prototypes added to the main repo. Keep all of them exactly as-is.

2. **Identify the designer's entries** — the block between `<<<<<<< HEAD` and `=======`. These are the designer's own prototype registrations. Keep all of them.

3. **Merge the two blocks** — write the final result with:
   - All upstream entries first (in their original order)
   - The designer's entries after, at the bottom
   - Delete the three marker lines entirely (`<<<<<<<`, `=======`, `>>>>>>>`)

4. **Add `section: 'mine'`** — for every designer entry that does not already have a `section` field, add `section: 'mine'` as the last property in that object.

After editing, read the file back and confirm there are no remaining `<<<<<<<` markers.

Then:
```
git add src/prototypes/registry.ts
git commit
```

Accept the default merge commit message (do not modify it).

---

### 7. Verify the build

```
npm run build
```

- If it succeeds — proceed to step 8.
- If it fails — read the error output carefully.

**Common post-merge build errors and fixes:**

| Error | Fix |
|---|---|
| `Cannot find module './MuseChat'` | Remove the `const MuseChat = React.lazy(...)` line from `registry.ts` and its registry entry |
| `Cannot find module './_examples'` | Remove `export { FilterDialogExample } from './_examples'` from `src/prototypes/index.ts` |
| TypeScript error in designer's prototype | This is unrelated to the sync — flag it to the designer and proceed with the push anyway |

After fixing, re-run `npm run build` to confirm it passes before continuing.

---

### 8. Push to fork

```
git push origin main
```

---

### 9. Report

Print a summary in this format:

```
Synced with upstream!

Pulled in X commits:
  • <one-line summary of most important changes>
  • <one-line summary>
  ...

Your prototype: intact — src/prototypes/<name>/ was not touched.
registry.ts: conflict resolved — your entry preserved with section: 'mine'.

Your fork is now up to date.
Next: keep building, or /ship when ready to push to staging.
```

If there was nothing to sync:
```
Already up to date — no changes from upstream.
```
