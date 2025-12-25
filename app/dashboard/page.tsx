"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createBrowserClient } from '@supabase/ssr'; // Library terbaru yang sinkron dengan Login

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("text"); 
  const [quota, setQuota] = useState(2); 
  const [inputText, setInputText] = useState("");
  
  // State User
  const [userEmail, setUserEmail] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  
  // Pilihan
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Santai & Gaul");

  const [generatedResult, setGeneratedResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const platforms = ["Instagram", "TikTok", "Facebook", "LinkedIn", "Twitter/X"];
  const tones = ["Santai & Gaul", "Hard Selling", "Lucu / Receh", "Formal & Profesional", "Storytelling / Emosional"];

  // LINK PEMBAYARAN
  // GANTI BARIS INI:
const paymentLink = "https://lynk.id/tukastore/5pwqg0m31481"; // Ganti dengan Link Lynk.id Bapak

  // 1. Cek User & Status Premium (Perbaikan Logika)
  useEffect(() => {
    const checkUser = async () => {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          setUserEmail(user.email || "");
          
          // AMBIL DATA PROFIL DARI SUPABASE
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('is_premium')
            .eq('email', user.email)
            .single();
            
          if (profile?.is_premium) {
            setIsPremium(true);
            setQuota(9999); // Unlimited
          } else {
            // Jika Free, baca kuota tamu
            const savedQuota = localStorage.getItem("guest_quota");
            setQuota(savedQuota !== null ? parseInt(savedQuota) : 2);
          }
        } else {
          // Jika Tamu (Belum Login)
          const savedQuota = localStorage.getItem("guest_quota");
          setQuota(savedQuota !== null ? parseInt(savedQuota) : 2);
        }
      } catch (error) {
        console.error("Error cek user:", error);
      } finally {
        setIsLoadingUser(false);
      }
    };

    checkUser();
  }, []);

  // --- FUNGSI GENERATE ---
  const handleGenerate = async () => {
    // Cek Kuota (Kecuali Premium)
    if (!isPremium && quota <= 0) {
      setShowLimitModal(true);
      return;
    }

    if (!inputText.trim()) {
      alert("Isi deskripsi produknya dulu ya!");
      return;
    }

    setIsLoading(true);
    setGeneratedResult(""); 

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: inputText,
          platform: platform,
          tone: tone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedResult(data.result);
        
        // Kurangi Kuota HANYA jika BUKAN Premium
        if (!isPremium) {
          const newQuota = quota - 1;
          setQuota(newQuota);
          localStorage.setItem("guest_quota", newQuota.toString());
        }
      } else {
        alert("Gagal: " + (data.error || "Terjadi kesalahan sistem"));
      }
    } catch (error) {
      alert("Terjadi kesalahan jaringan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-luxury-cream overflow-hidden relative font-sans">
      
      {/* MODAL LIMIT HABIS */}
      {showLimitModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-luxury-dark/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-luxury-terracotta text-center animate-fade-in-up">
            <div className="w-16 h-16 bg-luxury-alert/10 text-luxury-alert rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">😱</div>
            <h3 className="text-2xl font-bold text-luxury-dark mb-2">Yah, Kuota Habis!</h3>
            <p className="text-luxury-dark/60 mb-6">Upgrade Premium buat akses unlimited tanpa batas!</p>
            <div className="space-y-3">
              <a href={paymentLink} target="_blank" className="block w-full bg-luxury-green text-white font-bold py-3 rounded-xl hover:bg-luxury-dark transition-all">
                Upgrade Premium 🚀
              </a>
              <button onClick={() => setShowLimitModal(false)} className="block w-full text-sm text-gray-400 hover:text-luxury-dark">Nanti aja deh</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FITUR PREMIUM */}
      {showPremiumModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-luxury-dark/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-luxury-green/30 text-center animate-fade-in-up">
            <div className="w-16 h-16 bg-luxury-green/10 text-luxury-green rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">👑</div>
            <h3 className="text-2xl font-bold text-luxury-dark mb-2">Fitur Sultan!</h3>
            <p className="text-luxury-dark/60 mb-6">Fitur ini khusus member Premium. Yuk upgrade sekarang!</p>
            <div className="space-y-3">
              <a href={paymentLink} target="_blank" className="block w-full bg-luxury-green text-white font-bold py-3 rounded-xl hover:bg-luxury-dark transition-all">
                Beli Paket Premium 🚀
              </a>
              <button onClick={() => setShowPremiumModal(false)} className="block w-full text-sm text-gray-400 hover:text-luxury-dark">Kembali ke Gratisan</button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-luxury-dark/5 p-6 justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-10 cursor-pointer">
            <div className="w-8 h-8 bg-luxury-green rounded-lg flex items-center justify-center text-luxury-cream">⚡</div>
            <span className="font-bold text-luxury-green tracking-tight">ViralGuidify</span>
          </Link>
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-luxury-green/10 text-luxury-green rounded-xl font-semibold transition-colors">
              <span className="text-xl">✨</span> Buat Caption
            </button>
            
            {/* Tombol Upgrade & Catatan Refresh */}
            {!isPremium && (
              <>
                <a href={paymentLink} target="_blank" className="w-full flex items-center gap-3 px-4 py-3 text-luxury-terracotta hover:bg-orange-50 rounded-xl font-bold transition-colors mt-4 border border-luxury-terracotta/30">
                  <span className="text-xl">🚀</span> Upgrade Pro
                </a>
                <p className="text-[10px] text-gray-400 mt-3 px-2 italic leading-tight">
                  Sudah bayar tapi status belum berubah? <br/>
                  <span 
                    className="font-bold text-luxury-green cursor-pointer hover:underline" 
                    onClick={() => window.location.reload()}
                  >
                    Klik untuk Refresh
                  </span>
                </p>
              </>
            )}
          </nav>
        </div>
        
        {/* User Info */}
        <div className="pt-6 border-t border-gray-100">
          <div className="bg-luxury-cream/50 p-4 rounded-xl mb-4 border border-luxury-terracotta/30">
            <p className="text-xs font-bold text-luxury-dark/50 uppercase mb-1">
              {isPremium ? "Status Member" : "Sisa Kuota"}
            </p>
            <div className="flex items-end gap-1">
              <span className={`text-3xl font-bold ${quota === 0 && !isPremium ? 'text-luxury-alert' : 'text-luxury-green'}`}>
                {isPremium ? "UNLIMITED" : quota}
              </span>
              {!isPremium && <span className="text-sm text-luxury-dark/40 mb-1">/ 2 Harian</span>}
            </div>
            {!isPremium && (
               <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${quota === 0 ? 'bg-luxury-alert' : 'bg-luxury-green'}`} style={{ width: `${(quota / 2) * 100}%` }}></div>
               </div>
            )}
          </div>
          
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${isPremium ? "bg-luxury-green" : "bg-gray-400"}`}>
               {userEmail ? userEmail[0].toUpperCase() : "?"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-luxury-dark truncate">
                {userEmail || "Tamu (Guest)"}
              </p>
              {userEmail ? (
                <span className="text-xs text-luxury-green font-semibold">
                  {isPremium ? "👑 Premium Member" : "Free Plan"}
                </span>
              ) : (
                <Link href="/login" className="text-xs text-luxury-green hover:underline">Login sekarang</Link>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full relative">
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100">
           <span className="font-bold text-luxury-green">ViralGuidify</span>
           <span className="text-xs font-bold bg-luxury-cream px-2 py-1 rounded text-luxury-green">
             {isPremium ? "UNLIMITED" : `Kuota: ${quota}`}
           </span>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-3xl font-bold text-luxury-green mb-2">Mau jualan apa hari ini?</h1>
              <p className="text-luxury-dark/60">Tulis produkmu, pilih platform & gaya bahasa, biar AI yang kerja.</p>
            </div>

            {/* INPUT CARD */}
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-luxury-terracotta/10 border border-luxury-terracotta/20">
              
              <div className="flex gap-4 mb-6 border-b border-gray-100 pb-4">
                <button onClick={() => setActiveTab("text")} className={`font-bold border-b-2 pb-4 -mb-4.5 px-2 transition-all ${activeTab === 'text' ? 'text-luxury-green border-luxury-green' : 'text-gray-400 border-transparent'}`}>
                  📝 Text to Caption
                </button>
                <button onClick={() => !isPremium && setShowPremiumModal(true)} className={`font-medium transition-colors px-2 flex items-center gap-1 ${isPremium ? "text-luxury-dark" : "text-gray-400 hover:text-luxury-green"}`}>
                  📸 Image to Caption <span className="text-[10px] bg-luxury-alert text-white px-1.5 py-0.5 rounded">PRO</span>
                </button>
              </div>

              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-32 p-4 bg-luxury-cream/30 rounded-xl border border-gray-200 focus:border-luxury-sage focus:ring-2 focus:ring-luxury-sage/20 outline-none resize-none transition-all placeholder:text-gray-400 text-luxury-dark mb-6"
                placeholder="Contoh: Jualan keripik pisang coklat lumer, target anak sekolah, diskon 50% khusus hari ini..."
              ></textarea>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-bold text-luxury-dark mb-2">Mau Posting di mana?</label>
                  <div className="flex flex-wrap gap-2">
                    {platforms.map((p) => (
                      <button
                        key={p}
                        onClick={() => setPlatform(p)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          platform === p 
                            ? "bg-luxury-green text-white border-luxury-green shadow-md shadow-luxury-green/20" 
                            : "bg-white text-gray-500 border-gray-200 hover:border-luxury-green hover:text-luxury-green"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-luxury-dark mb-2">Gaya Bahasanya?</label>
                  <div className="flex flex-wrap gap-2">
                    {tones.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          tone === t 
                            ? "bg-luxury-sage text-white border-luxury-sage shadow-md shadow-luxury-sage/20" 
                            : "bg-white text-gray-500 border-gray-200 hover:border-luxury-sage hover:text-luxury-sage"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center pt-4 border-t border-gray-100">
                <button 
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className={`bg-luxury-green text-white px-8 py-3 rounded-xl font-bold hover:bg-luxury-dark transition-all shadow-lg shadow-luxury-green/20 flex items-center gap-2 ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
                >
                  {isLoading ? "Sedang Berpikir..." : "Generate ✨"}
                </button>
              </div>
            </div>

            {/* HASIL */}
            {generatedResult && (
              <div className="mt-8 animate-fade-in-up">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-luxury-green">🎉 Hasil Caption Kamu:</h3>
                  <button onClick={() => navigator.clipboard.writeText(generatedResult)} className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-50 text-gray-500">Copy Semua</button>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-luxury-sage/20 shadow-sm whitespace-pre-line text-luxury-dark leading-relaxed">
                  {generatedResult}
                </div>
              </div>
            )}
            
            {!generatedResult && !isLoading && (
              <div className="mt-8 border-t border-dashed border-gray-300 pt-8 text-center text-gray-400 text-sm">
                Hasil caption akan muncul di sini...
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}