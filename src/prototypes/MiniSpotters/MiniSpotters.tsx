import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AppShell } from '../../components/AppShell';
import type { AppSidebarProps, SidebarTab, SidebarCategory } from '../../components/AppSidebar';
import type { GlobalHeaderProps } from '../../components/GlobalHeader';
import { Button } from '../../components/Button';
import {
  SpotterChatPanel,
  PromptInput,
  ContextChips,
  SuggestedQuestions,
  CreatorWizard,
  QuickInsights,
} from './components';
import { homeStyles, chatStyles, colors, font } from './styles';
import { spacing } from '../../tokens/spacing';
import {
  miniSpotters as defaultSpotters,
  agentResponses,
  fallbackResponse,
  type ChatMessage,
  type ChatHistory,
  type MiniSpotter,
} from './data/mockData';

type SidebarTabId = 'insights' | 'data' | 'develop' | 'admin';

const SIDEBAR_TABS: SidebarTab[] = [
  { id: 'insights', label: 'Insights', headerTitle: 'Insights' },
  { id: 'data', label: 'Data', headerTitle: 'Data Workspace' },
  { id: 'develop', label: 'Develop', headerTitle: 'Develop' },
  { id: 'admin', label: 'Admin', headerTitle: 'Admin Settings' },
];

const SIDEBAR_CATEGORIES: Record<SidebarTabId, SidebarCategory[]> = {
  insights: [
    {
      title: '',
      items: [
        { id: 'home', label: 'Home' },
        { id: 'spotter', label: 'Spotter' },
        { id: 'spotlight-workspace', label: 'SpotLight Workspace' },
      ],
    },
    {
      title: 'Library',
      items: [
        { id: 'liveboards', label: 'Liveboards' },
        { id: 'answers', label: 'Answers' },
        { id: 'collections', label: 'Collections' },
      ],
    },
    {
      title: 'Analysis & Alerts',
      items: [
        { id: 'liveboard-schedules', label: 'Liveboard Schedules' },
        { id: 'monitor-subscriptions', label: 'Monitor subscriptions' },
        { id: 'spotiq-analysis', label: 'SpotIQ analysis' },
      ],
    },
    {
      title: 'Favourites',
      items: [
        { id: 'quarterly-acv', label: 'Quarterly ACV' },
        { id: 'onespot', label: 'OneSpot' },
        { id: 'insights-agents', label: 'Insights Agents + Core -...' },
        { id: 'spotter-conversations', label: 'Spotter Conversations' },
      ],
    },
  ],
  data: [
    {
      title: 'Data Workspace',
      items: [
        { id: 'data-objects', label: 'Data objects' },
        { id: 'connections', label: 'Connections' },
        { id: 'utilities', label: 'Utilities' },
      ],
    },
  ],
  develop: [
    {
      title: 'Developer',
      items: [
        { id: 'playground', label: 'Playground' },
        { id: 'custom-actions', label: 'Custom actions' },
      ],
    },
  ],
  admin: [
    {
      title: 'Admin',
      items: [
        { id: 'admin-dashboard', label: 'Admin Dashboard' },
      ],
    },
  ],
};

type ViewMode = 'home' | 'chat';

/** Spotter agent avatar SVG */
const AgentAvatar: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="14" fill={colors.bgBrand} />
    <path
      d="M14 8C11.2 8 9 10.2 9 13s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z"
      fill="white"
      opacity="0.9"
    />
    <circle cx="12.2" cy="12.5" r="0.8" fill={colors.bgBrand} />
    <circle cx="15.8" cy="12.5" r="0.8" fill={colors.bgBrand} />
  </svg>
);

export const MiniSpotters: React.FC = () => {
  const [sidebarTab, setSidebarTab] = useState<SidebarTabId>('insights');
  const [sidebarNav, setSidebarNav] = useState('spotter');
  const [spotters, setSpotters] = useState(defaultSpotters);
  const [activeSpotterId, setActiveSpotterId] = useState('spotter-ai');
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showPanel, setShowPanel] = useState(true);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSpotter = spotters.find((s) => s.id === activeSpotterId) ?? spotters[0];

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getAgentResponse = useCallback((spotterId: string, question: string): string => {
    const responses = agentResponses[spotterId];
    if (responses && responses[question]) return responses[question];
    return fallbackResponse;
  }, []);

  const handleSendMessage = useCallback(
    (text: string) => {
      setViewMode('chat');
      const userMsg: ChatMessage = { id: `msg-${Date.now()}`, role: 'user', text, timestamp: Date.now() };
      setMessages((prev) => [...prev, userMsg]);

      setIsTyping(true);
      setTimeout(() => {
        const response = getAgentResponse(activeSpotterId, text);
        const agentMsg: ChatMessage = { id: `msg-${Date.now() + 1}`, role: 'agent', text: response, timestamp: Date.now() };
        setMessages((prev) => [...prev, agentMsg]);
        setIsTyping(false);

        setChatHistory((prev) => {
          if (prev.find((c) => c.title === text)) return prev;
          return [
            { id: `chat-${Date.now()}`, title: text, spotterId: activeSpotterId, lastMessage: response.slice(0, 60) + '...', timestamp: 'Just now' },
            ...prev,
          ];
        });
      }, 1200);
    },
    [activeSpotterId, getAgentResponse],
  );

  const handleSpotterChange = useCallback((id: string) => {
    setActiveSpotterId(id);
    setViewMode('home');
    setMessages([]);
  }, []);

  const handleBackToHome = useCallback(() => {
    setViewMode('home');
    setMessages([]);
  }, []);

  const handleCreateComplete = useCallback((newSpotter: MiniSpotter) => {
    setSpotters((prev) => [...prev, newSpotter]);
    setActiveSpotterId(newSpotter.id);
    setIsCreatorOpen(false);
  }, []);

  // Header & sidebar
  const headerProps: GlobalHeaderProps = {
    searchPlaceholder: 'Search your library',
    userName: 'Primary',
    notificationCount: 1,
    showHamburger: true,
  };

  const sidebarProps: AppSidebarProps = {
    tabs: SIDEBAR_TABS,
    activeTab: sidebarTab,
    onTabChange: (tabId) => { setSidebarTab(tabId as SidebarTabId); setSidebarNav(''); },
    categories: SIDEBAR_CATEGORIES,
    selectedNav: sidebarNav,
    onNavSelect: setSidebarNav,
  };

  /** Render bold markdown fragments */
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ fontWeight: font.weight.semibold }}>{part.slice(2, -2)}</strong>;
      }
      return part.split('\n').map((line, j) => (
        <React.Fragment key={`${i}-${j}`}>
          {j > 0 && <br />}
          {line}
        </React.Fragment>
      ));
    });
  };

  return (
    <AppShell
      headerProps={headerProps}
      sidebarProps={sidebarProps}
      contentBackground={colors.bg}
      style={{ height: '100vh' }}
    >
      {/* Keyframe animations */}
      <style>{`
        @keyframes spotterFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
        {/* Secondary chat panel */}
        {showPanel && (
          <SpotterChatPanel
            chatHistory={chatHistory}
            onCollapse={() => setShowPanel(false)}
          />
        )}

        {/* Collapsed panel toggle */}
        {!showPanel && (
          <div
            style={{
              width: `${spacing.I}px`,
              flexShrink: 0,
              borderRight: `1px solid ${colors.borderDivider}`,
              backgroundColor: colors.bg,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: `${spacing.D}px`,
            }}
          >
            <Button variant="tertiary" size="small" icon="chevron-right" onClick={() => setShowPanel(true)}>
              {''}
            </Button>
          </div>
        )}

        {/* Main content */}
        {viewMode === 'home' ? (
          <div style={homeStyles.container}>
            <div style={homeStyles.content}>
              {/* Hero */}
              <div style={homeStyles.hero}>
                <div style={homeStyles.heroAvatar}>
                  <AgentAvatar size={32} />
                </div>
                <h1 style={homeStyles.heroTitle}>
                  {activeSpotter.id === 'spotter-ai'
                    ? "Hi! I'm Spotter, your AI data analyst"
                    : activeSpotter.greeting}
                </h1>
                <p style={homeStyles.heroSubtitle}>{activeSpotter.subtitle}</p>
              </div>

              {/* Prompt input */}
              <PromptInput activeSpotter={activeSpotter} onSend={handleSendMessage} />

              {/* Context chips with create button */}
              <ContextChips
                spotters={spotters}
                activeId={activeSpotterId}
                onSelect={handleSpotterChange}
                onCreateClick={() => setIsCreatorOpen(true)}
              />

              {/* Suggested questions */}
              <SuggestedQuestions
                spotterName={activeSpotter.name}
                questions={activeSpotter.suggestedQuestions}
                onQuestionClick={handleSendMessage}
              />

              {/* Quick insights */}
              <QuickInsights onQueryClick={handleSendMessage} />
            </div>
          </div>
        ) : (
          /* Chat view */
          <div style={chatStyles.container}>
            {/* Back navigation */}
            <div
              style={{
                padding: `${spacing.C}px ${spacing.H}px`,
                borderBottom: `1px solid ${colors.borderDivider}`,
                display: 'flex',
                alignItems: 'center',
                gap: `${spacing.B}px`,
              }}
            >
              <Button variant="tertiary" size="small" icon="chevron-left" onClick={handleBackToHome}>
                Back
              </Button>
              <span style={{ fontFamily: font.family, fontSize: font.size.sm, color: colors.textSecondary }}>
                · {activeSpotter.name}
              </span>
            </div>

            {/* Messages */}
            <div style={chatStyles.messages}>
              {messages.map((msg) =>
                msg.role === 'user' ? (
                  <div key={msg.id} style={chatStyles.userRow}>
                    <div style={chatStyles.userBubble}>{msg.text}</div>
                  </div>
                ) : (
                  <div key={msg.id} style={chatStyles.agentRow}>
                    <div style={chatStyles.agentAvatar}>
                      <AgentAvatar size={20} />
                    </div>
                    <div style={chatStyles.agentText}>{renderText(msg.text)}</div>
                  </div>
                ),
              )}

              {/* Typing indicator */}
              {isTyping && (
                <div style={chatStyles.agentRow}>
                  <div style={chatStyles.agentAvatar}>
                    <AgentAvatar size={20} />
                  </div>
                  <div style={chatStyles.typingIndicator}>
                    <span style={{ ...chatStyles.dot, animationDelay: '0s' }} />
                    <span style={{ ...chatStyles.dot, animationDelay: '0.2s' }} />
                    <span style={{ ...chatStyles.dot, animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div style={chatStyles.inputArea}>
              <PromptInput activeSpotter={activeSpotter} onSend={handleSendMessage} />
            </div>
          </div>
        )}
      </div>

      {/* Creator wizard */}
      <CreatorWizard
        isOpen={isCreatorOpen}
        onClose={() => setIsCreatorOpen(false)}
        onComplete={handleCreateComplete}
      />
    </AppShell>
  );
};

export default MiniSpotters;
