import { useState } from 'react';
import { IDEAS } from '../data/ideas.js';

const STATUS_META = {
  'open':        { label: 'Open',        color: '#2453a6', bg: '#dbe7ff' },
  'in-progress': { label: 'In progress', color: '#8a4b18', bg: '#f7e5d1' },
  'planned':     { label: 'Planned',     color: '#1d7a55', bg: '#dff3ea' },
};

// Extended idea descriptions (placeholder — replace with your own copy)
const DESCRIPTIONS = {
  1: [
    'Current recourse benchmarks use incompatible cost functions across domains: L1/L2 distance works for tabular data but is semantically meaningless for images or text.',
    'A unified metric would need to account for feature semantics, human effort, and actionability simultaneously. Proposed candidates include normalised effort scores and user-study validated cost proxies.',
    'This is a prerequisite for any cross-domain recourse leaderboard and would dramatically accelerate fair comparison of methods.',
  ],
  2: [
    'Almost all recourse evaluations use semi-synthetic datasets (COMPAS, Adult, German Credit). Real-world credit scoring pipelines are more complex: they involve temporal dependencies, missing data, and institutional action constraints.',
    'A dataset sourced from a live credit decisioning system — even anonymised — would let researchers evaluate whether recourse methods produce instructions that are actually executable by applicants.',
    'Ideally this would be accompanied by a follow-up study tracking whether applicants who received recourse acted on it and achieved approval.',
  ],
  3: [
    'Most recourse methods assume a single one-shot intervention. In practice, individuals act sequentially: they raise their credit score, wait, then apply again. The model may have retrained by then.',
    'Sequential recourse requires reasoning about model dynamics, partial observations, and cost accumulation over time — closer to a Markov decision process than a static counterfactual problem.',
    'This benchmark is currently in development. We are designing evaluation protocols around multi-step trajectories with stochastic model updates.',
  ],
  4: [
    'A recourse suggestion is fragile if a small model retrain (due to new data or drift) invalidates the suggested actions before the individual can act on them.',
    'Robustness evaluation should test recourse validity across an ensemble of plausible future model states, not just the current snapshot.',
    'Key open questions: how to define the perturbation set over model parameters, and how to communicate robustness guarantees to end users in plain language.',
  ],
  5: [
    'Evaluating recourse quality often requires querying the model multiple times with near-counterfactual inputs. In regulated settings this can leak information about the model or the individual.',
    'A privacy-preserving protocol would bound the number of model queries, anonymise evaluation inputs, and ensure that benchmark participation does not compromise deployed model confidentiality.',
    'Differential privacy and secure multi-party computation have been proposed but not yet operationalised for recourse evaluation pipelines.',
  ],
  6: [
    'Quantitative recourse metrics (validity, cost, sparsity) are necessary but insufficient: a recourse suggestion can score well on all metrics and still be perceived as unfair, unrealistic, or insulting.',
    'Standardised human-subject study templates would define how to recruit participants, present recourse suggestions, measure satisfaction and trust, and aggregate responses in a statistically valid way.',
    'Such templates would make qualitative evaluation reproducible and allow cross-paper comparison of perceived recourse quality.',
  ],
};

export default function IdeaBoard() {
  const [flipped, setFlipped] = useState({});
  const [votes, setVotes] = useState(() => Object.fromEntries(IDEAS.map(i => [i.id, i.votes])));
  const [voted, setVoted] = useState({});

  function toggle(id) {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function upvote(e, id) {
    e.stopPropagation();
    if (voted[id]) return;
    setVotes(prev => ({ ...prev, [id]: prev[id] + 1 }));
    setVoted(prev => ({ ...prev, [id]: true }));
  }

  return (
    <section className="ideas-section section-shell" id="ideas">
      <div className="section-heading">
        <span className="eyebrow">Open research questions</span>
        <h2>Ideas worth exploring</h2>
        <p>
          These are concrete, tractable problems where a careful contribution would move the field forward.
          Click any card to read the full description. Upvote to signal interest.
        </p>
      </div>

      <div className="ideas-grid">
        {IDEAS.map(idea => {
          const sm = STATUS_META[idea.status];
          const isFlipped = !!flipped[idea.id];
          const desc = DESCRIPTIONS[idea.id] || [];
          return (
            <div
              key={idea.id}
              className={`idea-flip-wrap${isFlipped ? ' flipped' : ''}`}
              onClick={() => toggle(idea.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && toggle(idea.id)}
              aria-label={`${idea.title} — click to ${isFlipped ? 'hide' : 'see'} details`}
            >
              <div className="idea-flip-inner">
                {/* ── FRONT ── */}
                <div className="idea-face idea-front">
                  <div className="idea-front-top">
                    <span className="idea-cat chip" style={{ background: sm.bg, color: sm.color }}>
                      {idea.category}
                    </span>
                    <span className="idea-status chip" style={{ background: sm.bg, color: sm.color }}>
                      {sm.label}
                    </span>
                  </div>
                  <p className="idea-title">{idea.title}</p>
                  <div className="idea-front-footer">
                    <button
                      type="button"
                      className={`idea-vote${voted[idea.id] ? ' voted' : ''}`}
                      onClick={e => upvote(e, idea.id)}
                      aria-label="Upvote"
                    >
                      ▲ {votes[idea.id]}
                    </button>
                    <span className="idea-flip-hint">Read more →</span>
                  </div>
                </div>

                {/* ── BACK ── */}
                <div className="idea-face idea-back">
                  <span className="idea-cat chip" style={{ background: sm.bg, color: sm.color }}>
                    {idea.category}
                  </span>
                  <p className="idea-back-title">{idea.title}</p>
                  {desc.map((para, i) => (
                    <p key={i} className="idea-back-para">{para}</p>
                  ))}
                  <span className="idea-flip-hint" style={{ marginTop: 'auto' }}>← Back</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
