import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "예이린 - 취약계층 아동을 위한 건강 관리 시스템";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #FFF8E7 0%, #FFFFFF 50%, #FFF8E7 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo Circle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <svg width="120" height="120" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#FFD43B" strokeWidth="8" />
            <path
              d="M50 25 C35 25, 25 40, 25 50 C25 65, 40 75, 50 85 C60 75, 75 65, 75 50 C75 40, 65 25, 50 25"
              fill="#FFD43B"
            />
            <circle cx="42" cy="45" r="4" fill="#FF6B6B" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#FFB800",
            marginBottom: 20,
            letterSpacing: "-0.02em",
          }}
        >
          예이린
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "#666666",
            marginBottom: 16,
          }}
        >
          Health Care System for Your Child
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 24,
            color: "#888888",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          기술로 돌봄을 새롭게, 아이들의 내일을 따뜻하게
        </div>

        {/* Bottom Badge */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 24px",
            background: "#FFD43B",
            borderRadius: 30,
          }}
        >
          <span style={{ fontSize: 18, color: "#333333", fontWeight: 600 }}>
            사회적협동조합 예이린
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
