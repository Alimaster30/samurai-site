import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://bushidodigital.com"),
  title: "Bushido Digital — Premium 3D Web Experiences",
  description:
    "Precision-crafted digital experiences for startups, agencies, and SaaS companies. Specializing in immersive WebGL, Three.js, and motion-driven interfaces.",
  openGraph: {
    title: "Bushido Digital — Premium 3D Web Experiences",
    description:
      "Precision-crafted digital experiences with a warrior's discipline.",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Bushido Digital — Samurai 3D Scene",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bushido Digital",
    description: "Precision-crafted digital experiences with a warrior's discipline.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">{children}</body>
    </html>
  );
}
