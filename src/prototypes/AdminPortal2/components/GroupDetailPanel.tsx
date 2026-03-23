import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Tabs } from '../../../components/Tabs';
import { Icon } from '../../../components/icons';
import { detailPanelStyles as styles } from '../styles';
import { UsersTab } from './UsersTab';
import { PrivilegesTab } from './PrivilegesTab';
import { RLSRulesTab } from './RLSRulesTab';
import { SharedContentTab } from './SharedContentTab';
import {
  groupDetailTabs,
  getUsersForGroup,
  getInheritedPrivileges,
  getInheritedRlsRules,
  getInheritedSharedContent,
  getParentGroupName,
} from '../data/mockData';
import type { GroupItem, SharedContentItem } from '../data/mockData';

interface GroupDetailPanelProps {
  group: GroupItem;
  onClose: () => void;
  onGroupUpdate: (group: GroupItem) => void;
}

export const GroupDetailPanel: React.FC<GroupDetailPanelProps> = ({
  group,
  onClose,
  onGroupUpdate,
}) => {
  const [activeTab, setActiveTab] = useState('users');

  const groupUsers = getUsersForGroup(group);
  const parentGroupName = getParentGroupName(group.parentGroupId);
  const inheritedPrivileges = getInheritedPrivileges(group.parentGroupId);
  const inheritedRlsRules = getInheritedRlsRules(group.parentGroupId);
  const inheritedSharedContent = getInheritedSharedContent(group.parentGroupId);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleToggleInherit = (enabled: boolean) => {
    onGroupUpdate({ ...group, inheritSharedContent: enabled });
  };

  const handleToggleItemAccess = (itemId: string, enabled: boolean) => {
    const updatedContent = (group.sharedContent || []).map(item =>
      item.id === itemId ? { ...item, accessEnabled: enabled } : item
    );

    const alreadyHasItem = updatedContent.some(item => item.id === itemId);
    let finalContent: SharedContentItem[];

    if (alreadyHasItem) {
      finalContent = updatedContent;
    } else {
      const inheritedItem = inheritedSharedContent.find(item => item.id === itemId);
      if (inheritedItem) {
        finalContent = [...updatedContent, { ...inheritedItem, accessEnabled: enabled }];
      } else {
        finalContent = updatedContent;
      }
    }

    onGroupUpdate({ ...group, sharedContent: finalContent });
  };

  const mergedInheritedContent = inheritedSharedContent.map(ic => {
    const override = (group.sharedContent || []).find(sc => sc.id === ic.id);
    return override ? { ...ic, accessEnabled: override.accessEnabled } : ic;
  });

  const renderTab = () => {
    switch (activeTab) {
      case 'users':
        return <UsersTab users={groupUsers} />;
      case 'privileges':
        return (
          <PrivilegesTab
            directPrivileges={group.directPrivileges || []}
            inheritedPrivileges={inheritedPrivileges}
            parentGroupName={parentGroupName}
          />
        );
      case 'rls-rules':
        return (
          <RLSRulesTab
            directRules={group.directRlsRules || []}
            inheritedRules={inheritedRlsRules}
            parentGroupName={parentGroupName}
          />
        );
      case 'shared-content':
        return (
          <SharedContentTab
            directContent={(group.sharedContent || []).filter(sc => sc.source === 'direct')}
            inheritedContent={mergedInheritedContent}
            parentGroupName={parentGroupName}
            inheritSharedContent={group.inheritSharedContent ?? true}
            onToggleInherit={handleToggleInherit}
            onToggleItemAccess={handleToggleItemAccess}
          />
        );
      default:
        return null;
    }
  };

  const modalContent = (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.panel}>
        <div style={styles.header}>
          <div style={styles.headerInfo}>
            <h2 style={styles.headerTitle}>{group.name}</h2>
            <div style={styles.headerSubtitle}>{group.subtitle}</div>
            {parentGroupName && (
              <div style={styles.parentBadge}>
                <Icon name="folder" size="xs" color="currentColor" />
                Parent: {parentGroupName}
              </div>
            )}
          </div>
          <button style={styles.closeButton} onClick={onClose}>
            <Icon name="cross" size="s" color="currentColor" />
          </button>
        </div>

        <div style={styles.tabsContainer}>
          <Tabs
            tabs={groupDetailTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        <div style={styles.body}>
          {renderTab()}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default GroupDetailPanel;
