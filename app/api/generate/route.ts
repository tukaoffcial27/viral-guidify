import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. Tangkap data dari Frontend
    const { product, platform, tone } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API Key belum dipasang bos!" }, { status: 500 });
    }

    // 2. Siapkan Otak Gemini
    const apiKey = "AIzaSyAIUlNUpx0u3je9YcmLub8W4LHEpMa2DuY";
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 3. Buat Perintah (Prompt) yang MEMATIKAN
    const prompt = `
      Bertindaklah sebagai Social Media Specialist profesional di Indonesia.
      Tugasmu adalah membuat caption viral untuk produk berikut:
      
      PRODUK: "${product}"
      PLATFORM: ${platform}
      GAYA BAHASA (TONE): ${tone}
      
      INSTRUKSI KHUSUS:
      1. Buat 3 OPSI caption yang berbeda variasi.
      2. Gunakan Bahasa Indonesia yang natural, gaul, dan relevan dengan ${platform}.
      3. Jika platform TikTok/Instagram, gunakan banyak emoji yang pas.
      4. Jika platform LinkedIn, gunakan bahasa lebih profesional tapi tetap menarik.
      5. Sertakan 5-10 HASHTAGS yang sedang trending dan relevan di setiap opsi.
      6. Jangan kaku seperti robot terjemahan. Gunakan istilah lokal (slang) jika tone-nya santai.

      FORMAT OUTPUT:
      Tampilkan langsung Opsi 1, Opsi 2, dan Opsi 3 dengan pemisah yang jelas.
    `;

    // 4. Kirim ke Google & Tunggu Jawaban
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 5. Kirim balik ke Frontend
    return NextResponse.json({ result: text });

  } catch (error) {
    return NextResponse.json({ error: "Gagal racik caption: " + error }, { status: 500 });
  }
}