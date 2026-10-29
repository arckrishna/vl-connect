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
    icon: [
      { url: "/ves-icon.png?v=2", type: "image/png" },
      { url: "/favicon.ico?v=2" },
    ],
    shortcut: "/ves-icon.png?v=2",
    apple: "/apple-icon.png?v=2",
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
      <head>
        <link rel="icon" href="/ves-icon.png?v=2" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/ves-icon.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=2" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF9F6] text-[#1E2024]">
        {children}
      </body>
    </html>
  );
}
