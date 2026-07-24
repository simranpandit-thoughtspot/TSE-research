/**
 * Primary research — TSE SME interview insights
 *
 * Transcribed from the two interview insight boards (sticky-note quadrant boards)
 * segmented into Strengths / Limitations / Frustrations / Opportunities.
 */

export interface QuadrantCard {
  label?: string;
  text: string;
}

export interface Interview {
  id: string;
  title: string;
  subtitle: string;
  recordingUrl: string;
  quadrants: {
    strengths: QuadrantCard[];
    limitations: QuadrantCard[];
    frustrations: QuadrantCard[];
    opportunities: QuadrantCard[];
  };
}

export const interviews: Interview[] = [
  {
    id: 'interview-1',
    title: 'Bill Back',
    subtitle: 'Hands-on walkthrough — Playground & Theme Builder, day-to-day use',
    recordingUrl: 'https://drive.google.com/file/d/1gcym9UcfY1n14Q9Vqh5C-Y2kPzFQllH8/view?usp=sharing',
    quadrants: {
      strengths: [
        { text: "Playground is cool, I use it all the time. It's what we use in all the training sessions that we do." },
        { label: 'Theme builder', text: 'The thing I do like about theme builder is I can figure out what variables I need to set because I can go in there and really easily test.' },
        { text: 'I really push the fact that okay well I can embed a board in like five minutes, right? It’s super easy. I think we should definitely stick with that — I think that’s a big selling point. I think the customization is good.' },
        { label: 'Style customisation', text: 'It should both go the same spot — can you click on it here and...' },
        { text: 'These styling options are used the most, but the entry points can stay in 2 different places.' },
      ],
      limitations: [
        { label: 'Playground', text: 'Not all of the customisation options are available.' },
        { label: 'Playground', text: 'Nothing such as "Save as draft" for me to save my experiments → go do the settings → come back to playground.' },
        { label: 'Theme builder', text: 'I use it all the time. I have my own thoughts on theme builder — I don’t know if you guys know, but there’s still some pretty big gaps there that could be improved.' },
        { label: 'Theme builder', text: "Also doesn't do strings. It doesn't do icons — that part's a little bit limited. Icons are not as common." },
        { label: 'Playground', text: 'It is not intuitive and one has to rely heavily on documentation. Security settings is away, and going there makes me lose playground work.' },
      ],
      frustrations: [
        { label: 'Setup', text: 'You have to go in and understand that there’s a lot of security stuff that has to be done upfront to get things working.' },
        { label: 'Authentication', text: 'The piece is a little bit trickier — to understand the options and which one to choose.' },
        { label: 'Playground → Documentation', text: 'To find the customisation parameters, you need to go through the documentation.' },
        { text: 'I actually use "navigate away and come back" as a workaround, because we don’t have a clear capability to reset it back.' },
        { label: 'Auth flow', text: 'Referenced an auth flow chart from Nico as the clearest existing explanation of the authentication options.' },
        { label: 'REST API', text: 'The only time it gets a little confusing is some of the return types are not as well documented — you get lost because they’re pretty deep in the JSON.' },
        { label: 'Customisations in theme builder', text: 'I screw it up half the time because custom customizations are pretty complex, and getting the two to work together is a little bit tricky.' },
        { text: 'In the new docs it’s harder to find things — the search in there is not very good either.' },
        { label: 'Code export', text: 'Right now you can’t take whatever’s in the playground as code and put it straight into your code. There are functions in there you don’t need, a bunch of comments you’d want to get rid of, and it’s only in JavaScript — whereas most people are working in TypeScript, React, or Angular.' },
        { text: 'High up there — you can’t hide the right bar in Search without rules being unstable. There’s no way to hide that.' },
        { label: 'Theme builder', text: 'My biggest complaint is there’s really no copy/paste. I have to generate the HTML, then find it down this big list of JSON.' },
        { text: 'REST API v1 needs to be hidden.' },
        { text: '...but if I’m just looking at that one variable, it’s hard to get to that one variable.' },
      ],
      opportunities: [
        { text: 'An easier way to say "hey, we’re going to be doing this kind of embedding, here’s the settings we need to make first" — maybe that’s Spotter Code, or maybe there’s some AI built into that security settings page.' },
        { text: 'Do we have links in the playground to the documentation for that? That might be nice.' },
        { text: 'Nobody uses the left nav to navigate to documentation from playground.' },
        { text: 'Be nice if the guide had an option to say "Hey, open this in another tab."' },
        { text: 'The one feature we haven’t been able to land yet that I think is really powerful: codebase custom actions — because they let you go from analytics to action.' },
        { text: 'They’ll usually do the liveboard, then go get the theme builder — I’d like to see greater integration between those two.' },
        { text: 'It would be nice if there was an export capability where I say "export this as React" and it just pops up with the React components I needed.' },
        { label: 'Playground new UI', text: 'That might be okay — ideally I’d have that in another location. When I’m developing with VS Code open and I make changes, I’ve got Chrome open on a different monitor.' },
      ],
    },
  },
  {
    id: 'interview-2',
    title: 'Tri Tru',
    subtitle: 'Strategic view — embedding readiness, APIs, and enterprise deployment',
    recordingUrl: 'https://drive.google.com/file/d/12FwmCbIoUou-TchErV1Kgj5ppSbEMk6x/view?usp=sharing',
    quadrants: {
      strengths: [
        { label: 'Analytics capabilities are already strong', text: 'All that great analytics we build for TSE internal use cases still applies.' },
        { label: 'Spotter Code is a major improvement', text: 'We’re recommending Spotter Code more. With Spotter Code we can say "create this entire thing for us."' },
        { label: 'Ease of use is the right direction', text: 'I want a solution that is ease of use, self-service. That’s what they care about.' },
        { label: 'Embedded is a very sticky product', text: 'If we can get them to go live, it’s extremely difficult for them to say you can’t have analytics anymore.' },
        { label: 'White labeling is a competitive strength', text: 'They want their users to think it’s their solution.' },
      ],
      limitations: [
        { label: 'Customization isn’t deep enough', text: 'Competitors have components already built in to customize filters and other components. We had to write custom code.' },
        { label: 'Integration capabilities lag behind product features', text: 'Embedded customers pretty much do everything through APIs. But they do not have API support for the latest features. Ex: Collections.' },
        { label: 'APIs arrive too late', text: 'We deliver it two or three releases later.' },
        { text: 'If we’re going after this market we need an API-first mentality. One of the checkmarks should be: is there API coverage?' },
        { label: 'Documentation is not built out upfront', text: 'Documentation isn’t release-ready.' },
        { label: 'Existing documentation needs restructuring', text: 'We need to go back and update documentation. Make it easier to consume.' },
        { label: 'CI/CD workflow is still immature', text: 'They need the ability to move from Dev to Test to Prod. That needs to be simple. "Enterprise customers don’t build directly in production. They expect the product to fit into their existing software delivery process." Imagine JPMorgan: 1M partner portals, thousands of dashboards, thousands of users — if every deployment requires manual work, it’s impossible to maintain. Instead they need automated deployment.' },
      ],
      frustrations: [
        { label: 'Customers discover prerequisites too late', text: 'There’s a security issue I wasn’t aware of.' },
        { label: 'Information isn’t surfaced early enough', text: '"It’s not surfaced upfront." "I don’t want us to find out six months later." "Why is there no API?"' },
        { label: 'Engineers spend time hunting information', text: '"They love to read documentation." "They love to be self-service." But... "The documentation isn’t there."' },
        { label: 'Documentation becomes stressful', text: '"Don’t wait till the very end." "It’s very stressful."' },
        { label: 'Customers lose confidence when documentation is missing', text: '"How do we embed Spotter?" "There’s no documentation."' },
        { text: 'We had to write custom code — instead of granular customisations.' },
      ],
      opportunities: [
        { text: 'Instead of letting customers discover the settings — examples: SSO, domain whitelist, security, authentication, SDK setup. "Surface it upfront."' },
        { text: '"We’re trying to put together a recipe book." "Implementation patterns."' },
        { text: 'Repeatedly emphasized for documentation: earlier release, better structured (search), easier to consume, continuously updated.' },
        { text: '"Leverage Spotter Code."' },
        { label: 'Involve field teams earlier', text: '"My team talks to customers all day."' },
        { text: 'They’ll usually do the liveboard and then go get the theme builder — I’d like to see greater integration between those two.' },
        { text: 'It would be nice if there was an export capability where I say "export this as React" and it just pops up with the React components I needed.' },
        { label: 'Playground new UI', text: 'That might be okay — ideally I’d have that in another location, so it can sit side-by-side with a code editor during development.' },
      ],
    },
  },
  {
    id: 'interview-3',
    title: 'Ron Dugger',
    subtitle: 'Overlay solutions engineer — Tableau-to-ThoughtSpot parity and white-labeling',
    recordingUrl: 'https://drive.google.com/file/d/1emE5f4KOxTuY9rADOxc73o_jFf0Mby8v/view?usp=sharing',
    quadrants: {
      strengths: [
        {
          label: 'Developer program & APIs',
          text: 'Coming from nine years at Tableau in the same embedded-analytics role, moving to ThoughtSpot "was kind of a breath of fresh air once I really got deep into the APIs." "The ThoughtSpot developer program is absolutely better than what we had at Tableau... the APIs are much better, just better functionality, better coded in general."',
        },
        {
          label: 'White-labeling and branding',
          text: 'Prospects evaluating ThoughtSpot "absolutely love our ability to white label and brand and customize the content. The CSS variables, the rules unstable, in a lot of cases... those are definitely something that put us above our competition."',
        },
        {
          label: 'AI-driven reimagining vs. replication',
          text: 'When customers ask to replicate a Looker/Tableau report exactly, "we\'ve gotten a lot better about trying to change that conversation to... we\'re not in the business of replicating. We\'re in the business of leveraging our AI tooling to make your customers\' lives easier. So we do a lot of reimagining."',
        },
      ],
      limitations: [
        {
          label: 'More clicks than competitors (TSA side)',
          text: 'No product is perfect — "everyone kind of does embedding... and everyone has some gaps." Most of the gaps Ron sees are on the TSA side: "it takes a lot more clicks to create things in ThoughtSpot from a TSA standpoint than it does in other tools. That\'s the main feedback I get from customers."',
        },
        {
          label: 'Cross-filtering feels decoupled',
          text: 'Tableau\'s built-in action framework (URL actions, click actions) filters one viz from another "with no changes in the UI." ThoughtSpot can do similar cross-filtering — "we do have the capability, but it just looks almost a little bit decoupled... not as, I guess, from a control standpoint" — and the interaction visibly changes the UI (right-click → filter).',
        },
        {
          label: 'Static tooltips',
          text: '"Our tool tips are very static — like, you know, it\'s either you can turn something on or off, that\'s it. A lot of our embed customers... are asking we want to customize these tool tips and have them look a certain way. Um, so some of that\'s just product limitations like we just can\'t do that. Then the customer has to get over it."',
        },
        {
          label: 'Customization stops at tooltips',
          text: 'The customization ask "would not just be limited to tool tips — it can probably get extended to the buttons, the colors, the brand colors, everything."',
        },
      ],
      frustrations: [
        {
          label: 'Replication expectations',
          text: 'Customers migrating from Looker/Tableau frequently open with "I have this report that I\'ve created in Looker or Tableau, and we want to replicate exactly what we\'ve got in ThoughtSpot" — forcing the team to redirect the conversation away from feature-for-feature parity.',
        },
        {
          label: 'Edge cases still need a solution engineer',
          text: 'Most embedded opportunities are self-served by direct solution engineers with documentation, but Ron\'s overlay team still gets pulled in for one-off asks: codebase custom actions, authentication/user-onboarding automation, custom URL requirements, and CI/CD pipeline questions.',
        },
        {
          label: 'No workaround for product limitations',
          text: 'On tooltip customization specifically: "some of that\'s just product limitations like we just can\'t do that. Then the customer has to get over it."',
        },
      ],
      opportunities: [
        {
          text: 'Bring ThoughtSpot\'s existing cross-filter capability up to the same seamless, no-UI-change feel as Tableau\'s action framework, instead of a visibly different right-click-to-filter interaction.',
        },
        {
          text: 'Let embed customers configure tooltip appearance and behavior instead of a static on/off toggle.',
        },
        {
          text: 'Extend the white-label customization surface beyond CSS variables to buttons, colors, and brand elements as a defined, discoverable set — not one-off product limitations.',
        },
        {
          label: 'Close the TSA click-count gap',
          text: 'Reduce the extra clicks required for TSA (self-service/analyst) workflows relative to Looker/Tableau — Ron sees more feedback on this gap than on TSE/embedding itself.',
        },
      ],
    },
  },
  {
    id: 'interview-4',
    title: 'John Heggley',
    subtitle: 'Technical architect — TSE deep-dive: event design, webhooks, and API-first',
    recordingUrl: 'https://drive.google.com/file/d/1dxlANMK541EhRwE0rkFogB6Hoy-xrM5b/view?usp=sharing',
    quadrants: {
      strengths: [
        {
          label: 'Good baseline embedding experience',
          text: '"At a high level, I actually think what we\'ve done is really good — if I want to just embed a live board, it\'s pretty straightforward to do that... I think it\'s actually a good implementation."',
        },
        {
          label: 'Customization is generally solid',
          text: '"I don\'t get a ton of push back on our customization options, honestly... I actually feel like our customization is pretty decent, especially now that you can use the theme builder inside of Playground."',
        },
        {
          label: 'Scheduled Liveboard webhooks',
          text: 'Built after a HIPAA-compliance customer (Wex) couldn\'t use ThoughtSpot\'s email service: "we built scheduled liveboard webhooks, which I love, I think they\'re great." "In my mind, everything you do in ThoughtSpot should have a webhook."',
        },
      ],
      limitations: [
        {
          label: 'Documentation lags behind best practice',
          text: 'Spotter Code and Claude Code still sometimes recommend filter rules for ABAC "even though that is the old approach... it should be suggesting variable values" — and brand-new customers copy the same deprecated pattern straight from docs. "Anything associated with filter rules should have a big red banner... this is deprecated, do not use."',
        },
        {
          label: 'Inconsistent event payloads',
          text: 'The filter-changed event payload is "this massive object that is very, very difficult to parse," while what you pass into the update-filters event "is a totally different payload." "If we had done this thoughtfully, the payloads for those would be exactly the same" — like Stripe, where the same functionality keeps the same payload shape.',
        },
        {
          label: 'Implementations feel disconnected once nuanced',
          text: '"Once you get more nuanced, there\'s a lot of pieces that feel disconnected... like one engineer built the filter-changed event and a totally different engineer built the update-filters event, and the two of them never talked about the relationship between the two."',
        },
        {
          label: "Customization doesn't always ship with the feature",
          text: 'When Spotter 3 launched, the ability to rename Spotter didn\'t propagate to its "thinking steps," which still said "Spotter is doing..." — "if we\'re going to allow customization, then anything we release should respect the customization."',
        },
        {
          label: 'Two disconnected webhook services',
          text: 'Legacy KPI-alert webhooks predate the newer webhook service that scheduled Liveboards use, and were "built only with TSA in mind" for a technical analyst — not for white-labeled embed. Setting one up means digging into an alert dialog with a raw "send to webhook" checkbox: "no embedded user is going to understand what a webhook is."',
        },
        {
          label: 'No self-serve sandbox for higher-privilege features',
          text: 'Free-trial users can\'t customize security settings, and there\'s no full self-serve instance the way "Salesforce does this" for developer accounts — deals only get a real test cluster once they clear a $75-100K threshold.',
        },
        {
          label: 'Scale ceiling is a real constraint',
          text: 'Clusters start raising concern around 3 million objects and show "really big performance slowdowns" at 4-5 million — forcing a $20M deal to split across ten clusters "is just not a great story for us," though John frames this as ThoughtSpot\'s core architecture, not an embedding-specific problem.',
        },
      ],
      frustrations: [
        {
          label: 'Collections shipped with no API',
          text: '"Collections got released with no API coverage at launch... we went to [the owner] and said what the hell man, we have all these embed customers who want to use this but they have no API to use it — it\'s not great." It was added back later, but only after pushback.',
        },
        {
          label: 'Theme Builder gaps force CSS overrides',
          text: 'Some visual changes "aren\'t supported by theme builder and we have to use the rules-unstable CSS overrides" — though John sees this as an acceptable, rational escape hatch rather than a gap worth closing with "15,000 variables" nobody could navigate.',
        },
        {
          label: 'Concurrency issues mean manual SRE back-and-forth',
          text: 'Handling concurrency at scale today "is just a back and forth with SRE, which is often difficult... it always feels like it takes way longer than it should."',
        },
      ],
      opportunities: [
        {
          label: 'API-first releases',
          text: '"Anything new we release, we should have an API for it... if anything, we should release an API without a UI first" — especially given "70% of our new revenue comes from embedded."',
        },
        {
          label: 'Webhook coverage for metadata changes',
          text: 'A metadata-change webhook would let a customer "automatically sync the new version of the liveboard to their git repo" the moment it changes in ThoughtSpot — turning today\'s manual pull-then-push into real CI/CD.',
        },
        {
          label: 'Webhooks for permission/governance changes at scale',
          text: 'A permission-change webhook would let an enterprise customer auto-enforce rules like "only one admin per cluster" without manually auditing every cluster — critical once a deal spans twenty clusters, not five.',
        },
        {
          label: 'Consolidate onto one webhook service',
          text: 'Migrate legacy KPI-alert webhooks onto the newer service that scheduled Liveboards use, so there is a single, embed-friendly webhook model instead of two.',
        },
        {
          label: 'Self-serve developer sandboxes',
          text: 'Let developers spin up a full instance — security settings included — the way a Salesforce developer account does, rather than waiting for deal size to unlock a real test cluster.',
        },
        {
          label: 'Deprecation banners in documentation',
          text: 'Flag deprecated patterns like filter rules directly in the docs so neither AI copilots (Spotter Code, Claude Code) nor new customers keep reaching for them.',
        },
      ],
    },
  },
  {
    id: 'interview-5',
    title: 'Manikanta',
    subtitle: 'Sales engineer — pre-sales evaluation flow, Playground UX, and documentation',
    recordingUrl: 'https://drive.google.com/file/d/1DiuEtQQxH-3LTEfUhB541SHN8L_qd0qz/view?usp=sharing',
    quadrants: {
      strengths: [
        {
          label: 'Developer tab has improved a lot',
          text: '"There are a lot more improvements... from a design standpoint we were not at a great point maybe one year, one and a half years ago... there have been very good improvements."',
        },
        {
          label: 'One link gets a developer embedding',
          text: '"I usually just share this link — to the Quickstart guide — and say, go start building or embedding in ThoughtSpot and follow this guide. And that usually gets them to a state where they can embed ThoughtSpot, right? No problems usually."',
        },
        {
          label: "Renaming Liveboard to \"dashboard\" for embed audiences",
          text: '"I like how we changed... from a live board, we started calling this dashboard. Liveboards is a ThoughtSpot-specific lingo, Spotter is a ThoughtSpot-specific language — industry doesn\'t care about it. I welcome this screen — this was not the case before."',
        },
        {
          label: 'Dev Playground live preview is a competitive differentiator',
          text: '"With other companies you have to switch between applications, figure out something is wrong, then refix it... ThoughtSpot, with our dev playground, you could just start making your changes here and we will show you live how changes could look — you don\'t have to switch. That is a differentiator we present in all of our demos."',
        },
        {
          label: 'Fork-to-IDE option meets developers where they are',
          text: 'The "fork" widget takes a developer directly into an editor they already use, like CodeSandbox — "a bit more familiar for them."',
        },
        {
          label: 'Version history in Spotter Model/Viz lands well competitively',
          text: '"Even I think 3 days ago I was showing that functionality in Spotter Model where you can go back to a version if you\'d like, and the guy was like, oh, Snowflake does not give us this in their agent — this is actually cool."',
        },
      ],
      limitations: [
        {
          label: 'Playground is visually overwhelming for first-timers',
          text: '"As a first-time user... I see like literally four different elements, and even one of it is actually overlapping my main content, which is the playground preview." "With Spotter Code it has become more busier for sure."',
        },
        {
          label: 'No usage data to size the problem',
          text: '"I don\'t know if you can grab the usage stats of the screen somehow — that\'ll give you a sense of how many customers are actually using it," since unassisted traffic (not walked through by a sales engineer) may be getting overwhelmed with nobody noticing.',
        },
        {
          label: 'Even technical users need a refresher; legacy-stack developers struggle more',
          text: '"Even a tech-savvy person may need... a quick refresher of hey, where do I click, what does this button do." A minority "very new to web development" on legacy, non-JS stacks "can\'t use the [SDK] playground" at all.',
        },
        {
          label: 'No step-by-step onboarding wizard',
          text: '"There is definitely room for improvement — maybe where we take them through like a step-by-step onboarding wizard... hey, what do you want to embed? What sort of edits do you want to make?"',
        },
        {
          label: 'Documentation is overloaded and hard to search',
          text: '"Documentation is a mess. It\'s just too many things... the search doesn\'t work." "It\'s all good content but too many things going on — overloaded. We need to simplify it somehow."',
        },
        {
          label: 'No AI assistant on the docs site',
          text: 'Points to a competitor (Omni) embedding a chat assistant directly into its dev docs — "could be useful just because of how much content we have." ThoughtSpot\'s current doc-site widget "does not do stuff at all."',
        },
      ],
      frustrations: [
        {
          label: 'Skipping security settings can wipe in-progress work',
          text: 'A developer who embeds first and only later realizes the domain isn\'t whitelisted has to leave Playground for Security settings — "come back and realize whatever I had done is now gone." Confirmed independently: "we used to get a lot of CORS errors... a lot of security-specific errors... because they missed the documentation."',
        },
        {
          label: "Today's fix is a manual, person-dependent workaround",
          text: 'The current mitigation is an email that explicitly tells developers to whitelist the app before embedding — "this only helps if someone like me is involved. If not, they will run into this issue."',
        },
        {
          label: 'No way to revisit a past Playground session',
          text: 'Unlike ChatGPT, Gemini, or Google Slides history, there\'s no way to return to an earlier Playground configuration — "I have never thought of this particular perspective, but I do think there is [a gap]... I have not personally heard that feedback."',
        },
        {
          label: 'Forking to an external IDE gives up Spotter Code',
          text: '"The pitfall here is they can\'t use Spotter Code like they do in our Playground. That\'s the trade-off we get."',
        },
      ],
      opportunities: [
        {
          text: 'A guided, step-by-step onboarding wizard — "what do you want to embed?" and "what edits do you want to make?" — before dropping a new developer into the full Playground surface.',
        },
        {
          text: 'Protect in-progress Playground work across a security-settings detour, instead of losing selections and customizations when a developer leaves to whitelist a domain and comes back.',
        },
        {
          text: 'Bring the same "revert to a version" capability already shipped in Spotter Model/Viz to the embed Playground itself.',
        },
        {
          text: 'An AI assistant embedded directly in the docs, mirroring what Omni already does in its dev docs, given "how much content we have."',
        },
        {
          text: 'Instrument Playground usage so overwhelm — or the lack of it — among unassisted, self-serve developers can be measured instead of guessed at.',
        },
        {
          label: 'Recruit real, recently-embedded developers as ongoing research sources',
          text: 'Manikanta offered to connect a prospect who spent "around 4,000 minutes" in the free trial as a core developer — a direct pipeline for future primary research.',
        },
      ],
    },
  },
];

export const quadrantMeta = {
  strengths: { label: 'Strengths', color: 'green' as const },
  limitations: { label: 'Limitations', color: 'gray' as const },
  frustrations: { label: 'Frustrations', color: 'red' as const },
  opportunities: { label: 'Opportunities', color: 'yellow' as const },
};
