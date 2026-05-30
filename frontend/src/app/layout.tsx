import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import LenisProvider from "@/components/layout/LenisProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Scene from "@/components/canvas/Scene";

import { Instrument_Sans } from "next/font/google";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HINEET TECH — Building Everyday Experiences",
  description: "A connected ecosystem of technology, commerce, culture, and convenience. Designed for the future.",
  icons: {
    icon: "/logo.png",
  },
};

import { ThemeProvider } from "@/components/layout/ThemeProvider";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeBootstrap = `
    (() => {
      try {
        const storedTheme = localStorage.getItem('theme');
        const theme = storedTheme === 'light' ? 'light' : 'dark';
        const root = document.documentElement;
        root.dataset.theme = theme;
        root.classList.toggle('dark', theme === 'dark');
        root.classList.toggle('theme-light', theme === 'light');
        root.style.colorScheme = theme;
      } catch (error) {}
    })();
  `;

  return (
    <html lang="en" className={`${instrumentSans.variable} font-sans`} suppressHydrationWarning>
      <head>
        <Script id="theme-bootstrap" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="antialiased bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200" suppressHydrationWarning>
        <ThemeProvider>
          <div className="noise-bg"></div>
          {/* Ambient background */}
          <div className="fixed inset-0 z-[-1] page-bg pointer-events-none" />
          {/* Subtle grid overlay */}
          <div className="fixed inset-0 z-[-1] grid-overlay opacity-100 pointer-events-none" />
          <Scene />
          <LenisProvider>
            <LoadingScreen />
            <Navbar />
            <main className="min-h-screen relative z-10">{children}</main>
            <Footer />
            <ThemeToggle />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
