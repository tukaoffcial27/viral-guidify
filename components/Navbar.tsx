"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
    router.refresh();
  };

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
          {user ? (
            <>
              <Link href="/dashboard" className="text-luxury-dark font-medium text-sm hover:text-luxury-green">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="bg-red-50 text-red-600 px-5 py-2 rounded-full text-sm font-bold hover:bg-red-100 transition-all border border-red-200">
                Keluar
              </button>
            </>
          ) : (
            // PERBAIKAN DI SINI:
            // 1. Hapus 'hidden md:block' agar tombol Masuk muncul di HP
            // 2. Hapus tombol 'Coba Gratis'
            <Link href="/login" className="bg-luxury-green text-white px-6 py-2.5 rounded-xl font-bold hover:bg-luxury-dark transition-all shadow-lg hover:shadow-luxury-green/20 hover:-translate-y-0.5">
              Masuk / Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}