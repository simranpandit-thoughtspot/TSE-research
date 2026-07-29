/**
 * Secondary research — competitor dataset
 *
 * Comparison facts are sourced primarily from Holistics' published comparison
 * (https://www.holistics.io/bi-tools/embedded-analytics/) for the 9 tools it covers,
 * supplemented by direct research (official docs, pricing pages, G2/Capterra/HN/Reddit)
 * for ThoughtSpot, Qlik, Superset, Hex, Omni, and Semaphor. Every fact carries its source.
 */

export interface SourceLink {
  label: string;
  url: string;
}

export interface Fact {
  value: string;
  source?: SourceLink;
}

export type ReviewPlatform = 'g2' | 'capterra' | 'trustradius' | 'reddit' | 'hackernews' | 'forum' | 'vendor';

export interface ReviewQuote {
  quote: string;
  source: string;
  /** Which platform the quote came from — drives per-platform card branding. */
  platform: ReviewPlatform;
  /** For Reddit quotes: the exact subreddit, e.g. "r/BusinessIntelligence". */
  subreddit?: string;
  url?: string;
}

export type Confidence = 'verified' | 'partial' | 'thin';

export interface Competitor {
  id: string;
  name: string;
  tagline: string;
  website: string;
  confidence: Confidence;
  demoPlayground: Fact;
  pricing: Fact;
  embeddingMethods: Fact;
  multiTenancy: Fact;
  customization: Fact;
  performance: Fact;
  sentiment: string;
  reviews: ReviewQuote[];
}

export const competitors: Competitor[] = [
  {
    id: 'holistics',
    name: 'Holistics',
    tagline: 'Analytics-as-code BI with usage-based embedded pricing',
    website: 'https://www.holistics.io',
    confidence: 'verified',
    demoPlayground: { value: 'Not listed as publicly available in the comparison source.' },
    pricing: {
      value: 'Query runs / worker-based usage pricing. Estimated $9,600+/year.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    embeddingMethods: {
      value: 'iFrame embedding supported. No dedicated client SDK. No first-class embed API.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    multiTenancy: {
      value: 'Row-level security / permission controls for multi-tenant data access.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    customization: {
      value: 'Canvas-based CSS theming for look & feel.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    performance: { value: 'Modeling layer (analytics-as-code) sits over the warehouse rather than an in-memory extract.' },
    sentiment: 'Reviewers like the usage-based embedding model but flag that iframe-based embeds limit deep UI customization.',
    reviews: [
      {
        quote: 'I like the way Holistics handles embedding with workers in the background that you pay for, instead of buying licenses for every user.',
        source: 'G2 review',
        platform: 'g2',
        url: 'https://www.g2.com/products/holistics-data-software/reviews?qs=pros-and-cons',
      },
      {
        quote: 'Embedding relies on iframes/SDK abstractions, so UI customization is limited and embedded dashboards can still feel external to the host product.',
        source: 'G2 review (pros & cons)',
        platform: 'g2',
        url: 'https://www.g2.com/products/holistics-data-software/reviews?qs=pros-and-cons',
      },
      {
        quote: 'The embedded dashboards feature is saving our technical team from hundreds of hours of development effort to visualize data.',
        source: 'Capterra review',
        platform: 'capterra',
        url: 'https://www.capterra.com/p/153101/Holistics/reviews/',
      },
    ],
  },
  {
    id: 'looker',
    name: 'Looker',
    tagline: 'LookML-modeled BI, deep JS / Embed SDK for embedding',
    website: 'https://looker.com',
    confidence: 'verified',
    demoPlayground: { value: 'No dedicated public playground; sandbox access is sales-gated.' },
    pricing: {
      value: 'API-call based pricing. Estimated $83,665+/year.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    embeddingMethods: {
      value: 'Signed iframe embedding, JavaScript Embed SDK, and a dedicated Embed API.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    multiTenancy: {
      value: 'Row-level security (RLS) plus user attributes for per-tenant data scoping.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    customization: {
      value: 'LookML-based theming for embedded look & feel.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    performance: { value: 'Persistent Derived Tables (PDTs) and query caching layered over live warehouse queries.' },
    sentiment: 'Seen as one of the more capable embedded BI options, but developers cite customization ceilings, an iframe-based feel, and post-acquisition uncertainty about ongoing embedded support.',
    reviews: [
      {
        quote: 'Very worried on the embedded side, we spent a full year migrating off of Sisense embedded onto Looker embedded... [Looker is] one of the only really useful embedded offerings.',
        source: 'Hacker News comment',
        platform: 'hackernews',
        url: 'https://news.ycombinator.com/item?id=20115230',
      },
      {
        quote: 'The main problem I always had with the embedded versions of Tableau, Looker, etc. is that they felt super canned — it was obvious it was a poorly/"lightly" white labeled solution — and they were slow.',
        source: 'Hacker News comment',
        platform: 'hackernews',
        url: 'https://news.ycombinator.com/item?id=40177197',
      },
      {
        quote: 'They also don’t use BI tools such as Looker, Tableau, or Metabase because they are either not great for embedded applications, or too heavy. (Explo founder — competitor-adjacent view)',
        source: 'Hacker News comment',
        platform: 'hackernews',
        url: 'https://news.ycombinator.com/item?id=27447087',
      },
      {
        quote: 'I’m curious what this means for folks that opted to use Looker for their embedded analytics. (on the Google acquisition)',
        source: 'Hacker News comment',
        platform: 'hackernews',
        url: 'https://news.ycombinator.com/item?id=20114646',
      },
      {
        quote: 'The LookML modeling layer is the whole value prop — you define your data logic once then can use it consistently everywhere. But the LookML learning curve is notorious, and multi-tenancy config is a closed system that’s hard to change once you’ve committed.',
        source: 'Reddit comparison thread (research)',
        platform: 'reddit',
        subreddit: 'r/BusinessIntelligence',
        url: 'https://www.reddit.com/r/BusinessIntelligence/comments/1sttnor/who_is_doing_embedded_analytics_right_heres_what/',
      },
    ],
  },
  {
    id: 'tableau',
    name: 'Tableau',
    tagline: 'Market-leading visual analytics, embedding via JS API + Trusted Auth',
    website: 'https://www.tableau.com',
    confidence: 'verified',
    demoPlayground: { value: 'No public embedded-specific playground; general product trial only.' },
    pricing: {
      value: 'Analytical-impressions based pricing. No public estimate for embedding.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    embeddingMethods: {
      value: 'iFrame embedding and a JavaScript Embedding API. No dedicated SDK beyond the JS API.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    multiTenancy: {
      value: 'Site-level segmentation for tenant separation.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    customization: {
      value: 'CSS / JavaScript extensions for styling; Tableau branding tends to persist through.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    performance: { value: 'Hyper in-memory extracts or live connection, per-workbook depending on configuration.' },
    sentiment: 'Largely critical of embedding specifically — developers say Tableau resists white-labeling and auth sync is tricky, though the JS embedding API itself is workable.',
    reviews: [
      {
        quote: "Tableau doesn't really like to be embedded in 3rd party applications, it leaks information about itself in a number of places... Synchronizing authentication to Tableau server and workbook authorization gets tricky.",
        source: 'Hacker News comment',
        platform: 'hackernews',
        url: 'https://news.ycombinator.com/item?id=20146904',
      },
      {
        quote: 'When you see an embedded Tableau dashboard, you know it is Tableau... and they were slow.',
        source: 'Hacker News comment',
        platform: 'hackernews',
        url: 'https://news.ycombinator.com/item?id=40177197',
      },
      {
        quote: 'The auth piece isn’t the hard part, it’s the production scale. Performance tuning a Tableau embedded deployment is where timelines have slipped.',
        source: 'Reddit comparison thread (from experience)',
        platform: 'reddit',
        subreddit: 'r/BusinessIntelligence',
        url: 'https://www.reddit.com/r/BusinessIntelligence/comments/1sttnor/who_is_doing_embedded_analytics_right_heres_what/',
      },
    ],
  },
  {
    id: 'powerbi',
    name: 'Power BI',
    tagline: "Microsoft's BI suite, node-based embedded capacity pricing",
    website: 'https://powerbi.microsoft.com',
    confidence: 'verified',
    demoPlayground: {
      value: 'Available — public embedded playground.',
      source: { label: 'Power BI Playground', url: 'https://playground.powerbi.com/en-us/' },
    },
    pricing: {
      value: 'Node type & node instances. Estimated $9,000+/year (from ~$735.91/mo for an A1 node).',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    embeddingMethods: {
      value: 'Secure token-based iframe embedding, a JavaScript SDK, a REST API, and "Publish to Web" for public embeds.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    multiTenancy: {
      value: 'Row-level security, user filters, and tenant-specific configurations.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    customization: {
      value: 'Custom themes via JSON theme files plus CSS styling.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    performance: { value: 'Import (in-memory VertiPaq) or DirectQuery mode, selectable per dataset.' },
    sentiment: 'SDK/REST-based embedding is seen as technically straightforward and reliable, but the "white-label" claim overstates reality — branding control is shallow and viewer licensing costs are confusing.',
    reviews: [
      {
        quote: 'Power BI embedded helps my team access interactive dashboards and reports within SharePoint sites... improves our workflow efficiency with data insights embedded directly within our virtual workspace.',
        source: 'G2 review',
        platform: 'g2',
        url: 'https://www.g2.com/products/microsoft-power-bi-embedded/reviews',
      },
      {
        quote: "Sometimes it's slow to load. Also, everyone should have a license to view and edit, it's quite expensive.",
        source: 'G2 review',
        platform: 'g2',
        url: 'https://www.g2.com/products/microsoft-power-bi-embedded/reviews',
      },
      {
        quote: 'They just took forever to load!... the documentation around embedding charts was pretty poor.',
        source: 'Hacker News comment',
        platform: 'hackernews',
        url: 'https://news.ycombinator.com/item?id=22784655',
      },
      {
        quote: 'Looking at going long with Power BI Embedded... ditching our home grown effort which... costs a fortune.',
        source: 'Hacker News comment',
        platform: 'hackernews',
        url: 'https://news.ycombinator.com/item?id=28614231',
      },
      {
        quote: 'The ‘app owns data’ model is solid in theory — your app handles auth, end users never touch a Microsoft login. In practice, you’re juggling Entra ID, service principals, backend token generation, and RLS rules. Third-party cookie blocking and finicky service principal permissions have burned me more than once.',
        source: 'Reddit comparison thread (from experience)',
        platform: 'reddit',
        subreddit: 'r/BusinessIntelligence',
        url: 'https://www.reddit.com/r/BusinessIntelligence/comments/1sttnor/who_is_doing_embedded_analytics_right_heres_what/',
      },
    ],
  },
  {
    id: 'embeddable',
    name: 'Embeddable',
    tagline: 'Headless, code-based embedding — no iframes, fully native UI',
    website: 'https://embeddable.com',
    confidence: 'partial',
    demoPlayground: { value: 'Not available.', source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' } },
    pricing: {
      value: 'Feature-tiered flat subscription; no public pricing estimate, contact sales.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    embeddingMethods: {
      value: 'No iframe embedding. Embed SDK (web components / native React & Vue) plus a programmatic Embeddable API. Public embedding supported.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    multiTenancy: {
      value: 'Multi-tenant and single-tenant setups via row/table/schema-level security.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    customization: {
      value: 'Charts ship as code — fully extensible/modifiable, including CSS and theming.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    performance: { value: 'Headless architecture — performance depends on the host application’s own data layer rather than a built-in cache.' },
    sentiment: "Developers who've used it like that embedding avoids iframes so dashboards feel native, but the tool is young enough that independent review coverage is thin.",
    reviews: [
      {
        quote: 'The best thing I like about this platform is how it is designed as developer-centric. Rather than pushing rigid dashboards or iframes, it helps me build analytics directly into the product using already-used components.',
        source: 'G2 review',
        platform: 'g2',
        url: 'https://www.g2.com/products/embeddable/reviews',
      },
      {
        quote: 'We wanted to be able to place analytics in our app without using an iframe so the visuals/dashboards would look natural and custom-made for the app.',
        source: 'G2 review',
        platform: 'g2',
        url: 'https://www.g2.com/products/embeddable/reviews',
      },
    ],
  },
  {
    id: 'metabase',
    name: 'Metabase',
    tagline: 'Open-source BI, freemium embedding via Pro plan',
    website: 'https://www.metabase.com',
    confidence: 'verified',
    demoPlayground: { value: 'Not available.', source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' } },
    pricing: {
      value: 'Feature-tiered. Full embedding starts on the Pro plan (~$500/mo). Estimated $6,000+/year.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    embeddingMethods: {
      value: 'Static signed-URL embedding, a React Embedding SDK, an Embed API for cards/dashboards, and public links.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    multiTenancy: {
      value: 'Row-level security via JWT tokens for multi-tenant deployments.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    customization: {
      value: 'Native custom themes and CSS styling.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    performance: { value: 'Query result caching available; performance otherwise tracks the underlying warehouse.' },
    sentiment: 'Liked for how easy static/dashboard embedding is to switch on, but meaningful white-labeling requires the Pro/Enterprise tier and embedding docs are thin.',
    reviews: [
      {
        quote: 'I think it could use some more documentation about integrating the dashboards into applications.',
        source: 'Capterra review',
        platform: 'capterra',
        url: 'https://www.capterra.com/p/176651/Metabase/reviews/',
      },
      {
        quote: "The free version shows 'Powered by Metabase' — paying for the Pro version allows that badge to be removed.",
        source: 'G2 / Capterra review pattern',
        platform: 'g2',
        url: 'https://www.g2.com/products/metabase/reviews',
      },
      {
        quote: 'For white-label embedding it requires a commercial license... Pricing for the variant with row-level security is not cheap.',
        source: 'Hacker News comment',
        platform: 'hackernews',
        url: 'https://news.ycombinator.com/item?id=21544320',
      },
      {
        quote: 'Embedding, styling, and access control often require engineering help... that gap is still real today. (Metabase employee, candidly)',
        source: 'Hacker News comment',
        platform: 'hackernews',
        url: 'https://news.ycombinator.com/item?id=44045610',
      },
    ],
  },
  {
    id: 'domo',
    name: 'Domo',
    tagline: 'All-in-one cloud BI platform, Domo Everywhere embedding',
    website: 'https://www.domo.com',
    confidence: 'verified',
    demoPlayground: { value: 'Not available.', source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' } },
    pricing: {
      value: 'Credit-based usage pricing (rows, executions, activity). No public estimate — third-party trackers cite ~$134K/year average.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    embeddingMethods: {
      value: 'iFrame embedding via URL attributes, an Embed API for token creation, and public embed links. No dedicated client SDK.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    multiTenancy: {
      value: 'Programmatic filtering with configurable row/column policies.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    customization: {
      value: 'Custom themes and CSS available through Domo Bricks.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    performance: { value: "Domo's Adrenaline in-memory engine, tuned for its own managed cloud pipeline." },
    sentiment: 'Embedding ("Domo Everywhere") is workable but treated as a bolt-on to an internal-BI product — reviewers flag heavy Domo branding and negotiation-gated white-labeling.',
    reviews: [
      {
        quote: "It would be nice to have this as an option to toggle on/off — removing the 'Powered by Domo' mark that eats up real estate on embedded tiles.",
        source: 'Domo Community Forum (paraphrase)',
        platform: 'forum',
        url: 'https://community-forums.domo.com/main/discussion/68412/removing-powered-by-domo-mark-when-embedded',
      },
      {
        quote: 'Reviewers praise ease of use for dashboards generally but cite high cost and rigidity when customizing visuals for external/white-label use.',
        source: 'G2 reviews (pattern)',
        platform: 'g2',
        url: 'https://www.g2.com/products/domo/reviews',
      },
      {
        quote: 'Using Domo Everywhere to embed the subscriber instance into a customer portal via iFrame — limited screen real estate and whitespace is impacting the UI/UX experience.',
        source: 'Domo Community Forum (paraphrase)',
        platform: 'forum',
        url: 'https://community-forums.domo.com/main/discussion/67270/removing-back-to-home-header-white-space-on-subscriber-instance',
      },
      {
        quote: 'Dashboard changes in the parent instance are not appearing in subscriber instances when the publication is refreshed.',
        source: 'Domo Community Forum (paraphrase)',
        platform: 'forum',
        url: 'https://community-forums.domo.com/main/discussion/55832/publishing-to-subscriber-instances-problem',
      },
      {
        quote: 'Domo’s connector breadth is legitimately impressive, with 1,000+ connectors and strong coverage across CRMs, accounting tools, marketing platforms, and cloud warehouses. The risk is billing predictability — renewal increases of 100%+ have been reported.',
        source: 'Reddit comparison thread (research)',
        platform: 'reddit',
        subreddit: 'r/BusinessIntelligence',
        url: 'https://www.reddit.com/r/BusinessIntelligence/comments/1sttnor/who_is_doing_embedded_analytics_right_heres_what/',
      },
    ],
  },
  {
    id: 'sisense',
    name: 'Sisense',
    tagline: 'Compose SDK for fully composable embedded analytics',
    website: 'https://www.sisense.com',
    confidence: 'verified',
    demoPlayground: {
      value: 'Available — Sisense Developer Playground.',
      source: { label: 'Sisense Playground', url: 'https://sisense.dev/playground' },
    },
    pricing: {
      value: 'Not publicly disclosed — quote-based, varies by use case.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    embeddingMethods: {
      value: 'iFrame embedding with web access tokens, the Compose SDK (client-side component libraries), and a REST Embed API. No public-share option.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    multiTenancy: {
      value: 'Row-level security rules that automatically tailor data access per user.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    customization: {
      value: 'CSS can be dynamically injected into dashboards via JavaScript.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    performance: { value: 'ElastiCube in-chip analytics engine for accelerated in-memory querying.' },
    sentiment: 'Mixed-to-positive — genuinely embeddable and white-labelable, but implementation difficulty varies a lot by method (iframe vs. SDK vs. BloX).',
    reviews: [
      {
        quote: 'Sisense is also easy to embed and therefore makes it easy to provide our users with self-service analytics.',
        source: 'Capterra review',
        platform: 'capterra',
        url: 'https://www.capterra.com/p/86955/Sisense/reviews/',
      },
      {
        quote: "Embedding visuals is difficult and they don't always work depending on where you are embedding them.",
        source: 'Capterra review',
        platform: 'capterra',
        url: 'https://www.capterra.com/p/86955/Sisense/reviews/',
      },
      {
        quote: 'Very elastic, allowing areas to be custom built, embedded or modified as fast as one can think of the need.',
        source: 'TrustRadius review',
        platform: 'trustradius',
        url: 'https://www.trustradius.com/products/sisense/reviews',
      },
      {
        quote: 'Sisense for Cloud Data Teams lacks behind other tools in embeds and external visualizations.',
        source: 'TrustRadius review',
        platform: 'trustradius',
        url: 'https://www.trustradius.com/products/sisense-for-cloud-data-teams-periscope-data/reviews/all',
      },
    ],
  },
  {
    id: 'sigma',
    name: 'Sigma Computing',
    tagline: 'Spreadsheet-native cloud BI with React embed SDK',
    website: 'https://www.sigmacomputing.com',
    confidence: 'verified',
    demoPlayground: {
      value: 'Available — embedded-app tech demo.',
      source: { label: 'Sigma embedded demo', url: 'https://www.sigmacomputing.com/resources/library/enzyma-tech-embedded-app' },
    },
    pricing: {
      value: 'User licences & platform fees. Not publicly available — sales-gated.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    embeddingMethods: {
      value: 'iFrame embedding with signed tokens, a React Embed SDK, a REST API, and public embed links.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    multiTenancy: {
      value: 'Column-level security via user attributes passed at runtime through the embed API.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    customization: {
      value: 'Theme selection, custom font uploads, and URL parameters for styling.',
      source: { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
    },
    performance: { value: 'Live query pushdown directly to the warehouse — no separate extract layer.' },
    sentiment: 'Praised for clean theming/branding control, but the underlying iframe architecture is a hard ceiling for teams wanting a fully native embed.',
    reviews: [
      {
        quote: "Since Sigma embeds through an iframe, you don't have much control over the design and it won't feel like it's really part of your application.",
        source: 'G2 pros & cons (synthesis)',
        platform: 'g2',
        url: 'https://www.g2.com/products/sigma-computing-sigma/reviews?qs=pros-and-cons',
      },
      {
        quote: "It'll always look like Sigma, not necessarily like your brand or design system — plus confusion over separate per-viewer embed pricing at scale.",
        source: 'G2 pros & cons (synthesis)',
        platform: 'g2',
        url: 'https://www.g2.com/products/sigma-computing-sigma/reviews?qs=pros-and-cons',
      },
      {
        quote: 'We are able to embed Sigma reports in our portals and web pages without exorbitant licensing costs, which allows us to expand exposure and usage.',
        source: 'TrustRadius review',
        platform: 'trustradius',
        url: 'https://www.trustradius.com/products/sigma-computing/reviews',
      },
      {
        quote: 'It is being used across the company... our primary Business Intelligence tool and it allows us to surface reporting in our app.',
        source: 'TrustRadius review',
        platform: 'trustradius',
        url: 'https://www.trustradius.com/products/sigma-computing/reviews',
      },
      {
        quote: 'The standout here is deployment speed — single URL iframe embedding, no custom SDK required, keep your existing auth. Customer reports consistently describe POC in hours to days and production in 1-2 weeks.',
        source: 'Reddit thread (research)',
        platform: 'reddit',
        subreddit: 'r/dataengineering',
        url: 'https://www.reddit.com/r/dataengineering/comments/1qhzxaw/anybody_using_hex_omni_sigma_evidence/',
      },
      {
        quote: 'I would say this is the closest to Tableau in terms of maturity of features. Usage logs is more convenient to use than Tableau, and actions allow great flexibility in changing visuals or filtering.',
        source: 'Reddit comment',
        platform: 'reddit',
        subreddit: 'r/dataengineering',
        url: 'https://www.reddit.com/r/dataengineering/comments/1qhzxaw/anybody_using_hex_omni_sigma_evidence/',
      },
    ],
  },
  {
    id: 'thoughtspot',
    name: 'ThoughtSpot',
    tagline: 'Search & AI-driven analytics, Visual Embed SDK',
    website: 'https://developers.thoughtspot.com',
    confidence: 'verified',
    demoPlayground: {
      value: 'Yes — public Developer Playground configures/previews embedded Search & Liveboards and auto-generates embed code.',
      source: { label: 'ThoughtSpot Developer docs', url: 'https://developers.thoughtspot.com/getstarted' },
    },
    pricing: {
      value: 'Not publicly disclosed for production embedding. Free Developer tier for 1 year (≤10 users, 25M rows); Enterprise is quote-based, third-party estimates cite $200K–$500K+/yr.',
      source: { label: 'ThoughtSpot pricing', url: 'https://www.thoughtspot.com/pricing' },
    },
    embeddingMethods: {
      value: 'Visual Embed SDK (@thoughtspot/visual-embed-sdk — LiveboardEmbed / SearchEmbed / AppEmbed), plain iframe, and REST API v1 / v2.0. Auth via Trusted Authentication or SSO/SAML.',
      source: { label: 'Trusted Authentication docs', url: 'https://developers.thoughtspot.com/docs/trusted-auth' },
    },
    multiTenancy: {
      value: 'Row/column-level security (RLS) tied to user groups in a shared instance, or "Orgs" for full per-tenant isolation.',
      source: { label: 'Multi-tenancy docs', url: 'https://developers.thoughtspot.com/docs/multi-tenancy' },
    },
    customization: {
      value: 'CSS variables framework, customCSSUrl / inline style API, and a new AI-assisted Theme Builder (beta). No custom fonts.',
      source: { label: 'Custom CSS docs', url: 'https://developers.thoughtspot.com/docs/custom-css' },
    },
    performance: {
      value: 'In-memory Falcon engine, or live query direct to the warehouse (Embrace/DataFlow), with per-Liveboard caching.',
      source: { label: 'Embedded analytics architecture', url: 'https://www.thoughtspot.com/data-trends/embedded-analytics/embedded-analytics-architecture' },
    },
    sentiment: 'Fast to integrate via SDK, playground, and RLS, but branding customization and refresh/loading performance are the recurring embedding complaints.',
    reviews: [
      {
        quote: 'It has been a smooth process thus far for our product & technical teams to work with ThoughtSpot and bring it into our product.',
        source: 'TrustRadius review',
        platform: 'trustradius',
        url: 'https://www.trustradius.com/products/thoughtspot/reviews',
      },
      {
        quote: 'I have to refresh the whole site each time I want to access my most updated data.',
        source: 'G2 review',
        platform: 'g2',
        url: 'https://www.g2.com/products/thoughtspot/reviews',
      },
      {
        quote: 'Easy to embed into a 3rd party app.',
        source: 'TrustRadius review',
        platform: 'trustradius',
        url: 'https://www.trustradius.com/products/thoughtspot/reviews',
      },
      {
        quote: 'We implemented ThoughtSpot as an embedded & white labeled solution to provide advanced analytics to our customers.',
        source: 'TrustRadius review',
        platform: 'trustradius',
        url: 'https://www.trustradius.com/products/thoughtspot/reviews',
      },
      {
        quote: 'The AI-powered search angle is real — users can ask questions in plain English and get answers on live data. The caveats: visualization options are basic (frequently compared to Excel-level charts), charts aren’t responsive across device sizes, and the pricing is easily the most opaque on this list.',
        source: 'Reddit comparison thread (research)',
        platform: 'reddit',
        subreddit: 'r/BusinessIntelligence',
        url: 'https://www.reddit.com/r/BusinessIntelligence/comments/1sttnor/who_is_doing_embedded_analytics_right_heres_what/',
      },
    ],
  },
  {
    id: 'qlik',
    name: 'Qlik',
    tagline: 'Associative engine BI, qlik-embed web components',
    website: 'https://qlik.dev/embed/',
    confidence: 'verified',
    demoPlayground: { value: 'No dedicated interactive playground — qlik.dev/embed offers static tutorials/code samples; closest equivalent is the free Qlik Cloud trial.', source: { label: 'qlik.dev embed docs', url: 'https://qlik.dev/embed/' } },
    pricing: {
      value: 'Capacity-based (GB loaded, not per-seat): Starter ~$300/mo, Standard ~$825/mo, Premium ~$2,750/mo. OEM/embedding pricing is quote-only.',
      source: { label: 'Qlik Cloud pricing tracker', url: 'https://klarmetrics.com/qlik-cloud-pricing-2026/' },
    },
    embeddingMethods: {
      value: 'qlik-embed web components (React/Svelte-friendly), legacy iframe/Capability APIs, and nebula.js + enigma.js for custom mashups on the Engine (QIX) API. OAuth2 recommended.',
      source: { label: 'qlik.dev embed docs', url: 'https://qlik.dev/embed/' },
    },
    multiTenancy: {
      value: 'One Qlik Cloud tenant per customer org recommended; mandatory Section Access filters rows/columns per embedded user via OIDC/SAML claims.',
      source: { label: 'Qlik OEM data access docs', url: 'https://qlik.dev/manage/oem/privacy-security/data-access/' },
    },
    customization: {
      value: 'Custom theme JSON + CSS, OEM-only "Brands" API for logo/favicon. Full white-labeling reported incomplete (system messages still say "Qlik").',
      source: { label: 'Qlik custom themes docs', url: 'https://qlik.dev/extend/create-custom-themes/' },
    },
    performance: {
      value: 'QIX columnar in-memory associative engine with shared cache across concurrent users; scales via added RAM/CPU or nodes.',
      source: { label: 'QIX engine resource management', url: 'https://core.qlik.com/services/qix-engine/resource-management/' },
    },
    sentiment: 'Embedding is powerful and developer-friendly via qlik-embed, but pricing opacity and incomplete white-labeling frustrate customer-facing deployments.',
    reviews: [
      {
        quote: 'Seamless integration of customised extended JS charts (so-called extensions)... further integration with web-services.',
        source: 'Capterra review',
        platform: 'capterra',
        url: 'https://www.capterra.com/p/209809/Qlik-Sense/reviews/',
      },
      {
        quote: "[For the embedded use case] I was quoted a very high price and didn't want to put my customers through the analyst.",
        source: 'TrustRadius review',
        platform: 'trustradius',
        url: 'https://www.trustradius.com/products/qlik-sense/reviews',
      },
      {
        quote: 'With 1000+ users, each of whom might visit the page for a few seconds, it seems a waste to use up the login tokens so quickly. (on embedding mashups in web pages)',
        source: 'Qlik Community forum',
        platform: 'forum',
        url: 'https://community.qlik.com/t5/New-to-Qlik-Sense/licensing-for-access-to-mashups-embedded-in-web-pages/td-p/960521',
      },
      {
        quote: 'Embedding sheets does not work particularly well with mobile/small screen devices, and the URL generated by Qlik Sense is not particularly user friendly.',
        source: 'Quick Intelligence blog (Qlik consultancy)',
        platform: 'forum',
        url: 'https://www.quickintelligence.co.uk/qlik-sense-apis-mash-ups/',
      },
      {
        quote: 'Qlik’s associative engine is genuinely different from traditional BI — it indexes all data relationships so users can explore without predefined queries. But the recommended multi-tenancy approach is one tenant per customer org: 200 customers = 200 tenants. That scales badly in both operational overhead and cost.',
        source: 'Reddit comparison thread (research)',
        platform: 'reddit',
        subreddit: 'r/BusinessIntelligence',
        url: 'https://www.reddit.com/r/BusinessIntelligence/comments/1sttnor/who_is_doing_embedded_analytics_right_heres_what/',
      },
    ],
  },
  {
    id: 'superset',
    name: 'Apache Superset',
    tagline: 'Open-source BI, guest-token iframe embedding',
    website: 'https://superset.apache.org',
    confidence: 'verified',
    demoPlayground: { value: 'No official public live demo — docs point to self-hosting via Docker/pip, or Preset’s free Starter tier as a trial.', source: { label: 'Superset', url: 'https://superset.apache.org/' } },
    pricing: {
      value: 'Core is free/open-source, self-hosted. Preset (managed): Starter free (5 users), Professional $20/user/mo, Enterprise custom; Embedded Dashboard Viewer Licenses start at $500/mo for 50 licenses.',
      source: { label: 'Preset pricing', url: 'https://preset.io/pricing/' },
    },
    embeddingMethods: {
      value: '@superset-ui/embedded-sdk + iframe, secured by short-lived server-issued "guest tokens" (5-min default expiry), requires the EMBEDDED_SUPERSET flag and domain allowlisting.',
      source: { label: 'Superset embedding docs', url: 'https://superset.apache.org/user-docs/using-superset/embedding/' },
    },
    multiTenancy: {
      value: 'Tenant isolation via RLS clauses embedded directly in the guest-token payload per request; scaling to many tenants often needs a custom middleware layer.',
      source: { label: 'Superset embedding docs', url: 'https://superset.apache.org/user-docs/using-superset/embedding/' },
    },
    customization: {
      value: 'Per-dashboard custom CSS; Superset 6.0+ theming (Ant Design tokens, brandAppName); SDK cssOverrides / dashboardUiConfig for white-labeling.',
      source: { label: 'Superset theming docs', url: 'https://superset.apache.org/admin-docs/configuration/theming/' },
    },
    performance: {
      value: 'Redis/Memcached query caching and Celery async queries to offload long SQL.',
      source: { label: 'Superset caching docs', url: 'https://superset.apache.org/admin-docs/configuration/cache/' },
    },
    sentiment: 'Functional and cost-effective for teams willing to do the engineering work, but thin embedding docs and DIY multi-tenant RLS setup are recurring friction points.',
    reviews: [
      {
        quote: 'Had a very good experience with Superset. Superset allowed us to replace Tableau and not looking back.',
        source: 'Hacker News comment',
        platform: 'hackernews',
        url: 'https://news.ycombinator.com/item?id=39513031',
      },
      {
        quote: 'Took me a while to figure out how to embed it into my app using Superset Embedded SDK.',
        source: 'Hacker News comment',
        platform: 'hackernews',
        url: 'https://news.ycombinator.com/item?id=39516704',
      },
    ],
  },
  {
    id: 'hex',
    name: 'Hex',
    tagline: 'Notebook-native analytics, Enterprise-only embed API',
    website: 'https://hex.tech',
    confidence: 'verified',
    demoPlayground: { value: 'Public example gallery with live, interactive sample projects; no self-serve trial beyond the free Community plan.', source: { label: 'Hex gallery', url: 'https://hex.tech/gallery/' } },
    pricing: {
      value: 'Community free; Pro $36/mo; Team $75/mo; Enterprise custom. Embedded Analytics ships only as an Enterprise add-on with no public price.',
      source: { label: 'Hex pricing', url: 'https://hex.tech/pricing/' },
    },
    embeddingMethods: {
      value: 'iFrame-only, via signed single-use presigned URLs from the Embed API (createPresignedUrl); also plain public and private share links. No client SDK.',
      source: { label: 'Hex signed embedding docs', url: 'https://learn.hex.tech/docs/share-insights/embedding/signed-embedding' },
    },
    multiTenancy: {
      value: 'Embed-user identity plus hex_user_attributes passed via API call; row-level security filters warehouse data per user inside SQL/dataframe cells.',
      source: { label: 'Hex signed embedding docs', url: 'https://learn.hex.tech/docs/share-insights/embedding/signed-embedding' },
    },
    customization: {
      value: 'Custom logo, font, color palette, and accent color via Workspace Styling (Team/Enterprise); full white-labeling bundled with the embed add-on.',
      source: { label: 'Workspace custom styling docs', url: 'https://learn.hex.tech/docs/administration/workspace_settings/workspace-custom-styling' },
    },
    performance: {
      value: '"Query mode" / Python pushdown keeps compute in the warehouse instead of the notebook kernel; query caching recommended specifically for published/embedded apps.',
      source: { label: 'Hex large datasets guide', url: 'https://hex.tech/how-to-hex/working-with-large-data-sets/' },
    },
    sentiment: 'The embed API itself is liked for simplicity, but Enterprise-only, opaque embedding pricing is a recurring complaint.',
    reviews: [
      {
        quote: "Cons around Hex's pricing include the large gap between Professional and Team tiers, and expensive embedding features — the pricing for their embedding feature is disqualifying.",
        source: 'G2 review',
        platform: 'g2',
        url: 'https://www.g2.com/products/hex-tech-hex/reviews',
      },
      {
        quote: 'You can publish any Hex notebook with literally just a few clicks, and anyone you share it with can access it, or edit it, or fork it. (Hex employee)',
        source: 'Hacker News comment',
        platform: 'hackernews',
        url: 'https://news.ycombinator.com/item?id=36317496',
      },
    ],
  },
  {
    id: 'omni',
    name: 'Omni',
    tagline: 'Hybrid warehouse-native BI with SDK + postMessage embedding',
    website: 'https://omni.co',
    confidence: 'verified',
    demoPlayground: { value: 'Interactive demo ("try with your own data"), plus a public GitHub reference app for developers evaluating the embed SDK.', source: { label: 'Omni demo', url: 'https://omni.co/demo' } },
    pricing: {
      value: 'No public list pricing — gated behind a sales demo. Third-party trackers estimate Growth ≈$999/mo and Pro ≈$1,995/mo, unlimited users/embedded viewers.',
      source: { label: 'Embeddable.com pricing comparison', url: 'https://embeddable.com/blog/embedded-analytics-pricing-and-benefit-comparison' },
    },
    embeddingMethods: {
      value: 'Signed-URL iframe embedding, a TypeScript/React/Vue/Angular SDK for native component rendering, a raw-JSON API for custom visualizations, and postMessage for two-way parent/iframe communication.',
      source: { label: 'Omni embed docs', url: 'https://docs.omni.co/embed' },
    },
    multiTenancy: {
      value: 'Row-level permissions + SSO via a server-side two-step signed-session flow (createSessionToken / redeemSessionToken); embed secret must stay server-side.',
      source: { label: 'Omni embedding infrastructure docs', url: 'https://docs.omni.co/docs/embed/external-embedding/setting-up-the-infrastructure' },
    },
    customization: {
      value: 'Full theme customization through the embed SDK plus deep two-way postMessage UI control.',
      source: { label: 'Omni embed docs', url: 'https://docs.omni.co/embed' },
    },
    performance: {
      value: 'Hybrid intelligent cache (6-hour default result cache, 30-query session requery cache) combining full-warehouse-scale queries with in-memory speed.',
      source: { label: "Omni's intelligent cache", url: 'https://omni.co/blog/under-the-hood-of-omnis-intelligent-cache' },
    },
    sentiment: 'Strong praise for turning static charts into fast, native-feeling embedded dashboards, tempered by a steeper non-technical onboarding curve.',
    reviews: [
      {
        quote: 'Omni completely transformed our embedded analytics experience for our customers... in a matter of weeks, our team was able to convert the analytics within our product from a legacy set of static charts into fast, interactive dashboards that feel native to our platform.',
        source: 'G2 review',
        platform: 'g2',
        url: 'https://www.g2.com/products/omni-analytics-inc-omni-analytics/reviews',
      },
    ],
  },
  {
    id: 'semaphor',
    name: 'Semaphor',
    tagline: 'Emerging live-query embedded analytics platform',
    website: 'https://semaphor.cloud',
    confidence: 'thin',
    demoPlayground: { value: 'Yes — a live interactive demo linked from the homepage.', source: { label: 'Semaphor', url: 'https://semaphor.cloud/' } },
    pricing: {
      value: 'Starter / Growth / Enterprise tiers named, no dollar figures published — every tier gates to "Talk to us."',
      source: { label: 'Semaphor', url: 'https://semaphor.cloud/' },
    },
    embeddingMethods: {
      value: 'Zero-dependency iframe (server call to /api/v1/token, then load /embed/{accessToken}), native React/Vue/Web Component SDKs, and full API access.',
      source: { label: 'Semaphor iframe embedding docs', url: 'https://docs.semaphor.cloud/docs/embedding/iframe' },
    },
    multiTenancy: {
      value: 'Row-, column-, schema-, and connection-level security applied automatically per token, plus endUserId, domain include/exclude rules, and schema routing for per-tenant scoping.',
      source: { label: 'Semaphor iframe embedding docs', url: 'https://docs.semaphor.cloud/docs/embedding/iframe' },
    },
    customization: {
      value: 'White-label styling — fonts, colors, layout, light/dark/system theme — with per-token control over which chrome (AI assistant, controls, hub/share) is visible.',
      source: { label: 'Semaphor iframe embedding docs', url: 'https://docs.semaphor.cloud/docs/embedding/iframe' },
    },
    performance: {
      value: 'Positions itself on live, governed queries against the source system — no ETL pipelines, no data duplication, no sync delays.',
      source: { label: 'Semaphor', url: 'https://semaphor.cloud/' },
    },
    sentiment: 'Too new/small for independent review coverage — no G2, Capterra, or Reddit presence found; treat sentiment as unverified, vendor-sourced only.',
    reviews: [
      {
        quote: 'Allowed a team to launch customer analytics in under a day.',
        source: 'Semaphor vendor case study (not independently verified)',
        platform: 'vendor',
        url: 'https://semaphor.cloud/',
      },
    ],
  },
];

export interface ComparisonDimension {
  key: keyof Competitor;
  label: string;
  helper: string;
}

/** How ThoughtSpot sits against the best-in-class vendor on a dimension. */
export type TsStanding = 'competitive' | 'mid-pack' | 'behind';

/**
 * Best-in-class verdict for one comparison dimension, from the July 2026 deep
 * research pass over public reviews (G2 / Capterra / TrustRadius / Gartner Peer
 * Insights) and developer community discussion (Reddit, Hacker News, vendor
 * docs and forums). Claims were adversarially verified before being recorded.
 *
 * `winner: null` means the public evidence was too thin or too contaminated by
 * vendor marketing to name a credible winner — we say so rather than guess.
 */
export interface BestInClass {
  /** Competitor id that wins the dimension, or null when evidence is too thin. */
  winner: string | null;
  /** Why it wins, grounded in what real users and developers said. */
  why: string;
  /** Competitor id of the closest challenger, when the win is contested. */
  runnerUp?: string;
  /** Candid read on where ThoughtSpot lands — this is a gap analysis. */
  tsStanding: TsStanding;
  tsNote: string;
  sources: SourceLink[];
}

export const TS_STANDING_LABEL: Record<TsStanding, string> = {
  competitive: 'ThoughtSpot competitive',
  'mid-pack': 'ThoughtSpot mid-pack',
  behind: 'ThoughtSpot behind',
};

/**
 * Deliberately excluded as sources: `embeddable.com/blog/...alternatives` and
 * `omni.co/articles/best-white-label...`. Both are vendor content ranking their
 * own product against rivals — exactly the marketing contamination this pass
 * was meant to filter out.
 */
export const bestInClass: Partial<Record<keyof Competitor, BestInClass>> = {
  demoPlayground: {
    winner: 'powerbi',
    why:
      "Microsoft's dev sandbox is the only playground that needs no signup at all — it loads a sample dataset, runs live code against the real embed APIs, and hands back a copy-pasteable snippet.",
    runnerUp: 'tableau',
    tsStanding: 'behind',
    tsNote:
      'Functionally the richest playground here — six embed components, CSS-variable theming and an AI code assistant — but it is gated behind provisioning a trial with a business email, so nobody can evaluate anonymously. Rich, but not reachable.',
    sources: [
      { label: 'Power BI dev sandbox', url: 'https://playground.powerbi.com/dev-sandbox' },
      { label: 'Tableau embedding playground', url: 'https://developer.salesforce.com/tableau/embedding-playground/overview' },
    ],
  },
  embeddingMethods: {
    winner: 'sigma',
    why:
      'Sigma is the only vendor documenting all four integration paths in parallel — no-code embed UI, REST API, JavaScript Embed API and a React SDK — with the SDK open-sourced alongside a runnable sample app.',
    runnerUp: 'embeddable',
    tsStanding: 'competitive',
    tsNote:
      'A genuine component-level SDK (Search, natural-language search, Spotter, Visualization, Liveboard, App) puts ThoughtSpot far ahead of the iframe-only tools — Looker and Superset both embed strictly through an iframe. The gap to Sigma is breadth of parallel paths, not SDK quality.',
    sources: [
      { label: 'Sigma React embed SDK', url: 'https://help.sigmacomputing.com/docs/embed-sdk-for-react' },
      { label: 'Looker embed SDK (iframe-only)', url: 'https://github.com/looker-open-source/embed-sdk' },
    ],
  },
  performance: {
    winner: null,
    why:
      'No credible winner. Every cross-vendor embed-scale benchmark we found was published by a vendor about itself, and the only independent discussion is anecdotal — so naming a winner here would be guessing.',
    tsStanding: 'mid-pack',
    tsNote:
      'Object-count ceilings and multi-iframe memory pressure are real and surfaced in our own interviews, but they are an industry-wide iframe problem that hits Domo and Qlik the same way — not a ThoughtSpot-specific deficit.',
    sources: [
      { label: 'HN: why not to use iframes for embedded dashboards', url: 'https://news.ycombinator.com/item?id=44603657' },
      { label: 'TrustRadius embedded BI category', url: 'https://www.trustradius.com/embedded-business-intelligence' },
    ],
  },
  multiTenancy: {
    winner: 'looker',
    why:
      "Looker's signed embed payload declares external ID, group membership, a granular permissions array and user attributes per embed user, so a tenant is provisioned at token-mint time without pre-creating accounts.",
    runnerUp: 'superset',
    tsStanding: 'mid-pack',
    tsNote:
      'Org-based multi-tenancy covers the capability, but predictability is the gap — auth and security setup was the joint-loudest community theme (4.5/5) and reviewers consistently rate Power BI and Omni docs as deeper on this.',
    sources: [
      { label: 'Looker embed SDK — signed embed payload', url: 'https://github.com/looker-open-source/embed-sdk' },
      { label: 'Superset RLS in guest token', url: 'https://github.com/apache/superset/discussions/30033' },
    ],
  },
  customization: {
    winner: 'embeddable',
    why:
      'Developers author their own React components and register them via a config file, so look and feel is governed by their code — there is no vendor chrome left to override or hide.',
    runnerUp: 'metabase',
    tsStanding: 'behind',
    tsNote:
      'CSS variables and per-action visibility controls are real and first-class, yet this is still our loudest pain point (5/5): developers keep hitting hardcoded UI they cannot reach and fall back to manual code changes. Reviewers put Hex, Omni and Semaphor deeper here.',
    sources: [
      { label: 'Embeddable — defining components', url: 'https://docs.embeddable.com/component-libraries/build-components/defining-components' },
      { label: 'ThoughtSpot pros & cons (G2)', url: 'https://www.g2.com/products/thoughtspot/reviews?qs=pros-and-cons' },
    ],
  },
};

export interface DimensionGroup {
  title: string;
  icon: string;
  dimensions: ComparisonDimension[];
}

/**
 * Pricing is intentionally excluded from the comparison table — too few
 * vendors publish real numbers to make a fair row, and it skews attention
 * away from the embedding-specific dimensions this research is about.
 */
export const dimensionGroups: DimensionGroup[] = [
  {
    title: 'Demo & trial',
    icon: 'play',
    dimensions: [
      { key: 'demoPlayground', label: 'Demo / playground', helper: 'Can you try embedding before you buy?' },
    ],
  },
  {
    title: 'Embedding architecture',
    icon: 'embrace',
    dimensions: [
      { key: 'embeddingMethods', label: 'Embedding methods', helper: 'iFrame, SDK, API, public share' },
      { key: 'performance', label: 'Performance & scalability', helper: 'Caching vs. live query approach' },
    ],
  },
  {
    title: 'Permission & access control',
    icon: 'lock',
    dimensions: [
      { key: 'multiTenancy', label: 'Multi-tenancy & permissions', helper: 'Row/column-level security for shared instances' },
    ],
  },
  {
    title: 'Look & feel',
    icon: 'brush',
    dimensions: [
      { key: 'customization', label: 'Look & feel customization', helper: 'Theming, CSS, white-labeling depth' },
    ],
  },
];
