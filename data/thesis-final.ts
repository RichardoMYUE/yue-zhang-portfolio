export const thesisFinal = {
  period: { start: "02/2026", end: "06/2026" },
  summary: [
    "Reproduced and extended the D3G graph-dense visual relation reasoning workflow for object dependency prediction in cluttered robotic grasping scenes.",
    "Used Deformable DETR and Graph Transformer Dense on MetaGraspNetV2, then added a direction-constraint loss to supervise directed dependency edges explicitly.",
  ],
  lead:
    "My bachelor’s thesis studied directed dependency-graph prediction for cluttered grasping scenes. I reproduced the D3G graph-dense pipeline and added explicit direction supervision for dependency edges.",
  narrative: [
    "Object detection alone does not tell a robot how objects constrain one another in a cluttered scene.",
    "Building on D3G, the thesis uses Deformable DETR object queries with Graph Transformer Dense to predict directed grasp-order dependencies between objects.",
  ],
  motivation:
    "Robots operating in cluttered environments need more than isolated object detection. They need a structured description of which objects occlude, support or constrain others before a grasp order can be planned.",
  motivationDetail:
    "The thesis predicts this directed dependency representation from RGB images. Grasp planning and physical robot execution remain future work.",
  problem: [
    "In densely stacked scenes, object categories and locations alone are not enough to decide which object should be handled first.",
    "The thesis therefore treats grasp-order dependency prediction as a visual relation reasoning problem: given an RGB image, predict object instances and a directed graph of operation-order constraints.",
  ],
  contributions: [
    "Reproduced the D3G graph-dense workflow with Deformable DETR and Graph Transformer Dense on MetaGraspNetV2.",
    "Implemented two-stage training: detection pretraining followed by joint detection and dependency-relation training.",
    "Added a direction-constraint loss for singly directed ground-truth object pairs, explicitly supervising i→j versus j→i (λg = 0.3, λd = 0.2).",
    "Compared the baseline and direction-constrained models on easy, medium and hard splits using relation metrics, training curves and dependency-graph visualisations.",
  ],
  architecture: [
    { id: "image", label: "Visual scene", detail: "RGB cluttered scene" },
    { id: "detector", label: "Object detection", method: "Deformable DETR", detail: "ResNet-50 and object queries" },
    { id: "tokens", label: "Object representations", detail: "Object-query features as graph nodes" },
    { id: "graph-reasoning", label: "Relation reasoning", method: "Graph Transformer Dense", detail: "Dense pairwise relation modelling" },
    { id: "dependency-graph", label: "Directed dependency graph", detail: "Q×Q directed relation matrix" },
    { id: "manipulation", label: "Manipulation-oriented scene understanding", detail: "Structured grasp-order dependencies for downstream planning" },
  ],
  method: [
    { title: "Detection pretraining", body: "The Deformable DETR detection branch is first pretrained on the stacked-scene data before relation training." },
    { title: "Dense graph relation reasoning", body: "Graph Transformer Dense uses Deformable DETR object-query features as nodes and predicts a directed Q×Q dependency matrix." },
    { title: "Joint detection and relation training", body: "Hungarian matching aligns predicted queries with ground-truth objects before detection and graph-relation objectives are optimized jointly." },
    { title: "Direction-constraint loss", body: "For a ground-truth pair with one directed relation, the added loss uses the score difference between opposite directions to supervise whether the edge is i→j or j→i." },
  ],
  scope:
    "The thesis evaluates object detection and directed dependency prediction on image data. It does not execute grasp planning or physical robot grasping; those remain future work.",
  datasets: [
    { title: "MetaGraspNetV2 synthetic data", body: "Synthetic data are used for training and evaluation of detection and dependency prediction." },
    { title: "Easy / medium / hard test splits", body: "Three difficulty subsets are evaluated separately following the project split protocol." },
  ],
  evaluation: {
    intro: "The definitions below follow the final thesis and its evaluation implementation.",
    groups: [
      {
        title: "Dependency-relation metrics",
        description: "Relation-level and complete-image evaluation.",
        metrics: [
          { abbr: "OP", name: "Overall relation precision", description: "Proportion of predicted relations that are correct." },
          { abbr: "OR", name: "Overall relation recall", description: "Proportion of ground-truth relations successfully recovered." },
          { abbr: "IA", name: "Image-level complete accuracy", description: "Whether the dependency relations for an entire image are predicted completely correctly." },
        ],
      },
      {
        title: "Relationship-detection metrics",
        description: "Additional metrics recorded by the thesis evaluation pipeline.",
        metrics: [
          { abbr: "w_rel_mAP", name: "Weighted relation mAP", description: "Weighted relation mAP requiring the associated object classes and boxes to match correctly." },
          { abbr: "w_phr_mAP", name: "Weighted phrase mAP", description: "Weighted phrase-level mAP combining detection and relation quality." },
          { abbr: "microR@50", name: "Micro Recall@50", description: "Micro-averaged recall of ground-truth relations within the top 50 predictions." },
          { abbr: "score", name: "Composite score", description: "Composite score recorded by the thesis evaluation pipeline." },
        ],
      },
    ],
  },
  results: {
    columns: ["OP", "OR", "IA", "w_rel", "w_phr", "microR@50", "score"],
    rows: [
      { model: "D3G-Deformable baseline", split: "easy", values: ["0.652", "0.635", "0.162", "0.260", "0.310", "0.506", "0.329"] },
      { model: "D3G-Deformable baseline", split: "medium", values: ["0.511", "0.374", "0.000", "0.120", "0.182", "0.284", "0.177"] },
      { model: "D3G-Deformable baseline", split: "hard", values: ["0.624", "0.123", "0.000", "0.032", "0.046", "0.079", "0.047"] },
      { model: "Direction-constrained", split: "easy", values: ["0.638", "0.615", "0.156", "0.269", "0.313", "0.523", "0.337"] },
      { model: "Direction-constrained", split: "medium", values: ["0.525", "0.338", "0.000", "0.094", "0.141", "0.224", "0.139"] },
      { model: "Direction-constrained", split: "hard", values: ["0.661", "0.107", "0.000", "0.025", "0.035", "0.059", "0.036"] },
    ],
    notes: [
      "Easy: w_rel, w_phr, microR@50 and score improve slightly (score 0.329 → 0.337), while OP, OR and IA are slightly lower.",
      "Medium/hard: OP increases, but recall-oriented and ranking metrics are lower. The aggregate result is mixed rather than a uniform improvement.",
      "Training remains stable for 50,000 iterations and the direction loss decreases, showing that the added objective is learnable without destabilising training.",
    ],
  },
  qualitative: {
    intro: "A real sample from the final thesis compares the baseline and direction-constrained predictions on the same cluttered scene.",
    figures: [
      { src: "/research/thesis-scene.webp", alt: "Cluttered grasping scene used in the thesis comparison", label: "Input scene" },
      { src: "/research/thesis-baseline-graph.webp", alt: "D3G-Deformable baseline dependency graph", label: "D3G-Deformable baseline" },
      { src: "/research/thesis-direction-graph.webp", alt: "Direction-constrained dependency graph", label: "Direction-constrained model" },
    ],
    note: "These figures are qualitative and unfiltered. A denser predicted graph does not by itself mean better performance; the quantitative metrics above determine the comparison.",
  },
  references: [
    { citation: "Rabino P, Tommasi T. A Modern Take on Visual Relationship Reasoning for Grasp Planning. IEEE Robotics and Automation Letters, 2025, 10(2): 1712–1719.", note: "D3G — the graph-dense workflow reproduced and extended in the thesis." },
    { citation: "Gilles M, Chen Y, Zeng E Z, et al. MetaGraspNetV2: All-in-One Dataset Enabling Fast and Reliable Robotic Bin Picking via Object Relationship Reasoning and Dexterous Grasping. IEEE Transactions on Automation Science and Engineering, 2024, 21(3): 2302–2320.", note: "Dataset used for the thesis experiments." },
    { citation: "Zhu X, Su W, Lu L, et al. Deformable DETR: Deformable Transformers for End-to-End Object Detection. ICLR, 2021." },
    { citation: "Yun S, Jeong M, Kim R, et al. Graph Transformer Networks. NeurIPS, 2019: 11983–11993." },
  ],
  technologies: ["PyTorch", "Detectron2", "Deformable DETR", "ResNet-50", "Graph Transformer Dense", "torch-geometric", "MetaGraspNetV2"],
  methods: ["Object detection", "Visual relation reasoning", "Dense graph modelling", "Directed dependency prediction", "Direction-constraint loss"],
  cvKeywords: ["PyTorch", "Detectron2", "Deformable DETR", "ResNet-50", "Graph Transformer Dense", "MetaGraspNetV2", "Directed dependency graph generation", "Direction-constraint loss"],
  learned: [
    { title: "Relation quality is bounded by detection quality", body: "Detection errors propagate into graph reasoning because dependency edges rely on correctly detected and matched object instances." },
    { title: "A new loss needs task-level validation", body: "The direction loss decreased stably during training, but test metrics were mixed across splits. Optimization behaviour and task-level performance are not the same thing." },
  ],
  futureIntro: "The thesis ends at a structured scene representation evaluated on image data. These are future directions, not prior experience:",
  future: [
    { title: "3D perception and object pose estimation", body: "Use depth, point clouds and object poses to ground support and occlusion relations geometrically." },
    { title: "From dependency graphs to grasp planning", body: "Use the graph to select grasp targets and order, then evaluate manipulation success on a robot." },
    { title: "Learning-based robotic grasping", body: "Use object-centric scene representations as input to learned grasping and manipulation policies." },
    { title: "Open-vocabulary relation reasoning", body: "Combine relation reasoning with open-vocabulary perception.", link: { label: "Related: open-vocabulary segmentation", href: "/projects/ovseg-xray-security" } },
  ],
};
