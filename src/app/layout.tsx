import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tushar Nagpal | Full Stack Developer Portfolio",
  description:
    "Portfolio of Tushar Nagpal — Full Stack Developer specializing in MERN, Next.js, and AI-powered web applications. Building scalable solutions with clean code.",
  keywords: [
    "Full Stack Developer Portfolio",
    "MERN Developer India",
    "Next.js Developer Portfolio",
    "Tushar Nagpal",
    "React Developer",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Tushar Nagpal" }],
  creator: "Tushar Nagpal",
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Tushar Nagpal | Full Stack Developer",
    description:
      "Building scalable AI-powered web applications and solving complex problems with clean code.",
    siteName: "Tushar Nagpal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tushar Nagpal | Full Stack Developer",
    description:
      "Building scalable AI-powered web applications and solving complex problems with clean code.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tushar Nagpal",
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer specializing in MERN, Next.js, and AI-powered web applications.",
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "MongoDB",
  ],
  url: "https://tusharnagpal.dev",
  sameAs: [
    "https://github.com/TusharNagpal-1",
    "https://www.linkedin.com/in/tushar-nagpal-a6aa78300/",
    "https://leetcode.com/u/Tushar_Nagpal",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0F172A" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
