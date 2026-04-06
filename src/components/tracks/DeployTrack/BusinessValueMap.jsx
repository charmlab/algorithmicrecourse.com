import { BUSINESS_MAP } from '../../../data/business.js';

export default function BusinessValueMap() {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-.02em', marginBottom: '1rem' }}>
        Why It Matters to Your Business
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {BUSINESS_MAP.map(b => (
          <div key={b.metric} className="card-lift" style={{ display: 'flex', alignItems: 'stretch', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 11, overflow: 'hidden' }}>
            <div style={{ width: 4, background: b.color, flexShrink: 0 }} />
            <div style={{ flex: 1, padding: '1rem 1.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: b.colorBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                  {b.icon}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '.82rem', fontWeight: 800, color: '#0f172a' }}>{b.metric}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke={b.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: '.82rem', fontWeight: 800, color: b.color }}>{b.business}</span>
                </div>
              </div>
              <p style={{ fontSize: '.8rem', color: '#64748b', lineHeight: 1.6 }}>{b.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
