import React from 'react';
import { systemColors } from '../../tokens/colors';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const brand = systemColors.light['content-brand'];

// ─── ConfirmDialog ─────────────────────────────────────────────────────────────
// Shared reset/confirm dialog used across all admin sections.

export const ConfirmDialog: React.FC<{
  title: string;
  message: string | React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}> = ({ title, message, onConfirm, onCancel, confirmLabel = 'Yes', cancelLabel = 'No' }) => (
  <div
    style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.38)',
      zIndex: 10001, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
    onClick={onCancel}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        backgroundColor: '#FFFFFF', borderRadius: '12px',
        boxShadow: '0 24px 56px rgba(0,0,0,0.20)',
        width: '460px', fontFamily: font, overflow: 'hidden',
      }}
    >
      {/* Title */}
      <div style={{ padding: '28px 32px 20px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ fontSize: '17px', fontWeight: 700, color: '#111827', fontFamily: font }}>
          {title}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 32px 28px' }}>
        <div style={{ fontSize: '14px', color: '#374151', lineHeight: 1.65, fontFamily: font }}>
          {message}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex', justifyContent: 'flex-end', gap: '12px',
        padding: '0 32px 28px',
      }}>
        <button
          onClick={onCancel}
          style={{
            height: '36px', padding: '0 24px', borderRadius: '20px',
            border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB',
            cursor: 'pointer', fontFamily: font, fontSize: '13.5px', fontWeight: 500, color: '#374151',
            transition: 'background-color 0.15s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F3F4F6'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F9FAFB'; }}
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          style={{
            height: '36px', padding: '0 24px', borderRadius: '20px',
            border: 'none', backgroundColor: brand,
            cursor: 'pointer', fontFamily: font, fontSize: '13.5px', fontWeight: 600, color: '#FFFFFF',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.9'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmDialog;
