const APPROACH_COLORS = {
  Optimization:  { bg: '#dbeafe', color: '#1d4ed8' },
  Gradient:      { bg: '#ede9fe', color: '#6d28d9' },
  Causal:        { bg: '#dcfce7', color: '#166534' },
  Graph:         { bg: '#fef9c3', color: '#854d0e' },
  'Game-Theoretic': { bg: '#fee2e2', color: '#991b1b' },
  Theoretical:   { bg: '#f1f5f9', color: '#475569' },
};

export default function PaperCard({ paper }) {
  const ap = APPROACH_COLORS[paper.approach] ?? { bg: '#f1f5f9', color: '#475569' };

  return (
    <div className="card-lift" style={{
      background: '#fff', border: '1px solid #e2e8f0',
      borderRadius: 10, padding: '1rem 1.2rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: '.85rem', fontWeight: 700, lineHeight: 1.4, marginBottom: 4, color: '#0f172a' }}>
            {paper.title}
          </h4>
          <div style={{ fontSize: '.75rem', color: '#64748b', marginBottom: 6 }}>
            {paper.authors} · {paper.year}
          </div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <span className="chip" style={{ background: ap.bg, color: ap.color }}>{paper.approach}</span>
            {paper.tags.map(t => (
              <span key={t} className="chip" style={{ background: '#f1f5f9', color: '#475569' }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{ fontSize: '.95rem', fontWeight: 800, color: '#0f172a' }}>{paper.citations}</div>
          <div style={{ fontSize: '.6rem', color: '#94a3b8', fontWeight: 600 }}>CITES</div>
        </div>
      </div>
    </div>
  );
}
