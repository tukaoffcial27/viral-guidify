import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-luxury-cream/80 backdrop-blur-md border-b border-luxury-dark/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-luxury-green rounded-xl flex items-center justify-center text-luxury-cream shadow-lg shadow-luxury-green/20 group-hover:scale-105 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-xl font-bold text-luxury-green tracking-tight">
            Viral<span className="text-luxury-sage">Guidify</span>
          </span>
        </Link>

        {/* Menu Kanan */}
        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="hidden md:block text-luxury-dark hover:text-luxury-green font-medium text-sm transition-colors"
          >
            Masuk
          </Link>
          
          {/* REVISI: Link ini sekarang mengarah ke Dashboard, bukan Login */}
          <Link 
            href="/dashboard" 
            className="bg-luxury-green text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-luxury-dark transition-all shadow-xl shadow-luxury-green/20 hover:-translate-y-0.5"
          >
            Coba Gratis
          </Link>
        </div>
      </div>
    </header>
  );
}