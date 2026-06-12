import React, { useMemo } from 'react';
import styles from './Sparkline.module.css';

interface SparklineProps {
  data: number[];
  width: number;
  height: number;
  lineColor?: string;
  fillColor?: string;
  baselineColor?: string;
  showBaseline?: boolean;
  strokeWidth?: number;
}

const Sparkline: React.FC<SparklineProps> = ({
  data,
  width,
  height,
  lineColor = '#30D158',
  fillColor = 'rgba(48,209,88,0.18)',
  baselineColor = 'rgba(48,209,88,0.5)',
  showBaseline = true,
  strokeWidth = 1.5,
}) => {
  const { linePath, fillPath, baselineY } = useMemo(() => {
    if (!data.length) return { linePath: '', fillPath: '', baselineY: height / 2 };

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const pad = strokeWidth + 1;

    const toX = (i: number) => (i / (data.length - 1)) * width;
    const toY = (v: number) => height - pad - ((v - min) / range) * (height - pad * 2);

    const pts = data.map((v, i) => ({ x: toX(i), y: toY(v) }));

    // Smooth line using cubic bezier control points
    const line = pts.reduce((acc, pt, i) => {
      if (i === 0) return `M ${pt.x} ${pt.y}`;
      const prev = pts[i - 1];
      const cpX = (prev.x + pt.x) / 2;
      return `${acc} C ${cpX} ${prev.y}, ${cpX} ${pt.y}, ${pt.x} ${pt.y}`;
    }, '');

    const fill = `${line} L ${pts[pts.length - 1].x} ${height} L 0 ${height} Z`;

    // Baseline at 40th percentile (approximate "target" line as in the Figma)
    const baseY = toY(min + range * 0.4);

    return { linePath: line, fillPath: fill, baselineY: baseY };
  }, [data, width, height, strokeWidth]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={styles.sparkline}
      preserveAspectRatio="none"
    >
      {/* Fill area */}
      <path d={fillPath} fill={fillColor} />
      {/* Baseline dashed line */}
      {showBaseline && (
        <line
          x1={0}
          y1={baselineY}
          x2={width}
          y2={baselineY}
          stroke={baselineColor}
          strokeWidth={1}
          strokeDasharray="3 3"
        />
      )}
      {/* Main line */}
      <path d={linePath} fill="none" stroke={lineColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default Sparkline;
