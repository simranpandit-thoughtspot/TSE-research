import React from 'react';
import { Button } from '../../../components/Button';
import { systemColors } from '../../../tokens/colors';
import styles from './TabAudit.module.css';

const c = systemColors.light;

const FIGMA_BOARD_URL = 'https://www.figma.com/board/IcNSyvUzQbUgsA2E0Cx3Vh/%3C-%3E-Tab?node-id=5-744&t=38OY7AO9VuFf58jt-11';
const FIGMA_EMBED_URL = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(FIGMA_BOARD_URL)}`;

export const TabAudit: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <p className={styles.title}>{'</> tab audit'}</p>
          <p className={styles.subtitle} style={{ color: c['content-secondary'] }}>
            Live FigJam board — every screen and control under the Develop &rarr; <code>{'</>'}</code> tab, audited end to end.
          </p>
        </div>
        <Button
          variant="secondary"
          icon="expand"
          onClick={() => window.open(FIGMA_BOARD_URL, '_blank', 'noopener,noreferrer')}
        >
          Open in Figma
        </Button>
      </div>
      <div className={styles.frameWrap}>
        <iframe
          className={styles.frame}
          src={FIGMA_EMBED_URL}
          title="</> tab audit — Figma board"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default TabAudit;
