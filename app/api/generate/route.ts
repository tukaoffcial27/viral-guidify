import { NextResponse } from "next/server";

export const runtime = 'edge'; 

export async function POST(req: Request) {
  try {
    const { product, platform, tone } = await req.json();

    // HANYA BOLEH ADA SATU BARIS INI
    const apiKey = "AIzaSyAIUlNUpx0u3je9YcmLub8W4LHEpMa2DuY"; 

    if (!apiKey) {
      return NextResponse.json({ result: "API Key hilang!" }, { status: 500 });
    }

    const modelId = "gemini-1.5-flash"; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;

    const promptText = `
      Bertindaklah sebagai Social Media Specialist profesional.
      Buat caption viral untuk platform: ${platform}.
      Topik/Produk: "${product}".
      Gaya Bahasa (Tone): ${tone}.
      
      Instruksi:
      1. Buat 3 Opsi caption berbeda.
      2. Gunakan Bahasa Indonesia yang natural & gaul.
      3. Sertakan emoji yang pas.
      4. Wajib sertakan 5-10 hashtag viral di setiap opsi.
    `;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: "Google Error: " + data.error.message }, { status: 500 });
    }

    const resultText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ result: resultText });

  } catch (error: any) {
    return NextResponse.json({ error: "System Error: " + error.message }, { status: 500 });
  }
}