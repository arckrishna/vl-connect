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
  title: "VESIT VL-CONNECT | Vivekanand Education Society's Institute of Technology",
  description:
    "Official Virtual Labs and Engineering Capstone Repository crafted by students of Vivekanand Education Society's Institute of Technology (VESIT - Autonomous), Chembur, Mumbai.",
  icons: {
    icon: "/vesit-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF9F6] text-[#1E2024]">
        {children}
      </body>
    </html>
  );
}
