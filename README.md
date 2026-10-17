# Yue Zhang — Academic Website

Personal research homepage and **web-native academic CV** of Yue Zhang
(M.Sc. Embedded Systems, TU Chemnitz). Focus: robot perception, scene
understanding, visual relation reasoning and robotic manipulation.

The website *is* the CV. There is no separately maintained PDF: `/cv` is a
structured academic record that prints cleanly via the browser
(**Print → Save as PDF**), and the rest of the site adds depth a PDF cannot
(architecture diagrams, method, evaluation methodology, project pages).

| Route | Purpose |
| --- | --- |
| `/` | Hero → main research project → further projects → technical background → education & awards → research direction (pipeline + future interests) → contact |
| `/research` | Research overview and themes with guiding questions |
| `/research/cluttered-grasp-reasoning` | Bachelor's thesis in depth (problem → method → evaluation → future work) |
| `/projects`, `/projects/[slug]` | Further research and engineering projects |
| `/cv` | Complete, print-friendly academic CV (nav label: "Background") |
| `/about` | Biography and research perspective |
| `/contact` | Email addresses and what Yue is open to |

## Tech stack

- Next.js 16 (App Router, fully static — every route is prerendered)
- TypeScript, Tailwind CSS 4
- Framer Motion (small entrance and menu transitions only; honours `prefers-reduced-motion`)
- Lucide icons
- No database, backend or authentication

## Development

Requires Node.js 20+ and pnpm. The repository pins pnpm via the
`packageManager` field; with Corepack you can run it without a global install.

```bash
corepack enable
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint
pnpm build        # production build (static output)
```

## Where the content lives

All content is in `data/`. Components only render it — the homepage, `/cv`,
`/research`, `/projects`, `/about` and `/contact` all read from the same files,
so every fact is edited in exactly one place.

| File | Contents |
| --- | --- |
| `data/profile.ts` | Name, headline, intro, research statement, interests, "currently interested in" (future only), open-to sentence, verified email, profile links, languages, About text |
| `data/research.ts` | Research themes, the research-direction pipeline (each stage marked `thesis` or `next`), and the full Bachelor's thesis (narrative, contribution, architecture, method, scope, data, metrics, lessons, future work) |
| `data/projects.ts` | Secondary projects (order = display order) |
| `data/education.ts` | Degrees and international experience |
| `data/awards.ts` | Awards, linked to projects by slug |
| `data/skills.ts` | Technical background in two groups — tools used, and methods applied in projects (no proficiency bars). Research interests are *not* listed here |
| `data/site.ts` | Site title/description, navigation, `lastUpdated` date |
| `data/types.ts` | TypeScript types for all of the above |

After editing content, update `lastUpdated` in `data/site.ts` — it appears in
the footer and on the CV.

### Content integrity

Nothing on the site is invented, and the site separates what Yue has done
from what Yue wants to research next:

- Experience (projects, "My contribution", tools & methods) contains only
  facts from Yue's own project descriptions.
- Everything about the Bachelor's thesis (contribution, architecture, training
  configuration, losses, metrics, results, figures, limitations, references)
  follows the **final thesis PDF**; section, table and figure numbers are noted
  in comments in `data/research.ts`. Prior work (D3G, DETR, Deformable DETR,
  Graph Transformer, MetaGraspNetV2) is credited in `priorWork` / `references`
  and never presented as Yue's own. Results are reported as mixed, exactly as in
  thesis Table 4-2.
- Future topics (3D perception, object pose estimation, learning-based
  grasping, grasp execution on robots) appear only in `currentlyInterestedIn`,
  in pipeline stages marked `coverage: "next"` and in the thesis
  "Relation to future research" section — always styled with dashed outlines.

Unknown facts are left as `null` / `TODO(Yue)` in the data layer and are
**not rendered** until filled in:

- `profile.email.academic` — TU Chemnitz address (only add once confirmed)
- `profile.links[*].url` — GitHub, LinkedIn, Google Scholar, ORCID
- `internationalExperience[0].institution` — summer-school host institution
- vehicle project platform (controller, sensors, frameworks) in `data/projects.ts`

To review before sending the link: the first-person text `profile.about.perspective`.

## Common tasks

### Add GitHub / LinkedIn / Google Scholar links

In `data/profile.ts`, set the `url` of the corresponding entry:

```ts
links: [
  { kind: "github", label: "GitHub", url: "https://github.com/your-handle" },
  { kind: "linkedin", label: "LinkedIn", url: null }, // still hidden
  ...
],
```

Configured links automatically appear in the footer, the contact page and the
CV header; GitHub also appears as an icon in the hero.

### Add a research or engineering project

Append an object to `projects` in `data/projects.ts` (see the `Project` type in
`data/types.ts`). Choose a URL-safe `slug`; the page `/projects/<slug>` is
generated at build time and the project is added to `/projects`, the CV and the
sitemap automatically.

- `category: "research"` lists it under *Research experience* on the CV and on `/research`;
  `"engineering"` lists it under *Selected engineering projects*.
- `emphasis: "primary"` gives it a full card on the homepage; `"secondary"` keeps it
  visible but deliberately less prominent.
- To attach an award, add it to `data/awards.ts` with `project: "<slug>"`.

### Add coursework or thesis evidence

- Coursework: extend `coursework` in `data/education.ts`.
- Thesis results live in `flagshipResearch.results.rows` (one `ThesisResultRow`
  per model and split, copied from thesis Table 4-2). The results table and the
  per-split "higher / lower" summary are generated from these rows.
- Thesis figures are stored in `public/research/cluttered-grasp/` (extracted
  from the thesis PDF, not page screenshots) and referenced from
  `flagshipResearch.figures`.

### "Replace the CV"

There is no CV file to replace. Edit the data files above and `/cv` updates.
To produce a PDF, open `/cv` and use the **Print / Save as PDF** button (or the
browser's print dialog). Print styles remove navigation and decoration, use
A4 margins, keep entries from splitting across pages and print the URLs of
detail pages.

## Deploy to Vercel

1. Push the repository to GitHub (or GitLab/Bitbucket).
2. In Vercel, **Add New → Project** and import the repository. The Next.js
   preset is detected automatically; no build settings need to change.
3. Optional environment variable: `NEXT_PUBLIC_SITE_URL=https://your-domain.tld`
   once a custom domain is set up. Without it, the production `*.vercel.app` URL
   (`VERCEL_PROJECT_PRODUCTION_URL`) is used for canonical URLs, OpenGraph, the
   sitemap and printed CV links.
4. Optional: set `ENABLE_EXPERIMENTAL_COREPACK=1` so Vercel uses exactly the pnpm
   version pinned in `package.json`. Without it, Vercel picks a pnpm version
   compatible with the lockfile.

## Project structure

```
app/                 routes, metadata, OG image, icons, robots, sitemap
components/
  layout/            header (incl. mobile menu), footer, theme toggle
  home/              hero, current interests
  research/          ResearchPipeline, ResearchArchitectureDiagram, ResearchCard, FeaturedResearch
  projects/          ProjectCard
  education/         EducationTimeline
  awards/            AwardItem / AwardsList
  skills/            SkillsGrid
  contact/           ContactCTA
  cv/                CV section/entry primitives
  ui/                Container, SectionHeading, PageHeader, ButtonLink, TechnologyTag, Reveal, …
data/                all content (see above)
lib/                 small utilities (site URL, metadata helper, formatting)
```

Design notes: light, paper-toned theme first; dark theme follows the system
setting and can be toggled. Colours are CSS variables in `app/globals.css`
(the three research themes each have a colour used consistently in the
pipeline, cards and diagrams).
