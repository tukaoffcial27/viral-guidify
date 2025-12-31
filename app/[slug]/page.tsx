import { Metadata } from 'next';
import cities from '@/cities.json'; // Menggunakan alias @ agar lebih aman
import Link from "next/link";
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return cities.map((city) => ({
    slug: city.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cityData = cities.find((c) => c.slug === slug);
  
  if (!cityData) return { title: 'Halaman Tidak Ditemukan' };

  return {
    title: `Bikin Caption Viral di ${cityData.city} — ViralGuidify AI`,
    description: `Solusi caption produk viral untuk UMKM di ${cityData.city}.`,
  };
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Mencari data dengan pencocokan yang lebih ketat
  const cityData = cities.find((c) => c.slug === slug);
  
  if (!cityData) {
    notFound(); 
  }

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col pt-20">
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center mt-10 mb-20">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200">
          <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">
            📍 Area Layanan: {cityData.city}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
          Caption Jualan Viral <br/>
          Untuk UMKM di <span className="text-blue-600">{cityData.city}</span>
        </h1>

        <p className="text-lg text-slate-600 max-w-2xl mb-10">
          Bisnis Anda di <strong>{cityData.city}</strong> kini bisa memiliki caption otomatis yang lokal dan gaul. AI kami meracik tulisan khusus untuk target pasar di {cityData.city}.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/dashboard" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg">
            Coba Sekarang di {cityData.city} ✨
          </Link>
          <Link href="/" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg">
            Kembali ke Beranda
          </Link>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-12 bg-white mt-auto text-center">
        <span className="font-bold text-blue-600 text-lg">ViralGuidify {cityData.city}</span>
        <p className="text-slate-400 text-sm mt-1">© 2025 Buatan Lokal untuk Indonesia.</p>
      </footer>
    </div>
  );
}