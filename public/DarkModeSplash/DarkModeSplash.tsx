import { useEffect, useRef, useState } from 'react';

const ITERATIONS = [
  { label: 'Iteration 1 — Circular reveal', path: '/DarkModeSplash/index.html' },
  { label: 'Iteration 2 — The Horizon',     path: '/DarkModeSplash/index-v2.html' },
  { label: 'Iteration 3 — The Horizon v2',  path: '/DarkModeSplash/index-v3.html' },
];

export default function DarkModeSplash() {
  const [active, setActive] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Force iframe reload when switching iteration
  useEffect(() => {
    const el = iframeRef.current;
    if (el) el.src = ITERATIONS[active].path;
  }, [active]);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#dde1e9', overflow: 'hidden' }}>
      {/* Iteration switcher */}
      <div style={{ display: 'flex', gap: 2, padding: '10px 16px 8px', flexShrink: 0, background: '#dde1e9' }}>
        {ITERATIONS.map((it, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding: '5px 14px',
              border: '1px solid',
              borderColor: i === active ? '#1d232f' : '#c4c9d4',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 500,
              background: i === active ? '#1d232f' : 'white',
              color: i === active ? 'white' : '#4a5568',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {it.label}
          </button>
        ))}
      </div>

      {/* The prototype — served from public/DarkModeSplash/ */}
      <iframe
        ref={iframeRef}
        src={ITERATIONS[active].path}
        style={{ flex: 1, border: 'none', display: 'block' }}
        title="Dark Mode Switch Splash"
        allow="autoplay"
      />
    </div>
  );
}
