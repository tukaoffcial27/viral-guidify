import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Import komponen yang baru kita buat
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Viral Guidify - AI Caption Generator",
  description: "Bikin caption viral dalam 5 detik.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-luxury-cream text-luxury-dark`}
      >
        {/* Navbar akan selalu muncul di atas */}
        <Navbar />
        
        {/* Ini adalah isi halaman (Home, Login, Dashboard, dll) */}
        {children}
        
        {/* Footer akan selalu muncul di bawah */}
        <Footer />
      </body>
    </html>
  );
}