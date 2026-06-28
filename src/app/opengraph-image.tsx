import { ImageResponse } from "next/og";

export const alt = "DecorPU — Architectural polyurethane decoration";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Tüm sayfalar için varsayılan sosyal paylaşım görseli (marka kartı). */
export default function OpengraphImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 3, color: "#6b7178", textTransform: "uppercase" }}>
          Architectural Polyurethane Decor
        </div>
        <div style={{ display: "flex", fontSize: 150, fontWeight: 700, lineHeight: 1, marginTop: 26 }}>
          <span style={{ color: "#16171b" }}>Decor</span>
          <span style={{ color: "#f77300" }}>PU</span>
        </div>
        <div style={{ fontSize: 42, color: "#3b3e45", marginTop: 30, maxWidth: 880 }}>
          Project-based manufacturing for architects
        </div>
        <div style={{ display: "flex", marginTop: 50, height: 10, width: 180, background: "#f77300", borderRadius: 5 }} />
      </div>
    ),
    { ...size },
  );
}
