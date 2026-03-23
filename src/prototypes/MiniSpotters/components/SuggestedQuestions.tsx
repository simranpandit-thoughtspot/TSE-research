import React from 'react';
import { Icon } from '../../../components/icons';
import { suggestStyles as s, colors } from '../styles';

interface SuggestedQuestionsProps {
  spotterName: string;
  questions: string[];
  onQuestionClick: (question: string) => void;
}

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({
  spotterName,
  questions,
  onQuestionClick,
}) => {
  return (
    <div style={s.section}>
      <div style={s.header}>
        <Icon name="info-circle" size="s" color={colors.textTertiary} />
        <h4 style={s.title}>Suggested questions for {spotterName}</h4>
      </div>
      <div style={s.grid}>
        {questions.map((q) => (
          <button key={q} style={s.card} onClick={() => onQuestionClick(q)}>
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};
