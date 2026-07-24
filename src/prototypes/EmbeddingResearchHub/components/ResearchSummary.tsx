import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '../../../components/icons';
import type { IconName } from '../../../components/icons';
import { systemColors, referenceColors } from '../../../tokens/colors';
import { shadows } from '../../../tokens/shadows';
import {
  interviewSnapshots,
  problemStatements,
  businessImpact,
  pageAdoption,
  problemValidation,
  painPointDetail,
  secondaryOverview,
  opportunities,
  RiskLevel,
} from '../data/researchSummary';
import { discordSummary } from '../data/discordCommunity';
import { interviews, quadrantMeta } from '../data/primaryResearch';
import { CustomerJourney } from './CustomerJourney';
import styles from './ResearchSummary.module.css';

/** Slides are light (dark navy text on a white surface); the frame around them is dark. */
const c = systemColors.light;
const frame = systemColors.dark;

const DECK_TITLE = 'TSE Develop tab research';
const DECK_AUTHORS = 'Simran & Tarun';
const DECK_DATE = 'July 2026';

/* Soft top gradient wash — peach → pink/purple → blue, fading downward. */
const GRADIENT_WASH = [
  `radial-gradient(58% 48% at 22% -4%, ${referenceColors.orange['30']}, transparent 70%)`,
  `radial-gradient(52% 46% at 46% -6%, ${referenceColors.purple['30']}, transparent 72%)`,
  `radial-gradient(64% 52% at 78% 2%, ${referenceColors.blue['30']}, transparent 74%)`,
].join(', ');

const RISK_META: Record<RiskLevel, { label: string; color: string }> = {
  high: { label: 'High risk', color: c['content-failure'] },
  medium: { label: 'Medium risk', color: c['content-warning'] },
  low: { label: 'Low risk', color: c['content-success'] },
};

/* ---------------------------------------------------------------- */

const BrandMark: React.FC = () => (
  <div className={styles.brandMark}>
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none" aria-label="ThoughtSpot" xmlns="http://www.w3.org/2000/svg">
      <path d="M47.4216 0H0V8.78311H47.4216V0Z" fill={c['content-primary']} />
      <path d="M47.4216 11.7108H29.4035V20.4939H47.4216V11.7108Z" fill={c['content-primary']} />
      <path d="M11.512 11.7108H0V20.4939H11.512C15.8132 20.4939 19.3192 23.9999 19.3192 28.3011V47.4216H28.1024V28.3011C28.1024 19.1566 20.6566 11.7108 11.512 11.7108Z" fill={c['content-primary']} />
      <path d="M38.4216 33.253C34.3554 33.253 31.0481 36.5603 31.0481 40.6265C31.0481 44.6928 34.3554 48 38.4216 48C42.4879 48 45.7951 44.6928 45.7951 40.6265C45.7951 36.5603 42.4879 33.253 38.4216 33.253Z" fill={c['content-primary']} />
    </svg>
    <span className={styles.brandWord} style={{ color: c['content-primary'] }}>ThoughtSpot</span>
  </div>
);

const SectionHeading: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <>
    <h2 className={styles.sectionTitle} style={{ color: c['content-primary'] }}>{title}</h2>
    {subtitle && <p className={styles.sectionSubtitle} style={{ color: c['content-secondary'] }}>{subtitle}</p>}
  </>
);

/* ----------------------------- Slides ----------------------------- */

const CoverSlide: React.FC = () => (
  <div className={styles.cover}>
    <span className={styles.coverAuthors} style={{ color: c['content-secondary'] }}>{DECK_AUTHORS}</span>

    <svg className={styles.coverLine} style={{ top: '4%', left: '30%', width: 260, height: 90 }} viewBox="0 0 260 90" fill="none">
      <path d="M2 2 H150 V70 H250" stroke={c['content-brand']} strokeWidth="2" />
      <rect x="245" y="65" width="10" height="10" fill={c['content-brand']} />
    </svg>
    <svg className={styles.coverLine} style={{ bottom: '2%', left: 0, width: 120, height: 130 }} viewBox="0 0 120 130" fill="none">
      <path d="M110 2 H30 V120" stroke={c['content-brand']} strokeWidth="2" />
      <rect x="25" y="118" width="10" height="10" fill={c['content-brand']} />
    </svg>

    <div className={styles.coverTitleWrap}>
      <span className={styles.coverHighlight} style={{ backgroundColor: referenceColors.blue['30'] }} />
      <h1 className={styles.coverTitle} style={{ color: c['content-primary'] }}>{DECK_TITLE}</h1>
    </div>
    <p className={styles.coverSubtitle} style={{ color: c['content-secondary'] }}>
      The developer experience behind embedded analytics
    </p>
  </div>
);

const WhatIsDevelopTabSlide: React.FC = () => (
  <div className={styles.slide}>
    <div className={styles.splitRow}>
      <div className={styles.splitLeft}>
        <span className={styles.kicker} style={{ color: c['content-brand'] }}>What is the develop tab?</span>
        <p className={styles.bigStatement} style={{ color: c['content-primary'] }}>
          Where customers embed ThoughtSpot into their own product — and embedding is our single biggest revenue engine.
        </p>
      </div>
      <div className={styles.splitRight} style={{ alignItems: 'center' }}>
        <p className={styles.heroStat} style={{ color: c['content-brand'] }}>70%+</p>
        <p className={styles.heroStatCaption} style={{ color: c['content-primary'] }}>of new revenue comes from Embedded</p>
        <svg className={styles.riseGraph} viewBox="0 0 320 120" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="riseFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={referenceColors.blue['40']} stopOpacity="0.55" />
              <stop offset="100%" stopColor={referenceColors.blue['40']} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,112 C55,104 88,74 138,62 C188,50 214,30 262,20 L320,6 L320,120 L0,120 Z" fill="url(#riseFill)" />
          <path d="M0,112 C55,104 88,74 138,62 C188,50 214,30 262,20 L320,6" fill="none" stroke={c['content-brand']} strokeWidth="3" strokeLinecap="round" />
        </svg>
        <p className={styles.statSource} style={{ color: c['content-tertiary'] }}>Source: {businessImpact.newRevenueSource}</p>
      </div>
    </div>
  </div>
);

const PageAdoptionSlide: React.FC = () => (
  <div className={styles.slide}>
    <SectionHeading
      title="But page adoption drops off fast"
      subtitle={`Of everyone who loads the develop tab, only a fraction reach each page. ${pageAdoption.window}.`}
    />
    <div className={styles.adoptionList}>
      <div className={styles.adoptionRow}>
        <span className={styles.adoptionLabel} style={{ color: c['content-primary'] }}>{pageAdoption.baseLabel}</span>
        <div className={styles.adoptionTrack} style={{ backgroundColor: referenceColors.gray['20'] }}>
          <div className={styles.adoptionFill} style={{ width: '100%', backgroundColor: c['content-brand'] }} />
        </div>
        <span className={styles.adoptionValue} style={{ color: c['content-primary'] }}>100% · {pageAdoption.baseCount}</span>
      </div>
      {pageAdoption.steps.map((s) => (
        <div key={s.page} className={styles.adoptionRow}>
          <span className={styles.adoptionLabel} style={{ color: c['content-secondary'] }}>{s.page}</span>
          <div className={styles.adoptionTrack} style={{ backgroundColor: referenceColors.gray['20'] }}>
            <div className={styles.adoptionFill} style={{ width: `${s.rate}%`, backgroundColor: referenceColors.purple['50'] }} />
          </div>
          <span className={styles.adoptionValue} style={{ color: c['content-primary'] }}>{s.rate}% · {s.count}</span>
        </div>
      ))}
    </div>
  </div>
);

const NAME_GRADIENT = `linear-gradient(150deg, ${c['content-brand']}, color-mix(in srgb, ${c['content-brand']} 45%, black))`;

const QUAD_ORDER = ['strengths', 'limitations', 'frustrations', 'opportunities'] as const;

const QUAD_STYLE: Record<(typeof QUAD_ORDER)[number], { bg: string; fg: string }> = {
  strengths: { bg: referenceColors.green['10'], fg: c['content-success'] },
  limitations: { bg: referenceColors.gray['10'], fg: c['content-secondary'] },
  frustrations: { bg: referenceColors.red['10'], fg: c['content-failure'] },
  opportunities: { bg: referenceColors.yellow['10'], fg: c['content-warning'] },
};

const PrimaryResearchSlide: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = interviews.find((iv) => iv.id === openId);

  return (
    <div className={styles.slide}>
      <div className={styles.splitRow} style={{ maxWidth: 1200, alignItems: 'center' }}>
        <div className={styles.splitLeft} style={{ flex: '0 0 300px' }}>
          <h2 className={styles.sectionTitleLeft} style={{ color: c['content-primary'] }}>Primary research</h2>
          <p className={styles.splitBody} style={{ color: c['content-secondary'] }}>
            {interviewSnapshots.length} open, unstructured SME interviews to surface unfiltered pain points across the embedding journey.
          </p>
          <p className={styles.clickHint} style={{ color: c['content-tertiary'] }}>
            <Icon name="info-circle" size="xs" color={c['content-tertiary']} />
            Click a card to preview its strengths, limitations, frustrations &amp; opportunities.
          </p>
        </div>
        <div className={styles.nameGrid}>
          {interviewSnapshots.map((iv) => (
            <button key={iv.id} className={styles.nameCard} style={{ boxShadow: shadows.sm, borderColor: c['border-divider'] }} onClick={() => setOpenId(iv.id)}>
              <div className={styles.nameCardHead} style={{ backgroundImage: NAME_GRADIENT }}>
                <span className={styles.nameCardName} style={{ color: frame['content-primary'] }}>{iv.title}</span>
              </div>
              <p className={styles.nameCardRole} style={{ color: c['content-secondary'] }}>{iv.subtitle}</p>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className={styles.quadOverlay} onClick={() => setOpenId(null)}>
          <div className={styles.quadPanel} style={{ boxShadow: shadows['2xl'] }} onClick={(e) => e.stopPropagation()}>
            <div className={styles.quadPanelHead} style={{ borderColor: c['border-divider'] }}>
              <div>
                <p className={styles.quadPanelName} style={{ color: c['content-primary'] }}>{active.title}</p>
                <p className={styles.quadPanelRole} style={{ color: c['content-secondary'] }}>{active.subtitle}</p>
              </div>
              <button className={styles.quadClose} onClick={() => setOpenId(null)} aria-label="Close preview">
                <Icon name="cross" size="s" color={c['content-secondary']} />
              </button>
            </div>
            <div className={styles.quadGrid}>
              {QUAD_ORDER.map((key) => {
                const notes = active.quadrants[key];
                const qs = QUAD_STYLE[key];
                return (
                  <div key={key} className={styles.quadCell} style={{ backgroundColor: qs.bg }}>
                    <p className={styles.quadCellTitle} style={{ color: qs.fg }}>
                      {quadrantMeta[key].label} · {notes.length}
                    </p>
                    <div className={styles.quadNoteList}>
                      {notes.map((n, i) => (
                        <p key={i} className={styles.quadNote} style={{ color: c['content-primary'] }}>
                          {n.label ? <strong>{n.label} — </strong> : null}
                          {n.text}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const JourneySlide: React.FC = () => (
  <div className={`${styles.slide} ${styles.slideWide}`}>
    <SectionHeading
      title="We mapped the full customer journey"
      subtitle="Ten stages from first search to a live embed — activities, pain points, opportunities, and product touch points for each."
    />
    <div className={styles.journeyBox} style={{ borderColor: c['border-divider'] }}>
      <CustomerJourney />
    </div>
  </div>
);

const PainPointsSlide: React.FC = () => (
  <div className={styles.slide}>
    <SectionHeading
      title="The pain points"
      subtitle={`${problemStatements.length} themes every source kept hitting — deduped across all ${interviewSnapshots.length} interviews.`}
    />
    <div className={styles.painGrid}>
      {problemStatements.map((p, i) => {
        const risk = RISK_META[p.risk];
        const hi = i === 0;
        return (
          <div
            key={p.id}
            className={`${styles.painCard} ${hi ? styles.painCardHi : ''}`}
            style={hi ? { backgroundColor: c['background-brand'] } : { boxShadow: shadows.sm, borderColor: c['border-divider'] }}
          >
            <div className={styles.painNumCell}>
              <span className={styles.painNum} style={{ color: hi ? frame['content-primary'] : c['content-primary'] }}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.painUnderline} style={{ backgroundColor: hi ? frame['content-primary'] : risk.color }} />
            </div>
            <div>
              <p className={styles.painTitle} style={{ color: hi ? frame['content-primary'] : c['content-primary'] }}>{p.title}</p>
              {painPointDetail[p.id] && (
                <p className={styles.painDetail} style={{ color: hi ? frame['content-secondary'] : c['content-secondary'] }}>{painPointDetail[p.id]}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const VALIDATE_SOURCES: { icon: IconName; big: string; title: string; caption: string }[] = [
  { icon: 'community', big: String(secondaryOverview.communityThemes), title: 'Developer community', caption: 'recurring Discord themes in #develop' },
  { icon: 'chart', big: String(secondaryOverview.vendors), title: 'Competitors', caption: 'embedded-analytics vendors benchmarked' },
  { icon: 'star', big: '5', title: 'Public reviews', caption: secondaryOverview.reviewPlatforms },
];

const ValidateSlide: React.FC = () => (
  <div className={styles.slide}>
    <div className={styles.splitRow}>
      <div className={styles.diagramBox} style={{ borderColor: c['border-divider'] }}>
        <div className={styles.diagramNode} style={{ borderColor: c['border-divider'], boxShadow: shadows.sm }}>
          <Icon name="exclamation-point-circle" size="s" color={c['content-brand']} />
          <span style={{ color: c['content-primary'] }}>{problemStatements.length} pain points</span>
        </div>
        <span className={styles.diagramStem} style={{ backgroundColor: c['border-default'] }} />
        <div className={styles.diagramBranches}>
          {VALIDATE_SOURCES.map((s) => (
            <div key={s.title} className={styles.diagramLeaf} style={{ borderColor: c['border-divider'], boxShadow: shadows.xs }}>
              <Icon name={s.icon} size="xs" color={c['content-brand']} />
              <span style={{ color: c['content-primary'] }}>{s.title}</span>
            </div>
          ))}
        </div>
        <span className={styles.diagramStem} style={{ backgroundColor: c['border-default'] }} />
        <div className={styles.diagramNode} style={{ backgroundColor: c['background-brand'], borderColor: 'transparent' }}>
          <Icon name="checkmark-circle" size="s" color={frame['content-primary']} />
          <span style={{ color: frame['content-primary'] }}>Validated</span>
        </div>
      </div>
      <div className={styles.splitRight}>
        <h2 className={styles.sectionTitleLeft} style={{ color: c['content-primary'] }}>Validating the pain points</h2>
        <p className={styles.splitBody} style={{ color: c['content-secondary'] }}>
          Every pain point pressure-tested against three independent sources — &ldquo;{discordSummary.coreInsight}&rdquo;
        </p>
        {VALIDATE_SOURCES.map((s) => (
          <div key={s.title} className={styles.sourceCard} style={{ borderColor: c['border-divider'], boxShadow: shadows.xs }}>
            <span className={styles.sourceBig} style={{ color: c['content-brand'] }}>{s.big}</span>
            <div>
              <p className={styles.sourceTitle} style={{ color: c['content-primary'] }}>{s.title}</p>
              <p className={styles.sourceCaption} style={{ color: c['content-secondary'] }}>{s.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const RiskSummarySlide: React.FC = () => {
  const order: RiskLevel[] = ['high', 'medium', 'low'];
  return (
    <div className={styles.slide}>
      <div className={styles.splitRow} style={{ alignItems: 'flex-start' }}>
        <div className={styles.splitLeft} style={{ paddingTop: 4 }}>
          <h2 className={styles.sectionTitleLeft} style={{ color: c['content-primary'] }}>Prioritized by risk</h2>
          <p className={styles.splitBody} style={{ color: c['content-secondary'] }}>
            Ranked by how many sources hit each problem, how loudly the community raised it, and whether rivals already solve it.
          </p>
          <div className={styles.riskCounts}>
            {order.map((level) => {
              const meta = RISK_META[level];
              const n = problemStatements.filter((p) => p.risk === level).length;
              return (
                <div key={level} className={styles.riskCountRow}>
                  <span className={styles.riskDot} style={{ backgroundColor: meta.color }} />
                  <span style={{ color: c['content-primary'] }}><strong>{n}</strong> {meta.label.toLowerCase()}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.splitRight} style={{ gap: 8 }}>
          {problemStatements.map((p, i) => {
            const risk = RISK_META[p.risk];
            const v = problemValidation[p.id];
            const hi = i === 0;
            return (
              <div
                key={p.id}
                className={`${styles.rankRow} ${hi ? styles.rankRowHi : ''}`}
                style={hi ? { backgroundColor: c['background-brand'] } : { borderColor: c['border-divider'], boxShadow: shadows.xs }}
              >
                <span className={styles.rankNum} style={{ color: hi ? frame['content-primary'] : c['content-tertiary'] }}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.rankAccent} style={{ backgroundColor: hi ? frame['content-primary'] : risk.color }} />
                <p className={styles.rankTitle} style={{ color: hi ? frame['content-primary'] : c['content-primary'] }}>{p.title}</p>
                {v?.communityScore != null && (
                  <span
                    className={styles.commPill}
                    style={hi
                      ? { backgroundColor: `color-mix(in srgb, ${frame['content-primary']} 22%, transparent)`, color: frame['content-primary'] }
                      : { backgroundColor: referenceColors.blue['10'], color: c['content-brand'] }}
                  >
                    <Icon name="community" size="xs" color={hi ? frame['content-primary'] : c['content-brand']} />
                    {v.communityScore}/5
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const OpportunitiesSlide: React.FC = () => (
  <div className={styles.slide}>
    <SectionHeading title="Opportunities" subtitle="Five directions the research points to — from fixing today's drop-off to an agent-first future." />
    <div className={styles.oppGrid}>
      {opportunities.map((o) => (
        <div key={o.title} className={styles.oppCard} style={{ boxShadow: shadows.xs }}>
          <div className={styles.cardIcon} style={{ backgroundColor: referenceColors.blue['10'], boxShadow: shadows.xs }}>
            <Icon name={o.icon as IconName} size="m" color={c['content-brand']} />
          </div>
          <p className={styles.oppTitle} style={{ color: c['content-primary'] }}>{o.title}</p>
          <p className={styles.oppText} style={{ color: c['content-secondary'] }}>{o.text}</p>
        </div>
      ))}
    </div>
  </div>
);

const ThankYouSlide: React.FC = () => (
  <div className={styles.slide}>
    <h2 className={styles.closingTitle} style={{ color: c['content-primary'] }}>Thank you</h2>
    <p className={styles.sectionSubtitle} style={{ color: c['content-secondary'] }}>
      {DECK_AUTHORS} · {DECK_DATE}
    </p>
  </div>
);

/* ----------------------------- Deck shell ----------------------------- */

const SLIDES: { title: string; Component: React.FC }[] = [
  { title: 'Cover', Component: CoverSlide },
  { title: 'What is the develop tab', Component: WhatIsDevelopTabSlide },
  { title: 'Page adoption', Component: PageAdoptionSlide },
  { title: 'Primary research', Component: PrimaryResearchSlide },
  { title: 'Customer journey', Component: JourneySlide },
  { title: 'Pain points', Component: PainPointsSlide },
  { title: 'Validation', Component: ValidateSlide },
  { title: 'Risk summary', Component: RiskSummarySlide },
  { title: 'Opportunities', Component: OpportunitiesSlide },
  { title: 'Thank you', Component: ThankYouSlide },
];

export const ResearchSummary: React.FC = () => {
  const [slide, setSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const goPrev = () => setSlide((s) => Math.max(s - 1, 0));
  const goNext = () => setSlide((s) => Math.min(s + 1, SLIDES.length - 1));

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      wrapperRef.current?.requestFullscreen();
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('fullscreenchange', onFsChange);
    };
  }, []);

  const { Component } = SLIDES[slide];

  return (
    <div ref={wrapperRef} className={styles.wrapper} style={{ backgroundColor: frame['background-base'] }}>
      <button
        className={styles.fsBtn}
        onClick={toggleFullscreen}
        style={{ borderColor: frame['border-divider'], backgroundColor: frame['background-raised'], color: frame['content-secondary'] }}
        aria-label={isFullscreen ? 'Exit full screen' : 'Enter full screen'}
      >
        <Icon name={isFullscreen ? 'fullscreen-undo' : 'fullscreen'} size="xs" color={frame['content-secondary']} />
        {isFullscreen ? 'Exit' : 'Full screen'}
      </button>
      <div className={styles.stage}>
        <button className={styles.chevronBtn} style={{ borderColor: frame['border-divider'], backgroundColor: frame['background-raised'] }} onClick={goPrev} disabled={slide === 0} aria-label="Previous slide">
          <Icon name="chevron-left" size="s" color={frame['content-secondary']} />
        </button>

        <div className={`${styles.deckSurface} ${slide === 0 ? styles.deckSurfaceGrid : ''}`} style={{ boxShadow: shadows['2xl'] }}>
          <div className={styles.gradientWash} style={{ backgroundImage: GRADIENT_WASH }} />
          <div key={slide} className={styles.slideContent}>
            <Component />
          </div>
          <div className={styles.deckFooter}>
            <BrandMark />
            <span className={styles.deckDate} style={{ color: c['content-secondary'] }}>{DECK_DATE}</span>
          </div>
        </div>

        <button className={styles.chevronBtn} style={{ borderColor: frame['border-divider'], backgroundColor: frame['background-raised'] }} onClick={goNext} disabled={slide === SLIDES.length - 1} aria-label="Next slide">
          <Icon name="chevron-right" size="s" color={frame['content-secondary']} />
        </button>
      </div>

      <div className={styles.footer}>
        <span className={styles.slideCounter} style={{ color: frame['content-tertiary'] }}>
          {String(slide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')} — {SLIDES[slide].title}
        </span>
        <div className={styles.dots}>
          {SLIDES.map((s, i) => (
            <button
              key={s.title}
              className={styles.dot}
              style={{ backgroundColor: i === slide ? frame['background-brand'] : frame['border-divider'] }}
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
