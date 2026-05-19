import React from 'react';
import { BrandMark } from '@components/BrandMark';
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
    <BrandMark pixelSize={24} aria-hidden />
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
