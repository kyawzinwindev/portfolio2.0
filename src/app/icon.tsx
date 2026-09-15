import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#38bdf8",
          borderRadius: 8,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        {"</>"}
      </div>
    ),
    {
      ...size,
    }
  );
}
