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
  title: "DesignSphere | Department of Computer Engineering, VESIT",
  description:
    "Official Virtual Labs and Engineering Repository crafted by students of Department of Computer Engineering, Vivekanand Education Society's Institute of Technology (VESIT - Autonomous), Chembur, Mumbai.",
  icons: {
    icon: [
      { url: "/designsphere-icon.png", type: "image/png" },
      { url: "/designsphere-app-icon.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/designsphere-icon.png",
    apple: "/apple-icon.png",
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
        <link rel="icon" href="/designsphere-icon.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/designsphere-icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF9F6] text-[#1E2024]">
        {children}
      </body>
    </html>
  );
}
