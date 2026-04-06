const PRINCIPLES = [
  {
    title: 'More than explanation',
    body: 'Recourse moves beyond telling people why a model said no. It gives them a concrete path toward a better outcome.',
  },
  {
    title: 'Where research meets product',
    body: 'Good recourse balances validity, cost, feasibility, and fairness. That makes it a design problem as much as a modeling problem.',
  },
  {
    title: 'Critical for deployment',
    body: 'In lending, hiring, insurance, and healthcare, actionable guidance can improve trust, retention, and auditability.',
  },
];

export default function WhyRecourse() {
  return (
    <section id="about" className="section-shell">
      <div className="section-heading">
        <span className="eyebrow">Why Recourse Matters</span>
        <h2>Decision systems need better answers than a rejection.</h2>
        <p>
          Algorithmic recourse sits at the intersection of responsible AI, product
          design, and operational deployment. It asks a simple question: if a model
          denies someone access, what realistic action could change that outcome?
        </p>
      </div>

      <div className="why-grid">
        <div className="why-frame card-lift">
          <div className="why-flow">
            <div className="why-step">
              <span>01</span>
              <strong>Model decision</strong>
              <p>A classifier produces an unfavorable result.</p>
            </div>
            <div className="why-arrow" />
            <div className="why-step">
              <span>02</span>
              <strong>Actionable guidance</strong>
              <p>The system identifies feasible, human-understandable changes.</p>
            </div>
            <div className="why-arrow" />
            <div className="why-step">
              <span>03</span>
              <strong>Institutional value</strong>
              <p>Teams improve usability, trust, and governance at the same time.</p>
            </div>
          </div>
        </div>

        <div className="why-principles">
          {PRINCIPLES.map((item) => (
            <article key={item.title} className="principle-card card-lift">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
