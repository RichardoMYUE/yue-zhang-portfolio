import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const stages = ["Visual scene", "Detection", "Relations", "Dependency graph", "Manipulation"];
const stageColors = ["#2a5591", "#2a5591", "#2b7262", "#2b7262", "#92561a"];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#fafaf7",
          color: "#15171a",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#666b74",
              fontFamily: "monospace",
            }}
          >
            {`${profile.position.programme} · ${profile.position.institution}`}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>
            {profile.name}
          </div>
          <div style={{ display: "flex", marginTop: 12, fontSize: 40, color: "#2a5591" }}>
            {profile.headline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {stages.map((stage, index) => (
            <div key={stage} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  display: "flex",
                  padding: "12px 18px",
                  border: `2px ${index === stages.length - 1 ? "dashed" : "solid"} ${stageColors[index]}`,
                  borderRadius: 12,
                  background: "#ffffff",
                  fontSize: 22,
                  color: "#15171a",
                  fontFamily: "sans-serif",
                }}
              >
                {stage}
              </div>
              {index < stages.length - 1 ? (
                <svg width="22" height="14" viewBox="0 0 22 14">
                  <path d="M1 7h18M14 2l5 5-5 5" stroke="#9a9a9a" strokeWidth="2" fill="none" />
                </svg>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
