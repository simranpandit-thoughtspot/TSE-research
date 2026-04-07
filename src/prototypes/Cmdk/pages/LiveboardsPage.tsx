// @ts-nocheck
import React, { useMemo, useState } from 'react';
import { Button, SearchInput, Table, Tabs, Typography } from '../../../components';
import type { ThoughtSpotObject } from '../data/mockData';

interface LiveboardRow {
  id: string;
  name: string;
  author: string;
  modified: string;
  charts: number;
  views: number;
}

export interface LiveboardsPageProps {
  objects: ThoughtSpotObject[];
  onOpenLiveboard: (id: string) => void;
}

export const LiveboardsPage: React.FC<LiveboardsPageProps> = ({ objects, onOpenLiveboard }) => {
  const [tab, setTab] = useState<'all' | 'yours'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const liveboards = useMemo(
    () => objects.filter((object) => object.type === 'Liveboard'),
    [objects],
  );

  const filteredRows: LiveboardRow[] = useMemo(() => {
    return liveboards
      .filter((board) => {
        if (tab === 'yours' && board.author.toLowerCase() !== 'mohammed.faris') {
          return false;
        }
        if (!searchQuery.trim()) {
          return true;
        }
        return board.name.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .map((board) => ({
        id: board.id,
        name: board.name,
        author: board.author,
        modified: board.modified,
        charts: board.chartsCount ?? 0,
        views: board.views ?? 0,
      }));
  }, [liveboards, tab, searchQuery]);

  return (
    <div style={styles.page}>
      <div style={styles.topRow}>
        <div>
          <Typography variant="page-title" noMargin>
            Liveboards
          </Typography>
          <Typography variant="body-normal" color="gray" noMargin>
            Browse, search, and open dashboard content
          </Typography>
        </div>
        <Button variant="primary">Create Liveboard</Button>
      </div>

      <div style={styles.toolbar}>
        <Tabs
          tabs={[
            { id: 'all', label: 'All' },
            { id: 'yours', label: 'Yours' },
          ]}
          activeTab={tab}
          onTabChange={(tabId) => setTab(tabId as 'all' | 'yours')}
        />
        <div style={styles.toolbarRight}>
          <SearchInput
            placeholder="Search liveboards"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          {selectedKeys.length > 0 && (
            <Button variant="secondary" size="small">
              Bulk actions ({selectedKeys.length})
            </Button>
          )}
        </div>
      </div>

      <Table<LiveboardRow>
        columns={[
          {
            key: 'name',
            label: 'Name',
            sortable: true,
            render: (value, row) => (
              <button style={styles.linkButton} onClick={() => onOpenLiveboard(row.id)}>
                {String(value)}
              </button>
            ),
          },
          { key: 'author', label: 'Author', sortable: true, width: '220px' },
          { key: 'charts', label: 'Charts', align: 'right', sortable: true, width: '120px' },
          { key: 'views', label: 'Views', align: 'right', sortable: true, width: '120px' },
          { key: 'modified', label: 'Modified', sortable: true, width: '160px' },
        ]}
        data={filteredRows}
        rowKey="id"
        selectable
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        hoverable
        striped
      />
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
  topRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  toolbarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    width: 380,
  },
  linkButton: {
    border: 'none',
    background: 'transparent',
    color: 'var(--color-text-link, #2770EF)',
    cursor: 'pointer',
    font: 'inherit',
    padding: 0,
    textAlign: 'left',
  },
};

export default LiveboardsPage;
