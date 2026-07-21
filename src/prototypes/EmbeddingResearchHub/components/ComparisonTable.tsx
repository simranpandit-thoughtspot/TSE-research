import React, { useState, useMemo } from 'react';
import { Icon } from '../../../components/icons';
import type { IconName } from '../../../components/icons';
import { systemColors } from '../../../tokens/colors';
import { competitors, dimensionGroups, Competitor, Fact } from '../data/competitors';
import { CompanyLogo } from './CompanyLogo';
import { HoverPreviewLink } from './HoverPreviewLink';
import styles from './ComparisonTable.module.css';

const c = systemColors.light;

const DEFAULT_SELECTED = ['thoughtspot', 'holistics', 'looker', 'powerbi', 'sigma', 'tableau'];

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

export const ComparisonTable: React.FC = () => {
  const [selected, setSelected] = useState<string[]>(DEFAULT_SELECTED);

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const visible = useMemo(
    () => competitors.filter((comp) => selected.includes(comp.id)),
    [selected],
  );

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
            {selected.length === competitors.length ? 'Reset to default 6' : `Show all ${competitors.length}`}
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
                <th key={comp.id} className={styles.headerCell}>
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
                {group.dimensions.map((dim) => (
                  <tr key={dim.key as string}>
                    <td className={styles.dimensionCell}>
                      <p className={styles.dimensionLabel}>{dim.label}</p>
                      <p className={styles.dimensionHelper} style={{ color: c['content-tertiary'] }}>{dim.helper}</p>
                    </td>
                    {visible.map((comp) => {
                      const fact = comp[dim.key] as Fact;
                      const isDemo = dim.key === 'demoPlayground';
                      return (
                        <td key={comp.id} className={styles.factCell}>
                          <p className={styles.factText}>{fact.value}</p>
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
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
