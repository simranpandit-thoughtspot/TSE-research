import React from 'react';
import { systemColors } from '../../../tokens/colors';
import { PrivilegeCategory } from '../data/mockData';

interface PrivilegesPanelProps {
  privileges: PrivilegeCategory[];
}

export const PrivilegesPanel: React.FC<PrivilegesPanelProps> = ({ privileges }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto', maxHeight: 340 }}>
      {privileges.map((cat) => (
        <div key={cat.category}>
          <div style={{ fontSize: 13, color: systemColors.light['content-secondary'], marginBottom: 8 }}>
            {cat.category}
          </div>
          <div
            style={{
              background: systemColors.light['background-subtle'],
              borderRadius: 8,
              padding: '8px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            {cat.privileges.map((priv) => (
              <div key={priv} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: systemColors.light['content-primary'] }}>
                <span style={{ fontSize: 16, lineHeight: 1 }}>•</span>
                {priv}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
