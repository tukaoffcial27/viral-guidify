import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-luxury-cream font-sans pt-32 pb-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-luxury-green mb-6">Hubungi Kami</h1>
        <p className="text-luxury-dark/60 mb-12 text-lg">
          Ada kendala saat menggunakan Viral Guidify? Atau ingin kerjasama bisnis? Tim kami siap membantu Anda.
        </p>

        <div className="grid gap-6">
          {/* Email Card */}
          <div className="bg-white p-8 rounded-3xl border border-luxury-terracotta/20 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-luxury-green/10 text-luxury-green rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              ✉️
            </div>
            <h3 className="font-bold text-luxury-dark mb-2">Email Support</h3>
            <p className="text-sm text-gray-500 mb-4">Respon dalam 1x24 jam</p>
            <a href="mailto:support@guidify.app" className="text-luxury-green font-bold hover:underline">
              support@guidify.app
            </a>
          </div>

          {/* WA/Office Card */}
          <div className="bg-white p-8 rounded-3xl border border-luxury-terracotta/20 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-luxury-green/10 text-luxury-green rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              🏢
            </div>
            <h3 className="font-bold text-luxury-dark mb-2">Kantor Pusat</h3>
            <p className="text-sm text-gray-500">
              Grand Galaxy City, Bekasi<br/>
              Jawa Barat, Indonesia
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-luxury-dark/40 hover:text-luxury-green text-sm transition-colors">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}