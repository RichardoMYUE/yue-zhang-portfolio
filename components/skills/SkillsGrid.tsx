import { TagList } from "@/components/ui/TechnologyTag";
import { skillGroups } from "@/data/skills";

/**
 * Technical background in two groups: tools Yue has used, and methods applied
 * in his projects. Research interests are shown separately as future work.
 * No proficiency bars by design.
 */
export function SkillsGrid() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {skillGroups.map((group) => (
        <section
          key={group.id}
          aria-labelledby={`skills-${group.id}`}
          className="rounded-2xl border border-line bg-surface p-5 sm:p-6"
        >
          <h3 id={`skills-${group.id}`} className="font-medium text-ink">
            {group.title}
          </h3>
          <p className="mt-0.5 text-sm text-ink-subtle">{group.note}</p>
          <dl className="mt-5 space-y-4">
            {group.categories.map((category) => (
              <div key={category.id} className="grid gap-x-4 gap-y-1.5 sm:grid-cols-[9rem_minmax(0,1fr)]">
                <dt className="pt-0.5 text-[0.8125rem] text-ink-muted">{category.title}</dt>
                <dd>
                  <TagList tags={category.skills} label={category.title} />
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
