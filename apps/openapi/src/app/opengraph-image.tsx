import { ImageResponse } from "next/og";
import { siteDescription, siteName, siteUrl } from "../lib/site";

export const alt = siteName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: 80,
				background: "#0a0a0a",
				color: "#fafafa",
			}}
		>
			<div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
				<div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>{siteName}</div>
				<div style={{ fontSize: 36, lineHeight: 1.35, color: "#a3a3a3" }}>{siteDescription}</div>
			</div>
			<div style={{ fontSize: 30, color: "#d4d4d4" }}>{new URL(siteUrl).host}</div>
		</div>,
		size,
	);
}
