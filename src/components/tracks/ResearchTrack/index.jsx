import { useState, useMemo } from 'react';
import { PAPERS, APPROACHES, FOCUS_TAGS } from '../../../data/papers.js';
import PaperCard from './PaperCard.jsx';
import IdeaBoard from './IdeaBoard.jsx';

export default function ResearchTrack() {
  const [search,   setSearch]   = useState('');
  const [approach, setApproach] = useState('All');
  const [focus,    setFocus]    = useState('All');

  const filtered = useMemo(() => PAPERS.filter(p => {
    const q = search.toLowerCase();
    const matchSearch   = !q || p.title.toLowerCase().includes(q) || p.authors.toLowerCase().includes(q);
    const matchApproach = approach === 'All' || p.approach === approach;
    const matchFocus    = focus    === 'All' || p.tags.includes(focus);
    return matchSearch && matchApproach && matchFocus;
  }), [search, approach, focus]);

  return (
    <div style={{ padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <span className="chip" style={{ background: '#dbeafe', color: '#1d4ed8', marginBottom: 12, display: 'inline-block' }}>
          Track 1 · Researchers
        </span>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-.03em', marginBottom: '.5rem' }}>
          Research
        </h2>
        <p style={{ fontSize: '.88rem', color: '#64748b', lineHeight: 1.65 }}>
          Survey core papers, compare methodological families, and identify open questions worth pursuing.
        </p>
      </div>

      {/* Search */}
      <input
        value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search papers, authors..."
        style={{ width: '100%', padding: '10px 14px', background: '#f1f5f9', border: '1.5px solid #e2e8f0', borderRadius: 9, fontSize: '.88rem', outline: 'none', fontFamily: 'inherit', marginBottom: '1.25rem', transition: 'border-color .2s' }}
        onFocus={e  => e.currentTarget.style.borderColor = '#2563eb'}
        onBlur={e   => e.currentTarget.style.borderColor = '#e2e8f0'}
      />

      {/* Approach filter */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '.75rem', alignItems: 'center' }}>
        <span style={{ fontSize: '.65rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.08em', marginRight: 4 }}>APPROACH:</span>
        {APPROACHES.map(a => (
          <button key={a} onClick={() => setApproach(a)} className="chip"
            style={{ background: approach === a ? '#1e3a8a' : '#f1f5f9', color: approach === a ? '#fff' : '#475569', cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>
            {a}
          </button>
        ))}
      </div>

      {/* Focus filter */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
        <span style={{ fontSize: '.65rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.08em', marginRight: 4 }}>FOCUS:</span>
        {FOCUS_TAGS.map(t => (
          <button key={t} onClick={() => setFocus(t)} className="chip"
            style={{ background: focus === t ? '#1e3a8a' : '#f1f5f9', color: focus === t ? '#fff' : '#475569', cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>
            {t}
          </button>
        ))}
      </div>

      {/* Count */}
      <div style={{ fontSize: '.78rem', color: '#94a3b8', fontWeight: 600, marginBottom: '.75rem' }}>
        {filtered.length} paper{filtered.length !== 1 ? 's' : ''} found
      </div>

      {/* Paper list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '2.5rem', maxHeight: 420, overflowY: 'auto', paddingRight: 4 }}>
        {filtered.map(p => <PaperCard key={p.id} paper={p} />)}
      </div>

      {/* Idea Board */}
      <IdeaBoard />

      {/* CTAs */}
      <div style={{ marginTop: '2rem', display: 'flex', gap: 10 }}>
        <a href="https://github.com/charmlab" target="_blank" rel="noopener noreferrer"
           style={{ flex: 1, padding: '12px', background: '#0f172a', color: '#fff', borderRadius: 9, fontWeight: 700, fontSize: '.88rem', textDecoration: 'none', textAlign: 'center', transition: 'background .2s' }}
           onMouseEnter={e => e.currentTarget.style.background = '#1e3a8a'}
           onMouseLeave={e => e.currentTarget.style.background = '#0f172a'}>
          Submit a Paper
        </a>
        <a href="https://github.com/charmlab" target="_blank" rel="noopener noreferrer"
           style={{ flex: 1, padding: '12px', background: '#fff', color: '#0f172a', borderRadius: 9, fontWeight: 700, fontSize: '.88rem', textDecoration: 'none', textAlign: 'center', border: '1.5px solid #e2e8f0', transition: 'all .2s' }}>
          Join the Discussion
        </a>
      </div>
    </div>
  );
}
