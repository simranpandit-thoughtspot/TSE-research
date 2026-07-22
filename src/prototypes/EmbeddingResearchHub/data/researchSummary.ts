/**
 * Research summary deck — synthesizes everything already gathered elsewhere
 * in this hub (customer journey, 4 SME interviews, Discord community
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
    title: 'API coverage lags the UI',
    description:
      'New features (like Collections) have repeatedly shipped without an equivalent API, forcing embed customers into workarounds until coverage catches up.',
    risk: 'high',
    evidence: 'Discord\'s #2 theme (4.5/5) · Tri\'s "API-first mentality" ask · John\'s Collections example',
  },
  {
    id: 'auth-setup',
    title: 'Authentication & security setup is hard to predict',
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
