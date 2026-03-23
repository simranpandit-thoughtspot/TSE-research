import React, { useState } from 'react';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/icons';
import { Chip } from '../../../components/Chip';
import { inputStyles as s, colors } from '../styles';
import type { MiniSpotter } from '../data/mockData';

interface PromptInputProps {
  activeSpotter: MiniSpotter;
  onSend: (text: string) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ activeSpotter, onSend }) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue('');
  };

  return (
    <div style={s.wrapper}>
      <div style={{ ...s.container, ...(isFocused ? s.containerFocused : {}) }}>
        {/* Input row */}
        <div style={s.inputRow}>
          <input
            style={s.input}
            placeholder="Ask me a question. Use '@' to search for columns or values"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>

        {/* Bottom row — actions and context */}
        <div style={s.bottomRow}>
          <div style={s.leftActions}>
            <Button variant="tertiary" size="small" icon="liveboard" onClick={() => {}}>
              {''}
            </Button>
            <Button variant="tertiary" size="small" icon="spotter" onClick={() => {}}>
              {''}
            </Button>

            {/* Active MiniSpotter context chip */}
            <Chip
              type="attribute"
              label={activeSpotter.name}
              icon={<span style={{ fontSize: '12px', lineHeight: 1 }}>{activeSpotter.icon}</span>}
              showChevron
            />
          </div>

          <div style={s.rightActions}>
            <Button variant="tertiary" size="small" icon="cog" onClick={() => {}}>
              {''}
            </Button>
            <button
              style={{ ...s.sendBtn, opacity: value.trim() ? 1 : 0.35 }}
              onClick={handleSubmit}
              disabled={!value.trim()}
              aria-label="Send"
            >
              <Icon name="arrow-up" size="s" color={colors.textWhite} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
