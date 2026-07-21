/**
 * "TS Embedding" interactive walkthrough — the 9-step path a developer
 * actually walks today to embed ThoughtSpot into their own product.
 * Content mirrors the same activities/touchpoints vocabulary as
 * customerJourney.ts, reframed as a first-person, step-by-step tour.
 */

export interface TSEmbeddingStep {
  id: string;
  stepNumber: number;
  title: string;
  userGoal: string;
  activities: string[];
  tsPage: string;
  touchpoints: string[];
  nextLabel: string;
}

export const tsEmbeddingSteps: TSEmbeddingStep[] = [
  {
    id: 'discover',
    stepNumber: 1,
    title: 'Discover',
    userGoal: "Understand what ThoughtSpot embedding can do before committing any engineering time.",
    activities: [
      'Compare embedding options against other vendors',
      "Browse the Develop tab's Guide, Playground, and REST API docs",
      'Try live, clickable examples for each embed type',
    ],
    tsPage: 'Develop → Home',
    touchpoints: ['Documentation', 'Community', 'Sales engineer'],
    nextLabel: 'Plan the integration',
  },
  {
    id: 'plan-integration',
    stepNumber: 2,
    title: 'Plan integration',
    userGoal: 'Decide which embedding approach fits the product — Visual Embed SDK, iframe, or REST API — and for which platform.',
    activities: [
      'Choose between Web SDK, Mobile SDK, and REST API',
      'Review the CORS/CSP prerequisites up front',
      "Map out the 4-step 'get started with embedding' path",
    ],
    tsPage: 'Develop → Guide → Quickstart guide',
    touchpoints: ['Documentation', 'Architecture guides', 'Solutions engineer'],
    nextLabel: 'Set up the environment',
  },
  {
    id: 'setup-environment',
    stepNumber: 3,
    title: 'Setup environment',
    userGoal: 'Configure the ThoughtSpot instance so the host application is allowed to embed it at all.',
    activities: [
      'Add the host domain to the CORS allowlist',
      'Enable trusted authentication',
      'Decide whether non-embedded full-app access should stay open',
    ],
    tsPage: 'Develop → Customizations → Security settings',
    touchpoints: ['Developer tab', 'Security settings'],
    nextLabel: 'Configure authentication',
  },
  {
    id: 'auth-security',
    stepNumber: 4,
    title: 'Authentication & security',
    userGoal: 'Get end users into the embedded experience without ever asking them to log into ThoughtSpot directly.',
    activities: [
      'Pick an auth type — trusted authentication or SAML/OIDC-based SSO',
      'Create users, groups, and roles for the embedding tenant',
      'Configure row-level and column-level security',
    ],
    tsPage: 'Admin → User management',
    touchpoints: ['Admin portal', 'Identity provider', 'Security settings'],
    nextLabel: 'Build the first embed',
  },
  {
    id: 'first-embed',
    stepNumber: 5,
    title: 'First embed',
    userGoal: 'Get one ThoughtSpot component — a Liveboard, Search, or Spotter — rendering inside the host app.',
    activities: [
      'Initialize the Visual Embed SDK',
      'Render the first Liveboard, Search, or Spotter component',
      'Register embed events',
    ],
    tsPage: 'Develop → Playground',
    touchpoints: ['IDE', 'SDK', 'Playground'],
    nextLabel: 'Customize the look and feel',
  },
  {
    id: 'customise',
    stepNumber: 6,
    title: 'Customize',
    userGoal: "Make the embedded experience feel native to the host product, not like a bolted-on ThoughtSpot window.",
    activities: [
      'Build a theme in Theme Builder — colors, type, spacing',
      'Configure custom actions, runtime filters, and locale',
      'Preview changes live against real content',
    ],
    tsPage: 'Develop → Customizations → Theme Builder',
    touchpoints: ['Theme Builder', 'SDK', 'Documentation'],
    nextLabel: 'Integrate with the product',
  },
  {
    id: 'integrate-with-product',
    stepNumber: 7,
    title: 'Integrate with product',
    userGoal: "Connect the embedded analytics to the rest of the product's systems and data flows.",
    activities: [
      "Call ThoughtSpot's REST API v2.0 for data and metadata operations",
      'Configure webhooks for Liveboard schedule and event notifications',
      'Wire up Salesforce, Pendo, GitHub, and other external services',
    ],
    tsPage: 'Develop → REST API Playground v2.0',
    touchpoints: ['REST APIs', 'Webhooks', 'External systems'],
    nextLabel: 'Test the embed',
  },
  {
    id: 'test',
    stepNumber: 8,
    title: 'Test',
    userGoal: 'Confirm the embed behaves correctly before it reaches real customers — auth, filters, permissions, performance.',
    activities: [
      'Validate authentication and permissions end to end',
      'Exercise runtime filters and custom actions',
      'Check performance in the browser console and dev tools',
    ],
    tsPage: 'Develop → Playground',
    touchpoints: ['Playground', 'Browser console', 'Dev tools'],
    nextLabel: 'Go live',
  },
  {
    id: 'live-in-customer-application',
    stepNumber: 9,
    title: 'Live in customer application',
    userGoal: "Ship the embedded experience to real end users inside the live product.",
    activities: [
      'Deploy the host application with the embed enabled',
      "Monitor usage inside the customer's actual product",
      'Hand off to support and CS for ongoing scale',
    ],
    tsPage: "Customer's product",
    touchpoints: ['Customer application', 'Support', 'Admin portal'],
    nextLabel: 'View the summary',
  },
];

export const tsEmbeddingCompletion = {
  title: 'Embedded analytics successfully integrated',
  body: "From a first search for options to a live Liveboard inside a customer's product — here's the full path a developer just walked.",
  checklist: tsEmbeddingSteps.map((s) => s.title),
  tagline: 'This is the current ThoughtSpot embedding journey today.',
};
