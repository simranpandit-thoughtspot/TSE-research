import React from 'react';
import { Icon } from '../../../components/icons';
import type { IconName } from '../../../components/icons';
import { systemColors, referenceColors } from '../../../tokens/colors';
import { journeyStages, StageAccent } from '../data/customerJourney';
import styles from './CustomerJourney.module.css';

import discover1 from '../assets/touchpoints/discover-1.png';
import discover2 from '../assets/touchpoints/discover-2.png';
import planIntegration from '../assets/touchpoints/plan-integration.png';
import setupEnvironment from '../assets/touchpoints/setup-environment.png';
import authAdminPortal from '../assets/touchpoints/auth-security-admin-portal.png';
import authAdminPortal2 from '../assets/touchpoints/auth-security-admin-portal-2.png';
import authFlow from '../assets/touchpoints/auth-security-flow.png';
import firstEmbedSdkPlayground from '../assets/touchpoints/first-embed-sdk-playground.png';
import customiseThemeBuilder from '../assets/touchpoints/customise-theme-builder.png';
import integrateRestApi from '../assets/touchpoints/integrate-rest-api.png';
import integrateWebhooks from '../assets/touchpoints/integrate-webhooks.png';
import testScreenshot from '../assets/touchpoints/test.png';
import maintainScale from '../assets/touchpoints/maintain-scale.png';

const c = systemColors.light;

/**
 * Product screenshots for each stage's touch points — fetched directly from
 * the </> tab audit FigJam board via the Figma MCP (real ThoughtSpot UI, not
 * mockups). Deploy has none supplied yet.
 */
const TOUCHPOINT_IMAGES: Partial<Record<string, string[]>> = {
  discover: [discover1, discover2],
  'plan-integration': [planIntegration],
  'setup-environment': [setupEnvironment],
  'auth-security': [authAdminPortal, authAdminPortal2, authFlow],
  'first-embed': [firstEmbedSdkPlayground],
  customise: [customiseThemeBuilder],
  'integrate-with-product': [integrateRestApi, integrateWebhooks],
  test: [testScreenshot],
  'maintain-scale': [maintainScale],
};

const ACCENT_NOTE_COLOR: Record<StageAccent, string> = {
  orange: referenceColors.orange['40'],
  teal: referenceColors.teal['40'],
  purple: referenceColors.purple['40'],
  blue: referenceColors.blue['40'],
  green: referenceColors.green['40'],
};

const PAIN_NOTE_COLOR = referenceColors.red['40'];
const OPPORTUNITY_NOTE_COLOR = referenceColors.green['40'];
const LEGEND_BG = referenceColors.yellow['20'];
const HEADER_BG = referenceColors.yellow['10'];

interface RowMeta {
  key: 'activities' | 'painPoints' | 'opportunities' | 'touchpoints';
  label: string;
  icon: IconName;
}

const ROWS: RowMeta[] = [
  { key: 'activities', label: 'Activities', icon: 'play' },
  { key: 'painPoints', label: 'Pain points', icon: 'exclamation-point-circle' },
  { key: 'opportunities', label: 'Opportunities', icon: 'bulb' },
  { key: 'touchpoints', label: 'Touch points', icon: 'monitor' },
];

export const CustomerJourney: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.legendCell} style={{ backgroundColor: LEGEND_BG }} />
              {journeyStages.map((stage) => (
                <th key={stage.id} className={styles.stageHeaderCell} style={{ backgroundColor: HEADER_BG }}>
                  <p className={styles.stageTitle}>{stage.title}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.key}>
                <td className={styles.legendCell} style={{ backgroundColor: LEGEND_BG }}>
                  <div className={styles.legendRow}>
                    <Icon name={row.icon} size="xs" color={c['content-primary']} />
                    {row.label}
                  </div>
                </td>
                {journeyStages.map((stage) => {
                  const accentColor = ACCENT_NOTE_COLOR[stage.accent];
                  if (row.key === 'touchpoints') {
                    const images = TOUCHPOINT_IMAGES[stage.id] ?? [];
                    return (
                      <td key={stage.id} className={styles.stageCell}>
                        <div className={styles.touchpointNote} style={{ backgroundColor: accentColor, color: c['content-primary'] }}>
                          {stage.touchpoints}
                        </div>
                        {images.length > 0 && (
                          <div className={styles.touchpointImages}>
                            {images.map((src, i) => (
                              <img
                                key={i}
                                className={styles.touchpointImg}
                                src={src}
                                alt={`${stage.title} touch point ${i + 1}`}
                                onClick={() => window.open(src, '_blank', 'noopener,noreferrer')}
                              />
                            ))}
                          </div>
                        )}
                      </td>
                    );
                  }
                  const notes = row.key === 'activities' ? stage.activities : row.key === 'painPoints' ? stage.painPoints : stage.opportunities;
                  const noteColor = row.key === 'activities' ? accentColor : row.key === 'painPoints' ? PAIN_NOTE_COLOR : OPPORTUNITY_NOTE_COLOR;
                  return (
                    <td key={stage.id} className={styles.stageCell}>
                      {notes.length === 0 ? (
                        <span className={styles.emptyCell} style={{ color: c['content-tertiary'] }}>—</span>
                      ) : (
                        <div className={styles.noteStack}>
                          {notes.map((note, i) => (
                            <div key={i} className={styles.note} style={{ backgroundColor: noteColor, color: c['content-primary'] }}>
                              {note}
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerJourney;
