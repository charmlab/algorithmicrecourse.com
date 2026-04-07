// ── SVG illustrations ─────────────────────────────────────────

function IndividualIllustration() {
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}>
      {/* subtle grid lines */}
      {[40,80,120,160,200,240].map(x =>
        <line key={x} x1={x} y1="10" x2={x} y2="150" stroke="#c7d7f5" strokeWidth="0.6" strokeDasharray="3 4"/>
      )}
      {/* person silhouette */}
      <circle cx="42" cy="52" r="16" fill="#2453a622" stroke="#2453a6" strokeWidth="1.8"/>
      <path d="M 22 95 Q 22 78 42 78 Q 62 78 62 95" fill="#2453a622" stroke="#2453a6" strokeWidth="1.8" strokeLinecap="round"/>
      {/* rejection box */}
      <rect x="74" y="48" width="36" height="36" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.8"/>
      <line x1="83" y1="57" x2="101" y2="75" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="101" y1="57" x2="83" y2="75" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round"/>
      {/* arrow */}
      <path d="M 118 66 L 138 66" stroke="#2453a6" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M 133 60 L 139 66 L 133 72" fill="none" stroke="#2453a6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* step dots climbing */}
      <circle cx="150" cy="82" r="5" fill="#2453a644"/>
      <circle cx="168" cy="68" r="5.5" fill="#2453a666"/>
      <circle cx="188" cy="54" r="6" fill="#2453a699"/>
      {/* connecting dashes */}
      <path d="M 155 79 L 163 71" stroke="#2453a666" strokeWidth="1.4" strokeDasharray="3 2" strokeLinecap="round"/>
      <path d="M 174 65 L 182 57" stroke="#2453a688" strokeWidth="1.4" strokeDasharray="3 2" strokeLinecap="round"/>
      {/* approved circle */}
      <circle cx="224" cy="56" r="22" fill="#dbe7ff" stroke="#2453a6" strokeWidth="2"/>
      <path d="M 213 56 L 220 64 L 236 46" fill="none" stroke="#2453a6" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
      {/* labels */}
      <text x="42" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2453a699" letterSpacing="0.05em">APPLICANT</text>
      <text x="92" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ef444499" letterSpacing="0.05em">DENIED</text>
      <text x="168" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2453a6bb" letterSpacing="0.05em">RECOURSE PATH</text>
      <text x="224" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2453a6" letterSpacing="0.05em">APPROVED</text>
    </svg>
  );
}

function RegulatorIllustration() {
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}>
      {/* subtle grid */}
      {[40,80,120,160,200,240].map(x =>
        <line key={x} x1={x} y1="10" x2={x} y2="150" stroke="#e8d5c3" strokeWidth="0.6" strokeDasharray="3 4"/>
      )}
      {/* scale of justice — pole */}
      <line x1="140" y1="28" x2="140" y2="118" stroke="#8a4b18" strokeWidth="2.5" strokeLinecap="round"/>
      {/* top piece */}
      <circle cx="140" cy="28" r="5" fill="#8a4b18"/>
      {/* beam */}
      <line x1="80" y1="50" x2="200" y2="50" stroke="#8a4b18" strokeWidth="2.2" strokeLinecap="round"/>
      {/* left pan chains */}
      <line x1="80" y1="50" x2="68" y2="82" stroke="#8a4b18" strokeWidth="1.5"/>
      <line x1="80" y1="50" x2="92" y2="82" stroke="#8a4b18" strokeWidth="1.5"/>
      {/* left pan — slightly lower (heavier) */}
      <path d="M 62 84 Q 80 96 98 84" fill="#f7e5d1" stroke="#8a4b18" strokeWidth="2" strokeLinecap="round"/>
      {/* right pan chains */}
      <line x1="200" y1="50" x2="188" y2="78" stroke="#8a4b18" strokeWidth="1.5"/>
      <line x1="200" y1="50" x2="212" y2="78" stroke="#8a4b18" strokeWidth="1.5"/>
      {/* right pan */}
      <path d="M 182 80 Q 200 92 218 80" fill="#f7e5d1" stroke="#8a4b18" strokeWidth="2" strokeLinecap="round"/>
      {/* base */}
      <rect x="124" y="118" width="32" height="5" rx="2.5" fill="#8a4b18" opacity="0.7"/>
      {/* left pan content: document lines */}
      <rect x="71" y="72" width="18" height="8" rx="2" fill="#8a4b18" opacity="0.25"/>
      <line x1="73" y1="75" x2="87" y2="75" stroke="#8a4b18" strokeWidth="1" strokeLinecap="round"/>
      <line x1="73" y1="78" x2="84" y2="78" stroke="#8a4b18" strokeWidth="1" strokeLinecap="round"/>
      {/* right pan content: checkmark */}
      <path d="M 192 69 L 197 75 L 208 64" fill="none" stroke="#1d7a55" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* labels */}
      <text x="80" y="130" textAnchor="middle" fontSize="9" fontWeight="700" fill="#8a4b1899" letterSpacing="0.05em">OBLIGATION</text>
      <text x="200" y="128" textAnchor="middle" fontSize="9" fontWeight="700" fill="#8a4b18" letterSpacing="0.05em">RECOURSE</text>
      {/* EU AI Act badge */}
      <rect x="96" y="18" width="88" height="18" rx="9" fill="#f7e5d1" stroke="#8a4b18" strokeWidth="1.2"/>
      <text x="140" y="31" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#8a4b18" letterSpacing="0.06em">EU AI ACT · GDPR</text>
    </svg>
  );
}

function BusinessIllustration() {
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}>
      {/* subtle grid */}
      {[40,80,120,160,200,240].map(x =>
        <line key={x} x1={x} y1="10" x2={x} y2="150" stroke="#c3e4d8" strokeWidth="0.6" strokeDasharray="3 4"/>
      )}
      {/* bar chart bars */}
      <rect x="44" y="100" width="22" height="38" rx="4" fill="#1d7a5533"/>
      <rect x="76" y="80"  width="22" height="58" rx="4" fill="#1d7a5555"/>
      <rect x="108" y="62" width="22" height="76" rx="4" fill="#1d7a5577"/>
      <rect x="140" y="44" width="22" height="94" rx="4" fill="#1d7a5599"/>
      <rect x="172" y="28" width="22" height="110" rx="4" fill="#1d7a55bb"/>
      {/* trend line over bars */}
      <path d="M 55 97 L 87 77 L 119 59 L 151 41 L 183 25"
        fill="none" stroke="#1d7a55" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* dots on trend */}
      {[[55,97],[87,77],[119,59],[151,41],[183,25]].map(([x,y],i) =>
        <circle key={i} cx={x} cy={y} r="4" fill="white" stroke="#1d7a55" strokeWidth="2"/>
      )}
      {/* shield */}
      <path d="M 228 30 L 255 30 L 255 56 Q 255 72 241.5 80 Q 228 72 228 56 Z"
        fill="#dff3ea" stroke="#1d7a55" strokeWidth="2"/>
      <path d="M 235 54 L 240 60 L 249 48" fill="none" stroke="#1d7a55" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"/>
      {/* axis */}
      <line x1="40" y1="138" x2="210" y2="138" stroke="#cfc4b4" strokeWidth="1.5" strokeLinecap="round"/>
      {/* year labels */}
      {[55,87,119,151,183].map((x, i) =>
        <text key={i} x={x} y="150" textAnchor="middle" fontSize="8" fill="#9ca3af" fontWeight="600">
          {`Q${i+1}`}
        </text>
      )}
      {/* shield label */}
      <text x="241" y="92" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#1d7a55" letterSpacing="0.06em">TRUST</text>
      {/* caption */}
      <text x="125" y="28" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1d7a5599" letterSpacing="0.06em">CUSTOMER RETENTION</text>
    </svg>
  );
}

const STAKEHOLDERS = [
  {
    audience: 'For individuals',
    color: '#2453a6',
    soft: '#dbe7ff',
    headline: 'Understand why you were rejected — and what to do next',
    body: 'When a loan, job, or benefit is denied by an automated system, recourse gives you a concrete, actionable path forward. Instead of an opaque "no," you receive a specific set of steps that would lead to approval.',
    Illustration: IndividualIllustration,
  },
  {
    audience: 'For regulators',
    color: '#8a4b18',
    soft: '#f7e5d1',
    headline: 'Make automated decisions legally accountable',
    body: 'Regulations like the EU AI Act and GDPR Article 22 require that consequential automated decisions be explainable and contestable. Algorithmic recourse operationalises this right — turning legal obligations into verifiable system properties.',
    Illustration: RegulatorIllustration,
  },
  {
    audience: 'For businesses',
    color: '#1d7a55',
    soft: '#dff3ea',
    headline: 'Build trust, reduce appeals, and demonstrate fairness',
    body: 'Deploying a recourse system signals transparency to customers and auditors alike. It reduces the volume of manual appeals, produces an audit trail for compliance reviews, and turns rejections into retention opportunities.',
    Illustration: BusinessIllustration,
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
            <div className="why-box-illustration" style={{ background: s.soft }}>
              <s.Illustration />
            </div>
            <div className="why-box-text">
              <span className="eyebrow" style={{ color: s.color }}>{s.audience}</span>
              <h3 className="why-box-heading">{s.headline}</h3>
              <p className="why-box-body">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
