import React from 'react';
import { Horizontal } from '@components/Layout';
import type { IconName } from '@components/icons';
import { QuickAction } from './QuickAction';

export interface QuickActionItem {
  id: string;
  label: string;
  icon?: IconName | React.ReactNode;
}

export interface QuickActionRowProps {
  actions?: QuickActionItem[];
  onAction?: (id: string) => void;
  className?: string;
}

const DEFAULT_ACTIONS: QuickActionItem[] = [
  { id: 'quick-search', label: 'Quick search', icon: 'explore' },
  { id: 'deep-analysis', label: 'Deep analysis', icon: 'r-analysis' },
  { id: 'know-your-data', label: 'Know your data', icon: 'bulb' },
];

export const QuickActionRow: React.FC<QuickActionRowProps> = ({
  actions = DEFAULT_ACTIONS,
  onAction,
  className,
}) => {
  return (
    <Horizontal gap={12} justify="center" align="center" wrap className={className}>
      {actions.map((action) => (
        <QuickAction
          key={action.id}
          label={action.label}
          icon={action.icon}
          onClick={() => onAction?.(action.id)}
        />
      ))}
    </Horizontal>
  );
};

QuickActionRow.displayName = 'QuickActionRow';

export default QuickActionRow;
