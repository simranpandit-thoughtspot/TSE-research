// @ts-nocheck
import React from 'react';
import { Button, Card, ProgressBar, Table, Typography } from '../../../components';
import type { ThoughtSpotObject } from '../data/mockData';

interface InsightRow {
  id: string;
  metric: string;
  current: string;
  target: string;
  trend: string;
}

const INSIGHT_ROWS: InsightRow[] = [
  { id: 'ins-1', metric: 'Pipeline conversion', current: '31.2%', target: '30.0%', trend: 'Up' },
  { id: 'ins-2', metric: 'Average deal size', current: '$48.3K', target: '$45.0K', trend: 'Up' },
  { id: 'ins-3', metric: 'Forecast accuracy', current: '92%', target: '95%', trend: 'Down' },
];

export interface LiveboardDetailPageProps {
  liveboard: ThoughtSpotObject | null;
  onBack: () => void;
}

export const LiveboardDetailPage: React.FC<LiveboardDetailPageProps> = ({ liveboard, onBack }) => {
  if (!liveboard) {
    return (
      <div style={styles.emptyState}>
        <Typography variant="section-label" noMargin>
          Liveboard not found
        </Typography>
        <Button variant="secondary" onClick={onBack}>
          Back to Liveboards
        </Button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <div style={styles.headerLeft}>
          <Button variant="tertiary" icon="arrow-left" iconPosition="leading" onClick={onBack}>
            Back
          </Button>
          <div>
            <Typography variant="page-title" noMargin>
              {liveboard.name}
            </Typography>
            <Typography variant="body-normal" color="gray" noMargin>
              by {liveboard.author} - updated {liveboard.modified}
            </Typography>
          </div>
        </div>
        <Button variant="secondary">Share</Button>
      </div>

      <div style={styles.metricsGrid}>
        <Card>
          <Card.Body>
            <Typography variant="content-label-subhead" color="gray" noMargin>
              Views
            </Typography>
            <Typography variant="section-label" noMargin>
              {liveboard.views ?? 0}
            </Typography>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Typography variant="content-label-subhead" color="gray" noMargin>
              Favorites
            </Typography>
            <Typography variant="section-label" noMargin>
              {liveboard.favorites ?? 0}
            </Typography>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Typography variant="content-label-subhead" color="gray" noMargin>
              Charts
            </Typography>
            <Typography variant="section-label" noMargin>
              {liveboard.chartsCount ?? 0}
            </Typography>
          </Card.Body>
        </Card>
      </div>

      <Card>
        <Card.Header title="Performance overview" subtitle="Simulated visual panel for fullscreen liveboard detail" />
        <Card.Body>
          <div style={styles.progressStack}>
            <ProgressBar label="Revenue target" value={74} showValue color="blue" />
            <ProgressBar label="Retention target" value={68} showValue color="green" />
            <ProgressBar label="Adoption target" value={52} showValue color="yellow" />
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title="Insights table" subtitle="Representative content block" />
        <Card.Body noPadding>
          <Table<InsightRow>
            columns={[
              { key: 'metric', label: 'Metric', sortable: true },
              { key: 'current', label: 'Current', align: 'right', width: '140px' },
              { key: 'target', label: 'Target', align: 'right', width: '140px' },
              { key: 'trend', label: 'Trend', width: '120px' },
            ]}
            data={INSIGHT_ROWS}
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
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: 24,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
    padding: 24,
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 12,
  },
  progressStack: {
    display: 'grid',
    gap: 16,
  },
};

export default LiveboardDetailPage;
