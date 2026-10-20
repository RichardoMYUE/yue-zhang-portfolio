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
    // Final official transcript, BISTU, issued 23 June 2026 (replaces the
    // 78.55 of the February 2026 transcript). No GPA is shown on purpose.
    grade: "78.78 / 100",
    gradeLabel: "Overall weighted average",
    thesis: {
      label: "Visual Relation Reasoning for Robotic Grasping in Cluttered Scenes",
      href: FLAGSHIP_HREF,
    },
    // Scores from the same final transcript, in display order. Shown with
    // grades on the CV only; elsewhere just the course names appear.
    courseGrades: [
      { name: "Intelligent Control System", nameZh: "智能控制系统", score: 95 },
      { name: "Reinforcement Learning and Control", nameZh: "强化学习与控制", score: 94 },
      { name: "Digital Signal Processing", nameZh: "数字信号处理", score: 92 },
      { name: "Microcontroller Technology", nameZh: "微控制器技术", score: 91 },
      { name: "Robotics", nameZh: "机器人学", score: 88 },
      { name: "Intelligent Robot", nameZh: "智能机器人", score: 87 },
    ],
    courseGradesNote: "Scores out of 100 · final official transcript, issued 23 June 2026",
    // Further verified courses without listed grades; courses already in
    // `courseGrades` are not repeated here.
    coursework: [
      "Automatic Control Theory",
      "Machine Learning",
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
    institution: "EPSI",
    location: "France",
    period: { start: "07/2025", end: "07/2025" },
    points: [
      "Completed intensive coursework related to advanced artificial intelligence methodologies and applications.",
      "Collaborated in international teams on technical problem-solving.",
      "Received First Prize / University Scholarship for academic performance and project contribution.",
    ],
  },
];
