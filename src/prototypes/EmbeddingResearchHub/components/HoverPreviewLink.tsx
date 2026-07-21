import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../../../components/icons';
import { systemColors } from '../../../tokens/colors';
import { shadowPrimitives } from '../../../tokens/shadows';
import { CompanyLogo } from './CompanyLogo';
import type { Competitor } from '../data/competitors';
import styles from './HoverPreviewLink.module.css';

const c = systemColors.light;

const ACCENT_BY_CONFIDENCE: Record<Competitor['confidence'], string> = {
  verified: c['background-accent-green'],
  partial: c['background-accent-yellow'],
  thin: c['background-accent-red'],
};

const PREVIEW_WIDTH = 240;
const PREVIEW_GAP = 10;

interface HoverPreviewLinkProps {
  href: string;
  competitor: Competitor;
  kindLabel: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps a link with a floating preview card on hover — a mock "live demo"
 * frame rather than a fetched screenshot/video, since most vendor demo pages
 * block being embedded (X-Frame-Options) and would just render blank.
 *
 * Renders the preview through a portal positioned via computed viewport
 * coordinates, since triggers usually sit inside the comparison table's
 * scrollable (overflow: auto) container, which would otherwise clip an
 * absolutely-positioned popover.
 */
export const HoverPreviewLink: React.FC<HoverPreviewLinkProps> = ({ href, competitor, kindLabel, children, className }) => {
  const accent = ACCENT_BY_CONFIDENCE[competitor.confidence];
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

  const show = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const halfWidth = PREVIEW_WIDTH / 2;
    const rawLeft = rect.left + rect.width / 2;
    const clampedLeft = Math.min(Math.max(rawLeft, halfWidth + 8), window.innerWidth - halfWidth - 8);
    setCoords({ top: rect.top - PREVIEW_GAP, left: clampedLeft });
  };
  const hide = () => setCoords(null);

  return (
    <span className={styles.wrap} onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      <a
        ref={triggerRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.trigger} ${className || ''}`}
      >
        {children}
      </a>
      {coords &&
        createPortal(
          <div
            className={styles.portalPreview}
            style={{ top: coords.top, left: coords.left, width: PREVIEW_WIDTH }}
          >
            <span className={styles.card} style={{ boxShadow: shadowPrimitives.light.menu }}>
              <span className={styles.frame} style={{ backgroundColor: accent }}>
                <span className={styles.frameBar}>
                  <span className={styles.frameDot} />
                  <span className={styles.frameDot} />
                  <span className={styles.frameDot} />
                </span>
                <span className={styles.frameBody}>
                  <CompanyLogo competitor={competitor} size={26} />
                  <span className={styles.playButton}>
                    <Icon name="play" size="xs" color={c['content-primary']} />
                  </span>
                  <span className={styles.frameLabel} style={{ color: c['content-secondary'] }}>{competitor.name} · {kindLabel}</span>
                </span>
              </span>
              <span className={styles.caption} style={{ color: c['content-tertiary'] }}>
                Opens in a new tab — mock preview, not a live capture
              </span>
            </span>
          </div>,
          document.body,
        )}
    </span>
  );
};

export default HoverPreviewLink;
