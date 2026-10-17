"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { pipelineGroups, pipelineStages } from "@/data/research";
import type { PillarId, PipelineStage } from "@/data/types";
import { cn } from "@/lib/utils";
import { PipelineGlyph } from "./PipelineGlyph";

const groupColor: Record<PillarId, string> = {
  perception: "var(--perception)",
  understanding: "var(--understanding)",
  manipulation: "var(--manipulation)",
};

const groupSoft: Record<PillarId, string> = {
  perception: "var(--perception-soft)",
  understanding: "var(--understanding-soft)",
  manipulation: "var(--manipulation-soft)",
};

const coverageLabel: Record<PipelineStage["coverage"], string> = {
  thesis: "Covered in my B.Sc. thesis",
  next: "Next research step — not yet done",
};

function groupLabel(id: PillarId) {
  return pipelineGroups.find((group) => group.id === id)?.label ?? id;
}

function stageStyle(stage: PipelineStage): CSSProperties {
  return {
    "--stage": groupColor[stage.group],
    "--stage-soft": groupSoft[stage.group],
  } as CSSProperties;
}

/**
 * Interactive overview of the research narrative:
 * visual scene → detection → relations → dependency graph → reasoning → action.
 *
 * ≥ lg: a horizontal tab list with a shared detail panel.
 * < lg: a vertical pipeline with expandable stages.
 */
export function ResearchPipeline({ initialStage }: { initialStage?: string }) {
  const initial = Math.max(
    0,
    pipelineStages.findIndex((stage) => stage.id === initialStage),
  );
  const [active, setActive] = useState(initial);
  const [expanded, setExpanded] = useState<number | null>(initial);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();
  const stage = pipelineStages[active];
  const count = pipelineStages.length;

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (index + 1) % count;
    if (event.key === "ArrowLeft") next = (index - 1 + count) % count;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = count - 1;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      {/* ---------- Desktop: horizontal pipeline ---------- */}
      <div className="hidden lg:block">
        <div className="mb-3 grid grid-cols-6 gap-x-6" aria-hidden>
          {pipelineGroups.map((group) => {
            const span = pipelineStages.filter((s) => s.group === group.id).length;
            return (
              <div key={group.id} style={{ gridColumn: `span ${span} / span ${span}` }}>
                <div className="h-0.5 rounded-full" style={{ background: groupColor[group.id] }} />
                <p className="eyebrow mt-2" style={{ color: groupColor[group.id] }}>
                  {group.label}
                </p>
              </div>
            );
          })}
        </div>

        <div role="tablist" aria-label="Research pipeline stages" className="grid grid-cols-6 gap-x-6">
          {pipelineStages.map((item, index) => {
            const selected = index === active;
            const onPath = index < active;
            return (
              <div key={item.id} className="@container relative" style={stageStyle(item)}>
                <button
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  className={cn(
                    "relative flex h-full w-full flex-col rounded-xl border bg-surface p-3 text-left transition-[transform,border-color,box-shadow] duration-200",
                    selected
                      ? "-translate-y-0.5 border-[var(--stage)] shadow-card"
                      : "border-line hover:-translate-y-0.5 hover:border-line-strong",
                    item.coverage === "next" && "border-dashed",
                  )}
                >
                  <span
                    className="flex aspect-[80/52] w-full items-center justify-center rounded-lg p-2 transition-colors duration-200"
                    style={{
                      background: selected ? "var(--stage-soft)" : "var(--surface-muted)",
                      color: selected || onPath ? "var(--stage)" : "var(--ink-subtle)",
                    }}
                  >
                    <PipelineGlyph kind={item.glyph} className="h-full w-full" />
                  </span>
                  <span className="mt-3 flex items-center justify-between font-mono text-[0.6875rem] text-ink-subtle">
                    {String(index + 1).padStart(2, "0")}
                    <CoverageDot coverage={item.coverage} />
                  </span>
                  <span className="mt-1 block text-[0.9375rem] leading-snug font-medium text-ink">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[0.8125rem] leading-snug text-ink-subtle">
                    {item.summary}
                  </span>
                </button>

                {index < count - 1 ? (
                  <Connector active={index < active} flowing={index === active - 1} />
                ) : null}
              </div>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${stage.id}`}
          className="mt-6 overflow-hidden rounded-xl border border-line bg-surface"
          style={stageStyle(stage)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={stage.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-[1.15fr_1fr] gap-10 p-6"
            >
              <StageDetail stage={stage} index={active} />
            </m.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ---------- Mobile & tablet: vertical pipeline ---------- */}
      <ol className="lg:hidden">
        {pipelineStages.map((item, index) => {
          const open = expanded === index;
          const firstInGroup = index === 0 || pipelineStages[index - 1].group !== item.group;
          const last = index === count - 1;
          const buttonId = `${baseId}-m-btn-${item.id}`;
          const panelId = `${baseId}-m-panel-${item.id}`;
          return (
            <li key={item.id} className="relative pl-9 sm:pl-11" style={stageStyle(item)}>
              <span
                aria-hidden
                className={cn(
                  "absolute left-[0.6875rem] w-px bg-line-strong sm:left-[0.9375rem]",
                  index === 0 ? "top-[3.8125rem]" : "top-0",
                  last ? "h-[2.0625rem]" : "bottom-0",
                )}
              />

              {firstInGroup ? (
                <p className="eyebrow pt-1 pb-2" style={{ color: "var(--stage)" }}>
                  {groupLabel(item.group)}
                </p>
              ) : null}

              <div className={cn("pb-3", last && "pb-0")}>
                <h3 className="relative">
                  <span
                    aria-hidden
                    className="absolute top-1/2 -left-9 flex size-6 -translate-y-1/2 items-center justify-center rounded-full border bg-paper font-mono text-[0.625rem] sm:-left-10"
                    style={{ borderColor: "var(--stage)", color: "var(--stage)" }}
                  >
                    {index + 1}
                  </span>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setExpanded(open ? null : index)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border bg-surface p-2.5 text-left transition-colors",
                      open ? "border-[var(--stage)]" : "border-line",
                      item.coverage === "next" && "border-dashed",
                    )}
                  >
                    <span
                      className="flex h-11 w-[4.25rem] shrink-0 items-center justify-center rounded-lg p-1.5"
                      style={{
                        background: open ? "var(--stage-soft)" : "var(--surface-muted)",
                        color: "var(--stage)",
                      }}
                    >
                      <PipelineGlyph kind={item.glyph} className="h-full w-full" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.9375rem] leading-snug font-medium text-ink">
                        {item.title}
                      </span>
                      <span className="block text-[0.8125rem] text-ink-subtle">{item.summary}</span>
                    </span>
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "size-4 shrink-0 text-ink-subtle transition-transform duration-200",
                        open && "rotate-180",
                      )}
                    />
                  </button>
                </h3>
                {open ? (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="space-y-5 px-1 pt-4 pb-3"
                  >
                    <StageDetail stage={item} index={index} compact />
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8125rem] text-ink-subtle">
        <span className="inline-flex items-center gap-2">
          <CoverageDot coverage="thesis" /> {coverageLabel.thesis}
        </span>
        <span className="inline-flex items-center gap-2">
          <CoverageDot coverage="next" /> {coverageLabel.next}
        </span>
      </p>
    </div>
  );
}

function StageDetail({
  stage,
  index,
  compact = false,
}: {
  stage: PipelineStage;
  index: number;
  compact?: boolean;
}) {
  return (
    <>
      <div>
        {!compact ? (
          <p className="eyebrow" style={{ color: "var(--stage)" }}>
            Stage {String(index + 1).padStart(2, "0")} · {groupLabel(stage.group)}
          </p>
        ) : null}
        {!compact ? (
          <h3 className="mt-2 font-serif text-xl font-semibold text-ink">{stage.title}</h3>
        ) : null}
        <p className={cn("leading-relaxed text-ink-muted", compact ? "text-[0.9375rem]" : "mt-2")}>
          {stage.description}
        </p>
      </div>
      <div>
        <p className="eyebrow">{stage.coverage === "thesis" ? "In my work" : "Closest related work"}</p>
        <ul className="mt-2 space-y-1.5">
          {stage.evidence.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="group text-[0.9375rem] leading-snug text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-[var(--stage)]"
              >
                {item.label}
                <ArrowUpRight
                  aria-hidden
                  className="ml-1 inline size-3.5 align-[-0.125em] text-ink-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] text-ink-subtle">
          <CoverageDot coverage={stage.coverage} />
          {coverageLabel[stage.coverage]}
        </p>
      </div>
    </>
  );
}

function CoverageDot({ coverage }: { coverage: PipelineStage["coverage"] }) {
  return coverage === "thesis" ? (
    <span aria-hidden className="inline-block size-2 rounded-full bg-[var(--stage,var(--accent))]" />
  ) : (
    <span
      aria-hidden
      className="inline-block size-2 rounded-full border border-[var(--stage,var(--ink-subtle))]"
    />
  );
}

/** Arrow between two desktop nodes; animates along the path to the active node. */
function Connector({ active, flowing }: { active: boolean; flowing: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 12"
      className="pointer-events-none absolute top-[calc(0.75rem+1px+(100cqw-1.5rem-2px)*0.325)] left-full z-10 h-3 w-6 -translate-y-1/2"
      fill="none"
    >
      <path
        d="M2 6h17"
        stroke={active ? "var(--stage)" : "var(--line-strong)"}
        strokeWidth="1.5"
        className={flowing ? "flow-line" : undefined}
      />
      <path
        d="M17 2.5 21 6l-4 3.5"
        stroke={active ? "var(--stage)" : "var(--line-strong)"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
