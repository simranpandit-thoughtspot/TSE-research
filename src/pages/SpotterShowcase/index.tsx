import React, { useState } from 'react';
import {
  UserBubble,
  AgentMessage,
  TypingIndicator,
  ReasoningBlock,
  SpotterPrompt,
  QuickAction,
  QuickActionRow,
} from '@spotter/chat';
import type { ChatMessage } from '@spotter/runtime';
import { PreviewCard } from './PreviewCard';
import styles from './SpotterShowcase.module.css';

// ── Mock messages for static previews ──────────────────────────────────────

const userMessage: ChatMessage = {
  id: 'demo-user-1',
  role: 'user',
  stage: 'done',
  text: 'Show me total sales by month for the last quarter.',
  createdAt: Date.now() - 60_000,
};

const agentStreamingMessage: ChatMessage = {
  id: 'demo-agent-streaming',
  role: 'agent',
  stage: 'streaming',
  reasoning: {
    steps: [
      { id: 's1', label: 'Understanding the question', status: 'done' },
      { id: 's2', label: 'Finding the right tables', status: 'current' },
      { id: 's3', label: 'Generating the answer', status: 'pending' },
    ],
    isDone: false,
  },
  content: {
    blocks: [
      { kind: 'text', text: 'Looking at your sales data for the last quarter…' },
    ],
  },
  createdAt: Date.now() - 30_000,
};

const agentDoneMessage: ChatMessage = {
  id: 'demo-agent-done',
  role: 'agent',
  stage: 'done',
  reasoning: {
    steps: [
      { id: 's1', label: 'Understanding the question', status: 'done', description: 'You asked for total sales grouped by month.' },
      { id: 's2', label: 'Finding the right tables', status: 'done', description: 'Used the Orders and OrderItems tables.' },
      { id: 's3', label: 'Generating the answer', status: 'done' },
    ],
    isDone: true,
    durationSeconds: 4,
  },
  content: {
    blocks: [
      {
        kind: 'text',
        text: 'Here are your total sales by month for the last quarter. February had the strongest performance, driven by enterprise renewals.',
      },
    ],
  },
  createdAt: Date.now() - 20_000,
};

const reasoningCollapsed = {
  steps: [
    { id: 's1', label: 'Understanding the question', status: 'done' as const },
    { id: 's2', label: 'Finding the right tables', status: 'done' as const },
    { id: 's3', label: 'Generating the answer', status: 'done' as const },
  ],
  isDone: true,
  durationSeconds: 3,
};

const reasoningExpanded = {
  steps: [
    {
      id: 's1',
      label: 'Understanding the question',
      status: 'done' as const,
      description: 'Parsed the intent: total sales grouped by month over the last 90 days.',
    },
    {
      id: 's2',
      label: 'Finding the right tables',
      status: 'done' as const,
      description: 'Joined Orders with OrderItems on order_id.',
    },
    {
      id: 's3',
      label: 'Generating the answer',
      status: 'done' as const,
      description: 'Aggregated revenue per month and rendered a line chart.',
    },
  ],
  isDone: true,
  durationSeconds: 4,
};

const reasoningStreaming = {
  steps: [
    { id: 's1', label: 'Understanding the question', status: 'done' as const },
    {
      id: 's2',
      label: 'Finding the right tables',
      status: 'current' as const,
      description: 'Scanning the model for tables that contain sales and date columns…',
    },
    { id: 's3', label: 'Generating the answer', status: 'pending' as const },
  ],
  isDone: false,
};

// ── Interactive prompt previews ────────────────────────────────────────────

const PromptEmpty: React.FC = () => {
  const [value, setValue] = useState('');
  return (
    <SpotterPrompt
      value={value}
      onChange={setValue}
      onSubmit={() => undefined}
      dataModelLabel="Sales core"
      onDataModelClick={() => undefined}
    />
  );
};

const PromptFilled: React.FC = () => {
  const [value, setValue] = useState('Show me total sales by month');
  return (
    <SpotterPrompt
      value={value}
      onChange={setValue}
      onSubmit={() => undefined}
      dataModelLabel="Sales core"
      onDataModelClick={() => undefined}
    />
  );
};

const PromptDisabled: React.FC = () => (
  <SpotterPrompt
    value=""
    onChange={() => undefined}
    onSubmit={() => undefined}
    dataModelLabel="Sales core"
    onDataModelClick={() => undefined}
    disabled
  />
);

// ── Page ───────────────────────────────────────────────────────────────────

export const SpotterShowcase: React.FC = () => {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Spotter showcase</h1>
        <p className={styles.pageSubtitle}>
          Every component in the Spotter design system — chat surface, block renderers, page shell,
          icons, and tokens. Static previews with the common variants.
        </p>
        <nav className={styles.toc} aria-label="Sections">
          <a href="#chat">Chat</a>
          <a href="#blocks">Blocks</a>
          <a href="#shell">Page shell</a>
          <a href="#icons">Spotter icons</a>
          <a href="#tokens">Spotter tokens</a>
        </nav>
      </header>

      {/* ─── Chat section ───────────────────────────────────────────────── */}
      <section id="chat" className={styles.section}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Chat</h2>
          <p className={styles.sectionLead}>
            Primitives that compose the agentic conversation surface. Imported from <code>@spotter/chat</code>.
          </p>
        </header>

        <PreviewCard
          name="UserBubble"
          path="@spotter/chat"
          description="Single-row layout: avatar + text + timestamp inside a soft-gray rounded container."
          variants={[
            {
              label: 'Default',
              node: <UserBubble message={userMessage} />,
            },
          ]}
        />

        <PreviewCard
          name="AgentMessage"
          path="@spotter/chat"
          description="Avatar + reasoning + response blocks + feedback row. Renders different chrome based on stage (streaming, done)."
          variants={[
            {
              label: 'Streaming',
              description: 'Reasoning auto-expands while the agent is thinking.',
              node: <AgentMessage message={agentStreamingMessage} />,
            },
            {
              label: 'Done',
              description: 'Reasoning auto-collapses 600ms after the message completes.',
              node: <AgentMessage message={agentDoneMessage} />,
            },
            {
              label: 'Done with feedback row',
              description: 'Feedback row appears only when stage === "done".',
              node: <AgentMessage message={agentDoneMessage} />,
            },
          ]}
        />

        <PreviewCard
          name="TypingIndicator"
          path="@spotter/chat"
          description='Spinner + "Analysing…" shown between submit and the first reasoning chunk.'
          variants={[
            {
              label: 'Active',
              node: <TypingIndicator />,
            },
          ]}
        />

        <PreviewCard
          name="ReasoningBlock"
          path="@spotter/chat"
          description='Collapsible "Show work ⌄" trigger. Steps render with status dots, optional descriptions, and a "Worked for X seconds" footer.'
          variants={[
            {
              label: 'Collapsed (done)',
              description: 'Default state after the message completes.',
              node: <ReasoningBlock reasoning={reasoningCollapsed} stage="done" />,
            },
            {
              label: 'Expanded',
              description: 'Steps with descriptions visible.',
              node: <ReasoningBlock reasoning={reasoningExpanded} stage="done" />,
            },
            {
              label: 'Streaming',
              description: 'Auto-expanded while the agent is thinking.',
              node: <ReasoningBlock reasoning={reasoningStreaming} stage="streaming" />,
            },
          ]}
        />

        <PreviewCard
          name="SpotterPrompt"
          path="@spotter/chat"
          description="Controlled prompt with auto-resize textarea, mode toggle, data-model picker, and submit. Purple → blue gradient border on :focus-within."
          variants={[
            {
              label: 'Empty',
              description: 'Default placeholder visible.',
              node: <PromptEmpty />,
            },
            {
              label: 'Filled',
              description: 'With user-typed content.',
              node: <PromptFilled />,
            },
            {
              label: 'Disabled',
              description: 'Submit and inputs locked.',
              node: <PromptDisabled />,
            },
          ]}
        />

        <PreviewCard
          name="QuickAction"
          path="@spotter/chat"
          description="Pill button used in the welcome state and refine flows. Accepts an icon and label."
          variants={[
            {
              label: 'Default',
              node: (
                <QuickAction
                  id="demo"
                  label="Quick search"
                  icon="explore"
                  onClick={() => undefined}
                />
              ),
            },
          ]}
        />

        <PreviewCard
          name="QuickActionRow"
          path="@spotter/chat"
          description="Horizontal stack of QuickAction pills. Defaults to three actions when no `actions` prop is passed."
          variants={[
            {
              label: 'Two actions',
              node: (
                <QuickActionRow
                  actions={[
                    { id: 'a1', label: 'Show me total sales by month', icon: 'explore' },
                    { id: 'a2', label: 'What can I ask about this data?', icon: 'bulb' },
                  ]}
                  onAction={() => undefined}
                />
              ),
            },
            {
              label: 'Four actions',
              node: (
                <QuickActionRow
                  actions={[
                    { id: 'a1', label: 'Quick search', icon: 'explore' },
                    { id: 'a2', label: 'Deep analysis', icon: 'r-analysis' },
                    { id: 'a3', label: 'Know your data', icon: 'bulb' },
                    { id: 'a4', label: 'Compare scenarios', icon: 'chart' },
                  ]}
                  onAction={() => undefined}
                />
              ),
            },
          ]}
        />

        {/* Planned placeholders */}
        <PreviewCard
          name="SourcePicker"
          path="@spotter/chat (planned)"
          description="Pick which SpotterModel (data source) to query in the current session. Surfaces from the prompt area or model picker."
          variants={[]}
          planned
          plannedHint="Design pending. Will live at src/spotter/chat/SourcePicker.tsx."
        />

        <PreviewCard
          name="ModelPicker"
          path="@spotter/chat (planned)"
          description="Richer model-selection UI than the current inline picker — recently used, search, model metadata."
          variants={[]}
          planned
          plannedHint="Design pending. Will live at src/spotter/chat/ModelPicker.tsx."
        />
      </section>

      {/* ─── Phase 2+ stubs ─────────────────────────────────────────────── */}
      <section id="blocks" className={styles.section}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Blocks</h2>
          <p className={styles.sectionLead}>Block renderers (text, viz, sources, follow-ups, refine, error). Lands in Phase 2.</p>
        </header>
        <div className={styles.phasePlaceholder}>
          Coming in Phase 2 — see <code>docs/spotter-roadmap.md</code> for status.
        </div>
      </section>

      <section id="shell" className={styles.section}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Page shell</h2>
          <p className={styles.sectionLead}>SpotterShell, SpotterLeftSide, SpotterRail, SpotterPanel, SpotterWelcome. Lands in Phase 3.</p>
        </header>
        <div className={styles.phasePlaceholder}>
          Coming in Phase 3 — see <code>docs/spotter-roadmap.md</code> for status.
        </div>
      </section>

      <section id="icons" className={styles.section}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Spotter icons</h2>
          <p className={styles.sectionLead}>Glyphs missing from the Radiant registry — PanelToggle, Bell, ThoughtSpotMark, ChartSearch, Orbits. Lands in Phase 4.</p>
        </header>
        <div className={styles.phasePlaceholder}>
          Coming in Phase 4 — see <code>docs/spotter-roadmap.md</code> for status.
        </div>
      </section>

      <section id="tokens" className={styles.section}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Spotter tokens</h2>
          <p className={styles.sectionLead}>Local tokens — spotterGlow, spotterChartBg, spotterLayout. Lands in Phase 4.</p>
        </header>
        <div className={styles.phasePlaceholder}>
          Coming in Phase 4 — see <code>docs/spotter-roadmap.md</code> for status.
        </div>
      </section>
    </div>
  );
};

export default SpotterShowcase;
