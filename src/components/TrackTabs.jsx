const TABS = [
  { key: 'research', label: 'Explore Research',   icon: '🔬' },
  { key: 'build',    label: 'Build with Recourse', icon: '⚙'  },
  { key: 'deploy',   label: 'Deploy',              icon: '🏢' },
];

export default function TrackTabs({ active, setActive }) {
  return (
    <div style={{
      display: 'flex', gap: 8, justifyContent: 'center',
      padding: '1rem', background: '#f8fafc',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky', top: 64, zIndex: 100,
      flexWrap: 'wrap',
    }}>
      {TABS.map(t => (
        <button
          key={t.key}
          onClick={() => setActive(t.key)}
          style={{
            padding: '10px 20px', borderRadius: 10, fontWeight: 700, fontSize: '.82rem',
            cursor: 'pointer', fontFamily: 'inherit',
            border: `1.5px solid ${active === t.key ? '#0f172a' : '#e2e8f0'}`,
            background: active === t.key ? '#0f172a' : '#fff',
            color: active === t.key ? '#fff' : '#475569',
            boxShadow: active === t.key ? '0 4px 16px rgba(15,23,42,.2)' : 'none',
            transition: 'all .2s',
          }}
        >
          <span style={{ marginRight: 6 }}>{t.icon}</span>
          {t.label}
        </button>
      ))}
    </div>
  );
}
