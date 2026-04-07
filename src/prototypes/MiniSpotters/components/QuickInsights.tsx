// @ts-nocheck
import React from 'react';
import { Icon, isValidIconName } from '../../../components/icons';
import { quickInsightStyles as s, colors } from '../styles';
import { quickInsightsData } from '../data/mockData';

interface QuickInsightsProps {
  onQueryClick: (query: string) => void;
}

export const QuickInsights: React.FC<QuickInsightsProps> = ({ onQueryClick }) => {
  return (
    <div style={s.section}>
      <div style={s.header}>
        <Icon name="star" size="s" color={colors.textTertiary} />
        <h4 style={s.title}>Quick insights</h4>
      </div>
      <div style={s.grid}>
        {quickInsightsData.map((item, index) => {
          const featured = index === 0;
          return (
            <button
              key={item.id}
              style={{ ...s.card, ...(featured ? s.cardFeatured : {}) }}
              onClick={() => onQueryClick(item.query)}
            >
              <div style={{ ...s.cardIcon, ...(featured ? s.cardIconFeatured : {}) }}>
                <Icon
                  name={isValidIconName(item.icon) ? item.icon : 'sparkle'}
                  size="s"
                  color={featured ? colors.textWhite : colors.textBrand}
                />
              </div>
              <p style={{ ...s.cardTitle, ...(featured ? s.cardTitleFeatured : {}) }}>{item.title}</p>
              <p style={{ ...s.cardDescription, ...(featured ? s.cardDescFeatured : {}) }}>{item.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
