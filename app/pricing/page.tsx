"use client";

import Link from "next/link";

export default function PricingPage() {
  // Link Tes DOKU (Rp 20.000)
  const paymentLink = "https://pay.doku.com/p-link/p/KzFonnUfSH";

  return (
    <div className="min-h-screen bg-luxury-cream font-sans flex flex-col">
      
      {/* 1. HEADER */}
      <div className="pt-24 pb-10 text-center px-4">
        <h2 className="text-luxury-green font-bold tracking-widest uppercase text-sm mb-4 animate-fade-in-up">
          Investasi Leher ke Atas
        </h2>
        <h1 className="text-4xl md:text-5xl font-bold text-luxury-dark mb-6">
          Pilih Senjata Viralmu
        </h1>
        <p className="text-luxury-dark/60 max-w-2xl mx-auto text-lg">
          Jangan biarkan kontenmu sepi penonton. Upgrade ke AI Premium dan dominasi algoritma sosial media sekarang.
        </p>
      </div>

      {/* 2. PILIHAN PAKET */}
      <div className="flex-1 flex items-start justify-center px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          
          {/* PAKET GRATIS */}
          <div className="bg-white rounded-3xl p-8 border border-luxury-terracotta/20 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <h3 className="text-2xl font-bold text-luxury-dark mb-2">Pemula (Starter)</h3>
            <p className="text-gray-500 mb-6 text-sm">Buat yang baru mau coba-coba dulu.</p>
            
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-bold text-luxury-dark">Rp 0</span>
              <span className="text-gray-400">/ selamanya</span>
            </div>

            <ul className="space-y-4 mb-8 text-luxury-dark/80">
              <li className="flex items-center gap-3"><span className="text-luxury-green text-xl">✓</span> 2x Generate Caption / hari</li>
              <li className="flex items-center gap-3 text-gray-400"><span className="text-xl">✕</span> Tidak bisa Baca Foto (Image AI)</li>
              <li className="flex items-center gap-3 text-gray-400"><span className="text-xl">✕</span> Tidak ada Hashtag Strategy</li>
            </ul>

            <Link href="/dashboard" className="block w-full py-4 rounded-xl border-2 border-luxury-dark/10 text-luxury-dark font-bold text-center hover:bg-gray-50 transition-colors">
              Pakai Paket Ini
            </Link>
          </div>

          {/* PAKET SULTAN (PREMIUM) */}
          <div className="bg-white rounded-3xl p-8 border-2 border-luxury-green shadow-2xl relative overflow-hidden transform md:-translate-y-4">
            <div className="absolute top-0 right-0 bg-luxury-green text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">PALING LARIS 🔥</div>
            
            <h3 className="text-2xl font-bold text-luxury-green mb-2">Viral Pass 👑</h3>
            <p className="text-luxury-dark/60 mb-6 text-sm">Untuk UMKM & Kreator yang serius jualan.</p>
            
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-bold text-luxury-dark">Rp 99.000</span>
              <span className="text-gray-400">/ bulan</span>
            </div>

            <ul className="space-y-4 mb-8 text-luxury-dark">
              <li className="flex items-center gap-3 font-medium"><span className="text-luxury-green">✓</span> Unlimited Caption (Tanpa Batas)</li>
              <li className="flex items-center gap-3 font-medium"><span className="text-luxury-green">✓</span> Fitur Baca Foto (Vision AI) ✨</li>
              <li className="flex items-center gap-3 font-medium"><span className="text-luxury-green">✓</span> Hashtag Riset Otomatis</li>
              <li className="flex items-center gap-3 font-medium"><span className="text-luxury-green">✓</span> Semua Pilihan Gaya Bahasa & Platform</li>
            </ul>

            {/* TOMBOL INI SEKARANG MENGARAH KE DOKU */}
            <a 
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 rounded-xl bg-luxury-green text-white font-bold text-center hover:bg-luxury-dark transition-all shadow-lg shadow-luxury-green/30 hover:-translate-y-1"
            >
              Upgrade Sekarang ⚡
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}