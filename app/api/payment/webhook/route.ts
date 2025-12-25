import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Setup Supabase Admin
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
    // 1. Baca Data dari Lynk.id
    const payload = await request.json()
    console.log("🚀 Webhook Masuk:", JSON.stringify(payload))

    // 2. Cari Email User (Lynk.id menaruhnya di berbagai tempat tergantung tipe pembayaran)
    const userEmail = 
      payload.customer_email || 
      payload.email || 
      payload.data?.customer_email || 
      payload.data?.email ||
      payload.customer?.email;

    if (!userEmail) {
      return NextResponse.json({ message: 'No email found, but webhook received' }, { status: 200 })
    }

    console.log(`✅ Upgrade User: ${userEmail}`)

    // 3. Update Database Jadi Premium
    const { error } = await supabaseAdmin
      .from('profiles')
      .update({ 
        is_premium: true, 
        premium_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() 
      })
      .eq('email', userEmail)

    if (error) {
      console.error("❌ DB Error:", error)
      return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (err: any) {
    console.error("❌ Server Error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}