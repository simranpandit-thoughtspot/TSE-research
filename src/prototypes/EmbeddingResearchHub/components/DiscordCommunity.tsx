import React from 'react';
import { Icon } from '../../../components/icons';
import type { IconName } from '../../../components/icons';
import { systemColors, referenceColors } from '../../../tokens/colors';
import { shadows } from '../../../tokens/shadows';
import { quadrantMeta } from '../data/primaryResearch';
import { discordQuadrants, discordThemeFrequency, discordSummary } from '../data/discordCommunity';
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

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span className={styles.starRating}>
      <span className={styles.starRow}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Icon key={i} name="star" size="xs" color={c['border-default']} />
        ))}
      </span>
      <span className={styles.starRowFill} style={{ width: `${pct}%` }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Icon key={i} name="star" size="xs" color={c['content-warning']} />
        ))}
      </span>
    </span>
  );
};

export const DiscordCommunity: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.summaryCard}>
        <p className={styles.summarySource} style={{ color: c['content-tertiary'] }}>
          <Icon name="community" size="xs" color="currentColor" /> {discordSummary.source} · real customer implementation friction, not internal perspective
        </p>
        <p className={styles.coreInsight}>&ldquo;{discordSummary.coreInsight}&rdquo;</p>
        <p className={styles.synthesisText} style={{ color: c['content-secondary'] }}>{discordSummary.synthesis}</p>

        <div className={styles.summaryGrid}>
          <div className={styles.themeBlock}>
            <p className={styles.blockLabel} style={{ color: c['content-tertiary'] }}>Theme frequency</p>
            <div className={styles.themeList}>
              {discordThemeFrequency.map((t) => (
                <div key={t.theme} className={styles.themeRow}>
                  <div className={styles.themeRowTop}>
                    <span className={styles.themeName}>{t.theme}</span>
                    <StarRating rating={t.rating} />
                  </div>
                  <p className={styles.themeEvidence} style={{ color: c['content-tertiary'] }}>{t.evidence}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.problemsBlock}>
            <p className={styles.blockLabel} style={{ color: c['content-tertiary'] }}>Actionable problem statements</p>
            <ol className={styles.problemsList}>
              {discordSummary.problemStatements.map((p, i) => (
                <li key={i} className={styles.problemItem}>{p}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className={styles.takeaway} style={{ backgroundColor: referenceColors.brand['10'] }}>
          <Icon name="bulb" size="s" color={c['content-brand']} />
          <p className={styles.takeawayText} style={{ color: c['content-primary'] }}>{discordSummary.keyTakeaway}</p>
        </div>
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
