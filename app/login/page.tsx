import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-luxury-cream">
      {/* Container Utama (Card) */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-luxury-terracotta/30">
        
        {/* Header: Logo & Judul */}
        <div className="p-8 text-center bg-luxury-green/5">
          <h1 className="text-3xl font-bold text-luxury-green mb-2">Guidify</h1>
          <p className="text-luxury-dark text-sm">
            Asisten AI Pribadi untuk Konten Viralmu
          </p>
        </div>

        {/* Body: Form Login */}
        <div className="p-8 space-y-6">
          
          {/* Tombol Login Google */}
          <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-luxury-dark hover:bg-gray-50 font-medium py-3 px-4 rounded-xl transition-all shadow-sm group">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="group-hover:text-luxury-green">Masuk dengan Google</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">atau email</span>
            </div>
          </div>

          {/* Form Email Manual */}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-luxury-dark mb-1">Email</label>
              <input 
                type="email" 
                id="email"
                placeholder="nama@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-luxury-sage focus:ring-2 focus:ring-luxury-sage/20 outline-none transition-all bg-luxury-cream/30"
              />
            </div>
            <button className="w-full bg-luxury-green text-white font-bold py-3 px-4 rounded-xl hover:bg-luxury-dark transition-colors shadow-lg shadow-luxury-green/20">
              Lanjut Masuk
            </button>
          </div>

        </div>

        {/* Footer Kecil */}
        <div className="p-4 text-center bg-gray-50 text-xs text-gray-400">
          Dengan masuk, Anda menyetujui Syarat & Ketentuan Guidify.
        </div>
      </div>
    </div>
  );
}