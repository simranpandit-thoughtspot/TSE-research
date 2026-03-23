# Radiant Play — To-Do

---

## Documentation

- [x] ~~Update `SETUP-GUIDE.md` example prototypes table~~ — done 2026-03-04
- [ ] `FORK-WORKFLOW.md` — add section on syncing a fork with upstream after a major update

---

## AI Orchestration (.cursor/rules/)

- [ ] `product-knowledge.md` — expand Spotter section with AI search journey and user flows
- [ ] `token-usage.md` — add dark mode token usage examples
- [ ] `prototype-generation.md` — add accessibility checklist to Step 10

---

## Component System

- [ ] Promote `StatusBadge` local component (used in 3+ prototypes) to `src/components/`
- [ ] Add `Breadcrumb` component (frequently needed, not yet in library)
- [ ] Review dark mode support across the 35 new Phase 1-4 components

---

## Prototypes & Registry

- [ ] Add thumbnail images to ImpersonationV2, MuseChat, SpotterModel in the registry
- [x] ~~Archive or remove the `_examples/FilterDialog` example~~ — done 2026-03-04

---

## Infrastructure

- [ ] Investigate the large chunk warning from Vite build (`index-Djd8lWv0.js` at 787KB) — consider code splitting
- [ ] Set up Dependabot auto-merge for patch-level dev dependency updates

---

## Completed (recent)

- [x] 35 new Scaligent-parity components added (38 → 74 total) — 2026-03-02
- [x] Component registry updated with all new entries, source set to scaligent — 2026-03-02
- [x] AI orchestration layer refreshed (6 rule files updated) — 2026-03-02
- [x] Changelog v2.1.0 entry added — 2026-03-02
- [x] Rollup path traversal vulnerability patched (GHSA-mw96-cpmx-2vgc) — 2026-03-02
- [x] Stale planning docs and completed .cursor/plans/ cleaned up — 2026-03-03
- [x] Add Claude Code support (CLAUDE.md + memory baseline) — 2026-03-04
- [x] Archive planning docs to docs/archive/ — 2026-03-04
- [x] Sync project.config.ts with all 8 prototypes — 2026-03-04
