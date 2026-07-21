import React from 'react';
import { Icon } from '../../../components/icons';
import { Link } from '../../../components/Link';
import { systemColors } from '../../../tokens/colors';
import styles from './WhatIsEmbedding.module.css';

const c = systemColors.light;

const METHODS = [
  {
    id: 'iframe',
    label: 'iFrame',
    color: c['background-accent-gray'],
    body: 'The simplest method — a hosted view is dropped into the host app via an <iframe>. Fast to ship, but styling and interaction control are shallow, and it can feel visibly "bolted on."',
  },
  {
    id: 'sdk',
    label: 'SDK',
    color: c['background-accent-blue'],
    body: 'A client library (JS/React/Vue) renders components natively inside the host app\'s DOM. Deeper theming and event control, at the cost of more integration work.',
  },
  {
    id: 'api',
    label: 'API',
    color: c['background-accent-purple-subtle'],
    body: 'Raw data/config comes back as JSON and the host app renders its own UI on top. Maximum control and native feel — but the host team owns all the rendering.',
  },
];

const LEARN_MORE = [
  { label: 'Holistics — embedded analytics comparison', url: 'https://www.holistics.io/bi-tools/embedded-analytics/' },
  { label: 'ThoughtSpot developer docs', url: 'https://developers.thoughtspot.com/getstarted' },
  { label: 'ThoughtSpot embedded analytics architecture', url: 'https://www.thoughtspot.com/data-trends/embedded-analytics/embedded-analytics-architecture' },
];

export const WhatIsEmbedding: React.FC = () => {
  return (
    <div>
      <div className={styles.hero}>
        <div className={styles.calloutBox} style={{ backgroundColor: c['background-information'] }}>
          <div className={styles.calloutTitle} style={{ color: c['content-information'] }}>Why it matters</div>
          <div className={styles.calloutItem}>
            <Icon name="checkmark-circle" size="s" color={c['content-information']} />
            <span>Embedded analytics is one of the stickiest product categories — once a customer's users depend on it, ripping it out is disruptive.</span>
          </div>
          <div className={styles.calloutItem}>
            <Icon name="checkmark-circle" size="s" color={c['content-information']} />
            <span>Buyers evaluate embedding on a completely different axis than core BI: API coverage, white-labeling depth, auth model, and time-to-first-embed.</span>
          </div>
          <div className={styles.calloutItem}>
            <Icon name="checkmark-circle" size="s" color={c['content-information']} />
            <span>Every vendor in this research picks a different point on the iframe → SDK → API spectrum below — that choice shapes everything else about their offering.</span>
          </div>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>The three embedding methods</h3>
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

      <h3 className={styles.sectionTitle}>Learn more</h3>
      <div className={styles.linksGrid}>
        {LEARN_MORE.map((l) => (
          <Link key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" external className={styles.linkCard} noUnderline>
            <Icon name="documentation" size="s" color={c['content-brand']} />
            <span style={{ fontSize: 13, fontWeight: 500, color: c['content-primary'] }}>{l.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WhatIsEmbedding;
