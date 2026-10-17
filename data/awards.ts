import type { Award } from "./types";

/** Newest first. Projects look up their awards here via `project`. */
export const awards: Award[] = [
  {
    id: "summer-school-2025",
    year: 2025,
    title: "First Prize / University Scholarship",
    context: "Artificial Intelligence Summer School",
    experience: "ai-summer-school",
  },
  {
    id: "vehicle-national-2024",
    year: 2024,
    title: "National Second Prize",
    context: "Intelligent Vehicle Competition",
    project: "autonomous-intelligent-vehicle",
  },
  {
    id: "ovseg-provincial-2024",
    year: 2024,
    title: "Provincial Third Prize",
    context: "Open-Vocabulary Segmentation / X-ray Security Inspection",
    project: "ovseg-xray-security",
  },
  {
    id: "vehicle-university-2024",
    year: 2024,
    title: "University Second Prize",
    context: "Intelligent Vehicle Competition",
    project: "autonomous-intelligent-vehicle",
  },
  {
    id: "ovseg-university-2023",
    year: 2023,
    title: "University Third Prize",
    context: "Open-Vocabulary Segmentation Project",
    project: "ovseg-xray-security",
  },
];

export function getAwardsForProject(slug: string): Award[] {
  return awards.filter((award) => award.project === slug);
}
