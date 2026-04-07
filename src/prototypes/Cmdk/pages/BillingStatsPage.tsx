// @ts-nocheck
import React, { useState } from 'react';
import { Card, Table, Tabs, Typography } from '../../../components';

interface BillingRow {
  id: string;
  org: string;
  credits: string;
  cost: string;
  period: string;
}

const BILLING_ROWS: BillingRow[] = [
  { id: 'bill-1', org: 'Primary Org', credits: '12,480', cost: '$24,960', period: 'Current month' },
  { id: 'bill-2', org: 'Sales Sandbox', credits: '3,420', cost: '$6,840', period: 'Current month' },
  { id: 'bill-3', org: 'Analytics Lab', credits: '1,280', cost: '$2,560', period: 'Current month' },
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'usage', label: 'Usage' },
  { id: 'invoices', label: 'Invoices' },
];

export const BillingStatsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div style={styles.page}>
      <div>
        <Typography variant="page-title" noMargin>
          Billing stats
        </Typography>
        <Typography variant="body-normal" color="gray" noMargin>
          Cost, credits, and usage trends by organization
        </Typography>
      </div>

      <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div style={styles.summaryGrid}>
        <Card>
          <Card.Body>
            <Typography variant="content-label-subhead" color="gray" noMargin>
              Estimated monthly cost
            </Typography>
            <Typography variant="section-label" noMargin>
              $34,360
            </Typography>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Typography variant="content-label-subhead" color="gray" noMargin>
              Credits consumed
            </Typography>
            <Typography variant="section-label" noMargin>
              17,180
            </Typography>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Typography variant="content-label-subhead" color="gray" noMargin>
              Cost delta
            </Typography>
            <Typography variant="section-label" noMargin>
              +4.1%
            </Typography>
          </Card.Body>
        </Card>
      </div>

      <Card>
        <Card.Header title="Organization breakdown" subtitle="Current billing period" />
        <Card.Body noPadding>
          <Table<BillingRow>
            columns={[
              { key: 'org', label: 'Organization', sortable: true },
              { key: 'credits', label: 'Credits', align: 'right', width: '160px' },
              { key: 'cost', label: 'Cost', align: 'right', width: '160px' },
              { key: 'period', label: 'Period', width: '160px' },
            ]}
            data={BILLING_ROWS}
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
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 12,
  },
};

export default BillingStatsPage;
