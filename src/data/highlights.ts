/**
 * Curated highlights — cherry-picked across releases. Newest first.
 *
 * Visibility rule: items from the last 60 days, OR the most recent 6 items
 * if fewer than 6 fall inside that window. Maintainer prunes the bottom of
 * this list occasionally if entries get stale before the window drops them.
 */
export interface Highlight {
  title: string;
  description: string;
  version: string; // links back to the matching versionHistory entry
  date: string; // ISO date for the time-based window
}

export const HIGHLIGHTS: Highlight[] = [
  {
    title: 'Add Muze charts on demand',
    description: 'New opt-in guide for adding Muze (private packagecloud library) to a prototype. Includes auth setup, install steps, chart-shape cheatsheet (single column, dual, trellis, stacked), and resize-aware tile mounting. Default install stays friction-free for designers who don\'t use Muze.',
    version: '26.5.2',
    date: '2026-05-07',
  },
  {
    title: 'Data model context + sample prototype',
    description: 'New Data Model Editor prototype with retail schema preset, draggable table cards, column tree, and join connectors. Shared _datamodel module ready to drop into other prototypes.',
    version: '26.5.0',
    date: '2026-04-30',
  },
  {
    title: 'SpotterModel interface',
    description: 'AI agent panel with table, join, column, and formula suggestions, confidence badges, reasoning blocks, and version-history restore. Backed by a /api/chat proxy and a /switch-model command for Haiku / Sonnet / Opus.',
    version: '26.5.0',
    date: '2026-04-30',
  },
  {
    title: 'Project status dashboard',
    description: 'A local HTML dashboard with overview, branches, forks/upstream, worktrees, and docs/plans tabs. Run /project-status; zero LLM token cost.',
    version: '26.4.4c',
    date: '2026-04-28',
  },
  {
    title: 'Modal redesign — Figma alignment',
    description: 'Header padding restored, footer fixed at 72px with corrected CTA placement, wizard stepper rebuilt as discrete segments, RdModal absorbed into Modal.',
    version: '26.4.4c',
    date: '2026-04-27',
  },
  {
    title: 'Token system — Figma 3.0 alignment',
    description: 'Phases 1–5 of 8 shipped: primitive colors, light semantic colors, typography, shadows, layout. Dark mode (Phase 6) is next.',
    version: '26.4.4c',
    date: '2026-04-28',
  },
  {
    title: 'Changelog highlights',
    description: 'Curated highlights at the top of this page surface major work across recent releases — like the section you are reading.',
    version: '26.4.4c',
    date: '2026-04-28',
  },
];

const SIXTY_DAYS_MS = 60 * 24 * 60 * 60 * 1000;

export function getVisibleHighlights(now: number = Date.now()): Highlight[] {
  const recent = HIGHLIGHTS.filter((h) => now - new Date(h.date).getTime() <= SIXTY_DAYS_MS);
  if (recent.length >= 6) return recent;
  return HIGHLIGHTS.slice(0, Math.max(6, recent.length));
}
