import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key Error." }, { status: 500 });
    }

    const { product, platform, tone } = await req.json();

    // Gunakan model terbaru Gemini 3.0
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });

    // --- INSTRUKSI KHUSUS AGAR HASILNYA 3 OPSI & SESUAI TONE ---
    const prompt = `
      PERAN: Anda adalah Copywriter & Strategist Media Sosial Kelas Dunia.
      TUGAS: Buat 3 (TIGA) variasi caption yang berbeda untuk produk ini.

      INFORMASI:
      - Produk: ${product}
      - Platform: ${platform}
      - TONE/GAYA: "${tone.toUpperCase()}" (Wajib dipatuhi!)

      PERINTAH OUTPUT:
      1. Jika Tone "Lucu/Receh": Gunakan humor, emoji lucu, dan bahasa gaul.
      2. Jika Tone "Formal": Gunakan bahasa baku, profesional, minim emoji.
      3. Buat 3 Opsi dengan sudut pandang berbeda (Benefit, Masalah, atau Cerita).
      4. Gunakan Bahasa Indonesia yang luwes dan enak dibaca.
      
      FORMAT OUTPUT (JANGAN DIUBAH):
      
      --- OPSI 1: FOKUS SOLUSI ---
      [Headline]
      [Isi Caption]
      [CTA]
      [Hashtag]

      --- OPSI 2: FOKUS MANFAAT ---
      [Headline]
      [Isi Caption]
      [CTA]
      [Hashtag]

      --- OPSI 3: UNIK & KREATIF ---
      [Headline]
      [Isi Caption]
      [CTA]
      [Hashtag]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ result: text });

  } catch (error) {
    console.error("❌ Error Gemini:", error);
    return NextResponse.json(
      { error: "Maaf, AI sedang sibuk. Coba lagi sebentar lagi." },
      { status: 500 }
    );
  }
}