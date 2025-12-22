"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("text"); 
  const [quota, setQuota] = useState(2); 
  const [inputText, setInputText] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Santai & Gaul");
  
  // State untuk Gambar
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [generatedResult, setGeneratedResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);

  const platforms = ["Instagram", "TikTok", "Facebook", "LinkedIn", "Twitter/X"];
  const tones = ["Santai & Gaul", "Hard Selling", "Lucu / Receh", "Formal & Profesional", "Storytelling / Emosional"];

  useEffect(() => {
    const savedQuota = localStorage.getItem("guest_quota");
    if (savedQuota !== null) {
      setQuota(parseInt(savedQuota));
    }
  }, []);

  // Handle Upload Gambar
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setActiveTab("image"); // Pindah ke tab image otomatis
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    // Cek Kuota (Sementara kita bebaskan dulu biar Bapak puas testing)
    // if (quota <= 0) { setShowLimitModal(true); return; }

    if (!inputText.trim() && !selectedImage) {
      alert("Isi deskripsi atau upload foto dulu, Bos!");
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
          image: activeTab === "image" ? selectedImage : null // Kirim gambar cuma kalau di tab image
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedResult(data.result);
        const newQuota = quota - 1;
        setQuota(newQuota);
        localStorage.setItem("guest_quota", newQuota.toString());
      } else {
        alert("Gagal: " + data.error);
      }

    } catch (error) {
      alert("Terjadi kesalahan jaringan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-luxury-cream overflow-hidden relative font-sans">
      
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
            <Link href="/pricing" className="w-full flex items-center gap-3 px-4 py-3 text-luxury-dark/60 hover:bg-gray-50 hover:text-luxury-dark rounded-xl font-medium transition-colors">
              <span className="text-xl">💎</span> Langganan
            </Link>
          </nav>
        </div>
        <div className="bg-luxury-cream/50 p-4 rounded-xl mb-4 border border-luxury-terracotta/30">
            <p className="text-xs font-bold text-luxury-dark/50 uppercase mb-1">Sisa Kuota Tamu</p>
            <div className="flex items-end gap-1">
              <span className="text-3xl font-bold text-luxury-green">{quota}</span>
              <span className="text-sm text-luxury-dark/40 mb-1">/ 2 Harian</span>
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto p-4 md:p-8">
          <div className="max-w-3xl mx-auto w-full">
            
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-luxury-terracotta/10 border border-luxury-terracotta/20">
              
              {/* TABS */}
              <div className="flex gap-4 mb-6 border-b border-gray-100 pb-4">
                <button 
                  onClick={() => setActiveTab("text")} 
                  className={`font-bold border-b-2 pb-4 -mb-4.5 px-2 transition-all ${activeTab === 'text' ? 'text-luxury-green border-luxury-green' : 'text-gray-400 border-transparent'}`}
                >
                  📝 Text to Caption
                </button>
                <button 
                  onClick={() => setActiveTab("image")} 
                  className={`font-bold border-b-2 pb-4 -mb-4.5 px-2 transition-all flex items-center gap-2 ${activeTab === 'image' ? 'text-luxury-green border-luxury-green' : 'text-gray-400 border-transparent'}`}
                >
                  📸 Image to Caption <span className="text-[10px] bg-luxury-green text-white px-1.5 py-0.5 rounded">UNLOCKED</span>
                </button>
              </div>

              {/* INPUT TEXT */}
              <div className="mb-6">
                <textarea 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full h-24 p-4 bg-luxury-cream/30 rounded-xl border border-gray-200 focus:border-luxury-sage outline-none resize-none placeholder:text-gray-400 text-luxury-dark"
                  placeholder={activeTab === 'text' ? "Jualan keripik pisang coklat lumer..." : "Tambahkan konteks tambahan untuk foto ini (Opsional)..."}
                ></textarea>
              </div>

              {/* INPUT IMAGE (Hanya Muncul di Tab Image) */}
              {activeTab === 'image' && (
                <div className="mb-6 animate-fade-in-up">
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  {!selectedImage ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-luxury-green/30 bg-luxury-green/5 rounded-xl h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-luxury-green/10 transition-colors"
                    >
                      <span className="text-3xl mb-2">📤</span>
                      <p className="text-sm font-bold text-luxury-green">Klik untuk Upload Foto Produk</p>
                      <p className="text-xs text-gray-400">Jpg, Png (Max 5MB)</p>
                    </div>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden border border-gray-200 h-64 bg-black/5 flex items-center justify-center">
                      <img src={selectedImage} alt="Preview" className="h-full object-contain" />
                      <button 
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* PILIHAN PLATFORM & TONE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-bold text-luxury-dark mb-2">Mau Posting di mana?</label>
                  <div className="flex flex-wrap gap-2">
                    {platforms.map((p) => (
                      <button key={p} onClick={() => setPlatform(p)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${platform === p ? "bg-luxury-dark text-white border-luxury-dark" : "bg-white text-gray-500 border-gray-200"}`}>{p}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-luxury-dark mb-2">Gaya Bahasanya?</label>
                  <div className="flex flex-wrap gap-2">
                    {tones.map((t) => (
                      <button key={t} onClick={() => setTone(t)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${tone === t ? "bg-luxury-sage text-white border-luxury-sage" : "bg-white text-gray-500 border-gray-200"}`}>{t}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* TOMBOL GENERATE */}
              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button 
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className={`bg-luxury-dark text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg flex items-center gap-2 ${isLoading ? 'opacity-70' : ''}`}
                >
                  {isLoading ? 'Sedang Melihat...' : 'Generate ✨'}
                </button>
              </div>
            </div>

            {/* HASIL */}
            {generatedResult && (
              <div className="mt-8 mb-20 bg-white p-6 rounded-2xl border border-luxury-sage/20 shadow-sm whitespace-pre-line text-luxury-dark leading-relaxed animate-fade-in-up">
                 <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                  <h3 className="font-bold text-luxury-green">🎉 Hasil Caption Kamu:</h3>
                  <button onClick={() => navigator.clipboard.writeText(generatedResult)} className="text-xs bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">Copy Semua</button>
                </div>
                {generatedResult}
              </div>
            )}
            
          </div>
      </main>
    </div>
  );
}