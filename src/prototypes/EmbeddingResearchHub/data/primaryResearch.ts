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
    title: 'Interview 1',
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
    title: 'Interview 2',
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
    title: 'Interview 3',
    subtitle: 'Ron Dugger — overlay solutions engineer, Tableau-to-ThoughtSpot parity and white-labeling',
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
];

export const quadrantMeta = {
  strengths: { label: 'Strengths', color: 'green' as const },
  limitations: { label: 'Limitations', color: 'gray' as const },
  frustrations: { label: 'Frustrations', color: 'red' as const },
  opportunities: { label: 'Opportunities', color: 'yellow' as const },
};
