export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-luxury-cream font-sans pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-luxury-dark/5">
        <h1 className="text-3xl font-bold text-luxury-green mb-8">Kebijakan Privasi</h1>
        
        <div className="prose prose-stone text-luxury-dark/70 text-sm leading-relaxed space-y-6">
          <p>Terakhir diperbarui: 22 Desember 2025</p>
          
          <h3 className="text-lg font-bold text-luxury-dark">1. Pendahuluan</h3>
          <p>Viral Guidify ("kami") menghargai privasi Anda. Kebijakan ini menjelaskan bagaimana kami mengelola data yang Anda berikan saat menggunakan layanan AI generator kami.</p>

          <h3 className="text-lg font-bold text-luxury-dark">2. Data yang Kami Kumpulkan</h3>
          <p>Kami tidak menyimpan password Anda (login dilakukan via Google OAuth). Data yang kami proses meliputi: Input teks produk, Gambar yang diunggah (untuk analisis AI), dan Riwayat caption.</p>

          <h3 className="text-lg font-bold text-luxury-dark">3. Penggunaan Data</h3>
          <p>Data input Anda dikirim ke Google Gemini AI semata-mata untuk proses pembuatan caption. Kami tidak menjual data Anda ke pihak ketiga manapun.</p>
        </div>
      </div>
    </div>
  );
}