import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Inisialisasi Supabase Admin (Gunakan Service Role Key agar bisa update data)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Verifikasi sinyal dari Doku (Status 'SUCCESS')
    if (body.transaction.status === 'SUCCESS') {
      const emailUser = body.customer.email; // Email yang dipakai saat bayar di Doku

      // 2. Update Database: Ubah status user jadi Premium
      const { error } = await supabase
        .from('profiles')
        .update({ 
          is_premium: true,
          premium_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Aktif 30 hari
        })
        .eq('email', emailUser);

      if (error) throw error;
      
      console.log(`User ${emailUser} berhasil di-upgrade ke Premium!`);
      return NextResponse.json({ status: 'OK' });
    }

    return NextResponse.json({ status: 'FAILED' });
  } catch (error) {
    return NextResponse.json({ error: 'Webhook Error' }, { status: 500 });
  }
}