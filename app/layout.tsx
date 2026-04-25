import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import LayoutClient from "@/components/LayoutClient";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "La Forza",
  description: "Elite gym. Zero excuses.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          #css-loader {
            position: fixed;
            inset: 0;
            z-index: 9999;
            background: #0A0A0A;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            animation: loaderExit 1s ease forwards 1.5s;
          }
          #css-loader-icon {
            opacity: 0;
            animation: loaderFadeUp 0.3s ease forwards 0.2s;
          }
          #css-loader-wordmark {
            font-size: 72px;
            color: #F5F5F5;
            letter-spacing: 0.05em;
            font-family: var(--font-bebas), sans-serif;
            opacity: 0;
            transform: translateY(16px);
            animation: loaderFadeUp 0.1s ease forwards 0.2s;
          }
          #css-loader-line {
            height: 1px;
            background: #FF2020;
            width: 0%;
            margin-top: 8px;
            animation: loaderLine 0.2s ease forwards 0.3s;
          }
          #css-loader-caption {
            margin-top: 16px;
            font-size: 15px;
            letter-spacing: 0.35em;
            color: #555;
            font-family: var(--font-dm-sans), sans-serif;
            opacity: 0;
            animation: loaderFadeUp 0.1s ease forwards 1s;
          }
          @keyframes loaderFadeUp {
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes loaderLine {
            to { width: 100%; }
          }
          @keyframes loaderExit {
            to { opacity: 0; pointer-events: none; visibility: hidden; }
          }
        `}} />
      </head>
      <body className="font-body bg-dark text-white antialiased">
        <div id="css-loader">
          <svg
            id="css-loader-icon"
            width="80"
            height="20"
            viewBox="0 0 120 30"
            aria-hidden="true"
          >
            <path
              d="M5 15H115M5 10V20M10 8V22M110 8V22M115 10V20"
              stroke="#FF2020"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div id="css-loader-wordmark">La Forza</div>
          <div id="css-loader-line" />
          <p id="css-loader-caption">Raising the bar...</p>
        </div>

        <div className="noise-overlay" />
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}