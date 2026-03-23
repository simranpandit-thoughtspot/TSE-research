import React, { useState } from 'react';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/icons';
import { chatPanelStyles as s, colors } from '../styles';
import type { ChatHistory } from '../data/mockData';

/** Pre-populated chat items matching ThoughtSpot Spotter panel */
const defaultChats = [
  'Conversation length Spotter …',
  'Histogram of daily user ques…',
  'Questions and users by work…',
  'Guardrails overview',
  'Inactive DNS records with tim…',
  'Weekly retention for Spotter 3',
  'Booked ACV last quarter',
  'Spotter issues on Slack last w…',
  'Spotter 3 issues on Slack',
  'Spotter 3 latest issues on Slack',
  'Spotter 3 issues on Slack',
  'Booked ACV last quarter',
  'Agent customization and res…',
  'Failure rates Spotter 2 vs 3 Fe…',
  'Time tracking in spotter reaso…',
  'Opportunities closed won wit…',
];

interface SpotterChatPanelProps {
  chatHistory: ChatHistory[];
  onCollapse: () => void;
}

export const SpotterChatPanel: React.FC<SpotterChatPanelProps> = ({
  chatHistory,
  onCollapse,
}) => {
  const [activeChat, setActiveChat] = useState<string | null>('Histogram of daily user ques…');

  // Merge dynamic history with defaults
  const dynamicTitles = chatHistory.map((c) =>
    c.title.length > 35 ? c.title.slice(0, 32) + '…' : c.title,
  );
  const allChats = [...dynamicTitles, ...defaultChats];

  return (
    <div style={s.container}>
      {/* Header */}
      <div style={s.header}>
        <h3 style={s.title}>Spotter</h3>
        <Button variant="tertiary" size="small" icon="expand" onClick={onCollapse}>
          {''}
        </Button>
      </div>

      {/* New chat button */}
      <div style={s.newChatBtn}>
        <Button variant="secondary" size="basic" icon="plus" iconPosition="leading" fullWidth>
          New chat
        </Button>
      </div>

      {/* Section label */}
      <div style={s.sectionLabel}>Last 7 days</div>

      {/* Chat list */}
      <div style={s.chatList as React.CSSProperties}>
        {allChats.map((title, i) => (
          <button
            key={`${title}-${i}`}
            style={{
              ...s.chatItem,
              ...(activeChat === title ? s.chatItemActive : {}),
            }}
            onClick={() => setActiveChat(title)}
          >
            {title}
          </button>
        ))}
      </div>

      {/* Pinned item at bottom */}
      <div style={s.pinnedItem}>
        <Icon name="pin" size="s" color={colors.textSecondary} />
        <span>Spotter best practices</span>
      </div>
    </div>
  );
};
