import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-luxury-cream font-sans flex flex-col">
      
      {/* 1. NAVBAR */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-luxury-green rounded-lg flex items-center justify-center text-luxury-cream text-lg">⚡</div>
           <span className="font-bold text-luxury-green text-xl tracking-tight">ViralGuidify</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="text-luxury-dark font-medium hover:text-luxury-green px-4 py-2 transition-colors">
            Masuk
          </Link>
          <Link href="/dashboard" className="bg-luxury-dark text-white px-5 py-2 rounded-xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Coba Gratis
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION (Utama) */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center mt-10 mb-20">
        
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white border border-luxury-terracotta/20 shadow-sm animate-fade-in-up">
          <span className="text-xs font-bold text-luxury-terracotta tracking-widest uppercase">🚀 Rahasia Konten Banjir Orderan</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-luxury-dark mb-6 tracking-tight leading-tight max-w-4xl animate-fade-in-up delay-100">
          Bikin Caption Viral <br/>
          <span className="text-luxury-green/80 italic font-serif">Tanpa Mikir.</span>
        </h1>

        <p className="text-lg md:text-xl text-luxury-dark/60 max-w-2xl mb-10 leading-relaxed animate-fade-in-up delay-200">
          Upload foto produkmu, biarkan AI yang meracik caption "Lokal & Gaul" + hashtag tertarget. Fokus jualan, biar kami yang urus tulisan.
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto animate-fade-in-up delay-300">
          <Link href="/dashboard" className="bg-luxury-dark text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2">
            Mulai Sekarang ✨
          </Link>
          
          {/* TOMBOL "LIHAT CONTOH" SUDAH DIGANTI KE PRICING */}
          <Link href="/pricing" className="bg-white text-luxury-dark border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all hover:border-luxury-green hover:text-luxury-green flex items-center justify-center gap-2">
            Lihat Harga 💎
          </Link>
        </div>

        {/* 3. FITUR HIGHLIGHT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full text-left">
          <div className="bg-white p-6 rounded-2xl border border-luxury-terracotta/10 shadow-sm hover:shadow-md transition-all">
            <div className="text-3xl mb-4">🇮🇩</div>
            <h3 className="font-bold text-luxury-dark text-lg mb-2">Bahasa Gaul Alami</h3>
            <p className="text-gray-500 text-sm">Bukan bahasa robot kaku. AI kami paham bahasa jaksel, santai, hingga formal sopan.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-luxury-terracotta/10 shadow-sm hover:shadow-md transition-all">
            <div className="text-3xl mb-4">👁️</div>
            <h3 className="font-bold text-luxury-dark text-lg mb-2">Vision AI Cerdas</h3>
            <p className="text-gray-500 text-sm">Cukup upload foto, AI akan "melihat" detail produkmu dan membuat deskripsi yang akurat.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-luxury-terracotta/10 shadow-sm hover:shadow-md transition-all">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="font-bold text-luxury-dark text-lg mb-2">Hashtag Generator</h3>
            <p className="text-gray-500 text-sm">Riset hashtag manual itu capek. Dapatkan rekomendasi hashtag yang sedang naik daun.</p>
          </div>
        </div>

      </main>

      {/* 4. FOOTER (Sudah Bersih dari Refund) */}
      <footer className="border-t border-luxury-dark/5 py-12 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
             <span className="font-bold text-luxury-green text-lg tracking-tight">ViralGuidify</span>
             <p className="text-gray-400 text-sm mt-1">© 2025 Buatan Lokal. All rights reserved.</p>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-gray-500">
            <Link href="/terms" className="hover:text-luxury-green transition-colors">Syarat & Ketentuan</Link>
            <Link href="/privacy" className="hover:text-luxury-green transition-colors">Privasi</Link>
            <Link href="/contact" className="hover:text-luxury-green transition-colors">Hubungi Kami</Link>
            {/* LINK REFUND SUDAH DIHAPUS DARI SINI */}
          </div>
        </div>
      </footer>

    </div>
  );
}