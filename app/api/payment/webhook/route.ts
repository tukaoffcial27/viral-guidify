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

    // REVISI PENTING: Menyesuaikan struktur data asli dari Lynk.id (Image 19.02)
    // Jalur: data -> message_data -> customer -> email
    const userEmail = 
      payload.data?.message_data?.customer?.email || 
      payload.data?.customer?.email || 
      payload.email;

    if (!userEmail) {
      console.log("⚠️ Email masih tidak ketemu. Struktur data mungkin berubah.")
      return NextResponse.json({ message: 'No email found in payload' }, { status: 200 })
    }

    console.log(`✅ MENEMUKAN PEMBAYARAN DARI: ${userEmail}`)

    // Upgrade ke Premium
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

    console.log("🎉 SUKSES! User Auto-Premium.")
    return NextResponse.json({ success: true, message: 'User upgraded' }, { status: 200 })

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}