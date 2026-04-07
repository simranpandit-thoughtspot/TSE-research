import React, { useState } from 'react';
import {
  Modal,
  ModalFooter,
  ModalNavPanel,
  ModalNavItem,
  ModalSplashContent,
} from '../../components/Modal';
import type { ModalSize, ModalType } from '../../components/Modal';
import { Button } from '../../components/Button';
import { systemColors, referenceColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing.H,
    padding: spacing.F,
    minHeight: '100vh',
    backgroundColor: systemColors.light['background-sunken'],
  },
  header: {
    marginBottom: spacing.D,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: spacing.B,
  },
  subtitle: {
    fontSize: 14,
    color: systemColors.light['content-secondary'],
  },
  controls: {
    display: 'flex',
    gap: spacing.D,
    flexWrap: 'wrap' as const,
    marginBottom: spacing.F,
  },
  controlGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing.B,
  },
  controlLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: systemColors.light['content-secondary'],
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  select: {
    padding: `${spacing.B}px ${spacing.C}px`,
    borderRadius: 6,
    border: `1px solid ${referenceColors.gray['30']}`,
    backgroundColor: systemColors.light['background-base'],
    fontSize: 14,
    color: systemColors.light['content-primary'],
    minWidth: 160,
    cursor: 'pointer',
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: spacing.D,
  },
  demoButton: {
    padding: `${spacing.D}px`,
    borderRadius: 8,
    border: `1px solid ${systemColors.light['background-subtle']}`,
    backgroundColor: systemColors.light['background-base'],
    cursor: 'pointer',
    transition: 'all 150ms ease',
    textAlign: 'left' as const,
  },
  demoButtonTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: spacing.A,
  },
  demoButtonDesc: {
    fontSize: 12,
    color: systemColors.light['content-secondary'],
  },
  sampleContent: {
    padding: spacing.D,
    backgroundColor: referenceColors.purple['20'],
    borderRadius: 6,
    textAlign: 'center' as const,
    color: systemColors.light['content-primary'],
    minHeight: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sampleMediaArea: {
    width: '100%',
    height: '100%',
    backgroundColor: referenceColors.purple['20'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: systemColors.light['content-secondary'],
    fontSize: 14,
  },
};

type DemoModal = {
  size: ModalSize;
  type: ModalType;
  title: string;
  description: string;
};

const demoModals: DemoModal[] = [
  { size: 'M1', type: 'simple', title: 'M1 Simple', description: 'Compact dialog (394px)' },
  { size: 'M2', type: 'simple', title: 'M2 Simple', description: 'Standard modal (788px)' },
  { size: 'M3', type: 'simple', title: 'M3 Simple', description: 'Wide modal (1182px)' },
  { size: 'M4', type: 'simple', title: 'M4 Full Screen', description: 'Immersive experience' },
  { size: 'M2', type: 'wizard', title: 'M2 Wizard', description: 'Multi-step process' },
  { size: 'M2', type: 'subnavigation', title: 'M2 Sub-navigation', description: 'Settings with categories' },
  { size: 'M2', type: 'splashscreen', title: 'M2 Splash Screen', description: 'Feature announcement' },
];

export const ModalPatternsDemo: React.FC = () => {
  const [activeModal, setActiveModal] = useState<DemoModal | null>(null);
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedNav, setSelectedNav] = useState('general');
  
  // Custom modal state
  const [customSize, setCustomSize] = useState<ModalSize>('M2');
  const [customType, setCustomType] = useState<ModalType>('simple');
  const [showCustomModal, setShowCustomModal] = useState(false);

  const closeModal = () => {
    setActiveModal(null);
    setWizardStep(1);
  };

  const renderModalContent = () => {
    if (!activeModal) return null;

    // Splash screen content
    if (activeModal.type === 'splashscreen') {
      return (
        <ModalSplashContent
          title="Introducing Parameters"
          bulletPoints={[
            'Create formulas with adjustable values to run different scenarios',
            'Click the plus button to make your first parameter',
          ]}
        />
      );
    }

    // Regular content
    return (
      <div style={styles.sampleContent}>
        <p>Modal content area - swap with your component</p>
      </div>
    );
  };

  const renderModalFooter = () => {
    if (!activeModal) return null;

    // Wizard footer
    if (activeModal.type === 'wizard') {
      return (
        <ModalFooter
          tertiaryAction={<Button variant="tertiary" onClick={closeModal}>Cancel</Button>}
          secondaryAction={
            wizardStep > 1 ? (
              <Button variant="secondary" onClick={() => setWizardStep(s => s - 1)}>Back</Button>
            ) : null
          }
          primaryAction={
            wizardStep < 3 ? (
              <Button variant="primary" onClick={() => setWizardStep(s => s + 1)}>Next</Button>
            ) : (
              <Button variant="primary" onClick={closeModal}>Done</Button>
            )
          }
        />
      );
    }

    // Splash screen footer
    if (activeModal.type === 'splashscreen') {
      return (
        <ModalFooter
          primaryAction={<Button variant="primary" onClick={closeModal}>Done</Button>}
        />
      );
    }

    // Default footer
    return (
      <ModalFooter
        tertiaryAction={<Button variant="tertiary">Learn More</Button>}
        secondaryAction={<Button variant="secondary" onClick={closeModal}>Cancel</Button>}
        primaryAction={<Button variant="primary" onClick={closeModal}>Confirm</Button>}
      />
    );
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Modal Patterns (M1-M4)</h1>
        <p style={styles.subtitle}>
          Based on Radiant 3.0 Design System. Click any button to preview the modal variant.
        </p>
      </div>

      {/* Custom Modal Builder */}
      <div style={styles.controls}>
        <div style={styles.controlGroup}>
          <label style={styles.controlLabel}>Size</label>
          <select
            style={styles.select}
            value={customSize}
            onChange={(e) => setCustomSize(e.target.value as ModalSize)}
          >
            <option value="M1">M1 - 394px (Compact)</option>
            <option value="M2">M2 - 788px (Standard)</option>
            <option value="M3">M3 - 1182px (Wide)</option>
            <option value="M4">M4 - Full Screen</option>
          </select>
        </div>
        <div style={styles.controlGroup}>
          <label style={styles.controlLabel}>Type</label>
          <select
            style={styles.select}
            value={customType}
            onChange={(e) => setCustomType(e.target.value as ModalType)}
          >
            <option value="simple">Simple</option>
            <option value="wizard">Wizard</option>
            <option value="subnavigation">Sub-navigation</option>
            <option value="splashscreen">Splash Screen</option>
          </select>
        </div>
        <div style={styles.controlGroup}>
          <label style={styles.controlLabel}>&nbsp;</label>
          <Button variant="primary" onClick={() => setShowCustomModal(true)}>
            Open Custom Modal
          </Button>
        </div>
      </div>

      {/* Demo Buttons */}
      <div style={styles.buttonGrid}>
        {demoModals.map((demo) => (
          <button
            key={`${demo.size}-${demo.type}`}
            style={styles.demoButton}
            onClick={() => setActiveModal(demo)}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = systemColors.light['content-brand'];
              e.currentTarget.style.boxShadow = `0 2px 8px ${systemColors.light['background-information']}`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = systemColors.light['background-subtle'];
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={styles.demoButtonTitle}>{demo.title}</div>
            <div style={styles.demoButtonDesc}>{demo.description}</div>
          </button>
        ))}
      </div>

      {/* Active Demo Modal */}
      {activeModal && (
        <Modal
          isOpen={true}
          onClose={closeModal}
          size={activeModal.size}
          type={activeModal.type}
          title={activeModal.title}
          eyebrow={activeModal.type === 'wizard' ? `Step ${wizardStep} of 3` : undefined}
          currentStep={wizardStep}
          totalSteps={3}
          navigation={
            activeModal.type === 'subnavigation' ? (
              <ModalNavPanel>
                <ModalNavItem active={selectedNav === 'general'} onClick={() => setSelectedNav('general')}>
                  General
                </ModalNavItem>
                <ModalNavItem active={selectedNav === 'security'} onClick={() => setSelectedNav('security')}>
                  Security
                </ModalNavItem>
                <ModalNavItem active={selectedNav === 'notifications'} onClick={() => setSelectedNav('notifications')}>
                  Notifications
                </ModalNavItem>
                <ModalNavItem active={selectedNav === 'integrations'} onClick={() => setSelectedNav('integrations')}>
                  Integrations
                </ModalNavItem>
              </ModalNavPanel>
            ) : undefined
          }
          mediaContent={
            activeModal.type === 'splashscreen' ? (
              <div style={styles.sampleMediaArea}>
                <span>Feature Image / Video</span>
              </div>
            ) : undefined
          }
          footer={renderModalFooter()}
        >
          {renderModalContent()}
        </Modal>
      )}

      {/* Custom Modal */}
      {showCustomModal && (
        <Modal
          isOpen={true}
          onClose={() => {
            setShowCustomModal(false);
            setWizardStep(1);
          }}
          size={customSize}
          type={customType}
          title={`${customSize} ${customType.charAt(0).toUpperCase() + customType.slice(1)} Modal`}
          eyebrow={customType === 'wizard' ? `Step ${wizardStep} of 3` : undefined}
          currentStep={wizardStep}
          totalSteps={3}
          navigation={
            customType === 'subnavigation' ? (
              <ModalNavPanel>
                <ModalNavItem active={selectedNav === 'general'} onClick={() => setSelectedNav('general')}>
                  General
                </ModalNavItem>
                <ModalNavItem active={selectedNav === 'security'} onClick={() => setSelectedNav('security')}>
                  Security
                </ModalNavItem>
                <ModalNavItem active={selectedNav === 'notifications'} onClick={() => setSelectedNav('notifications')}>
                  Notifications
                </ModalNavItem>
              </ModalNavPanel>
            ) : undefined
          }
          mediaContent={
            customType === 'splashscreen' ? (
              <div style={styles.sampleMediaArea}>
                <span>Feature Image / Video</span>
              </div>
            ) : undefined
          }
          footer={
            customType === 'wizard' ? (
              <ModalFooter
                tertiaryAction={<Button variant="tertiary" onClick={() => setShowCustomModal(false)}>Cancel</Button>}
                secondaryAction={
                  wizardStep > 1 ? (
                    <Button variant="secondary" onClick={() => setWizardStep(s => s - 1)}>Back</Button>
                  ) : null
                }
                primaryAction={
                  wizardStep < 3 ? (
                    <Button variant="primary" onClick={() => setWizardStep(s => s + 1)}>Next</Button>
                  ) : (
                    <Button variant="primary" onClick={() => setShowCustomModal(false)}>Done</Button>
                  )
                }
              />
            ) : customType === 'splashscreen' ? (
              <ModalFooter
                primaryAction={<Button variant="primary" onClick={() => setShowCustomModal(false)}>Done</Button>}
              />
            ) : (
              <ModalFooter
                tertiaryAction={<Button variant="tertiary">Learn More</Button>}
                secondaryAction={<Button variant="secondary" onClick={() => setShowCustomModal(false)}>Cancel</Button>}
                primaryAction={<Button variant="primary" onClick={() => setShowCustomModal(false)}>Confirm</Button>}
              />
            )
          }
        >
          {customType === 'splashscreen' ? (
            <ModalSplashContent
              title="Introducing Parameters"
              bulletPoints={[
                'Create formulas with adjustable values to run different scenarios',
                'Click the plus button to make your first parameter',
              ]}
            />
          ) : (
            <div style={styles.sampleContent}>
              <p>Modal content area - swap with your component</p>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default ModalPatternsDemo;
