"use client";

import Link from "next/link";

export default function PricingPage() {
  // LINK DOKU LANGSUNG (TES 20RB)
  const paymentLink = "https://pay.doku.com/p-link/p/KzFonnUfSH";

  return (
    <div className="min-h-screen bg-luxury-cream font-sans flex flex-col">
      <div className="pt-24 pb-10 text-center px-4">
        <h2 className="text-luxury-green font-bold tracking-widest uppercase text-sm mb-4">Investasi Leher ke Atas</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-luxury-dark mb-6">Pilih Senjata Viralmu</h1>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          
          {/* FREE PLAN */}
          <div className="bg-white rounded-3xl p-8 border border-luxury-terracotta/20 shadow-sm">
            <h3 className="text-2xl font-bold text-luxury-dark mb-2">Pemula (Starter)</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-bold text-luxury-dark">Rp 0</span>
              <span className="text-gray-400">/ selamanya</span>
            </div>
            <Link href="/dashboard" className="block w-full py-4 rounded-xl border-2 border-luxury-dark/10 text-luxury-dark font-bold text-center hover:bg-gray-50">
              Pakai Gratisan Dulu
            </Link>
          </div>

          {/* PREMIUM PLAN */}
          <div className="bg-white rounded-3xl p-8 border-2 border-luxury-green shadow-2xl relative overflow-hidden transform md:-translate-y-4">
            <div className="absolute top-0 right-0 bg-luxury-green text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">PALING LARIS 🔥</div>
            <h3 className="text-2xl font-bold text-luxury-green mb-2">Viral Pass 👑</h3>
            
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-bold text-luxury-dark">Rp 99.000</span>
              <span className="text-gray-400">/ bulan</span>
            </div>

            <ul className="space-y-4 mb-8 text-luxury-dark">
               <li>✅ Unlimited Caption</li>
               <li>✅ Fitur Baca Foto (Vision AI)</li>
               <li>✅ Akses Semua Gaya Bahasa</li>
            </ul>

            {/* TOMBOL LANGSUNG KE DOKU */}
            <a 
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 rounded-xl bg-luxury-green text-white font-bold text-center hover:bg-luxury-dark transition-all shadow-lg"
            >
              Upgrade Sekarang ⚡
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}