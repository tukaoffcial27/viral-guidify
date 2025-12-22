"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase"; // Pastikan path ini sesuai lokasi file tadi
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Kirim Magic Link ke Email
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        // Setelah klik email, user akan diarahkan balik ke Dashboard
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage("Gagal: " + error.message);
    } else {
      setMessage("✅ Cek email Anda! Link login ajaib sudah dikirim.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-cream p-4 font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-luxury-terracotta/20 max-w-md w-full animate-fade-in-up">
        
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-4xl mb-2">⚡</Link>
          <h1 className="text-2xl font-bold text-luxury-dark">Masuk ke ViralGuidify</h1>
          <p className="text-gray-500 text-sm mt-2">Masukan email aktif, kami kirim link login instan.</p>
        </div>

        {message && (
          <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${message.includes("✅") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-luxury-dark mb-2">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-luxury-green outline-none transition-all"
              placeholder="nama@email.com"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-luxury-dark text-white font-bold py-3 rounded-xl hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Mengirim Link..." : "Kirim Link Masuk ✨"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Belum punya akun? Tenang, akun otomatis dibuat saat login pertama.</p>
          <Link href="/" className="block mt-4 text-luxury-green hover:underline">← Kembali ke Depan</Link>
        </div>

      </div>
    </div>
  );
}