export default function PathCards({ activePath, setActivePath, tracks }) {
  return (
    <section id="paths" className="section-shell">
      <div className="section-heading">
        <span className="eyebrow">Choose Your Path</span>
        <h2>Different audiences, one shared problem space.</h2>
        <p>
          Use the lens that fits your work. Each path is curated around a specific
          job to be done, not just a list of links.
        </p>
      </div>

      <div className="path-grid">
        {tracks.map((track) => {
          const isActive = activePath === track.key;

          return (
            <button
              key={track.key}
              type="button"
              className={`path-card card-lift${isActive ? ' active' : ''}`}
              onClick={() => setActivePath(track.key)}
            >
              <div className="path-card-top">
                <span className="path-badge" style={{ background: track.softColor, color: track.color }}>
                  {track.label}
                </span>
                <span className="path-kicker" style={{ color: track.color }}>
                  {track.kicker}
                </span>
              </div>

              <h3>{track.title}</h3>
              <p>{track.description}</p>

              <ul>
                {track.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              <span className="path-cta" style={{ color: track.color }}>
                {isActive ? 'Selected below' : track.cta}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
