import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "PAIMANA+ | AI Predictive Analytics & Early Warning System",
  description: "SIH 2026 Concept Prototype — AI-powered infrastructure project risk intelligence platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-black">{children}</body>
    </html>
  );
}
