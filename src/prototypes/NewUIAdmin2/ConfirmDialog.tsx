import React from 'react';
import { RdModal } from '@components/RdModal';

// ─── ConfirmDialog ─────────────────────────────────────────────────────────────
// Simple yes/no confirmation modal built on top of RdModal.
// Always M1 (394px) — all warning/confirmation dialogs use M1.

export const ConfirmDialog: React.FC<{
  title: string;
  message: string | React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}> = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Yes',
  cancelLabel = 'No',
}) => (
  <RdModal
    size="M1"
    title={title}
    onClose={onCancel}
    cancelLabel={cancelLabel}
    onCancel={onCancel}
    confirmLabel={confirmLabel}
    onConfirm={onConfirm}
  >
    <div style={{
      fontSize: '14px', color: '#374151', lineHeight: 1.65,
      fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {message}
    </div>
  </RdModal>
);

export default ConfirmDialog;
