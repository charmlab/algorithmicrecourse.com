import HeroPathVisual from './HeroPathVisual.jsx';

const STATS = [
  { n: '150+', l: 'Papers mapped' },
  { n: '10+', l: 'Methods compared' },
  { n: '5', l: 'Metrics clarified' },
  { n: '3', l: 'Deployment lenses' },
];

export default function Hero() {
  return (
    <section className="hero-shell">
      <div className="hero-gridback" />

      <div className="hero-inner">
        <div className="hero-grid">
          <div className="fade-up">
            <div className="hero-pill">
              <div className="hero-pill-dot" />
              <span>CHARM Lab · University of Waterloo</span>
            </div>

            <h1 className="hero-title">
              Algorithmic Recourse,
              <br />
              <span>Explained and Applied</span>
            </h1>

            <p className="hero-copy">
              A practical hub for research, implementation, and deployment guidance
              for decision systems that need to offer actionable recourse instead of
              opaque denials.
            </p>

            <div className="hero-actions">
              <a className="hero-primary" href="#about">
                Explore the field
              </a>
              <a className="hero-secondary" href="#paths">
                Choose a path
              </a>
            </div>
          </div>

          <div className="fade-up hero-visual" style={{ animationDelay: '.2s' }}>
            <HeroPathVisual />
          </div>
        </div>

        <div className="hero-stats">
          {STATS.map((s) => (
            <div key={s.l}>
              <div className="hero-stat-n">{s.n}</div>
              <div className="hero-stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
