export const BUSINESS_MAP = [
  {
    metric: 'Validity', business: 'Customer Retention', icon: '↩', color: '#2563eb', colorBg: '#dbeafe',
    detail: 'Retain rejected applicants by giving them a feasible path to approval. Higher validity = more users successfully re-engage.',
  },
  {
    metric: 'Sparsity', business: 'User Trust & UX', icon: '✦', color: '#7c3aed', colorBg: '#ede9fe',
    detail: 'Provide simple, single-step actions rather than overwhelming users with 10 changes. Fewer steps = higher completion rates.',
  },
  {
    metric: 'Robustness', business: 'Regulatory Compliance', icon: '⛨', color: '#059669', colorBg: '#dcfce7',
    detail: 'Future-proof your models against EU AI Act requirements. Robust recourse survives model updates and audits.',
  },
  {
    metric: 'Plausibility', business: 'Brand Credibility', icon: '◈', color: '#dc2626', colorBg: '#fee2e2',
    detail: 'Never suggest impossible actions. Implausible recommendations erode trust and invite scrutiny from regulators.',
  },
];

export const MOCK_APPLICANT = {
  name: 'Sarah Chen', age: 34, income: 42000, creditScore: 610,
  debtRatio: 0.45, employmentYears: 2.5, education: "Bachelor's",
};

export const RECOURSE_PLANS = [
  {
    method: 'DiCE (Gradient)', color: '#2563eb',
    actions: [
      { feature: 'Annual Income',    change: '+$8,200',  direction: '↑', effort: 'Medium' },
      { feature: 'Debt-to-Income',   change: '−12%',     direction: '↓', effort: 'Medium' },
    ],
    validity: '94%', cost: 'Low',
  },
  {
    method: 'Causal Recourse', color: '#059669',
    actions: [
      { feature: 'Annual Income',        change: '+$5,000',    direction: '↑', effort: 'Low' },
      { feature: 'Employment Duration',  change: '+6 months',  direction: '↑', effort: 'Low' },
      { feature: 'Credit Utilization',   change: '−8%',        direction: '↓', effort: 'Low' },
    ],
    validity: '88%', cost: 'Very Low',
  },
  {
    method: 'ROAR (Robust)', color: '#dc2626',
    actions: [
      { feature: 'Annual Income', change: '+$12,500', direction: '↑', effort: 'High' },
    ],
    validity: '97%', cost: 'High',
  },
];
