export default function HeroPathVisual() {
  return (
    <svg viewBox="0 0 500 200" style={{ width: '100%', maxWidth: 520, height: 'auto' }}>
      {/* Blocked path */}
      <path d="M40 140 Q120 140 160 100" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".5" />
      <rect x="155" y="80" width="40" height="40" rx="4" fill="#fecaca" stroke="#ef4444" strokeWidth="2" />
      <text x="175" y="105" textAnchor="middle" fill="#dc2626" fontSize="18" fontWeight="700">✕</text>
      <text x="50" y="172" fill="#94a3b8" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="600">REJECTED</text>

      {/* Rerouted path — animated draw */}
      <path
        d="M40 140 Q100 140 140 110 Q180 80 220 60 Q280 30 340 50 Q400 70 460 60"
        stroke="#2563eb" strokeWidth="3" fill="none" strokeLinecap="round"
        strokeDasharray="600"
        style={{ animation: 'pathDraw 2s ease forwards' }}
      />

      {/* Waypoints */}
      {[
        { cx: 220, cy: 60,  label: 'δ₁', delay: 0 },
        { cx: 340, cy: 50,  label: 'δ₂', delay: 0.3 },
        { cx: 460, cy: 60,  label: '✓',  delay: 0.6, approved: true },
      ].map(({ cx, cy, label, delay, approved }) => (
        <g key={label}>
          <circle
            cx={cx} cy={cy} r={approved ? 18 : 14}
            fill={approved ? '#dcfce7' : '#dbeafe'}
            stroke={approved ? '#16a34a' : '#2563eb'}
            strokeWidth="2"
            style={{ animation: `float 2.5s ease-in-out ${delay}s infinite` }}
          />
          <text
            x={cx} y={cy + 4} textAnchor="middle"
            fill={approved ? '#16a34a' : '#2563eb'}
            fontSize={approved ? 14 : 11} fontWeight="700"
            fontFamily="Georgia,serif"
            fontStyle={approved ? 'normal' : 'italic'}
          >
            {label}
          </text>
        </g>
      ))}

      {/* Labels */}
      <text x="340" y="18" textAnchor="middle" fill="#16a34a" fontSize="11" fontWeight="700" fontFamily="Inter,sans-serif">APPROVED</text>
      <text x="240" y="96" fill="#64748b" fontSize="9.5" fontWeight="600" fontFamily="Inter,sans-serif">recourse path</text>

      {/* Person icon */}
      <circle cx="40" cy="128" r="9" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="40" cy="125" r="3" fill="#64748b" />
      <path d="M33 136 Q40 130 47 136" stroke="#64748b" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
