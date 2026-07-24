import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "EduNav AI — Your Career Counselor, On Demand",
  description:
    "EduNav AI is a 24/7 AI-powered career counseling platform that talks with students, maps their interests, and builds a personalized career roadmap.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-base text-slate-100 font-body antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
