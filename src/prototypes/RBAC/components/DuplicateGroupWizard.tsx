import React, { useState, useEffect } from 'react';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { TextInput } from '../../../components/TextInput';
import { TextArea } from '../../../components/TextArea';
import { systemColors } from '../../../tokens/colors';
import { availableRoles, availableParentGroups, parentGroupInfoMap, PrivilegeCategory } from '../data/mockData';
import { ChecklistSelector, ChecklistItem } from './ChecklistSelector';
import { PrivilegesPanel } from './PrivilegesPanel';

interface DuplicateGroupWizardProps {
  isOpen: boolean;
  groupName: string;
  onClose: () => void;
  onSave?: () => void;
  existingGroupNames?: string[];
}

function RoleInfoContent({ privileges }: { privileges: PrivilegeCategory[] }) {
  return <PrivilegesPanel privileges={privileges} />;
}

function ParentGroupInfoContent({ name }: { name: string }) {
  const info = parentGroupInfoMap[name];
  if (!info) return null;
  return <PrivilegesPanel privileges={info.privileges} />;
}

const roleItems: ChecklistItem[] = availableRoles.map((r) => ({
  id: r.id,
  label: r.name,
  infoContent: <RoleInfoContent privileges={r.privileges} />,
}));

const parentGroupItems: ChecklistItem[] = availableParentGroups.map((g) => ({
  id: g,
  label: g,
  infoContent: <ParentGroupInfoContent name={g} />,
}));

export const DuplicateGroupWizard: React.FC<DuplicateGroupWizardProps> = ({
  isOpen,
  groupName,
  onClose,
  onSave,
  existingGroupNames,
}) => {
  const [step, setStep] = useState(0);
  const [groupNameVal, setGroupNameVal] = useState(groupName ? `${groupName}_copy` : 'ts_blr');
  const [displayName, setDisplayName] = useState(groupName ? `${groupName}_copy` : 'ts_blr');
  const [description, setDescription] = useState('');
  const [allowShare, setAllowShare] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(['role-accounts', 'role-manager2']);
  const [selectedParentGroups, setSelectedParentGroups] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setGroupNameVal(groupName ? `${groupName}_copy` : 'ts_blr');
      setDisplayName(groupName ? `${groupName}_copy` : 'ts_blr');
      setDescription('');
      setAllowShare(true);
      setSelectedRoles(['role-accounts', 'role-manager2']);
      setSelectedParentGroups([]);
    }
  }, [isOpen, groupName]);

  const handleClose = () => { onClose(); };

  const handleSave = () => { onSave?.(); onClose(); };

  const nameConflict = existingGroupNames
    ? existingGroupNames.some((n) => n.toLowerCase() === groupNameVal.trim().toLowerCase()) && groupNameVal.trim() !== ''
    : groupNameVal.trim() === groupName.trim() && groupNameVal.trim() !== '';

  const nameConflictMessage = existingGroupNames
    ? 'A group or role with this name already exists.'
    : 'Name must be different from the original group';

  const step1Footer = (
    <>
      <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      <Button variant="primary" onClick={() => setStep(1)} disabled={nameConflict || !groupNameVal.trim()}>Next</Button>
    </>
  );

  const step2Footer = (
    <>
      <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="secondary" onClick={() => setStep(0)}>Back</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </div>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="M2"
      type="wizard"
      eyebrow="Duplicate group"
      title={step === 0 ? 'Edit details' : 'Configure group'}
      showCloseButton={false}
      currentStep={step + 1}
      totalSteps={2}
      footer={step === 0 ? step1Footer : step2Footer}
    >
      {step === 0 ? (
        /* Step 1 — Describe group */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: systemColors.light['content-primary'] }}>
            Describe group
          </div>
          <TextInput
            label="Group name"
            value={groupNameVal}
            onChange={(e) => setGroupNameVal(e.target.value)}
            error={nameConflict}
            errorMessage={nameConflictMessage}
          />
          <TextInput
            label="Display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <TextArea
            label="Description"
            placeholder=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={allowShare}
              onChange={(e) => setAllowShare(e.target.checked)}
              style={{ width: 16, height: 16, accentColor: '#2770EF', cursor: 'pointer' }}
            />
            <span style={{ fontSize: 14, color: systemColors.light['content-primary'] }}>
              Allow others to share objects with this group
            </span>
          </label>
        </div>
      ) : (
        /* Step 2 — Configure group */
        <div style={{ width: 549, overflowY: 'auto', maxHeight: 440 }}>
          <ChecklistSelector
            title="Select roles"
            optional
            items={roleItems}
            selectedIds={selectedRoles}
            onChange={setSelectedRoles}
            countLabel="Roles"
          />
          <ChecklistSelector
            title="Select parent groups"
            optional
            items={parentGroupItems}
            selectedIds={selectedParentGroups}
            onChange={setSelectedParentGroups}
            countLabel="Parent groups"
          />
        </div>
      )}
    </Modal>
  );
};
