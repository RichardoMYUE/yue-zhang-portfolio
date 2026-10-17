import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1e4277",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32">
          <path
            d="M16 9.5 10 20.5M16 9.5l6 11M11 22h10"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.6"
            fill="none"
          />
          <circle cx="16" cy="9" r="3" fill="#ffffff" />
          <circle cx="9.5" cy="22" r="2.9" fill="#1e4277" stroke="#ffffff" strokeWidth="1.8" />
          <circle cx="22.5" cy="22" r="2.9" fill="#1e4277" stroke="#ffffff" strokeWidth="1.8" />
        </svg>
      </div>
    ),
    size,
  );
}
