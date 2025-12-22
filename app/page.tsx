import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-luxury-sage/30">
      
      {/* Navbar sudah otomatis dari layout.tsx */}

      {/* HERO SECTION */}
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-luxury-terracotta/50 shadow-sm mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-luxury-alert animate-pulse"></span>
            <span className="text-xs font-bold text-luxury-dark tracking-wide uppercase">
              🚀 Rahasia Konten Banjir Orderan
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-luxury-green tracking-tight leading-[1.1] mb-6">
            Bikin Caption Viral <br/>
            <span className="text-luxury-sage font-serif italic">Tanpa Mikir.</span>
          </h1>

          <p className="text-lg text-luxury-dark/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload foto produkmu, biarkan AI yang meracik caption "Lokal & Gaul" + hashtag tertarget. Fokus jualan, biar kami yang urus tulisan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-20">
            {/* REVISI: Link ini sekarang mengarah ke Dashboard */}
            <Link 
              href="/dashboard"
              className="px-8 py-4 bg-luxury-green text-white text-lg font-bold rounded-xl hover:bg-luxury-dark transition-all shadow-xl shadow-luxury-green/25 transform hover:-translate-y-1"
            >
              Mulai Sekarang ✨
            </Link>
            
            {/* Opsi: Tombol ini bisa kita arahkan ke demo video nanti */}
            <button className="px-8 py-4 bg-white text-luxury-green border border-luxury-terracotta text-lg font-bold rounded-xl hover:bg-luxury-cream transition-all">
              Lihat Contoh
            </button>
          </div>
        </div>

        {/* FITUR GRID */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="p-8 bg-white rounded-3xl border border-luxury-terracotta/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-luxury-cream rounded-2xl flex items-center justify-center text-2xl mb-4">🇮🇩</div>
            <h3 className="text-xl font-bold text-luxury-green mb-2">Bahasa Gaul Alami</h3>
            <p className="text-luxury-dark/70 text-sm">Bukan bahasa robot kaku. AI kami paham bahasa jaksel, santai, hingga formal sopan.</p>
          </div>
           <div className="p-8 bg-white rounded-3xl border border-luxury-terracotta/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-luxury-cream rounded-2xl flex items-center justify-center text-2xl mb-4">👁️</div>
            <h3 className="text-xl font-bold text-luxury-green mb-2">Vision AI Cerdas</h3>
            <p className="text-luxury-dark/70 text-sm">Cukup upload foto. AI akan "melihat" detail produkmu dan membuat deskripsi yang akurat.</p>
          </div>
           <div className="p-8 bg-white rounded-3xl border border-luxury-terracotta/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-luxury-cream rounded-2xl flex items-center justify-center text-2xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-luxury-green mb-2">Hashtag Generator</h3>
            <p className="text-luxury-dark/70 text-sm">Riset hashtag manual itu capek. Dapatkan rekomendasi hashtag yang sedang naik daun.</p>
          </div>
        </div>
      </main>

      {/* Footer sudah otomatis dari layout.tsx */}
    </div>
  );
}