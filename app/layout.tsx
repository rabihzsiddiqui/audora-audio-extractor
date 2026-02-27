import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "audoRa - Browser-based Audio Extractor",
  description:
    "Extract MP3 audio from a video file, locally in your browser. No uploads, no servers.",
  keywords: ["audio extractor", "mp3 converter", "browser ffmpeg", "local conversion"],
  openGraph: {
    title: "audoRa",
    description: "Extract MP3 audio from a video file, locally in your browser.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} font-[family-name:var(--font-geist-sans)] antialiased bg-[#09090b] text-zinc-100 min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
