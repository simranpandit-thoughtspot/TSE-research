import React from 'react';
import { colors, typography } from '../styles';
import { fontFamily } from '@tokens/typography';

const FONT = fontFamily.primary;

interface SampleKPITileProps {
  sparkline: number[];
}

export const SampleKPITile: React.FC<SampleKPITileProps> = ({ sparkline }) => {
  const vw = 280, vh = 60;
  const pad = { top: 4, right: 8, bottom: 4, left: 8 };
  const w = vw - pad.left - pad.right;
  const h = vh - pad.top - pad.bottom;
  const max = Math.max(...sparkline);
  const min = Math.min(...sparkline) * 0.95;
  const range = max - min || 1;
  const pts = sparkline.map((v, i) =>
    `${pad.left + (i / (sparkline.length - 1)) * w},${pad.top + h - ((v - min) / range) * h}`
  ).join(' ');
  const area = `${pad.left},${pad.top + h} ${pts} ${pad.left + w},${pad.top + h}`;

  return (
    <svg width="100%" viewBox={`0 0 ${vw} ${vh}`} preserveAspectRatio="xMidYMid meet">
      <polygon points={area} fill={colors.chartBlue} opacity={0.08} />
      <polyline points={pts} fill="none" stroke={colors.chartBlue} strokeWidth="2" />
    </svg>
  );
};
