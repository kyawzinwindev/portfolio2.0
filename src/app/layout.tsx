import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Kyaw Zin Win — Backend & Systems Engineer",
  description:
    "Backend & Systems Engineer. Laravel services, versioned APIs, and AWS deployments that stay up. Open to full-time and contract roles.",
  keywords: [
    "Kyaw Zin Win",
    "Backend Engineer",
    "Systems Engineer",
    "Laravel",
    "AWS",
    "REST APIs",
  ],
  authors: [{ name: "Kyaw Zin Win", url: "https://kyawzinwin.dev" }],
  openGraph: {
    title: "Kyaw Zin Win — Backend & Systems Engineer",
    description:
      "Backend & Systems Engineer. Laravel services, versioned APIs, and AWS deployments that stay up.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F6F6F3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-canvas`}
    >
      <body className="min-h-screen bg-canvas text-ink font-sans antialiased selection:bg-volt selection:text-canvas">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
