/**
 * Customer journey — transcribed from the </> tab audit FigJam board
 * (https://www.figma.com/board/IcNSyvUzQbUgsA2E0Cx3Vh/%3C-%3E-Tab, node 0-1).
 *
 * Ten stages, each broken into Activities / Pain points / Opportunities /
 * Touch points — matching the board's row structure.
 */

export type StageAccent = 'orange' | 'teal' | 'purple' | 'blue' | 'green';

export interface JourneyStage {
  id: string;
  title: string;
  accent: StageAccent;
  activities: string[];
  painPoints: string[];
  opportunities: string[];
  touchpoints: string;
}

export const journeyStages: JourneyStage[] = [
  {
    id: 'discover',
    title: 'Discover',
    accent: 'orange',
    activities: ['Compare competitors', 'Explore documentation', 'Use Playground', 'Review examples'],
    painPoints: [
      'Where do I start?',
      '"Nobody uses the left nav for navigation to documentation from Playground." — Tri',
      'Documentation, Playground, and examples feel disconnected.',
      'Tri mentioned Spotter Code is much better now, but developers still default to Playground.',
    ],
    opportunities: ['Guided onboarding', 'Contextual recommendations', 'AI-assisted documentation', 'Surface Spotter Code earlier'],
    touchpoints: 'Documentation, Community, Sales Engineer',
  },
  {
    id: 'plan-integration',
    title: 'Plan integration',
    accent: 'teal',
    activities: ['Choose SDK vs. iframe', 'Decide embed type', 'Plan user flow & choose hosting strategy'],
    painPoints: [
      'Which approach should I choose?',
      'Customers don’t know implementation requirements upfront. "There’s a security issue I wasn’t aware of." — Bill',
      'Authentication requirements discovered too late. Developers discover problems halfway through implementation.',
      'Tri repeatedly talked about "recipe books" and "implementation patterns."',
    ],
    opportunities: ['Better architecture recommendations', 'Implementation checklist', 'Security checklist', '"Before you start" guide'],
    touchpoints: 'Documentation, Architecture Guides, Solution Engineer',
  },
  {
    id: 'setup-environment',
    title: 'Setup environment',
    accent: 'purple',
    activities: ['Get Developer access', 'Configure CORS/CSP', 'Install SDK', 'Configure domain'],
    painPoints: [
      'Tri repeatedly mentioned CORS, CSP, and security are easy to miss.',
      'Developer has to know domains, permissions, developer access, and security — before writing code.',
    ],
    opportunities: ['Guided setup wizard', 'Environment validation'],
    touchpoints: 'Developer Tab → Security Settings',
  },
  {
    id: 'auth-security',
    title: 'Authentication & security',
    accent: 'blue',
    activities: ['Configure SSO/Trusted Auth', 'Create users & groups, assign roles', 'Configure row-level security'],
    painPoints: [
      'Authentication is difficult.',
      'Security isn’t surfaced early enough.',
      'Admin has to understand groups, roles, privileges, RLS, and CLS.',
    ],
    opportunities: ['Simpler authentication flow', 'Security health check', 'Permission visualizer'],
    touchpoints: 'Admin Portal, Identity Provider, Security Settings',
  },
  {
    id: 'first-embed',
    title: 'First embed',
    accent: 'green',
    activities: ['Initialize SDK, embed Liveboard/Search/Spotter', 'Render first component', 'Register events'],
    painPoints: [
      'Tri: "Documentation should be ready."',
      'Developers spend time searching instead of embedding.',
      '"We had to write custom code."',
    ],
    opportunities: ['Spotter Code'],
    touchpoints: 'IDE, SDK, Playground',
  },
  {
    id: 'customise',
    title: 'Customise',
    accent: 'orange',
    activities: ['Theme UI', 'Customize menus, runtime filters, custom actions, locale, branding'],
    painPoints: [
      'Have to code most of the customisations!',
      'Bill — Playground customization is limited.',
      'Native feel is difficult: customers want users to think it’s their product.',
    ],
    opportunities: ['Component-level customization & filtration'],
    touchpoints: 'Theme Builder, SDK, Documentation',
  },
  {
    id: 'integrate-with-product',
    title: 'Integrate with product',
    accent: 'teal',
    activities: ['Connect REST APIs, Webhooks, Salesforce, Pendo, GitHub, external services'],
    painPoints: [
      '"We need an API-first mentality." — Tri',
      'APIs come too late. Missing API coverage.',
      'REST API inconsistencies — what??',
    ],
    opportunities: ['API-first workflows', 'API coverage dashboard'],
    touchpoints: 'REST APIs, Webhooks, External Systems',
  },
  {
    id: 'test',
    title: 'Test',
    accent: 'purple',
    activities: ['Validate authentication, filters, permissions, events, performance'],
    painPoints: ['Debugging takes too long.', 'Developers can’t validate features easily — documentation.'],
    opportunities: ['Playground diagnostics', 'Better debugging'],
    touchpoints: 'Playground, Browser Console, Dev Tools',
  },
  {
    id: 'deploy',
    title: 'Deploy',
    accent: 'blue',
    activities: ['Publish TML, GUID mapping, GitHub integration', 'Migrate between environments'],
    painPoints: [
      '"They need the ability to move Dev, Test, Prod."',
      'CI/CD support isn’t mature.',
      'APIs missing during deployment.',
    ],
    opportunities: ['GitHub automation', 'CI/CD templates', 'One-click deployment'],
    touchpoints: 'GitHub, CI/CD Pipeline, TML',
  },
  {
    id: 'maintain-scale',
    title: 'Maintain & scale',
    accent: 'green',
    activities: ['Upgrade clusters', 'Monitor APIs', 'Troubleshoot', 'Onboard new customers', 'Manage tenants'],
    painPoints: [
      'Documentation ages quickly. — Bill: "Go back and update documentation."',
      '"Bring us in earlier." — Bill',
      'Customers hit scaling limitations. — Tri',
      'Knowledge lives with Solution Engineers instead of the product — not self-serve.',
    ],
    opportunities: ['Better monitoring & health checks'],
    touchpoints: 'Admin Portal, Support, Documentation, Changelog',
  },
];
