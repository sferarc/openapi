import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: siteTitle,
	description: siteDescription,
	alternates: { canonical: "/" },
	openGraph: {
		type: "website",
		url: "/",
		siteName,
		title: siteTitle,
		description: siteDescription,
	},
	twitter: { card: "summary_large_image" },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
		</html>
	);
}
