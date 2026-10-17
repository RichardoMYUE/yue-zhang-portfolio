import { profile } from "@/data/profile";

/**
 * Future research interests. Styled with dashed outlines and hollow markers so
 * they read as direction, not as experience (matches the pipeline legend).
 */
export function CurrentInterests() {
  return (
    <div className="rounded-2xl border border-dashed border-line-strong p-5 sm:p-6">
      <p className="flex items-center gap-2 text-[0.8125rem] text-ink-subtle">
        <span aria-hidden className="inline-block size-2 rounded-full border border-ink-subtle" />
        Future research interests
      </p>
      <ol className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {profile.currentlyInterestedIn.map((topic, index) => (
          <li key={topic} className="flex gap-3">
            <span className="font-mono text-[0.75rem] leading-6 text-ink-subtle">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[1.0625rem] leading-snug text-ink">{topic}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
