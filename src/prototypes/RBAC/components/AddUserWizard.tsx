import React, { useState, useEffect } from 'react';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { TextInput } from '../../../components/TextInput';
import { TextArea } from '../../../components/TextArea';
import { systemColors } from '../../../tokens/colors';
import { availableParentGroupsUC23, parentGroupInfoMapUC23 } from '../data/mockData';
import { ChecklistSelector, ChecklistItem } from './ChecklistSelector';
import { PrivilegesPanel } from './PrivilegesPanel';

interface AddUserWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
}

const DEFAULT_BADGE = (
  <span style={{ fontSize: 11, fontWeight: 600, color: '#fff', background: '#2770EF', borderRadius: 4, padding: '1px 7px' }}>
    Default
  </span>
);

function buildGroupItems(): ChecklistItem[] {
  return availableParentGroupsUC23.map((g) => {
    const info = parentGroupInfoMapUC23[g];
    return {
      id: g,
      label: g,
      badge: g === 'Administrator' ? DEFAULT_BADGE : undefined,
      infoContent: info ? <PrivilegesPanel privileges={info.privileges} /> : undefined,
    };
  });
}

const groupItems = buildGroupItems();

export const AddUserWizard: React.FC<AddUserWizardProps> = ({ isOpen, onClose, onSave }) => {
  const [step, setStep] = useState(0);

  // Step 0 fields
  const [email, setEmail] = useState('simranpandit@thoughtspot.com');
  const [username, setUsername] = useState('simpandit');
  const [displayName, setDisplayName] = useState('simran pandit');
  const [allowShare, setAllowShare] = useState(false);

  // Step 1 fields
  const [selectedGroups, setSelectedGroups] = useState<string[]>(['Power users', 'Group default', 'BYPASSRLS_group']);

  // Step 2 fields
  const [sendEmail, setSendEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setEmail('simranpandit@thoughtspot.com');
      setUsername('simpandit');
      setDisplayName('simran pandit');
      setAllowShare(false);
      setSelectedGroups(['Power users', 'Group default', 'BYPASSRLS_group']);
      setSendEmail(false);
      setEmailMessage('');
    }
  }, [isOpen]);

  const handleClose = () => { onClose(); };
  const handleSave = () => { onSave?.(); onClose(); };

  const step0Footer = (
    <>
      <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      <Button variant="primary" onClick={() => setStep(1)} disabled={!email.trim()}>Next</Button>
    </>
  );

  const step1Footer = (
    <>
      <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="secondary" onClick={() => setStep(0)}>Back</Button>
        <Button variant="primary" onClick={() => setStep(2)}>Next</Button>
      </div>
    </>
  );

  const step2Footer = (
    <>
      <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
        <Button variant="primary" onClick={handleSave}>Create user</Button>
      </div>
    </>
  );

  const stepTitles = ['Add credentials', 'Assign groups', 'Welcome email'];
  const footers = [step0Footer, step1Footer, step2Footer];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="M2"
      type="wizard"
      eyebrow="Add new user"
      title={stepTitles[step]}
      showCloseButton={false}
      currentStep={step + 1}
      totalSteps={3}
      footer={footers[step]}
    >
      {step === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: systemColors.light['content-primary'] }}>
            Add user information
          </div>

          {/* Email — custom label row */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: systemColors.light['content-primary'] }}>Email</span>
              <span style={{ fontSize: 12, color: systemColors.light['content-secondary'] }}>(White listed domains:*)</span>
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                height: 40,
                padding: '0 12px',
                border: `1px solid ${systemColors.light['border-default']}`,
                borderRadius: 6,
                width: '100%',
                boxSizing: 'border-box',
                fontSize: 14,
                fontFamily: 'inherit',
                color: systemColors.light['content-primary'],
                outline: 'none',
              }}
            />
          </div>

          <TextInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextInput
            label="Display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={allowShare}
              onChange={(e) => setAllowShare(e.target.checked)}
              style={{ width: 16, height: 16, accentColor: '#2770EF', cursor: 'pointer' }}
            />
            <span style={{ fontSize: 14, color: systemColors.light['content-primary'] }}>
              Allow others to share objects with this user
            </span>
          </label>
        </div>
      )}

      {step === 1 && (
        <div style={{ width: 549 }}>
          <ChecklistSelector
            title="Select groups"
            optional
            items={groupItems}
            selectedIds={selectedGroups}
            onChange={setSelectedGroups}
            countLabel="Groups"
          />
        </div>
      )}

      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: systemColors.light['content-primary'] }}>
            Send welcome email
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={sendEmail}
              onChange={(e) => setSendEmail(e.target.checked)}
              style={{ width: 16, height: 16, accentColor: '#2770EF', cursor: 'pointer' }}
            />
            <span style={{ fontSize: 14, color: systemColors.light['content-primary'] }}>
              Send a welcome email
            </span>
          </label>
          <TextArea
            label="Add message (Optional)"
            placeholder=""
            value={emailMessage}
            onChange={(e) => setEmailMessage(e.target.value)}
            rows={5}
          />
        </div>
      )}
    </Modal>
  );
};
