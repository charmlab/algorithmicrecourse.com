/** @type {Array<{name:string, runtime:number, validity:number, sparsity:number, model:string, data:string, color:string, pkg:string}>} */
export const METHODS = [
  { name: 'DiCE',          runtime: 2.1, validity: 92, sparsity: 3.2, model: 'Any',           data: 'Tabular', color: '#2563eb', pkg: 'dice-ml' },
  { name: 'Wachter',       runtime: 1.4, validity: 88, sparsity: 4.5, model: 'Differentiable', data: 'Tabular', color: '#7c3aed', pkg: 'carla' },
  { name: 'FACE',          runtime: 5.2, validity: 78, sparsity: 2.1, model: 'Any',           data: 'Tabular', color: '#059669', pkg: 'carla' },
  { name: 'ROAR',          runtime: 3.8, validity: 85, sparsity: 3.8, model: 'Any',           data: 'Tabular', color: '#dc2626', pkg: 'carla' },
  { name: 'Causal',        runtime: 6.5, validity: 82, sparsity: 2.5, model: 'Any',           data: 'Tabular', color: '#0891b2', pkg: 'carla' },
  { name: 'GrowingSpheres',runtime: 0.8, validity: 75, sparsity: 5.1, model: 'Any',           data: 'Tabular', color: '#ca8a04', pkg: 'carla' },
  { name: 'CERTIFAI',      runtime: 8.2, validity: 90, sparsity: 2.9, model: 'Any',           data: 'Tabular', color: '#be185d', pkg: 'certifai' },
  { name: 'AR (Ustun)',    runtime: 0.5, validity: 95, sparsity: 1.8, model: 'Linear',        data: 'Tabular', color: '#4f46e5', pkg: 'actionable-recourse' },
  { name: 'GeCo',          runtime: 3.1, validity: 87, sparsity: 2.3, model: 'Any',           data: 'Tabular', color: '#9333ea', pkg: 'carla' },
  { name: 'CRUDS',         runtime: 4.0, validity: 80, sparsity: 3.0, model: 'Differentiable',data: 'Tabular', color: '#f97316', pkg: 'carla' },
];

export const MODEL_TYPES = ['All', 'Linear', 'Tree-Based', 'Differentiable', 'Any'];
export const DATA_TYPES  = ['All', 'Tabular', 'Image', 'Text'];

export const METRICS_GLOSSARY = [
  { term: 'Validity',        aka: 'Success Rate', def: 'Fraction of generated recourse actions that successfully flip the model\'s prediction to the desired outcome.' },
  { term: 'Cost / Proximity',aka: 'Distance',     def: 'Average distance between the original input and the counterfactual in feature space (L1, L2, or weighted).' },
  { term: 'Sparsity',        aka: '# Features Changed', def: 'Average number of features changed per recourse action. Lower is better—users prefer fewer changes.' },
  { term: 'Plausibility',    aka: 'Realism',      def: 'How likely a counterfactual is under the real data distribution. Implausible recourse suggests impossible combinations.' },
  { term: 'Robustness',      aka: 'Stability',    def: 'Probability that recourse stays valid under small perturbations of the model or input. Critical for compliance.' },
];
