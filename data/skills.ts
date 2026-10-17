import type { SkillGroup } from "./types";

/**
 * Technical background, split by what the items are:
 * - tools:   software, languages and hardware Yue has used
 * - methods: techniques applied in the projects on this site
 *
 * Research interests (3D perception, pose estimation, learning-based
 * grasping, …) are deliberately NOT here — they live in
 * `profile.currentlyInterestedIn` and are shown as future directions.
 * No proficiency levels or percentages on purpose.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "tools",
    title: "Tools & technologies",
    note: "Used in projects and coursework",
    categories: [
      { id: "programming", title: "Programming", skills: ["Python", "C++", "MATLAB"] },
      {
        id: "ml-vision",
        title: "ML & vision",
        skills: ["PyTorch", "Detectron2", "torch-geometric", "OpenCV"],
      },
      { id: "robotics", title: "Robotics", skills: ["ROS"] },
      {
        id: "embedded",
        title: "Embedded hardware",
        skills: ["STM32", "Raspberry Pi", "PCB Design"],
      },
      { id: "engineering", title: "Engineering tools", skills: ["Linux / Ubuntu", "Git", "LaTeX"] },
    ],
  },
  {
    id: "methods",
    title: "Methods & research experience",
    note: "Applied in my projects",
    categories: [
      {
        id: "vision",
        title: "Computer vision",
        skills: ["Object Detection", "Open-Vocabulary Segmentation"],
      },
      {
        id: "relations",
        title: "Relation reasoning",
        skills: ["Visual Relation Reasoning", "Graph Transformer Dense", "Dependency Graphs"],
      },
      {
        id: "deep-learning",
        title: "Deep learning",
        skills: ["Deep Learning", "Transformers / Attention"],
      },
      {
        id: "autonomous",
        title: "Autonomous systems",
        skills: ["Path Planning", "Trajectory Tracking", "Physical Testing"],
      },
      {
        id: "ai-engineering",
        title: "AI engineering",
        skills: ["Retrieval-Augmented Generation", "LoRA", "Reranking", "Prompt Engineering"],
      },
    ],
  },
];
