/**
 * Discord community research — transcribed from the ThoughtSpot developer
 * Discord's #develop channel (pages 9–19 of the exported history).
 *
 * Unlike the Tri/Bill SME interviews (internal perspective), this is real
 * implementation friction reported directly by customers building on
 * ThoughtSpot — segmented into the same Strengths / Limitations /
 * Frustrations / Opportunities quadrants used for the interview boards.
 */

import type { QuadrantCard } from './primaryResearch';

export const discordQuadrants: {
  strengths: QuadrantCard[];
  limitations: QuadrantCard[];
  frustrations: QuadrantCard[];
  opportunities: QuadrantCard[];
} = {
  strengths: [
    {
      label: 'Flexible and powerful Embed SDK',
      text: 'Developers are embedding Liveboards, Spotter, Search, AppEmbed, runtime filters, authentication, custom events, and integrations into production SaaS products — the SDK is trusted for enterprise deployments.',
    },
    {
      label: 'Strong extensibility',
      text: 'Developers integrate with Pendo, Salesforce, GitHub, multi-org deployments, REST APIs, and custom auth — asking how, not whether, integration is possible. "I use that event to send the question text to Pendo for analytics."',
    },
    {
      label: 'Rich event ecosystem',
      text: 'Confidence in event-driven integrations built around SpotterQueryTriggered, HostEvent.UpdateFilters, and SpotterLoadComplete.',
    },
  ],
  limitations: [
    {
      label: 'Limited white-label control',
      text: 'Developers want complete ownership over the embedded experience — repeated requests to hide buttons/menus, remove ThoughtSpot branding, disable Preview Data, remove Add to Collection.',
    },
    {
      label: 'Limited UI composition',
      text: 'Requests for chart-specific filters, dynamic titles, redesigned legends, annotations, inline drill-down, thumbnails, fluid resizing, auto-fit tables, metric selectors — developers want to compose analytics experiences, not just embed dashboards.',
    },
    {
      label: 'Spotter flexibility',
      text: 'Requests for Auto Mode persistence, conversation behavior, usage limits, analytics events, coaching migration — Spotter is powerful but not yet configurable enough for product teams.',
    },
    {
      label: 'Operational tooling',
      text: 'Struggles with deployment, migration, dependency discovery, metadata, and version control — recurring enterprise concerns.',
    },
  ],
  frustrations: [
    {
      label: 'Customization stops short of enterprise expectations',
      text: '"Is there a way I can hide this ThoughtSpot 👋 and Show Details buttons..." "How do we remove this option? We are working based on Visible Actions..." "Preview Data... still appears in UI." Root cause: developers expect configuration, instead they hit hardcoded UI behavior.',
    },
    {
      label: "APIs don't expose everything developers need",
      text: '"Is there a way to update search query programmatically..." "I couldn\'t find an event..." Repeated across dependency graphs, Spotter hints, personalised views, PDF/alert metadata. Root cause: UI capabilities and API capabilities aren\'t always aligned.',
    },
    {
      label: 'SDK upgrades introduce uncertainty',
      text: '"rules_UNSTABLE... stopped working." "Changes to how the bundle is created are breaking our builds." Root cause: developers worry about upgrade stability.',
    },
    {
      label: 'Authentication behavior is difficult to predict',
      text: '"We only ever see getAuthToken called after...401." "Customer experiencing frequent session logouts..." Root cause: authentication is powerful but lacks transparency.',
    },
    {
      label: 'Enterprise deployment is harder than expected',
      text: '"We can\'t get any skip behaviour..." "Sync Spotter coaching across environments..." Root cause: deployment workflows require considerable manual understanding.',
    },
    {
      label: 'Performance challenges',
      text: '"6–8 iframes per tab... PC runs out of memory." Root cause: developers are forced into architectural workarounds because the existing embed model doesn\'t support the desired UX.',
    },
  ],
  opportunities: [
    {
      label: 'Component-first embedding',
      text: 'Move beyond embedding a whole Liveboard — expose configurable UI primitives so developers can customize individual interactions instead of hiding them.',
    },
    {
      label: 'Native application experience',
      text: 'Let developers configure filters, navigation, drill-down, menus, alerts, and branding without custom CSS or multiple iframes.',
    },
    {
      label: 'API-first platform',
      text: 'Wherever a user can perform an action in the UI, developers expect an equivalent API — priority areas: metadata, Spotter, alerts, dependency graphs, personalised views, search, exports.',
    },
    {
      label: 'Better enterprise deployment',
      text: 'Improve CI/CD, Git integration, environment synchronization, migration tooling, version compatibility.',
    },
    {
      label: 'Better SDK lifecycle',
      text: 'Provide upgrade assistants, migration guides, compatibility reports, breaking-change validation.',
    },
    {
      label: 'Better developer observability',
      text: 'Developers repeatedly ask "What happened?" rather than "How do I use this?" — an opportunity for authentication diagnostics, an event inspector, an embed debugger, and an API explorer.',
    },
  ],
};

export interface ThemeFrequency {
  theme: string;
  rating: number;
  evidence: string;
}

export const discordThemeFrequency: ThemeFrequency[] = [
  { theme: 'Customization & white-labeling', rating: 5, evidence: 'Hiding controls, UI behavior, Liveboard UX, Spotter controls' },
  { theme: 'Missing API coverage', rating: 4.5, evidence: 'Search updates, events, metadata, alerts, dependencies' },
  { theme: 'Enterprise deployment', rating: 4.5, evidence: 'TML, GUIDs, environment sync, Git' },
  { theme: 'Authentication & sessions', rating: 4.5, evidence: 'Token refresh, session expiry, proactive auth' },
  { theme: 'SDK regressions', rating: 3.5, evidence: 'rules_UNSTABLE, bundle changes, Spotter 3 behavior' },
  { theme: 'Performance', rating: 3.5, evidence: 'Multi-iframe memory issues, indexing cost' },
];

export const discordSummary = {
  source: 'Discord — #develop channel (pages 9–19 of the community history)',
  coreInsight: "Developers are not struggling to embed ThoughtSpot — they are struggling to make ThoughtSpot behave like their own product.",
  synthesis:
    "When this Discord evidence is combined with Tri and Bill's interviews, all three sources point to the same underlying story. Developers are not struggling with embedding itself — they're successfully reaching a working implementation. The friction begins when they try to transform that implementation into a polished, enterprise-grade product experience. Requests consistently move beyond \"How do I embed?\" toward \"How do I make this indistinguishable from my own application?\"",
  keyTakeaway:
    'Shift ThoughtSpot Embedding from a "dashboard embedding platform" to a "composable analytics platform" — one that gives developers granular control over behavior, presentation, APIs, and lifecycle management so embedded analytics feels truly native within their products.',
  problemStatements: [
    'Embedding succeeds, but product integration falls short — developers lack sufficient control over UI behavior, branding, interactions, and component composition to create a truly native experience.',
    'The platform is extensible, but not consistently API-first — functionality available in the product UI is often unavailable, or only partially available, through SDKs and APIs.',
    'Enterprise workflows require too much manual effort — authentication, deployment, multi-environment promotion, metadata management, and version synchronization all demand deep platform knowledge.',
    'Customization is constrained by embedded page boundaries — developers increasingly want configurable building blocks, not just pages (Liveboards, Spotter, Search).',
    'Operational confidence decreases as implementations mature — concerns shift toward SDK stability, deployment automation, authentication reliability, testing, and observability as teams scale from POC to production.',
  ],
};
