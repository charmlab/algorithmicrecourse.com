import BusinessValueMap from './BusinessValueMap.jsx';
import BankManagerDemo from './BankManagerDemo.jsx';

export default function DeployTrack() {
  return (
    <div style={{ padding: '2rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <span className="chip" style={{ background: '#dcfce7', color: '#166534', marginBottom: 12, display: 'inline-block' }}>
          Track 3 · Executives
        </span>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-.03em', marginBottom: '.5rem' }}>
          Deploy in Your Organization
        </h2>
        <p style={{ fontSize: '.88rem', color: '#64748b', lineHeight: 1.65 }}>
          From algorithmic metrics to business ROI, compliance, and retention.
        </p>
      </div>

      <BusinessValueMap />
      <BankManagerDemo />

      <div style={{ display: 'flex', gap: 10 }}>
        <a href="mailto:charm-lab@uwaterloo.ca"
           style={{ flex: 1, padding: '14px', background: 'linear-gradient(90deg,#059669,#10b981)', color: '#fff', borderRadius: 10, fontWeight: 800, fontSize: '.9rem', textDecoration: 'none', textAlign: 'center', boxShadow: '0 4px 16px rgba(5,150,105,.3)', transition: 'opacity .2s' }}>
          Partner with Us
        </a>
        <a href="mailto:charm-lab@uwaterloo.ca"
           style={{ flex: 1, padding: '14px', background: '#fff', color: '#0f172a', borderRadius: 10, fontWeight: 700, fontSize: '.9rem', textDecoration: 'none', textAlign: 'center', border: '1.5px solid #e2e8f0', transition: 'all .2s' }}>
          Schedule an Audit
        </a>
      </div>
    </div>
  );
}
