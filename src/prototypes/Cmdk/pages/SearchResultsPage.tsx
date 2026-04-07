// @ts-nocheck
import React, { useMemo, useState } from 'react';
import { Card, SearchInput, Table, Typography } from '../../../components';
import type { ThoughtSpotObject, ThoughtSpotObjectType } from '../data/mockData';

interface SearchResultRow {
  id: string;
  name: string;
  type: ThoughtSpotObjectType;
  author: string;
  modified: string;
  tags: string;
}

export interface SearchResultsPageProps {
  query: string;
  objectType?: string;
  objects: ThoughtSpotObject[];
  onQueryChange: (query: string) => void;
  onOpenObject: (objectId: string, objectType: ThoughtSpotObjectType) => void;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  query,
  objectType,
  objects,
  onQueryChange,
  onOpenObject,
}) => {
  const [selectedType, setSelectedType] = useState<string>(objectType ?? 'All');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('All authors');

  const objectTypes = useMemo(() => ['All', ...new Set(objects.map((object) => object.type))], [objects]);
  const authors = useMemo(() => ['All authors', ...new Set(objects.map((object) => object.author))], [objects]);

  const rows: SearchResultRow[] = useMemo(() => {
    return objects
      .filter((object) => {
        const matchesQuery = !query.trim()
          || object.name.toLowerCase().includes(query.toLowerCase())
          || object.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
        const matchesType = selectedType === 'All' || object.type === selectedType;
        const matchesAuthor = selectedAuthor === 'All authors' || object.author === selectedAuthor;
        return matchesQuery && matchesType && matchesAuthor;
      })
      .map((object) => ({
        id: object.id,
        name: object.name,
        type: object.type,
        author: object.author,
        modified: object.modified,
        tags: object.tags.slice(0, 3).join(', '),
      }));
  }, [objects, query, selectedType, selectedAuthor]);

  return (
    <div style={styles.layout}>
      <aside style={styles.filtersRail}>
        <Card>
          <Card.Header title="Filters" subtitle="Narrow search results" />
          <Card.Body>
            <Typography variant="content-label-subhead" color="gray" noMargin>
              Object type
            </Typography>
            <div style={styles.filterList}>
              {objectTypes.map((type) => (
                <button
                  key={type}
                  style={{
                    ...styles.filterButton,
                    ...(selectedType === type ? styles.filterButtonActive : {}),
                  }}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
            <Typography variant="content-label-subhead" color="gray" noMargin>
              Author
            </Typography>
            <div style={styles.filterList}>
              {authors.slice(0, 8).map((author) => (
                <button
                  key={author}
                  style={{
                    ...styles.filterButton,
                    ...(selectedAuthor === author ? styles.filterButtonActive : {}),
                  }}
                  onClick={() => setSelectedAuthor(author)}
                >
                  {author}
                </button>
              ))}
            </div>
          </Card.Body>
        </Card>
      </aside>

      <section style={styles.resultsPane}>
        <div style={styles.header}>
          <Typography variant="page-title" noMargin>
            Search Results
          </Typography>
          <Typography variant="body-normal" color="gray" noMargin>
            {rows.length} results
          </Typography>
        </div>

        <SearchInput
          placeholder="Search objects, tags, or authors"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />

        <Table<SearchResultRow>
          columns={[
            {
              key: 'name',
              label: 'Name',
              sortable: true,
              render: (value, row) => (
                <button style={styles.linkButton} onClick={() => onOpenObject(row.id, row.type)}>
                  {String(value)}
                </button>
              ),
            },
            { key: 'type', label: 'Type', width: '160px', sortable: true },
            { key: 'author', label: 'Author', width: '200px', sortable: true },
            { key: 'modified', label: 'Modified', width: '160px' },
            { key: 'tags', label: 'Tags' },
          ]}
          data={rows}
          rowKey="id"
          hoverable
          striped
          emptyMessage="No objects match these filters"
        />
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  layout: {
    display: 'grid',
    gridTemplateColumns: '280px minmax(0, 1fr)',
    gap: 16,
    padding: 24,
  },
  filtersRail: {
    position: 'sticky',
    top: 24,
    alignSelf: 'start',
  },
  resultsPane: {
    display: 'grid',
    gap: 12,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  filterList: {
    display: 'grid',
    gap: 6,
    marginBottom: 14,
    marginTop: 6,
  },
  filterButton: {
    border: '1px solid #EAEDF2',
    borderRadius: 6,
    background: '#fff',
    color: '#1D232F',
    fontSize: 12,
    textAlign: 'left',
    padding: '6px 8px',
    cursor: 'pointer',
  },
  filterButtonActive: {
    borderColor: '#71A1F4',
    color: '#2770EF',
    background: 'rgba(113, 161, 244, 0.08)',
  },
  linkButton: {
    border: 'none',
    background: 'transparent',
    color: '#2770EF',
    cursor: 'pointer',
    font: 'inherit',
    padding: 0,
    textAlign: 'left',
  },
};

export default SearchResultsPage;
