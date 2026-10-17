import { thesisFinal } from "./thesis-final";

export const FLAGSHIP_HREF = "/research/cluttered-grasp-reasoning";

export const researchPillars = [
  {
    id: "perception", index: "01", title: "Robot Perception",
    description: "Learning visual representations that allow robots to detect and understand objects in complex environments.",
    methodsLabel: "Methods I have used",
    methods: ["Computer Vision", "Object Detection", "Open-Vocabulary Segmentation", "Deep Learning"],
    questions: ["How can objects be detected reliably when they are stacked and partially occluded?", "How well do open-vocabulary visual models transfer to new imaging domains?"],
    relatedWork: [{ label: "B.Sc. thesis — object detection stage", href: FLAGSHIP_HREF }, { label: "Open-vocabulary segmentation for X-ray imagery", href: "/projects/ovseg-xray-security" }],
  },
  {
    id: "understanding", index: "02", title: "Scene Understanding",
    description: "Moving beyond isolated object detection toward understanding spatial and dependency relationships between objects.",
    methodsLabel: "Methods I have used",
    methods: ["Visual Relation Reasoning", "Graph Representation", "Graph Transformers", "Attention Mechanisms"],
    questions: ["How can relations between objects be inferred from visual input?", "Which scene representation makes object dependencies explicit enough for downstream planning?"],
    relatedWork: [{ label: "B.Sc. thesis — relation reasoning & dependency graphs", href: FLAGSHIP_HREF }],
  },
  {
    id: "manipulation", index: "03", title: "Manipulation & Autonomous Systems",
    description: "Connecting perception and structured scene understanding with robot decision-making and autonomous behaviour.",
    methodsLabel: "Relevant experience",
    methods: ["ROS", "Path Planning", "Trajectory Tracking", "Embedded Systems"],
    questions: ["How should a structured scene representation inform which object a robot grasps next?", "What changes when perception is validated on a physical system?"],
    relatedWork: [{ label: "B.Sc. thesis — manipulation-oriented scene representation", href: FLAGSHIP_HREF }, { label: "Autonomous intelligent vehicle", href: "/projects/autonomous-intelligent-vehicle" }],
  },
] as const;

export const researchNarrative = [
  { title: "Perception", body: "Detect the objects in a cluttered visual scene.", status: "thesis" },
  { title: "Scene Understanding", body: "Infer how the objects relate to and depend on each other.", status: "thesis" },
  { title: "Structured Reasoning", body: "Represent the scene as a directed dependency graph.", status: "thesis" },
  { title: "Robotic Manipulation", body: "Use that structure for grasp planning and robot action.", status: "next" },
] as const;

export const pipelineGroups = [
  { id: "perception", label: "Perception" },
  { id: "understanding", label: "Scene understanding" },
  { id: "manipulation", label: "Manipulation" },
] as const;

export const pipelineStages = [
  {
    id: "scene", title: "RGB / Visual Scene", summary: "Unstructured visual input",
    description: "A cluttered scene with touching, stacked and partly occluded objects.",
    group: "perception", glyph: "scene", coverage: "thesis",
    evidence: [{ label: "MetaGraspNetV2 scenes (B.Sc. thesis)", href: FLAGSHIP_HREF }],
  },
  {
    id: "detection", title: "Object Detection", summary: "What is where?",
    description: "Localise and classify object instances. The thesis uses Deformable DETR with a ResNet-50 backbone.",
    group: "perception", glyph: "detection", coverage: "thesis",
    evidence: [{ label: "Object detection stage (B.Sc. thesis)", href: FLAGSHIP_HREF }],
  },
  {
    id: "relations", title: "Object Relations", summary: "How do objects constrain each other?",
    description: "Infer directed dependencies using Graph Transformer Dense on Deformable DETR object-query representations.",
    group: "understanding", glyph: "relations", coverage: "thesis",
    evidence: [{ label: "Relation reasoning stage (B.Sc. thesis)", href: FLAGSHIP_HREF }],
  },
  {
    id: "graph", title: "Scene / Dependency Graph", summary: "A structured representation",
    description: "Objects become nodes and directed grasp-order dependencies become edges.",
    group: "understanding", glyph: "graph", coverage: "thesis",
    evidence: [{ label: "Dependency graph generation (B.Sc. thesis)", href: FLAGSHIP_HREF }],
  },
  {
    id: "reasoning", title: "Manipulation Reasoning", summary: "What can be grasped next?",
    description: "Use the predicted dependency graph as input for grasp-order planning. Planning itself remains future work.",
    group: "manipulation", glyph: "reasoning", coverage: "next",
    evidence: [{ label: "Thesis motivation", href: `${FLAGSHIP_HREF}#problem` }],
  },
  {
    id: "action", title: "Robot Action", summary: "Grasp and execute",
    description: "Physical robot grasp execution is future work; it was not part of the final thesis evaluation.",
    group: "manipulation", glyph: "action", coverage: "next",
    evidence: [{ label: "Autonomous vehicle project", href: "/projects/autonomous-intelligent-vehicle" }],
  },
] as const;

export const flagshipResearch = {
  slug: "cluttered-grasp-reasoning",
  href: FLAGSHIP_HREF,
  title: "Visual Relation Reasoning for Robotic Grasping in Cluttered Scenes",
  shortTitle: "Visual relation reasoning for cluttered grasping",
  type: "Bachelor's Thesis",
  institution: "Beijing Information Science and Technology University",
  institutionShort: "BISTU",
  ...thesisFinal,
};

export function architectureChain(): string {
  return flagshipResearch.architecture
    .map((stage) => ("method" in stage && stage.method ? `${stage.label} (${stage.method})` : stage.label))
    .join(" → ");
}
