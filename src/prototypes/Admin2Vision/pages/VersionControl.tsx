import React, { useState } from 'react';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const blue = '#71a1f4';

export const VersionControl: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div style={{ padding: '32px', maxWidth: '700px' }}>
      {!enabled ? (
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            padding: '60px 48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '20px',
          }}
        >
          {/* Illustration placeholder */}
          <div
            style={{
              width: '260px',
              height: '160px',
              borderRadius: '12px',
              backgroundColor: '#f6f8fa',
              border: '1px solid #eaedf2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="20" stroke="#c0c6cf" strokeWidth="2" />
              <circle cx="24" cy="15" r="4" fill="#c0c6cf" />
              <circle cx="14" cy="33" r="4" fill="#c0c6cf" />
              <circle cx="34" cy="33" r="4" fill="#c0c6cf" />
              <line x1="24" y1="19" x2="24" y2="26" stroke="#c0c6cf" strokeWidth="1.5" />
              <line x1="24" y1="26" x2="14" y2="29" stroke="#c0c6cf" strokeWidth="1.5" />
              <line x1="24" y1="26" x2="34" y2="29" stroke="#c0c6cf" strokeWidth="1.5" />
            </svg>
            <span style={{ fontFamily: font, fontSize: '12px', color: '#a5acb9' }}>Version control illustration</span>
          </div>

          <div>
            <div style={{ fontFamily: font, fontSize: '22px', fontWeight: 700, color: '#1d232f', marginBottom: '10px' }}>
              Version control
            </div>
            <div
              style={{
                fontFamily: font,
                fontSize: '14px',
                color: '#777e8b',
                lineHeight: 1.7,
                maxWidth: '440px',
              }}
            >
              Track, manage, and roll back changes to your ThoughtSpot content and configurations. Connect to a Git repository to enable version control for liveboards, answers, worksheets, and admin settings.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={() => setEnabled(true)}
              style={{
                height: '42px',
                padding: '0 28px',
                backgroundColor: blue,
                border: 'none',
                borderRadius: '8px',
                fontFamily: font,
                fontSize: '14px',
                fontWeight: 600,
                color: '#fff',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(113,161,244,0.35)',
              }}
            >
              Enable version control
            </button>
            <button
              style={{
                background: 'none',
                border: 'none',
                fontFamily: font,
                fontSize: '13px',
                color: blue,
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              Learn more about version control →
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            padding: '40px 48px',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: font, fontSize: '18px', fontWeight: 700, color: '#1d232f', marginBottom: '4px' }}>
                Version control
              </div>
              <div style={{ fontFamily: font, fontSize: '13px', color: '#777e8b' }}>
                Connected to Git repository
              </div>
            </div>
            <span
              style={{
                backgroundColor: '#e0f8ef',
                color: '#06bf7f',
                fontFamily: font,
                fontSize: '12.5px',
                fontWeight: 500,
                padding: '4px 12px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#06bf7f' }} />
              Active
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Repository URL', value: 'https://github.com/acme/thoughtspot-config' },
              { label: 'Branch', value: 'main' },
              { label: 'Last synced', value: 'March 22, 2026 at 11:43 AM' },
              { label: 'Commit hash', value: 'a3f9c12' },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 20px',
                  backgroundColor: '#f6f8fa',
                  borderRadius: '8px',
                  gap: '16px',
                }}
              >
                <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 500, color: '#777e8b', width: '140px', flexShrink: 0 }}>
                  {label}
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#1d232f' }}>{value}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              style={{
                height: '36px',
                padding: '0 18px',
                backgroundColor: blue,
                border: 'none',
                borderRadius: '7px',
                fontFamily: font,
                fontSize: '13px',
                fontWeight: 600,
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              Sync now
            </button>
            <button
              style={{
                height: '36px',
                padding: '0 18px',
                backgroundColor: 'transparent',
                border: '1px solid #e5e7eb',
                borderRadius: '7px',
                fontFamily: font,
                fontSize: '13px',
                color: '#777e8b',
                cursor: 'pointer',
              }}
            >
              Configure
            </button>
            <button
              onClick={() => setEnabled(false)}
              style={{
                height: '36px',
                padding: '0 18px',
                backgroundColor: 'transparent',
                border: '1px solid #fecaca',
                borderRadius: '7px',
                fontFamily: font,
                fontSize: '13px',
                color: '#e22b3d',
                cursor: 'pointer',
                marginLeft: 'auto',
              }}
            >
              Disable
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
