import HeroPathVisual from './HeroPathVisual.jsx';

const PERSONA_BUTTONS = [
  { label: "I'm a Researcher",      color: '#2563eb', bg: '#dbeafe', href: '#research' },
  { label: "I'm a Practitioner",    color: '#7c3aed', bg: '#ede9fe', href: '#build'    },
  { label: "I'm a Decision-Maker",  color: '#059669', bg: '#dcfce7', href: '#deploy'   },
];

const STATS = [
  { n: '150+', l: 'Research Papers'   },
  { n: '10+',  l: 'Benchmark Methods' },
  { n: '5',    l: 'Evaluation Metrics'},
  { n: '3',    l: 'Persona Tracks'    },
];

export default function Hero() {
  return (
    <section style={{
      paddingTop: '6.5rem', paddingBottom: '4rem',
      background: 'linear-gradient(180deg,#f8fafc 0%,#ffffff 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
        backgroundSize: '80px 80px', opacity: .3,
        maskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, black, transparent)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

          {/* Copy */}
          <div className="fade-up">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: '#dbeafe', borderRadius: 99, marginBottom: '1.5rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563eb', animation: 'pulse 2s ease infinite' }} />
              <span style={{ fontSize: '.72rem', fontWeight: 700, color: '#1d4ed8', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                CHARM Lab · University of Waterloo
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.4rem,4.5vw,3.6rem)', fontWeight: 900, letterSpacing: '-.04em', lineHeight: 1.1, color: '#0f172a', marginBottom: '1.5rem' }}>
              Turn AI Rejections
              <br />into{' '}
              <span style={{ background: 'linear-gradient(90deg,#2563eb,#7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Actionable Paths
              </span>
            </h1>

            <p style={{ fontSize: '1.12rem', color: '#475569', lineHeight: 1.78, maxWidth: 520, marginBottom: '2.25rem' }}>
              The comprehensive research hub for algorithmic recourse — bridging academic theory,
              engineering practice, and enterprise deployment.
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {PERSONA_BUTTONS.map(b => (
                <a key={b.label} href={b.href}
                   style={{ padding: '11px 22px', background: b.bg, color: b.color, borderRadius: 10, fontWeight: 700, fontSize: '.88rem', textDecoration: 'none', border: `1.5px solid ${b.color}22`, transition: 'all .2s' }}
                   onMouseEnter={e => { e.currentTarget.style.background = b.color; e.currentTarget.style.color = '#fff'; }}
                   onMouseLeave={e => { e.currentTarget.style.background = b.bg; e.currentTarget.style.color = b.color; }}>
                  {b.label}
                </a>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="fade-up" style={{ animationDelay: '.2s' }}>
            <HeroPathVisual />
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem', marginTop: '4rem',
          padding: '1.75rem 2rem', background: '#fff', borderRadius: 14,
          border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,.04)',
        }}>
          {STATS.map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-.03em' }}>{s.n}</div>
              <div style={{ fontSize: '.78rem', color: '#64748b', fontWeight: 600, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
