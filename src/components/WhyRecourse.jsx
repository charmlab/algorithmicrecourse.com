const STAKEHOLDERS = [
  {
    icon: '👤',
    audience: 'For individuals',
    color: '#2453a6',
    soft: '#dbe7ff',
    headline: 'Understand why you were rejected — and what to do next',
    body: 'When a loan, job, or benefit is denied by an automated system, recourse gives you a concrete, actionable path forward. Instead of an opaque "no," you get a specific set of steps that would lead to approval.',
  },
  {
    icon: '⚖️',
    audience: 'For regulators',
    color: '#8a4b18',
    soft: '#f7e5d1',
    headline: 'Make automated decisions legally accountable',
    body: 'Regulations like the EU AI Act and GDPR Article 22 require that consequential automated decisions be explainable and contestable. Algorithmic recourse operationalises this right — turning legal obligations into verifiable system properties.',
  },
  {
    icon: '🏦',
    audience: 'For businesses',
    color: '#1d7a55',
    soft: '#dff3ea',
    headline: 'Build trust, reduce appeals, and demonstrate fairness',
    body: 'Deploying a recourse system signals transparency to customers and auditors alike. It reduces the volume of manual appeals, produces an audit trail for compliance reviews, and turns rejections into retention opportunities.',
  },
];

export default function WhyRecourse() {
  return (
    <section className="why-section section-shell" id="about">
      <div className="section-heading">
        <span className="eyebrow">Why it matters</span>
        <h2>Recourse is accountability made actionable</h2>
      </div>
      <div className="why-boxes">
        {STAKEHOLDERS.map(s => (
          <div key={s.audience} className="why-box card-lift">
            <div className="why-box-icon" style={{ background: s.soft, color: s.color }}>
              {s.icon}
            </div>
            <span className="eyebrow" style={{ color: s.color }}>{s.audience}</span>
            <h3 className="why-box-heading">{s.headline}</h3>
            <p className="why-box-body">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
