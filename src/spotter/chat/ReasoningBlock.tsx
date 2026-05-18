import React, { useEffect, useState } from 'react';
import { Icon } from '@components/icons';
import type { IconName } from '@components/icons';
import type {
  MessageStage,
  ReasoningStep,
  ReasoningToolCall,
  ReasoningTrace,
} from '../runtime/schema';
import styles from './ReasoningBlock.module.css';

export interface ReasoningBlockProps {
  reasoning?: ReasoningTrace;
  stage: MessageStage;
}

/**
 * Reasoning panel — collapsed "Show work ⌄" trigger by default.
 * Auto-expands while the agent is thinking or streaming, then auto-collapses
 * once the message is done. Click toggles manual expansion.
 *
 * When expanded, each step renders:
 *   - colored dot (gray pending, brand-blue pulsing current, success-green done)
 *   - bold title
 *   - optional description body
 *   - optional embedded ToolcallCard with input / output
 *   - left-side connector line linking the dots
 */
export const ReasoningBlock: React.FC<ReasoningBlockProps> = ({
  reasoning,
  stage,
}) => {
  const isActive = stage === 'thinking' || stage === 'streaming';
  const [expanded, setExpanded] = useState(isActive);
  const [userToggled, setUserToggled] = useState(false);

  useEffect(() => {
    if (userToggled) return;
    if (isActive) {
      setExpanded(true);
    } else if (stage === 'done' && reasoning?.isDone) {
      const t = setTimeout(() => setExpanded(false), 600);
      return () => clearTimeout(t);
    }
  }, [stage, reasoning?.isDone, isActive, userToggled]);

  const handleToggle = (): void => {
    setUserToggled(true);
    setExpanded((prev) => !prev);
  };

  // Don't render until reasoning is actually set — avoids the "Show work"
  // trigger appearing during the typing-only phase. TypingIndicator covers
  // that phase in AgentMessage.
  if (!reasoning) return null;

  const stepCount = reasoning.steps.length;
  const showSteps = expanded && stepCount > 0;

  return (
    <div className={styles.reasoning}>
      <button
        type="button"
        className={styles.trigger}
        data-expanded={expanded}
        onClick={handleToggle}
        aria-expanded={expanded}
      >
        <span>Show work</span>
        <span className={styles.chevron} data-expanded={expanded}>
          <Icon name="chevron-down" size="s" />
        </span>
      </button>
      {/*
        Steps container stays MOUNTED. Visibility flips via `data-expanded`
        so the height/opacity transition can animate collapse/expand smoothly.
      */}
      <div className={styles.steps} data-expanded={showSteps}>
        {reasoning.steps.map((step, index) => (
          <StepRow
            key={step.id}
            step={step}
            isLast={
              index === stepCount - 1 && reasoning.durationSeconds === undefined
            }
            animationDelay={index * 80}
          />
        ))}
        {reasoning.isDone && reasoning.durationSeconds !== undefined && (
          <div className={styles.workedFor}>
            <div className={styles.dotColumn}>
              <span
                className={styles.dot}
                data-status="done"
                aria-hidden="true"
              />
            </div>
            <p className={styles.workedForBody}>
              Worked for {reasoning.durationSeconds} seconds
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

ReasoningBlock.displayName = 'ReasoningBlock';

// ---------- StepRow ----------

interface StepRowProps {
  step: ReasoningStep;
  isLast: boolean;
  animationDelay: number;
}

const StepRow: React.FC<StepRowProps> = ({ step, isLast, animationDelay }) => {
  return (
    <div className={styles.step} style={{ animationDelay: `${animationDelay}ms` }}>
      <div className={styles.dotColumn}>
        {!isLast && <span className={styles.connector} aria-hidden="true" />}
        <span className={styles.dot} data-status={step.status} aria-hidden="true" />
      </div>
      <div className={styles.body}>
        <h4 className={styles.title}>{step.label}</h4>
        {step.description && <p className={styles.description}>{step.description}</p>}
        {step.toolcall && <ToolcallCard toolcall={step.toolcall} />}
      </div>
    </div>
  );
};

// ---------- ToolcallCard ----------

const ToolcallCard: React.FC<{ toolcall: ReasoningToolCall }> = ({ toolcall }) => {
  const [open, setOpen] = useState(false);
  const hasBody = toolcall.input !== undefined || toolcall.output !== undefined;

  return (
    <div className={styles.toolcall}>
      <button
        type="button"
        className={styles.toolcallHeader}
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
      >
        <span className={styles.toolcallIcon} aria-hidden="true">
          <Icon name={(toolcall.icon as IconName) ?? 'spotter'} size="s" />
        </span>
        <span className={styles.toolcallTitle}>{toolcall.title}</span>
        {hasBody && (
          <span className={styles.toolcallShowDetails}>
            <span>Show details</span>
            <span className={styles.toolcallChevron} data-expanded={open}>
              <Icon name="chevron-down" size="s" />
            </span>
          </span>
        )}
      </button>
      {hasBody && (
        <div className={styles.toolcallBody} data-open={open}>
          {toolcall.input !== undefined && (
            <div className={styles.toolcallSection}>
              <span className={styles.toolcallLabel}>Input</span>
              <p className={styles.toolcallValue}>{toolcall.input}</p>
            </div>
          )}
          {toolcall.output !== undefined && (
            <div className={styles.toolcallSection}>
              <span className={styles.toolcallLabel}>Output</span>
              <p className={styles.toolcallValue}>{toolcall.output}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReasoningBlock;
