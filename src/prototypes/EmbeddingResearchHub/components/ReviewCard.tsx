import React from 'react';
import { systemColors } from '../../../tokens/colors';
import type { ReviewQuote, ReviewPlatform } from '../data/competitors';
import styles from './ReviewCard.module.css';

import redditLogo from '../assets/sources/reddit.svg';
import g2Logo from '../assets/sources/g2.svg';
import ycombinatorLogo from '../assets/sources/ycombinator.svg';

const c = systemColors.light;

/**
 * Per-platform card chrome. Reddit / G2 / Hacker News use the real brand
 * mark (Simple Icons, MIT) with the platform's own accent; Capterra and
 * TrustRadius aren't in that library, so they get a branded monogram in
 * their documented brand colors. Post dates / vote counts are intentionally
 * absent — we only show what we actually captured (quote + source link).
 */
const PLATFORM_CHROME: Record<ReviewPlatform, {
  name: string;
  logo?: string;
  monogram?: string;
  badgeBg: string;
  badgeFg?: string;
  accent: string;
}> = {
  reddit: { name: 'Reddit', logo: redditLogo, badgeBg: '#FFF0EA', accent: '#FF4500' },
  g2: { name: 'G2', logo: g2Logo, badgeBg: '#FFEDEA', accent: '#FF492C' },
  hackernews: { name: 'Hacker News', logo: ycombinatorLogo, badgeBg: '#FDEEE7', accent: '#F0652F' },
  capterra: { name: 'Capterra', monogram: 'C', badgeBg: '#FFF3E3', badgeFg: '#FF9D28', accent: '#FF9D28' },
  trustradius: { name: 'TrustRadius', monogram: 'TR', badgeBg: '#E7F0FE', badgeFg: '#116BF2', accent: '#116BF2' },
  forum: { name: 'Community forum', monogram: 'F', badgeBg: '#EAEDF2', badgeFg: '#5E6C84', accent: '#5E6C84' },
  vendor: { name: 'Vendor material', monogram: 'V', badgeBg: '#EAEDF2', badgeFg: '#5E6C84', accent: '#5E6C84' },
};

interface ReviewCardProps {
  review: ReviewQuote;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const chrome = PLATFORM_CHROME[review.platform];
  const heading = review.platform === 'reddit' && review.subreddit ? review.subreddit : chrome.name;

  return (
    <div className={styles.card} style={{ borderTop: `3px solid ${chrome.accent}` }}>
      <div className={styles.header}>
        <span className={styles.badge} style={{ backgroundColor: chrome.badgeBg }}>
          {chrome.logo ? (
            <img className={styles.badgeImg} src={chrome.logo} alt={`${chrome.name} logo`} />
          ) : (
            <span className={styles.badgeText} style={{ color: chrome.badgeFg }}>{chrome.monogram}</span>
          )}
        </span>
        <div className={styles.meta}>
          <span className={styles.sourceName} style={{ color: c['content-primary'] }}>{heading}</span>
          <span className={styles.context} style={{ color: c['content-tertiary'] }}>
            {review.source}
            {review.url && (
              <>
                {' · '}
                <a className={styles.viewSource} href={review.url} target="_blank" rel="noopener noreferrer" style={{ color: chrome.accent }}>
                  View source
                </a>
              </>
            )}
          </span>
        </div>
      </div>
      <p className={styles.body} style={{ color: c['content-primary'] }}>&ldquo;{review.quote}&rdquo;</p>
    </div>
  );
};

export default ReviewCard;
