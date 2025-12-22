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

          {/* Kolom 2: Produk (Sudah Bersih) */}
          <div>
            <h4 className="font-bold text-luxury-dark mb-6">Produk</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/dashboard" className="hover:text-luxury-green transition-colors">Fitur Utama</Link></li>
              <li><Link href="/pricing" className="hover:text-luxury-green transition-colors">Harga & Paket</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Legal (Link Refund Sudah Benar) */}
          <div>
            <h4 className="font-bold text-luxury-dark mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/privacy" className="hover:text-luxury-green transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-luxury-green transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund" className="hover:text-luxury-green transition-colors">Kebijakan Refund</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Hubungi Kami (Link ke Page Contact) */}
          <div>
            <h4 className="font-bold text-luxury-dark mb-6">Bantuan</h4>
            <ul className="space-y-4 text-sm text-gray-500">
               <li>
                <Link href="/contact" className="flex items-center gap-2 hover:text-luxury-green transition-colors group">
                  <span>💬</span>
                  <span className="group-hover:underline">Hubungi Kami</span>
                </Link>
              </li>
              <li className="text-gray-400 text-xs mt-4">
                Senin - Jumat (09.00 - 17.00 WIB)
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