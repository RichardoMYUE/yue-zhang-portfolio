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
  /** Certificate backing the level, e.g. "Goethe-Zertifikat A1". */
  certificate?: string;
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
    /** Main contact address (TU Chemnitz); used for every primary mailto link. */
    primary: EmailAddress;
    /** Alternative address, listed after the primary one. `null` = hidden. */
    secondary: EmailAddress | null;
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
  /** Short marker for the part changed in the thesis, e.g. the direction loss. */
  badge?: string;
}

export interface TitledText {
  title: string;
  body: string;
  link?: LinkRef;
}

export interface LabelledValue {
  label: string;
  value: string;
}

/* ---------- Bachelor's thesis: evidence-backed content ---------- */

/** Ids of entries in `FlagshipResearch.references`. */
export type ReferenceId = "metagraspnetv2" | "d3g" | "detr" | "deformable-detr" | "gtn";

export interface Reference {
  id: ReferenceId;
  authors: string;
  title: string;
  venue: string;
  year: number;
  /** Volume / pages exactly as listed in the thesis bibliography. */
  details?: string;
  /** Public code repository, if one was supplied. */
  code?: string;
  /** What this page relies on the work for. */
  usedFor: string;
}

/** Prior work the thesis builds on — not Yue's contribution. */
export interface PriorWork {
  what: string;
  ref: ReferenceId;
}

export interface Metric {
  /** Name as used in the thesis (e.g. "OP", "w_rel_mAP"). */
  abbr: string;
  name: string;
  description: string;
}

export type ThesisSplit = "easy" | "medium" | "hard";
export type ThesisModelId = "baseline" | "direction";

export interface ThesisModel {
  id: ThesisModelId;
  name: string;
  description: string;
}

/** One row of thesis Table 4-2. */
export interface ThesisResultRow {
  model: ThesisModelId;
  split: ThesisSplit;
  OP: number;
  OR: number;
  IA: number;
  wRel: number;
  wPhr: number;
  microR50: number;
  score: number;
}

export type ThesisMetricKey = Exclude<keyof ThesisResultRow, "model" | "split">;

export interface ThesisFigure {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Figure number in the thesis, e.g. "Fig. 4-4". */
  source: string;
  caption: string;
}

export interface DirectionConstraint {
  /** Why the baseline relation loss is not enough. */
  gap: string;
  /** Plain-language description of the added loss. */
  idea: string;
  /** What each relation loss supervises (existence vs. orientation). */
  supervises: { baseline: string; direction: string };
  /** Rules that define the loss, in order. */
  rules: string[];
  /** Formula lines, rendered in monospace. */
  formula: string[];
  /** Total objective, rendered as text. */
  objective: string;
  weights: LabelledValue[];
}

export interface FlagshipResearch {
  slug: string;
  href: string;
  title: string;
  /** Title of the submitted thesis in its original language. */
  originalTitle: string;
  shortTitle: string;
  type: string;
  institution: string;
  institutionShort: string;
  period: Period;
  /** One sentence for metadata and cards. */
  summary: string;
  /** One-paragraph lead for the detail page header. */
  lead: string;
  /** Research narrative (problem → what was done), homepage and /research. */
  narrative: string[];
  motivation: string;
  motivationDetail: string;
  problem: string[];
  /** What the thesis builds on (credited to the original authors). */
  priorWork: PriorWork[];
  /** What Yue did in the thesis. */
  contributions: string[];
  /** One sentence naming the part that is new in this thesis. */
  increment: string;
  /** Three short bullets for the homepage. */
  highlights: string[];
  /** Homepage evidence block: how the work was evaluated. */
  evidence: LabelledValue[];
  /** One-line, honest summary of the quantitative outcome. */
  outcome: string;
  /** Short credit line naming the prior work the thesis builds on. */
  creditLine: string;
  /** Compact CV bullets. */
  cvBullets: string[];
  architecture: ArchitectureStage[];
  /** D3G-based relation learning. */
  baselineMethod: TitledText[];
  direction: DirectionConstraint;
  /** What was implemented and evaluated — and what was not. */
  scope: string;
  setup: {
    data: TitledText[];
    splits: { split: ThesisSplit; criteria: string; definition: string }[];
    splitsNote: string;
    /** Training runs documented by logs and checkpoints. */
    runs: { date: string; run: string; iterations: string }[];
    runsNote: string;
    config: LabelledValue[];
    configNote: string;
  };
  evaluation: {
    intro: string;
    relationMetrics: Metric[];
    scoreFormula: string;
    scoreNote: string;
    detectionNote: string;
  };
  results: {
    source: string;
    models: ThesisModel[];
    rows: ThesisResultRow[];
    /** How the two runs relate (they are not a controlled ablation). */
    comparisonNote: string;
    summary: string[];
  };
  training: {
    points: string[];
    caveat: string;
  };
  figures: {
    inputScene: ThesisFigure;
    baselineGraph: ThesisFigure;
    directionGraph: ThesisFigure;
    totalLoss: ThesisFigure;
    relationLosses: ThesisFigure;
  };
  qualitative: {
    legend: string[];
    observation: string;
    caveat: string;
  };
  findings: string[];
  limitations: string[];
  /** Software, models and data used. */
  technologies: string[];
  futureIntro: string;
  future: TitledText[];
  references: Reference[];
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
  /** Label for `grade`, e.g. "Overall weighted average". */
  gradeLabel?: string;
  /** Label for `focus`, e.g. "Intended focus" for a degree in progress. */
  focusLabel?: string;
  focus?: string[];
  /** Selected courses with their transcript scores, in display order. */
  courseGrades?: CourseGrade[];
  /** Where `courseGrades` come from, shown under the list on the CV. */
  courseGradesNote?: string;
  /** Further relevant courses without listed grades (never repeats `courseGrades`). */
  coursework?: string[];
  thesis?: LinkRef;
}

export interface CourseGrade {
  /** Course title in English — the displayed name. */
  name: string;
  /** Chinese title as on the transcript, kept for checking; not rendered. */
  nameZh: string;
  /** Score out of 100. */
  score: number;
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
