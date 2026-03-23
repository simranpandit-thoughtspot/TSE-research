import React from 'react';
import { Checkbox } from '../../../components/Checkbox';
import { Icon } from '../../../components/icons';
import { tableStyles as styles } from '../styles';
import { systemColors } from '../../../tokens/colors';
import type { GroupItem } from '../data/mockData';

interface GroupsTableProps {
  groups: GroupItem[];
  onGroupClick?: (group: GroupItem) => void;
}

export const GroupsTable: React.FC<GroupsTableProps> = ({
  groups,
  onGroupClick,
}) => {
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.headerRow}>
        <div>
          <Checkbox checked={false} onChange={() => {}} />
        </div>
        <div style={styles.headerCell}>
          Group Name
          <Icon name="arrow-down" size="xs" color={systemColors.light['content-secondary']} />
        </div>
        <div>Users</div>
        <div>Created</div>
        <div>Actions</div>
      </div>

      {/* Rows */}
      {groups.map((group, index) => (
        <div
          key={group.id}
          style={{
            ...styles.row,
            borderBottom: index === groups.length - 1 ? 'none' : `1px solid ${systemColors.light['background-subtle']}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = systemColors.light['background-sunken'];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <div>
            <Checkbox checked={false} onChange={() => {}} />
          </div>
          <div>
            <button
              style={{ ...styles.groupName, background: 'none', border: 'none', padding: 0, textAlign: 'left', display: 'block' }}
              onClick={() => onGroupClick?.(group)}
            >
              {group.name}
            </button>
            <div style={styles.groupSubtitle}>{group.subtitle}</div>
          </div>
          <div style={styles.cell}>{group.userCount}</div>
          <div style={styles.cell}>{group.createdAt}</div>
          <div>
            <button style={styles.moreButton}>
              <Icon name="more" size="s" color="currentColor" />
            </button>
          </div>
        </div>
      ))}

      {groups.length === 0 && (
        <div style={{
          padding: '48px',
          textAlign: 'center',
          color: systemColors.light['content-tertiary'],
          fontSize: '14px',
        }}>
          No groups found.
        </div>
      )}

      {/* Pagination */}
      <div style={styles.pagination}>
        <span>1-20 of 500</span>
        <button style={styles.paginationLink}>
          Next
          <Icon name="chevron-right" size="xs" color="currentColor" />
        </button>
      </div>
    </div>
  );
};

export default GroupsTable;
