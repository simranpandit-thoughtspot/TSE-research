import React from 'react';
import { ViewHeader } from './ViewHeader';
import { EditToolbar } from './EditToolbar';
import { EditSubHeader } from './EditSubHeader';
import { colors, layout } from './styles';

export interface LiveboardHeaderProps {
  mode: 'view' | 'edit';
  title: string;
  activeTab: string;
  tabs: { label: string; id: string }[];
  filters: { label: string; value: string }[];
  onTabChange: (id: string) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onToggleSpotter?: () => void;
  spotterOpen?: boolean;
}

// ThoughtSpot primary nav bar (dark, 60px)
const PrimaryNav: React.FC = () => (
  <div style={s.primaryNav}>
    <svg width="24" height="24" viewBox="0 0 47.4216 48" fill="none">
      <path d="M47.4216 0H0V8.78311H47.4216V0Z" fill="currentColor" />
      <path d="M47.4216 11.7108H29.4035V20.4939H47.4216V11.7108Z" fill="currentColor" />
      <path d="M11.512 11.7108H0V20.4939H11.512C15.8132 20.4939 19.3192 23.9999 19.3192 28.3011V47.4216H28.1024V28.3011C28.1024 19.1566 20.6566 11.7108 11.512 11.7108Z" fill="currentColor" />
      <path d="M38.4216 33.253C34.3554 33.253 31.0481 36.5603 31.0481 40.6265C31.0481 44.6928 34.3554 48 38.4216 48C42.4879 48 45.7951 44.6928 45.7951 40.6265C45.7951 36.5603 42.4879 33.253 38.4216 33.253Z" fill="currentColor" />
    </svg>
  </div>
);

export const LiveboardHeader: React.FC<LiveboardHeaderProps> = ({
  mode,
  title,
  activeTab,
  tabs,
  filters,
  onTabChange,
  onEdit,
  onSave,
  onCancel,
  onToggleSpotter,
  spotterOpen,
}) => {
  if (mode === 'view') {
    return (
      <>
        <PrimaryNav />
        <ViewHeader
          title={title}
          activeTab={activeTab}
          tabs={tabs}
          filters={filters}
          onTabChange={onTabChange}
          onEdit={onEdit}
        />
      </>
    );
  }

  return (
    <>
      <EditToolbar
        onSave={onSave}
        onCancel={onCancel}
        onToggleSpotter={onToggleSpotter}
        spotterOpen={spotterOpen}
      />
      <EditSubHeader
        title={title}
        activeTab={activeTab}
        tabs={tabs}
        filters={filters}
        onTabChange={onTabChange}
      />
    </>
  );
};

const s: Record<string, React.CSSProperties> = {
  primaryNav: {
    display: 'flex',
    alignItems: 'center',
    height: layout.headerHeight,
    padding: '0 24px',
    background: colors.editHeaderBg,
    color: colors.textOnDark,
    flexShrink: 0,
  },
};
