const FOOTER_LINKS = {
  Platform:  ['Research Papers', 'Benchmark', 'Methods Library', 'Idea Board', 'Open Problems'],
  Community: ['GitHub', 'Submit a Paper', 'Submit a Method', 'Mailing List', 'Contact'],
  Enterprise:['Partner with Us', 'Schedule an Audit', 'Case Studies', 'Compliance Guide', 'API Access'],
};

export default function Footer() {
  const linkStyle = {
    display: 'block', fontSize: '.85rem', color: 'rgba(255,255,255,.55)',
    textDecoration: 'none', marginBottom: 8, transition: 'color .15s',
  };

  return (
    <footer style={{ background: '#0f172a', padding: '3rem 2rem 2rem', borderTop: '1px solid rgba(255,255,255,.06)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: '1rem' }}>
              <div style={{ width: 30, height: 30, background: 'linear-gradient(135deg,#1e3a8a,#2563eb)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9h4l2-5 2 10 2-5h4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ fontWeight: 800, color: '#fff', fontSize: '.92rem' }}>AlgorithmicRecourse</span>
            </div>
            <p style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.45)', lineHeight: 1.65, maxWidth: 240, marginBottom: '1rem' }}>
              The comprehensive hub for algorithmic recourse research, tools, and enterprise deployment.
            </p>
            <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.28)', lineHeight: 1.6 }}>
              CHARM Lab · University of Waterloo<br />Waterloo, ON, Canada
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, items]) => (
            <div key={heading}>
              <div style={{ fontSize: '.68rem', fontWeight: 700, color: 'rgba(255,255,255,.28)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '1rem' }}>
                {heading}
              </div>
              {items.map(l => (
                <a key={l} href="#" style={linkStyle}
                   onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                   onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.55)'}>
                  {l}
                </a>
              ))}
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <div style={{ fontSize: '.68rem', fontWeight: 700, color: 'rgba(255,255,255,.28)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '1rem' }}>
              Stay Updated
            </div>
            <p style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.45)', lineHeight: 1.65, marginBottom: '1rem' }}>
              New papers, benchmarks, and tools — directly to your inbox.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="email" placeholder="you@university.edu"
                style={{ flex: 1, padding: '9px 12px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 7, color: '#fff', fontSize: '.82rem', outline: 'none', fontFamily: 'inherit' }} />
              <button style={{ padding: '9px 16px', background: '#2563eb', color: '#fff', borderRadius: 7, fontWeight: 700, fontSize: '.85rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>→</button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.3)' }}>
            © 2025 CHARM Lab, University of Waterloo. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy', 'Terms', 'Accessibility'].map(l => (
              <a key={l} href="#" style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.3)', textDecoration: 'none', transition: 'color .15s' }}
                 onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,.7)'}
                 onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.3)'}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
