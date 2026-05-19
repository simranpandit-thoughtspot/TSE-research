import React, { useState } from 'react';
import {
  UserBubble,
  AgentMessage,
  TypingIndicator,
  ReasoningBlock,
  SpotterPrompt,
  QuickAction,
  QuickActionRow,
  SpotterChatProvider,
} from '@spotter/chat';
import {
  TextBlock,
  VizBlock,
  SourcesBlock,
  FollowUpsBlock,
  RefineBlock,
  ErrorBlock,
} from '@spotter/chat/blocks';
import type {
  ChatMessage,
  TextBlockData,
  VizBlockData,
  SourcesBlockData,
  FollowUpsBlockData,
  RefineBlockData,
  ErrorBlockData,
} from '@spotter/runtime';
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

// ── Mock block data ────────────────────────────────────────────────────────

const textBlockShort: TextBlockData = {
  kind: 'text',
  id: 'tb-short',
  text: 'Total sales were $4.2M in Q4, up 12% year over year.',
};

const textBlockLong: TextBlockData = {
  kind: 'text',
  id: 'tb-long',
  text: 'Total sales were $4.2M in Q4, up 12% year over year. February led the quarter with $1.7M, driven by enterprise renewals and a strong push from the EMEA region. The dip in early March was offset by a recovery in the second half, mostly from existing accounts expanding their seat count. Compared to the same period last year, customer count grew 8% while average deal size grew 4%.',
};

const vizLine: VizBlockData = {
  kind: 'viz',
  id: 'viz-line',
  title: 'Sales by month',
  tokens: [
    { id: 't1', label: 'Sales', kind: 'measure' },
    { id: 't2', label: 'Month', kind: 'keyword' },
  ],
  source: {
    type: 'data',
    chartKind: 'line',
    data: {
      xAxis: { categories: ['Jan', 'Feb', 'Mar'] },
      series: [{ id: 's1', label: 'Sales', data: [1.2, 1.7, 1.3] }],
    },
  },
};

const vizBar: VizBlockData = {
  kind: 'viz',
  id: 'viz-bar',
  title: 'Sales by region',
  tokens: [
    { id: 't1', label: 'Sales', kind: 'measure' },
    { id: 't2', label: 'Region', kind: 'keyword' },
  ],
  source: {
    type: 'data',
    chartKind: 'bar',
    data: {
      xAxis: { categories: ['NA', 'EMEA', 'APAC', 'LATAM'] },
      series: [{ id: 's1', label: 'Sales', data: [2.1, 1.4, 0.6, 0.1] }],
    },
  },
};

const vizPie: VizBlockData = {
  kind: 'viz',
  id: 'viz-pie',
  title: 'Revenue mix',
  tokens: [
    { id: 't1', label: 'Revenue', kind: 'measure' },
    { id: 't2', label: 'Product', kind: 'keyword' },
  ],
  source: {
    type: 'data',
    chartKind: 'pie',
    data: {
      xAxis: { categories: ['Core', 'Plus', 'Enterprise', 'Add-ons'] },
      series: [{ id: 's1', label: 'Revenue', data: [1.4, 1.0, 1.6, 0.2] }],
    },
  },
};

const vizTable: VizBlockData = {
  kind: 'viz',
  id: 'viz-table',
  title: 'Top accounts',
  tokens: [
    { id: 't1', label: 'Account', kind: 'keyword' },
    { id: 't2', label: 'Sales', kind: 'measure' },
  ],
  source: {
    type: 'data',
    chartKind: 'table',
    data: {
      xAxis: { categories: ['Acme', 'Globex', 'Initech', 'Umbrella'] },
      series: [{ id: 's1', label: 'Sales', data: [820, 610, 480, 320] }],
    },
  },
};

const vizEmpty: VizBlockData = {
  kind: 'viz',
  id: 'viz-empty',
  title: 'Sales — no data',
  tokens: [{ id: 't1', label: 'Sales', kind: 'measure' }],
  source: {
    type: 'placeholder',
    message: 'No data matched this question. Try a different date range.',
  },
};

const sourcesData: SourcesBlockData = {
  kind: 'sources',
  id: 'src-1',
  items: [
    { id: 'src-orders', label: 'Orders' },
    { id: 'src-items', label: 'OrderItems' },
    { id: 'src-cust', label: 'Customers' },
  ],
};

const followupsData: FollowUpsBlockData = {
  kind: 'followups',
  id: 'fu-1',
  suggestions: [
    'Break this down by region',
    'Compare to the same quarter last year',
    'Show only enterprise accounts',
  ],
};

const refineData: RefineBlockData = {
  kind: 'refine',
  id: 'rf-1',
  questions: [
    'Do you mean fiscal Q4 or calendar Q4?',
    'Should I include refunds?',
    'Group by month or by week?',
  ],
};

const errorData: ErrorBlockData = {
  kind: 'error',
  id: 'err-1',
  message: 'I could not connect to the data model. Check the connection and try again.',
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
    <SpotterChatProvider mode="canned">
      <SpotterShowcaseInner />
    </SpotterChatProvider>
  );
};

const SpotterShowcaseInner: React.FC = () => {
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

      {/* ─── Blocks section ─────────────────────────────────────────────── */}
      <section id="blocks" className={styles.section}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Blocks</h2>
          <p className={styles.sectionLead}>
            Block renderers — one per <code>AnswerBlock.kind</code>. Imported from <code>@spotter/chat/blocks</code>.
            Wired into <code>AgentResponseBlock</code> via a switch on <code>kind</code>.
          </p>
        </header>

        <PreviewCard
          name="TextBlock"
          path="@spotter/chat/blocks"
          description="Renders a plain text paragraph inside an agent response. The simplest block kind."
          variants={[
            {
              label: 'Short',
              node: <TextBlock block={textBlockShort} />,
            },
            {
              label: 'Long',
              description: 'Wraps across multiple lines; respects max-width for readability.',
              node: <TextBlock block={textBlockLong} />,
            },
          ]}
        />

        <PreviewCard
          name="VizBlock"
          path="@spotter/chat/blocks"
          description="Chart renderer. Slot priority: external React node (passed in) > iframe URL > inline data (renders an SVG sketch) > placeholder. Token chips above the chart describe measures, keywords, filters."
          variants={[
            { label: 'Line', node: <VizBlock block={vizLine} /> },
            { label: 'Bar', node: <VizBlock block={vizBar} /> },
            { label: 'Pie', node: <VizBlock block={vizPie} /> },
            { label: 'Table', node: <VizBlock block={vizTable} /> },
            {
              label: 'Empty / placeholder',
              description: 'When the answer has no data — the placeholder message renders inside the slot.',
              node: <VizBlock block={vizEmpty} />,
            },
          ]}
        />

        <PreviewCard
          name="SourcesBlock"
          path="@spotter/chat/blocks"
          description="Lists the data sources the agent used to compose the answer (tables, columns, datasets)."
          variants={[
            {
              label: 'Default',
              node: <SourcesBlock block={sourcesData} />,
            },
          ]}
        />

        <PreviewCard
          name="FollowUpsBlock"
          path="@spotter/chat/blocks"
          description="Suggested follow-up questions. Each is a clickable chip that calls `send` on the chat provider."
          variants={[
            {
              label: 'Default',
              description: 'Three suggested follow-ups.',
              node: <FollowUpsBlock block={followupsData} />,
            },
          ]}
        />

        <PreviewCard
          name="RefineBlock"
          path="@spotter/chat/blocks"
          description="Clarifying questions the agent asks before fully answering. Each is clickable and calls `send` with the selected refinement."
          variants={[
            {
              label: 'Default',
              description: 'Three clarifying questions.',
              node: <RefineBlock block={refineData} />,
            },
          ]}
        />

        <PreviewCard
          name="ErrorBlock"
          path="@spotter/chat/blocks"
          description="Renders an agent-side error. Used when the runtime emits an error chunk, when the data model is unreachable, or when the model returns an error message."
          variants={[
            {
              label: 'Default',
              node: <ErrorBlock block={errorData} />,
            },
          ]}
        />

        <PreviewCard
          name="AnswerCard"
          path="@spotter/answer (planned)"
          description="The answer view that renders inside a chat thread when Spotter responds with a viz-backed answer. The current VizBlock renderer is the stand-in."
          variants={[]}
          planned
          plannedHint="Figma spec exists at docs/2026-05-07-spotter-answer-card.md (node 122:15399). Will live at src/spotter/answer/AnswerCard.tsx."
        />
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
