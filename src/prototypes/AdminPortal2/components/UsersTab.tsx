import React from 'react';
import { detailPanelStyles as styles } from '../styles';
import type { UserItem } from '../data/mockData';

interface UsersTabProps {
  users: UserItem[];
}

function getInitials(name: string): string {
  return name
    .split(/[\s_]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
}

export const UsersTab: React.FC<UsersTabProps> = ({ users }) => {
  if (users.length === 0) {
    return <div style={styles.emptyState}>No users assigned to this group.</div>;
  }

  return (
    <div>
      <div style={styles.sectionHeader}>
        {users.length} user{users.length !== 1 ? 's' : ''}
      </div>
      {users.map((user) => (
        <div key={user.id} style={styles.userRow}>
          <div style={styles.userAvatar}>
            {getInitials(user.name)}
          </div>
          <div>
            <div style={styles.userName}>{user.name}</div>
            {user.email && <div style={styles.userEmail}>{user.email}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersTab;
