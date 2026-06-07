import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#e0a23a,#c2532a 55%,#8b5cf6)",
          color: "#fff",
          fontSize: 32,
          fontWeight: 800,
          fontFamily: "sans-serif",
          borderRadius: 14,
        }}
      >
        ME
      </div>
    ),
    { ...size },
  );
}
