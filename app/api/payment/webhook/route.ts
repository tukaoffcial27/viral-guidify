import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    console.log("🚀 Webhook Masuk:", JSON.stringify(payload))

    // 1. DETEKSI EMAIL (KODE ASLI BAPAK - TIDAK DIUBAH)
    // Jalur: data -> message_data -> customer -> email
    const userEmail = 
      payload.data?.message_data?.customer?.email || 
      payload.data?.customer?.email || 
      payload.email;

    if (!userEmail) {
      console.log("⚠️ Email masih tidak ketemu. Struktur data mungkin berubah.")
      return NextResponse.json({ message: 'No email found in payload' }, { status: 200 })
    }

    // --- [PENAMBAHAN BARU] FILTER PRODUK ---
    // Cek nama produk agar webhook tidak salah alamat (misal beli Ebook malah dapat SaaS)
    const productName = payload.title || payload.data?.title || "Unknown Product";
    
    console.log(`🛒 User ${userEmail} membeli produk: "${productName}"`);

    // HANYA UPGRADE JIKA NAMA PRODUK MENGANDUNG "VIRALGUIDIFY"
    // (Gunakan .toLowerCase() agar tidak sensitif huruf besar/kecil)
    if (productName.toLowerCase().includes("viralguidify")) {
        
        console.log(`✅ Valid! Produk dikenali sebagai ViralGuidify. Memproses Upgrade...`)

        // 2. EKSEKUSI UPGRADE (KODE ASLI BAPAK - DIPINDAH KE DALAM IF INI)
        const { error } = await supabaseAdmin
          .from('profiles')
          .update({ 
            is_premium: true, 
            premium_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() 
          })
          .eq('email', userEmail)

        if (error) {
          console.error("❌ Gagal update database:", error)
          return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
        }

        console.log("🎉 SUKSES! User Auto-Premium ViralGuidify.")
        return NextResponse.json({ success: true, message: 'User upgraded to Premium' }, { status: 200 })

    } else {
        // JIKA PRODUK BUKAN VIRALGUIDIFY (Misal: Ebook, SaaS Lain)
        console.log(`ℹ️ Produk "${productName}" bukan ViralGuidify. Tidak ada aksi upgrade.`);
        return NextResponse.json({ success: true, message: 'Product ignored (Not ViralGuidify)' }, { status: 200 })
    }

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}