import { profile } from "./profile";

export const siteConfig = {
  title: `${profile.name} | ${profile.headline}`,
  description:
    "Research homepage of Yue Zhang, M.Sc. Embedded Systems student at Technische Universität Chemnitz. Previous research: visual relation reasoning for robotic grasping in cluttered scenes. Interests: robot perception, scene understanding and robotic manipulation.",
  keywords: [
    "Yue Zhang",
    "robot perception",
    "scene understanding",
    "robotic manipulation",
    "robotic grasping",
    "visual relation reasoning",
    "computer vision",
    "Deformable DETR",
    "Graph Transformer",
    "dependency graph",
    "MetaGraspNetV2",
    "TU Chemnitz",
    "Embedded Systems",
  ],
  /** ISO date of the last content update, shown in the footer and CV. */
  lastUpdated: "2026-10-20",
};

export interface NavItem {
  href: string;
  label: string;
}

export const mainNav: NavItem[] = [
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  // Label reads "Background"; the route stays /cv so existing links keep working.
  { href: "/cv", label: "Background" },
  { href: "/about", label: "About" },
];

export const contactNav: NavItem = { href: "/contact", label: "Contact" };
