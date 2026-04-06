import { useState, useEffect } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/hero/Hero.jsx';
import TrackTabs from './components/TrackTabs.jsx';
import ResearchTrack from './components/tracks/ResearchTrack/index.jsx';
import BuildTrack from './components/tracks/BuildTrack/index.jsx';
import DeployTrack from './components/tracks/DeployTrack/index.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('research');
  const [isMobile, setIsMobile]   = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const TRACK_HEADERS = [
    { key: 'research', label: 'Explore Research',   icon: '🔬', color: '#2563eb' },
    { key: 'build',    label: 'Build with Recourse', icon: '⚙',  color: '#7c3aed' },
    { key: 'deploy',   label: 'Deploy',              icon: '🏢', color: '#059669' },
  ];

  return (
    <>
      <Nav />
      <Hero />

      <section style={{ borderTop: '1px solid #e2e8f0' }}>
        {/* Section intro */}
        <div style={{ textAlign: 'center', padding: '3rem 2rem 0' }}>
          <div style={{ fontSize: '.72rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: '.6rem' }}>
            Choose Your Path
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 900, letterSpacing: '-.03em', marginBottom: '.6rem' }}>
            Three Tracks, One Mission
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            Whether you study recourse, build it, or deploy it — find exactly what you need.
          </p>
        </div>

        {/* Mobile: tab switcher */}
        {isMobile && <TrackTabs active={activeTab} setActive={setActiveTab} />}

        {isMobile ? (
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            {activeTab === 'research' && <ResearchTrack />}
            {activeTab === 'build'    && <BuildTrack />}
            {activeTab === 'deploy'   && <DeployTrack />}
          </div>
        ) : (
          /* Desktop: 3 independently-scrollable columns */
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            {/* Column label row */}
            <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid #e2e8f0' }}>
              {TRACK_HEADERS.map((col, i) => (
                <a key={col.key} href={`#${col.key}`}
                   style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '1rem',
                     borderRight: i < 2 ? '1px solid #e2e8f0' : 'none', background: '#f8fafc', textDecoration: 'none',
                     transition: 'background .2s' }}
                   onMouseEnter={e => e.currentTarget.style.background = '#fff'}
                   onMouseLeave={e => e.currentTarget.style.background = '#f8fafc'}>
                  <span style={{ fontSize: '1.1rem' }}>{col.icon}</span>
                  <span style={{ fontWeight: 800, fontSize: '.88rem', color: col.color }}>{col.label}</span>
                </a>
              ))}
            </div>

            {/* Track columns */}
            <div id="research" className="track-col" style={{ borderRight: '1px solid #e2e8f0' }}><ResearchTrack /></div>
            <div id="build"    className="track-col" style={{ borderRight: '1px solid #e2e8f0' }}><BuildTrack /></div>
            <div id="deploy"   className="track-col"><DeployTrack /></div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
