import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { 
      items,
      totalPrice,
      customerName, 
      customerPhone, 
      customerEmail,
      customerAddress,
      customerCity,
      customerNotes
    } = body;

    // 1. التحقق من البيانات
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "السلة فارغة" }, { status: 400 });
    }

    // 2. تجهيز البيانات لتتوافق مع الجدول
    // سنضع المنتجات كلها في حقل 'json' المتاح في جدولك
    const orderData = {
      json: items, // تخزين مصفوفة المنتجات كاملة هنا
      total_price: parseInt(totalPrice),
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      customer_address: customerAddress,
      customer_city: customerCity,
      customer_notes: customerNotes,
        pending: 'pending',
      payment_status: 'unpaid',
      // لإرضاء أعمدة الجدول القديمة (اختياري)
      product_name: items.length > 1 ? `طلب متعدد (${items.length} منتجات)` : items[0].name,
      quantity: items.reduce((acc: number, item: any) => acc + item.quantity, 0),
    };

    // 3. إدخال البيانات في Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      order: data 
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: "خطأ في المعالجة" }, { status: 500 });
  }
}