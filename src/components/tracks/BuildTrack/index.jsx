import { useState } from 'react';
import ApplicabilityMatrix from './ApplicabilityMatrix.jsx';
import PipInstallWizard from './PipInstallWizard.jsx';
import MetricsGlossary from './MetricsGlossary.jsx';

export default function BuildTrack() {
  const [modelFilter, setModelFilter] = useState('All');
  const [dataFilter,  setDataFilter]  = useState('All');

  return (
    <div style={{ padding: '2rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <span className="chip" style={{ background: '#ede9fe', color: '#6d28d9', marginBottom: 12, display: 'inline-block' }}>
          Track 2 · Practitioners
        </span>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-.03em', marginBottom: '.5rem' }}>
          Build with Recourse
        </h2>
        <p style={{ fontSize: '.88rem', color: '#64748b', lineHeight: 1.65 }}>
          Interactive benchmarks, code, and evaluation tools.
        </p>
      </div>

      <ApplicabilityMatrix
        modelFilter={modelFilter}
        dataFilter={dataFilter}
        onModelChange={setModelFilter}
        onDataChange={setDataFilter}
      />

      <PipInstallWizard modelFilter={modelFilter} dataFilter={dataFilter} />

      <MetricsGlossary />
    </div>
  );
}
