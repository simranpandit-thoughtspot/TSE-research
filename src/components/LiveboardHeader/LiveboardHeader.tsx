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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M21.0234 18.0469C22.6674 18.0469 24.0008 19.3795 24.001 21.0234C24.001 22.6675 22.6675 24.001 21.0234 24.001C19.3795 24.0008 18.0469 22.6674 18.0469 21.0234C18.047 19.3796 19.3796 18.047 21.0234 18.0469ZM23.8135 7.44141H15.627V23.8125H14.1387V7.44141H12.6514V23.8125H11.1631V7.44141H9.6748V23.8125H8.18652V7.44141H0V5.95312H23.8135V7.44141ZM23.8135 4.46484H0V2.97656H23.8135V4.46484ZM23.8135 1.48828H0V0H23.8135V1.48828Z" fill="currentColor" />
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
