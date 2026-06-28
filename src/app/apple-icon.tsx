import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS ana ekran ikonu — turuncu zemin, beyaz "PU". */
export default function AppleIcon(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f77300",
          color: "#ffffff",
          fontSize: 96,
          fontWeight: 700,
          fontFamily: "serif",
        }}
      >
        PU
      </div>
    ),
    { ...size },
  );
}
