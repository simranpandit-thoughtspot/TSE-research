import React from 'react';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const blue = '#71a1f4';

interface PlaceholderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ title, description, icon }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '400px',
      gap: '16px',
      padding: '32px',
    }}
  >
    <div
      style={{
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        backgroundColor: 'rgba(113,161,244,0.1)',
        border: '1px solid rgba(113,161,244,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon || (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="8" height="8" rx="2" stroke={blue} strokeWidth="1.5" />
          <rect x="13" y="3" width="8" height="8" rx="2" stroke={blue} strokeWidth="1.5" />
          <rect x="3" y="13" width="8" height="8" rx="2" stroke={blue} strokeWidth="1.5" />
          <rect x="13" y="13" width="8" height="8" rx="2" stroke={blue} strokeWidth="1.5" />
        </svg>
      )}
    </div>
    <div style={{ fontFamily: font, fontSize: '18px', fontWeight: 700, color: '#1d232f', textAlign: 'center' }}>
      {title}
    </div>
    <div
      style={{
        fontFamily: font,
        fontSize: '14px',
        color: '#777e8b',
        textAlign: 'center',
        maxWidth: '380px',
        lineHeight: 1.6,
      }}
    >
      {description || 'This page is currently in development and will be available in an upcoming release.'}
    </div>
    <div
      style={{
        marginTop: '8px',
        padding: '8px 20px',
        backgroundColor: 'rgba(113,161,244,0.1)',
        border: '1px solid rgba(113,161,244,0.2)',
        borderRadius: '20px',
        fontFamily: font,
        fontSize: '12.5px',
        color: blue,
        fontWeight: 500,
      }}
    >
      Coming soon
    </div>
  </div>
);
