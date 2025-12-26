import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. Ambil API Key
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server Error: API Key belum disetting di Vercel." },
        { status: 500 }
      );
    }

    // 2. Terima Data dari Dashboard
    const { product, platform, tone } = await req.json();

    // 3. Inisialisasi Google Gemini 3.0 (Sesuai Screenshot Bapak)
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // --- KUNCI UTAMA DI SINI ---
    const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });

    // 4. Rakit Perintah (Prompt)
    const prompt = `
      Bertindaklah sebagai Copywriter Profesional.
      Buat caption jualan yang VIRAL untuk produk berikut:

      - PRODUK: ${product}
      - PLATFORM: ${platform}
      - GAYA BAHASA: ${tone}

      Struktur Caption:
      1. HEADLINE: Hook yang kuat/memancing perhatian.
      2. BODY: Penjelasan manfaat produk yang menarik.
      3. CTA: Ajakan bertindak yang jelas.
      4. HASHTAG: 10 hashtag viral relevan.

      Pastikan output rapi, menggunakan emoji yang pas, dan bahasa Indonesia yang natural.
    `;

    // 5. Generate Konten
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 6. Kirim Hasil
    return NextResponse.json({ result: text });

  } catch (error) {
    console.error("❌ Error Gemini 3.0:", error);
    return NextResponse.json(
      { error: "Maaf, AI sedang sibuk atau limit tercapai. Coba lagi nanti." },
      { status: 500 }
    );
  }
}