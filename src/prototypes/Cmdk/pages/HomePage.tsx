// @ts-nocheck
import React from 'react';
import { Button, Card, Table, Typography } from '../../../components';
import { referenceColors } from '../../../tokens/colors';

interface HomeRow {
  id: string;
  object: string;
  author: string;
  modified: string;
  type: string;
}

export interface CmdkHomePageProps {
  onOpenLiveboards: () => void;
  onOpenSpotter: () => void;
}

const RECENT_ROWS: HomeRow[] = [
  { id: 'row-1', object: 'Design : Muze + Tooltips', author: 'mohammed.faris', modified: '4 days ago', type: 'Liveboard' },
  { id: 'row-2', object: 'Daily Sales vs Target', author: 'Anya Sharma', modified: '4 hours ago', type: 'Answer' },
  { id: 'row-3', object: 'Retail Sales Model', author: 'Tech Team', modified: '2 weeks ago', type: 'Data Model' },
  { id: 'row-4', object: 'Executive Reports', author: 'Anya Sharma', modified: '1 day ago', type: 'Collection' },
  { id: 'row-5', object: 'Snowflake Production', author: 'Data Engineering', modified: '1 day ago', type: 'Connection' },
];

const WATCHLIST_ITEMS = [
  { id: 'watch-1', title: 'Revenue', value: '$4.2M', delta: '+6.4%', tone: referenceColors.green['60'] },
  { id: 'watch-2', title: 'Active users', value: '18.7K', delta: '+3.1%', tone: referenceColors.green['60'] },
  { id: 'watch-3', title: 'Open incidents', value: '3', delta: '-2', tone: referenceColors.red['60'] },
  { id: 'watch-4', title: 'Pipeline', value: '$11.9M', delta: '+1.8%', tone: referenceColors.green['60'] },
];

export const HomePage: React.FC<CmdkHomePageProps> = ({ onOpenLiveboards, onOpenSpotter }) => {
  return (
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <div>
          <Typography variant="page-title" noMargin>
            Home
          </Typography>
          <Typography variant="body-normal" color="gray" noMargin>
            Watch key metrics and jump back into recent work
          </Typography>
        </div>
        <div style={styles.headerActions}>
          <Button variant="secondary" onClick={onOpenSpotter}>
            Open Spotter
          </Button>
          <Button variant="primary" onClick={onOpenLiveboards}>
            View Liveboards
          </Button>
        </div>
      </div>

      <div style={styles.watchlistGrid}>
        {WATCHLIST_ITEMS.map((item) => (
          <Card key={item.id}>
            <Card.Body>
              <Typography variant="content-label-subhead" color="gray" noMargin>
                {item.title}
              </Typography>
              <Typography variant="section-label" noMargin>
                {item.value}
              </Typography>
              <Typography variant="footnote" noMargin style={{ color: item.tone }}>
                {item.delta} vs last week
              </Typography>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Card>
        <Card.Header title="Recently viewed" subtitle="Objects opened in the last 7 days" />
        <Card.Body noPadding>
          <Table<HomeRow>
            columns={[
              { key: 'object', label: 'Object', sortable: true },
              { key: 'type', label: 'Type', sortable: true, width: '180px' },
              { key: 'author', label: 'Author', width: '220px' },
              { key: 'modified', label: 'Modified', width: '160px' },
            ]}
            data={RECENT_ROWS}
            rowKey="id"
            hoverable
            bordered={false}
            striped
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
    gap: 20,
    padding: 24,
  },
  headerRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerActions: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  watchlistGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: 12,
  },
};

export default HomePage;
