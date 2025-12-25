"use client";

import { useState } from "react";
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          // KUNCI PERBAIKAN: Memaksa redirect ke Dashboard setelah link diklik
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });

      if (error) {
        setMessage("Gagal mengirim link. Cek emailnya benar nggak?");
      } else {
        setMessage("✅ Link login sudah dikirim ke email! Cek Inbox/Spam ya.");
      }
    } catch (err) {
      setMessage("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-cream p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-luxury-green/10 max-w-md w-full border border-luxury-dark/5">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-luxury-green/10 text-luxury-green rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
            🔐
          </div>
          <h1 className="text-2xl font-bold text-luxury-green mb-2">Login Tanpa Password</h1>
          <p className="text-luxury-dark/60 text-sm">
            Cukup masukkan email, kami kirim link ajaib buat masuk langsung.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-luxury-dark mb-2">Email Kamu</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-luxury-green focus:ring-2 focus:ring-luxury-green/20 outline-none transition-all bg-luxury-cream/30"
              placeholder="nama@email.com"
              required
            />
          </div>

          {message && (
            <div className={`p-3 rounded-xl text-sm font-medium ${message.includes("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-luxury-green text-white font-bold py-3.5 rounded-xl hover:bg-luxury-dark transition-all shadow-lg shadow-luxury-green/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Mengirim Link..." : "Kirim Link Masuk 🚀"}
          </button>
        </form>

        <p className="text-center mt-6 text-xs text-gray-400">
          Belum punya akun? Tenang, otomatis terbuat kok.
        </p>
      </div>
    </div>
  );
}