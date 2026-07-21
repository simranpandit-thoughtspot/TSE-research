import React, { useEffect, useState } from 'react';
import { Icon } from '../../../components/icons';
import { systemColors, referenceColors } from '../../../tokens/colors';
import { StatDonut } from './StatDonut';
import styles from './WhatIsEmbedding.module.css';

const c = systemColors.light;

const METHODS = [
  {
    id: 'iframe',
    label: 'iFrame',
    color: c['background-accent-gray'],
    body: 'A hosted view dropped into the host app via an <iframe>. Fast to ship, but styling and interaction control are shallow.',
  },
  {
    id: 'sdk',
    label: 'SDK',
    color: c['background-accent-blue'],
    body: 'A client library (JS/React/Vue) renders components natively inside the host app\'s DOM. Deeper theming, more integration work.',
  },
  {
    id: 'api',
    label: 'API',
    color: c['background-accent-purple-subtle'],
    body: 'Raw data/config comes back as JSON and the host app renders its own UI. Maximum control — host team owns all rendering.',
  },
];

const LEARN_MORE = [
  { label: 'Holistics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
  { label: 'ThoughtSpot developer docs', url: 'https://developers.thoughtspot.com/getstarted' },
  { label: 'ThoughtSpot embedded architecture', url: 'https://www.thoughtspot.com/data-trends/embedded-analytics/embedded-analytics-architecture' },
];

const IntroSlide: React.FC = () => (
  <div className={styles.slide}>
    <h2 className={styles.introTitle}>What is embedded analytics?</h2>
    <p className={styles.introSubtitle} style={{ color: c['content-secondary'] }}>
      Placing search, dashboards, or AI-driven analytics directly inside another product — so end users never leave it.
    </p>
    <div className={styles.statsRow}>
      <div className={styles.statCard}>
        <StatDonut percent={25} color={c['content-brand']} trackColor={referenceColors.brand['20']} />
        <p className={styles.statLabel}>of ThoughtSpot's total ARR now comes from Embedded (ThoughtSpot Everywhere) — growing ~100% YoY</p>
        <a className={styles.statSource} href="https://www.thoughtspot.com/press-releases/thoughtspot-makes-embedding-ai-powered-analytics-easy-and-ubiquitous-for-everyone" target="_blank" rel="noopener noreferrer" style={{ color: c['content-tertiary'] }}>
          Source: ThoughtSpot press release, Sep 2024
        </a>
      </div>
      <div className={styles.statCard}>
        <Icon name="arrow-up-circle" size="l" color={c['content-success']} />
        <p className={styles.bigNumber} style={{ color: c['content-success'] }}>$23.4B → $101B</p>
        <p className={styles.bigNumberCaption} style={{ color: c['content-tertiary'] }}>15.7% CAGR · 2025–2035</p>
        <p className={styles.statLabel}>Global embedded analytics market size</p>
        <a className={styles.statSource} href="https://www.precedenceresearch.com/embedded-analytics-market" target="_blank" rel="noopener noreferrer" style={{ color: c['content-tertiary'] }}>
          Source: Precedence Research
        </a>
      </div>
      <div className={styles.statCard}>
        <StatDonut percent={76} color={c['content-success']} trackColor={referenceColors.green['20']} />
        <p className={styles.statLabel}>of organizations already use embedded analytics internally</p>
        <a className={styles.statSource} href="https://www.revealbi.io/embedded-analytics-statistics" target="_blank" rel="noopener noreferrer" style={{ color: c['content-tertiary'] }}>
          Source: Reveal BI 2026 survey (vendor-run)
        </a>
      </div>
    </div>
  </div>
);

const MethodsSlide: React.FC = () => (
  <div className={styles.slide}>
    <h2 className={styles.sectionTitle}>The three embedding methods</h2>
    <div className={styles.methodsGrid}>
      {METHODS.map((m) => (
        <div key={m.id} className={styles.methodCard}>
          <div className={styles.methodBadge} style={{ backgroundColor: m.color, color: c['content-primary'] }}>
            {m.label[0]}
          </div>
          <p className={styles.methodName}>{m.label}</p>
          <p className={styles.methodBody} style={{ color: c['content-secondary'] }}>{m.body}</p>
        </div>
      ))}
    </div>
    <div className={styles.learnMoreRow}>
      {LEARN_MORE.map((l) => (
        <a key={l.url} className={styles.learnMoreLink} href={l.url} target="_blank" rel="noopener noreferrer" style={{ color: c['content-brand'], borderColor: c['border-divider'] }}>
          <Icon name="documentation" size="xs" color="currentColor" />
          {l.label}
        </a>
      ))}
    </div>
  </div>
);

const SLIDES = [IntroSlide, MethodsSlide];

export const WhatIsEmbedding: React.FC = () => {
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

  const Slide = SLIDES[slide];

  return (
    <div className={styles.deck}>
      <div className={styles.stage}>
        <button className={styles.chevronBtn} onClick={goPrev} disabled={slide === 0} aria-label="Previous slide">
          <Icon name="chevron-left" size="s" color={c['content-secondary']} />
        </button>
        <div className={styles.slideViewport}>
          <Slide />
        </div>
        <button className={styles.chevronBtn} onClick={goNext} disabled={slide === SLIDES.length - 1} aria-label="Next slide">
          <Icon name="chevron-right" size="s" color={c['content-secondary']} />
        </button>
      </div>
      <div className={styles.dots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === slide ? styles.dotActive : ''}`}
            onClick={() => setSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default WhatIsEmbedding;
