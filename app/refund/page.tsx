import Link from "next/link";

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-luxury-cream font-sans pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-luxury-dark/5">
        <h1 className="text-3xl font-bold text-luxury-green mb-8">Kebijakan Pengembalian Dana (Refund Policy)</h1>
        
        <div className="prose prose-stone text-luxury-dark/70 text-sm leading-relaxed space-y-6">
          <p className="font-bold">Terakhir diperbarui: 22 Desember 2025</p>
          
          <h3 className="text-lg font-bold text-luxury-dark">1. Sifat Produk Digital</h3>
          <p>
            Viral Guidify adalah layanan berbasis perangkat lunak (Software as a Service) yang memberikan akses instan ke fitur digital. 
            Karena sifat produk yang bersifat "digital" dan "langsung dapat digunakan", seluruh pembelian yang telah berhasil dikonfirmasi bersifat <strong>FINAL</strong>.
          </p>

          <h3 className="text-lg font-bold text-luxury-dark">2. Ketentuan "No Refund"</h3>
          <p>
            Kami menerapkan kebijakan <strong>Tidak Ada Pengembalian Dana (No Refund)</strong> untuk kondisi berikut:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Anda berubah pikiran setelah melakukan pembelian.</li>
            <li>Anda tidak menggunakan fitur yang sudah dibeli (hangus karena waktu).</li>
            <li>Anda lupa membatalkan langganan sebelum tanggal perpanjangan otomatis.</li>
            <li>Ketidakpuasan terhadap hasil generate AI (karena AI bersifat subjektif dan generatif).</li>
          </ul>

          <h3 className="text-lg font-bold text-luxury-dark">3. Pengecualian</h3>
          <p>
            Pengembalian dana hanya dapat dipertimbangkan jika terjadi kesalahan teknis fatal yang terbukti berasal dari sistem kami (misalnya: saldo terpotong ganda untuk satu transaksi), dan wajib dilaporkan maksimal 3x24 jam.
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-8">
            <p className="text-xs text-gray-500">
              Dengan melakukan transaksi di Viral Guidify, Anda dianggap telah membaca, mengerti, dan menyetujui seluruh syarat dan ketentuan ini tanpa paksaan dari pihak manapun.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/" className="text-luxury-green font-bold hover:underline">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}