import React, { useState } from 'react';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/icons';
import { systemColors } from '../../../tokens/colors';
import { competitors, Competitor } from '../data/competitors';
import { CompanyLogo } from './CompanyLogo';
import { ReviewCard } from './ReviewCard';
import styles from './ReviewsPanel.module.css';

const c = systemColors.light;

const CONFIDENCE_BADGE: Record<Competitor['confidence'], { bg: string; fg: string; label: string }> = {
  verified: { bg: c['background-success'], fg: c['content-success'], label: 'Well-sourced' },
  partial: { bg: c['background-warning'], fg: c['content-warning'], label: 'Partially sourced' },
  thin: { bg: c['background-failure'], fg: c['content-failure'], label: 'Thin public data' },
};

const COLLAPSED_COUNT = 3;

export const ReviewsPanel: React.FC = () => {
  const [selectedId, setSelectedId] = useState(competitors[0].id);
  const [expanded, setExpanded] = useState(false);

  const vendor = competitors.find((comp) => comp.id === selectedId) ?? competitors[0];
  const confidence = CONFIDENCE_BADGE[vendor.confidence];
  const reviews = expanded ? vendor.reviews : vendor.reviews.slice(0, COLLAPSED_COUNT);
  const hiddenCount = vendor.reviews.length - COLLAPSED_COUNT;

  return (
    <div className={styles.layout}>
      <div className={styles.left}>
        <div className={styles.companyList}>
          {competitors.map((comp) => {
            const active = comp.id === selectedId;
            return (
              <button
                key={comp.id}
                className={`${styles.companyItem} ${active ? styles.companyItemActive : ''}`}
                onClick={() => {
                  setSelectedId(comp.id);
                  setExpanded(false);
                }}
                aria-pressed={active}
              >
                <CompanyLogo competitor={comp} size={24} />
                <span className={styles.companyItemName}>{comp.name}</span>
                <span className={styles.companyItemCount} style={{ color: active ? c['content-brand'] : c['content-tertiary'] }}>
                  {comp.reviews.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.vendorHeader}>
          <CompanyLogo competitor={vendor} size={38} />
          <div className={styles.vendorHeaderMeta}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{vendor.name}</div>
            <div style={{ fontSize: 11.5, color: c['content-tertiary'] }}>
              {vendor.reviews.length} sourced {vendor.reviews.length === 1 ? 'quote' : 'quotes'}
            </div>
          </div>
          <span className={styles.confidenceBadge} style={{ backgroundColor: confidence.bg, color: confidence.fg }}>
            {confidence.label}
          </span>
        </div>
        <p className={styles.sentiment} style={{ backgroundColor: c['background-subtle'], color: c['content-secondary'] }}>
          {vendor.sentiment}
        </p>

        {reviews.length === 0 ? (
          <div className={styles.emptyState} style={{ color: c['content-tertiary'] }}>
            No sourced reviews captured for {vendor.name} yet.
          </div>
        ) : (
          <>
            <div className={styles.collage}>
              {reviews.map((review, i) => (
                <ReviewCard key={i} review={review} />
              ))}
            </div>
            {!expanded && hiddenCount > 0 && (
              <div className={styles.seeMoreWrap}>
                <Button variant="secondary" icon={<Icon name="chevron-down" size="s" />} onClick={() => setExpanded(true)}>
                  See {hiddenCount} more
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewsPanel;
