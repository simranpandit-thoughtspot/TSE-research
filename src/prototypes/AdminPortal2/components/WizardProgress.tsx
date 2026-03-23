import React from 'react';
import { modalStyles as styles } from '../styles';

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const WizardProgress: React.FC<WizardProgressProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div style={styles.progressContainer}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          style={{
            ...styles.progressSegment,
            ...(index <= currentStep ? styles.progressSegmentActive : {}),
          }}
        />
      ))}
    </div>
  );
};

export default WizardProgress;
