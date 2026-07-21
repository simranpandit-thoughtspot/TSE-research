import React from 'react';

interface StatDonutProps {
  percent: number;
  color: string;
  trackColor: string;
  size?: number;
}

/** Small SVG donut ring — no charting library needed for a single-value stat. */
export const StatDonut: React.FC<StatDonutProps> = ({ percent, color, trackColor, size = 132 }) => {
  const r = 50;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (Math.min(percent, 100) / 100) * circumference;

  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <circle cx={60} cy={60} r={r} fill="none" stroke={trackColor} strokeWidth={14} />
      <circle
        cx={60}
        cy={60}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={14}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 60 60)"
      />
      <text x={60} y={69} textAnchor="middle" fontSize={26} fontWeight={800} fill={color}>
        {percent}%
      </text>
    </svg>
  );
};

export default StatDonut;
