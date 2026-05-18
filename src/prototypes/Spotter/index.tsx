import React, { useState } from 'react';
import { GlobalHeader } from '@components/GlobalHeader';
import {
  SpotterShell,
  SpotterLeftSide,
  SpotterRail,
  SpotterRailItem,
  SpotterPanel,
  SpotterPanelAction,
  SpotterPanelSection,
  SpotterPanelItem,
  SpotterLeftToggle,
  SpotterWelcome,
  type SpotterLeftMode,
} from '@spotter/page';
import { SpotterChatProvider, useSpotterChat } from '@spotter/chat';
import { ChatCanvas } from './components/ChatCanvas';
import {
  chats,
  customSpotters,
  dataModels,
} from './data/mockData';

const USER_AVATAR_URL = 'https://i.pravatar.cc/64?img=47';

/**
 * Spotter prototype. Wraps the chat provider so any subtree using
 * `useSpotterChat()` can submit prompts and read state.
 */
export const Spotter: React.FC = () => {
  return (
    <SpotterChatProvider mode="canned">
      <SpotterInner />
    </SpotterChatProvider>
  );
};

const SpotterInner: React.FC = () => {
  const [mode, setMode] = useState<SpotterLeftMode>('panel');
  const [selectedSpotter, setSelectedSpotter] = useState<string>('default');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [promptValue, setPromptValue] = useState('');
  const [dataModelId, setDataModelId] = useState(dataModels[0].id);

  const { state, send, clear } = useSpotterChat();
  const isEmpty = state.messages.length === 0;

  const toggleMode = (): void => {
    setMode((prev) => (prev === 'rail' ? 'panel' : 'rail'));
  };

  const handleSubmit = (value: string): void => {
    send(value);
    setPromptValue('');
  };

  const handleQuickAction = (id: string): void => {
    // Quick actions are stubs for now — translate them to a prompt.
    const promptByAction: Record<string, string> = {
      'quick-search': 'Show me total sales by month',
      'deep-analysis': 'Analyze sales for the upcoming fall and winter season',
      'know-your-data': 'What are the most common questions asked about this data?',
    };
    const text = promptByAction[id];
    if (text) send(text);
  };

  const handleNewChat = (): void => {
    clear();
    setPromptValue('');
    setSelectedChat(null);
    setSelectedSpotter('default');
  };

  const activeDataModel = dataModels.find((m) => m.id === dataModelId) ?? dataModels[0];

  const promptProps = {
    value: promptValue,
    onChange: setPromptValue,
    onSubmit: handleSubmit,
    dataModelLabel: activeDataModel.name,
    onDataModelClick: () => {
      const next = dataModels[(dataModels.indexOf(activeDataModel) + 1) % dataModels.length];
      setDataModelId(next.id);
    },
  };

  const railContent = (
    <SpotterRail
      top={
        <>
          <SpotterLeftToggle mode={mode} onClick={toggleMode} />
          <SpotterRailItem icon="plus" label="New chat" onClick={handleNewChat} />
        </>
      }
      bottom={<SpotterRailItem icon="book-closed" label="Library" />}
    />
  );

  const panelContent = (
    <SpotterPanel
      top={<SpotterLeftToggle mode={mode} onClick={toggleMode} />}
      primaryAction={
        <SpotterPanelAction
          label="New chat"
          icon="plus"
          onClick={handleNewChat}
        />
      }
      footer={<SpotterPanelAction label="Settings" icon="settings" />}
    >
      <SpotterPanelSection>
        <SpotterPanelItem
          label="Spotter (Default)"
          selected={selectedSpotter === 'default'}
          onClick={() => setSelectedSpotter('default')}
        />
      </SpotterPanelSection>

      <SpotterPanelSection label="Custom spotters">
        {customSpotters.map((spotter) => (
          <SpotterPanelItem
            key={spotter.id}
            label={spotter.name}
            selected={selectedSpotter === spotter.id}
            onClick={() => setSelectedSpotter(spotter.id)}
          />
        ))}
        <SpotterPanelItem
          label="View library"
          trailingIcon="chevron-right"
          selected={selectedSpotter === 'library'}
          onClick={() => setSelectedSpotter('library')}
        />
      </SpotterPanelSection>

      <SpotterPanelSection label="Chats">
        {chats.map((chat) => (
          <SpotterPanelItem
            key={chat.id}
            label={chat.title}
            selected={selectedChat === chat.id}
            onClick={() => setSelectedChat(chat.id)}
          />
        ))}
      </SpotterPanelSection>
    </SpotterPanel>
  );

  return (
    <SpotterShell
      header={
        <GlobalHeader
          theme="light"
          showHamburger
          onHamburgerClick={toggleMode}
          searchPlaceholder="Search in your library"
          showKeyboardHint={false}
          notificationCount={1}
          userName="Alex"
          userAvatar={USER_AVATAR_URL}
        />
      }
      leftSide={
        <SpotterLeftSide
          mode={mode}
          onToggle={toggleMode}
          rail={railContent}
          panel={panelContent}
        />
      }
    >
      {isEmpty ? (
        <SpotterWelcome
          promptProps={promptProps}
          quickActionProps={{ onAction: handleQuickAction }}
        />
      ) : (
        <ChatCanvas
          messages={state.messages}
          promptProps={promptProps}
          userAvatarUrl={USER_AVATAR_URL}
          userInitial="A"
          agentAvatarIcon="ai"
        />
      )}
    </SpotterShell>
  );
};

export default Spotter;
