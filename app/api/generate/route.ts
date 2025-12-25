import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Inisialisasi Supabase Admin (Bypass RLS - Wajib pakai Service Role Key)
// Pastikan Bapak sudah memasukkan SUPABASE_SERVICE_ROLE_KEY di Vercel Environment Variables
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
    // 1. Terima Data dari Lynk.id
    const payload = await request.json()
    console.log("🚀 Webhook Lynk.id Masuk:", JSON.stringify(payload, null, 2))

    // 2. Deteksi Email Pembeli
    // Lynk.id mungkin menaruh email di 'customer_email', 'email', atau di dalam object 'data'
    // Kode ini akan mencari di semua kemungkinan tempat
    const userEmail = 
      payload.customer_email || 
      payload.email || 
      payload.data?.customer_email || 
      payload.data?.email ||
      payload.customer?.email;

    // 3. Validasi
    if (!userEmail) {
      console.log("⚠️ Email tidak ditemukan di data webhook. Cek Logs Vercel.")
      return NextResponse.json({ message: 'No email found in payload' }, { status: 200 }) // Tetap return 200 biar Lynk.id tidak retry terus
    }

    console.log(`✅ Mendeteksi Pembayaran dari: ${userEmail}. Memulai Upgrade...`)

    // 4. Eksekusi Upgrade ke Premium (30 Hari)
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

    console.log("🎉 SUKSES! User sekarang Premium.")
    return NextResponse.json({ success: true, message: 'User upgraded' }, { status: 200 })

  } catch (err: any) {
    console.error("❌ Error System:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}