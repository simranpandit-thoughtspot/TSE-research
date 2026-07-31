import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '../../../components/icons';
import type { IconName } from '../../../components/icons';
import { systemColors, referenceColors } from '../../../tokens/colors';
import { shadows } from '../../../tokens/shadows';
import {
  interviewSnapshots,
  problemStatements,
  businessImpact,
  trialFunnel,
  productPageClicks,
  embedTypeUsage,
  embedErrors,
  sdkInit,
  productFunnel,
  embeddingFlow,
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

/**
 * The deck is designed light and must stay light even when the app is in dark
 * mode: the module CSS reads these variables for card/surface backgrounds, so
 * pin them to light-theme tokens on the wrapper (descendants inherit them).
 */
const LIGHT_THEME_VARS = {
  '--rd-sys-color-background-base': c['background-base'],
  '--rd-sys-color-background-sunken': c['background-sunken'],
  '--rd-sys-color-border-divider': c['border-divider'],
  '--rd-sys-color-content-primary': c['content-primary'],
} as React.CSSProperties;

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

const TrialFunnelSlide: React.FC = () => {
  const { baseCount, steps, split, objectTypes } = trialFunnel;
  const embedded = steps[steps.length - 1];
  const pct = (n: number) => (n / baseCount) * 100;
  const embedPct = pct(embedded.count);
  const created = steps.find((s) => s.isContentCreation)!;
  /** 1-in-N is the line people repeat out loud, so compute it rather than hardcode. */
  const oneInN = Math.round(baseCount / embedded.count);

  /**
   * Fills are centred and sized to the TRUE share, so the silhouette is a real
   * funnel and the collapse is the visual. Labels and numbers sit outside the
   * track, which is what makes honest proportional widths readable — a 3.15%
   * sliver would never hold text.
   */
  const FILL_COLORS = [
    c['content-brand'],
    referenceColors.blue['50'],
    referenceColors.purple['50'],
    referenceColors.purple['50'],
    referenceColors.purple['40'],
    referenceColors.purple['40'],
    c['content-failure'],
  ];

  return (
    <div className={`${styles.slide} ${styles.slideWide}`}>
      <div className={styles.funnelLayout}>
        {/* Heading + the loud gap live on the left so the funnel gets the
            full height of the slide on the right. */}
        <div className={styles.funnelIntro}>
          <h2 className={styles.sectionTitleLeft} style={{ color: c['content-primary'] }}>
            Almost nobody makes it to a live embed
          </h2>
          <p className={styles.splitBody} style={{ color: c['content-secondary'] }}>
            Free-trial cohort · every % is a share of all {baseCount.toLocaleString()} signups.
          </p>

          <div className={styles.gapAside} style={{ backgroundColor: c['background-failure'] }}>
            <span className={styles.gapPct} style={{ color: c['content-failure'] }}>{(100 - embedPct).toFixed(1)}%</span>
            <span className={styles.gapPctLabel} style={{ color: c['content-failure'] }}>never embed</span>
            <p className={styles.gapAsideText} style={{ color: c['content-primary'] }}>
              <strong>{baseCount.toLocaleString()}</strong> signed up · <strong>{embedded.count}</strong> shipped a live embed
            </p>
            <p className={styles.gapAsideBig} style={{ color: c['content-failure'] }}>1 in {oneInN}</p>
            <p className={styles.gapAsideNote} style={{ color: c['content-secondary'] }}>
              Only <strong>{pct(created.count).toFixed(1)}%</strong> ever create content.
            </p>
          </div>
        </div>

        <div className={styles.funnelStack}>
          {/* Signups — the mouth of the funnel */}
          <div className={styles.fRow}>
            <span className={styles.fLabel} style={{ color: c['content-primary'] }}>{trialFunnel.baseLabel}</span>
            <div className={styles.fTrack} style={{ backgroundColor: referenceColors.gray['10'] }}>
              <div className={styles.fFill} style={{ width: '100%', backgroundColor: FILL_COLORS[0] }} />
            </div>
            <span className={styles.fNums}>
              <span className={styles.fCount} style={{ color: c['content-primary'] }}>{baseCount.toLocaleString()}</span>
              <span className={styles.fPct} style={{ color: c['content-tertiary'] }}>100%</span>
            </span>
          </div>

          {/* TSA / TSE is a split of the cohort, not a stage — kept as one quiet line */}
          <div className={styles.fRow}>
            <span className={styles.fCaptionLeft} style={{ color: c['content-tertiary'] }}>splits into</span>
            <div className={styles.fSplitLine}>
              {split.map((sp) => (
                <span key={sp.label} className={styles.fSplitItem} style={{ color: c['content-secondary'] }}>
                  <span className={styles.fSplitDot} style={{ backgroundColor: c['border-default'] }} />
                  {sp.label} <strong style={{ color: c['content-primary'] }}>{sp.count}</strong> · {pct(sp.count).toFixed(1)}%
                </span>
              ))}
            </div>
            <span className={styles.fNums} />
          </div>

          {steps.map((s, i) => {
            const p = pct(s.count);
            const prev = i === 0 ? baseCount : steps[i - 1].count;
            const dropped = prev - s.count;
            const goal = !!s.isGoal;
            return (
              <div key={s.label} className={styles.fRow}>
                <span className={styles.fLabel} style={{ color: goal ? c['content-failure'] : c['content-primary'] }}>
                  {s.label}
                  {s.note && <span className={styles.fNote} style={{ color: c['content-tertiary'] }}> · {s.note}</span>}
                  {s.isContentCreation && (
                    <span className={styles.fSubCaption} style={{ color: c['content-tertiary'] }}>
                      {objectTypes.join(' · ')}
                    </span>
                  )}
                </span>
                <div className={styles.fTrack} style={{ backgroundColor: referenceColors.gray['10'] }}>
                  <div
                    className={styles.fFill}
                    style={{ width: `${Math.max(p, 0.9)}%`, backgroundColor: FILL_COLORS[i + 1] }}
                  />
                  {/* The empty remainder of the track *is* the loss, so label it there. */}
                  <span className={styles.fLost} style={{ color: c['content-tertiary'] }}>
                    −{dropped.toLocaleString()}
                  </span>
                </div>
                <span className={styles.fNums}>
                  <span
                    className={`${styles.fCount} ${goal ? styles.fCountGoal : ''}`}
                    style={{ color: goal ? c['content-failure'] : c['content-primary'] }}
                  >
                    {s.count}
                  </span>
                  <span className={styles.fPct} style={{ color: goal ? c['content-failure'] : c['content-tertiary'] }}>
                    {p.toFixed(p < 10 ? 2 : 1)}%
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Auth reality: one method carries almost everything. */}
      <div className={styles.authStrip} style={{ borderColor: c['border-divider'] }}>
        <span className={styles.authStripTitle} style={{ color: c['content-tertiary'] }}>
          SDK init by auth type · {sdkInit.overall} total
        </span>
        <div className={styles.authBar}>
          {sdkInit.byAuthType.slice(0, 5).map((a, i) => (
            <span
              key={a.type}
              className={styles.authSeg}
              style={{
                width: `${(a.raw / sdkInit.overallRaw) * 100}%`,
                backgroundColor: AUTH_COLORS[i],
              }}
              title={`${a.type} — ${a.label}`}
            />
          ))}
        </div>
        <div className={styles.authLegend}>
          {sdkInit.byAuthType.slice(0, 4).map((a, i) => (
            <span key={a.type} className={styles.authLegendItem} style={{ color: c['content-secondary'] }}>
              <span className={styles.clickLegendDot} style={{ backgroundColor: AUTH_COLORS[i] }} />
              {a.type} <strong style={{ color: c['content-primary'] }}>{a.label}</strong>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const GROUP_COLOR: Record<string, string> = {
  api: c['content-brand'],
  setup: referenceColors.purple['50'],
  build: referenceColors.teal['50'],
  customise: referenceColors.orange['50'],
  learn: referenceColors.gray['50'],
};

const GROUP_LABEL: Record<string, string> = {
  api: 'API',
  setup: 'Setup',
  build: 'Build',
  customise: 'Customise',
  learn: 'Learn',
};

const ProductClicksSlide: React.FC = () => {
  const { pages } = productPageClicks;
  const top = pages[0].count;
  const groups = ['api', 'setup', 'build', 'customise', 'learn'];

  return (
    <div className={`${styles.slide} ${styles.slideWide}`}>
      <SectionHeading
        title="In production, the REST Playground is the develop tab"
        subtitle={`${productPageClicks.window}. ${productPageClicks.caveat}`}
      />
      <div className={styles.clickLegend}>
        {groups.map((g) => (
          <span key={g} className={styles.clickLegendItem} style={{ color: c['content-secondary'] }}>
            <span className={styles.clickLegendDot} style={{ backgroundColor: GROUP_COLOR[g] }} />
            {GROUP_LABEL[g]}
          </span>
        ))}
      </div>
      <div className={styles.clickList}>
        {pages.map((p) => {
          const share = (p.count / top) * 100;
          return (
            <div key={p.page} className={styles.clickRow}>
              <span className={styles.clickLabel} style={{ color: c['content-primary'] }}>{p.page}</span>
              <div className={styles.clickTrack} style={{ backgroundColor: referenceColors.gray['10'] }}>
                <div
                  className={styles.clickFill}
                  style={{ width: `${Math.max(share, 0.6)}%`, backgroundColor: GROUP_COLOR[p.group] }}
                />
              </div>
              <span className={styles.clickCount} style={{ color: c['content-primary'] }}>
                {p.count.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AUTH_COLORS = [
  referenceColors.purple['50'],
  referenceColors.orange['50'],
  referenceColors.teal['50'],
  referenceColors.yellow['50'],
  referenceColors.gray['40'],
];

const EmbedSurfacesSlide: React.FC = () => {
  const { types, total } = embedTypeUsage;
  const R = 54;
  const CIRC = 2 * Math.PI * R;
  const DONUT_COLORS = [
    referenceColors.gray['40'],
    referenceColors.orange['50'],
    referenceColors.teal['50'],
    referenceColors.yellow['50'],
    referenceColors.purple['50'],
  ];
  let offset = 0;
  const maxErr = embedErrors.top[0].avg;

  return (
    <div className={`${styles.slide} ${styles.slideWide}`}>
      <SectionHeading
        title="What they embed — and what keeps breaking"
        subtitle={`${embedTypeUsage.window}. ${embedTypeUsage.caveat}`}
      />
      <div className={styles.surfaceRow}>
        <div className={styles.surfacePanel} style={{ borderColor: c['border-divider'] }}>
          <p className={styles.surfacePanelTitle} style={{ color: c['content-primary'] }}>Embed surfaces in use</p>
          <div className={styles.donutWrap}>
            <svg viewBox="0 0 140 140" className={styles.donut} aria-hidden="true">
              {types.map((t, i) => {
                const frac = t.count / total;
                const dash = frac * CIRC;
                const seg = (
                  <circle
                    key={t.type}
                    cx="70"
                    cy="70"
                    r={R}
                    fill="none"
                    stroke={DONUT_COLORS[i]}
                    strokeWidth="20"
                    strokeDasharray={`${dash} ${CIRC - dash}`}
                    strokeDashoffset={-offset}
                    transform="rotate(-90 70 70)"
                  />
                );
                offset += dash;
                return seg;
              })}
            </svg>
            <div className={styles.donutCentre}>
              <span className={styles.donutTotal} style={{ color: c['content-primary'] }}>{total.toLocaleString()}</span>
              <span className={styles.donutTotalLabel} style={{ color: c['content-tertiary'] }}>adoptions</span>
            </div>
          </div>
          <div className={styles.surfaceLegend}>
            {types.map((t, i) => (
              <span key={t.type} className={styles.surfaceLegendRow} style={{ color: c['content-secondary'] }}>
                <span className={styles.clickLegendDot} style={{ backgroundColor: DONUT_COLORS[i] }} />
                {t.type}
                <strong style={{ color: c['content-primary'] }}>{t.count}</strong>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.surfacePanel} style={{ borderColor: c['border-divider'] }}>
          <p className={styles.surfacePanelTitle} style={{ color: c['content-primary'] }}>
            Clusters hitting <code className={styles.surfaceCode}>{embedErrors.metric}</code>
          </p>
          <p className={styles.surfacePanelNote} style={{ color: c['content-failure'] }}>
            <strong>{embedErrors.clustersAffected}</strong> clusters affected · daily average
          </p>
          <div className={styles.errList}>
            {embedErrors.top.map((e) => (
              <div key={e.cluster} className={styles.errRow}>
                <span className={styles.errName} style={{ color: c['content-primary'] }}>{e.cluster}</span>
                <div className={styles.errTrack} style={{ backgroundColor: referenceColors.gray['10'] }}>
                  <div
                    className={styles.errFill}
                    style={{ width: `${(e.avg / maxErr) * 100}%`, backgroundColor: c['content-failure'] }}
                  />
                </div>
                <span className={styles.errVal} style={{ color: c['content-failure'] }}>
                  {e.avg.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductNumbersSlide: React.FC = () => {
  const { baseCount, steps, split, beyond } = productFunnel;
  const pct = (n: number) => (n / baseCount) * 100;

  return (
    <div className={`${styles.slide} ${styles.slideWide}`}>
      <SectionHeading
        title="The product numbers"
        subtitle={`${productFunnel.window}. Stages below are unique users; the two cards at the end are measured differently and sit outside the funnel.`}
      />

      <div className={styles.funnelStack} style={{ maxWidth: 980, marginTop: 10 }}>
        <div className={styles.fRow}>
          <span className={styles.fLabel} style={{ color: c['content-primary'] }}>{productFunnel.baseLabel}</span>
          <div className={styles.fTrack} style={{ backgroundColor: referenceColors.gray['10'] }}>
            <div className={styles.fFill} style={{ width: '100%', backgroundColor: c['content-brand'] }} />
          </div>
          <span className={styles.fNums}>
            <span className={styles.fCount} style={{ color: c['content-primary'] }}>{baseCount}</span>
            <span className={styles.fPct} style={{ color: c['content-tertiary'] }}>100%</span>
          </span>
        </div>

        <div className={styles.fRow}>
          <span className={styles.fCaptionLeft} style={{ color: c['content-tertiary'] }}>enters via</span>
          <div className={styles.fSplitLine}>
            {split.map((sp) => (
              <span key={sp.label} className={styles.fSplitItem} style={{ color: c['content-secondary'] }}>
                <span className={styles.fSplitDot} style={{ backgroundColor: c['border-default'] }} />
                {sp.label} <strong style={{ color: c['content-primary'] }}>{sp.count}</strong> · {pct(sp.count).toFixed(1)}%
              </span>
            ))}
          </div>
          <span className={styles.fNums} />
        </div>

        {steps.map((s, i) => {
          const p = pct(s.count);
          const prev = i === 0 ? baseCount : steps[i - 1].count;
          const dropped = prev - s.count;
          return (
            <div key={s.label} className={styles.fRow}>
              <span className={styles.fLabel} style={{ color: c['content-primary'] }}>{s.label}</span>
              <div className={styles.fTrack} style={{ backgroundColor: referenceColors.gray['10'] }}>
                <div
                  className={styles.fFill}
                  style={{ width: `${Math.max(p, 1.2)}%`, backgroundColor: referenceColors.purple['50'] }}
                />
                <span className={styles.fLost} style={{ color: c['content-tertiary'] }}>−{dropped}</span>
              </div>
              <span className={styles.fNums}>
                <span className={styles.fCount} style={{ color: c['content-primary'] }}>{s.count}</span>
                <span className={styles.fPct} style={{ color: c['content-tertiary'] }}>{p.toFixed(1)}%</span>
              </span>
            </div>
          );
        })}
      </div>

      {/* Different unit and a different order of magnitude, so these break out
          of the taper rather than pretending to continue it. */}
      <div className={styles.beyondRow}>
        {beyond.map((b) => (
          <div
            key={b.label}
            className={`${styles.beyondCard} ${b.isScale ? styles.beyondCardScale : ''}`}
            style={
              b.isScale
                ? { backgroundColor: c['background-success'], borderColor: c['content-success'] }
                : { borderColor: c['border-divider'], backgroundColor: c['background-base'] }
            }
          >
            <span
              className={styles.beyondValue}
              style={{ color: b.isScale ? c['content-success'] : c['content-primary'] }}
            >
              {b.value}
            </span>
            <span className={styles.beyondLabel} style={{ color: c['content-primary'] }}>{b.label}</span>
            <span className={styles.beyondUnit} style={{ color: c['content-tertiary'] }}>
              {b.unit} · {b.note}
            </span>
            {b.isScale && (
              <span className={styles.beyondPunch} style={{ color: c['content-success'] }}>
                38 reached Theme Builder — real embedding never passes through the develop tab
              </span>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

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

const EmbeddingFlowSlide: React.FC = () => (
  <div className={`${styles.slide} ${styles.slideWide}`}>
    <SectionHeading
      title="How embedding actually works — and where it leaks"
      subtitle="The path every developer walks, with the loophole each stage introduces. Every leak traces to a problem statement on the next slide."
    />
    <div className={styles.flowRow}>
      {embeddingFlow.map((s, i) => (
        <React.Fragment key={s.step}>
          {i > 0 && (
            <span className={styles.flowArrow} aria-hidden="true">
              <Icon name="chevron-right" size="s" color={c['content-tertiary']} />
            </span>
          )}
          <div className={styles.flowCol}>
            <div className={styles.flowStep} style={{ borderColor: c['border-default'], boxShadow: shadows.xs }}>
              <span className={styles.flowIndex} style={{ color: c['content-brand'] }}>{i + 1}</span>
              <p className={styles.flowStepTitle} style={{ color: c['content-primary'] }}>{s.step}</p>
              <p className={styles.flowStepDetail} style={{ color: c['content-tertiary'] }}>{s.detail}</p>
            </div>
            <span className={styles.flowTether} style={{ backgroundColor: c['content-failure'] }} />
            <div
              className={styles.flowLeak}
              style={{ borderColor: c['content-failure'], backgroundColor: c['background-failure'] }}
            >
              <span className={styles.flowLeakLabel} style={{ color: c['content-failure'] }}>
                <Icon name="exclamation-point-circle" size="xs" color={c['content-failure']} />
                Loophole
              </span>
              <p className={styles.flowLeakText} style={{ color: c['content-primary'] }}>{s.loophole}</p>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  </div>
);

const PainPointsSlide: React.FC = () => {
  const order: RiskLevel[] = ['high', 'medium', 'low'];
  return (
    <div className={`${styles.slide} ${styles.slideWide}`}>
      <SectionHeading
        title="The pain points"
        subtitle={`${problemStatements.length} themes every source kept hitting — deduped across all ${interviewSnapshots.length} interviews.`}
      />
      <div className={styles.painGrid}>
        {problemStatements.map((p, i) => {
          const risk = RISK_META[p.risk];
          return (
            <div
              key={p.id}
              className={styles.painCard}
              style={{ boxShadow: shadows.sm, borderColor: c['border-divider'] }}
            >
              {/* Risk lives in the left edge so the cards stay scannable by colour. */}
              <span className={styles.painEdge} style={{ backgroundColor: risk.color }} />
              <span className={styles.painNum} style={{ color: c['content-tertiary'] }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className={styles.painBody}>
                <p className={styles.painTitle} style={{ color: c['content-primary'] }}>{p.title}</p>
                {painPointDetail[p.id] && (
                  <p className={styles.painDetail} style={{ color: c['content-secondary'] }}>{painPointDetail[p.id]}</p>
                )}
              </div>
              <span className={styles.painRisk} style={{ color: risk.color }}>{p.risk}</span>
            </div>
          );
        })}

        {/* Fills the odd-numbered gap with the risk split rather than dead space. */}
        <div className={styles.painLegend} style={{ borderColor: c['border-divider'] }}>
          <span className={styles.painLegendTitle} style={{ color: c['content-tertiary'] }}>By risk</span>
          <div className={styles.painLegendRows}>
            {order.map((level) => {
              const meta = RISK_META[level];
              const n = problemStatements.filter((x) => x.risk === level).length;
              return (
                <span key={level} className={styles.painLegendRow} style={{ color: c['content-secondary'] }}>
                  <span className={styles.painLegendDot} style={{ backgroundColor: meta.color }} />
                  <strong style={{ color: c['content-primary'] }}>{n}</strong> {meta.label.toLowerCase()}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

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
  { title: 'Trial to embed', Component: TrialFunnelSlide },
  { title: 'Product clicks', Component: ProductClicksSlide },
  { title: 'Embed surfaces', Component: EmbedSurfacesSlide },
  { title: 'Product numbers', Component: ProductNumbersSlide },
  { title: 'Primary research', Component: PrimaryResearchSlide },
  { title: 'Customer journey', Component: JourneySlide },
  { title: 'Embedding flow', Component: EmbeddingFlowSlide },
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
    <div ref={wrapperRef} className={styles.wrapper} style={{ ...LIGHT_THEME_VARS, backgroundColor: frame['background-base'] }}>
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
