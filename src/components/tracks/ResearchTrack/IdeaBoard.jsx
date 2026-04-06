import { useState } from 'react';
import { IDEAS } from '../../../data/ideas.js';

const STATUS_STYLE = {
  'open':        { bg: '#dcfce7', color: '#166534' },
  'in-progress': { bg: '#fef3c7', color: '#92400e' },
  'planned':     { bg: '#e0e7ff', color: '#3730a3' },
};

export default function IdeaBoard() {
  const [votes, setVotes] = useState({});

  const toggle = (id) => setVotes(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-.02em' }}>Idea Board</h3>
          <p style={{ fontSize: '.78rem', color: '#64748b' }}>Propose metrics, datasets, or open problems.</p>
        </div>
        <button style={{ padding: '7px 14px', background: '#dbeafe', color: '#1d4ed8', borderRadius: 8, fontWeight: 700, fontSize: '.78rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
          + New Idea
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {IDEAS.map(idea => {
          const voted = Boolean(votes[idea.id]);
          const st = STATUS_STYLE[idea.status];
          return (
            <div key={idea.id} className="idea-card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 9 }}>
              <button
                onClick={() => toggle(idea.id)}
                className={`upvote-btn ${voted ? 'voted' : ''}`}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
                  padding: '6px 8px', background: voted ? '#dbeafe' : '#f8fafc',
                  border: '1px solid #e2e8f0', borderRadius: 7, cursor: 'pointer', minWidth: 44,
                }}
              >
                <span style={{ fontSize: '.7rem', fontWeight: 800 }}>▲</span>
                <span style={{ fontSize: '.78rem', fontWeight: 800, color: voted ? '#2563eb' : '#0f172a' }}>
                  {idea.votes + (voted ? 1 : 0)}
                </span>
              </button>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '.82rem', fontWeight: 600, color: '#0f172a', lineHeight: 1.4, marginBottom: 3 }}>
                  {idea.title}
                </div>
                <div style={{ display: 'flex', gap: 5 }}>
                  <span className="chip" style={{ background: '#f1f5f9', color: '#475569' }}>{idea.category}</span>
                  <span className="chip" style={{ background: st.bg, color: st.color }}>{idea.status}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
