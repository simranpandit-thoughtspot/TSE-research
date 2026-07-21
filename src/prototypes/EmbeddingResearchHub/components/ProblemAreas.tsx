import React from 'react';
import { Icon } from '../../../components/icons';
import { systemColors } from '../../../tokens/colors';
import styles from './ProblemAreas.module.css';

const c = systemColors.light;

export const ProblemAreas: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.iconBadge} style={{ backgroundColor: c['background-warning'] }}>
          <Icon name="exclamation-point-circle" size="l" color={c['content-warning']} />
        </div>
        <p className={styles.title}>Summary of problem areas</p>
        <p className={styles.body} style={{ color: c['content-secondary'] }}>
          To be defined. Once the customer journey is mapped and the tab audit is complete, this section
          will synthesize the recurring problems across secondary research, primary research, and the
          tab audit into one prioritized view.
        </p>
      </div>
    </div>
  );
};

export default ProblemAreas;
