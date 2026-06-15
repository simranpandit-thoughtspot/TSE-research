import React, { useState, useEffect } from 'react';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { TextInput } from '../../../components/TextInput';
import { TextArea } from '../../../components/TextArea';
import { systemColors } from '../../../tokens/colors';
import {
  Group,
  availableRoles,
  availableParentGroups,
  availableUsersForSelection,
  parentGroupInfoMap,
  PrivilegeCategory,
} from '../data/mockData';
import { ChecklistSelector, ChecklistItem } from './ChecklistSelector';
import { PrivilegesPanel } from './PrivilegesPanel';

interface EditGroupModalProps {
  isOpen: boolean;
  group: Group | null;
  onClose: () => void;
  onSave?: () => void;
  parentGroupItemsOverride?: ChecklistItem[];
  initialSelectedParentGroupsOverride?: string[];
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

const userItems: ChecklistItem[] = availableUsersForSelection.map((u) => ({ id: u, label: u }));

export const EditGroupModal: React.FC<EditGroupModalProps> = ({
  isOpen, group, onClose, onSave,
  parentGroupItemsOverride,
  initialSelectedParentGroupsOverride,
}) => {
  const isDefault = !!group?.isDefault;
  const [step, setStep] = useState(0);

  // Step 1 fields
  const [groupName, setGroupName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [description, setDescription] = useState('');
  const [allowShare, setAllowShare] = useState(true);

  // Step 2 selections
  const [selectedRoles, setSelectedRoles] = useState<string[]>(['role-accounts', 'role-manager2']);
  const [selectedParentGroups, setSelectedParentGroups] = useState<string[]>(['Ajbuw_3hd', 'BYPASSRLS']);
  const [selectedUsers, setSelectedUsers] = useState<string[]>(['Jimmi Jones', 'User_2845']);

  useEffect(() => {
    if (isOpen && group) {
      setStep(0);
      setGroupName(group.name);
      setDisplayName(group.displayName);
      setDescription(group.description ?? '');
      setAllowShare(true);
      setSelectedRoles(['role-accounts', 'role-manager2']);
      setSelectedParentGroups(initialSelectedParentGroupsOverride ?? ['Ajbuw_3hd', 'BYPASSRLS']);
      setSelectedUsers(['Jimmi Jones', 'User_2845']);
    }
  }, [isOpen, group]);

  const activeParentGroupItems = parentGroupItemsOverride ?? parentGroupItems;

  const handleSave = () => {
    onSave?.();
    onClose();
  };

  // --- Default group: 1-step ---
  if (isDefault) {
    const footer = (
      <>
        <div />
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </div>
      </>
    );

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="M2"
        title="Edit group"
        showCloseButton={false}
        footer={footer}
      >
        <div style={{ width: 549, overflowY: 'auto', maxHeight: 488 }}>
          <ChecklistSelector
            title="Select parent groups"
            optional
            items={activeParentGroupItems}
            selectedIds={selectedParentGroups}
            onChange={setSelectedParentGroups}
            countLabel="Parent groups"
          />
          <ChecklistSelector
            title="Select users"
            optional
            items={userItems}
            selectedIds={selectedUsers}
            onChange={setSelectedUsers}
            countLabel="Users"
          />
        </div>
      </Modal>
    );
  }

  // --- Non-default group: 2-step wizard ---
  const step1Footer = (
    <>
      <Button variant="secondary" onClick={onClose}>Cancel</Button>
      <Button variant="primary" onClick={() => setStep(1)} disabled={!groupName.trim()}>Next</Button>
    </>
  );

  const step2Footer = (
    <>
      <Button variant="secondary" onClick={onClose}>Cancel</Button>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="secondary" onClick={() => setStep(0)}>Back</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </div>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="M2"
      type="wizard"
      eyebrow="Edit group"
      title={step === 0 ? 'Edit details' : 'Configure group'}
      showCloseButton={false}
      currentStep={step + 1}
      totalSteps={2}
      footer={step === 0 ? step1Footer : step2Footer}
    >
      {step === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: systemColors.light['content-primary'] }}>
            Describe group
          </div>
          <TextInput
            label="Group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
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
            items={activeParentGroupItems}
            selectedIds={selectedParentGroups}
            onChange={setSelectedParentGroups}
            countLabel="Parent groups"
          />
          <ChecklistSelector
            title="Select users"
            optional
            items={userItems}
            selectedIds={selectedUsers}
            onChange={setSelectedUsers}
            countLabel="Users"
          />
        </div>
      )}
    </Modal>
  );
};
