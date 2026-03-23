import React, { useState, useCallback } from 'react';
import { WizardModal } from '../../../components/WizardModal';
import type { WizardStep } from '../../../components/WizardModal';
import { TextInput } from '../../../components/TextInput';
import { TextArea } from '../../../components/TextArea';
import { Checkbox } from '../../../components/Checkbox';
import { SearchInput } from '../../../components/SearchInput';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/icons';
import { creatorStyles as s, colors, font } from '../styles';
import { spacing } from '../../../tokens/spacing';
import { radius } from '../../../tokens/radius';
import {
  availableDataSources,
  availableTools,
  emojiOptions,
  type MiniSpotter,
  type DataSource,
} from '../data/mockData';

interface CreatorWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (spotter: MiniSpotter) => void;
}

interface WizardData {
  name: string;
  icon: string;
  description: string;
  greeting: string;
  subtitle: string;
  selectedDataSourceIds: Set<string>;
  selectedToolIds: Set<string>;
  instructions: string;
  prompts: string[];
}

const initialData: WizardData = {
  name: '',
  icon: '🤖',
  description: '',
  greeting: '',
  subtitle: '',
  selectedDataSourceIds: new Set(),
  selectedToolIds: new Set(),
  instructions: '',
  prompts: [],
};

/** Step 1: Basics */
const BasicsStep: React.FC<{
  data: WizardData;
  onChange: (data: WizardData) => void;
}> = ({ data, onChange }) => (
  <div style={s.stepContent}>
    {/* Icon picker */}
    <div style={s.fieldGroup}>
      <span style={s.fieldLabel}>Icon</span>
      <div style={s.emojiPicker}>
        {emojiOptions.map((emoji) => (
          <button
            key={emoji}
            style={{
              ...s.emojiBtn,
              ...(data.icon === emoji ? s.emojiBtnActive : {}),
            }}
            onClick={() => onChange({ ...data, icon: emoji })}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>

    <TextInput
      label="Name"
      placeholder="e.g., Revenue Radar"
      value={data.name}
      onChange={(e) => onChange({ ...data, name: e.target.value })}
    />

    <TextArea
      label="Description"
      placeholder="Briefly describe what this MiniSpotter is for..."
      value={data.description}
      onChange={(e) => onChange({ ...data, description: e.target.value })}
      rows={3}
    />

    <TextInput
      label="Greeting headline"
      placeholder="e.g., Revenue Radar"
      value={data.greeting}
      onChange={(e) => onChange({ ...data, greeting: e.target.value })}
    />

    <TextInput
      label="Subtitle"
      placeholder="e.g., Deep dive into revenue metrics"
      value={data.subtitle}
      onChange={(e) => onChange({ ...data, subtitle: e.target.value })}
    />
  </div>
);

/** Step 2: Data access */
const DataAccessStep: React.FC<{
  data: WizardData;
  onChange: (data: WizardData) => void;
}> = ({ data, onChange }) => {
  const [search, setSearch] = useState('');

  const filtered = availableDataSources.filter(
    (ds) => ds.name.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleSource = (id: string) => {
    const next = new Set(data.selectedDataSourceIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange({ ...data, selectedDataSourceIds: next });
  };

  const typeLabel = (type: DataSource['type']) => {
    const labels: Record<string, string> = {
      worksheet: 'Worksheet',
      model: 'Model',
      liveboard: 'Liveboard',
      connection: 'Connection',
    };
    return labels[type] ?? type;
  };

  return (
    <div style={s.stepContent}>
      <p style={{ fontFamily: font.family, fontSize: font.size.sm, color: colors.textSecondary, margin: 0 }}>
        Select which data sources this MiniSpotter can access. Only selected sources will be available for queries.
      </p>

      <SearchInput
        placeholder="Search data sources"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ fontSize: font.size.xs, color: colors.textTertiary, fontFamily: font.family }}>
        {data.selectedDataSourceIds.size} of {availableDataSources.length} selected
      </div>

      <div style={{
        border: `1px solid ${colors.borderDivider}`,
        borderRadius: `${radius.lg}px`,
        overflow: 'hidden',
        maxHeight: '320px',
        overflowY: 'auto',
      }}>
        {filtered.map((ds) => (
          <div key={ds.id} style={s.dataSourceItem}>
            <Checkbox
              checked={data.selectedDataSourceIds.has(ds.id)}
              onChange={() => toggleSource(ds.id)}
            />
            <span style={s.dataSourceName}>{ds.name}</span>
            <span style={s.dataSourceType}>{typeLabel(ds.type)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/** Step 3: Tools & connectors */
const ToolsStep: React.FC<{
  data: WizardData;
  onChange: (data: WizardData) => void;
}> = ({ data, onChange }) => {
  const toggleTool = (id: string) => {
    const next = new Set(data.selectedToolIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange({ ...data, selectedToolIds: next });
  };

  return (
    <div style={s.stepContent}>
      <p style={{ fontFamily: font.family, fontSize: font.size.sm, color: colors.textSecondary, margin: 0 }}>
        Choose which tools and connectors are available to this MiniSpotter.
      </p>

      <div style={{
        border: `1px solid ${colors.borderDivider}`,
        borderRadius: `${radius.lg}px`,
        overflow: 'hidden',
      }}>
        {availableTools.map((tool) => (
          <div key={tool.id} style={s.dataSourceItem}>
            <Checkbox
              checked={data.selectedToolIds.has(tool.id)}
              onChange={() => toggleTool(tool.id)}
            />
            <div style={{ flex: 1 }}>
              <div style={s.dataSourceName}>{tool.name}</div>
              <div style={{ fontFamily: font.family, fontSize: font.size.xs, color: colors.textTertiary, marginTop: `${spacing.A}px` }}>
                {tool.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/** Step 4: Instructions */
const InstructionsStep: React.FC<{
  data: WizardData;
  onChange: (data: WizardData) => void;
}> = ({ data, onChange }) => (
  <div style={s.stepContent}>
    <p style={{ fontFamily: font.family, fontSize: font.size.sm, color: colors.textSecondary, margin: 0 }}>
      Write custom instructions that define how this MiniSpotter should behave. These guide the agent&apos;s persona, tone, and focus areas.
    </p>

    <TextArea
      label="Agent instructions"
      placeholder="e.g., You are a revenue analyst focused on ARR metrics. Always segment data by business unit. Provide comparisons to prior quarters when possible..."
      value={data.instructions}
      onChange={(e) => onChange({ ...data, instructions: e.target.value })}
      rows={8}
    />

    <div style={s.fieldHelper}>
      Tip: Be specific about the persona, default filters, preferred metrics, and response style.
    </div>
  </div>
);

/** Step 5: Prompt library */
const PromptLibraryStep: React.FC<{
  data: WizardData;
  onChange: (data: WizardData) => void;
}> = ({ data, onChange }) => {
  const [newPrompt, setNewPrompt] = useState('');

  const addPrompt = () => {
    const trimmed = newPrompt.trim();
    if (!trimmed) return;
    onChange({ ...data, prompts: [...data.prompts, trimmed] });
    setNewPrompt('');
  };

  const removePrompt = (index: number) => {
    onChange({ ...data, prompts: data.prompts.filter((_, i) => i !== index) });
  };

  return (
    <div style={s.stepContent}>
      <p style={{ fontFamily: font.family, fontSize: font.size.sm, color: colors.textSecondary, margin: 0 }}>
        Add suggested questions that users will see when they open this MiniSpotter. These help solve the blank page problem.
      </p>

      {/* Existing prompts */}
      {data.prompts.map((prompt, i) => (
        <div key={i} style={s.promptItem}>
          <span style={s.promptText}>{prompt}</span>
          <Button variant="tertiary" size="small" icon="trash-can" onClick={() => removePrompt(i)}>
            {''}
          </Button>
        </div>
      ))}

      {/* Add new prompt */}
      <div style={s.addPromptRow}>
        <div style={{ flex: 1 }}>
          <TextInput
            placeholder="Add a suggested question..."
            value={newPrompt}
            onChange={(e) => setNewPrompt(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && addPrompt()}
          />
        </div>
        <Button variant="secondary" onClick={addPrompt} disabled={!newPrompt.trim()}>
          Add
        </Button>
      </div>

      {data.prompts.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: `${spacing.H}px`,
          color: colors.textTertiary,
          fontFamily: font.family,
          fontSize: font.size.sm,
        }}>
          <Icon name="information" size="l" color={colors.textTertiary} />
          <p style={{ margin: `${spacing.C}px 0 0` }}>
            No suggested questions yet. Add a few to help users get started.
          </p>
        </div>
      )}
    </div>
  );
};

export const CreatorWizard: React.FC<CreatorWizardProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [data, setData] = useState<WizardData>(initialData);

  const handleComplete = useCallback(() => {
    const newSpotter: MiniSpotter = {
      id: `custom-${Date.now()}`,
      name: data.name || 'Untitled MiniSpotter',
      icon: data.icon,
      description: data.description,
      dataSources: Array.from(data.selectedDataSourceIds).map(
        (id) => availableDataSources.find((ds) => ds.id === id)?.name ?? id,
      ),
      tools: Array.from(data.selectedToolIds).map(
        (id) => availableTools.find((t) => t.id === id)?.name ?? id,
      ),
      creator: 'You',
      instructions: data.instructions,
      greeting: data.greeting || data.name || 'MiniSpotter',
      subtitle: data.subtitle || data.description,
      suggestedQuestions: data.prompts.length > 0
        ? data.prompts
        : ['Ask me anything about your data'],
    };
    onComplete(newSpotter);
    setData(initialData);
  }, [data, onComplete]);

  const handleClose = useCallback(() => {
    setData(initialData);
    onClose();
  }, [onClose]);

  const steps: WizardStep[] = [
    {
      id: 'basics',
      title: 'Set up basics',
      content: <BasicsStep data={data} onChange={setData} />,
      validate: () => data.name.trim().length > 0,
      nextButtonText: 'Continue',
    },
    {
      id: 'data-access',
      title: 'Select data sources',
      content: <DataAccessStep data={data} onChange={setData} />,
      validate: () => data.selectedDataSourceIds.size > 0,
      nextButtonText: 'Continue',
    },
    {
      id: 'tools',
      title: 'Configure tools',
      content: <ToolsStep data={data} onChange={setData} />,
      nextButtonText: 'Continue',
    },
    {
      id: 'instructions',
      title: 'Write instructions',
      content: <InstructionsStep data={data} onChange={setData} />,
      nextButtonText: 'Continue',
    },
    {
      id: 'prompts',
      title: 'Build prompt library',
      content: <PromptLibraryStep data={data} onChange={setData} />,
      nextButtonText: 'Create MiniSpotter',
    },
  ];

  return (
    <WizardModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create MiniSpotter"
      steps={steps}
      onComplete={handleComplete}
      showProgress
      size="large"
    />
  );
};
