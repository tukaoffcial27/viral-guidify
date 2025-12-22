import { NextResponse } from "next/server";

export const runtime = 'edge'; 

export async function POST(req: Request) {
  try {
    // Tangkap data image juga
    const { product, platform, tone, image } = await req.json();
    
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ result: "API Key belum disetting di Vercel!" }, { status: 500 });
    }

    // Pakai model JUARA kita: Gemini 3
    const modelId = "gemini-3-flash-preview"; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;

    // Racik Prompt
    const promptText = `
      Bertindaklah sebagai Social Media Specialist profesional.
      Buat caption viral untuk platform: ${platform}.
      Topik/Produk: "${product}".
      Gaya Bahasa (Tone): ${tone}.
      ${image ? "CATATAN: Gunakan gambar yang saya upload sebagai inspirasi utama caption." : ""}
      
      Instruksi:
      1. Buat 3 Opsi caption berbeda.
      2. Gunakan Bahasa Indonesia yang natural & gaul.
      3. Sertakan emoji yang pas.
      4. Wajib sertakan 5-10 hashtag viral di setiap opsi.
    `;

    // Siapkan Paket Pengiriman (Multimodal: Teks + Gambar)
    const parts: any[] = [{ text: promptText }];

    // Jika ada gambar, masukkan ke dalam paket
    if (image) {
      // Kita bersihkan header base64 (data:image/jpeg;base64,...)
      const base64Data = image.split(',')[1]; 
      parts.push({
        inline_data: {
          mime_type: "image/jpeg",
          data: base64Data
        }
      });
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: parts }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: "Google Error: " + data.error.message }, { status: 500 });
    }

    if (!data.candidates || data.candidates.length === 0) {
       return NextResponse.json({ error: "Gemini bingung, coba lagi." }, { status: 500 });
    }

    const resultText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ result: resultText });

  } catch (error: any) {
    return NextResponse.json({ error: "System Error: " + error.message }, { status: 500 });
  }
}