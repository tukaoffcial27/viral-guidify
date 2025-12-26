import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key Error." }, { status: 500 });
    }

    // Terima data product (teks), image (base64), dll
    const { product, image, platform, tone } = await req.json();

    const genAI = new GoogleGenerativeAI(apiKey);
    // Menggunakan model Gemini 3.0 (Vision capable)
    const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });

    // --- RAKIT PROMPT MULTIMODAL (GAMBAR + TEKS) ---
    const promptParts: any[] = [];

    // 1. Masukkan Instruksi Teks
    promptParts.push(`
      PERAN: Copywriter Ahli.
      TUGAS: Analisa gambar/deskripsi produk dan buat 3 variasi caption viral.

      - Platform: ${platform}
      - TONE/GAYA: "${tone.toUpperCase()}" (Wajib patuh!)
      - Info Tambahan User: ${product || "Tidak ada info tambahan, fokus analisa gambar."}

      PERINTAH:
      1. Jika ada gambar, JELASKAN apa yang kamu lihat di gambar tersebut dan jadikan bahan jualan.
      2. Buat 3 Opsi (Fokus Masalah, Fokus Manfaat, Unik/Kreatif).
      3. Gunakan Bahasa Indonesia yang natural dan emoji.

      FORMAT OUTPUT (GUNAKAN PEMISAH "---"):
      --- OPSI 1 --- ...
      --- OPSI 2 --- ...
      --- OPSI 3 --- ...
    `);

    // 2. Masukkan Data Gambar (Jika ada)
    if (image) {
      // Format image string: "data:image/jpeg;base64,/9j/4AAQSkZJRgABA..."
      // Kita perlu ambil bagian base64-nya saja dan tipe mimlenya
      const base64Data = image.split(',')[1]; // Ambil setelah koma
      const mimeType = image.substring(image.indexOf(':') + 1, image.indexOf(';')); // Ambil image/jpeg atau image/png

      if (base64Data && mimeType) {
        promptParts.push({
          inlineData: {
            data: base64Data,
            mimeType: mimeType
          }
        });
      }
    }

    // Kirim array (teks + gambar) ke Gemini
    const result = await model.generateContent(promptParts);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ result: text });

  } catch (error: any) {
    console.error("❌ Error Gemini Vision:", error);
    // Tangani error jika gambar terlalu besar atau ditolak Google
    let errorMessage = "Maaf, AI sedang sibuk. Coba lagi nanti.";
    if (error.message?.includes("400") || error.message?.includes("INVALID_ARGUMENT")) {
        errorMessage = "Gagal memproses gambar. Pastikan format JPG/PNG dan ukuran tidak terlalu besar.";
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}