import type { Profile, ProfileLink } from "./types";

export const profile: Profile = {
  name: "Yue Zhang",
  headline: "Robotics Perception & Scene Understanding",

  position: {
    role: "M.Sc. student",
    programme: "M.Sc. Embedded Systems",
    institution: "Technische Universität Chemnitz",
    institutionShort: "TU Chemnitz",
    location: "Chemnitz, Germany",
    since: "10/2026",
  },

  intro:
    "M.Sc. Embedded Systems student at Technische Universität Chemnitz. My undergraduate research investigated visual relation reasoning for robotic grasping in cluttered scenes.",

  researchStatement:
    "I am interested in how visual perception and structured scene representations can support robot manipulation in cluttered environments — in particular, how a robot can recognise objects and reason about the relationships between them before it acts.",

  researchInterests: [
    "Robot Perception",
    "Scene Understanding",
    "Robotic Manipulation",
    "Computer Vision",
    "Visual Relation Reasoning",
    "Deep Learning",
  ],

  usedInPractice: ["PyTorch", "Deformable DETR", "Graph Transformers", "ROS"],

  // Future research interests. 3D perception, pose estimation and
  // learning-based grasping are NOT prior experience — keep them here only.
  currentlyInterestedIn: [
    "Object-centric robot perception",
    "Scene understanding for robotic manipulation",
    "Structured representations of object relationships",
    "3D perception and object pose estimation",
    "Learning-based robotic grasping",
    "Connecting perception with robot decision-making",
  ],

  openTo:
    "Open to research projects, HiWi opportunities and collaborations in robot perception and intelligent robotic systems.",

  email: {
    primary: {
      label: "Email",
      address: "zhangyue78565@163.com",
    },
    // TODO(Yue): add your TU Chemnitz address once you have confirmed it,
    // e.g. { label: "TU Chemnitz", address: "…@….tu-chemnitz.de" }.
    // Never guess the format — it stays hidden while null.
    academic: null,
  },

  /*
   * TODO(Yue): add real profile URLs. Links with `url: null` are hidden
   * on every page, so nothing broken or fake is ever published.
   */
  links: [
    { kind: "github", label: "GitHub", url: null },
    { kind: "linkedin", label: "LinkedIn", url: null },
    { kind: "scholar", label: "Google Scholar", url: null },
    { kind: "orcid", label: "ORCID", url: null },
  ],

  languages: [
    { name: "Chinese", level: "Native" },
    { name: "English", level: "IELTS 6.5" },
    { name: "German", level: "Basic" },
  ],

  about: {
    bio: [
      "Yue Zhang is an M.Sc. Embedded Systems student at Technische Universität Chemnitz. His current research interests focus on robot perception, scene understanding and robotic manipulation.",
      "During his undergraduate research, he investigated visual relation reasoning for cluttered robotic grasping, combining object detection and graph-based reasoning to model dependencies between objects.",
      "His broader experience includes open-vocabulary computer vision, autonomous intelligent vehicles, ROS, embedded systems and deep learning. He is particularly interested in research that connects visual perception with structured reasoning and real robotic behaviour.",
    ],
    // Written in first person. Review: this is Yue's own voice.
    perspective: [
      "The question behind my undergraduate research is what a robot needs to know about a cluttered scene before it manipulates it. Detecting every object is not enough; the robot also needs to know how the objects constrain one another — which ones rest on or block others.",
      "My bachelor’s thesis approached this as visual relation reasoning: object detections are turned into a dependency graph through graph-based reasoning. Two earlier projects broadened my background: applying open-vocabulary vision models to X-ray security imagery, where domain shift and ambiguous category names were the main difficulties, and tuning an autonomous vehicle through repeated physical track tests.",
      "During my Master’s at TU Chemnitz I would like to move closer to robots themselves: 3D and object-centric perception, object pose estimation, and connecting scene representations with grasp planning and robot decision-making.",
    ],
  },
};

/** Profile links that have a real URL configured. */
export function getConfiguredLinks(): (ProfileLink & { url: string })[] {
  return profile.links.filter(
    (link): link is ProfileLink & { url: string } =>
      typeof link.url === "string" && link.url.length > 0,
  );
}

/** Verified email addresses, in display order (the academic one only once confirmed). */
export function publicEmails() {
  return [profile.email.primary, profile.email.academic].filter(
    (email): email is NonNullable<typeof email> => email !== null,
  );
}
