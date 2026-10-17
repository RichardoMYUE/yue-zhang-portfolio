/**
 * Shared content types for the data layer.
 *
 * Every page (homepage, /cv, /research, /projects, /about, /contact) reads
 * from the files in `data/`. Edit content there, never inside components.
 */

/** A period such as 09/2023 – 12/2024. `end: "Present"` marks ongoing work. */
export interface Period {
  start: string;
  end: string | "Present";
}

export interface LinkRef {
  label: string;
  href: string;
}

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export type ProfileLinkKind = "github" | "linkedin" | "scholar" | "orcid";

export interface ProfileLink {
  kind: ProfileLinkKind;
  label: string;
  /**
   * Public URL. `null` means "not configured yet": the link is hidden
   * everywhere on the site until a real URL is filled in.
   */
  url: string | null;
}

export interface EmailAddress {
  label: string;
  address: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Profile {
  name: string;
  headline: string;
  position: {
    role: string;
    programme: string;
    institution: string;
    institutionShort: string;
    location: string;
    since: string;
  };
  /** Who Yue is — one factual sentence (hero, About, metadata). */
  intro: string;
  /** What Yue wants to research (interest, not experience). */
  researchStatement: string;
  /** Research identity topics (interests). */
  researchInterests: string[];
  /** Tools/methods Yue has actually used, shown in the hero panel. */
  usedInPractice: string[];
  /** Future research interests — never presented as experience. */
  currentlyInterestedIn: string[];
  /** One understated sentence about the kind of involvement Yue is seeking. */
  openTo: string;
  email: {
    /** The verified public contact address. */
    primary: EmailAddress;
    /**
     * Future TU Chemnitz address. `null` until Yue confirms it; it is not
     * rendered anywhere while null.
     */
    academic: EmailAddress | null;
  };
  links: ProfileLink[];
  languages: Language[];
  about: {
    /** Third-person short biography (can be reused by others). */
    bio: string[];
    /** First-person research perspective. */
    perspective: string[];
  };
}

/* ------------------------------------------------------------------ */
/* Research                                                            */
/* ------------------------------------------------------------------ */

export type PillarId = "perception" | "understanding" | "manipulation";

export interface ResearchPillar {
  id: PillarId;
  index: string;
  title: string;
  description: string;
  methodsLabel: string;
  methods: string[];
  /** Guiding questions shown on /research (interests, phrased as questions). */
  questions: string[];
  /** Where this theme appears in Yue's work. */
  relatedWork: LinkRef[];
}

export type PipelineGlyphKind =
  | "scene"
  | "detection"
  | "relations"
  | "graph"
  | "reasoning"
  | "action";

export interface PipelineStage {
  id: string;
  title: string;
  /** Short question/subtitle shown on the node. */
  summary: string;
  description: string;
  group: PillarId;
  glyph: PipelineGlyphKind;
  /**
   * "thesis": covered by the Bachelor's thesis.
   * "next": a research direction Yue has not worked on yet (related
   *         experience may be linked as evidence, but it is not claimed).
   */
  coverage: "thesis" | "next";
  evidence: LinkRef[];
}

export interface ArchitectureStage {
  id: string;
  /** Role of the stage in the pipeline, e.g. "Object detection". */
  label: string;
  /** Method used for it, e.g. "Deformable DETR" (secondary to the role). */
  method?: string;
  detail: string;
}

export interface Metric {
  abbr: string;
  name: string;
  description: string;
}

export interface MetricGroup {
  title: string;
  description: string;
  metrics: Metric[];
}

export interface TitledText {
  title: string;
  body: string;
  link?: LinkRef;
}

export interface FlagshipResearch {
  slug: string;
  href: string;
  title: string;
  shortTitle: string;
  type: string;
  institution: string;
  institutionShort: string;
  period: Period;
  /** Two-sentence summary used on the CV. */
  summary: string[];
  /** One-paragraph lead for the detail page header. */
  lead: string;
  /** Research narrative (problem → what was investigated), homepage and /research. */
  narrative: string[];
  motivation: string;
  /** Follow-up paragraph under the motivation on the detail page. */
  motivationDetail: string;
  problem: string[];
  /** Only contributions supported by Yue's own description of the project. */
  contributions: string[];
  architecture: ArchitectureStage[];
  method: TitledText[];
  /** What the evaluation covers and what is left for future work. */
  scope: string;
  datasets: TitledText[];
  evaluation: {
    intro: string;
    groups: MetricGroup[];
  };
  /**
   * Quantitative results. Leave `null` until verified numbers are
   * available — nothing is rendered while this is null.
   */
  results: { metric: string; value: string; setting: string }[] | null;
  /** Software, models and data used. */
  technologies: string[];
  /** Methods / research topics of the project. */
  methods: string[];
  /** Compact tag list for the CV entry. */
  cvKeywords: string[];
  learned: TitledText[];
  futureIntro: string;
  future: TitledText[];
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type ProjectCategory = "research" | "engineering";

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  category: ProjectCategory;
  /** Label shown above the title, e.g. "Computer Vision Research". */
  area: string;
  role: string;
  period: Period;
  /** One-sentence summary used on cards. */
  summary: string;
  /** What problem the project addressed. */
  problem: string;
  /** What Yue did (also used as CV bullets). */
  contributions: string[];
  /** What was technically difficult. */
  challenges: string[];
  /** Tools and methods used. Only verified items. */
  technologies: string[];
  /** Outcome beyond awards (awards come from awards.ts). */
  outcome?: string;
  tags: string[];
  /** How the project connects to Yue's research direction. */
  relevance: string;
  /**
   * "primary": full card on the homepage.
   * "secondary": visible, but deliberately less prominent.
   */
  emphasis: "primary" | "secondary";
}

/* ------------------------------------------------------------------ */
/* Education, experience, awards, skills                              */
/* ------------------------------------------------------------------ */

export interface EducationEntry {
  id: string;
  institution: string;
  institutionShort: string;
  degree: string;
  location: string;
  period: Period;
  current: boolean;
  grade?: string;
  /** Label for `focus`, e.g. "Intended focus" for a degree in progress. */
  focusLabel?: string;
  focus?: string[];
  coursework?: string[];
  thesis?: LinkRef;
}

export interface ExperienceEntry {
  id: string;
  title: string;
  /** Host institution. `null` = not provided yet (hidden on the site). */
  institution: string | null;
  location: string;
  period: Period;
  points: string[];
}

export interface Award {
  id: string;
  year: number;
  title: string;
  context: string;
  /** Slug of the related project, if any. */
  project?: string;
  /** Id of the related experience entry, if any. */
  experience?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

/** A set of skill categories with one shared meaning, e.g. "used in practice". */
export interface SkillGroup {
  id: "tools" | "methods";
  title: string;
  /** One line explaining what belongs in this group. */
  note: string;
  categories: SkillCategory[];
}
