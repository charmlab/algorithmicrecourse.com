import { METRICS_GLOSSARY } from '../../../data/methods.js';

export default function MetricsGlossary() {
  return (
    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-.02em', marginBottom: '1rem' }}>
        Metrics Glossary
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {METRICS_GLOSSARY.map(m => (
          <div key={m.term} style={{ display: 'flex', gap: 12, padding: '10px 12px', background: '#f8fafc', borderRadius: 9, border: '1px solid #f1f5f9' }}>
            <div style={{ minWidth: 110 }}>
              <div style={{ fontSize: '.85rem', fontWeight: 800, color: '#0f172a' }}>{m.term}</div>
              <div style={{ fontSize: '.65rem', color: '#94a3b8', fontWeight: 600 }}>aka: {m.aka}</div>
            </div>
            <div style={{ fontSize: '.8rem', color: '#475569', lineHeight: 1.55, flex: 1 }}>{m.def}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
