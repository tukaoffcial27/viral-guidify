export default function TermsPage() {
  return (
    <div className="min-h-screen bg-luxury-cream font-sans pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-luxury-dark/5">
        <h1 className="text-3xl font-bold text-luxury-green mb-8">Syarat & Ketentuan</h1>
        
        <div className="prose prose-stone text-luxury-dark/70 text-sm leading-relaxed space-y-6">
          <h3 className="text-lg font-bold text-luxury-dark">1. Ketentuan Umum</h3>
          <p>Dengan mengakses Viral Guidify, Anda setuju untuk terikat dengan syarat dan ketentuan ini. Layanan ini disediakan "sebagaimana adanya".</p>

          <h3 className="text-lg font-bold text-luxury-dark">2. Penggunaan yang Dilarang</h3>
          <p>Anda dilarang menggunakan AI kami untuk membuat konten ilegal, ujaran kebencian, hoax, atau konten dewasa (NSFW). Pelanggaran akan mengakibatkan pemblokiran akun permanen.</p>

          <h3 className="text-lg font-bold text-luxury-dark">3. Batasan Tanggung Jawab</h3>
          <p>Viral Guidify tidak bertanggung jawab atas dampak dari caption yang dihasilkan oleh AI. Anda wajib memeriksa kembali hasil generate sebelum mempostingnya ke media sosial.</p>
        </div>
      </div>
    </div>
  );
}