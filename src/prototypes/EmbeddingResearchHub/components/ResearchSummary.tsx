import React, { useEffect, useState } from 'react';
import { Icon } from '../../../components/icons';
import type { IconName } from '../../../components/icons';
import { systemColors, referenceColors } from '../../../tokens/colors';
import {
  personas,
  journeyInsight,
  interviewSnapshots,
  discordCounts,
  problemStatements,
  businessImpact,
  RiskLevel,
} from '../data/researchSummary';
import { journeyStages } from '../data/customerJourney';
import styles from './ResearchSummary.module.css';

const c = systemColors.dark;

const RISK_META: Record<RiskLevel, { label: string; color: string; bg: string }> = {
  high: { label: 'High risk', color: c['content-failure'], bg: referenceColors.red['20'] },
  medium: { label: 'Medium risk', color: c['content-warning'], bg: referenceColors.yellow['20'] },
  low: { label: 'Low risk', color: c['content-success'], bg: referenceColors.green['20'] },
};

const PERSONA_ICON: Record<string, IconName> = {
  'first-timer': 'magnifying-glass',
  switcher: 'profile',
};

/* ---------------------------------------------------------------- */

const CoverSlide: React.FC = () => (
  <div className={styles.slide}>
    <span className={styles.eyebrow} style={{ color: c['content-brand'] }}>TSE research summary</span>
    <h1 className={styles.coverTitle} style={{ color: c['content-primary'] }}>The developer experience behind ThoughtSpot's highest-growth revenue line</h1>
    <p className={styles.coverSubtitle} style={{ color: c['content-secondary'] }}>
      Embedded already drives 70%+ of new revenue and 25% of total ARR — growing ~100% YoY. This is the
      full research trail behind why that experience matters, and where it breaks down today.
    </p>
    <div className={styles.coverMeta} style={{ borderColor: c['border-divider'], color: c['content-secondary'] }}>
      <span>Customer journey</span>
      <span className={styles.metaDot}>·</span>
      <span>4 SME interviews</span>
      <span className={styles.metaDot}>·</span>
      <span>Discord community research</span>
      <span className={styles.metaDot}>·</span>
      <span>15-vendor secondary research</span>
    </div>
  </div>
);

const PersonasSlide: React.FC = () => (
  <div className={styles.slide}>
    <h2 className={styles.sectionTitle} style={{ color: c['content-primary'] }}>Two developers, two very different starting points</h2>
    <p className={styles.sectionSubtitle} style={{ color: c['content-secondary'] }}>
      Every stage of the journey — and every problem statement later in this deck — lands differently
      depending on which of these two a developer is.
    </p>
    <div className={styles.personaGrid}>
      {personas.map((p) => (
        <div key={p.id} className={styles.personaCard} style={{ borderColor: c['border-divider'] }}>
          <div className={styles.personaIcon} style={{ backgroundColor: c['background-accent-blue'] }}>
            <Icon name={PERSONA_ICON[p.id]} size="m" color={c['content-brand']} />
          </div>
          <p className={styles.personaTitle} style={{ color: c['content-primary'] }}>{p.title}</p>
          <p className={styles.personaTagline} style={{ color: c['content-brand'] }}>{p.tagline}</p>
          <p className={styles.personaDesc} style={{ color: c['content-secondary'] }}>{p.description}</p>
          <p className={styles.blockLabel} style={{ color: c['content-tertiary'] }}>What they need</p>
          <ul className={styles.needsList}>
            {p.needs.map((n) => (
              <li key={n} className={styles.needsItem} style={{ color: c['content-primary'] }}>{n}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const JourneySlide: React.FC = () => (
  <div className={styles.slide}>
    <h2 className={styles.sectionTitle} style={{ color: c['content-primary'] }}>The journey today, stage by stage</h2>
    <p className={styles.sectionSubtitle} style={{ color: c['content-secondary'] }}>
      Ten stages from first search to a live embed in a customer's product — activities, pain points,
      and opportunities mapped for each. Full detail lives in Primary research → Customer journey.
    </p>
    <div className={styles.journeyRail}>
      {journeyStages.map((stage, i) => (
        <React.Fragment key={stage.id}>
          {i > 0 && <div className={styles.journeyConnector} style={{ backgroundColor: c['border-divider'] }} />}
          <div className={styles.journeyNode} style={{ borderColor: c['border-divider'] }}>
            <span className={styles.journeyNumber} style={{ color: c['content-brand'] }}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.journeyLabel} style={{ color: c['content-primary'] }}>{stage.title}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  </div>
);

const JourneyInsightSlide: React.FC = () => (
  <div className={styles.slide}>
    <h2 className={styles.sectionTitle} style={{ color: c['content-primary'] }}>The insight: linear, but tangled</h2>
    <p className={styles.sectionSubtitle} style={{ color: c['content-secondary'] }}>
      Ten stages that could overlap instead run start to finish, one at a time. And the touch points
      supporting them don't map cleanly either — the same touch point recurs across very different
      needs, while a single need can span multiple touch points.
    </p>
    <div className={styles.insightGrid}>
      <div className={styles.insightCard} style={{ borderColor: c['border-divider'] }}>
        <p className={styles.bigNumber} style={{ color: c['content-brand'] }}>{journeyInsight.totalStages}</p>
        <p className={styles.blockLabel} style={{ color: c['content-tertiary'] }}>Sequential stages</p>
        <p className={styles.insightNote} style={{ color: c['content-secondary'] }}>
          Discover through Maintain &amp; scale — run one after another even where nothing requires it.
        </p>
      </div>
      <div className={styles.insightCard} style={{ borderColor: c['border-divider'] }}>
        <p className={styles.blockLabel} style={{ color: c['content-tertiary'] }}>Touch points that recur across unrelated stages</p>
        <div className={styles.touchpointList}>
          {journeyInsight.repeatedTouchpoints.map((t) => (
            <div key={t.touchpoint} className={styles.touchpointRow}>
              <span className={styles.touchpointName} style={{ color: c['content-primary'] }}>{t.touchpoint}</span>
              <span className={styles.touchpointCount} style={{ backgroundColor: c['background-accent-blue'], color: c['content-brand'] }}>
                {t.count} stages
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const PrimaryResearchIntroSlide: React.FC = () => (
  <div className={styles.slide}>
    <h2 className={styles.sectionTitle} style={{ color: c['content-primary'] }}>Primary research: hearing it from the field</h2>
    <p className={styles.sectionSubtitle} style={{ color: c['content-secondary'] }}>
      Four unstructured interviews with field SMEs — Tarun and I ran these as open conversations, not
      surveys, specifically to surface unfiltered pain points. Two more are already in progress.
    </p>
    <div className={styles.interviewGrid}>
      {interviewSnapshots.map((iv) => (
        <div key={iv.id} className={styles.interviewCard} style={{ borderColor: c['border-divider'] }}>
          <p className={styles.interviewName} style={{ color: c['content-primary'] }}>{iv.title}</p>
          <p className={styles.interviewSubtitle} style={{ color: c['content-secondary'] }}>{iv.subtitle}</p>
          <div className={styles.interviewCounts}>
            <span style={{ color: c['content-success'] }}>{iv.counts.strengths} strengths</span>
            <span style={{ color: c['content-tertiary'] }}>{iv.counts.limitations} limitations</span>
            <span style={{ color: c['content-failure'] }}>{iv.counts.frustrations} frustrations</span>
            <span style={{ color: c['content-warning'] }}>{iv.counts.opportunities} opportunities</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DiscordSlide: React.FC = () => (
  <div className={styles.slide}>
    <h2 className={styles.sectionTitle} style={{ color: c['content-primary'] }}>...and hearing it from real customers</h2>
    <p className={styles.sectionSubtitle} style={{ color: c['content-secondary'] }}>
      The Discord developer community isn't an internal SME perspective — it's unfiltered implementation
      friction from people actually building on ThoughtSpot today.
    </p>
    <p className={styles.pullQuote} style={{ color: c['content-primary'] }}>
      &ldquo;Developers are not struggling to embed ThoughtSpot — they are struggling to make ThoughtSpot
      behave like their own product.&rdquo;
    </p>
    <div className={styles.discordCountsRow}>
      <span style={{ color: c['content-success'] }}>{discordCounts.strengths} strengths</span>
      <span style={{ color: c['content-tertiary'] }}>{discordCounts.limitations} limitations</span>
      <span style={{ color: c['content-failure'] }}>{discordCounts.frustrations} frustrations</span>
      <span style={{ color: c['content-warning'] }}>{discordCounts.opportunities} opportunities</span>
    </div>
  </div>
);

const ProblemStatementsSlide: React.FC = () => (
  <div className={styles.slide}>
    <h2 className={styles.sectionTitle} style={{ color: c['content-primary'] }}>Where every source agrees</h2>
    <p className={styles.sectionSubtitle} style={{ color: c['content-secondary'] }}>
      Combining the customer journey, all four SME interviews, and the Discord research — these {problemStatements.length} problem
      statements are the common thread, not a one-off complaint.
    </p>
    <div className={styles.problemList}>
      {problemStatements.map((p, i) => (
        <div key={p.id} className={styles.problemRow} style={{ borderColor: c['border-divider'] }}>
          <span className={styles.problemIndex} style={{ color: c['content-tertiary'] }}>{String(i + 1).padStart(2, '0')}</span>
          <div className={styles.problemBody}>
            <p className={styles.problemTitle} style={{ color: c['content-primary'] }}>{p.title}</p>
            <p className={styles.problemDesc} style={{ color: c['content-secondary'] }}>{p.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SecondaryResearchSlide: React.FC = () => (
  <div className={styles.slide}>
    <h2 className={styles.sectionTitle} style={{ color: c['content-primary'] }}>How big is this, and who else has it</h2>
    <p className={styles.sectionSubtitle} style={{ color: c['content-secondary'] }}>
      Secondary research benchmarked 15 embedded-analytics vendors — demos, playgrounds, features, and
      independent review sentiment (G2, Capterra, TrustRadius, Reddit) — to see which pain points are
      ThoughtSpot-specific and which are industry-wide.
    </p>
    <div className={styles.statsRow}>
      <div className={styles.statCard} style={{ borderColor: c['border-divider'] }}>
        <p className={styles.bigNumber} style={{ color: c['content-brand'] }}>15</p>
        <p className={styles.insightNote} style={{ color: c['content-secondary'] }}>Vendors benchmarked, including Looker, Tableau, Sigma, Power BI, and Omni</p>
      </div>
      <div className={styles.statCard} style={{ borderColor: c['border-divider'] }}>
        <p className={styles.bigNumber} style={{ color: c['content-brand'], fontSize: 24 }}>{businessImpact.marketSizeHeadline}</p>
        <p className={styles.insightNote} style={{ color: c['content-secondary'] }}>{businessImpact.marketSizeCaption}</p>
      </div>
    </div>
    <div className={styles.marketNotes}>
      <p className={styles.marketNote} style={{ color: c['content-primary'] }}>
        <strong>Industry-wide:</strong> iframe embeds feeling "bolted on" (Tableau, Sigma, Holistics, Domo), API coverage lagging new features, and thin embedding-specific docs all show up across the market — not unique to ThoughtSpot.
      </p>
      <p className={styles.marketNote} style={{ color: c['content-primary'] }}>
        <strong>Where ThoughtSpot already leads:</strong> deep white-label theming is the strongest differentiator among the field — shared only with Hex, Semaphor, and Omni.
      </p>
    </div>
  </div>
);

const RiskSlide: React.FC = () => (
  <div className={styles.slide}>
    <h2 className={styles.sectionTitle} style={{ color: c['content-primary'] }}>Prioritizing by risk</h2>
    <p className={styles.sectionSubtitle} style={{ color: c['content-secondary'] }}>
      Risk here means how many independent sources hit the same problem, weighted by how often the
      Discord community raised it — not a guess.
    </p>
    <div className={styles.riskList}>
      {problemStatements.map((p) => {
        const risk = RISK_META[p.risk];
        return (
          <div key={p.id} className={styles.riskRow} style={{ borderColor: c['border-divider'] }}>
            <span className={styles.riskBadge} style={{ backgroundColor: risk.bg, color: risk.color }}>{risk.label}</span>
            <div className={styles.riskBody}>
              <p className={styles.riskTitle} style={{ color: c['content-primary'] }}>{p.title}</p>
              <p className={styles.riskEvidence} style={{ color: c['content-tertiary'] }}>{p.evidence}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const BusinessImpactSlide: React.FC = () => (
  <div className={styles.slide}>
    <h2 className={styles.sectionTitle} style={{ color: c['content-primary'] }}>Why this matters to the business</h2>
    <div className={styles.statsRow}>
      <div className={styles.statCard} style={{ borderColor: c['border-divider'] }}>
        <Icon name="chart" size="l" color={c['content-brand']} />
        <p className={styles.insightNote} style={{ color: c['content-primary'], fontWeight: 700, marginTop: 8 }}>{businessImpact.newRevenueShare}</p>
        <p className={styles.statSource} style={{ color: c['content-tertiary'] }}>Source: {businessImpact.newRevenueSource}</p>
      </div>
      <div className={styles.statCard} style={{ borderColor: c['border-divider'] }}>
        <Icon name="arrow-up-circle" size="l" color={c['content-success']} />
        <p className={styles.insightNote} style={{ color: c['content-primary'], fontWeight: 700, marginTop: 8 }}>{businessImpact.arrShare}</p>
        <p className={styles.statSource} style={{ color: c['content-tertiary'] }}>Source: {businessImpact.arrSource}</p>
      </div>
    </div>
    <div className={styles.takeaway} style={{ backgroundColor: c['background-accent-blue'] }}>
      <Icon name="bulb" size="s" color={c['content-brand']} />
      <p className={styles.takeawayText} style={{ color: c['content-primary'] }}>{businessImpact.framing}</p>
    </div>
  </div>
);

const ClosingSlide: React.FC = () => (
  <div className={styles.slide}>
    <h2 className={styles.coverTitle} style={{ fontSize: 28, color: c['content-primary'] }}>This is the current state — not the ceiling</h2>
    <p className={styles.sectionSubtitle} style={{ color: c['content-secondary'], maxWidth: 620 }}>
      Every problem statement in this deck is grounded in the journey, four field interviews, and real
      developer conversations. The next step is turning the highest-risk items into a prioritized
      roadmap.
    </p>
  </div>
);

const SLIDES: { title: string; Component: React.FC }[] = [
  { title: 'Cover', Component: CoverSlide },
  { title: 'Personas', Component: PersonasSlide },
  { title: 'Journey', Component: JourneySlide },
  { title: 'Journey insight', Component: JourneyInsightSlide },
  { title: 'Primary research', Component: PrimaryResearchIntroSlide },
  { title: 'Discord voice', Component: DiscordSlide },
  { title: 'Problem statements', Component: ProblemStatementsSlide },
  { title: 'Secondary research', Component: SecondaryResearchSlide },
  { title: 'Risk', Component: RiskSlide },
  { title: 'Business impact', Component: BusinessImpactSlide },
  { title: 'Closing', Component: ClosingSlide },
];

export const ResearchSummary: React.FC = () => {
  const [slide, setSlide] = useState(0);

  const goPrev = () => setSlide((s) => Math.max(s - 1, 0));
  const goNext = () => setSlide((s) => Math.min(s + 1, SLIDES.length - 1));

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const { Component } = SLIDES[slide];

  return (
    <div className={styles.wrapper} style={{ backgroundColor: c['background-base'] }}>
      <div className={styles.stage}>
        <button className={styles.chevronBtn} style={{ borderColor: c['border-divider'], backgroundColor: c['background-raised'] }} onClick={goPrev} disabled={slide === 0} aria-label="Previous slide">
          <Icon name="chevron-left" size="s" color={c['content-secondary']} />
        </button>
        <div className={styles.slideViewport}>
          <Component />
        </div>
        <button className={styles.chevronBtn} style={{ borderColor: c['border-divider'], backgroundColor: c['background-raised'] }} onClick={goNext} disabled={slide === SLIDES.length - 1} aria-label="Next slide">
          <Icon name="chevron-right" size="s" color={c['content-secondary']} />
        </button>
      </div>
      <div className={styles.footer}>
        <span className={styles.slideCounter} style={{ color: c['content-tertiary'] }}>
          {String(slide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')} — {SLIDES[slide].title}
        </span>
        <div className={styles.dots}>
          {SLIDES.map((s, i) => (
            <button
              key={s.title}
              className={styles.dot}
              style={{ backgroundColor: i === slide ? c['background-brand'] : c['border-divider'] }}
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}: ${s.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResearchSummary;
