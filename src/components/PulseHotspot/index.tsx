import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './PulseHotspot.module.css';

interface Props {
  target: string;
  offsetX?: number;
  offsetY?: number;
}

const PulseHotspot: React.FC<Props> = ({ target, offsetX = 0, offsetY = 0 }) => {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const update = () => {
      const el = document.querySelector(`[data-hint="${target}"]`);
      setRect(el ? el.getBoundingClientRect() : null);
    };
    update();
    const id = setInterval(update, 150);
    return () => clearInterval(id);
  }, [target]);

  if (!rect) return null;

  return ReactDOM.createPortal(
    <div
      className={styles.dot}
      style={{ left: rect.right - 7 + offsetX, top: rect.top - 7 + offsetY }}
    />,
    document.body
  );
};

export default PulseHotspot;
