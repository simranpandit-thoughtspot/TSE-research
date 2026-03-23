import React from 'react';
import { detailPanelStyles as styles } from '../styles';
import type { Privilege } from '../data/mockData';

interface PrivilegesTabProps {
  directPrivileges: Privilege[];
  inheritedPrivileges: Privilege[];
  parentGroupName?: string;
}

export const PrivilegesTab: React.FC<PrivilegesTabProps> = ({
  directPrivileges,
  inheritedPrivileges,
  parentGroupName,
}) => {
  const hasAny = directPrivileges.length > 0 || inheritedPrivileges.length > 0;

  if (!hasAny) {
    return <div style={styles.emptyState}>No privileges assigned to this group.</div>;
  }

  return (
    <div>
      {directPrivileges.length > 0 && (
        <div>
          <div style={styles.sectionHeader}>Direct privileges ({directPrivileges.length})</div>
          {directPrivileges.map((priv) => (
            <div key={priv.id} style={styles.privilegeRow}>
              <div>
                <div style={styles.privilegeName}>{priv.name}</div>
                <div style={styles.privilegeDescription}>{priv.description}</div>
              </div>
              <span style={{ ...styles.sourceBadge, ...styles.directBadge }}>
                Direct
              </span>
            </div>
          ))}
        </div>
      )}

      {inheritedPrivileges.length > 0 && (
        <div>
          {directPrivileges.length > 0 && <div style={styles.sectionDivider} />}
          <div style={styles.inheritedBanner}>
            Inherited from parent group: <strong>{parentGroupName}</strong>
          </div>
          <div style={styles.sectionHeader}>Inherited privileges ({inheritedPrivileges.length})</div>
          {inheritedPrivileges.map((priv) => (
            <div key={priv.id} style={styles.privilegeRow}>
              <div>
                <div style={styles.privilegeName}>{priv.name}</div>
                <div style={styles.privilegeDescription}>{priv.description}</div>
              </div>
              <span style={{ ...styles.sourceBadge, ...styles.inheritedSourceBadge }}>
                {priv.sourceGroupName}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrivilegesTab;
