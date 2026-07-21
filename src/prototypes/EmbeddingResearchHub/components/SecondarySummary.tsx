import React from 'react';
import { Icon } from '../../../components/icons';
import { systemColors } from '../../../tokens/colors';
import styles from './SecondarySummary.module.css';

const c = systemColors.light;

const GOOD_FEATURES = [
  'Component-level SDKs (React/Vue/web components) that render natively instead of via iframe — Omni, Sigma, Hex, Embeddable, ThoughtSpot all lean here.',
  'Live, governed query architectures that skip ETL/extract layers entirely — Semaphor, Sigma, and Omni\'s hybrid cache all compete on this.',
  'Public, self-serve playgrounds that let a developer try embedding before buying — Power BI, Sisense, ThoughtSpot, and Omni all offer this.',
  'Deep white-label theming (fonts, palettes, full chrome control) — Hex, Semaphor, and Omni are the strongest on this axis.',
  'Signed-token / guest-token auth patterns that keep embed secrets server-side — the modern standard across Superset, Hex, Omni, and Semaphor.',
];

const PAIN_POINTS = [
  'iframe-based embeds are consistently called out as feeling "bolted on" and hard to fully brand — Tableau, Sigma, Holistics, Domo.',
  'Enterprise embedding pricing is opaque and sales-gated almost everywhere — only Power BI and Metabase publish a real number.',
  'Documentation for wiring embeds into a real app is thin relative to core product docs — a recurring complaint for Metabase, Superset, and ThoughtSpot alike.',
  'API coverage lags newest product features by one or more releases at several vendors, forcing custom workarounds for embedded customers.',
  'Multi-tenant row-level security is usually DIY (custom middleware, hand-rolled JWT claims) rather than a guided, packaged setup.',
];

export const SecondarySummary: React.FC = () => {
  return (
    <div>
      <div className={styles.grid}>
        <div className={styles.column} style={{ backgroundColor: c['background-success'] }}>
          <p className={styles.columnTitle} style={{ color: c['content-success'] }}>
            <Icon name="checkmark-circle" size="s" color="currentColor" /> What the market does well
          </p>
          {GOOD_FEATURES.map((f, i) => (
            <div key={i} className={styles.item} style={{ color: c['content-primary'] }}>
              <Icon name="checkmark" size="xs" color={c['content-success']} />
              <span>{f}</span>
            </div>
          ))}
        </div>
        <div className={styles.column} style={{ backgroundColor: c['background-failure'] }}>
          <p className={styles.columnTitle} style={{ color: c['content-failure'] }}>
            <Icon name="exclamation-point-circle" size="s" color="currentColor" /> Where the market struggles
          </p>
          {PAIN_POINTS.map((f, i) => (
            <div key={i} className={styles.item} style={{ color: c['content-primary'] }}>
              <Icon name="cross" size="xs" color={c['content-failure']} />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.takeaway}>
        <p className={styles.takeawayTitle} style={{ color: c['content-secondary'] }}>Positioning takeaway</p>
        <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0, color: c['content-primary'] }}>
          ThoughtSpot's Visual Embed SDK and public Playground already match the market's best-in-class
          pattern (SDK-first, self-serve, live query). The gaps that show up in this research — API lag,
          thin embedding-specific docs, and an immature CI/CD path from Dev → Test → Prod — mirror almost
          exactly what surfaced independently in the primary research interviews. See <strong>Primary research</strong> and{' '}
          <strong>Problem areas</strong> for the internal view on the same gaps.
        </p>
      </div>
    </div>
  );
};

export default SecondarySummary;
