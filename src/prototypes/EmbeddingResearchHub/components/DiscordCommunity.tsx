import React, { useRef } from 'react';
import { Icon } from '../../../components/icons';
import type { IconName } from '../../../components/icons';
import { systemColors, referenceColors } from '../../../tokens/colors';
import { shadows } from '../../../tokens/shadows';
import { quadrantMeta } from '../data/primaryResearch';
import { discordQuadrants, discordSummary } from '../data/discordCommunity';
import styles from './DiscordCommunity.module.css';

const c = systemColors.light;

type QuadrantKey = keyof typeof quadrantMeta;

const QUADRANT_STYLE: Record<QuadrantKey, { bg: string; fg: string; icon: IconName; stickyBg: string }> = {
  strengths: { bg: referenceColors.green['10'], fg: c['content-success'], icon: 'checkmark-circle', stickyBg: referenceColors.green['40'] },
  limitations: { bg: referenceColors.gray['10'], fg: c['content-secondary'], icon: 'info-circle', stickyBg: referenceColors.gray['40'] },
  frustrations: { bg: referenceColors.red['10'], fg: c['content-failure'], icon: 'exclamation-point-circle', stickyBg: referenceColors.red['40'] },
  opportunities: { bg: referenceColors.yellow['10'], fg: c['content-warning'], icon: 'bulb', stickyBg: referenceColors.yellow['40'] },
};

const QUADRANT_ORDER: QuadrantKey[] = ['strengths', 'limitations', 'frustrations', 'opportunities'];

const ProblemCarousel: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(`.${styles.problemCard}`);
    const step = (card?.offsetWidth ?? 280) + 12;
    track.scrollBy({ left: step * dir, behavior: 'smooth' });
  };

  return (
    <div className={styles.carousel}>
      <button className={styles.carouselArrow} onClick={() => scrollByCard(-1)} aria-label="Previous problem statement">
        <Icon name="chevron-left" size="s" color={c['content-secondary']} />
      </button>
      <div className={styles.carouselTrack} ref={trackRef}>
        {discordSummary.problemStatements.map((p, i) => (
          <div key={i} className={styles.problemCard} style={{ boxShadow: shadows.sm }}>
            <span className={styles.problemNumber} style={{ color: c['content-brand'] }}>{String(i + 1).padStart(2, '0')}</span>
            <p className={styles.problemText}>{p}</p>
          </div>
        ))}
      </div>
      <button className={styles.carouselArrow} onClick={() => scrollByCard(1)} aria-label="Next problem statement">
        <Icon name="chevron-right" size="s" color={c['content-secondary']} />
      </button>
    </div>
  );
};

export const DiscordCommunity: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.summaryCard}>
        <p className={styles.coreInsight}>&ldquo;{discordSummary.coreInsight}&rdquo;</p>
        <ProblemCarousel />
      </div>

      <div className={styles.boardHint} style={{ color: c['content-tertiary'] }}>
        Transcribed from the ThoughtSpot developer Discord's #develop channel — segmented into the same quadrants as the SME interview boards.
      </div>

      <div className={styles.quadrantGrid}>
        {QUADRANT_ORDER.map((key) => {
          const meta = quadrantMeta[key];
          const style = QUADRANT_STYLE[key];
          const cards = discordQuadrants[key];
          return (
            <div key={key} className={styles.quadrant} style={{ backgroundColor: style.bg }}>
              <div className={styles.quadrantHeader}>
                <Icon name={style.icon} size="s" color={style.fg} />
                <p className={styles.quadrantTitle} style={{ color: style.fg }}>{meta.label}</p>
                <span className={styles.quadrantCount} style={{ color: style.fg }}>{cards.length} notes</span>
              </div>
              <div className={styles.stickyGrid}>
                {cards.map((card, i) => (
                  <div
                    key={i}
                    className={styles.sticky}
                    style={{ backgroundColor: style.stickyBg, color: c['content-primary'], boxShadow: shadows.sm }}
                  >
                    {card.label && <span className={styles.stickyLabel}>{card.label}</span>}
                    {card.text}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiscordCommunity;
