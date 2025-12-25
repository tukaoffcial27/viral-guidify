import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Import komponen
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

// --- SETTING SEO & VERIFIKASI ---
export const metadata: Metadata = {
  // 1. Judul & Deskripsi Utama
  title: {
    default: "ViralGuidify - AI Caption Generator & Hashtag Viral",
    template: "%s | ViralGuidify"
  },
  description: "Buat caption jualan viral dalam 5 detik dengan AI. Cocok untuk UMKM, Dropshipper, dan Konten Kreator. Support Bahasa Gaul & Vision AI.",
  
  // 2. Kata Kunci (Untuk Google Search)
  keywords: ["AI Caption Generator", "Pembuat Caption Otomatis", "Viral Caption", "Hashtag Generator Indonesia", "Tools UMKM", "Copywriting AI"],
  
  // 3. Verifikasi Google Search Console (YANG BAPAK MINTA)
  verification: {
    google: 'F8-qAir322zBSKzxINGeb_ahWPg-JPWwtIBUBm-Osik',
  },

  // 4. OpenGraph (Tampilan saat link disebar di WA/FB)
  openGraph: {
    title: "ViralGuidify - Bikin Caption Viral Tanpa Mikir",
    description: "Upload foto produk, jadi caption siap posting! Coba gratis sekarang.",
    url: 'https://viral.guidify.app',
    siteName: 'ViralGuidify',
    locale: 'id_ID',
    type: 'website',
  },

  // 5. Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: "ViralGuidify - AI Caption Generator",
    description: "Rahasia konten banjir orderan untuk UMKM Indonesia.",
  },
  
  // 6. Ikon & Bot
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
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
        {/* Navbar Global (Akan muncul di Dashboard/Login, tapi mungkin tertumpuk di Home karena Home punya nav sendiri) */}
        {/* Kita biarkan saja, karena page.tsx sudah kita rapikan */}
        <Navbar />
        
        {children}
        
        <Footer />
      </body>
    </html>
  );
}