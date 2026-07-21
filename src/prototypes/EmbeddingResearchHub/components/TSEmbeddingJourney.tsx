import React, { useState } from 'react';
import { Icon } from '../../../components/icons';
import type { IconName } from '../../../components/icons';
import { Button } from '../../../components/Button';
import { systemColors, referenceColors } from '../../../tokens/colors';
import { tsEmbeddingSteps, tsEmbeddingCompletion } from '../data/tsEmbeddingJourney';
import styles from './TSEmbeddingJourney.module.css';

import discover1 from '../assets/touchpoints/discover-1.png';
import discover2 from '../assets/touchpoints/discover-2.png';
import setupEnvironment from '../assets/touchpoints/setup-environment.png';
import authUserManagement from '../assets/touchpoints/auth-security-admin-portal-2.png';
import authFlow from '../assets/touchpoints/auth-security-flow.png';
import firstEmbedSdkPlayground from '../assets/touchpoints/first-embed-sdk-playground.png';
import customiseThemeBuilder from '../assets/touchpoints/customise-theme-builder.png';
import integrateRestApi from '../assets/touchpoints/integrate-rest-api.png';
import integrateWebhooks from '../assets/touchpoints/integrate-webhooks.png';
import testScreenshot from '../assets/touchpoints/test.png';

const c = systemColors.light;

interface Callout {
  number: number;
  xPct: number;
  yPct: number;
  label: string;
}

interface StepImage {
  src: string;
  alt: string;
  callouts: Callout[];
}

/**
 * Screenshots + numbered callouts per step, reusing the same real ThoughtSpot
 * product screenshots already fetched for the Customer Journey matrix.
 */
const STEP_IMAGES: Record<string, StepImage[]> = {
  discover: [
    {
      src: discover1,
      alt: 'ThoughtSpot Develop tab home page',
      callouts: [
        { number: 1, xPct: 8, yPct: 40, label: 'Guide, Playground, REST API, Theme Builder — every embedding tool lives under Develop' },
        { number: 2, xPct: 32, yPct: 16, label: '"Build interactive data apps. Powered by ThoughtSpot." — the pitch developers see first' },
        { number: 3, xPct: 38, yPct: 74, label: 'Live, clickable examples for each embed type — no login wall' },
      ],
    },
  ],
  'plan-integration': [
    {
      src: discover2,
      alt: 'ThoughtSpot Quickstart guide documentation page',
      callouts: [
        { number: 1, xPct: 9, yPct: 47, label: 'Two paths: embed in a web app (SDK) or a mobile app (React Native, Flutter, Swift)' },
        { number: 2, xPct: 46, yPct: 40, label: 'Security called out up front: CORS/CSP allowlisting needs admin or developer privilege' },
        { number: 3, xPct: 87, yPct: 24, label: 'A 4-step path: import the SDK → initialize → add the component → verify' },
      ],
    },
  ],
  'setup-environment': [
    {
      src: setupEnvironment,
      alt: 'ThoughtSpot Security settings page',
      callouts: [
        { number: 1, xPct: 50, yPct: 30, label: 'Whitelist every domain the embed will run on (CORS)' },
        { number: 2, xPct: 78, yPct: 58, label: 'Enable trusted authentication so the host app can sign users in silently' },
        { number: 3, xPct: 78, yPct: 68, label: 'Optionally lock out direct, non-embedded logins entirely' },
      ],
    },
  ],
  'auth-security': [
    {
      src: authUserManagement,
      alt: 'ThoughtSpot admin user management page',
      callouts: [
        { number: 1, xPct: 35, yPct: 15, label: 'Users, groups, and roles determine row- and column-level access once embedded' },
        { number: 2, xPct: 68, yPct: 34, label: "Each user's auth type — Local or SSO — is visible and editable per row" },
      ],
    },
    {
      src: authFlow,
      alt: 'ThoughtSpot authentication decision flowchart',
      callouts: [
        { number: 1, xPct: 10, yPct: 8, label: 'It starts with one question: does the customer already have a 3rd-party identity provider?' },
        { number: 2, xPct: 76, yPct: 92, label: '...and ends in one of two concrete auth types to implement in the SDK' },
      ],
    },
  ],
  'first-embed': [
    {
      src: firstEmbedSdkPlayground,
      alt: 'ThoughtSpot SDK Playground with a Stax-branded preview',
      callouts: [
        { number: 1, xPct: 10, yPct: 55, label: 'Initialize the SDK with a few lines — host, auth type, and the component to embed' },
        { number: 2, xPct: 48, yPct: 20, label: "The first component is live — \"Please select a Model\" — just waiting for data" },
        { number: 3, xPct: 87, yPct: 40, label: 'SpotterCode can generate this starter code from a plain-English prompt' },
      ],
    },
  ],
  customise: [
    {
      src: customiseThemeBuilder,
      alt: 'ThoughtSpot Theme Builder with a live preview',
      callouts: [
        { number: 1, xPct: 15, yPct: 16, label: 'Describe the look in plain English, or build the theme manually node by node' },
        { number: 2, xPct: 55, yPct: 30, label: 'Every change previews instantly against real content' },
        { number: 3, xPct: 15, yPct: 62, label: "SpotterCode can apply a brand's design guidelines directly to the theme" },
      ],
    },
  ],
  'integrate-with-product': [
    {
      src: integrateRestApi,
      alt: 'ThoughtSpot REST API v2.0 Playground documentation',
      callouts: [
        { number: 1, xPct: 8, yPct: 32, label: 'The full REST API v2.0 surface — data, metadata, jobs, security, and more' },
        { number: 2, xPct: 46, yPct: 36, label: 'Try any endpoint live before writing a line of integration code' },
      ],
    },
    {
      src: integrateWebhooks,
      alt: 'ThoughtSpot Webhooks configuration page',
      callouts: [
        { number: 1, xPct: 20, yPct: 35, label: 'Delivery rate, failures, and retry queue are all tracked in real time' },
        { number: 2, xPct: 50, yPct: 65, label: 'Each webhook maps a ThoughtSpot event — like a Liveboard schedule — to an external URL' },
      ],
    },
  ],
  test: [
    {
      src: testScreenshot,
      alt: 'ThoughtSpot SDK Playground used to validate an embed',
      callouts: [
        { number: 1, xPct: 10, yPct: 55, label: 'Re-run the same SDK config against test data to confirm behaviour' },
        { number: 2, xPct: 48, yPct: 20, label: 'Same Playground as First embed — now used to validate rather than build' },
      ],
    },
  ],
  'live-in-customer-application': [
    {
      src: firstEmbedSdkPlayground,
      alt: "Stax buyer app with ThoughtSpot embedded, now live",
      callouts: [
        { number: 1, xPct: 48, yPct: 20, label: 'Same component, now rendering inside the real customer product — "Stax" — not the ThoughtSpot Playground' },
      ],
    },
  ],
};

const STEP_ICONS: Record<string, IconName> = {
  discover: 'magnifying-glass',
  'plan-integration': 'book',
  'setup-environment': 'cog',
  'auth-security': 'lock',
  'first-embed': 'rocket',
  customise: 'brush',
  'integrate-with-product': 'cord',
  test: 'wrench',
  'live-in-customer-application': 'present',
};

type ViewState = number | 'complete';

export const TSEmbeddingJourney: React.FC = () => {
  const [view, setView] = useState<ViewState>(0);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');

  const total = tsEmbeddingSteps.length;
  const activeIndex = view === 'complete' ? total - 1 : view;
  const step = tsEmbeddingSteps[activeIndex];
  const images = STEP_IMAGES[step.id] ?? [];

  const goTo = (index: number) => {
    setDirection(index >= activeIndex ? 'forward' : 'back');
    setView(index);
  };

  const goNext = () => {
    if (activeIndex < total - 1) {
      setDirection('forward');
      setView(activeIndex + 1);
    } else {
      setDirection('forward');
      setView('complete');
    }
  };

  const goBack = () => {
    if (view === 'complete') {
      setDirection('back');
      setView(total - 1);
      return;
    }
    if (activeIndex > 0) {
      setDirection('back');
      setView(activeIndex - 1);
    }
  };

  const restart = () => {
    setDirection('back');
    setView(0);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.timeline}>
        {tsEmbeddingSteps.map((s, i) => {
          const isDone = view === 'complete' || i < activeIndex;
          const isActive = view !== 'complete' && i === activeIndex;
          return (
            <React.Fragment key={s.id}>
              {i > 0 && (
                <div
                  className={styles.timelineConnector}
                  style={{ backgroundColor: isDone ? c['border-brand'] : c['border-divider'] }}
                />
              )}
              <button
                className={styles.timelineNode}
                onClick={() => goTo(i)}
                aria-label={`Go to step ${i + 1}: ${s.title}`}
                aria-current={isActive}
              >
                <span
                  className={`${styles.timelineDot} ${isActive ? styles.timelineDotActive : ''}`}
                  style={{
                    backgroundColor: isDone ? c['background-brand'] : c['background-base'],
                    borderColor: isDone || isActive ? c['border-brand'] : c['border-divider'],
                  }}
                >
                  {isDone ? (
                    <Icon name="checkmark" size="xs" color={c['content-primary-inverse']} />
                  ) : (
                    <Icon name={STEP_ICONS[s.id]} size="xs" color={isActive ? c['content-brand'] : c['content-tertiary']} />
                  )}
                </span>
                <span className={styles.timelineLabel} style={{ color: isActive ? c['content-primary'] : c['content-tertiary'] }}>
                  {s.title}
                </span>
              </button>
            </React.Fragment>
          );
        })}
      </div>

      <div className={styles.stage}>
        {view === 'complete' ? (
          <div key="complete" className={`${styles.screen} ${styles.completeScreen} ${styles[direction]}`}>
            <div className={styles.completeBadge} style={{ backgroundColor: referenceColors.green['20'] }}>
              <Icon name="checkmark-circle" size="l" color={c['content-success']} />
            </div>
            <h2 className={styles.completeTitle}>{tsEmbeddingCompletion.title}</h2>
            <p className={styles.completeBody} style={{ color: c['content-secondary'] }}>{tsEmbeddingCompletion.body}</p>

            <div className={styles.completeVisual}>
              <div className={styles.stagePreviewCrop}>
                <img src={firstEmbedSdkPlayground} alt="Stax buyer app with ThoughtSpot embedded" className={styles.stagePreviewImg} />
              </div>
              <p className={styles.completeVisualCaption} style={{ color: c['content-tertiary'] }}>
                The embed, live inside a customer's product
              </p>
            </div>

            <div className={styles.checklist}>
              {tsEmbeddingCompletion.checklist.map((title) => (
                <div key={title} className={styles.checklistItem}>
                  <Icon name="checkmark-circle" size="xs" color={c['content-success']} />
                  <span>{title}</span>
                </div>
              ))}
            </div>

            <p className={styles.tagline}>{tsEmbeddingCompletion.tagline}</p>

            <Button variant="tertiary" size="small" icon="reset" onClick={restart}>
              Restart the walkthrough
            </Button>
          </div>
        ) : (
          <div key={step.id} className={`${styles.screen} ${styles[direction]}`}>
            <div className={styles.stepMeta}>
              <span className={styles.stepCount} style={{ color: c['content-tertiary'] }}>
                Step {step.stepNumber} of {total}
              </span>
              <h2 className={styles.stepTitle}>{step.title}</h2>
              <p className={styles.stepGoal} style={{ color: c['content-secondary'] }}>{step.userGoal}</p>

              <div className={styles.metaBlock}>
                <p className={styles.metaLabel} style={{ color: c['content-tertiary'] }}>Activities</p>
                <ul className={styles.activityList}>
                  {step.activities.map((a) => (
                    <li key={a} className={styles.activityItem}>
                      <Icon name="play" size="xs" color={c['content-brand']} />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.metaRow}>
                <div>
                  <p className={styles.metaLabel} style={{ color: c['content-tertiary'] }}>ThoughtSpot page</p>
                  <p className={styles.metaValue}>{step.tsPage}</p>
                </div>
                <div>
                  <p className={styles.metaLabel} style={{ color: c['content-tertiary'] }}>Touch points</p>
                  <div className={styles.chipRow}>
                    {step.touchpoints.map((t) => (
                      <span key={t} className={styles.chip} style={{ backgroundColor: referenceColors.brand['10'], color: c['content-brand'] }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.screenshotPane}>
              {images.map((img, i) => (
                <div key={i} className={styles.screenshotFrame}>
                  <img src={img.src} alt={img.alt} className={styles.screenshotImg} />
                  {img.callouts.map((callout) => (
                    <div
                      key={callout.number}
                      className={styles.calloutMarker}
                      style={{ left: `${callout.xPct}%`, top: `${callout.yPct}%`, backgroundColor: c['background-brand'] }}
                      title={callout.label}
                    >
                      {callout.number}
                    </div>
                  ))}
                </div>
              ))}
              {images.length > 0 && (
                <div className={styles.calloutLegend}>
                  {images.flatMap((img) => img.callouts).map((callout) => (
                    <div key={callout.number} className={styles.legendRow}>
                      <span className={styles.legendNumber} style={{ backgroundColor: c['background-brand'] }}>{callout.number}</span>
                      <span className={styles.legendLabel} style={{ color: c['content-secondary'] }}>{callout.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <Button variant="tertiary" size="small" icon="chevron-left" onClick={goBack} disabled={view !== 'complete' && activeIndex === 0}>
          Back
        </Button>
        {view !== 'complete' && (
          <Button variant="primary" size="small" icon="chevron-right" iconPosition="trailing" onClick={goNext}>
            {step.nextLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default TSEmbeddingJourney;
