import { useState } from 'react';

const IDEAS = [
  {
    id: 1,
    title: 'Recourse under Causal Ambiguity',
    category: 'Causality',
    tldr: 'Recourse that remains valid when the causal model is uncertain.',
    description: [
      'Most recourse methods assume a fixed structural causal model (SCM), yet real deployments rarely have uniquely identified causal structures. Multiple graphs or mechanisms may be consistent with observed data, and a recommendation that is valid under one model may fail under another. This raises a fundamental issue: recourse is only as reliable as the causal assumptions it is built on. This problem studies how to design recourse that is robust to sets of plausible causal models rather than a single assumed ground truth.',
      'Addressing this gap is critical in domains like healthcare, policy, and economics, where causal knowledge is inherently incomplete. Developing ambiguity-aware recourse would shift the field toward uncertainty-aware intervention design, ensuring that recommended actions remain valid across multiple plausible worlds and avoiding misleading or unsafe guidance.',
    ],
    refs: ['Karimi et al. — A Survey on Algorithmic Recourse', 'Pearl — Causality: Models, Reasoning, and Inference', 'Mothilal et al. — Diverse Counterfactual Explanations'],
  },
  {
    id: 2,
    title: 'Transferability of Recourse across Model Variants',
    category: 'Robustness',
    tldr: 'Does recourse survive model updates (distillation, pruning, retraining)?',
    description: [
      'Machine learning systems are rarely static — they evolve through retraining, distillation, pruning, or architectural changes. While predictive performance may remain stable, recourse recommendations can change drastically. An action that successfully flips a decision in one model may fail in a slightly modified version, raising concerns about consistency and reliability in deployed systems.',
      'This problem investigates whether recourse is transferable across related models and seeks conditions under which recourse remains stable. Solving it would enable safer model updates and provide guarantees that previously recommended actions remain valid, making recourse usable in real-world, continuously evolving systems.',
    ],
    refs: ["D'Amour et al. — Underspecification in ML", 'Frankle & Carbin — Lottery Ticket Hypothesis', 'Hinton et al. — Knowledge Distillation'],
  },
  {
    id: 3,
    title: 'Robustness of Prediction vs. Robustness of Recourse',
    category: 'Robustness',
    tldr: 'Robust predictions do not imply robust actions.',
    description: [
      'Robustness in machine learning typically focuses on ensuring that predictions remain stable under small perturbations to inputs. However, recourse introduces a second layer: the stability of recommended actions. Even if predictions are robust, the corresponding recourse may vary significantly, leading to inconsistent or unreliable recommendations.',
      'This problem aims to disentangle these two notions of robustness and determine whether existing robustness techniques translate to recourse. Understanding this relationship could reveal fundamental gaps in current methods and motivate new definitions of robustness that explicitly account for intervention stability.',
    ],
    refs: ['Madry et al. — Adversarial Robustness', 'Ustun et al. — Actionable Recourse', 'Karimi et al. — Recourse Survey'],
  },
  {
    id: 4,
    title: 'Feasibility of Multi-Objective Recourse',
    category: 'Theory',
    tldr: 'Can recourse satisfy fairness, robustness, privacy, and actionability at once?',
    description: [
      'Recourse systems are expected to satisfy a wide range of desiderata, including fairness, robustness, privacy, security, and actionability. While each of these properties has been studied individually, little is known about their joint feasibility. In practice, these objectives may conflict, leading to situations where satisfying all constraints simultaneously is impossible.',
      'This problem seeks to map the feasibility and trade-offs between these objectives, identifying which combinations are achievable and which are fundamentally incompatible. The outcome would provide clear guidance for practitioners, helping them design realistic systems and avoid over-constraining recourse mechanisms.',
    ],
    refs: ['Barocas et al. — Fairness and ML', 'Karimi et al. — Recourse Survey', 'Ustun et al. — Actionable Recourse'],
  },
  {
    id: 5,
    title: 'Recourse beyond Classification',
    category: 'Structured Systems',
    tldr: 'Extending recourse to matching, scheduling, and allocation systems.',
    description: [
      'Most recourse methods are developed for classification and regression, where decisions are independent across individuals. However, many real-world systems involve structured optimization problems such as matching markets, scheduling, and resource allocation, where outcomes depend on global constraints and interactions between individuals.',
      'This problem generalizes recourse to these settings, requiring a shift from individual-level interventions to system-level reasoning. Solving it would extend recourse to domains like housing allocation, energy systems, and recommendation platforms, where decisions are inherently interdependent.',
    ],
    refs: ['Roth — Market Design', 'Bertsimas & Tsitsiklis — Linear Optimization', 'Karimi et al. — Recourse Survey'],
  },
  {
    id: 6,
    title: 'Recourse over Latent and Abstract Concepts',
    category: 'Representation',
    tldr: 'How to give recourse when features are not human-understandable.',
    description: [
      'Modern machine learning models rely on latent representations that do not align with human-interpretable features. Recourse, however, must be expressed in terms that users can understand and act upon. This mismatch creates a fundamental challenge in communicating actionable recommendations.',
      'This problem explores how to bridge the gap between latent model representations and human concepts, either by learning interpretable abstractions or by generating recourse directly in abstract spaces. Solving it would make recourse viable for deep learning systems and foundation models.',
    ],
    refs: ['Kim et al. — TCAV', 'Bengio et al. — Representation Learning', 'Goyal et al. — Counterfactual Visual Explanations'],
  },
  {
    id: 10,
    title: 'Recourse in Multi-Agent Environments',
    category: 'Multi-Agent',
    tldr: "When one person's recourse affects others.",
    description: [
      'Most recourse methods treat individuals independently, ignoring the fact that many systems involve shared resources and competition. In such settings, one individual\'s actions may influence others\' outcomes, leading to complex interactions and potential conflicts.',
      'This problem studies recourse in multi-agent environments, incorporating strategic behavior, coordination, and fairness across populations. Solving it would enable more realistic and equitable recourse systems in domains like allocation and marketplaces.',
    ],
    refs: ['Nisan et al. — Algorithmic Game Theory', 'Roth — Market Design', 'Hardt et al. — Fairness'],
  },
  {
    id: 11,
    title: 'Learning Personalized Cost Functions for Recourse',
    category: 'Learning',
    tldr: 'Learning what actions actually cost each individual.',
    description: [
      'Recourse relies on cost functions to determine which actions are feasible or desirable, yet these are typically hand-specified and overly simplistic. In reality, individuals differ widely in their constraints, resources, and preferences, making uniform cost models inadequate.',
      'This problem explores how to learn personalized cost functions from data or interaction, enabling more accurate and individualized recommendations. Solving it would significantly improve the realism and usability of recourse systems.',
    ],
    refs: ['Ng & Russell — Inverse RL', 'Christiano et al. — RL from Human Preferences', 'Ustun et al. — Actionable Recourse'],
  },
];

// Assign a colour to each category
const CAT_COLORS = {
  Causality:           { color: '#2453a6', bg: '#dbe7ff' },
  Robustness:          { color: '#dc2626', bg: '#fee2e2' },
  Theory:              { color: '#7c3aed', bg: '#ede9fe' },
  'Structured Systems':{ color: '#0891b2', bg: '#cffafe' },
  Representation:      { color: '#ca8a04', bg: '#fef9c3' },
  'Multi-Agent':       { color: '#4f46e5', bg: '#e0e7ff' },
  Learning:            { color: '#1d7a55', bg: '#dff3ea' },
};

export default function IdeaBoard() {
  const [flipped, setFlipped] = useState({});

  function toggle(id) {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <section className="ideas-section section-shell" id="ideas">
      <div className="section-heading">
        <span className="eyebrow">Open research questions</span>
        <h2>Ideas worth exploring</h2>
        <p>
          Eight concrete, tractable problems where a careful contribution would move the field forward.
          Click any card to read the full description and references.
        </p>
      </div>

      <div className="ideas-grid">
        {IDEAS.map(idea => {
          const cm = CAT_COLORS[idea.category] ?? { color: '#2453a6', bg: '#dbe7ff' };
          const isFlipped = !!flipped[idea.id];
          return (
            <div
              key={idea.id}
              className={`idea-flip-wrap${isFlipped ? ' flipped' : ''}`}
              onClick={() => toggle(idea.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && toggle(idea.id)}
              aria-label={`${idea.title} — click to ${isFlipped ? 'collapse' : 'expand'}`}
            >
              <div className="idea-flip-inner">

                {/* ── FRONT ── */}
                <div className="idea-face idea-front">
                  <span className="idea-cat chip" style={{ background: cm.bg, color: cm.color }}>
                    {idea.category}
                  </span>
                  <p className="idea-title">{idea.title}</p>
                  <p className="idea-tldr">{idea.tldr}</p>
                  <span className="idea-flip-hint">Read more →</span>
                </div>

                {/* ── BACK ── */}
                <div className="idea-face idea-back">
                  <span className="idea-cat chip" style={{ background: cm.bg, color: cm.color }}>
                    {idea.category}
                  </span>
                  <p className="idea-back-title">{idea.title}</p>
                  {idea.description.map((para, i) => (
                    <p key={i} className="idea-back-para">{para}</p>
                  ))}
                  <div className="idea-refs">
                    <p className="idea-refs-label">References</p>
                    {idea.refs.map((r, i) => (
                      <p key={i} className="idea-ref-item">· {r}</p>
                    ))}
                  </div>
                  <span className="idea-flip-hint" style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>← Back</span>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
