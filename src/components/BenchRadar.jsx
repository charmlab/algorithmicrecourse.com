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
      <div className="section-heading">
        <span className="eyebrow">RecurseBench</span>
        <h2>No single method wins everywhere</h2>
        <p>
          Each recourse algorithm makes different trade-offs. Toggle methods on and off to
          compare profiles across validity, sparsity, plausibility, robustness, and speed.
        </p>
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
    </section>
  );
}
