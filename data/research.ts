import type {
  FlagshipResearch,
  PillarId,
  PipelineStage,
  ResearchPillar,
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
      "Localise and classify every object instance. In my thesis this stage uses Deformable DETR with a ResNet-50 backbone.",
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
      "Infer relations between objects in the context of the whole scene. In my thesis this is graph-based relation reasoning with a Graph Transformer.",
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
      "Objects become nodes and dependencies become edges — an explicit description of how the scene is structured.",
    group: "understanding",
    glyph: "graph",
    coverage: "thesis",
    evidence: [{ label: "Dependency graph generation (B.Sc. thesis)", href: FLAGSHIP_HREF }],
  },
  {
    id: "reasoning",
    title: "Manipulation Reasoning",
    summary: "What can be grasped next?",
    description:
      "Use the dependency graph to decide which objects are accessible and in which order a scene can be cleared. My thesis builds the representation for this step; using it for grasp planning is what I want to work on next.",
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
/* ------------------------------------------------------------------ */

export const flagshipResearch: FlagshipResearch = {
  slug: "cluttered-grasp-reasoning",
  href: FLAGSHIP_HREF,
  title: "Visual Relation Reasoning for Robotic Grasping in Cluttered Scenes",
  shortTitle: "Visual relation reasoning for cluttered grasping",
  type: "Bachelor's Thesis",
  institution: "Beijing Information Science and Technology University",
  institutionShort: "BISTU",
  period: { start: "2025", end: "2026" },

  // CV wording (supplied by Yue).
  summary: [
    "Developed a vision-based reasoning pipeline for modeling object dependencies in cluttered robotic grasping scenes.",
    "The project explores how a robot can move beyond isolated object detection and construct structured representations of relationships between objects before manipulation.",
  ],

  lead: "My bachelor’s thesis investigated whether visual object detections can be transformed into a structured dependency graph through graph-based relation reasoning — as a basis for manipulation-oriented scene understanding in cluttered grasping scenes.",

  narrative: [
    "Object detection alone does not provide enough information for robotic manipulation in cluttered environments. A robot may recognise every object in a scene while still lacking an understanding of how those objects constrain one another.",
    "My undergraduate research investigated visual relation reasoning for representing such dependencies as structured graphs. The system combines object-level visual representations with graph-based reasoning to infer relationships that may support downstream manipulation and grasp planning.",
  ],

  motivation:
    "Robots operating in cluttered environments need more than isolated object detection. They must understand relationships and dependencies between objects before selecting manipulation actions.",

  motivationDetail:
    "A graph makes these dependencies explicit: objects become nodes and dependencies become edges. Such a representation is something downstream grasp planning could query directly, instead of inferring the structure of the scene from raw pixels.",

  problem: [
    "In a cluttered bin or on a crowded table, objects lie on, lean against and occlude each other. An object detector reports what is in the scene and where — but not how the objects constrain one another, for example which object rests on another.",
    "For manipulation, this missing information matters: grasping an object that others depend on can disturb the rest of the scene. The thesis asks whether such dependencies can be inferred from visual input and represented as a graph.",
  ],

  // Only what Yue's own project description supports.
  // TODO(Yue): state which components you implemented yourself and which you
  // adapted from existing code, and add training details if you want them shown.
  contributions: [
    "Developed a vision-based reasoning pipeline in PyTorch that models object dependencies in cluttered robotic grasping scenes.",
    "Combined object detection (Deformable DETR with a ResNet-50 backbone) with graph-based relation reasoning (Graph Transformer) on object-level representations.",
    "Generated object relation / dependency graphs from the inferred relations.",
    "Evaluated relation reasoning on MetaGraspNetV2 Synthetic and on challenging cluttered-scene data, using OP, OR, IA, weighted relation mAP, weighted phrase mAP and micro Recall@50.",
  ],

  architecture: [
    {
      id: "image",
      label: "Visual scene",
      detail: "Image of a cluttered grasping scene",
    },
    {
      id: "detector",
      label: "Object detection",
      method: "Deformable DETR",
      detail: "ResNet-50 backbone",
    },
    {
      id: "tokens",
      label: "Object representations",
      detail: "One representation per detected object",
    },
    {
      id: "graph-reasoning",
      label: "Relation reasoning",
      method: "Graph Transformer",
      detail: "Attention between object nodes",
    },
    {
      id: "dependency-graph",
      label: "Dependency graph",
      detail: "Relations between detected objects",
    },
    {
      id: "manipulation",
      label: "Manipulation-oriented scene understanding",
      detail: "Which objects constrain which — a possible input for grasp planning",
    },
  ],

  method: [
    {
      title: "Object detection",
      body: "Objects are detected with Deformable DETR, a transformer-based detector, using a ResNet-50 backbone. Deformable attention samples a small set of locations across feature scales, which suits scenes with many objects of different sizes.",
    },
    {
      title: "Object representations",
      body: "The detector provides one object-level representation per detected object. These representations form the nodes of a graph over the scene.",
    },
    {
      title: "Relation reasoning",
      body: "A Graph Transformer reasons over the object nodes. Attention lets the representation of each object take the other objects in the scene into account when relations are inferred.",
    },
    {
      title: "Dependency graph",
      body: "The inferred relations are assembled into an object relation / dependency graph that describes how the objects in the scene constrain one another.",
    },
  ],

  scope:
    "The evaluation measures relation reasoning on image data. Connecting the dependency graph to grasp planning and to grasp execution on a robot is the next step I want to work on.",

  datasets: [
    {
      title: "MetaGraspNetV2 Synthetic",
      body: "Synthetic cluttered-scene data from MetaGraspNetV2, a dataset for robotic grasping in cluttered bin-picking scenarios that includes annotations of object relationships.",
    },
    {
      title: "Challenging cluttered-scene evaluation data",
      body: "A more challenging (“hard”) set of cluttered scenes used for evaluation.",
    },
  ],

  // TODO(Yue): the descriptions below follow the standard definitions of
  // these metrics. Check that they match how your thesis computed them.
  evaluation: {
    intro:
      "Evaluation combines metrics from manipulation-relationship reasoning with standard visual-relationship / scene-graph metrics. They answer different questions: whether individual relations are correct, and whether the complete scene structure is correct.",
    groups: [
      {
        title: "Relation-level and image-level metrics",
        description:
          "Common in manipulation-relationship reasoning. A relation counts as correct only if both objects are detected correctly and the relation between them is predicted correctly.",
        metrics: [
          {
            abbr: "OP",
            name: "Object-based precision",
            description: "Share of predicted relations that are correct.",
          },
          {
            abbr: "OR",
            name: "Object-based recall",
            description: "Share of ground-truth relations that are recovered.",
          },
          {
            abbr: "IA",
            name: "Image-based accuracy",
            description:
              "Share of images in which the complete set of relations is predicted correctly.",
          },
        ],
      },
      {
        title: "Scene-graph metrics",
        description:
          "Standard metrics for visual relationship detection, evaluated over subject–relation–object triplets.",
        metrics: [
          {
            abbr: "wmAP-rel",
            name: "Weighted relation mAP",
            description:
              "Mean average precision over relation triplets, with subject and object boxes localised separately; weighted across relation classes.",
          },
          {
            abbr: "wmAP-phr",
            name: "Weighted phrase mAP",
            description:
              "Mean average precision where the triplet is localised by a single box enclosing both objects; weighted across relation classes.",
          },
          {
            abbr: "R@50",
            name: "Micro Recall@50",
            description:
              "Share of ground-truth triplets found among the top-50 predictions per image, pooled over the whole dataset.",
          },
        ],
      },
    ],
  },

  // TODO(Yue): add verified numbers here if you want them published.
  // Nothing is shown on the site while this is null.
  results: null,

  technologies: ["PyTorch", "Deformable DETR", "ResNet-50", "Graph Transformer", "MetaGraspNetV2"],

  methods: [
    "Object detection",
    "Visual relation reasoning",
    "Attention mechanisms",
    "Dependency graph generation",
    "Cluttered-scene perception",
  ],

  cvKeywords: [
    "PyTorch",
    "Deformable DETR",
    "ResNet-50",
    "Graph Transformer",
    "Attention mechanisms",
    "MetaGraspNetV2",
    "Cluttered-scene perception",
    "Object detection",
    "Visual relation reasoning",
    "Dependency graph generation",
  ],

  // Reflections written from the project description — review and adjust
  // to your own experience before sending the link.
  learned: [
    {
      title: "Relation quality is bounded by detection quality",
      body: "A relation can only be right if both objects are found. Errors in localisation or classification propagate directly into the graph, so detection and relation reasoning have to be evaluated together as well as separately.",
    },
    {
      title: "Metrics encode assumptions",
      body: "Object-level, image-level and ranking-based metrics reward different behaviour. Choosing which ones matter is part of defining the problem, not an afterthought.",
    },
  ],

  futureIntro:
    "The thesis ends at a structured scene representation evaluated on image data. These are the directions I would like to take it — none of them is prior experience:",

  future: [
    {
      title: "3D perception and object pose estimation",
      body: "Grounding relations such as support and occlusion in geometry, using depth or point-cloud input and object poses rather than 2D boxes alone.",
    },
    {
      title: "From dependency graphs to grasp planning",
      body: "Using the graph to select grasp targets and order, and evaluating it by manipulation success on a robot rather than by perception metrics alone.",
    },
    {
      title: "Learning-based robotic grasping",
      body: "Using object-centric scene representations as input to learned grasping and manipulation policies.",
    },
    {
      title: "Open-vocabulary relation reasoning",
      body: "Combining relation reasoning with open-vocabulary perception, so that robots can reason about objects outside a fixed label set.",
      link: {
        label: "Related: open-vocabulary segmentation",
        href: "/projects/ovseg-xray-security",
      },
    },
  ],
};

/** "Object detection (Deformable DETR) → …" for compact text representations. */
export function architectureChain(): string {
  return flagshipResearch.architecture
    .map((stage) => (stage.method ? `${stage.label} (${stage.method})` : stage.label))
    .join(" → ");
}
