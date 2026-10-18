import type {
  FlagshipResearch,
  PillarId,
  PipelineStage,
  ResearchPillar,
  ThesisMetricKey,
  ThesisSplit,
} from "./types";

export const FLAGSHIP_HREF = "/research/cluttered-grasp-reasoning";

/* ------------------------------------------------------------------ */
/* Research themes (/research)                                         */
/* `methods` = what Yue has used; `questions` = what Yue wants to study */
/* ------------------------------------------------------------------ */

export const researchPillars: ResearchPillar[] = [
  {
    id: "perception",
    index: "01",
    title: "Robot Perception",
    description:
      "Learning visual representations that allow robots to detect and understand objects in complex environments.",
    methodsLabel: "Methods I have used",
    methods: [
      "Computer Vision",
      "Object Detection",
      "Open-Vocabulary Segmentation",
      "Deep Learning",
    ],
    questions: [
      "How can objects be detected reliably when they are stacked, touching and partially occluded?",
      "How well do open-vocabulary visual models transfer to imaging domains they were not trained on?",
    ],
    relatedWork: [
      { label: "B.Sc. thesis — object detection stage", href: FLAGSHIP_HREF },
      {
        label: "Open-vocabulary segmentation for X-ray imagery",
        href: "/projects/ovseg-xray-security",
      },
    ],
  },
  {
    id: "understanding",
    index: "02",
    title: "Scene Understanding",
    description:
      "Moving beyond isolated object detection toward understanding spatial, semantic and dependency relationships between objects.",
    methodsLabel: "Methods I have used",
    methods: [
      "Visual Relation Reasoning",
      "Graph Representation",
      "Graph Transformers",
      "Attention Mechanisms",
    ],
    questions: [
      "How can relations between objects be inferred from visual input, rather than from each object in isolation?",
      "Which scene representation makes object dependencies explicit enough for a robot to act on?",
    ],
    relatedWork: [
      {
        label: "B.Sc. thesis — relation reasoning & dependency graphs",
        href: FLAGSHIP_HREF,
      },
    ],
  },
  {
    id: "manipulation",
    index: "03",
    title: "Manipulation & Autonomous Systems",
    description:
      "Connecting perception and structured scene understanding with robot decision-making, grasping and autonomous behaviour.",
    methodsLabel: "Relevant experience",
    methods: ["ROS", "Path Planning", "Trajectory Tracking", "Embedded Systems"],
    questions: [
      "How should a structured scene representation inform which object a robot grasps next?",
      "What changes when perception has to run on, and be validated with, a physical system?",
    ],
    relatedWork: [
      {
        label: "B.Sc. thesis — manipulation-oriented scene representation",
        href: FLAGSHIP_HREF,
      },
      {
        label: "Autonomous intelligent vehicle (physical testing)",
        href: "/projects/autonomous-intelligent-vehicle",
      },
    ],
  },
];

/** The research narrative in four steps, shown on /research. */
export const researchNarrative: {
  title: string;
  body: string;
  status: "thesis" | "next";
}[] = [
  {
    title: "Perception",
    body: "Detect the objects in a cluttered visual scene.",
    status: "thesis",
  },
  {
    title: "Scene Understanding",
    body: "Infer how the objects relate to and depend on each other.",
    status: "thesis",
  },
  {
    title: "Structured Reasoning",
    body: "Represent the scene as a dependency graph.",
    status: "thesis",
  },
  {
    title: "Robotic Manipulation",
    body: "Use that structure for grasp planning and robot action.",
    status: "next",
  },
];

/* ------------------------------------------------------------------ */
/* Research direction pipeline (homepage)                             */
/* ------------------------------------------------------------------ */

export const pipelineGroups: { id: PillarId; label: string }[] = [
  { id: "perception", label: "Perception" },
  { id: "understanding", label: "Scene understanding" },
  { id: "manipulation", label: "Manipulation" },
];

export const pipelineStages: PipelineStage[] = [
  {
    id: "scene",
    title: "RGB / Visual Scene",
    summary: "Unstructured visual input",
    description:
      "An unstructured view of a cluttered scene: many objects, touching, stacked and partly occluding each other.",
    group: "perception",
    glyph: "scene",
    coverage: "thesis",
    evidence: [
      {
        label: "Cluttered grasping scenes from MetaGraspNetV2 (B.Sc. thesis)",
        href: FLAGSHIP_HREF,
      },
      {
        label: "X-ray security imagery (open-vocabulary segmentation)",
        href: "/projects/ovseg-xray-security",
      },
    ],
  },
  {
    id: "detection",
    title: "Object Detection",
    summary: "What is where?",
    description:
      "Localise and classify every object instance. In my thesis, following D3G, this stage is a Deformable DETR detector whose object queries also serve as the graph nodes.",
    group: "perception",
    glyph: "detection",
    coverage: "thesis",
    evidence: [
      { label: "Object detection stage (B.Sc. thesis)", href: FLAGSHIP_HREF },
      {
        label: "Open-vocabulary segmentation with scenario-aware prompts",
        href: "/projects/ovseg-xray-security",
      },
    ],
  },
  {
    id: "relations",
    title: "Object Relations",
    summary: "How do objects constrain each other?",
    description:
      "Infer relations between every pair of candidate objects in the context of the whole scene. In my thesis this is the Graph Transformer Dense module from D3G.",
    group: "understanding",
    glyph: "relations",
    coverage: "thesis",
    evidence: [{ label: "Relation reasoning stage (B.Sc. thesis)", href: FLAGSHIP_HREF }],
  },
  {
    id: "graph",
    title: "Scene / Dependency Graph",
    summary: "A structured representation",
    description:
      "Objects become nodes and grasp-order dependencies become directed edges. In my thesis I proposed an additional pairwise constraint on the direction of these edges.",
    group: "understanding",
    glyph: "graph",
    coverage: "thesis",
    evidence: [
      { label: "Directed dependency graph + direction constraint (B.Sc. thesis)", href: FLAGSHIP_HREF },
    ],
  },
  {
    id: "reasoning",
    title: "Manipulation Reasoning",
    summary: "What can be grasped next?",
    description:
      "Use the dependency graph to decide which objects are accessible and in which order a scene can be cleared. My thesis produces the graph for this step but does not include a grasp-order planner.",
    group: "manipulation",
    glyph: "reasoning",
    coverage: "next",
    evidence: [
      { label: "Motivation of the B.Sc. thesis", href: `${FLAGSHIP_HREF}#motivation` },
    ],
  },
  {
    id: "action",
    title: "Robot Action",
    summary: "Grasp and execute",
    description:
      "Execute grasps on a physical robot and use the outcome as feedback. I have not worked on robot grasp execution yet; my closest experience is testing an autonomous vehicle on physical hardware.",
    group: "manipulation",
    glyph: "action",
    coverage: "next",
    evidence: [
      {
        label: "Autonomous vehicle: path planning, trajectory tracking, track tests",
        href: "/projects/autonomous-intelligent-vehicle",
      },
      { label: "ROS and robotics coursework", href: "/cv#cv-education" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Flagship research: Bachelor's thesis                               */
/*                                                                    */
/* Sources: the final thesis PDF (BISTU, 23 Feb – 14 Jun 2026), the   */
/* D3G paper (Rabino & Tommasi, RA-L 2025; §III and Table I), the D3G */
/* evaluator (metrics/oi_eval.py) and the training logs of the four   */
/* runs listed in `setup.runs`. Do not add details these do not       */
/* contain. Not claimed: that the two relation runs form a            */
/* controlled ablation.                                               */
/* ------------------------------------------------------------------ */

const FIG_DIR = "/research/cluttered-grasp";

export const flagshipResearch: FlagshipResearch = {
  slug: "cluttered-grasp-reasoning",
  href: FLAGSHIP_HREF,
  title: "Visual Relation Reasoning for Robotic Grasping in Cluttered Scenes",
  originalTitle: "基于视觉关系推理的杂乱场景抓取依赖图生成方法实现与应用",
  shortTitle: "Visual relation reasoning for cluttered grasping",
  type: "Bachelor's Thesis",
  institution: "Beijing Information Science and Technology University",
  institutionShort: "BISTU",
  period: { start: "02/2026", end: "06/2026" },

  summary:
    "Adapted the D3G framework (Deformable DETR + Graph Transformer Dense) for directed dependency-graph prediction on MetaGraspNetV2, and proposed and investigated an additional pairwise direction-constraint objective.",

  lead: "My bachelor’s thesis adapted the D3G framework to investigate visual dependency graph prediction in cluttered scenes. Building on its Deformable DETR detector and Graph Transformer Dense relation module, I proposed an additional pairwise direction-constraint objective and evaluated it on easy, medium and hard synthetic test scenes.",

  narrative: [
    "Object detection alone does not provide enough information for robotic manipulation in cluttered environments. A robot may recognise every object in a scene while still lacking an understanding of how those objects constrain one another.",
    "My bachelor’s thesis adapted the D3G framework — Deformable DETR object queries as graph nodes, a Graph Transformer Dense module for pairwise relations — to investigate visual dependency graph prediction, and I proposed an additional pairwise direction-constraint objective. The predicted directed graph is intended as a structured representation for downstream grasp-order planning.",
  ],

  // Thesis §1.1, §1.2
  problem: [
    "In stacked and cluttered scenes, objects occlude, touch and support one another. An object detector reports categories and bounding boxes, but not which objects constrain others — for example that an object lying on top must be removed before the one beneath it can be grasped. A wrong grasping order can make the grasp fail or disturb the rest of the scene.",
    "The thesis studies how a single RGB image can be turned into object detections together with a directed dependency graph, in which nodes are object instances and directed edges encode grasp-order constraints.",
  ],

  motivation:
    "Robots operating in cluttered environments need more than isolated object detection. They must understand relationships and dependencies between objects before selecting manipulation actions.",

  motivationDetail:
    "The direction of an edge carries its operational meaning: it tells the robot which of two objects has to be moved first. D3G already supervises every directed edge with binary cross-entropy; this thesis investigated whether an additional constraint that compares the two opposite edge scores of an object pair makes this order information more explicit.",

  // Work by others that the thesis builds on.
  priorWork: [
    {
      what: "The task formulation and D3GD benchmark on MetaGraspNetV2 (scene-based splits, difficulty levels), the graph-dense relation setting with its directed dense-graph BCE loss, the Graph Transformer Dense module, the training procedure and the evaluation code",
      ref: "d3g",
    },
    { what: "The Deformable DETR detector and its multi-scale deformable attention", ref: "deformable-detr" },
    { what: "Set-prediction detection with object queries and Hungarian matching", ref: "detr" },
    { what: "Graph Transformer models for learning on graphs", ref: "gtn" },
    { what: "The MetaGraspNetV2 dataset with object-relationship annotations", ref: "metagraspnetv2" },
  ],

  contributions: [
    "Set up the project on the D3G codebase with its Deformable DETR + Graph Transformer Dense configuration (100 object queries of 256-d as graph nodes) and adapted the model logic and training parameters to the locally available data and GPU memory.",
    "Conducted two Deformable DETR detection-pretraining runs of 60,000 iterations each and two graph-based relation-training runs of 50,000 iterations each.",
    "Proposed a pairwise direction-constraint objective that compares opposite directed-edge scores (Sᵢⱼ − Sⱼᵢ) for single-direction pairs, supplementing D3G’s directed BCE supervision; implemented it with AI-assisted coding and enabled it in a full training run.",
    "Evaluated both relation runs on the easy, medium and hard test splits and analysed the metrics, training curves and dependency-graph visualisations.",
  ],

  increment:
    "The part I proposed is the pairwise direction constraint — a relative supervision of the two opposite edge scores for single-direction pairs, added on top of D3G’s per-edge directed BCE. In the two training runs its effect was mixed (see Results).",

  highlights: [
    "Adapted the D3G framework — Deformable DETR object queries as nodes, a Graph Transformer Dense relation module — for directed dependency-graph prediction in cluttered scenes.",
    "Proposed and investigated a pairwise direction-constraint objective that compares opposite directed-edge scores, supplementing D3G’s directed BCE supervision.",
    "Ran two detection-pretraining runs (60,000 iterations each) and two relation-training runs (50,000 each), evaluated on easy, medium and hard synthetic test scenes.",
  ],

  evidence: [
    { label: "Data", value: "MetaGraspNetV2 synthetic — locally available subset, D3G scene splits" },
    { label: "Test splits", value: "easy · medium · hard" },
    { label: "Training", value: "2 × 60k detection-pretraining and 2 × 50k relation-training iterations" },
    { label: "Compared", value: "Graph-dense baseline run vs. later direction-constrained run" },
  ],

  outcome: "Score slightly higher on easy scenes (0.337 vs. 0.329), lower on medium and hard scenes.",

  creditLine:
    "Built on D3G (Rabino & Tommasi, 2025), Deformable DETR and MetaGraspNetV2 — the thesis page separates prior work from my own contributions.",

  cvBullets: [
    "Adapted the D3G framework (Rabino & Tommasi, 2025) — Deformable DETR detector, Graph Transformer Dense relation module — to predict directed object-dependency graphs in cluttered scenes on MetaGraspNetV2 synthetic data.",
    "Proposed and investigated a pairwise direction-constraint objective (BCE on Sᵢⱼ − Sⱼᵢ for single-direction pairs) that supplements D3G’s directed-edge BCE supervision.",
    "Conducted two detection-pretraining runs (60,000 iterations each) and two relation-training runs (50,000 each); compared a graph-dense baseline run with a later direction-constrained run on easy, medium and hard test scenes: slightly higher score on easy scenes, lower on medium and hard.",
  ],

  // Thesis §3.2–3.4 (Fig. 3-1)
  architecture: [
    {
      id: "image",
      label: "RGB image",
      detail: "Single image of a stacked, cluttered scene",
    },
    {
      id: "detector",
      label: "Object detection",
      method: "Deformable DETR",
      detail: "Multi-scale features (4 levels); class and box per query",
    },
    {
      id: "tokens",
      label: "Object queries",
      detail: "100 queries × 256-d, used as graph nodes",
    },
    {
      id: "graph-reasoning",
      label: "Relation reasoning",
      method: "Graph Transformer Dense",
      detail: "All Q × Q directed pairs; 2 layers / 2 heads",
    },
    {
      id: "dependency-graph",
      label: "Directed dependency graph",
      detail: "Edge scores S → thresholded adjacency matrix",
      badge: "+ pairwise direction loss",
    },
    {
      id: "manipulation",
      label: "Grasp-order planning",
      detail: "The downstream use the graph is intended for — not implemented or evaluated in the thesis",
    },
  ],

  // Thesis §3.3–3.5; D3G
  baselineMethod: [
    {
      title: "Object queries as nodes",
      body: "Deformable DETR outputs Q = 100 object queries with 256-d features. Each query predicts a class and a bounding box and is also used as a node feature for relation reasoning.",
    },
    {
      title: "Directed candidate edges",
      body: "Node features h⁰ = XWₕ and two projections ε₁ = XW₁, ε₂ = XW₂ are computed from the query features X. The edge feature from i to j concatenates ε₁ of i with ε₂ of j, so the two directions i → j and j → i receive different features.",
    },
    {
      title: "Graph Transformer Dense",
      body: "Stacked layers update node and edge features jointly; the edge features modulate the attention between node pairs. An edge classifier outputs a Q × Q score matrix S, where Sᵢⱼ scores a dependency from i to j. At inference, a sigmoid and a threshold give the binary directed adjacency matrix.",
    },
    {
      title: "Matching to ground truth",
      body: "Query order is arbitrary, so Hungarian matching assigns queries to ground-truth objects. A selection matrix T maps S to Ĝ = TᵀST, which has the same node order as the ground-truth graph.",
    },
    {
      title: "Directed dense-graph BCE",
      body: "Detection keeps the Deformable DETR losses (classification, L1 box and GIoU). The relation branch applies binary cross-entropy independently to every directed entry of the matched score matrix: for a ground-truth edge i → j, Sᵢⱼ has target 1 and Sⱼᵢ target 0. Direction is therefore already supervised — entry by entry.",
    },
  ],

  // Thesis §3.5
  direction: {
    gap: "Because each entry is supervised on its own, the dense-graph BCE never compares Sᵢⱼ and Sⱼᵢ with each other. For grasp planning, however, the relative order of the two directions is exactly what matters.",
    idea: "I proposed an additional pairwise direction-constraint objective that compares opposite directed-edge scores, supplementing the original directed BCE supervision in D3G.",
    supervises: {
      baseline: "Every directed entry Sᵢⱼ is trained towards its own target with binary cross-entropy, independently of the opposite entry Sⱼᵢ.",
      direction: "For object pairs with a single-direction dependency, the two opposite scores are compared: the score of the true direction should exceed that of the opposite one.",
    },
    rules: [
      "Consider each unordered pair of ground-truth objects {i, j}.",
      "Keep only pairs with exactly one directed dependency in the ground truth; pairs without a relation and bidirectional pairs are excluded.",
      "Compute the relative score dᵢⱼ = Sᵢⱼ − Sⱼᵢ.",
      "Use target yᵢⱼ = 1 if the ground truth is i → j and yᵢⱼ = 0 if it is j → i, and apply binary cross-entropy to the logit difference.",
    ],
    formula: [
      "dᵢⱼ = Sᵢⱼ − Sⱼᵢ",
      "L_direction = BCEWithLogits(dᵢⱼ, yᵢⱼ)   (single-direction pairs only)",
    ],
    objective: "L_total = L_detection + λ_g · L_relation + λ_d · L_direction",
    weights: [
      { label: "λ_g (dense-graph BCE)", value: "0.3" },
      { label: "λ_d (direction)", value: "0.2" },
    ],
  },

  // Thesis §5.2
  scope:
    "Implemented and evaluated: RGB image → object detection → graph relation reasoning → directed dependency graph, evaluated offline on MetaGraspNetV2 synthetic test scenes. Not part of the thesis: a grasp-order planner or grasp execution on a robot arm; the dependency graph is intended as a structured representation for that downstream step.",

  // Thesis §4.1–4.3, Table 4-1; D3G paper §III, Table I; training logs
  setup: {
    data: [
      {
        title: "D3G benchmark protocol",
        body: "The D3G paper describes a scene-level split of its benchmark into training, validation and test scenes, reporting an 80:10:10 proportion, and assigns difficulty levels by object count, clutter width and clutter depth. Clutter depth is the longest of the shortest leaf-to-root paths in a scene’s dependency graph; clutter width is its largest connected component.",
      },
      {
        title: "Data used in this thesis",
        body: "The experiments followed the scene-based dataset partitions and difficulty labels provided by D3G, using locally available subsets of MetaGraspNetV2 synthetic data because of storage and time constraints. Each sample has one RGB image, object categories, bounding boxes and a dependency graph stored as a directed adjacency matrix. Both relation runs were evaluated on the same 10,249 locally available test images.",
      },
    ],
    splits: [
      {
        split: "easy",
        criteria: "≥ 3 objects · clutter depth ≥ 1",
        definition: "Fewer objects and occlusions; objects are easier to detect and separate.",
      },
      {
        split: "medium",
        criteria: "≥ 6 objects · relative clutter width > 0.4 · clutter depth ≥ 3",
        definition: "More objects, more occlusion and contact.",
      },
      {
        split: "hard",
        criteria: "≥ 10 objects · relative clutter width > 0.5 · clutter depth ≥ 4",
        definition: "Complex stacking with heavy mutual occlusion and many dependency edges.",
      },
    ],
    splitsNote:
      "Thresholds from Table I of the D3G paper; the conditions of a level apply jointly, and relative clutter width is normalised by the number of objects. Splits and difficulty labels are read from D3G’s split and scene-metadata files.",
    runs: [
      { date: "2026-04-25", run: "Detection pretraining 1 (Deformable DETR)", iterations: "60,000" },
      { date: "2026-04-30", run: "Detection pretraining 2 (Deformable DETR)", iterations: "60,000" },
      { date: "2026-05-01", run: "Relation training — graph-dense baseline", iterations: "50,000" },
      { date: "2026-05-04", run: "Relation training — graph-dense + direction constraint", iterations: "50,000" },
    ],
    runsNote: "All four runs are documented by training logs, checkpoints and output files.",
    config: [
      { label: "Detection backbone", value: "Deformable DETR" },
      { label: "Relation module", value: "Graph Transformer Dense" },
      { label: "Graph representation", value: "Dense graph (all query pairs)" },
      { label: "Object queries", value: "100" },
      { label: "Hidden dimension", value: "256" },
      { label: "Multi-scale feature levels", value: "4" },
      { label: "Graph layers / heads", value: "2 / 2" },
      { label: "Batch size", value: "4" },
      { label: "Base learning rate", value: "5 × 10⁻⁵" },
      { label: "Max iterations", value: "50,000" },
      { label: "Optimizer", value: "AdamW" },
      { label: "Mixed precision (AMP)", value: "Off" },
      { label: "Augmentation preset", value: "v3 (project config)" },
      { label: "Loss weights (direction run)", value: "λ_g = 0.3 · λ_d = 0.2" },
      { label: "Frameworks", value: "PyTorch, Detectron2, Deformable DETR, torch-geometric" },
      { label: "Hardware", value: "CUDA GPU" },
    ],
    configNote:
      "Configuration values of the direction-constrained run (4 May 2026). Its training log records the learning-rate schedule (base 5 × 10⁻⁵), the 50,000 iterations and the additional direction-loss term; the remaining entries are configuration values. The baseline run’s log records the same learning-rate schedule and iteration count; its other settings are not claimed to be identical. Compared with the initial configuration, batch size and learning rate were reduced and AMP was disabled to lower GPU-memory pressure and numerical fluctuation.",
  },

  // Thesis §4.4; D3G metrics/oi_eval.py
  evaluation: {
    intro:
      "The relation branch is evaluated with seven metrics. Names and definitions follow Section 4.4 of the thesis.",
    relationMetrics: [
      {
        abbr: "OP",
        name: "Overall relation precision",
        description: "Share of all predicted relations that are correct.",
      },
      {
        abbr: "OR",
        name: "Overall relation recall",
        description: "Share of ground-truth relations that the model recovers.",
      },
      {
        abbr: "IA",
        name: "Image-level complete accuracy",
        description:
          "Whether all dependency relations in a single image are predicted completely and correctly — the strictest of the three.",
      },
      {
        abbr: "w_rel_mAP",
        name: "Weighted relation mAP",
        description:
          "Relation-detection view of the predicted edges: an edge only counts if the related objects’ boxes and categories also match, so it reflects detection and relation reasoning jointly.",
      },
      {
        abbr: "w_phr_mAP",
        name: "Weighted phrase mAP",
        description:
          "Evaluated in the same relation-detection setting as w_rel_mAP, likewise requiring matching object boxes and categories.",
      },
      {
        abbr: "microR@50",
        name: "Micro-averaged recall @50",
        description:
          "Micro-averaged recall within the top-50 predictions — how well true relations are covered under a limited candidate budget.",
      },
      {
        abbr: "score",
        name: "Composite score",
        description: "Weighted combination of the three relation-detection metrics, defined below.",
      },
    ],
    scoreFormula: "score = 0.4 × w_rel_mAP + 0.4 × w_phr_mAP + 0.2 × microR@50",
    scoreNote:
      "The composite score is computed by the original D3G evaluation code (metrics/oi_eval.py); it was not introduced in this thesis, and its weights are unchanged.",
    detectionNote:
      "The detection branch is measured with mAP, mAP50 and mAP75; the comparison reported in the thesis (Table 4-2) covers the relation metrics above.",
  },

  // Thesis Table 4-2 — complete, both runs, all splits. Values unchanged.
  results: {
    source: "Thesis Table 4-2 · test splits of the locally available MetaGraspNetV2 synthetic data · 50,000 training iterations per run",
    models: [
      {
        id: "baseline",
        name: "Graph-dense D3G-Deformable baseline",
        description: "Relation run without the additional direction loss (1 May 2026).",
      },
      {
        id: "direction",
        name: "Direction-constrained D3G-Deformable",
        description: "Later relation run incorporating the pairwise direction constraint (4 May 2026).",
      },
    ],
    rows: [
      { model: "baseline", split: "easy", OP: 0.652, OR: 0.635, IA: 0.162, wRel: 0.26, wPhr: 0.31, microR50: 0.506, score: 0.329 },
      { model: "baseline", split: "medium", OP: 0.511, OR: 0.374, IA: 0.0, wRel: 0.12, wPhr: 0.182, microR50: 0.284, score: 0.177 },
      { model: "baseline", split: "hard", OP: 0.624, OR: 0.123, IA: 0.0, wRel: 0.032, wPhr: 0.046, microR50: 0.079, score: 0.047 },
      { model: "direction", split: "easy", OP: 0.638, OR: 0.615, IA: 0.156, wRel: 0.269, wPhr: 0.313, microR50: 0.523, score: 0.337 },
      { model: "direction", split: "medium", OP: 0.525, OR: 0.338, IA: 0.0, wRel: 0.094, wPhr: 0.141, microR50: 0.224, score: 0.139 },
      { model: "direction", split: "hard", OP: 0.661, OR: 0.107, IA: 0.0, wRel: 0.025, wPhr: 0.035, microR50: 0.059, score: 0.036 },
    ],
    comparisonNote:
      "Two experimental runs were evaluated: a graph-dense baseline without the additional direction loss, and a later run incorporating the pairwise direction constraint. Each configuration was trained once, so the comparison is indicative rather than a controlled ablation.",
    summary: [
      "On easy scenes, w_rel_mAP (0.260 → 0.269), w_phr_mAP (0.310 → 0.313), microR@50 (0.506 → 0.523) and the score (0.329 → 0.337) increased slightly, while OP, OR and IA were slightly lower. On medium and hard scenes, OP was higher (0.511 → 0.525 and 0.624 → 0.661), but OR, w_rel_mAP, w_phr_mAP, microR@50 and the score were lower (score 0.177 → 0.139 and 0.047 → 0.036).",
      "For both runs, performance falls sharply from easy to hard scenes: OR drops from 0.635 to 0.123 for the baseline and from 0.615 to 0.107 for the direction-constrained run, and IA is 0.000 on medium and hard scenes.",
      "Compared with the baseline run, the direction-constrained run scored slightly higher on easy scenes (0.337 vs. 0.329) and lower on medium (0.139 vs. 0.177) and hard scenes (0.036 vs. 0.047). Because of storage and time constraints, the experiments used only part of the original dataset; this limited data coverage may have affected generalisation to more complex scenes, but its effect was not tested.",
    ],
  },

  // Thesis §4.6, Figs. 4-1 to 4-3; final losses from the training logs
  training: {
    points: [
      "Both relation runs trained for 50,000 iterations and converged stably; their total-loss curves have the same shape.",
      "The direction-constrained run’s total loss stays slightly higher (final ≈ 2.79 vs. ≈ 2.58); its total includes the additional direction term.",
      "The direction loss decreases steadily over training, and the dense-graph BCE and detection losses follow a similar course in both runs.",
    ],
    caveat:
      "Training loss describes optimisation, not test performance. The baseline’s lower final loss does not make it the better model, and a decreasing direction loss does not by itself show better dependency prediction.",
  },

  // Image 35676 = MetaGraspNetV2 synthetic scene 3491, view 8 (test split,
  // difficulty 1), verified against sample_metadata.json and the
  // dependency_graphs/35676.png outputs of both relation runs.
  figures: {
    inputScene: {
      id: "input-scene",
      src: `${FIG_DIR}/input-scene.jpg`,
      width: 432,
      height: 432,
      alt: "Test image 35676 from MetaGraspNetV2 synthetic data: a green bin with two yellow squeeze bottles, a green block and screwdrivers lying on and against each other.",
      source: "Thesis Fig. 4-6",
      caption: "Input: test image 35676 (MetaGraspNetV2 synthetic scene 3491, view 8, easy split)",
    },
    baselineGraph: {
      id: "baseline-graph",
      src: `${FIG_DIR}/dependency-graph-baseline.jpg`,
      width: 819,
      height: 642,
      alt: "Dependency graph predicted by the baseline run for image 35676: many blue nodes arranged in a ring with dense black directed edges concentrated around a few central nodes.",
      source: "Thesis Fig. 4-4",
      caption: "Baseline run (1 May 2026), image 35676",
    },
    directionGraph: {
      id: "direction-graph",
      src: `${FIG_DIR}/dependency-graph-direction-constrained.jpg`,
      width: 564,
      height: 443,
      alt: "Dependency graph predicted by the direction-constrained run for the same image: blue nodes in a ring with dense directed edges spread more widely between peripheral and central nodes.",
      source: "Thesis Fig. 4-5",
      caption: "Direction-constrained run (4 May 2026), image 35676",
    },
    totalLoss: {
      id: "total-loss",
      src: `${FIG_DIR}/training-total-loss.jpg`,
      width: 988,
      height: 576,
      alt: "Total training loss of the two relation runs over 50,000 iterations: both fall steeply in the first few thousand iterations and level off, with the direction-constrained run slightly higher throughout.",
      source: "Thesis Fig. 4-1",
      caption:
        "Total training loss of the two relation runs. Legend labels come from the training logs: “Reproduction” is the baseline run (1 May), “Improved” the direction-constrained run (4 May); the labels do not refer to test performance.",
    },
    relationLosses: {
      id: "relation-losses",
      src: `${FIG_DIR}/training-relation-direction-loss.jpg`,
      width: 1298,
      height: 519,
      alt: "Left: dense-graph BCE loss for both runs, nearly identical and decreasing. Right: direction loss of the direction-constrained run, decreasing from about 0.13 to about 0.03.",
      source: "Thesis Fig. 4-3",
      caption: "Dense-graph BCE loss (both runs) and direction loss (direction-constrained run only).",
    },
  },

  // Thesis §4.7
  qualitative: {
    legend: [
      "Blue nodes — predicted candidate objects, labelled “query index : predicted class ID” (not a confidence score).",
      "Black directed edges — predicted dependencies.",
      "Arrow direction — the inferred grasp-order constraint.",
    ],
    observation:
      "On this image, the baseline’s edges concentrate around a few central nodes, while the direction-constrained run’s edges are spread more widely, with more directed connections between peripheral and central nodes.",
    caveat:
      "Both graphs are drawn from raw model output without strict confidence filtering, so they are dense and include many low-confidence candidates. They are meant for comparing graph structure qualitatively — more edges does not mean better predictions.",
  },

  findings: [
    "The adapted D3G pipeline (Deformable DETR + Graph Transformer Dense) produced object detections and directed dependency graphs from single RGB images of cluttered scenes.",
    "With the additional direction loss, training remained stable and the direction loss decreased steadily.",
    "Compared with the baseline run, the direction-constrained run scored slightly higher on easy scenes (0.337 vs. 0.329) and lower on medium (0.139 vs. 0.177) and hard (0.036 vs. 0.047) scenes.",
    "Performance of both runs drops sharply from easy to hard scenes; IA is 0.000 on medium and hard scenes.",
  ],

  limitations: [
    "Relation prediction depends on detection: a missed or badly localised object takes its dependency edges with it.",
    "RGB only — no depth, although occlusion, contact and support are largely three-dimensional relations.",
    "Dense prediction over all query pairs yields many false-positive edges; confidence calibration, filtering and graph sparsification are not yet applied.",
    "A locally available subset of MetaGraspNetV2 and one training run per configuration — the comparison is not a controlled ablation.",
    "Offline evaluation on dataset images only; the effect on grasp success has not been tested on a real robot.",
  ],

  technologies: [
    "PyTorch",
    "Detectron2",
    "Deformable DETR",
    "Graph Transformer Dense",
    "torch-geometric",
    "MetaGraspNetV2",
  ],

  futureIntro:
    "The thesis ends at a directed dependency graph evaluated offline on synthetic images. These directions follow from its limitations (thesis §5.2) — none of them is completed work:",

  future: [
    {
      title: "RGB-D and 3D geometry",
      body: "Fusing depth with colour to judge occlusion, contact and support — a direction the thesis names explicitly, and the reason for my interest in 3D perception and object pose estimation.",
    },
    {
      title: "Cleaner, calibrated graphs",
      body: "Relation-confidence calibration, detection-confidence filtering and graph sparsification, so that the output is a compact graph a planner can use.",
    },
    {
      title: "Closed-loop robot experiments",
      body: "Connecting the predicted graph to a grasp-order planner on a real robot arm and measuring grasp success rate, scene clearing rate, number of grasps and failure recovery.",
    },
    {
      title: "Stronger object nodes",
      body: "Better detection backbones, pretraining or instance segmentation — relation errors follow detection errors.",
    },
  ],

  // Thesis bibliography entries [3], [4], [9], [10], [18].
  references: [
    {
      id: "d3g",
      authors: "Rabino P, Tommasi T.",
      title: "A Modern Take on Visual Relationship Reasoning for Grasp Planning",
      venue: "IEEE Robotics and Automation Letters",
      year: 2025,
      details: "10(2): 1712–1719",
      code: "https://github.com/paolotron/D3G",
      usedFor:
        "Task formulation, D3GD benchmark (scene splits, difficulty levels), graph-dense relation setting with directed BCE, Graph Transformer Dense module, training procedure and evaluation code — the framework this thesis adapts",
    },
    {
      id: "metagraspnetv2",
      authors: "Gilles M, Chen Y, Zeng E Z, et al.",
      title:
        "MetaGraspNetV2: All-in-One Dataset Enabling Fast and Reliable Robotic Bin Picking via Object Relationship Reasoning and Dexterous Grasping",
      venue: "IEEE Transactions on Automation Science and Engineering",
      year: 2024,
      details: "21(3): 2302–2320",
      usedFor: "Dataset (synthetic part) with object-relationship annotations",
    },
    {
      id: "deformable-detr",
      authors: "Zhu X, Su W, Lu L, et al.",
      title: "Deformable DETR: Deformable Transformers for End-to-End Object Detection",
      venue: "International Conference on Learning Representations (ICLR)",
      year: 2021,
      usedFor: "Detection backbone with multi-scale deformable attention",
    },
    {
      id: "detr",
      authors: "Carion N, Massa F, Synnaeve G, et al.",
      title: "End-to-End Object Detection with Transformers",
      venue: "European Conference on Computer Vision (ECCV)",
      year: 2020,
      details: "pp. 213–229",
      usedFor: "Set-prediction detection, object queries and Hungarian matching",
    },
    {
      id: "gtn",
      authors: "Yun S, Jeong M, Kim R, et al.",
      title: "Graph Transformer Networks",
      venue: "Advances in Neural Information Processing Systems (NeurIPS)",
      year: 2019,
      details: "pp. 11983–11993",
      usedFor: "Graph Transformer formulation cited for the relation module",
    },
  ],
};

/** "RGB image → Object detection (Deformable DETR) → …" — thesis stages only. */
export function architectureChain(): string {
  return flagshipResearch.architecture
    .filter((stage) => stage.id !== "manipulation")
    .map((stage) => (stage.method ? `${stage.label} (${stage.method})` : stage.label))
    .join(" → ");
}

export const THESIS_SPLITS: ThesisSplit[] = ["easy", "medium", "hard"];

export const THESIS_METRIC_COLUMNS: { key: ThesisMetricKey; label: string }[] = [
  { key: "OP", label: "OP" },
  { key: "OR", label: "OR" },
  { key: "IA", label: "IA" },
  { key: "wRel", label: "w_rel" },
  { key: "wPhr", label: "w_phr" },
  { key: "microR50", label: "microR@50" },
  { key: "score", label: "score" },
];

/** Per split: which metrics are higher / lower / equal with the direction constraint. */
export function compareThesisModels(split: ThesisSplit) {
  const rows = flagshipResearch.results.rows;
  const base = rows.find((row) => row.model === "baseline" && row.split === split);
  const dir = rows.find((row) => row.model === "direction" && row.split === split);
  const higher: string[] = [];
  const lower: string[] = [];
  const equal: string[] = [];
  if (base && dir) {
    for (const { key, label } of THESIS_METRIC_COLUMNS) {
      if (dir[key] > base[key]) higher.push(label);
      else if (dir[key] < base[key]) lower.push(label);
      else equal.push(label);
    }
  }
  return { higher, lower, equal };
}
