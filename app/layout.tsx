import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import IdleLogout from "@/components/IdleLogout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ValueableBlogs",
  description: "A modern platform to write and explore ideas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-br from-indigo-900 via-black to-purple-900 text-white`}
      >
        <Navbar />

        <main className="pt-16">
          {children}
        </main>

        <IdleLogout />
      </body>
    </html>
  );
}