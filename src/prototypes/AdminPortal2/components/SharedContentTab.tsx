import React from 'react';
import { Toggle } from '../../../components/Toggle';
import { Icon } from '../../../components/icons';
import { detailPanelStyles as styles } from '../styles';
import { systemColors } from '../../../tokens/colors';
import type { SharedContentItem } from '../data/mockData';

interface SharedContentTabProps {
  directContent: SharedContentItem[];
  inheritedContent: SharedContentItem[];
  parentGroupName?: string;
  inheritSharedContent: boolean;
  onToggleInherit: (enabled: boolean) => void;
  onToggleItemAccess: (itemId: string, enabled: boolean) => void;
}

function getTypeIcon(type: SharedContentItem['type']): string {
  switch (type) {
    case 'liveboard': return 'liveboard';
    case 'answer': return 'answer';
    case 'worksheet': return 'collection';
    default: return 'collection';
  }
}

function getTypeLabel(type: SharedContentItem['type']): string {
  switch (type) {
    case 'liveboard': return 'Liveboard';
    case 'answer': return 'Answer';
    case 'worksheet': return 'Worksheet';
    default: return type;
  }
}

const ContentRow: React.FC<{
  item: SharedContentItem;
  onToggleAccess?: (enabled: boolean) => void;
  showToggle?: boolean;
}> = ({ item, onToggleAccess, showToggle = false }) => (
  <div style={styles.contentRow}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
      <div style={styles.contentIcon}>
        <Icon name={getTypeIcon(item.type) as any} size="s" color={systemColors.light['content-secondary']} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={styles.contentName}>{item.name}</div>
        <div style={styles.contentMeta}>
          {getTypeLabel(item.type)} &middot; {item.owner} &middot; {item.sharedAt}
        </div>
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
      <span style={{
        ...styles.sourceBadge,
        ...(item.source === 'direct' ? styles.directBadge : styles.inheritedSourceBadge),
      }}>
        {item.source === 'direct' ? 'Direct' : item.sourceGroupName}
      </span>
      {showToggle && onToggleAccess && (
        <Toggle
          checked={item.accessEnabled}
          onChange={onToggleAccess}
        />
      )}
    </div>
  </div>
);

export const SharedContentTab: React.FC<SharedContentTabProps> = ({
  directContent,
  inheritedContent,
  parentGroupName,
  inheritSharedContent,
  onToggleInherit,
  onToggleItemAccess,
}) => {
  const hasAny = directContent.length > 0 || inheritedContent.length > 0;

  if (!hasAny) {
    return <div style={styles.emptyState}>No shared content for this group.</div>;
  }

  return (
    <div>
      {directContent.length > 0 && (
        <div>
          <div style={styles.sectionHeader}>Directly shared ({directContent.length})</div>
          {directContent.map((item) => (
            <ContentRow key={item.id} item={item} />
          ))}
        </div>
      )}

      {inheritedContent.length > 0 && (
        <div>
          {directContent.length > 0 && <div style={styles.sectionDivider} />}

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}>
            <div style={styles.inheritedBanner}>
              Inherited from: <strong>{parentGroupName}</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, marginLeft: '12px' }}>
              <span style={{ fontSize: '13px', color: systemColors.light['content-secondary'], whiteSpace: 'nowrap' }}>
                Inherit access
              </span>
              <Toggle
                checked={inheritSharedContent}
                onChange={onToggleInherit}
              />
            </div>
          </div>

          <div style={{ opacity: inheritSharedContent ? 1 : 0.5, pointerEvents: inheritSharedContent ? 'auto' : 'none' }}>
            <div style={styles.sectionHeader}>Inherited content ({inheritedContent.length})</div>
            {inheritedContent.map((item) => (
              <ContentRow
                key={item.id}
                item={item}
                showToggle
                onToggleAccess={(enabled) => onToggleItemAccess(item.id, enabled)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedContentTab;
