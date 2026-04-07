// @ts-nocheck
import React, { useMemo, useState } from 'react';
import { Card, Table, Tabs, Typography } from '../../../components';

interface AdminRecord {
  id: string;
  name: string;
  status: string;
  owner: string;
  updated: string;
}

const PAGE_TABS: Record<string, Array<{ id: string; label: string }>> = {
  'user-management': [
    { id: 'users', label: 'Users' },
    { id: 'groups', label: 'Groups' },
    { id: 'authentication', label: 'Authentication' },
  ],
  'usage-insights': [
    { id: 'user-adoption', label: 'User adoption' },
    { id: 'object-usage', label: 'Object usage' },
    { id: 'performance-tracking', label: 'Performance tracking' },
  ],
  'general-settings': [
    { id: 'language', label: 'Language' },
    { id: 'time-zone', label: 'Time zone' },
    { id: 'currency', label: 'Currency' },
    { id: 'administration', label: 'Administration' },
  ],
  'agent-settings': [
    { id: 'spotter', label: 'Spotter' },
    { id: 'spotter-viz', label: 'Spotter Viz' },
    { id: 'spotter-model', label: 'Spotter Model' },
  ],
};

export interface AdminContentPageProps {
  pageId: string;
  pageLabel: string;
}

export const AdminContentPage: React.FC<AdminContentPageProps> = ({ pageId, pageLabel }) => {
  const tabs = PAGE_TABS[pageId] ?? [{ id: 'overview', label: 'Overview' }];
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const records = useMemo<AdminRecord[]>(
    () => [
      { id: 'rec-1', name: `${pageLabel} policy`, status: 'Active', owner: 'Platform team', updated: '2 days ago' },
      { id: 'rec-2', name: `${pageLabel} baseline`, status: 'Draft', owner: 'Security team', updated: '6 days ago' },
      { id: 'rec-3', name: `${pageLabel} rollout`, status: 'Active', owner: 'Admins', updated: '1 day ago' },
    ],
    [pageLabel],
  );

  return (
    <div style={styles.page}>
      <div>
        <Typography variant="page-title" noMargin>
          {pageLabel}
        </Typography>
        <Typography variant="body-normal" color="gray" noMargin>
          Administrative configuration and governance controls
        </Typography>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <Card>
        <Card.Header title={`${tabs.find((tab) => tab.id === activeTab)?.label ?? 'Overview'} settings`} />
        <Card.Body noPadding>
          <Table<AdminRecord>
            columns={[
              { key: 'name', label: 'Configuration', sortable: true },
              { key: 'status', label: 'Status', width: '140px' },
              { key: 'owner', label: 'Owner', width: '220px' },
              { key: 'updated', label: 'Updated', width: '160px' },
            ]}
            data={records}
            rowKey="id"
            striped
            hoverable
          />
        </Card.Body>
      </Card>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    display: 'grid',
    gap: 14,
    padding: 24,
  },
};

export default AdminContentPage;
