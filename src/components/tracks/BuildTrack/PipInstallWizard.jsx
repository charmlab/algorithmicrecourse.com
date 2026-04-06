import { useState, useMemo } from 'react';
import { METHODS } from '../../../data/methods.js';

const MODEL_OPTIONS   = ['Tree-Based', 'Neural Net', 'Linear', 'SVM'];
const DATASET_OPTIONS = ['german-credit', 'adult-income', 'compas', 'give-me-credit'];

export default function PipInstallWizard({ modelFilter, dataFilter }) {
  const [selModel,   setSelModel]   = useState('Tree-Based');
  const [selDataset, setSelDataset] = useState('german-credit');

  const filteredMethods = useMemo(() => {
    return METHODS
      .filter(m => (modelFilter === 'All' || m.model === modelFilter || m.model === 'Any') && (dataFilter === 'All' || m.data === dataFilter))
      .slice(0, 3);
  }, [modelFilter, dataFilter]);

  const { install, code } = useMemo(() => {
    const pkgs = [...new Set(filteredMethods.map(m => m.pkg))];
    const methodNames = filteredMethods.map(m => `'${m.name}'`).join(', ');
    return {
      install: pkgs.map(p => `pip install ${p}`).join('\n'),
      code: `from carla import Benchmark, MLModel
from carla.evaluation import auto_evaluate

# Load model & data
model = MLModel.load("${selModel.toLowerCase().replace(/[^a-z]/g, '_')}")
data  = Benchmark("${selDataset}")

# Evaluate top methods
results = auto_evaluate(
    model, data,
    methods=[${methodNames}]
)
print(results.summary())`,
    };
  }, [filteredMethods, selModel, selDataset]);

  return (
    <div style={{ background: '#0f172a', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '.95rem', fontWeight: 800, color: '#fff', letterSpacing: '-.02em' }}>Quick Start</h3>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ef4444', '#f59e0b', '#22c55e'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
        <select value={selModel} onChange={e => setSelModel(e.target.value)}
          style={{ padding: '6px 10px', background: '#1e293b', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 6, fontSize: '.78rem', fontWeight: 600, fontFamily: 'inherit' }}>
          {MODEL_OPTIONS.map(m => <option key={m}>{m}</option>)}
        </select>
        <select value={selDataset} onChange={e => setSelDataset(e.target.value)}
          style={{ padding: '6px 10px', background: '#1e293b', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 6, fontSize: '.78rem', fontWeight: 600, fontFamily: 'inherit' }}>
          {DATASET_OPTIONS.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      <pre style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '.78rem', lineHeight: 1.8, color: '#e2e8f0', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
        <span style={{ color: '#6b7280' }}># Install packages</span>{'\n'}
        <span style={{ color: '#4ade80' }}>$</span> {install}{'\n\n'}
        <span style={{ color: '#6b7280' }}># Evaluate recourse methods</span>{'\n'}
        <span style={{ color: '#93c5fd' }}>{code}</span>
      </pre>
    </div>
  );
}
