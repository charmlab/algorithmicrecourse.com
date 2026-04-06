/** @type {Array<{id:number, title:string, authors:string, year:number, approach:string, tags:string[], citations:number}>} */
export const PAPERS = [
  { id: 1,  title: 'Counterfactual Explanations Without Opening the Black Box', authors: 'Wachter, Mittelstadt & Russell', year: 2017, approach: 'Optimization', tags: ['Foundational'], citations: 1850 },
  { id: 2,  title: 'Diverse Counterfactual Explanations (DiCE)', authors: 'Mothilal, Sharma & Tan', year: 2020, approach: 'Gradient', tags: ['Diverse', 'Actionable'], citations: 920 },
  { id: 3,  title: 'Algorithmic Recourse via Causal Models', authors: 'Karimi, Schölkopf & Valera', year: 2021, approach: 'Causal', tags: ['Causal', 'Robust'], citations: 640 },
  { id: 4,  title: 'FACE: Feasible and Actionable Counterfactual Explanations', authors: 'Poyiadzi et al.', year: 2020, approach: 'Graph', tags: ['Actionable', 'Fair'], citations: 380 },
  { id: 5,  title: 'Actionable Recourse in Linear Classification', authors: 'Ustun, Spangher & Liu', year: 2019, approach: 'Optimization', tags: ['Foundational', 'Fair'], citations: 720 },
  { id: 6,  title: 'Robust Algorithmic Recourse (ROAR)', authors: 'Upadhyay, Joshi & Lakkaraju', year: 2021, approach: 'Optimization', tags: ['Robust'], citations: 310 },
  { id: 7,  title: 'Algorithmic Recourse Under Imperfect Causal Knowledge', authors: 'Karimi et al.', year: 2020, approach: 'Causal', tags: ['Causal', 'Privacy'], citations: 280 },
  { id: 8,  title: 'Beyond Individualized Recourse', authors: 'Rawal et al.', year: 2021, approach: 'Optimization', tags: ['Fair', 'Actionable'], citations: 195 },
  { id: 9,  title: 'Consequential Recommendations and Recourse', authors: 'Perdomo et al.', year: 2020, approach: 'Game-Theoretic', tags: ['Robust', 'Foundational'], citations: 410 },
  { id: 10, title: 'CERTIFAI: Counterfactual Explanations for Robustness', authors: 'Sharma et al.', year: 2020, approach: 'Optimization', tags: ['Robust', 'Diverse'], citations: 250 },
  { id: 11, title: 'Multi-Objective Counterfactual Explanations', authors: 'Dandl et al.', year: 2020, approach: 'Optimization', tags: ['Diverse', 'Actionable'], citations: 230 },
  { id: 12, title: 'Preserving Causal Constraints in Counterfactual Explanations', authors: 'Mahajan et al.', year: 2020, approach: 'Causal', tags: ['Causal', 'Actionable'], citations: 340 },
  { id: 13, title: 'The Hidden Assumptions Behind Counterfactual Explanations', authors: 'Barocas et al.', year: 2020, approach: 'Theoretical', tags: ['Foundational', 'Fair'], citations: 580 },
  { id: 14, title: 'Recourse for Privacy-Preserving Models', authors: 'von Kügelgen et al.', year: 2022, approach: 'Causal', tags: ['Privacy', 'Causal'], citations: 120 },
  { id: 15, title: 'Strategic Behavior and Algorithmic Recourse', authors: 'Tsirtsis & Gomez-Rodriguez', year: 2020, approach: 'Game-Theoretic', tags: ['Robust', 'Fair'], citations: 175 },
  { id: 16, title: 'GeCo: Quality Counterfactual Explanations', authors: 'Schleich et al.', year: 2021, approach: 'Optimization', tags: ['Actionable', 'Diverse'], citations: 160 },
];

export const APPROACHES = ['All', 'Optimization', 'Gradient', 'Causal', 'Graph', 'Game-Theoretic', 'Theoretical'];
export const FOCUS_TAGS  = ['All', 'Causal', 'Robust', 'Fair', 'Privacy', 'Diverse', 'Actionable', 'Foundational'];
