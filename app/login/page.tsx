"use client";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setMessage("❌ Error: " + error.message);
    else setMessage("✅ Link login sudah dikirim ke email Anda!");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-cream p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-luxury-terracotta/20 text-luxury-dark">
        <h1 className="text-2xl font-bold text-center mb-6">Masuk ViralGuidify</h1>
        {message && <p className="mb-4 text-sm font-bold text-center">{message}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" placeholder="email@anda.com" required
            className="w-full p-3 rounded-xl border border-gray-200 outline-none"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={loading} className="w-full bg-luxury-dark text-white font-bold py-3 rounded-xl">
            {loading ? "Mengirim..." : "Kirim Link Login 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}