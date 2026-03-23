import React from 'react';
import { SearchableCheckboxList } from './SearchableCheckboxList';
import type { ListItem } from './SearchableCheckboxList';
import { roles, parentGroups, users } from '../data/mockData';

interface ConfigureGroupStepProps {
  selectedRoleIds: string[];
  selectedParentGroupIds: string[];
  selectedUserIds: string[];
  onRolesChange: (ids: string[]) => void;
  onParentGroupChange: (ids: string[]) => void;
  onUsersChange: (ids: string[]) => void;
}

export const ConfigureGroupStep: React.FC<ConfigureGroupStepProps> = ({
  selectedRoleIds,
  selectedParentGroupIds,
  selectedUserIds,
  onRolesChange,
  onParentGroupChange,
  onUsersChange,
}) => {
  const roleItems: ListItem[] = roles.map(r => ({
    id: r.id,
    name: r.name,
    showInfoIcon: true,
    description: r.description,
  }));

  const parentGroupItems: ListItem[] = parentGroups.map(pg => ({
    id: pg.id,
    name: pg.name,
    meta: `${pg.childCount} children`,
  }));

  const userItems: ListItem[] = users.map(u => ({
    id: u.id,
    name: u.name,
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <SearchableCheckboxList
        title="Select roles"
        optional
        items={roleItems}
        selectedIds={selectedRoleIds}
        onSelectionChange={onRolesChange}
        countLabel="Roles"
      />

      <SearchableCheckboxList
        title="Select parent group"
        optional
        infoNote="This child group can have only 1 parent group. Selecting a parent will inherit its privileges automatically."
        items={parentGroupItems}
        selectedIds={selectedParentGroupIds}
        onSelectionChange={onParentGroupChange}
        showSelectAll
        singleSelect
        countLabel="Parent group"
      />

      <SearchableCheckboxList
        title="Select users"
        optional
        items={userItems}
        selectedIds={selectedUserIds}
        onSelectionChange={onUsersChange}
        countLabel="Users"
      />
    </div>
  );
};

export default ConfigureGroupStep;
