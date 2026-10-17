import { ArrowDown, ArrowRight } from "lucide-react";
import { Fragment, useId, type ReactNode } from "react";
import { flagshipResearch } from "@/data/research";
import { cn } from "@/lib/utils";

/*
 * Schematic of the thesis pipeline:
 * Image → Detector → Object tokens → Graph reasoning → Dependency graph
 * → (downstream) Manipulation reasoning.
 *
 * One illustrative scene is carried through every stage. Object identity is
 * kept by colour: A (box), B (resting on A), C (resting on B), D (separate).
 */

const OBJ = {
  A: { color: "var(--perception)", soft: "var(--perception-soft)" },
  B: { color: "var(--understanding)", soft: "var(--understanding-soft)" },
  C: { color: "var(--manipulation)", soft: "var(--manipulation-soft)" },
  D: { color: "var(--neutral-obj)", soft: "var(--neutral-obj-soft)" },
} as const;
type ObjKey = keyof typeof OBJ;

const SCENE: Record<ObjKey, { x: number; y: number; w: number; h: number }> = {
  A: { x: 18, y: 52, w: 48, h: 24 },
  B: { x: 26, y: 36, w: 32, h: 16 },
  C: { x: 36, y: 24, w: 13, h: 12 },
  D: { x: 78, y: 40, w: 20, h: 36 },
};

const KEYS: ObjKey[] = ["A", "B", "C", "D"];

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg aria-hidden viewBox="0 0 120 90" className="h-full w-full" fill="none">
      {children}
    </svg>
  );
}

function SceneObjects({ faint = false }: { faint?: boolean }) {
  return (
    <g opacity={faint ? 0.35 : 1}>
      <path d="M8 76.5h104" stroke="var(--line-strong)" strokeWidth="1" />
      {KEYS.map((key) => {
        const o = SCENE[key];
        return (
          <rect
            key={key}
            x={o.x}
            y={o.y}
            width={o.w}
            height={o.h}
            rx="2"
            fill={OBJ[key].soft}
            stroke={OBJ[key].color}
            strokeWidth="1.3"
          />
        );
      })}
    </g>
  );
}

function ImageVisual() {
  return (
    <Frame>
      <rect x="3" y="3" width="114" height="84" rx="4" stroke="var(--line-strong)" strokeDasharray="3 3" />
      <SceneObjects />
    </Frame>
  );
}

function DetectorVisual() {
  return (
    <Frame>
      <SceneObjects faint />
      {KEYS.map((key) => {
        const o = SCENE[key];
        const pad = 3;
        return (
          <g key={key}>
            <rect
              x={o.x - pad}
              y={o.y - pad}
              width={o.w + pad * 2}
              height={o.h + pad * 2}
              rx="1.5"
              stroke={OBJ[key].color}
              strokeWidth="1.2"
              strokeDasharray="3 2"
            />
            <rect x={o.x - pad} y={o.y - pad - 8} width="9" height="8" rx="1" fill={OBJ[key].color} />
            <text
              x={o.x - pad + 4.5}
              y={o.y - pad - 2.2}
              textAnchor="middle"
              fontSize="6.5"
              fontFamily="var(--font-mono)"
              fill="var(--surface)"
            >
              {key}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

// Deterministic "feature" intensities so the drawing is identical on every render.
const FEATURES: Record<ObjKey, number[]> = {
  A: [0.9, 0.35, 0.6, 0.2, 0.75, 0.45, 0.3],
  B: [0.3, 0.8, 0.45, 0.7, 0.25, 0.9, 0.5],
  C: [0.6, 0.25, 0.85, 0.4, 0.55, 0.3, 0.8],
  D: [0.4, 0.65, 0.3, 0.9, 0.35, 0.6, 0.2],
};

function TokensVisual() {
  return (
    <Frame>
      {KEYS.map((key, row) => {
        const y = 12 + row * 18;
        return (
          <g key={key}>
            <rect x="12" y={y} width="12" height="12" rx="2" fill={OBJ[key].color} />
            <text
              x="18"
              y={y + 8.6}
              textAnchor="middle"
              fontSize="7"
              fontFamily="var(--font-mono)"
              fill="var(--surface)"
            >
              {key}
            </text>
            {FEATURES[key].map((value, i) => (
              <rect
                key={i}
                x={30 + i * 11}
                y={y + 1}
                width="9"
                height="10"
                rx="1.5"
                fill={OBJ[key].color}
                fillOpacity={0.12 + value * 0.6}
              />
            ))}
          </g>
        );
      })}
    </Frame>
  );
}

const GRAPH_POS: Record<ObjKey, { x: number; y: number }> = {
  A: { x: 28, y: 68 },
  B: { x: 42, y: 42 },
  C: { x: 62, y: 18 },
  D: { x: 94, y: 58 },
};

// Illustrative attention strengths between object pairs.
const ATTENTION: [ObjKey, ObjKey, number][] = [
  ["A", "B", 0.85],
  ["B", "C", 0.85],
  ["A", "C", 0.35],
  ["B", "D", 0.4],
  ["A", "D", 0.25],
  ["C", "D", 0.2],
];

function NodeCircle({ k, x, y, r = 7, ring = false }: { k: ObjKey; x: number; y: number; r?: number; ring?: boolean }) {
  return (
    <g>
      {ring ? (
        <circle cx={x} cy={y} r={r + 3.5} stroke={OBJ[k].color} strokeWidth="1" strokeDasharray="2 2" />
      ) : null}
      <circle cx={x} cy={y} r={r} fill={OBJ[k].soft} stroke={OBJ[k].color} strokeWidth="1.4" />
      <text
        x={x}
        y={y + 2.4}
        textAnchor="middle"
        fontSize="7"
        fontFamily="var(--font-mono)"
        fill={OBJ[k].color}
      >
        {k}
      </text>
    </g>
  );
}

function GraphReasoningVisual() {
  return (
    <Frame>
      {ATTENTION.map(([a, b, w]) => (
        <line
          key={`${a}${b}`}
          x1={GRAPH_POS[a].x}
          y1={GRAPH_POS[a].y}
          x2={GRAPH_POS[b].x}
          y2={GRAPH_POS[b].y}
          stroke="var(--ink-subtle)"
          strokeOpacity={0.2 + w * 0.6}
          strokeWidth={0.6 + w * 1.6}
        />
      ))}
      {KEYS.map((k) => (
        <NodeCircle key={k} k={k} x={GRAPH_POS[k].x} y={GRAPH_POS[k].y} />
      ))}
    </Frame>
  );
}

const DEP_POS: Record<ObjKey, { x: number; y: number }> = {
  C: { x: 42, y: 15 },
  B: { x: 42, y: 45 },
  A: { x: 42, y: 75 },
  D: { x: 88, y: 30 },
};

function DependencyGraphVisual({ markerId }: { markerId: string }) {
  return (
    <Frame>
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0.5 7 4 0 7.5z" fill="var(--ink-muted)" />
        </marker>
      </defs>
      <path d="M42 23v13.5" stroke="var(--ink-muted)" strokeWidth="1.4" markerEnd={`url(#${markerId})`} />
      <path d="M42 53v13.5" stroke="var(--ink-muted)" strokeWidth="1.4" markerEnd={`url(#${markerId})`} />
      {KEYS.map((k) => (
        <NodeCircle key={k} k={k} x={DEP_POS[k].x} y={DEP_POS[k].y} ring={k === "C" || k === "D"} />
      ))}
      <text x="88" y="51" textAnchor="middle" fontSize="6" fontFamily="var(--font-mono)" fill="var(--ink-subtle)">
        free
      </text>
      <text x="60" y="17.2" fontSize="6" fontFamily="var(--font-mono)" fill="var(--ink-subtle)">
        free
      </text>
    </Frame>
  );
}

function StageVisual({ id, markerId }: { id: string; markerId: string }) {
  switch (id) {
    case "image":
      return <ImageVisual />;
    case "detector":
      return <DetectorVisual />;
    case "tokens":
      return <TokensVisual />;
    case "graph-reasoning":
      return <GraphReasoningVisual />;
    case "dependency-graph":
      return <DependencyGraphVisual markerId={markerId} />;
    default:
      return null;
  }
}

const GRASP_ORDER: { step: number; objects: ObjKey[]; note: string }[] = [
  { step: 1, objects: ["C", "D"], note: "free now" },
  { step: 2, objects: ["B"], note: "after C" },
  { step: 3, objects: ["A"], note: "after B" },
];

function ObjectChip({ k }: { k: ObjKey }) {
  return (
    <span
      className="inline-flex size-6 items-center justify-center rounded-md border font-mono text-xs"
      style={{ borderColor: OBJ[k].color, color: OBJ[k].color, background: OBJ[k].soft }}
    >
      {k}
    </span>
  );
}

interface DiagramProps {
  className?: string;
  figureLabel?: string;
}

export function ResearchArchitectureDiagram({ className, figureLabel = "Figure 1" }: DiagramProps) {
  const markerId = useId();
  const stages = flagshipResearch.architecture.filter((s) => s.id !== "manipulation");
  const downstream = flagshipResearch.architecture.find((s) => s.id === "manipulation");

  return (
    <figure className={cn("avoid-break", className)}>
      <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-0">
        {stages.map((stage, index) => (
          <Fragment key={stage.id}>
            <div className="group flex flex-1 flex-row overflow-hidden rounded-xl border border-line bg-surface transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-line-strong lg:flex-col">
              <div className="aspect-[4/3] w-32 shrink-0 border-r border-line bg-surface-muted p-2 sm:w-40 lg:w-full lg:border-r-0 lg:border-b">
                <StageVisual id={stage.id} markerId={markerId} />
              </div>
              <div className="flex flex-col justify-center p-3 lg:justify-start">
                <p className="font-mono text-[0.6875rem] text-ink-subtle">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-0.5 text-[0.9375rem] leading-snug font-medium text-ink">{stage.label}</p>
                {stage.method ? (
                  <p className="mt-1 font-mono text-[0.75rem] leading-snug text-accent">{stage.method}</p>
                ) : null}
                <p className="mt-1 text-[0.8125rem] leading-snug text-ink-subtle">{stage.detail}</p>
                {stage.badge ? (
                  <p className="mt-2 inline-flex w-fit rounded border border-accent/50 bg-accent-soft px-1.5 py-0.5 font-mono text-[0.6875rem] text-accent-strong">
                    {stage.badge}
                  </p>
                ) : null}
              </div>
            </div>
            {index < stages.length - 1 ? (
              <div aria-hidden className="flex items-center justify-center text-line-strong lg:w-7 lg:shrink-0">
                <ArrowDown className="size-4 lg:hidden" />
                <ArrowRight className="hidden size-4 lg:block" />
              </div>
            ) : null}
          </Fragment>
        ))}
      </div>

      {downstream ? (
        <>
          <div aria-hidden className="flex justify-center py-2 text-line-strong lg:justify-end lg:pr-[9%]">
            <ArrowDown className="size-4" />
          </div>
          <div className="rounded-xl border border-dashed border-line-strong bg-surface px-4 py-4 sm:px-5">
            <div className="grid gap-4 lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-center lg:gap-8">
              <div>
                <p className="font-mono text-[0.6875rem] tracking-wide text-ink-subtle uppercase">
                  {String(stages.length + 1).padStart(2, "0")} · Downstream use · not part of the thesis
                </p>
                <p className="mt-1 text-[0.9375rem] font-medium text-ink">{downstream.label}</p>
                <p className="mt-0.5 text-[0.8125rem] leading-snug text-ink-subtle">{downstream.detail}</p>
              </div>
              <ol className="grid gap-2 sm:grid-cols-3" aria-label="Illustrative grasp order derived from the example graph">
                {GRASP_ORDER.map((entry) => (
                  <li
                    key={entry.step}
                    className="flex min-w-0 items-center gap-2.5 rounded-lg bg-surface-muted px-3 py-2"
                  >
                    <span className="font-mono text-xs text-ink-subtle">{entry.step}.</span>
                    <span className="flex gap-1">
                      {entry.objects.map((k) => (
                        <ObjectChip key={k} k={k} />
                      ))}
                    </span>
                    <span className="text-[0.8125rem] leading-snug text-ink-muted">{entry.note}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </>
      ) : null}

      <figcaption className="mt-4 max-w-[80ch] text-[0.8125rem] leading-relaxed text-ink-subtle">
        <span className="font-medium text-ink-muted">{figureLabel}.</span> Schematic of the thesis
        pipeline (01–05) and the downstream use it is intended for (06, not implemented). An edge
        X → Y means X has to be removed before Y can be grasped. The direction loss added in the
        thesis supervises the orientation of these edges. Scene, relations and grasp order are
        illustrative, not experimental output; real model outputs are shown in the qualitative
        examples on the thesis page.
      </figcaption>
    </figure>
  );
}
