import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-luxury-dark/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Kolom 1: Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-luxury-green rounded-lg flex items-center justify-center text-luxury-cream">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-bold text-luxury-green">ViralGuidify</span>
            </div>
            <p className="text-luxury-dark/60 text-sm leading-relaxed">
              Platform AI #1 di Indonesia untuk membantu UMKM dan Kreator membuat konten viral dalam hitungan detik.
            </p>
          </div>

          {/* Kolom 2: Product */}
          <div>
            <h4 className="font-bold text-luxury-dark mb-4">Produk</h4>
            <ul className="space-y-2 text-sm text-luxury-dark/70">
              <li><Link href="#" className="hover:text-luxury-green">Fitur Utama</Link></li>
              <li><Link href="#" className="hover:text-luxury-green">Harga & Paket</Link></li>
              <li><Link href="#" className="hover:text-luxury-green">Studi Kasus</Link></li>
              <li><Link href="#" className="hover:text-luxury-green">Testimoni</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Legal */}
          <div>
            <h4 className="font-bold text-luxury-dark mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-luxury-dark/70">
              <li><Link href="/privacy" className="hover:text-luxury-green">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-luxury-green">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-luxury-green">Kebijakan Refund</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Contact */}
          <div>
            <h4 className="font-bold text-luxury-dark mb-4">Hubungi Kami</h4>
            <ul className="space-y-2 text-sm text-luxury-dark/70">
              <li><a href="mailto:support@guidify.app" className="hover:text-luxury-green">support@guidify.app</a></li>
              <li><a href="#" className="hover:text-luxury-green">WhatsApp Support</a></li>
              <li className="pt-2 flex gap-4">
                <div className="w-8 h-8 bg-luxury-cream rounded-full flex items-center justify-center text-luxury-green cursor-pointer hover:bg-luxury-green hover:text-white transition-colors">IG</div>
                <div className="w-8 h-8 bg-luxury-cream rounded-full flex items-center justify-center text-luxury-green cursor-pointer hover:bg-luxury-green hover:text-white transition-colors">TT</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-luxury-dark/40">
          <p>&copy; 2025 Viral Guidify. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Indonesia</span>
            <span>English</span>
          </div>
        </div>
      </div>
    </footer>
  );
}