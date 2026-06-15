import React, { useMemo, useState } from 'react';
import { AppShell } from '../../components/AppShell';
import type { AppSidebarProps, SidebarTab, SidebarCategory } from '../../components/AppSidebar';
import type { GlobalHeaderProps } from '../../components/GlobalHeader';
import { Table, TableColumn } from '../../components/Table';
import { SearchInput } from '../../components/SearchInput';
import { Button } from '../../components/Button';
import { Popover } from '../../components/Popover';
import { Menu } from '../../components/Menu';
import { Chip } from '../../components/Chip';
import { Link } from '../../components/Link';
import { Horizontal, Vertical } from '../../components/Layout';
import { systemColors, referenceColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontSize, fontWeight } from '../../tokens/typography';
import { variables, VariableRow } from './data/mockData';
import { CreateVariableModal } from './components/CreateVariableModal';
import { VariableDetailModal } from './components/VariableDetailModal';

/**
 * VariablesDataType
 *
 * Goal: Admin variables list page — first page of a variables-creation flow
 * (formula variable type to follow).
 * User: Admin
 * Flows: Full admin shell (global header + icon rail + light sidebar with
 * org-scope toggle), variables list with working search and filter.
 */

const hexToRgba = (hex: string, alpha: number): string => {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

interface ActiveFilter {
  field: 'type' | 'sensitiveValues';
  label: string;
  value: string;
}

const FILTER_OPTIONS: ActiveFilter[] = [
  { field: 'type', label: 'Type: Table Mapping', value: 'Table Mapping' },
  { field: 'type', label: 'Type: Formula', value: 'Formula' },
  { field: 'sensitiveValues', label: 'Sensitive values: True', value: 'true' },
  { field: 'sensitiveValues', label: 'Sensitive values: False', value: 'false' },
];

const SIDEBAR_TABS: SidebarTab[] = [
  { id: 'insights', label: 'Insights', headerTitle: 'Insights' },
  { id: 'data', label: 'Data', headerTitle: 'Data' },
  { id: 'develop', label: 'Develop', headerTitle: 'Develop' },
  { id: 'admin', label: 'Admin', headerTitle: 'Admin' },
];

const SIDEBAR_CATEGORIES: Record<string, SidebarCategory[]> = {
  insights: [{ title: 'Navigation', items: [{ id: 'home', label: 'Home' }] }],
  data: [{ title: 'Data', items: [{ id: 'data-objects', label: 'Data objects' }] }],
  develop: [{ title: 'Developer', items: [{ id: 'playground', label: 'Playground' }] }],
  admin: [
    {
      title: 'Org management',
      items: [{ id: 'orgs', label: 'Orgs' }],
    },
    {
      title: 'User management',
      items: [{ id: 'users', label: 'Users' }],
    },
    {
      title: 'Authentication',
      items: [
        { id: 'local', label: 'Local' },
        { id: 'sso', label: 'Single sign on' },
      ],
    },
    {
      title: 'System activities',
      items: [
        { id: 'user-adoption', label: 'User adoption' },
        { id: 'object-usage', label: 'Object usage' },
        { id: 'performance-tracking', label: 'Performance tracking' },
      ],
    },
    {
      title: 'Application settings',
      items: [
        { id: 'thoughtspot-ai', label: 'ThoughtSpot AI' },
        { id: 'variables', label: 'Variables' },
        { id: 'search-spotiq', label: 'Search & SpotIQ' },
        { id: 'style-customisation', label: 'Style customisation' },
        { id: 'email-customisation', label: 'Email customisation' },
        { id: 'chart-customisation', label: 'Chart customisation' },
        { id: 'csv-upload', label: 'CSV upload' },
        { id: 'early-access', label: 'Early access features' },
      ],
    },
  ],
};

/** Light theme for AppSidebar — overrides its default dark CSS variables */
const sidebarLightVars = {
  '--as-bg': systemColors.light['background-sunken'],
  '--as-border': systemColors.light['border-divider'],
  '--as-panel-bg': systemColors.light['background-base'],
  '--as-panel-selected': systemColors.light['background-subtle'],
  '--as-text': systemColors.light['content-primary'],
  '--as-muted': systemColors.light['content-tertiary'],
  '--as-subtle': systemColors.light['content-tertiary'],
  '--as-icon': systemColors.light['content-secondary'],
  '--as-active': systemColors.light['content-brand'],
  '--as-active-bg': hexToRgba(referenceColors.brand['50'], 0.12),
  '--as-hover-bg': hexToRgba(referenceColors.brand['50'], 0.06),
  '--as-highlight-bg': hexToRgba(referenceColors.brand['50'], 0.3),
  '--as-focus': systemColors.light['border-focus'],
  '--as-scope-active': systemColors.light['content-brand'],
  '--as-scope-active-bg': systemColors.light['background-base'],
} as React.CSSProperties;

export const VariablesDataType: React.FC = () => {
  const [orgScope, setOrgScope] = useState('all');
  const [sidebarTab, setSidebarTab] = useState('admin');
  const [sidebarNav, setSidebarNav] = useState('variables');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<ActiveFilter[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailVariable, setDetailVariable] = useState<VariableRow | null>(null);

  const filteredData = useMemo(() => {
    return variables.filter((row) => {
      if (query && !row.name.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }
      return filters.every((f) => {
        if (f.field === 'type') return row.type === f.value;
        return String(row.sensitiveValues) === f.value;
      });
    });
  }, [query, filters]);

  const addFilter = (option: ActiveFilter) => {
    setFilters((prev) => [
      ...prev.filter((f) => f.field !== option.field),
      option,
    ]);
    setFilterOpen(false);
  };

  const removeFilter = (option: ActiveFilter) => {
    setFilters((prev) => prev.filter((f) => f.label !== option.label));
  };

  const headerProps: GlobalHeaderProps = {
    theme: 'light',
    searchPlaceholder: 'Search in your library',
    userName: 'Royal Enfield',
    notificationCount: 1,
  };

  const sidebarProps: AppSidebarProps = {
    tabs: SIDEBAR_TABS,
    activeTab: sidebarTab,
    onTabChange: setSidebarTab,
    categories: SIDEBAR_CATEGORIES,
    selectedNav: sidebarNav,
    onNavSelect: setSidebarNav,
    style: sidebarLightVars,
    ...(sidebarTab === 'admin'
      ? {
          scopeToggle: {
            options: [
              { id: 'all', label: 'All orgs' },
              { id: 'primary', label: 'Primary org' },
            ],
            activeId: orgScope,
            onChange: setOrgScope,
          },
        }
      : {}),
  };

  const columns: TableColumn<VariableRow>[] = [
    {
      key: 'name',
      label: 'Name',
      minWidth: '280px',
      render: (_, row) => (
        <Link
          href="#"
          onClick={(e) => { e.preventDefault(); setDetailVariable(row as unknown as VariableRow); }}
        >
          {row.name}
        </Link>
      ),
    },
    { key: 'type', label: 'Type', minWidth: '140px' },
    {
      key: 'sensitiveValues',
      label: 'Sensitive values',
      minWidth: '140px',
      render: (_, row) => (row.sensitiveValues ? 'True' : 'False'),
    },
    {
      key: 'valuesAssigned',
      label: 'Values assigned',
      minWidth: '140px',
    },
    {
      key: 'modifiedMins',
      label: 'Last modified',
      minWidth: '140px',
      sortable: true,
      render: (_, row) => row.modifiedLabel,
    },
    {
      key: 'actions',
      label: '',
      width: '56px',
      align: 'right',
      render: () => (
        <Button
          variant="tertiary"
          size="small"
          icon="more"
          iconOnly
          aria-label="Row actions"
        >
          Row actions
        </Button>
      ),
    },
  ];

  return (
    <>
    <AppShell
      headerProps={headerProps}
      sidebarProps={sidebarProps}
      contentBackground={systemColors.light['background-base']}
      style={{ height: '100vh' }}
    >
      <div style={{ padding: `${spacing.F}px ${spacing.H}px` }}>
        <Vertical gap={spacing.F}>
          {/* Page header */}
          <Vertical gap={spacing.B}>
            <h1
              style={{
                margin: 0,
                fontSize: fontSize['2xl'],
                fontWeight: fontWeight.semibold,
                color: systemColors.light['content-primary'],
              }}
            >
              Variables
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: fontSize.md,
                color: systemColors.light['content-secondary'],
              }}
            >
              Allows creating a variable which can be used for parameterizing
              metadata objects in ThoughtSpot.
            </p>
          </Vertical>

          {/* Toolbar */}
          <Horizontal justify="space-between" align="center">
            <Horizontal gap={spacing.C} align="center">
              <div style={{ width: 280 }}>
                <SearchInput
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Popover
                trigger="click"
                placement="bottom-start"
                isOpen={filterOpen}
                onOpenChange={setFilterOpen}
                content={
                  <Menu>
                    {FILTER_OPTIONS.map((option) => (
                      <Menu.Item
                        key={option.label}
                        onClick={() => addFilter(option)}
                      >
                        {option.label}
                      </Menu.Item>
                    ))}
                  </Menu>
                }
              >
                <Button variant="tertiary" icon="filter" iconPosition="leading">
                  Add filter
                </Button>
              </Popover>
              {filters.map((f) => (
                <Chip
                  key={f.label}
                  label={f.label}
                  deletable
                  onDelete={() => removeFilter(f)}
                />
              ))}
            </Horizontal>
            <Button
              variant="secondary"
              icon="plus"
              iconPosition="leading"
              onClick={() => setCreateModalOpen(true)}
            >
              Create variable
            </Button>
          </Horizontal>

          {/* Variables table */}
          <Table
            columns={columns as unknown as TableColumn[]}
            data={filteredData as unknown as Record<string, unknown>[]}
            rowKey="id"
            selectable
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            emptyMessage="No variables match your search or filters"
            hoverable
          />
        </Vertical>
      </div>
    </AppShell>

    <CreateVariableModal
      isOpen={createModalOpen}
      onClose={() => setCreateModalOpen(false)}
      adminScope={orgScope as 'all' | 'primary'}
    />

    <VariableDetailModal
      isOpen={detailVariable !== null}
      onClose={() => setDetailVariable(null)}
      variable={detailVariable}
    />
  </>
  );
};

export default VariablesDataType;
