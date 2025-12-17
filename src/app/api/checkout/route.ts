// app/api/checkout/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log('📦 البيانات المستلمة:', body);

    const { 
      productId, 
      productName, 
      productDescription,
      quantity, 
      price, 
      discountPrice,
      customerName, 
      customerPhone, 
      customerEmail,
      customerAddress,
      customerCity,
      customerNotes
    } = body;

    // التحقق من البيانات الأساسية
    if (!productId || !productName || !quantity || !price) {
      return NextResponse.json(
        { error: "جميع الحقول الأساسية مطلوبة: productId, productName, quantity, price" },
        { status: 400 }
      );
    }

    // التحقق من الكمية
    if (quantity < 1 || quantity > 40) {
      return NextResponse.json(
        { error: "الكمية يجب أن تكون بين 1 و 40" },
        { status: 400 }
      );
    }

    // حساب السعر الإجمالي
    const totalPrice = quantity * price;

    const orderData = {
      product_id: parseInt(productId),
      product_name: String(productName),
      product_description: productDescription || null,
      quantity: parseInt(quantity),
      price: parseInt(price),
      discount_price: discountPrice ? parseInt(discountPrice) : null,
      total_price: totalPrice,
      customer_name: customerName || null,
      customer_phone: customerPhone || null,
      customer_email: customerEmail || null,
      customer_address: customerAddress || null,
      customer_city: customerCity || null,
      customer_notes: customerNotes || null,
      status: 'pending',
      payment_status: 'unpaid'
    };

    console.log('💾 البيانات المرسلة لـ Supabase:', orderData);

    // حفظ الطلب في Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (error) {
      console.error("❌ خطأ Supabase:", error);
      console.error("رسالة الخطأ:", error.message);
      console.error("تفاصيل الخطأ:", error.details);
      console.error("كود الخطأ:", error.code);

      return NextResponse.json(
        { 
          error: "حدث خطأ في حفظ الطلب",
          details: error.message,
          code: error.code,
          hint: error.hint
        },
        { status: 500 }
      );
    }

    console.log('✅ تم حفظ الطلب بنجاح:', data);

    return NextResponse.json(
      { 
        success: true, 
        message: "تم إتمام الطلب بنجاح ✅",
        orderId: data.id,
        order: data
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("❌ خطأ عام في API:", error);
    return NextResponse.json(
      { 
        error: "حدث خطأ أثناء معالجة الطلب",
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// جلب جميع الطلبات
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');

    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (phone) {
      query = query.eq('customer_phone', phone);
    }

    const { data, error } = await query;

    if (error) {
      console.error("❌ خطأ في جلب الطلبات:", error);
      throw error;
    }

    console.log(`✅ تم جلب ${data.length} طلب`);

    return NextResponse.json({ 
      success: true,
      orders: data,
      count: data.length 
    });

  } catch (error: any) {
    console.error("❌ خطأ في جلب الطلبات:", error);
    return NextResponse.json(
      { 
        error: "حدث خطأ أثناء جلب الطلبات",
        details: error.message 
      },
      { status: 500 }
    );
  }
}