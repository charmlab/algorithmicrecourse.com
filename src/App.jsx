import { useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/hero/Hero.jsx';
import WhyRecourse from './components/WhyRecourse.jsx';
import FeaturedResources from './components/FeaturedResources.jsx';
import PathCards from './components/PathCards.jsx';
import ResearchTrack from './components/tracks/ResearchTrack/index.jsx';
import BuildTrack from './components/tracks/BuildTrack/index.jsx';
import DeployTrack from './components/tracks/DeployTrack/index.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('research');

  const TRACKS = [
    {
      key: 'research',
      label: 'Research',
      kicker: 'Map the field',
      title: 'Survey the literature and identify open questions.',
      description: 'For scholars and advanced readers who need foundations, distinctions, and a clear view of the active research landscape.',
      bullets: ['Search seminal papers and newer threads', 'Compare causal, optimization, and game-theoretic approaches', 'Capture open problems worth pursuing'],
      cta: 'Explore research',
      color: '#2453a6',
      softColor: '#dbe7ff',
      panelId: 'research-panel',
      component: <ResearchTrack />,
    },
    {
      key: 'build',
      label: 'Build',
      kicker: 'Prototype confidently',
      title: 'Move from theory into implementation patterns.',
      description: 'For builders evaluating methods, metrics, and packages before integrating recourse into real model pipelines.',
      bullets: ['Compare methods by assumptions and tradeoffs', 'Inspect evaluation metrics before choosing a benchmark', 'Find practical package starting points'],
      cta: 'See implementation guidance',
      color: '#8a4b18',
      softColor: '#f7e5d1',
      panelId: 'build-panel',
      component: <BuildTrack />,
    },
    {
      key: 'deploy',
      label: 'Deploy',
      kicker: 'Operate responsibly',
      title: 'Translate recourse into product, policy, and governance.',
      description: 'For leaders and deployment teams aligning user experience, compliance, and institutional value.',
      bullets: ['Connect technical metrics to business outcomes', 'Understand governance and audit implications', 'Frame recourse as an organizational capability'],
      cta: 'Review deployment guidance',
      color: '#1d7a55',
      softColor: '#dff3ea',
      panelId: 'deploy-panel',
      component: <DeployTrack />,
    },
  ];

  const activeTrack = TRACKS.find((track) => track.key === activeTab) ?? TRACKS[0];

  return (
    <>
      <Nav />
      <Hero />
      <main className="page-shell">
        <WhyRecourse />
        <FeaturedResources />
        <PathCards activePath={activeTab} setActivePath={setActiveTab} tracks={TRACKS} />

        <section id={activeTrack.panelId} className="section-shell active-track-shell">
          <div className="active-track-header">
            <div>
              <span className="eyebrow">Active Path</span>
              <h2>{activeTrack.label}</h2>
            </div>
            <div className="active-track-switcher">
              {TRACKS.map((track) => (
                <button
                  key={track.key}
                  type="button"
                  className={track.key === activeTab ? 'active' : ''}
                  onClick={() => setActiveTab(track.key)}
                >
                  {track.label}
                </button>
              ))}
            </div>
          </div>

          <div className="active-track-hero card-lift">
            <div>
              <span className="path-badge" style={{ background: activeTrack.softColor, color: activeTrack.color }}>
                {activeTrack.kicker}
              </span>
              <h3>{activeTrack.title}</h3>
              <p>{activeTrack.description}</p>
            </div>
            <ul>
              {activeTrack.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>

          <div className="track-panel">
            {activeTrack.component}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
