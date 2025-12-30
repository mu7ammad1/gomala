// lib/supabase.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// التحقق من وجود المتغيرات
if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL مفقود في ملف .env.local');
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseAnonKey) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY مفقود في ملف .env.local');
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

console.log('✅ Supabase URL:', supabaseUrl);
console.log('✅ Supabase Key exists:', supabaseAnonKey.substring(0, 20) + '...');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
});

// Types للطلبات
export interface Order {
  id: string;
  order_number: number;
  product_id?: number;
  product_name?: string;
  product_description?: string;
  quantity?: number;
  price?: number;
  discount_price?: number;
  total_price: number;
  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
  customer_address: string | null;
  customer_city: string | null;
  customer_notes: string | null;
  status: string;
  payment_status: string;
  created_at: string;
  confirmed_at: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  items?: any[];
}

// اختبار الاتصال
export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ خطأ في الاتصال بـ Supabase:', error);
      return false;
    }

    console.log('✅ الاتصال بـ Supabase ناجح');
    return true;
  } catch (err) {
    console.error('❌ خطأ في اختبار الاتصال:', err);
    return false;
  }
}