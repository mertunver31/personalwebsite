import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#0a0810",
          color: "#fff",
          padding: "80px",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(900px 520px at 82% 6%, rgba(34,211,238,0.22), transparent 60%), radial-gradient(760px 520px at 6% 96%, rgba(236,72,153,0.18), transparent 60%)",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#e0a23a",
            fontWeight: 700,
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 800,
            marginTop: 10,
            lineHeight: 1.05,
            backgroundImage: "linear-gradient(90deg,#22d3ee,#8b5cf6,#ec4899)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 700,
            marginTop: 18,
            color: "#eafdff",
          }}
        >
          {profile.role.en}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 25,
            marginTop: 18,
            color: "#a9b6c8",
            maxWidth: 920,
          }}
        >
          {profile.tagline.en}
        </div>
      </div>
    ),
    { ...size },
  );
}
