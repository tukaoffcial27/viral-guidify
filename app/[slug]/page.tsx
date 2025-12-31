import { Metadata } from 'next';
import cities from '../../cities.json'; // Mengarah ke root folder
import Link from "next/link";
import { notFound } from 'next/navigation';

// 1. Fungsi membuat daftar halaman (Static Generation)
export async function generateStaticParams() {
  return cities.map((city) => ({
    slug: city.slug,
  }));
}

// 2. Fungsi Meta SEO (Aman untuk Next.js 15)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params; // Wajib di-await di Next.js 15
  const cityData = cities.find((c) => c.slug.toLowerCase() === resolvedParams.slug.toLowerCase());
  
  if (!cityData) return { title: 'Halaman Tidak Ditemukan' };

  return {
    title: `Bikin Caption Viral di ${cityData.city} — ViralGuidify AI`,
    description: `Solusi caption produk viral untuk UMKM di ${cityData.city}.`,
  };
}

// 3. Halaman Utama Kota (Aman untuk Next.js 15)
export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params; // Wajib di-await di Next.js 15
  const cityData = cities.find((c) => c.slug.toLowerCase() === resolvedParams.slug.toLowerCase());
  
  if (!cityData) {
    notFound(); // Ini yang menyebabkan 404 jika slug tidak ditemukan di cities.json
  }

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col pt-20">
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center mt-10 mb-20">
        
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 shadow-sm">
          <span className="text-xs font-bold text-blue-600 tracking-widest uppercase italic">
            📍 Area Layanan: {cityData.city}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight max-w-4xl">
          Caption Jualan Viral <br/>
          Untuk UMKM di <span className="text-blue-600">{cityData.city}</span>
        </h1>

        <p className="text-lg text-slate-600 max-w-2xl mb-10 leading-relaxed">
          Bisnis Anda di <strong>{cityData.city}</strong> kini bisa memiliki caption otomatis yang lokal dan gaul. AI kami meracik tulisan khusus untuk target pasar di {cityData.city}.
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Link href="/dashboard" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl">
            Coba Sekarang di {cityData.city} ✨
          </Link>
          <Link href="/" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
            Kembali ke Beranda
          </Link>
        </div>

      </main>

      <footer className="border-t border-slate-200 py-12 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="font-bold text-blue-600 text-lg">ViralGuidify {cityData.city}</span>
          <p className="text-slate-400 text-sm mt-1">© 2025 Buatan Lokal untuk Indonesia.</p>
        </div>
      </footer>
    </div>
  );
}