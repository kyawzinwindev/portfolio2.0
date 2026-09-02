import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Kyaw Zin Win — Backend Engineer | KZW OS",
  description:
    "Portfolio and system architecture log of Kyaw Zin Win — Backend Engineer specializing in Laravel, Livewire, MySQL, and scalable systems.",
  keywords: [
    "Kyaw Zin Win",
    "Backend Engineer",
    "Laravel",
    "Livewire",
    "PHP",
    "MySQL",
    "System Architecture",
    "KZW OS",
  ],
  authors: [{ name: "Kyaw Zin Win", url: "https://kyawzinwin.dev" }],
  openGraph: {
    title: "Kyaw Zin Win — Backend Engineer | KZW OS",
    description:
      "Backend engineer · System thinker · Architecture case studies and build records.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans antialiased flex flex-col selection:bg-[#8B5CF6]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
