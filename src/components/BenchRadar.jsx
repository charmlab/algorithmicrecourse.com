import { useState } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

// Normalised scores 0-100 across 5 axes (higher = better on all)
// Sparsity is inverted: (6 - raw_sparsity) / 5 * 100
// Runtime is inverted: (9 - raw_runtime) / 8.5 * 100
const BENCH_DATA = [
  { metric: 'Validity',     DiCE: 92, Wachter: 88, FACE: 78, ROAR: 85, AR: 95 },
  { metric: 'Sparsity',     DiCE: 56, Wachter: 30, FACE: 78, ROAR: 45, AR: 86 },
  { metric: 'Plausibility', DiCE: 70, Wachter: 52, FACE: 88, ROAR: 64, AR: 58 },
  { metric: 'Robustness',   DiCE: 62, Wachter: 44, FACE: 56, ROAR: 81, AR: 72 },
  { metric: 'Speed',        DiCE: 84, Wachter: 90, FACE: 45, ROAR: 61, AR: 98 },
];

const METHODS = [
  { key: 'DiCE',    label: 'DiCE',        color: '#2453a6' },
  { key: 'Wachter', label: 'Wachter',     color: '#7c3aed' },
  { key: 'FACE',    label: 'FACE',        color: '#059669' },
  { key: 'ROAR',    label: 'ROAR',        color: '#dc2626' },
  { key: 'AR',      label: 'AR (Ustun)',  color: '#ea580c' },
];

const METRIC_NOTES = {
  Validity:     'Fraction of generated counterfactuals that flip the prediction.',
  Sparsity:     'Fewer feature changes → higher score. Simpler recourse is easier to act on.',
  Plausibility: 'Closeness to the real data manifold — avoids impossible feature combinations.',
  Robustness:   'Validity retained after small model perturbations or retraining.',
  Speed:        'Inverse runtime: faster generation → higher score.',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#fffdf9', border: '1px solid #ded7cb',
      borderRadius: '12px', padding: '10px 14px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    }}>
      <p style={{ fontWeight: 800, fontSize: '0.82rem', marginBottom: 6 }}>{label}</p>
      <p style={{ fontSize: '0.75rem', color: '#64707d', marginBottom: 8 }}>
        {METRIC_NOTES[label]}
      </p>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 2 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
          <span style={{ fontSize: '0.8rem', color: '#1f2933' }}>{p.name}</span>
          <span style={{ marginLeft: 'auto', fontWeight: 700, fontSize: '0.8rem', paddingLeft: 16 }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function BenchRadar() {
  const [active, setActive] = useState(new Set(METHODS.map(m => m.key)));

  function toggle(key) {
    setActive(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size > 1) next.delete(key); // keep at least one
      } else {
        next.add(key);
      }
      return next;
    });
  }

  return (
    <section className="bench-section section-shell" id="benchmark">
      <div className="bench-section-header">
        <div className="section-heading" style={{ marginBottom: 0 }}>
          <span className="eyebrow">RecurseBench</span>
          <h2>No single method wins everywhere</h2>
          <p>
            Each recourse algorithm makes different trade-offs. Toggle methods on and off to
            compare profiles across validity, sparsity, plausibility, robustness, and speed.
          </p>
        </div>
        <a
          href="https://github.com/charmlab/recourse_benchmarks"
          target="_blank"
          rel="noopener noreferrer"
          className="bench-github-btn"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          View on GitHub
        </a>
      </div>

      <div className="bench-layout">
        <div className="bench-chart-wrap">
          <ResponsiveContainer width="100%" height={380}>
            <RadarChart data={BENCH_DATA} outerRadius="72%">
              <PolarGrid stroke="#ded7cb" />
              <PolarAngleAxis
                dataKey="metric"
                tick={{ fontSize: 12, fontWeight: 700, fill: '#64707d', fontFamily: 'inherit' }}
              />
              <PolarRadiusAxis
                angle={90} domain={[0, 100]}
                tick={{ fontSize: 9, fill: '#9ca3af' }}
                tickCount={4}
              />
              {METHODS.filter(m => active.has(m.key)).map(m => (
                <Radar
                  key={m.key}
                  name={m.label}
                  dataKey={m.key}
                  stroke={m.color}
                  fill={m.color}
                  fillOpacity={0.08}
                  strokeWidth={2}
                />
              ))}
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ display: 'none' }} // we render our own
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="bench-sidebar">
          <p className="demo-block-label" style={{ marginBottom: '1rem' }}>Toggle methods</p>
          <div className="bench-method-list">
            {METHODS.map(m => {
              const on = active.has(m.key);
              return (
                <button
                  key={m.key}
                  type="button"
                  className={`bench-method-btn${on ? ' active' : ''}`}
                  style={{ '--mc': m.color, '--ms': `${m.color}22` }}
                  onClick={() => toggle(m.key)}
                >
                  <span className="bench-method-dot" style={{ background: on ? m.color : '#ded7cb' }} />
                  {m.label}
                </button>
              );
            })}
          </div>

          <div className="bench-metric-legend">
            <p className="demo-block-label" style={{ marginBottom: '0.75rem' }}>Metric guide</p>
            {Object.entries(METRIC_NOTES).map(([k, v]) => (
              <div key={k} className="bench-metric-row">
                <span className="bench-metric-name">{k}</span>
                <span className="bench-metric-desc">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── quick-start code ── */}
      <div className="bench-quickstart">
        <p className="demo-block-label" style={{ marginBottom: '0.9rem' }}>Quick start</p>
        <div className="bench-code-block">
          <div className="bench-code-line">
            <span className="code-prompt">$</span>
            <span className="code-cmd"> pip install recourse-benchmarks</span>
          </div>
        </div>
        <div className="bench-code-block" style={{ marginTop: '0.6rem' }}>
          <div className="bench-code-line">
            <span className="code-kw">from</span>
            <span className="code-plain"> recourse_benchmarks </span>
            <span className="code-kw">import</span>
            <span className="code-plain"> Evaluator, DATASETS, METHODS</span>
          </div>
          <div className="bench-code-line" style={{ marginTop: '0.55rem' }}>
            <span className="code-plain">evaluator </span>
            <span className="code-op">= </span>
            <span className="code-fn">Evaluator</span>
            <span className="code-plain">(</span>
          </div>
          <div className="bench-code-line code-indent">
            <span className="code-param">dataset</span>
            <span className="code-op">=</span>
            <span className="code-str">DATASETS.GERMAN_CREDIT</span>
            <span className="code-plain">,</span>
          </div>
          <div className="bench-code-line code-indent">
            <span className="code-param">model</span>
            <span className="code-op">=</span>
            <span className="code-str">"xgboost"</span>
            <span className="code-plain">,</span>
          </div>
          <div className="bench-code-line">
            <span className="code-plain">)</span>
          </div>
          <div className="bench-code-line" style={{ marginTop: '0.55rem' }}>
            <span className="code-plain">results </span>
            <span className="code-op">= </span>
            <span className="code-plain">evaluator.</span>
            <span className="code-fn">run</span>
            <span className="code-plain">(methods=[</span>
            <span className="code-str">METHODS.DICE</span>
            <span className="code-plain">, </span>
            <span className="code-str">METHODS.WACHTER</span>
            <span className="code-plain">, </span>
            <span className="code-str">METHODS.FACE</span>
            <span className="code-plain">])</span>
          </div>
          <div className="bench-code-line" style={{ marginTop: '0.55rem' }}>
            <span className="code-plain">results.</span>
            <span className="code-fn">radar_plot</span>
            <span className="code-plain">()</span>
            <span className="code-comment">  # → reproduces the chart above</span>
          </div>
        </div>
        <a href="https://github.com/charmlab/recourse_benchmarks"
          target="_blank" rel="noopener noreferrer"
          className="bench-docs-link">
          Full documentation on GitHub →
        </a>
      </div>
    </section>
  );
}
