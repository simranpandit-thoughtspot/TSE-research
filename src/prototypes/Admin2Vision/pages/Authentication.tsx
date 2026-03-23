import React, { useState } from 'react';
import { mockIDPs } from '../data/mockData';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const blue = '#71a1f4';

const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    role="switch"
    aria-checked={checked}
    style={{
      position: 'relative',
      width: '36px',
      height: '20px',
      borderRadius: '10px',
      border: 'none',
      backgroundColor: checked ? blue : '#d1d5db',
      cursor: 'pointer',
      padding: 0,
      flexShrink: 0,
      transition: 'background-color 0.2s ease',
    }}
  >
    <span
      style={{
        position: 'absolute',
        top: '2px',
        left: checked ? '18px' : '2px',
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        transition: 'left 0.2s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
      }}
    />
  </button>
);

export const Authentication: React.FC = () => {
  const [idps, setIdps] = useState(mockIDPs);

  const toggleStatus = (id: string) => {
    setIdps((prev) =>
      prev.map((idp) => (idp.id === id ? { ...idp, status: !idp.status } : idp))
    );
  };

  const setDefault = (id: string) => {
    setIdps((prev) => prev.map((idp) => ({ ...idp, isDefault: idp.id === id })));
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1100px' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <div style={{ fontFamily: font, fontSize: '14px', color: '#777e8b' }}>
            Configure identity providers for single sign-on authentication.
          </div>
        </div>
        <button
          style={{
            height: '36px',
            padding: '0 18px',
            backgroundColor: blue,
            border: 'none',
            borderRadius: '8px',
            fontFamily: font,
            fontSize: '13px',
            fontWeight: 600,
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          + Add IDP
        </button>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f6f8fa', borderBottom: '1px solid #e5e7eb' }}>
              {['IDP Name', 'Type', 'Status', 'Default', 'Actions'].map((col) => (
                <th
                  key={col}
                  style={{
                    padding: '11px 18px',
                    textAlign: 'left',
                    fontFamily: font,
                    fontSize: '11.5px',
                    fontWeight: 600,
                    color: '#777e8b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {idps.map((idp, i) => (
              <tr
                key={idp.id}
                style={{
                  borderBottom: i < idps.length - 1 ? '1px solid #f3f4f6' : 'none',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = '#fafafa'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = 'transparent'; }}
              >
                <td style={{ padding: '15px 18px', fontFamily: font, fontSize: '13.5px', fontWeight: 500, color: '#1d232f' }}>
                  {idp.name}
                </td>
                <td style={{ padding: '15px 18px' }}>
                  <span
                    style={{
                      backgroundColor: idp.type === 'SAML' ? '#dee8fa' : 'rgba(113,161,244,0.12)',
                      color: idp.type === 'SAML' ? '#2770ef' : blue,
                      fontFamily: font,
                      fontSize: '12px',
                      fontWeight: 500,
                      padding: '3px 10px',
                      borderRadius: '20px',
                    }}
                  >
                    {idp.type}
                  </span>
                </td>
                <td style={{ padding: '15px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Toggle checked={idp.status} onChange={() => toggleStatus(idp.id)} />
                    <span style={{ fontFamily: font, fontSize: '13px', color: idp.status ? '#06bf7f' : '#a5acb9' }}>
                      {idp.status ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </td>
                <td style={{ padding: '15px 18px' }}>
                  {idp.isDefault ? (
                    <span
                      style={{
                        backgroundColor: '#e0f8ef',
                        color: '#06bf7f',
                        fontFamily: font,
                        fontSize: '12px',
                        fontWeight: 500,
                        padding: '3px 10px',
                        borderRadius: '20px',
                      }}
                    >
                      Default
                    </span>
                  ) : (
                    <button
                      onClick={() => setDefault(idp.id)}
                      style={{
                        background: 'none',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        padding: '4px 12px',
                        fontFamily: font,
                        fontSize: '12px',
                        color: '#777e8b',
                        cursor: 'pointer',
                      }}
                    >
                      Set default
                    </button>
                  )}
                </td>
                <td style={{ padding: '15px 18px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      style={{
                        background: 'none',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        padding: '5px 12px',
                        fontFamily: font,
                        fontSize: '12.5px',
                        color: '#1d232f',
                        cursor: 'pointer',
                      }}
                    >
                      Configure
                    </button>
                    <button
                      style={{
                        background: 'none',
                        border: '1px solid #fecaca',
                        borderRadius: '6px',
                        padding: '5px 12px',
                        fontFamily: font,
                        fontSize: '12.5px',
                        color: '#e22b3d',
                        cursor: 'pointer',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
