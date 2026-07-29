import React, { useState, useMemo } from 'react';
import { Icon } from '../../../components/icons';
import type { IconName } from '../../../components/icons';
import { systemColors } from '../../../tokens/colors';
import {
  competitors,
  dimensionGroups,
  bestInClass,
  TS_STANDING_LABEL,
  Competitor,
  Fact,
  TsStanding,
} from '../data/competitors';
import { CompanyLogo } from './CompanyLogo';
import { HoverPreviewLink } from './HoverPreviewLink';
import styles from './ComparisonTable.module.css';

const c = systemColors.light;

const TS_ID = 'thoughtspot';

/**
 * Includes every best-in-class winner (see `bestInClass`) so each dimension's
 * badge is visible without the reader having to widen the selection first.
 */
const DEFAULT_SELECTED = [TS_ID, 'holistics', 'looker', 'powerbi', 'sigma', 'tableau', 'embeddable'];

const CONFIDENCE_COLOR: Record<Competitor['confidence'], string> = {
  verified: c['content-success'],
  partial: c['content-warning'],
  thin: c['content-failure'],
};

const CONFIDENCE_LABEL: Record<Competitor['confidence'], string> = {
  verified: 'Well-sourced',
  partial: 'Partially sourced',
  thin: 'Thin public data',
};

const STANDING_COLOR: Record<TsStanding, string> = {
  competitive: c['content-success'],
  'mid-pack': c['content-warning'],
  behind: c['content-failure'],
};

export const ComparisonTable: React.FC = () => {
  const [selected, setSelected] = useState<string[]>(DEFAULT_SELECTED);

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  /**
   * ThoughtSpot is forced to the first column and pinned there (see .tsCell) so
   * it stays on screen as the comparison anchor while the rest scroll past.
   */
  const visible = useMemo(() => {
    const sel = competitors.filter((comp) => selected.includes(comp.id));
    const ts = sel.find((comp) => comp.id === TS_ID);
    return ts ? [ts, ...sel.filter((comp) => comp.id !== TS_ID)] : sel;
  }, [selected]);

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <div className={styles.filterRow}>
          <span className={styles.filterLabel} style={{ color: c['content-tertiary'] }}>
            Comparing {visible.length} of {competitors.length}
          </span>
          {competitors.map((comp) => {
            const active = selected.includes(comp.id);
            return (
              <button
                key={comp.id}
                className={`${styles.pill} ${active ? styles.pillActive : ''}`}
                onClick={() => toggle(comp.id)}
                aria-pressed={active}
                style={active ? { backgroundColor: c['background-information'], borderColor: c['border-brand'], color: c['content-brand'] } : undefined}
              >
                <CompanyLogo competitor={comp} size={18} />
                {comp.name}
              </button>
            );
          })}
          <button
            className={styles.utilityBtn}
            onClick={() => setSelected(selected.length === competitors.length ? DEFAULT_SELECTED : competitors.map((x) => x.id))}
          >
            {selected.length === competitors.length ? `Reset to default ${DEFAULT_SELECTED.length}` : `Show all ${competitors.length}`}
          </button>
        </div>
      </div>

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={`${styles.dimensionCell} ${styles.headerCell}`}>
                <p className={styles.dimensionLabel}>Dimension</p>
              </th>
              {visible.map((comp) => (
                <th key={comp.id} className={`${styles.headerCell} ${comp.id === TS_ID ? styles.tsCell : ''}`}>
                  <p className={styles.headerName}>
                    <HoverPreviewLink href={comp.website} competitor={comp} kindLabel="website" className={styles.headerLogoLink}>
                      <CompanyLogo competitor={comp} size={22} />
                    </HoverPreviewLink>
                    {comp.name}
                    <span
                      className={styles.confidenceDot}
                      style={{ backgroundColor: CONFIDENCE_COLOR[comp.confidence] }}
                      title={CONFIDENCE_LABEL[comp.confidence]}
                    />
                  </p>
                  <p className={styles.headerTagline} style={{ color: c['content-secondary'] }}>{comp.tagline}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dimensionGroups.map((group) => (
              <React.Fragment key={group.title}>
                <tr>
                  <td className={styles.groupBanner} colSpan={visible.length + 1} style={{ backgroundColor: c['background-information'] }}>
                    <span className={styles.groupBannerInner}>
                      <Icon name={group.icon as IconName} size="s" color={c['content-brand']} />
                      <span style={{ color: c['content-brand'] }}>{group.title}</span>
                    </span>
                  </td>
                </tr>
                {group.dimensions.map((dim) => {
                  const bic = bestInClass[dim.key];
                  return (
                  <tr key={dim.key as string}>
                    <td className={styles.dimensionCell}>
                      <p className={styles.dimensionLabel}>{dim.label}</p>
                      <p className={styles.dimensionHelper} style={{ color: c['content-tertiary'] }}>{dim.helper}</p>
                      {bic && (
                        <>
                          <span
                            className={styles.standingChip}
                            style={{ color: STANDING_COLOR[bic.tsStanding], borderColor: STANDING_COLOR[bic.tsStanding] }}
                            title={bic.tsNote}
                          >
                            {TS_STANDING_LABEL[bic.tsStanding]}
                          </span>
                          {bic.winner === null && (
                            <span className={styles.noWinnerChip} style={{ color: c['content-tertiary'], borderColor: c['border-default'] }} title={bic.why}>
                              No clear winner — evidence too thin
                            </span>
                          )}
                        </>
                      )}
                    </td>
                    {visible.map((comp) => {
                      const fact = comp[dim.key] as Fact;
                      const isDemo = dim.key === 'demoPlayground';
                      const isWinner = bic?.winner === comp.id;
                      const isRunnerUp = bic?.runnerUp === comp.id;
                      return (
                        <td
                          key={comp.id}
                          className={`${styles.factCell} ${comp.id === TS_ID ? styles.tsCell : ''} ${isWinner ? styles.winnerCell : ''}`}
                          style={isWinner ? { backgroundColor: c['background-success'] } : undefined}
                        >
                          {isWinner && bic && (
                            <span
                              className={styles.bestBadge}
                              style={{ backgroundColor: c['content-success'], color: c['content-primary-inverse'] }}
                              title={bic.why}
                            >
                              <Icon name="star" size="xs" color={c['content-primary-inverse']} />
                              Best in class
                            </span>
                          )}
                          {isRunnerUp && (
                            <span
                              className={styles.runnerUpBadge}
                              style={{ color: c['content-secondary'], borderColor: c['border-default'] }}
                              title="Closest challenger on this dimension"
                            >
                              Runner-up
                            </span>
                          )}
                          <p className={styles.factText}>{fact.value}</p>
                          {isWinner && bic && (
                            <p className={styles.bestWhy} style={{ color: c['content-secondary'] }}>
                              {bic.why}
                              {bic.sources.map((s) => (
                                <a
                                  key={s.url}
                                  className={styles.bestSource}
                                  href={s.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: c['content-link'] }}
                                >
                                  {s.label}
                                </a>
                              ))}
                            </p>
                          )}
                          {fact.source && isDemo && (
                            <HoverPreviewLink href={fact.source.url} competitor={comp} kindLabel="live demo" className={styles.sourceLink}>
                              <Icon name="play" size="xs" color={c['content-link']} />
                              <span style={{ color: c['content-link'] }}>{fact.source.label}</span>
                            </HoverPreviewLink>
                          )}
                          {fact.source && !isDemo && (
                            <a
                              className={styles.sourceLink}
                              href={fact.source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: c['content-link'] }}
                            >
                              <Icon name="documentation" size="xs" color="currentColor" />
                              source
                            </a>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
