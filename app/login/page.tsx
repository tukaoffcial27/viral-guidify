"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const supabase = createClientComponentClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage("❌ Gagal: " + error.message);
    } else {
      setMessage("✅ Cek email Anda untuk link login!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-cream p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-luxury-terracotta/20 text-luxury-dark">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Masuk ViralGuidify</h1>
          <p className="text-gray-500 text-sm mt-2">Masukan email aktif Anda</p>
        </div>

        {message && (
          <div className={`p-4 rounded-xl mb-6 text-sm font-bold ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-200 outline-none"
            placeholder="nama@email.com"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-luxury-dark text-white font-bold py-3 rounded-xl hover:bg-black transition-all"
          >
            {loading ? "Mengirim..." : "Kirim Link Login 🚀"}
          </button>
        </form>
        <Link href="/" className="block mt-6 text-center text-sm text-luxury-green hover:underline">← Kembali</Link>
      </div>
    </div>
  );
}