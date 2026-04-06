import { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { METHODS, MODEL_TYPES, DATA_TYPES } from '../../../data/methods.js';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: '#0f172a', color: '#fff', padding: '10px 14px', borderRadius: 9, fontSize: '.78rem', lineHeight: 1.6, boxShadow: '0 8px 24px rgba(0,0,0,.2)' }}>
      <div style={{ fontWeight: 800, marginBottom: 4 }}>{d.name}</div>
      <div>Validity: {d.validity}%</div>
      <div>Runtime: {d.runtime}s</div>
      <div>Sparsity: {d.sparsity}</div>
      <div style={{ color: '#94a3b8', marginTop: 3, fontFamily: '"JetBrains Mono",monospace' }}>pkg: {d.pkg}</div>
    </div>
  );
}

export default function ApplicabilityMatrix({ modelFilter, dataFilter, onModelChange, onDataChange }) {
  const filtered = useMemo(() => {
    return METHODS
      .filter(m => (modelFilter === 'All' || m.model === modelFilter || m.model === 'Any') && (dataFilter === 'All' || m.data === dataFilter))
      .map(m => ({ ...m, z: m.sparsity * 80 }));
  }, [modelFilter, dataFilter]);

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: '.95rem', fontWeight: 800, marginBottom: '.75rem', letterSpacing: '-.02em' }}>Applicability Matrix</h3>

      <div style={{ display: 'flex', gap: 8, marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '.65rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>Model</div>
          <select value={modelFilter} onChange={e => onModelChange(e.target.value)}
            style={{ padding: '6px 10px', background: '#f1f5f9', border: '1.5px solid #e2e8f0', borderRadius: 7, fontSize: '.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            {MODEL_TYPES.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <div style={{ fontSize: '.65rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>Data</div>
          <select value={dataFilter} onChange={e => onDataChange(e.target.value)}
            style={{ padding: '6px 10px', background: '#f1f5f9', border: '1.5px solid #e2e8f0', borderRadius: 7, fontSize: '.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            {DATA_TYPES.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div style={{ fontSize: '.68rem', color: '#94a3b8', marginBottom: 8 }}>
        Runtime (s) vs Validity (%) · Bubble size = Sparsity · {filtered.length} methods shown
      </div>

      <div style={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis type="number" dataKey="runtime" name="Runtime" unit="s" tick={{ fontSize: 11, fill: '#64748b' }} label={{ value: 'Runtime (s)', position: 'insideBottom', offset: -10, fontSize: 11, fill: '#94a3b8' }} />
            <YAxis type="number" dataKey="validity" name="Validity" unit="%" domain={[70, 100]} tick={{ fontSize: 11, fill: '#64748b' }} label={{ value: 'Validity %', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#94a3b8' }} />
            <ZAxis type="number" dataKey="z" range={[60, 300]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
            <Scatter data={filtered}>
              {filtered.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
