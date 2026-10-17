import type { Project } from "./types";

/**
 * Secondary research and engineering projects.
 * Array order is display order — keep it ordered by relevance to
 * robot perception (the Bachelor's thesis lives in `research.ts`).
 */
export const projects: Project[] = [
  {
    slug: "ovseg-xray-security",
    title: "Open-Vocabulary Segmentation for X-ray Security Inspection",
    shortTitle: "Open-vocabulary segmentation for X-ray inspection",
    category: "research",
    area: "Computer Vision Research",
    role: "Research Project",
    period: { start: "09/2023", end: "12/2024" },
    summary:
      "Investigated domain shift and category ambiguity when applying open-vocabulary visual models to X-ray security imagery, and designed prompt strategies to improve semantic alignment.",
    problem:
      "Open-vocabulary segmentation models recognise categories described in text, but they are mostly trained on natural images. The project examined how such models behave on X-ray security imagery, and how category prompts can be designed so that text and image regions align better in this domain.",
    contributions: [
      "Investigated domain shift and category ambiguity when applying open-vocabulary visual models to X-ray security imagery.",
      "Designed scenario-aware category prompts tailored to security-inspection settings.",
      "Developed multi-prompt strategies to improve the semantic alignment between category text and X-ray image regions.",
    ],
    challenges: [
      "Domain shift: in X-ray scans objects overlap and are partly transparent, and their appearance depends on material rather than natural colour and texture.",
      "Category ambiguity: category names that do not map cleanly onto how objects appear in an X-ray scan.",
    ],
    technologies: ["PyTorch", "Open-vocabulary segmentation models", "Prompt design"],
    tags: [
      "Computer Vision",
      "Open-Vocabulary Segmentation",
      "Deep Learning",
      "Semantic Alignment",
      "PyTorch",
    ],
    relevance:
      "Two problems from this project also matter for robot perception: recognising objects beyond a fixed label set, and the gap between the domain a model is trained on and the domain it is used in.",
    emphasis: "primary",
  },
  {
    slug: "autonomous-intelligent-vehicle",
    title: "Intelligent Vehicle / Autonomous Racing",
    shortTitle: "Autonomous intelligent vehicle",
    category: "engineering",
    area: "Autonomous Systems",
    role: "Team Lead",
    period: { start: "03/2024", end: "12/2024" },
    summary:
      "Led iterative testing and parameter tuning of an autonomous intelligent vehicle: path planning, decision parameters, trajectory tracking and stability, evaluated through repeated physical track tests.",
    problem:
      "Getting an autonomous intelligent vehicle to drive stably and accurately on a physical track, where path planning, decision parameters and trajectory tracking interact.",
    contributions: [
      "Led iterative testing and parameter tuning of the vehicle system as team lead.",
      "Worked on path planning, decision parameters and trajectory tracking.",
      "Analysed parameter sensitivity and its effect on stability, trajectory tracking and cornering performance.",
      "Evaluated changes through repeated physical track tests.",
    ],
    challenges: [
      "Parameter sensitivity: changes in decision and control parameters affect stability, trajectory tracking and cornering.",
      "Each change had to be validated through repeated runs on the physical track.",
    ],
    // TODO(Yue): add the vehicle's hardware/software platform (controller,
    // sensors, frameworks) if you want it listed — not shown until verified.
    technologies: ["Path planning", "Trajectory tracking", "Parameter tuning", "Embedded systems"],
    tags: [
      "Autonomous Systems",
      "Path Planning",
      "Control",
      "Embedded Systems",
      "Real-world Testing",
    ],
    relevance:
      "The project connected planning, decision-making and control on physical hardware, where every change had to be checked through repeated runs — the same kind of validation needed when perception runs on a real robot.",
    emphasis: "primary",
  },
  {
    slug: "rag-academic-qa",
    title: "LLM-based Retrieval-Augmented QA System",
    shortTitle: "Retrieval-augmented QA system",
    category: "engineering",
    area: "AI Engineering",
    role: "Technical Lead",
    period: { start: "09/2024", end: "2026" },
    summary:
      "Developed a domain-specific retrieval-augmented generation framework for academic environments, combining semantic and keyword-based retrieval.",
    problem:
      "Answering questions about domain-specific academic information requires answers grounded in the relevant documents rather than in a language model’s general knowledge.",
    contributions: [
      "Developed a domain-specific retrieval-augmented generation framework for academic environments.",
      "Integrated semantic retrieval with keyword-based retrieval.",
      "Explored LoRA fine-tuning, reranking and prompt engineering for domain-specific language understanding.",
    ],
    challenges: [
      "Combining semantic and keyword-based retrieval for domain-specific terminology.",
      "Adapting a language model to domain-specific language.",
    ],
    technologies: ["Python", "PyTorch", "LoRA", "Reranking", "LLM"],
    outcome:
      "A domain-specific retrieval-augmented QA framework for academic environments, developed as technical lead.",
    tags: ["Python", "PyTorch", "RAG", "LoRA", "LLM", "Information Retrieval"],
    relevance:
      "Not robotics research, but evidence of software and machine-learning engineering: building and integrating a multi-component system over an extended period.",
    emphasis: "secondary",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function projectHref(slug: string): string {
  return `/projects/${slug}`;
}
