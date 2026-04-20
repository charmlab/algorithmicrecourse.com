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

// ── boundary threshold functions (ds = 'blobs' | 'moons') ────
function boundaryAt(cs, type, ds = 'blobs') {
  if (ds === 'moons') {
    // Linear: diagonal line — least-error linear separator for the interlocked crescents
    // Perpendicular bisector between cluster centers (≈35,20) and (≈65,65)
    if (type === 'linear') return 80 - 0.7 * cs;
    // Tree: staircase approximation of the diagonal gap, stepping down right-to-right
    if (type === 'tree') {
      if (cs < 30) return 65;
      if (cs < 45) return 50;
      if (cs < 60) return 40;
      if (cs < 75) return 26;
      return 18;
    }
    // Neural net: arch-curve hugging the crescent gap — starts low-left,
    // peaks at cs≈55 (the overlap zone), drops steeply right
    return 58 - 0.55 * cs + 20 * Math.sin((Math.PI * (cs - 5)) / 100);
  }
  // blobs (original linear-sep) — unchanged
  if (type === 'linear') return 125 - 1.5 * cs;
  if (type === 'tree') {
    if (cs < 30) return 80;
    if (cs < 50) return 55;
    if (cs < 70) return 30;
    return 10;
  }
  return 28 + 26 * Math.sin((cs * Math.PI) / 58) + Math.max(0, 52 - cs) * 0.55;
}

function boundaryPts(type, ds = 'blobs') {
  if (type === 'tree') {
    if (ds === 'moons')
      // Staircase stepping down from upper-left to lower-right, matching boundaryAt
      return [[0,65],[30,65],[30,50],[45,50],[45,40],[60,40],[60,26],[75,26],[75,18],[100,18]];
    return [[0,80],[30,80],[30,55],[50,55],[50,30],[70,30],[70,10],[100,10]];
  }
  return Array.from({ length: 51 }, (_, i) => [i * 2, boundaryAt(i * 2, type, ds)]);
}

function buildBoundaryPath(type, ds) {
  return boundaryPts(type, ds)
    .map(([cs, sr], i) => {
      const p = toSvg(cs, sr);
      return `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    })
    .join(' ');
}

function buildRejectedFill(type, ds) {
  const pts = boundaryPts(type, ds).map(([cs, sr]) => toSvg(cs, sr));
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

function distToBoundarySvg(cs, sr, boundaryType, ds) {
  const { x: px, y: py } = toSvg(cs, sr);
  const pts = boundaryPts(boundaryType, ds);
  let minDist = Infinity;
  for (let i = 0; i < pts.length - 1; i++) {
    const p1 = toSvg(pts[i][0], pts[i][1]);
    const p2 = toSvg(pts[i + 1][0], pts[i + 1][1]);
    minDist = Math.min(minDist, distToSegSvg(px, py, p1.x, p1.y, p2.x, p2.y));
  }
  return minDist;
}

function isApproved(cs, sr, boundaryType, ds) {
  return sr > boundaryAt(cs, boundaryType, ds);
}

function computeEndpoint(actionId, boundaryType, targetDist, ds) {
  if (actionId === 'a1') {
    for (let cs = 55; cs <= 100; cs += 0.4) {
      if (isApproved(cs, 30, boundaryType, ds) &&
          distToBoundarySvg(cs, 30, boundaryType, ds) >= targetDist) {
        return [cs, 30];
      }
    }
    return [100, 30];
  }
  if (actionId === 'a2') {
    // Start walk just above YOU's sr=30 so endpoint reflects actual boundary height
    for (let sr = 32; sr <= 100; sr += 0.4) {
      if (isApproved(25, sr, boundaryType, ds) &&
          distToBoundarySvg(25, sr, boundaryType, ds) >= targetDist) {
        return [25, sr];
      }
    }
    return [25, 100];
  }
  if (actionId === 'a3') {
    const ux = 30 / Math.hypot(30, 35), uy = 35 / Math.hypot(30, 35);
    for (let t = 5; t <= 90; t += 0.4) {
      const cs = 25 + ux * t, sr = 30 + uy * t;
      if (cs > 100 || sr > 100) break;
      if (isApproved(cs, sr, boundaryType, ds) &&
          distToBoundarySvg(cs, sr, boundaryType, ds) >= targetDist) {
        return [cs, sr];
      }
    }
    return [55, 65];
  }
  return [50, 50];
}

// ── scatter-plot points ──────────────────────────────────────
// Dataset 1: two blob clusters (linearly separable)
const REJECTED_BLOBS = [
  [15,22],[32,14],[20,42],[46,16],[11,52],[36,34],[28,7],[52,4],[42,28],[18,62],[8,35],[60,18],
];
const APPROVED_BLOBS = [
  [76,64],[86,50],[71,82],[91,34],[81,86],[62,72],[96,21],[67,60],[89,76],[78,40],[55,75],
];

// Dataset 2: classic interlocked two-moons
// Rejected moon: lower-left crescent (center ≈ cs=35, sr=20)
//   All sr < boundaryAt(cs) for linear (80-0.7cs), tree, and NN
const REJECTED_MOONS = [
  [12,25],[18,18],[27,13],[38,12],[48,16],[55,25],[58,36],
  [22,20],[32,11],[44,13],[52,30],
];
// Approved moon: upper-right crescent (center ≈ cs=65, sr=65)
//   All sr > boundaryAt(cs) for linear, tree, and NN
const APPROVED_MOONS = [
  [42,55],[50,68],[60,76],[72,78],[82,72],[88,60],[90,50],
  [55,72],[67,78],[78,68],[86,55],
];

// ── actions ──────────────────────────────────────────────────
const ACTIONS = [
  { id:'a1', label:'Raise credit score',    feature:'credit',  color:'#2453a6', soft:'#dbe7ff', baseTo:[68,30],  cost:2.1 },
  { id:'a2', label:'Increase savings rate', feature:'savings', color:'#1d7a55', soft:'#dff3ea', baseTo:[25,91],  cost:3.6 },
  { id:'a3', label:'Improve both (partial)',feature:'both',    color:'#7c3aed', soft:'#ede9fe', baseTo:[49,57],  cost:2.7 },
];

const BOUNDARY_LABELS = {
  linear: 'Linear model (logistic regression)',
  tree:   'Tree model (gradient boosted)',
  nn:     'Neural network (deep nonlinear)',
};

// ── Underbrace label component ────────────────────────────────
function Underbrace({ children, label, color }) {
  return (
    <span className="dlag-brace-wrap">
      {children}
      <span className="dlag-brace-bar" style={{ '--bc': color }} />
      <span className="dlag-brace-lbl" style={{ color }}>{label}</span>
    </span>
  );
}

// ── component ────────────────────────────────────────────────
export default function InteractiveDemo() {
  const clipId = useId();

  const [dataset,      setDataset]      = useState('blobs');
  const [boundaryType, setBoundaryType] = useState('linear');
  const [selectedAction,setSelectedAction] = useState(null);
  const [nonActionable,setNonActionable] = useState(false);
  const [robustness,   setRobustness]   = useState(false);
  const [delta,        setDelta]        = useState(0.15);
  const [sparsity,     setSparsity]     = useState(false);

  const rejectedPath = useMemo(
    () => buildRejectedFill(boundaryType, dataset), [boundaryType, dataset]);
  const boundaryPath = useMemo(
    () => buildBoundaryPath(boundaryType, dataset), [boundaryType, dataset]);

  const deltaRingR = delta * PH * 0.48;
  const BASE_MARGIN = 5;

  const rejectedPts = dataset === 'moons' ? REJECTED_MOONS : REJECTED_BLOBS;
  const approvedPts = dataset === 'moons' ? APPROVED_MOONS : APPROVED_BLOBS;

  function isDisabled(action, na = nonActionable, sp = sparsity) {
    if (na && (action.feature === 'savings' || action.feature === 'both')) return true;
    if (sp && action.feature === 'both') return true;
    return false;
  }

  const allEndpoints = useMemo(() => {
    const targetDist = robustness ? deltaRingR : BASE_MARGIN;
    const result = {};
    for (const action of ACTIONS) {
      if (isDisabled(action)) continue;
      const ep = computeEndpoint(action.id, boundaryType, targetDist, dataset);
      // If the walked endpoint is still not on the approved side, mark as unreachable
      if (!isApproved(ep[0], ep[1], boundaryType, dataset)) {
        result[action.id] = { ep: null, cost: null, unreachable: true };
        continue;
      }
      const baseDist = Math.hypot(action.baseTo[0] - 25, action.baseTo[1] - 30);
      const epDist   = Math.hypot(ep[0] - 25, ep[1] - 30);
      result[action.id] = {
        ep,
        cost: +(action.cost * Math.max(1, epDist / Math.max(baseDist, 1))).toFixed(1),
      };
    }
    return result;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boundaryType, dataset, robustness, deltaRingR, nonActionable, sparsity]);

  const selEndpoint = allEndpoints[selectedAction]?.ep ?? null;
  const selCost     = allEndpoints[selectedAction]?.cost ?? 0;
  const youPt       = toSvg(25, 30);

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
        {/* ── LEFT: figure + formulation bar ── */}
        <div className="demo-figure-col">
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
            <path key={`${boundaryType}-${dataset}`} d={boundaryPath} fill="none"
              stroke="#1f2933" strokeWidth="2.2" strokeLinecap="round"
              clipPath={`url(#${clipId}-clip)`}/>

            {/* region labels */}
            <text x={PAD.l+14} y={PAD.t+PH-10} fontSize="9.5" fontWeight="700"
              fill="rgba(239,68,68,0.55)" letterSpacing="0.12em">REJECTED</text>
            <text x={PAD.l+PW-70} y={PAD.t+22} fontSize="9.5" fontWeight="700"
              fill="rgba(16,185,129,0.6)" letterSpacing="0.12em">APPROVED</text>

            {/* scatter points */}
            {rejectedPts.map(([cs, sr], i) => {
              const p = toSvg(cs, sr);
              return <circle key={`rp${i}`} cx={p.x} cy={p.y} r="4.5"
                fill="rgba(239,68,68,0.18)" stroke="rgba(239,68,68,0.35)" strokeWidth="1"
                clipPath={`url(#${clipId}-clip)`}/>;
            })}
            {approvedPts.map(([cs, sr], i) => {
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
                <g key={`path-${selectedAction}-${boundaryType}-${dataset}`} clipPath={`url(#${clipId}-clip)`}>
                  {robustness && (
                    <circle cx={end.x} cy={end.y} r={deltaRingR}
                      fill={`${action.color}10`} stroke={action.color}
                      strokeWidth="1.5" strokeDasharray="5 3" opacity="0.8"
                      style={{ animation: 'fadeIn 0.3s ease both' }}/>
                  )}
                  <line x1={from.x} y1={from.y} x2={end.x} y2={end.y}
                    stroke={action.color} strokeWidth="2.2" strokeDasharray="6 4"
                    markerEnd={`url(#${clipId}-arr-${action.id})`} strokeLinecap="round"
                    style={{ animation: 'fadeIn 0.35s ease both' }}/>
                  <circle cx={end.x} cy={end.y} r="9"
                    fill={action.soft} stroke={action.color} strokeWidth="2"
                    style={{ animation: 'fadeIn 0.35s ease both' }}/>
                  <circle cx={end.x} cy={end.y} r="3.5" fill={action.color}/>
                  <rect x={end.x+11} y={end.y-14} width="52" height="18" rx="5"
                    fill={action.soft} stroke={action.color} strokeWidth="1"/>
                  <text x={end.x+16} y={end.y-2} fontSize="9.5" fontWeight="700" fill={action.color}>
                    cost {selCost}
                  </text>
                </g>
              );
            })()}

            {/* YOU point */}
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
        </div>{/* end demo-canvas-wrap */}

      {/* ── Problem formulation bar — scoped to figure column ── */}
      <div className="demo-lagrangian">
        <span className="dlag-label">Problem Formulation</span>
        <span className="dlag-math">
          <span className="dlag-argmin">
            {'argmin'}<sub>{'x′'}</sub>
          </span>
          <span className="dlag-base">
            {' d(x, x′)  +  λ₁ [h(x′) ≠ +1]'}
          </span>
          {nonActionable && (
            <Underbrace label="non-actionable" color="#2453a6" key="na">
              <span className="dlag-c1">
                {' + λ₂ |x′'}<sub>sav</sub>{' − x'}<sub>sav</sub>{'|'}
              </span>
            </Underbrace>
          )}
          {sparsity && (
            <Underbrace label="sparsity" color="#7c3aed" key="sp">
              <span className="dlag-c2">
                {' + λ₃ ‖x′ − x‖'}<sub>0</sub>
              </span>
            </Underbrace>
          )}
          {robustness && (
            <Underbrace label={`robustness  (δ = ${delta.toFixed(2)})`} color="#c2410c" key="rb">
              <span className="dlag-c3">
                {' + λ₄ max'}<sub>{'ε ∈ Bδ(0)'}</sub>{' [h(x′+ε) ≠ +1]'}
              </span>
            </Underbrace>
          )}
        </span>
      </div>
        </div>{/* end demo-figure-col */}

        {/* ── CONTROL PANEL ── */}
        <div className="demo-controls">

          {/* dataset */}
          <div className="demo-control-block">
            <p className="demo-block-label">Dataset</p>
            <div className="demo-btn-row">
              {[['blobs','Dataset 1'],['moons','Dataset 2']].map(([key, lbl]) => (
                <button key={key} type="button"
                  className={`demo-type-btn${dataset === key ? ' active' : ''}`}
                  onClick={() => setDataset(key)}>
                  {lbl}
                </button>
              ))}
            </div>
            <p className="demo-type-desc">
              {dataset === 'blobs'
                ? 'Two Gaussian clusters — linearly separable'
                : 'Two-moons — nonlinear boundary required'}
            </p>
          </div>

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

          {/* constraints */}
          <div className="demo-control-block">
            <p className="demo-block-label">Constraints</p>
            <div className="demo-toggle-list">
              <label className="demo-toggle">
                <input type="checkbox" checked={nonActionable}
                  onChange={e => {
                    const checked = e.target.checked;
                    setNonActionable(checked);
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
                </div>
              )}
            </div>
          </div>

          {/* recourse actions */}
          <div className="demo-control-block">
            <p className="demo-block-label">
              Recourse actions <span className="demo-block-sub">— click to show path</span>
            </p>
            <div className="demo-action-list">
              {ACTIONS.map(action => {
                const disabled = isDisabled(action);
                const unreachable = !disabled && !!allEndpoints[action.id]?.unreachable;
                const active = selectedAction === action.id && !disabled;
                const liveCost = allEndpoints[action.id]?.cost ?? action.cost;
                return (
                  <button key={action.id} type="button" disabled={disabled}
                    className={`demo-action${active ? ' active' : ''}${disabled ? ' disabled' : ''}`}
                    style={{ '--ac': action.color, '--as': action.soft }}
                    onClick={() => setSelectedAction(active ? null : action.id)}>
                    <span className="demo-action-dot" style={{ background: action.color }}/>
                    <span className="demo-action-label">{action.label}</span>
                    <span className="demo-action-cost"
                      style={unreachable
                        ? { background: '#fee2e2', color: '#dc2626' }
                        : { background: action.soft, color: action.color }}>
                      {disabled ? 'blocked' : unreachable ? 'no path' : `cost ${liveCost}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
