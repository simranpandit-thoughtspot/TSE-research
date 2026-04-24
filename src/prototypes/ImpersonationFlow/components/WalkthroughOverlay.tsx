import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './WalkthroughOverlay.module.css';

interface Props {
  onDone: () => void;
  onSwitchToAdmin: () => void;
  onSwitchToUser: () => void;
  onStartSession: () => void;
}

interface Step {
  target: string;
  title: string;
  body: string;
  side: 'top' | 'bottom' | 'left' | 'right';
  pad?: number;
  delay?: number;
}

const STEPS: Step[] = [
  {
    target: 'persona-switcher',
    title: 'Persona switcher',
    body: "Toggle between User and Admin view at any time. You're currently viewing from Simran's perspective.",
    side: 'bottom',
    pad: 6,
  },
  {
    target: 'user-impersonation-pref',
    title: 'Impersonation preference',
    body: "Simran's preference is 'Always allow' — admins can act as her immediately, no request needed. Click Edit to change it.",
    side: 'right',
    pad: 8,
  },
  {
    target: 'admin-user-table',
    title: 'User management',
    body: "You're now in the admin view. All users are listed here. Find Simran Pandit at the top of the list.",
    side: 'bottom',
    pad: 8,
    delay: 200,
  },
  {
    target: 'simran-row-dots',
    title: 'Act as user',
    body: "Click ⋮ on Simran's row to open the action menu. 'Act as user' lets you step into her session — since her pref is 'Always allow', it starts immediately.",
    side: 'left',
    pad: 8,
  },
  {
    target: 'session-indicator',
    title: 'Session is active',
    body: "You're now acting as Simran Pandit! The animated gradient border confirms the active session. Click the blue button to see the live timer and exit.",
    side: 'bottom',
    pad: 8,
    delay: 1500,
  },
];

const TOOLTIP_W = 300;
const TOOLTIP_H_EST = 220;

function clampPos(left: number, top: number) {
  return {
    left: Math.max(8, Math.min(left, window.innerWidth - TOOLTIP_W - 8)),
    top: Math.max(8, Math.min(top, window.innerHeight - TOOLTIP_H_EST - 8)),
  };
}

function calcTooltipPos(rect: DOMRect, pad: number, side: Step['side']) {
  const spotBottom = rect.bottom + pad;
  const spotTop = rect.top - pad;
  const spotLeft = rect.left - pad;
  const spotRight = rect.right + pad;
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  switch (side) {
    case 'bottom':
      return clampPos(cx - TOOLTIP_W / 2, spotBottom + 16);
    case 'top':
      return clampPos(cx - TOOLTIP_W / 2, spotTop - TOOLTIP_H_EST - 16);
    case 'right':
      return clampPos(spotRight + 16, cy - 90);
    case 'left':
      return clampPos(spotLeft - TOOLTIP_W - 16, cy - 90);
  }
}

const WalkthroughOverlay: React.FC<Props> = ({ onDone, onSwitchToAdmin, onSwitchToUser, onStartSession }) => {
  const [step, setStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const current = STEPS[step];

  useEffect(() => {
    const delay = current.delay ?? 60;
    const t = setTimeout(() => {
      const el = document.querySelector(`[data-walkthrough="${current.target}"]`);
      setTargetRect(el ? el.getBoundingClientRect() : null);
    }, delay);
    return () => clearTimeout(t);
  }, [step, current.target, current.delay]);

  const advance = () => {
    if (step === STEPS.length - 1) { onDone(); return; }
    if (step === 1) onSwitchToAdmin();
    if (step === 3) onStartSession();
    setStep(s => s + 1);
  };

  const retreat = () => {
    if (step === 2) onSwitchToUser();
    setStep(s => Math.max(0, s - 1));
  };

  const TooltipContent = () => (
    <>
      <div className={styles.stepCount}>{step + 1} / {STEPS.length}</div>
      <h3 className={styles.title}>{current.title}</h3>
      <p className={styles.body}>{current.body}</p>
      <div className={styles.actions}>
        <button className={styles.skipBtn} onClick={onDone}>Skip tour</button>
        <div className={styles.navBtns}>
          {step > 0 && (
            <button className={styles.backBtn} onClick={retreat}>← Back</button>
          )}
          <button className={styles.nextBtn} onClick={advance}>
            {step === STEPS.length - 1 ? 'Done ✓' : 'Next →'}
          </button>
        </div>
      </div>
    </>
  );

  if (!targetRect) {
    return ReactDOM.createPortal(
      <div className={styles.fallbackOverlay}>
        <div className={styles.tooltipCentered}>
          <TooltipContent />
        </div>
      </div>,
      document.body
    );
  }

  const PAD = current.pad ?? 8;
  const { left: tx, top: ty } = calcTooltipPos(targetRect, PAD, current.side);

  return ReactDOM.createPortal(
    <>
      {/* Spotlight — box-shadow creates the dark overlay around it */}
      <div
        className={styles.spotlight}
        style={{
          left: targetRect.left - PAD,
          top: targetRect.top - PAD,
          width: targetRect.width + PAD * 2,
          height: targetRect.height + PAD * 2,
        }}
      />

      {/* Tooltip */}
      <div
        className={styles.tooltip}
        style={{ left: tx, top: ty, width: TOOLTIP_W }}
      >
        <TooltipContent />
      </div>
    </>,
    document.body
  );
};

export default WalkthroughOverlay;
