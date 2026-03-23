import React from 'react';
import { modalStyles as styles } from '../styles';
import { WizardProgress } from './WizardProgress';

interface WizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextLabel: string;
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  children: React.ReactNode;
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  isNextDisabled?: boolean;
  showBack?: boolean;
}

export const WizardModal: React.FC<WizardModalProps> = ({
  isOpen,
  onClose,
  contextLabel,
  currentStep,
  totalSteps,
  stepTitle,
  children,
  onBack,
  onNext,
  nextLabel = 'Next',
  isNextDisabled = false,
  showBack = true,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.contextLabel}>{contextLabel}</div>
          <h2 style={styles.stepTitle}>{stepTitle}</h2>
        </div>

        <div style={styles.content}>
          {children}
        </div>

        <WizardProgress currentStep={currentStep} totalSteps={totalSteps} />

        <div style={styles.footer}>
          <button style={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <div style={styles.buttonGroup}>
            {showBack && currentStep > 0 && (
              <button style={styles.backButton} onClick={onBack}>
                Back
              </button>
            )}
            <button
              style={{
                ...styles.nextButton,
                ...(isNextDisabled ? styles.nextButtonDisabled : {}),
              }}
              onClick={onNext}
              disabled={isNextDisabled}
            >
              {nextLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardModal;
