import { useId } from "react";
import type { PipelineGlyphKind } from "@/data/types";

/**
 * Small schematic drawings for the six pipeline stages. They share one
 * illustrative scene (a box, an object resting on it, a round object and an
 * upright object) so the stages read as one continuous transformation.
 * Colour comes from `currentColor`.
 */
export function PipelineGlyph({ kind, className }: { kind: PipelineGlyphKind; className?: string }) {
  const markerId = useId();

  return (
    <svg
      aria-hidden
      viewBox="0 0 80 52"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M0 0.5 7 4 0 7.5z" fill="currentColor" stroke="none" />
        </marker>
      </defs>
      {kind === "scene" && <SceneObjects strong />}
      {kind === "detection" && (
        <>
          <SceneObjects />
          <g strokeWidth="1.1" strokeDasharray="2.5 2">
            <rect x="9.5" y="23.5" width="31" height="22" rx="1" />
            <rect x="17.5" y="13.5" width="25" height="15" rx="1" />
            <rect x="39.5" y="22.5" width="21" height="21" rx="1" />
            <rect x="56" y="18.5" width="16" height="27" rx="1" />
          </g>
          <g fill="currentColor" stroke="none">
            <rect x="9.5" y="20.5" width="7" height="3" rx="0.5" />
            <rect x="17.5" y="10.5" width="7" height="3" rx="0.5" />
            <rect x="39.5" y="19.5" width="7" height="3" rx="0.5" />
            <rect x="56" y="15.5" width="7" height="3" rx="0.5" />
          </g>
        </>
      )}
      {kind === "relations" && (
        <>
          <g opacity="0.35">
            <SceneObjects faint />
          </g>
          <g strokeWidth="1.3" opacity="0.8">
            <path d="M25 35 30 21" />
            <path d="M30 21 50 33" />
            <path d="M25 35 50 33" />
            <path d="M50 33 64 32" />
          </g>
          <g fill="currentColor" stroke="none">
            <circle cx="25" cy="35" r="3.2" />
            <circle cx="30" cy="21" r="3.2" />
            <circle cx="50" cy="33" r="3.2" />
            <circle cx="64" cy="32" r="3.2" />
          </g>
        </>
      )}
      {(kind === "graph" || kind === "reasoning") && (
        <>
          <g strokeWidth="1.3">
            <path d="M36.5 14.5 27 33" markerEnd={`url(#${markerId})`} />
            <path d="M43.5 14.5 53 33" markerEnd={`url(#${markerId})`} />
            <path d="M31 39 49 39" markerEnd={`url(#${markerId})`} opacity="0.55" />
          </g>
          <g strokeWidth="1.4" fill="var(--surface)">
            <circle cx="40" cy="10" r="5" fill={kind === "reasoning" ? "currentColor" : "var(--surface)"} />
            <circle cx="25" cy="39" r="5" />
            <circle cx="55" cy="39" r="5" />
            <circle cx="68" cy="14" r="4" fill={kind === "reasoning" ? "currentColor" : "var(--surface)"} />
          </g>
          {kind === "reasoning" && (
            <g
              fill="currentColor"
              stroke="none"
              fontFamily="var(--font-mono)"
              fontSize="7"
              fontWeight="500"
            >
              <circle cx="40" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 2" />
              <text x="50" y="9">1</text>
              <text x="74" y="23">1</text>
              <text x="60.5" y="50">3</text>
              <text x="13" y="50">2</text>
            </g>
          )}
        </>
      )}
      {kind === "action" && (
        <>
          <rect
            x="29"
            y="36"
            width="22"
            height="12"
            rx="2"
            fill="currentColor"
            fillOpacity="0.16"
            strokeWidth="1.2"
          />
          <g strokeWidth="1.8">
            <path d="M40 3v10" />
            <path d="M28 13h24" />
            <path d="M30 13v13l2.5 3" />
            <path d="M50 13v13l-2.5 3" />
          </g>
          <path d="M64 14v14" strokeWidth="1.2" markerEnd={`url(#${markerId})`} opacity="0.6" />
        </>
      )}
    </svg>
  );
}

function SceneObjects({ strong = false, faint = false }: { strong?: boolean; faint?: boolean }) {
  const fillOpacity = strong ? 0.18 : faint ? 0.1 : 0.08;
  const strokeOpacity = strong ? 1 : 0.45;
  return (
    <g fill="currentColor" fillOpacity={fillOpacity} strokeOpacity={strokeOpacity} strokeWidth="1.2">
      {strong ? <rect x="1.5" y="1.5" width="77" height="49" rx="4" fill="none" strokeOpacity="0.3" /> : null}
      <rect x="12" y="26" width="26" height="17" rx="2" />
      <rect x="20" y="16" width="20" height="11" rx="2" />
      <circle cx="50" cy="33" r="9" />
      <rect x="58" y="21" width="12" height="22" rx="2" />
    </g>
  );
}
