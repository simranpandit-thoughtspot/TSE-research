import React from 'react';
import { detailPanelStyles as styles } from '../styles';
import type { RlsRule } from '../data/mockData';

interface RLSRulesTabProps {
  directRules: RlsRule[];
  inheritedRules: RlsRule[];
  parentGroupName?: string;
}

const RuleCard: React.FC<{ rule: RlsRule }> = ({ rule }) => (
  <div style={styles.rlsRow}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={styles.rlsTable}>{rule.tableName}</span>
      <span style={{
        ...styles.rlsSourceTag,
        ...(rule.source === 'direct' ? styles.directBadge : styles.inheritedSourceBadge),
      }}>
        {rule.source === 'direct' ? 'Direct' : rule.sourceGroupName}
      </span>
    </div>
    <div style={styles.rlsExpression}>
      <span style={styles.rlsColumn}>{rule.columnName}</span>
      {' '}{rule.operator}{' '}
      <span style={styles.rlsValue}>{rule.value}</span>
    </div>
  </div>
);

export const RLSRulesTab: React.FC<RLSRulesTabProps> = ({
  directRules,
  inheritedRules,
  parentGroupName,
}) => {
  const hasAny = directRules.length > 0 || inheritedRules.length > 0;

  if (!hasAny) {
    return <div style={styles.emptyState}>No RLS rules applied to this group.</div>;
  }

  return (
    <div>
      {directRules.length > 0 && (
        <div>
          <div style={styles.sectionHeader}>Direct RLS rules ({directRules.length})</div>
          {directRules.map((rule) => (
            <RuleCard key={rule.id} rule={rule} />
          ))}
        </div>
      )}

      {inheritedRules.length > 0 && (
        <div>
          {directRules.length > 0 && <div style={styles.sectionDivider} />}
          <div style={styles.inheritedBanner}>
            Inherited RLS rules from parent group: <strong>{parentGroupName}</strong>
          </div>
          <div style={styles.sectionHeader}>Inherited RLS rules ({inheritedRules.length})</div>
          {inheritedRules.map((rule) => (
            <RuleCard key={rule.id} rule={rule} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RLSRulesTab;
