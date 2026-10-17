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
      "Localise and classify every object instance. In my thesis this stage is a Deformable DETR detector whose object queries also serve as the graph nodes.",
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
      "Objects become nodes and grasp-order dependencies become directed edges. My thesis added a loss that supervises the direction of these edges explicitly.",
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
/* Source of truth: the final thesis PDF (BISTU, School of Automation, */
/* 23 Feb – 14 Jun 2026). Section / table / figure numbers in the     */
/* comments refer to that document. Do not add details it does not    */
/* contain.                                                           */
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
    "Reproduced the graph-dense dependency-graph pipeline of D3G with Deformable DETR and Graph Transformer Dense on MetaGraspNetV2, and added a direction-constraint loss for directed dependency edges.",

  lead: "My bachelor’s thesis reproduced the graph-dense relation reasoning pipeline of D3G — a Deformable DETR detector with a Graph Transformer Dense relation module — on MetaGraspNetV2, and added a direction-constraint loss that explicitly supervises the orientation of dependency edges. Both models were compared on easy, medium and hard synthetic test scenes.",

  narrative: [
    "Object detection alone does not provide enough information for robotic manipulation in cluttered environments. A robot may recognise every object in a scene while still lacking an understanding of how those objects constrain one another.",
    "My bachelor’s thesis reproduced D3G’s graph-dense relation reasoning pipeline — Deformable DETR object queries as graph nodes, a Graph Transformer Dense module for pairwise relations — and added a direction-constraint loss for the orientation of dependency edges. The resulting directed dependency graph is intended as a structured representation for downstream grasp-order planning.",
  ],

  // §1.1, §1.2
  problem: [
    "In stacked and cluttered scenes, objects occlude, touch and support one another. An object detector reports categories and bounding boxes, but not which objects constrain others — for example that an object lying on top must be removed before the one beneath it can be grasped. A wrong grasping order can make the grasp fail or disturb the rest of the scene.",
    "The thesis studies how a single RGB image can be turned into object detections together with a directed dependency graph, in which nodes are object instances and directed edges encode grasp-order constraints.",
  ],

  motivation:
    "Robots operating in cluttered environments need more than isolated object detection. They must understand relationships and dependencies between objects before selecting manipulation actions.",

  // §1.2, §2.3, §3.5
  motivationDetail:
    "The direction of an edge carries its operational meaning: if A covers B, A has to be grasped first. A relation loss that only asks whether an edge exists does not directly teach the model which way it points — the gap the direction constraint in this thesis addresses.",

  // §1.1, §2.4, §4.2, §4.3 — work by others that the thesis builds on.
  priorWork: [
    {
      what: "Task formulation on MetaGraspNetV2, the data splits, the graph-dense relation setting, the Graph Transformer Dense module and the two-stage training scheme",
      ref: "d3g",
    },
    { what: "The Deformable DETR detector and its multi-scale deformable attention", ref: "deformable-detr" },
    { what: "Set-prediction detection with object queries and Hungarian matching", ref: "detr" },
    { what: "Graph Transformer models for learning on graphs", ref: "gtn" },
    { what: "The MetaGraspNetV2 dataset with object-relationship annotations", ref: "metagraspnetv2" },
  ],

  // §1.4, §2.4, §4.3, §5.1
  contributions: [
    "Reproduced D3G’s graph-dense relation prediction pipeline with Deformable DETR as the detection backbone, using its 100 object queries (256-d) as node features for the Graph Transformer Dense module.",
    "Ran the two-stage training: detection pretraining of Deformable DETR on MetaGraspNetV2, then joint detection and relation training for 50,000 iterations. Reduced batch size and learning rate and disabled mixed precision so that graph-dense training ran stably within the available GPU memory.",
    "Added a direction-constraint loss on top of the dense-graph BCE relation loss: for ground-truth single-direction pairs, the score difference Sᵢⱼ − Sⱼᵢ is supervised with binary cross-entropy (loss weights: direction 0.2, dense-graph BCE 0.3).",
    "Evaluated the baseline and the direction-constrained model on the easy, medium and hard MetaGraspNetV2 synthetic test splits, and analysed training curves and dependency-graph visualisations.",
  ],

  increment:
    "The part that is new in this thesis is the direction-constraint loss — explicit supervision of edge orientation for single-direction dependency pairs. Its quantitative effect was mixed (see Results).",

  highlights: [
    "Reproduced D3G’s graph-dense relation pipeline: Deformable DETR object queries as nodes, a Graph Transformer Dense relation module, detection pretraining followed by joint relation training.",
    "Added a direction-constraint loss that supervises the orientation of single-direction dependency edges.",
    "Compared baseline and direction-constrained models on the easy, medium and hard MetaGraspNetV2 synthetic test splits — the results are mixed.",
  ],

  evidence: [
    { label: "Data", value: "MetaGraspNetV2 synthetic" },
    { label: "Test splits", value: "easy · medium · hard" },
    { label: "Compared", value: "Graph-dense baseline vs. direction-constrained model" },
    { label: "Training", value: "50,000 iterations per model" },
  ],

  outcome: "Mixed — gains on several easy-split metrics, no consistent overall improvement.",

  creditLine:
    "Built on D3G (Rabino & Tommasi, 2025), Deformable DETR and MetaGraspNetV2 — the thesis page separates prior work from my own changes.",

  cvBullets: [
    "Reproduced the graph-dense relation reasoning pipeline of D3G (Rabino & Tommasi, 2025) with a Deformable DETR detector and a Graph Transformer Dense relation module; two-stage training (detection pretraining, then joint detection and relation training for 50,000 iterations).",
    "Introduced an explicit direction-constraint objective for single-direction dependency pairs (BCE on Sᵢⱼ − Sⱼᵢ, weight 0.2) alongside the dense-graph BCE relation loss (weight 0.3).",
    "Evaluated it against the graph-dense baseline across the easy, medium and hard MetaGraspNetV2 synthetic test splits (OP, OR, IA, w_rel_mAP, w_phr_mAP, microR@50, score): mixed results, with gains on several easy-split metrics but no consistent overall improvement. Analysed training curves and dependency-graph visualisations.",
  ],

  // §3.2, §3.3, §3.4 (Fig. 3-1)
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
      badge: "+ direction loss",
    },
    {
      id: "manipulation",
      label: "Grasp-order planning",
      detail: "The downstream use the graph is intended for — not implemented or evaluated in the thesis",
    },
  ],

  // §3.3, §3.4, §3.5
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
      title: "Baseline losses",
      body: "Detection keeps the Deformable DETR losses (classification, L1 box and GIoU). The relation branch uses a dense-graph binary cross-entropy on every directed entry, supervising whether each edge exists.",
    },
  ],

  // §3.5
  direction: {
    gap: "The dense-graph BCE scores Sᵢⱼ and Sⱼᵢ as two separate entries. It teaches the model whether an edge exists, but it does not directly ask which of the two directions is correct — and for grasp planning the direction is what matters.",
    idea: "For object pairs whose ground truth has a dependency in exactly one direction, the direction loss compares the two opposite scores and supervises which direction is correct.",
    supervises: {
      baseline: "Every directed entry Sᵢⱼ on its own: does an edge from i to j exist?",
      direction: "Single-direction pairs only: given that i and j are dependent, which way does the edge point?",
    },
    rules: [
      "Consider each unordered pair of ground-truth objects {i, j}.",
      "Keep only pairs with a single-direction dependency in the ground truth; pairs without a relation and abnormal bidirectional pairs are excluded so that they do not interfere with direction learning.",
      "Use the difference Sᵢⱼ − Sⱼᵢ as the direction prediction.",
      "Target 1 if the ground truth is i → j, target 0 if it is j → i; supervise with binary cross-entropy.",
    ],
    objective: "L_total = L_detection + λ_g · L_relation + λ_d · L_direction",
    weights: [
      { label: "λ_g (dense-graph BCE)", value: "0.3" },
      { label: "λ_d (direction)", value: "0.2" },
    ],
  },

  // §5.2
  scope:
    "Implemented and evaluated in the thesis: RGB image → object detection → graph relation reasoning → directed dependency graph, evaluated offline on MetaGraspNetV2 synthetic test scenes. Not part of the thesis: a grasp-order planner and grasp execution on a robot arm. The dependency graph is intended as a structured representation for that downstream step.",

  // §4.1–4.3, Table 4-1
  setup: {
    data: [
      {
        title: "MetaGraspNetV2 synthetic",
        body: "Synthetic part of MetaGraspNetV2 (MGN-Sim), with the data split provided by the D3G project. Each sample has one RGB image, object categories, bounding boxes and a dependency graph stored as a directed adjacency matrix (row i, column j: dependency from i to j).",
      },
      {
        title: "Why synthetic data",
        body: "Simulation provides complete, consistent relation labels at scale; annotating occlusion, support and order dependencies in real images is expensive.",
      },
    ],
    splits: [
      { split: "easy", definition: "Difficulty tag 1 — fewer occlusions; objects easier to detect and separate." },
      { split: "medium", definition: "Difficulty tag 2 — more objects, more occlusion and contact." },
      { split: "hard", definition: "Difficulty tag 3 — complex stacking, heavy mutual occlusion, more dependency edges." },
    ],
    training: [
      {
        title: "Stage 1 · Detection pretraining",
        body: "Deformable DETR is trained for detection on MetaGraspNetV2 (classification, L1 box and GIoU losses), so that its object queries adapt to the categories, scales and occlusions of stacked scenes.",
      },
      {
        title: "Stage 2 · Relation training",
        body: "GraphDeformable DETR is initialised from the stage-1 weights, the Graph Transformer Dense branch is added, and detection and relation prediction are optimised jointly.",
      },
    ],
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
      { label: "Dense-graph BCE loss weight", value: "0.3" },
      { label: "Direction loss weight", value: "0.2" },
      { label: "Implementation", value: "PyTorch, Detectron2, Deformable DETR, torch-geometric; CUDA GPU" },
    ],
    configNote:
      "Compared with the initial configuration, batch size and learning rate were reduced and AMP was disabled to lower GPU-memory pressure and numerical fluctuation. Relation training starts from the detection-pretrained Deformable DETR weights.",
  },

  // §4.4
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
        name: "Score",
        description: "Overall score recorded in the experiment logs, used to compare settings.",
      },
    ],
    detectionNote:
      "The detection branch is measured with mAP, mAP50 and mAP75; the model comparison reported in the thesis (Table 4-2) covers the relation metrics above.",
  },

  // Table 4-2 — complete, both models, all splits.
  results: {
    source: "Thesis Table 4-2 · MetaGraspNetV2 synthetic test splits · 50,000 training iterations per model",
    models: [
      {
        id: "baseline",
        name: "Graph-dense D3G-Deformable (baseline)",
        description: "Reproduction of D3G’s graph-dense setting; dense-graph BCE relation loss only.",
      },
      {
        id: "direction",
        name: "Direction-constrained D3G-Deformable",
        description: "Same model and training, plus the direction-constraint loss.",
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
    summary: [
      "The direction constraint produced mixed quantitative results. On the easy split it raised w_rel (0.260 → 0.269), w_phr (0.310 → 0.313), microR@50 (0.506 → 0.523) and score (0.329 → 0.337), while OP, OR and IA decreased slightly. On the medium and hard splits it raised OP (0.511 → 0.525 and 0.624 → 0.661), but OR, w_rel, w_phr, microR@50 and score decreased.",
      "Both models degrade sharply with scene difficulty: OR falls from 0.635 (easy) to 0.123 (hard) for the baseline and from 0.615 to 0.107 with the direction constraint, and IA is 0.000 on the medium and hard splits for both.",
      "The experiments therefore support the feasibility of explicitly optimising directed dependency information, but do not establish a consistent overall improvement over the baseline.",
    ],
  },

  // §4.6, Figs. 4-1 to 4-3
  training: {
    points: [
      "Both models were trained for 50,000 iterations and converged stably; their total-loss curves have the same shape.",
      "The direction-constrained model’s total loss stays slightly higher (final ≈ 2.79 vs. ≈ 2.58 for the baseline), as expected from the additional loss term.",
      "The direction loss itself decreases steadily, while the dense-graph BCE and detection losses follow nearly the same course in both runs — the added term did not destabilise graph-dense training.",
    ],
    caveat:
      "Training loss describes optimisation, not test performance. The baseline’s lower final loss does not make it the better model, and a decreasing direction loss does not by itself show better dependency prediction — test performance is in the results table.",
  },

  figures: {
    inputScene: {
      id: "input-scene",
      src: `${FIG_DIR}/input-scene.jpg`,
      width: 432,
      height: 432,
      alt: "Synthetic MetaGraspNetV2 test scene: a green bin with two yellow squeeze bottles, a green block and two screwdrivers lying on and against each other.",
      source: "Thesis Fig. 4-6",
      caption: "Input image (MetaGraspNetV2 synthetic test scene)",
    },
    baselineGraph: {
      id: "baseline-graph",
      src: `${FIG_DIR}/dependency-graph-baseline.jpg`,
      width: 819,
      height: 642,
      alt: "Predicted dependency graph of the baseline model for the input image: many blue nodes arranged in a ring with dense black directed edges concentrated around a few central nodes.",
      source: "Thesis Fig. 4-4",
      caption: "Graph-dense baseline",
    },
    directionGraph: {
      id: "direction-graph",
      src: `${FIG_DIR}/dependency-graph-direction-constrained.jpg`,
      width: 564,
      height: 443,
      alt: "Predicted dependency graph of the direction-constrained model for the same image: blue nodes in a ring with dense directed edges spread more widely between peripheral and central nodes.",
      source: "Thesis Fig. 4-5",
      caption: "Direction-constrained model",
    },
    totalLoss: {
      id: "total-loss",
      src: `${FIG_DIR}/training-total-loss.jpg`,
      width: 988,
      height: 576,
      alt: "Training total loss over 50,000 iterations for both runs: both fall steeply in the first few thousand iterations and level off, with the direction-constrained run slightly higher throughout.",
      source: "Thesis Fig. 4-1",
      caption:
        "Total training loss. Legend labels come from the training logs: “Reproduction” is the baseline, “Improved” the direction-constrained run — the label does not refer to test performance.",
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

  // §4.7
  qualitative: {
    legend: [
      "Blue nodes — predicted candidate objects, labelled “query index : predicted class ID” (not a confidence score).",
      "Black directed edges — predicted dependencies.",
      "Arrow direction — the inferred grasp-order constraint.",
    ],
    observation:
      "On this image, the baseline’s edges concentrate around a few central nodes, while the direction-constrained model’s edges are spread more widely, with more directed connections between peripheral and central nodes.",
    caveat:
      "Both graphs are drawn from raw model output without strict confidence filtering, so they are dense and include many low-confidence candidates. They are meant for comparing graph structure qualitatively — more edges does not mean better predictions.",
  },

  // §4.5–4.7, §5.1
  findings: [
    "The reproduced Deformable DETR + Graph Transformer Dense pipeline produces object detections and a directed dependency graph from a single RGB image of a cluttered scene.",
    "The direction-constraint loss can be optimised alongside the detection and dense-graph losses without destabilising training.",
    "Quantitatively, the direction constraint gives mixed results and no consistent improvement over the baseline.",
    "Both models degrade strongly from easy to hard scenes; IA is 0.000 on the medium and hard splits.",
  ],

  // §5.2
  limitations: [
    "Relation prediction depends on detection: a missed or badly localised object takes its dependency edges with it.",
    "RGB only — no depth, although occlusion, contact and support are largely three-dimensional relations.",
    "Dense prediction over all query pairs yields many false-positive edges; confidence calibration, filtering and graph sparsification are not yet applied.",
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
      usedFor:
        "Task formulation, data splits, graph-dense relation setting, Graph Transformer Dense module and two-stage training — the pipeline this thesis reproduces",
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
