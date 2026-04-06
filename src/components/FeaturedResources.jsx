import { PAPERS } from '../data/papers.js';
import { METHODS } from '../data/methods.js';
import { BUSINESS_MAP } from '../data/business.js';

const resourceCards = [
  {
    eyebrow: 'Foundational paper',
    title: PAPERS[0].title,
    meta: `${PAPERS[0].authors} · ${PAPERS[0].year}`,
    body: 'Start with the paper that established the modern language around actionable counterfactual guidance.',
    href: '#research-panel',
  },
  {
    eyebrow: 'Builder reference',
    title: `${METHODS[0].name} and peer methods`,
    meta: `${METHODS.length}+ implementation patterns`,
    body: 'Compare practical approaches by runtime, validity, sparsity, and data assumptions before you prototype.',
    href: '#build-panel',
  },
  {
    eyebrow: 'Deployment lens',
    title: BUSINESS_MAP[2].business,
    meta: `${BUSINESS_MAP[2].metric} as an operating concern`,
    body: 'Frame recourse as product design, policy, and governance work rather than a purely technical feature.',
    href: '#deploy-panel',
  },
];

export default function FeaturedResources() {
  return (
    <section className="section-shell">
      <div className="section-heading">
        <span className="eyebrow">Featured Resources</span>
        <h2>Start with a few well-chosen entry points.</h2>
        <p>
          The field is wide. These anchors give first-time visitors a cleaner way
          into the research, implementation, and deployment questions that matter most.
        </p>
      </div>

      <div className="resource-grid">
        {resourceCards.map((card) => (
          <a key={card.title} className="resource-card card-lift" href={card.href}>
            <span className="resource-eyebrow">{card.eyebrow}</span>
            <h3>{card.title}</h3>
            <div className="resource-meta">{card.meta}</div>
            <p>{card.body}</p>
            <span className="resource-link">Open section</span>
          </a>
        ))}
      </div>
    </section>
  );
}
