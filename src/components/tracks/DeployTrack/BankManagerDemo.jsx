import { useState } from 'react';
import { MOCK_APPLICANT, RECOURSE_PLANS } from '../../../data/business.js';

const EFFORT_STYLE = {
  Low:       { bg: '#dcfce7', color: '#166534' },
  Medium:    { bg: '#fef3c7', color: '#92400e' },
  High:      { bg: '#fee2e2', color: '#991b1b' },
  'Very Low':{ bg: '#dcfce7', color: '#166534' },
};

function ApplicantCard() {
  const a = MOCK_APPLICANT;
  return (
    <div style={{ background: '#1e293b', borderRadius: 10, padding: '1.1rem', marginBottom: '1rem', border: '1px solid #334155' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '.88rem' }}>
            {a.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '.88rem' }}>{a.name}</div>
            <div style={{ fontSize: '.72rem', color: '#64748b' }}>Age {a.age} · {a.education}</div>
          </div>
        </div>
        <div style={{ padding: '5px 14px', background: 'rgba(239,68,68,.12)', border: '1px solid rgba(239,68,68,.3)', borderRadius: 8, color: '#fca5a5', fontWeight: 800, fontSize: '.78rem' }}>
          ✕ REJECTED
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
        {[
          { l: 'Income',       v: `$${(a.income / 1000).toFixed(0)}k` },
          { l: 'Credit Score', v: a.creditScore },
          { l: 'Debt Ratio',   v: `${(a.debtRatio * 100).toFixed(0)}%` },
        ].map(s => (
          <div key={s.l} style={{ background: '#0f172a', borderRadius: 7, padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: '.6rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 700, marginBottom: 2 }}>{s.l}</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#e2e8f0' }}>{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecoursePlan({ plan, delay }) {
  return (
    <div className="slide-left" style={{ background: '#1e293b', borderRadius: 10, padding: '1rem', border: `1.5px solid ${plan.color}44`, animationDelay: `${delay}s` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: plan.color }} />
          <span style={{ fontWeight: 800, fontSize: '.82rem', color: '#e2e8f0' }}>{plan.method}</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <span className="chip" style={{ background: `${plan.color}22`, color: plan.color }}>Validity: {plan.validity}</span>
          <span className="chip" style={{ background: '#0f172a', color: '#94a3b8' }}>Cost: {plan.cost}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {plan.actions.map((a, j) => {
          const es = EFFORT_STYLE[a.effort] ?? { bg: '#f1f5f9', color: '#475569' };
          return (
            <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', background: '#0f172a', borderRadius: 7 }}>
              <span style={{ fontSize: '1rem', color: a.direction === '↑' ? '#4ade80' : '#f87171', fontWeight: 700 }}>{a.direction}</span>
              <span style={{ fontSize: '.8rem', color: '#e2e8f0', fontWeight: 600, flex: 1 }}>{a.feature}</span>
              <span style={{ fontSize: '.8rem', color: plan.color, fontWeight: 800 }}>{a.change}</span>
              <span className="chip" style={{ background: es.bg, color: es.color }}>{a.effort}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BankManagerDemo() {
  const [generated, setGenerated] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const generate = () => {
    setLoading(true);
    setGenerated(false);
    setTimeout(() => { setLoading(false); setGenerated(true); }, 1200);
  };

  return (
    <div style={{ background: 'linear-gradient(145deg,#0f172a,#1e293b)', borderRadius: 14, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #334155' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', letterSpacing: '-.02em' }}>Loan Decision Dashboard</h3>
        <span className="chip" style={{ background: 'rgba(239,68,68,.15)', color: '#fca5a5' }}>Demo</span>
      </div>

      <ApplicantCard />

      <button onClick={generate} disabled={loading}
        style={{
          width: '100%', padding: '14px',
          background: loading ? '#334155' : 'linear-gradient(90deg,#2563eb,#4f46e5)',
          color: '#fff', borderRadius: 10, fontWeight: 800, fontSize: '.95rem',
          border: 'none', cursor: loading ? 'wait' : 'pointer', fontFamily: 'inherit',
          transition: 'all .2s', boxShadow: loading ? 'none' : '0 4px 20px rgba(37,99,235,.4)',
          marginBottom: '1.25rem',
        }}>
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} />
            Generating Recourse Plans...
          </span>
        ) : generated ? 'Regenerate Recourse' : 'Generate Recourse'}
      </button>

      {generated && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {RECOURSE_PLANS.map((plan, i) => (
            <RecoursePlan key={plan.method} plan={plan} delay={i * 0.15} />
          ))}
        </div>
      )}
    </div>
  );
}
