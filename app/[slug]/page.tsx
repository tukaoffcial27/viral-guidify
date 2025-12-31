import { Metadata } from 'next';
import cities from '@/cities.json'; // Mengambil data dari file cities.json yang sudah Anda copy
import Link from "next/link";
import { notFound } from 'next/navigation';

// 1. Fungsi untuk memberitahu Next.js daftar semua kota
export async function generateStaticParams() {
  return cities.map((city) => ({
    slug: city.slug,
  }));
}

// 2. Fungsi untuk membuat judul (SEO) otomatis tiap kota
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cityData = cities.find((c) => c.slug === params.slug);
  if (!cityData) return { title: 'Not Found' };

  return {
    title: `Bikin Caption Viral di ${cityData.city} — ViralGuidify AI`,
    description: `Solusi caption produk viral untuk UMKM di ${cityData.city}. Vision AI kami membantu jualan Anda di ${cityData.city} lebih laris tanpa pusing mikir caption.`,
  };
}

export default function CityPage({ params }: { params: { slug: string } }) {
  const cityData = cities.find((c) => c.slug === params.slug);
  
  // Jika kota tidak ada di cities.json, tampilkan 404
  if (!cityData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col pt-20">
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center mt-10 mb-20">
        
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 shadow-sm">
          <span className="text-xs font-bold text-blue-600 tracking-widest uppercase italic">
            📍 Melayani Wilayah: {cityData.city}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight max-w-4xl">
          Caption Jualan Viral <br/>
          Untuk UMKM di <span className="text-blue-600">{cityData.city}</span>
        </h1>

        <p className="text-lg text-slate-600 max-w-2xl mb-10 leading-relaxed">
          Kini bisnis Anda di <strong>{cityData.city}</strong> bisa memiliki caption "Lokal & Gaul" otomatis. Cukup upload foto produk, AI kami yang urus tulisannya agar banjir orderan.
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Link href="/dashboard" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl flex items-center justify-center gap-2">
            Coba Gratis di {cityData.city} ✨
          </Link>
          <Link href="/" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center">
            Kembali ke Beranda
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 max-w-4xl w-full text-left">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Target Pasar {cityData.city}</h3>
            <p className="text-slate-500 text-sm">AI kami dilatih untuk memahami gaya bahasa yang disukai pelanggan di wilayah {cityData.city} dan sekitarnya.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Vision AI Visioner</h3>
            <p className="text-slate-500 text-sm">Deteksi objek foto produk secara instan. Cocok untuk semua jenis usaha UMKM di {cityData.city}.</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-12 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="font-bold text-blue-600 text-lg">ViralGuidify {cityData.city}</span>
          <p className="text-slate-400 text-sm mt-1">© 2025 Solusi AI Lokal untuk Indonesia.</p>
        </div>
      </footer>
    </div>
  );
}