import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './HintDot.module.css';

interface Props {
  target: string;
}

const HintDot: React.FC<Props> = ({ target }) => {
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
      style={{ left: rect.right - 7, top: rect.top - 7 }}
    />,
    document.body
  );
};

export default HintDot;
