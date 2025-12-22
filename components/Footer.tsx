import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-luxury-dark/5 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Kolom 1: Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-luxury-dark rounded-lg flex items-center justify-center text-white text-lg">⚡</div>
              <span className="font-bold text-luxury-dark text-xl tracking-tight">ViralGuidify</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Platform AI #1 di Indonesia untuk membantu UMKM dan Kreator membuat konten viral dalam hitungan detik.
            </p>
          </div>

          {/* Kolom 2: Produk */}
          <div>
            <h4 className="font-bold text-luxury-dark mb-6">Produk</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/dashboard" className="hover:text-luxury-green transition-colors">Fitur Utama</Link></li>
              <li><Link href="/pricing" className="hover:text-luxury-green transition-colors">Harga & Paket</Link></li>
              <li><span className="text-gray-300 cursor-not-allowed">Studi Kasus (Soon)</span></li>
            </ul>
          </div>

          {/* Kolom 3: Legal (SUDAH DIPERBAIKI) */}
          <div>
            <h4 className="font-bold text-luxury-dark mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/privacy" className="hover:text-luxury-green transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-luxury-green transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund" className="hover:text-luxury-green transition-colors">Kebijakan Refund</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Hubungi */}
          <div>
            <h4 className="font-bold text-luxury-dark mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:support@guidify.app" className="hover:text-luxury-green transition-colors">support@guidify.app</a>
              </li>
              <li className="flex items-center gap-2">
                <span>💬</span>
                <Link href="/contact" className="hover:text-luxury-green transition-colors">WhatsApp Support</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2025 Viral Guidify. All rights reserved.</p>
          <div className="flex gap-4">
             <span className="text-gray-400 text-xs">Indonesia</span>
          </div>
        </div>

      </div>
    </footer>
  );
}