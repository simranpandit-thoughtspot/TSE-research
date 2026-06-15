import React from 'react';
import styles from './CommandCenter.module.css';
import { KPI, PENDING_TASKS, AUDIT_LOG, type PendingTask, type AuditEntry } from '../data/mockData';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

interface CommandCenterProps {
  onSuggestedPrompt: (text: string) => void;
  userName?: string;
}

const SUGGESTED_PROMPTS = [
  { icon: '👤', text: 'Add user to org', full: 'Add john@example.com to Acme Corp' },
  { icon: '⚡', text: 'Enable feature flag', full: 'Enable SpotIQ for Nina Enterprises' },
  { icon: '🔍', text: 'Org health check', full: 'Show me the health of Acme Corp' },
  { icon: '📋', text: 'Review inactive users', full: 'Show users inactive for 30 days' },
  { icon: '🏢', text: 'Early access for org', full: 'Enable early access mode for Innovative Solutions' },
];

function priorityDot(priority: PendingTask['priority']) {
  return <span className={`${styles.taskDot} ${styles[priority]}`} />;
}

function auditChip(type: AuditEntry['type']) {
  const labels: Record<AuditEntry['type'], string> = {
    user: 'User', feature: 'Feature', org: 'Org', config: 'Config',
  };
  return <span className={`${styles.auditTypeChip} ${styles[type]}`}>{labels[type]}</span>;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  onSuggestedPrompt,
  userName = 'Simran',
}) => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const actionableCount = PENDING_TASKS.filter(t => t.priority === 'high').length;

  return (
    <div className={styles.root} style={{ fontFamily: font }}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.greeting}>{greeting}, {userName}.</h1>
        <p className={styles.subline}>
          {actionableCount > 0
            ? `You have ${actionableCount} high-priority item${actionableCount > 1 ? 's' : ''} to action today.`
            : "Everything looks healthy. Here's your org overview."}
        </p>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiRow}>
        <KpiCard
          icon="🏢"
          iconVariant="blue"
          value={KPI.totalOrgs}
          label="Total orgs"
        />
        <KpiCard
          icon="👥"
          iconVariant="green"
          value={KPI.activeUsers}
          label="Active users"
        />
        <KpiCard
          icon="⚠️"
          iconVariant="amber"
          value={KPI.alerts}
          label="Alerts"
          badge={{ label: `${KPI.alerts} open`, variant: 'alert' }}
        />
        <KpiCard
          icon="📥"
          iconVariant="purple"
          value={KPI.pendingRequests}
          label="Pending requests"
          badge={{ label: `${KPI.pendingRequests} pending`, variant: 'pending' }}
        />
      </div>

      {/* Tasks + Audit log */}
      <div className={styles.midRow}>
        {/* Tasks to do */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Tasks to action</span>
            <span className={styles.panelCount}>{PENDING_TASKS.length}</span>
          </div>
          <ul className={styles.taskList}>
            {PENDING_TASKS.map((task) => (
              <li key={task.id} className={styles.taskItem}>
                {priorityDot(task.priority)}
                <div className={styles.taskBody}>
                  <div className={styles.taskTitle}>{task.title}</div>
                  <div className={styles.taskDetail}>{task.detail}</div>
                </div>
                <span className={styles.taskTime}>{task.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent changes */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Recent changes</span>
          </div>
          <ul className={styles.auditList}>
            {AUDIT_LOG.map((entry) => (
              <li key={entry.id} className={styles.auditItem}>
                {auditChip(entry.type)}
                <div className={styles.auditBody}>
                  <div className={styles.auditAction}>{entry.action}</div>
                  <div className={styles.auditTarget}>{entry.target}</div>
                </div>
                <span className={styles.auditTime}>{entry.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggested prompts */}
      <div className={styles.suggestedSection}>
        <span className={styles.suggestedLabel}>Try asking</span>
        <div className={styles.suggestedChips}>
          {SUGGESTED_PROMPTS.map((p) => (
            <button
              key={p.text}
              className={styles.chip}
              onClick={() => onSuggestedPrompt(p.full)}
            >
              <span className={styles.chipIcon}>{p.icon}</span>
              {p.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── KpiCard ───────────────────────────────────────────────────────────────────

interface KpiCardProps {
  icon: string;
  iconVariant: 'blue' | 'green' | 'amber' | 'purple';
  value: number;
  label: string;
  badge?: { label: string; variant: 'alert' | 'pending' };
}

const KpiCard: React.FC<KpiCardProps> = ({ icon, iconVariant, value, label, badge }) => (
  <div className={styles.kpiCard}>
    <div className={styles.kpiIconRow}>
      <div className={`${styles.kpiIcon} ${styles[iconVariant]}`}>{icon}</div>
      {badge && (
        <span className={`${styles.kpiBadge} ${styles[badge.variant]}`}>{badge.label}</span>
      )}
    </div>
    <div className={styles.kpiValue}>{value.toLocaleString()}</div>
    <div className={styles.kpiLabel}>{label}</div>
  </div>
);

export default CommandCenter;
