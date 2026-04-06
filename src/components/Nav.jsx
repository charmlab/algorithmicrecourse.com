import { useState, useEffect } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Paths', href: '#paths' },
    { label: 'Research', href: '#research-panel' },
    { label: 'Deploy', href: '#deploy-panel' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: 64,
      background: scrolled ? 'rgba(255,255,255,.97)' : 'rgba(255,255,255,.6)',
      backdropFilter: 'blur(16px)',
      borderBottom: scrolled ? '1px solid #e2e8f0' : '1px solid transparent',
      transition: 'all .3s', padding: '0 2rem',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#1e3a8a,#2563eb)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h4l2-5 2 10 2-5h4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: '.95rem', color: '#0f172a', letterSpacing: '-.02em' }}>
            AlgorithmicRecourse
          </span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          {links.map((link) => (
            <a key={link.label} href={link.href}
               style={{ fontSize: '.85rem', fontWeight: 600, color: '#475569', textDecoration: 'none', transition: 'color .15s' }}
               onMouseEnter={e => e.currentTarget.style.color = '#0f172a'}
               onMouseLeave={e => e.currentTarget.style.color = '#475569'}>
              {link.label}
            </a>
          ))}
          <a href="https://github.com/charmlab" target="_blank" rel="noopener noreferrer"
             style={{ padding: '8px 18px', background: '#0f172a', color: '#fff', borderRadius: 8, fontSize: '.85rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, transition: 'background .2s' }}
             onMouseEnter={e => e.currentTarget.style.background = '#1e3a8a'}
             onMouseLeave={e => e.currentTarget.style.background = '#0f172a'}>
            <GitHubIcon />
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
