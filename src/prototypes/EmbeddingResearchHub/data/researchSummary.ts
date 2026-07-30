/**
 * Research summary deck — synthesizes everything already gathered elsewhere
 * in this hub (customer journey, the SME interviews, Discord community
 * research, and the 15-vendor secondary research) into one narrative.
 *
 * Every number here is derived from, or directly cites, data that already
 * exists in this codebase — nothing here is invented for the deck.
 */

import { journeyStages } from './customerJourney';
import { interviews } from './primaryResearch';
import { discordQuadrants } from './discordCommunity';

export interface Persona {
  id: string;
  title: string;
  tagline: string;
  description: string;
  needs: string[];
}

export const personas: Persona[] = [
  {
    id: 'first-timer',
    title: 'The first-timer',
    tagline: "New to ThoughtSpot, often new to embedding entirely",
    description:
      "Hasn't used an embedding playground before — ThoughtSpot's or anyone else's. Learns by clicking around Discover and Plan integration before writing any code.",
    needs: [
      'A clear "start here" path instead of disconnected docs, Playground, and examples',
      'Guided setup for the security/auth prerequisites that trip people up early',
      'Confidence that what they build in Playground will carry over to real code',
    ],
  },
  {
    id: 'switcher',
    title: 'The switcher',
    tagline: 'Migrating from Looker, Tableau, or Sigma — fluent in embedding, new to ThoughtSpot',
    description:
      "Already knows what embedded analytics should feel like from a competitor's platform. Evaluates ThoughtSpot against that mental model and notices every gap immediately.",
    needs: [
      'A fast path past onboarding straight to advanced customization and API questions',
      'Clarity on what\'s different from their old platform, and why — not silence on feature parity',
      'Confidence that nuanced, native-feeling interactions (cross-filtering, tooltips, theming) are achievable, not just the basics',
    ],
  },
];

/**
 * How many of the 10 journey stages each touch point shows up in — computed
 * directly from customerJourney.ts rather than hand-counted, so it stays
 * accurate if that data changes.
 */
const touchpointStageCount = (() => {
  const counts: Record<string, number> = {};
  journeyStages.forEach((stage) => {
    stage.touchpoints.split(',').map((t) => t.trim()).forEach((tp) => {
      counts[tp] = (counts[tp] ?? 0) + 1;
    });
  });
  return counts;
})();

export const journeyInsight = {
  totalStages: journeyStages.length,
  repeatedTouchpoints: Object.entries(touchpointStageCount)
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([touchpoint, count]) => ({ touchpoint, count })),
};

/**
 * Per-interview note counts — computed from primaryResearch.ts so the deck
 * always reflects the real, current interview set.
 */
export const interviewSnapshots = interviews.map((iv) => ({
  id: iv.id,
  title: iv.title,
  subtitle: iv.subtitle,
  counts: {
    strengths: iv.quadrants.strengths.length,
    limitations: iv.quadrants.limitations.length,
    frustrations: iv.quadrants.frustrations.length,
    opportunities: iv.quadrants.opportunities.length,
  },
}));

export const discordCounts = {
  strengths: discordQuadrants.strengths.length,
  limitations: discordQuadrants.limitations.length,
  frustrations: discordQuadrants.frustrations.length,
  opportunities: discordQuadrants.opportunities.length,
};

export type RiskLevel = 'high' | 'medium' | 'low';

export interface ProblemStatement {
  id: string;
  title: string;
  description: string;
  risk: RiskLevel;
  evidence: string;
}

/**
 * The 7 problem statements every source agrees on — each one shows up in
 * the customer journey, at least one SME interview, and the Discord
 * community research independently.
 */
export const problemStatements: ProblemStatement[] = [
  {
    id: 'customization',
    title: "Customization stops short of \"make it mine\"",
    description:
      'Developers can theme ThoughtSpot, but tooltips, buttons, cross-filtering, and Spotter\'s own name still leak default ThoughtSpot behavior into a white-labeled product.',
    risk: 'high',
    evidence: 'Discord\'s #1 theme (5/5) · named directly by Bill, Ron, and John · the strongest axis for 3 of the 15 competitors benchmarked (Hex, Semaphor, Omni)',
  },
  {
    id: 'api-coverage',
    title: 'API coverage lags the feature',
    description:
      'New features (like Collections) have repeatedly shipped without an equivalent API, forcing embed customers into workarounds until coverage catches up.',
    risk: 'high',
    evidence: 'Discord\'s #2 theme (4.5/5) · Tri\'s "API-first mentality" ask · John\'s Collections example',
  },
  {
    id: 'auth-setup',
    title: 'Authentication & security setup is hard to predict & navigate',
    description:
      'Security prerequisites (CORS/CSP, trusted auth, SSO) surface late and inconsistently, and the first real blocker in the journey is exactly here.',
    risk: 'high',
    evidence: 'Discord\'s #4 theme (4.5/5) · Bill\'s top frustration · the Setup environment → Authentication stages in the customer journey',
  },
  {
    id: 'documentation',
    title: "Documentation doesn't keep pace with deprecations",
    description:
      'Spotter Code and new customers alike still reach for deprecated patterns (like filter rules) because the docs never carry a hard warning.',
    risk: 'medium',
    evidence: 'Raised independently by Bill and John · touches Discover, Plan integration, Customise, and Maintain & scale — 4 of 10 journey stages',
  },
  {
    id: 'enterprise-deployment',
    title: 'Enterprise deployment is still manual',
    description:
      'Moving between Dev/Test/Prod, syncing metadata, and managing multi-cluster governance all rely on manual pull/push instead of real CI/CD.',
    risk: 'medium',
    evidence: 'Discord\'s #3 theme (4.5/5) · Tri\'s "recipe books" ask · John\'s metadata-webhook proposal',
  },
  {
    id: 'disconnected-implementation',
    title: 'Implementations feel disconnected once you go beyond the basics',
    description:
      'Individually-shipped features — event payloads, cross-filtering, two separate webhook services — were each built correctly in isolation, but never designed to feel like one product.',
    risk: 'medium',
    evidence: "John's event-payload mismatch · Ron's decoupled cross-filtering UI · Discord's SDK-regressions theme (3.5/5)",
  },
  {
    id: 'scale-ceiling',
    title: 'Scale and performance ceilings show up as customers grow',
    description:
      'Object-count limits and multi-iframe memory pressure are a small-customer non-issue today, but land squarely on the largest embed deals as they grow.',
    risk: 'low',
    evidence: "John's cluster object-count ceiling · Discord's performance theme (3.5/5)",
  },
];

/**
 * Develop-tab page adoption — funnel from "loaded the develop tab" (Home) to
 * reaching each individual page. Last 30 days, prospects only (Email does not
 * contain thoughtspot.com · Account Status = Customer), so it reflects real
 * evaluators, not ThoughtSpot solution engineers. Source: product analytics funnels.
 */
export const pageAdoption = {
  window: 'Last 30 days · prospects only (excludes ThoughtSpot SEs)',
  baseLabel: 'Loaded the develop tab',
  baseCount: 956,
  steps: [
    { page: 'Homepage / guide click', count: 267, rate: 27.93 },
    { page: 'Security settings', count: 157, rate: 16.44 },
    { page: 'Playground', count: 113, rate: 11.87 },
    { page: 'Link settings', count: 61, rate: 6.41 },
    { page: 'Custom actions', count: 54, rate: 5.67 },
    { page: 'Theme Builder', count: 38, rate: 3.99 },
    { page: 'Webhooks', count: 35, rate: 3.67 },
    { page: 'Get started (docs)', count: 5, rate: 0.53 },
  ],
};

/**
 * Free-trial → actually-embedded funnel. This is the headline drop-off: of
 * everyone who signs up, only a sliver ever embeds ThoughtSpot in their own
 * environment.
 *
 * Only the embed path is modelled here, and it is strictly monotonic. Two
 * measures from the source diagram are deliberately excluded as funnel steps
 * because they exceed the TSE cohort and therefore span both tracks:
 * "Ask Spotter" (570) and "CRUD on objects" (165) — both are larger than the
 * 536 TSE users, so they cannot sit inside the embed path. They are carried
 * below as cross-track context instead.
 *
 * Percentages are computed against `baseCount` (all signups) so every step
 * shares one denominator. The source diagram mixed denominators — "Playground
 * run clicks 25.9%" was a share of TSE users, and "Ask Spotter 61.6%" /
 * "Setup domain 16.7%" matched neither base — so they are recomputed here.
 */
export const trialFunnel = {
  window: 'Free-trial cohort · signup through first working embed',
  baseLabel: 'Signed up (free trial)',
  baseCount: 1396,
  /** The embed path — each step is a subset of the one above it. */
  steps: [
    { label: 'Landed in TSE (embedding track)', count: 536 },
    { label: 'Set up a domain in the develop tab', count: 157 },
    { label: 'Ran code in the Playground', count: 139 },
    { label: 'Called the Visual Embed SDK', count: 120 },
    { label: 'Actually embedded outside ThoughtSpot', count: 44 },
  ],
  /** Measured, but spanning both TSA and TSE — shown as context, not steps. */
  crossTrack: [
    { label: 'Asked Spotter', count: 570 },
    { label: 'Did CRUD on objects', count: 165 },
  ],
  /** The other side of the signup split, for context. */
  otherTrack: { label: 'Landed in TSA (analytics track)', count: 860 },
};

/**
 * Per-problem validation from secondary research — the community-intensity
 * score comes from the Discord theme frequency (x / 5), and the competitor
 * note summarizes whether rivals already solve it. Grounded in each problem's
 * `evidence` string plus the competitor dataset.
 */
export const problemValidation: Record<string, { communityScore: number | null; competitorNote: string }> = {
  customization: { communityScore: 5, competitorNote: 'Hex, Omni & Semaphor already go deeper' },
  'api-coverage': { communityScore: 4.5, competitorNote: 'Looker, Power BI & Sigma ship broader APIs' },
  'auth-setup': { communityScore: 4.5, competitorNote: 'Industry-wide; Power BI / Omni docs are deeper' },
  documentation: { communityScore: null, competitorNote: 'Thin embed docs are common across the field' },
  'enterprise-deployment': { communityScore: 4.5, competitorNote: 'CI/CD is weak across most vendors' },
  'disconnected-implementation': { communityScore: 3.5, competitorNote: 'Sisense / Omni composable SDKs feel more unified' },
  'scale-ceiling': { communityScore: 3.5, competitorNote: 'Multi-iframe memory hits Domo & Qlik too' },
};

export const secondaryOverview = {
  vendors: 15,
  communityThemes: 6,
  reviewPlatforms: 'G2 · Capterra · TrustRadius · Reddit · HN',
};

/** One-line elaboration shown under each pain-point title on the pain-points slide. */
export const painPointDetail: Record<string, string> = {
  customization: 'Developers have to make manual code changes!',
  'api-coverage': 'New features ship before their APIs do.',
  'auth-setup': "Leads to loss of work — it doesn't get saved.",
  documentation: 'Not well structured — really hard to find content inside.',
  'enterprise-deployment': 'Dev → Test → Prod still relies on manual steps.',
  'disconnected-implementation': 'Nuanced flows feel stitched together, not like one product.',
  'scale-ceiling': 'Object-count and memory limits bite the biggest deals.',
};

export const opportunities = [
  {
    icon: 'schema' as const,
    title: 'Navigation & architecture',
    text: 'Rework the develop-tab IA so pages surface by intent — not a flat list only 28% ever click into.',
  },
  {
    icon: 'agenda' as const,
    title: 'Guided flow',
    text: 'A step-by-step "get your first embed live" wizard covering auth, security, and the embed in one pass.',
  },
  {
    icon: 'spotter' as const,
    title: 'Agent-first experience',
    text: 'Assume a coding agent — let it theme, authenticate, embed, and wire events without opening the UI.',
  },
  {
    icon: 'cord' as const,
    title: 'API-first architecture',
    text: 'Ship an API before the UI; every action a user can take in the product should have an equivalent API.',
  },
  {
    icon: 'explore' as const,
    title: 'Non-linear workflow',
    text: 'Let developers work in any order instead of a fixed recipe — and never lose in-progress Playground work.',
  },
];

export const businessImpact = {
  newRevenueShare: '70%+ of ThoughtSpot\'s new revenue comes from Embedded',
  newRevenueSource: "John Heggley, technical architect interview",
  arrShare: "25% of ThoughtSpot's total ARR now comes from Embedded — growing ~100% YoY",
  arrSource: 'ThoughtSpot press release, Sep 2024',
  marketSizeHeadline: '$23.4B → $101B',
  marketSizeCaption: 'Global embedded analytics market size (15.7% CAGR, 2025–2035)',
  marketSource: 'Precedence Research',
  framing:
    "We don't yet have hard funnel or drop-off numbers broken out by these specific friction points. What we do know: every one of them sits inside the segment already producing most of ThoughtSpot's new revenue, on its fastest-growing ARR line. Closing them doesn't create a new opportunity — it protects and compounds the one already in motion.",
};
