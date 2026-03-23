import React, { useState } from 'react';
import { mockVariables, type MockVariable } from '../data/mockData';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const blue = '#71a1f4';

const TypeBadge: React.FC<{ type: MockVariable['type'] }> = ({ type }) => {
  const map: Record<string, { bg: string; color: string }> = {
    connection: { bg: '#dee8fa', color: '#2770ef' },
    formula: { bg: 'rgba(113,161,244,0.12)', color: blue },
    text: { bg: '#f3f4f6', color: '#777e8b' },
    number: { bg: '#e0f8ef', color: '#06bf7f' },
  };
  const style = map[type] || map['text'];
  return (
    <span
      style={{
        padding: '3px 10px',
        borderRadius: '20px',
        backgroundColor: style.bg,
        color: style.color,
        fontFamily: font,
        fontSize: '12px',
        fontWeight: 500,
      }}
    >
      {type}
    </span>
  );
};

export const Variables: React.FC = () => {
  const [variables, setVariables] = useState(mockVariables);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<MockVariable['type']>('text');
  const [newValue, setNewValue] = useState('');

  const startEdit = (v: MockVariable) => {
    setEditingId(v.id);
    setEditValue(v.value);
  };

  const saveEdit = (id: string) => {
    setVariables((prev) => prev.map((v) => (v.id === id ? { ...v, value: editValue } : v)));
    setEditingId(null);
  };

  const deleteVar = (id: string) => {
    setVariables((prev) => prev.filter((v) => v.id !== id));
  };

  const addVariable = () => {
    if (!newName.trim()) return;
    const newVar: MockVariable = {
      id: String(Date.now()),
      name: newName.toUpperCase().replace(/\s+/g, '_'),
      type: newType,
      value: newValue,
    };
    setVariables((prev) => [...prev, newVar]);
    setNewName('');
    setNewType('text');
    setNewValue('');
    setShowAddForm(false);
  };

  return (
    <div style={{ padding: '32px', maxWidth: '900px' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ fontFamily: font, fontSize: '14px', color: '#777e8b' }}>
          Variables let you inject dynamic values into formulas and connections across the instance.
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
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
            whiteSpace: 'nowrap',
          }}
        >
          + Add variable
        </button>
      </div>

      {/* Add form */}
      {showAddForm && (
        <div
          style={{
            backgroundColor: '#fff',
            border: `1px solid ${blue}`,
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '16px',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-end',
            boxShadow: `0 0 0 3px rgba(113,161,244,0.12)`,
          }}
        >
          <div style={{ flex: 2 }}>
            <label style={{ display: 'block', fontFamily: font, fontSize: '12px', fontWeight: 600, color: '#777e8b', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Variable name
            </label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="MY_VARIABLE"
              style={{
                width: '100%',
                height: '36px',
                padding: '0 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontFamily: font,
                fontSize: '13px',
                color: '#1d232f',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontFamily: font, fontSize: '12px', fontWeight: 600, color: '#777e8b', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Type
            </label>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as MockVariable['type'])}
              style={{
                width: '100%',
                height: '36px',
                padding: '0 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontFamily: font,
                fontSize: '13px',
                color: '#1d232f',
                outline: 'none',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
            >
              <option value="text">text</option>
              <option value="number">number</option>
              <option value="formula">formula</option>
              <option value="connection">connection</option>
            </select>
          </div>
          <div style={{ flex: 2 }}>
            <label style={{ display: 'block', fontFamily: font, fontSize: '12px', fontWeight: 600, color: '#777e8b', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Value
            </label>
            <input
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Enter value…"
              style={{
                width: '100%',
                height: '36px',
                padding: '0 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontFamily: font,
                fontSize: '13px',
                color: '#1d232f',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <button
            onClick={addVariable}
            style={{
              height: '36px',
              padding: '0 16px',
              backgroundColor: blue,
              border: 'none',
              borderRadius: '6px',
              fontFamily: font,
              fontSize: '13px',
              fontWeight: 600,
              color: '#fff',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Add
          </button>
          <button
            onClick={() => setShowAddForm(false)}
            style={{
              height: '36px',
              padding: '0 14px',
              backgroundColor: 'transparent',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              fontFamily: font,
              fontSize: '13px',
              color: '#777e8b',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Table */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f6f8fa', borderBottom: '1px solid #e5e7eb' }}>
              {['Variable name', 'Type', 'Value', 'Actions'].map((col) => (
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
            {variables.map((v, i) => (
              <tr
                key={v.id}
                style={{
                  borderBottom: i < variables.length - 1 ? '1px solid #f3f4f6' : 'none',
                  backgroundColor: editingId === v.id ? 'rgba(113,161,244,0.04)' : 'transparent',
                  cursor: 'pointer',
                }}
                onClick={() => editingId !== v.id && startEdit(v)}
                onMouseEnter={(e) => { if (editingId !== v.id) (e.currentTarget as HTMLTableRowElement).style.backgroundColor = '#fafafa'; }}
                onMouseLeave={(e) => { if (editingId !== v.id) (e.currentTarget as HTMLTableRowElement).style.backgroundColor = 'transparent'; }}
              >
                <td style={{ padding: '13px 18px', fontFamily: 'monospace', fontSize: '13px', fontWeight: 600, color: '#1d232f' }}>
                  {v.name}
                </td>
                <td style={{ padding: '13px 18px' }}>
                  <TypeBadge type={v.type} />
                </td>
                <td style={{ padding: '8px 18px' }}>
                  {editingId === v.id ? (
                    <input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      autoFocus
                      style={{
                        width: '100%',
                        height: '32px',
                        padding: '0 10px',
                        border: `1px solid ${blue}`,
                        borderRadius: '5px',
                        fontFamily: 'monospace',
                        fontSize: '13px',
                        color: '#1d232f',
                        outline: 'none',
                        boxSizing: 'border-box',
                        boxShadow: `0 0 0 2px rgba(113,161,244,0.2)`,
                      }}
                    />
                  ) : (
                    <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#777e8b' }}>{v.value}</span>
                  )}
                </td>
                <td style={{ padding: '13px 18px' }} onClick={(e) => e.stopPropagation()}>
                  {editingId === v.id ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => saveEdit(v.id)}
                        style={{
                          padding: '5px 12px',
                          backgroundColor: blue,
                          border: 'none',
                          borderRadius: '5px',
                          fontFamily: font,
                          fontSize: '12.5px',
                          fontWeight: 600,
                          color: '#fff',
                          cursor: 'pointer',
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: 'transparent',
                          border: '1px solid #e5e7eb',
                          borderRadius: '5px',
                          fontFamily: font,
                          fontSize: '12.5px',
                          color: '#777e8b',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => startEdit(v)}
                        style={{
                          padding: '5px 12px',
                          backgroundColor: 'transparent',
                          border: '1px solid #e5e7eb',
                          borderRadius: '5px',
                          fontFamily: font,
                          fontSize: '12.5px',
                          color: '#1d232f',
                          cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteVar(v.id)}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: 'transparent',
                          border: '1px solid #fecaca',
                          borderRadius: '5px',
                          fontFamily: font,
                          fontSize: '12.5px',
                          color: '#e22b3d',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
