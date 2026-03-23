import React, { useState } from 'react';
import { colors, typography } from '../styles';
import { fontFamily } from '@tokens/typography';

const FONT = fontFamily.primary;

interface SampleBarChartProps {
  data: number[];
  labels: string[];
}

export const SampleBarChart: React.FC<SampleBarChartProps> = ({ data, labels }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const vw = 304, vh = 164;
  const pad = { top: 4, right: 0, bottom: 24, left: 0 };
  const chartW = vw - pad.left - pad.right;
  const chartH = vh - pad.top - pad.bottom;
  const max = Math.max(...data) * 1.1;
  const barW = chartW / data.length * 0.6;
  const gap = chartW / data.length * 0.4;

  const xLabels = labels.filter((_, i) => i % 2 === 0);

  return (
    <svg width="100%" viewBox={`0 0 ${vw} ${vh}`} preserveAspectRatio="xMidYMid meet">
      {data.map((v, i) => {
        const barH = (v / max) * chartH;
        const x = pad.left + i * (barW + gap) + gap / 2;
        const y = pad.top + chartH - barH;
        const isHovered = hoveredIdx === i;
        return (
          <rect key={i} x={x} y={y} width={barW} height={barH}
            fill={colors.chartBlue} opacity={isHovered ? 1 : 0.7}
            rx={3} style={{ cursor: 'pointer', transition: 'opacity 0.15s' }}
            onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} />
        );
      })}
      <line x1={0} y1={pad.top + chartH} x2={vw} y2={pad.top + chartH} stroke="#eaedf2" strokeWidth="1" />
      {xLabels.map((l, i) => {
        const idx = i * 2;
        const barX = pad.left + idx * (barW + gap) + gap / 2 + barW / 2;
        return (
          <text key={l} x={barX} y={vh - 5} textAnchor="middle" fontSize="9" fill={colors.textSecondary} fontFamily={FONT} letterSpacing="-0.072">{l}</text>
        );
      })}
    </svg>
  );
};
