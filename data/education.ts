import { FLAGSHIP_HREF } from "./research";
import type { EducationEntry, ExperienceEntry } from "./types";

export const education: EducationEntry[] = [
  {
    id: "tu-chemnitz",
    institution: "Technische Universität Chemnitz",
    institutionShort: "TU Chemnitz",
    degree: "M.Sc. Embedded Systems",
    location: "Chemnitz, Germany",
    period: { start: "10/2026", end: "Present" },
    current: true,
    // Intended direction for the Master's — not completed coursework.
    focusLabel: "Intended focus",
    focus: [
      "Robot Perception",
      "Computer Vision",
      "Scene Understanding",
      "Robotics Software",
      "Intelligent Sensing",
      "Embedded AI",
    ],
  },
  {
    id: "bistu",
    institution: "Beijing Information Science and Technology University",
    institutionShort: "BISTU",
    degree: "B.Sc. Intelligence Science and Technology",
    location: "Beijing, China",
    period: { start: "09/2022", end: "06/2026" },
    current: false,
    grade: "78.55 / 100",
    thesis: {
      label: "Visual Relation Reasoning for Robotic Grasping in Cluttered Scenes",
      href: FLAGSHIP_HREF,
    },
    // Add further verified courses here (e.g. computer vision coursework);
    // the CV and timeline render whatever is in this list.
    coursework: [
      "Robotics",
      "Automatic Control Theory",
      "Intelligent Control Systems",
      "Machine Learning",
      "Reinforcement Learning",
      "Neural Networks & Deep Learning",
      "Robot Operating System (ROS)",
      "Natural Language Processing",
      "Computer Software Fundamentals",
    ],
  },
];

export const internationalExperience: ExperienceEntry[] = [
  {
    id: "ai-summer-school",
    title: "Artificial Intelligence Summer School",
    // TODO(Yue): add the host institution if you want it shown.
    institution: null,
    location: "France",
    period: { start: "07/2025", end: "07/2025" },
    points: [
      "Completed intensive coursework related to advanced artificial intelligence methodologies and applications.",
      "Collaborated in international teams on technical problem-solving.",
      "Received First Prize / University Scholarship for academic performance and project contribution.",
    ],
  },
];
