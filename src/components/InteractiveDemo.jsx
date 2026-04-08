import { useState, useMemo, useId } from 'react';

// ── SVG dimensions ───────────────────────────────────────────
const W = 520, H = 340;
const PAD = { l: 54, r: 14, t: 16, b: 44 };
const PW = W - PAD.l - PAD.r;
const PH = H - PAD.t - PAD.b;

// ── coordinate helpers ───────────────────────────────────────
const toSvg = (cs, sr) => ({
  x: PAD.l + (Math.min(100, Math.max(0, cs)) / 100) * PW,
  y: PAD.t + PH - (Math.min(110, Math.max(-10, sr)) / 100) * PH,
});

// ── boundary threshold functions ─────────────────────────────
function boundaryAt(cs, type) {
  if (type === 'linear') return 125 - 1.5 * cs;
  if (type === 'tree') {
    if (cs < 30) return 80;
    if (cs < 50) return 55;
    if (cs < 70) return 30;
    return 10;
  }
  // neural-net: wavy + decay
  return 28 + 26 * Math.sin((cs * Math.PI) / 58) + Math.max(0, 52 - cs) * 0.55;
}

function boundaryPts(type) {
  if (type === 'tree') {
    return [[0,80],[30,80],[30,55],[50,55],[50,30],[70,30],[70,10],[100,10]];
  }
  return Array.from({ length: 51 }, (_, i) => [i * 2, boundaryAt(i * 2, type)]);
}

function buildBoundaryPath(type) {
  return boundaryPts(type)
    .map(([cs, sr], i) => {
      const p = toSvg(cs, sr);
      return `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    })
    .join(' ');
}

function buildRejectedFill(type) {
  const pts = boundaryPts(type).map(([cs, sr]) => toSvg(cs, sr));
  let d = `M ${PAD.l} ${PAD.t - 60}`;
  pts.forEach(p => (d += ` L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`));
  const last = pts[pts.length - 1];
  d += ` L ${last.x.toFixed(1)} ${PAD.t + PH + 60} L ${PAD.l} ${PAD.t + PH + 60} Z`;
  return d;
}

// ── Distance helpers (SVG pixel space) ───────────────────────
function distToSegSvg(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1;
  const l2 = dx * dx + dy * dy;
  if (l2 < 1e-8) return Math.hypot(px - x1, py - y1);
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / l2));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

// Minimum SVG-pixel distance from (cs,sr) to the boundary curve
function distToBoundarySvg(cs, sr, boundaryType) {
  const { x: px, y: py } = toSvg(cs, sr);
  const pts = boundaryPts(boundaryType);
  let minDist = Infinity;
  for (let i = 0; i < pts.length - 1; i++) {
    const p1 = toSvg(pts[i][0], pts[i][1]);
    const p2 = toSvg(pts[i + 1][0], pts[i + 1][1]);
    minDist = Math.min(minDist, distToSegSvg(px, py, p1.x, p1.y, p2.x, p2.y));
  }
  return minDist;
}

function isApproved(cs, sr, boundaryType) {
  return sr > boundaryAt(cs, boundaryType);
}

// Walk along each action's direction until perpendicular SVG-pixel distance
// from the boundary ≥ targetDist.  This guarantees the δ-ring fits entirely
// on the approved side when drawn with radius = targetDist.
function computeEndpoint(actionId, boundaryType, targetDist) {
  if (actionId === 'a1') {
    // Move credit score right; savings rate fixed at 30
    for (let cs = 55; cs <= 100; cs += 0.4) {
      if (isApproved(cs, 30, boundaryType) &&
          distToBoundarySvg(cs, 30, boundaryType) >= targetDist) {
        return [cs, 30];
      }
    }
    return [100, 30];
  }
  if (actionId === 'a2') {
    // Move savings rate up; credit score fixed at 25
    for (let sr = 70; sr <= 100; sr += 0.4) {
      if (isApproved(25, sr, boundaryType) &&
          distToBoundarySvg(25, sr, boundaryType) >= targetDist) {
        return [25, sr];
      }
    }
    return [25, 100];
  }
  if (actionId === 'a3') {
    // Walk diagonally toward (55,65) from (25,30), extend further if needed
    const ux = 30 / Math.hypot(30, 35), uy = 35 / Math.hypot(30, 35);
    for (let t = 5; t <= 90; t += 0.4) {
      const cs = 25 + ux * t, sr = 30 + uy * t;
      if (cs > 100 || sr > 100) break;
      if (isApproved(cs, sr, boundaryType) &&
          distToBoundarySvg(cs, sr, boundaryType) >= targetDist) {
        return [cs, sr];
      }
    }
    return [55, 65];
  }
  return [50, 50];
}

// ── scatter-plot points ──────────────────────────────────────
const REJECTED_PTS = [
  [15,22],[32,14],[20,42],[46,16],[11,52],[36,34],[28,7],[52,4],[42,28],[18,62],[8,35],[60,18],
];
const APPROVED_PTS = [
  [76,64],[86,50],[71,82],[91,34],[81,86],[62,72],[96,21],[67,60],[89,76],[78,40],[55,75],
];

// ── actions (baseTo used only for cost-scaling reference) ────
const ACTIONS = [
  {
    id: 'a1',
    label: 'Raise credit score',
    feature: 'credit',
    color: '#2453a6',
    soft: '#dbe7ff',
    baseTo: [68, 30],    // reference point for cost denominator
    cost: 2.1,
  },
  {
    id: 'a2',
    label: 'Increase savings rate',
    feature: 'savings',
    color: '#1d7a55',
    soft: '#dff3ea',
    baseTo: [25, 91],
    cost: 3.6,
  },
  {
    id: 'a3',
    label: 'Improve both (partial)',
    feature: 'both',
    color: '#7c3aed',
    soft: '#ede9fe',
    baseTo: [49, 57],
    cost: 2.7,
  },
];

const BOUNDARY_LABELS = {
  linear: 'Linear model (logistic regression)',
  tree:   'Tree model (gradient boosted)',
  nn:     'Neural network (deep nonlinear)',
};

// ── math formulation builder ─────────────────────────────────
function buildFormulation(nonActionable, robustness, sparsity, delta) {
  return (
    <>
      <span className="math-kw">min</span>
      <sub>x′</sub>
      {' d(x, x′)'}<br />
      <span className="math-kw">s.t.</span>
      {' h(x′) = +1'}
      {nonActionable && <><br /><span className="math-kw">{'     '}</span>{' x′'}<sub>savings</sub>{' = x'}<sub>savings</sub></>}
      {sparsity      && <><br /><span className="math-kw">{'     '}</span>{' ‖x′ − x‖'}<sub>0</sub>{' ≤ 1'}</>}
      {robustness    && <><br /><span className="math-kw">{'     '}</span>{' ∀ε ∈ B'}<sub>δ</sub>{'(0): h(x′+ε) = +1'}<br /><span className="math-kw">{'     '}</span>{` δ = ${delta.toFixed(2)}`}</>}
    </>
  );
}

// ── component ────────────────────────────────────────────────
export default function InteractiveDemo() {
  const clipId = useId();

  const [boundaryType, setBoundaryType] = useState('linear');
  const [selectedAction, setSelectedAction] = useState(null);
  const [nonActionable, setNonActionable] = useState(false);
  const [robustness, setRobustness] = useState(false);
  const [delta, setDelta] = useState(0.15);
  const [sparsity, setSparsity] = useState(false);

  const rejectedPath = useMemo(() => buildRejectedFill(boundaryType), [boundaryType]);
  const boundaryPath = useMemo(() => buildBoundaryPath(boundaryType), [boundaryType]);

  // Ring radius in SVG pixels; endpoint will be exactly this far from boundary
  const deltaRingR = delta * PH * 0.48;
  const BASE_MARGIN = 5; // px margin when robustness off

  function isDisabled(action, na = nonActionable, sp = sparsity) {
    if (na && (action.feature === 'savings' || action.feature === 'both')) return true;
    if (sp && action.feature === 'both') return true;
    return false;
  }

  // Compute live endpoints + costs for ALL actions whenever anything relevant changes.
  // This means every action badge shows an up-to-date cost reflecting the current
  // boundary shape, robustness level, and constraint set.
  const allEndpoints = useMemo(() => {
    const targetDist = robustness ? deltaRingR : BASE_MARGIN;
    const result = {};
    for (const action of ACTIONS) {
      if (isDisabled(action)) continue;
      const ep = computeEndpoint(action.id, boundaryType, targetDist);
      const baseDist = Math.hypot(action.baseTo[0] - 25, action.baseTo[1] - 30);
      const epDist   = Math.hypot(ep[0] - 25, ep[1] - 30);
      result[action.id] = {
        ep,
        cost: +(action.cost * Math.max(1, epDist / Math.max(baseDist, 1))).toFixed(1),
      };
    }
    return result;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boundaryType, robustness, deltaRingR, nonActionable, sparsity]);

  const selEndpoint = allEndpoints[selectedAction]?.ep ?? null;
  const selCost     = allEndpoints[selectedAction]?.cost ?? 0;

  const youPt = toSvg(25, 30);
  const formulation = buildFormulation(nonActionable, robustness, sparsity, delta);

  return (
    <section className="demo-section section-shell" id="demo">
      <div className="section-heading">
        <span className="eyebrow">Interactive Demo</span>
        <h2>How recourse moves you across the boundary</h2>
        <p>
          An AI model draws a decision boundary in feature space. Recourse finds the
          minimum-cost action that moves you to the approved side — subject to your constraints.
        </p>
      </div>

      <div className="demo-layout">
        {/* ── SVG VISUALIZATION ── */}
        <div className="demo-canvas-wrap">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width="100%"
            style={{ display: 'block', userSelect: 'none' }}
            aria-label="Recourse visualization"
          >
            <defs>
              <clipPath id={`${clipId}-clip`}>
                <rect x={PAD.l} y={PAD.t} width={PW} height={PH} />
              </clipPath>
              {ACTIONS.map(a => (
                <marker key={a.id} id={`${clipId}-arr-${a.id}`}
                  markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 Z" fill={a.color} />
                </marker>
              ))}
            </defs>

            {/* grid */}
            <g clipPath={`url(#${clipId}-clip)`} opacity="0.35">
              {[0,20,40,60,80,100].map(v => {
                const { x } = toSvg(v, 0);
                return <line key={`vg${v}`} x1={x} y1={PAD.t} x2={x} y2={PAD.t+PH} stroke="#cfc4b4" strokeWidth="1"/>;
              })}
              {[0,20,40,60,80,100].map(v => {
                const { y } = toSvg(0, v);
                return <line key={`hg${v}`} x1={PAD.l} y1={y} x2={PAD.l+PW} y2={y} stroke="#cfc4b4" strokeWidth="1"/>;
              })}
            </g>

            {/* region fills */}
            <path d={rejectedPath} fill="rgba(239,68,68,0.07)" clipPath={`url(#${clipId}-clip)`}/>
            <rect x={PAD.l} y={PAD.t} width={PW} height={PH}
              fill="rgba(16,185,129,0.055)" clipPath={`url(#${clipId}-clip)`}/>

            {/* boundary */}
            <path key={boundaryType} d={boundaryPath} fill="none"
              stroke="#1f2933" strokeWidth="2.2" strokeLinecap="round"
              clipPath={`url(#${clipId}-clip)`}/>

            {/* region labels */}
            <text x={PAD.l+14} y={PAD.t+PH-10} fontSize="9.5" fontWeight="700"
              fill="rgba(239,68,68,0.55)" letterSpacing="0.12em">REJECTED</text>
            <text x={PAD.l+PW-70} y={PAD.t+22} fontSize="9.5" fontWeight="700"
              fill="rgba(16,185,129,0.6)" letterSpacing="0.12em">APPROVED</text>

            {/* background scatter points */}
            {REJECTED_PTS.map(([cs, sr], i) => {
              const p = toSvg(cs, sr);
              return <circle key={`rp${i}`} cx={p.x} cy={p.y} r="4.5"
                fill="rgba(239,68,68,0.18)" stroke="rgba(239,68,68,0.35)" strokeWidth="1"
                clipPath={`url(#${clipId}-clip)`}/>;
            })}
            {APPROVED_PTS.map(([cs, sr], i) => {
              const p = toSvg(cs, sr);
              return <circle key={`ap${i}`} cx={p.x} cy={p.y} r="4.5"
                fill="rgba(16,185,129,0.18)" stroke="rgba(16,185,129,0.35)" strokeWidth="1"
                clipPath={`url(#${clipId}-clip)`}/>;
            })}

            {/* recourse path for selected action */}
            {(() => {
              const action = ACTIONS.find(a => a.id === selectedAction);
              if (!action || isDisabled(action) || !selEndpoint) return null;
              const from = toSvg(25, 30);
              const end  = toSvg(selEndpoint[0], selEndpoint[1]);
              return (
                <g key={`path-${selectedAction}-${boundaryType}`} clipPath={`url(#${clipId}-clip)`}>
                  {/* δ-ring: radius = deltaRingR, endpoint is exactly that far from boundary */}
                  {robustness && (
                    <circle cx={end.x} cy={end.y} r={deltaRingR}
                      fill={`${action.color}10`} stroke={action.color}
                      strokeWidth="1.5" strokeDasharray="5 3" opacity="0.8"
                      style={{ animation: 'fadeIn 0.3s ease both' }}/>
                  )}
                  {/* path line */}
                  <line x1={from.x} y1={from.y} x2={end.x} y2={end.y}
                    stroke={action.color} strokeWidth="2.2" strokeDasharray="6 4"
                    markerEnd={`url(#${clipId}-arr-${action.id})`} strokeLinecap="round"
                    style={{ animation: 'fadeIn 0.35s ease both' }}/>
                  {/* destination dot */}
                  <circle cx={end.x} cy={end.y} r="9"
                    fill={action.soft} stroke={action.color} strokeWidth="2"
                    style={{ animation: 'fadeIn 0.35s ease both' }}/>
                  <circle cx={end.x} cy={end.y} r="3.5" fill={action.color}/>
                  {/* cost label */}
                  <rect x={end.x+11} y={end.y-14} width="52" height="18" rx="5"
                    fill={action.soft} stroke={action.color} strokeWidth="1"/>
                  <text x={end.x+16} y={end.y-2} fontSize="9.5" fontWeight="700" fill={action.color}>
                    cost {selCost}
                  </text>
                </g>
              );
            })()}

            {/* "You" point */}
            <circle cx={youPt.x} cy={youPt.y} r="18"
              fill="rgba(234,88,12,0.08)"
              style={{ animation: 'pulse 2.5s ease infinite' }}/>
            <circle cx={youPt.x} cy={youPt.y} r="9"
              fill="#fff7ed" stroke="#ea580c" strokeWidth="2.2"/>
            <circle cx={youPt.x} cy={youPt.y} r="4" fill="#ea580c"/>
            <text x={youPt.x} y={youPt.y+26} fontSize="9.5" fontWeight="800"
              fill="#ea580c" textAnchor="middle" letterSpacing="0.06em">YOU</text>

            {/* axes */}
            <line x1={PAD.l} y1={PAD.t+PH} x2={PAD.l+PW} y2={PAD.t+PH}
              stroke="#cfc4b4" strokeWidth="1.5"/>
            <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={PAD.t+PH}
              stroke="#cfc4b4" strokeWidth="1.5"/>

            {[0,20,40,60,80,100].map(v => {
              const { x } = toSvg(v, 0);
              return (
                <g key={`xt${v}`}>
                  <line x1={x} y1={PAD.t+PH} x2={x} y2={PAD.t+PH+4} stroke="#9ca3af" strokeWidth="1"/>
                  <text x={x} y={PAD.t+PH+15} fontSize="9" fill="#9ca3af" textAnchor="middle">{v}</text>
                </g>
              );
            })}
            {[0,20,40,60,80,100].map(v => {
              const { y } = toSvg(0, v);
              return (
                <g key={`yt${v}`}>
                  <line x1={PAD.l-4} y1={y} x2={PAD.l} y2={y} stroke="#9ca3af" strokeWidth="1"/>
                  <text x={PAD.l-7} y={y+4} fontSize="9" fill="#9ca3af" textAnchor="end">{v}</text>
                </g>
              );
            })}
            <text x={PAD.l+PW/2} y={H-3} fontSize="10.5" fill="#64707d"
              fontWeight="600" textAnchor="middle">Credit Score</text>
            <text x={10} y={PAD.t+PH/2} fontSize="10.5" fill="#64707d"
              fontWeight="600" textAnchor="middle"
              transform={`rotate(-90, 10, ${PAD.t+PH/2})`}>Savings Rate</text>
          </svg>
        </div>

        {/* ── CONTROL PANEL ── */}
        <div className="demo-controls">

          {/* model type */}
          <div className="demo-control-block">
            <p className="demo-block-label">Model type</p>
            <div className="demo-btn-row">
              {['linear','tree','nn'].map(t => (
                <button key={t} type="button"
                  className={`demo-type-btn${boundaryType === t ? ' active' : ''}`}
                  onClick={() => setBoundaryType(t)}>
                  {t === 'linear' ? 'Linear' : t === 'tree' ? 'Tree' : 'Neural Net'}
                </button>
              ))}
            </div>
            <p className="demo-type-desc">{BOUNDARY_LABELS[boundaryType]}</p>
          </div>

          {/* actions */}
          <div className="demo-control-block">
            <p className="demo-block-label">
              Recourse actions <span className="demo-block-sub">— click to show path</span>
            </p>
            <div className="demo-action-list">
              {ACTIONS.map(action => {
                const disabled = isDisabled(action);
                const active = selectedAction === action.id && !disabled;
                // All buttons show live cost — updates with model type, δ, and constraints
                const liveCost = allEndpoints[action.id]?.cost ?? action.cost;
                return (
                  <button key={action.id} type="button" disabled={disabled}
                    className={`demo-action${active ? ' active' : ''}${disabled ? ' disabled' : ''}`}
                    style={{ '--ac': action.color, '--as': action.soft }}
                    onClick={() => setSelectedAction(active ? null : action.id)}>
                    <span className="demo-action-dot" style={{ background: action.color }}/>
                    <span className="demo-action-label">{action.label}</span>
                    <span className="demo-action-cost"
                      style={{ background: action.soft, color: action.color }}>
                      {disabled ? 'blocked' : `cost ${liveCost}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* constraints */}
          <div className="demo-control-block">
            <p className="demo-block-label">Constraints</p>
            <div className="demo-toggle-list">
              <label className="demo-toggle">
                <input type="checkbox" checked={nonActionable}
                  onChange={e => {
                    const checked = e.target.checked;
                    setNonActionable(checked);
                    // Only deselect if the active action becomes blocked by this constraint
                    if (checked && selectedAction) {
                      const sel = ACTIONS.find(a => a.id === selectedAction);
                      if (sel && isDisabled(sel, checked, sparsity)) setSelectedAction(null);
                    }
                  }}/>
                <span className="demo-toggle-track"/>
                <span className="demo-toggle-text">
                  Non-actionable: <em>Savings Rate</em>
                </span>
              </label>
              <label className="demo-toggle">
                <input type="checkbox" checked={sparsity}
                  onChange={e => {
                    const checked = e.target.checked;
                    setSparsity(checked);
                    // Only deselect if the active action becomes blocked by this constraint
                    if (checked && selectedAction) {
                      const sel = ACTIONS.find(a => a.id === selectedAction);
                      if (sel && isDisabled(sel, nonActionable, checked)) setSelectedAction(null);
                    }
                  }}/>
                <span className="demo-toggle-track"/>
                <span className="demo-toggle-text">Sparsity <em>k = 1</em> (one feature only)</span>
              </label>
              <label className="demo-toggle">
                <input type="checkbox" checked={robustness}
                  onChange={e => setRobustness(e.target.checked)}/>
                <span className="demo-toggle-track"/>
                <span className="demo-toggle-text">
                  Robustness <em>δ = {delta.toFixed(2)}</em>
                </span>
              </label>
              {robustness && (
                <div className="demo-slider-wrap">
                  <input type="range" min="0.05" max="0.35" step="0.01"
                    value={delta} onChange={e => setDelta(+e.target.value)}/>
                  <div className="demo-slider-ends">
                    <span>tight (δ=0.05)</span><span>robust (δ=0.35)</span>
                  </div>
                  <p className="demo-type-desc" style={{ marginTop: '0.4rem' }}>
                    The entire δ-circle lies on the approved side. Larger δ pushes
                    the endpoint further from the boundary — increasing cost.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* math formulation */}
          <div className="demo-control-block">
            <p className="demo-block-label">Optimization problem</p>
            <div className="demo-math">{formulation}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
