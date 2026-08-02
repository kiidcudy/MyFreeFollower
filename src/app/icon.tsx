import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

function LogoMark({ size: px }: { size: number }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={px}
      height={px}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="11" fill="#ffffff" />
      <path
        d="M8 34C14 22 18 16 24 16C30 16 34 22 40 34"
        stroke="#0077ed"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M12 28C16 20 19 15 24 15C29 15 32 20 36 28"
        stroke="#5ac8fa"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="14" cy="30" r="3" fill="#0077ed" />
      <circle cx="24" cy="18" r="3.5" fill="#5ac8fa" />
      <circle cx="34" cy="30" r="3" fill="#30d158" />
      <path
        d="M24 18V10M24 10L20 14M24 10L28 14"
        stroke="#0077ed"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <LogoMark size={28} />
      </div>
    ),
    { ...size },
  );
}
