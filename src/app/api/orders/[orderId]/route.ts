// app/api/orders/[orderId]/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    console.log('🔍 البحث عن طلب:', orderId);

    // تحقق إذا كان orderId رقم (order_number) أو UUID
    const isNumber = /^\d+$/.test(orderId);

    let query = supabase.from('orders').select('*');

    if (isNumber) {
      // البحث برقم الطلب القصير
      query = query.eq('order_number', parseInt(orderId));
      console.log('🔢 البحث برقم الطلب:', orderId);
    } else {
      // البحث بالـ UUID
      query = query.eq('id', orderId);
      console.log('🆔 البحث بالـ UUID:', orderId);
    }

    const { data, error } = await query.single();

    if (error) {
      console.error("❌ خطأ في جلب الطلب:", error);
      return NextResponse.json(
        { 
          success: false,
          error: "الطلب غير موجود" 
        },
        { status: 404 }
      );
    }

    console.log('✅ تم العثور على الطلب:', data.order_number);

    return NextResponse.json({
      success: true,
      order: data
    });

  } catch (err: any) {
    console.error("❌ خطأ عام:", err);
    return NextResponse.json(
      { 
        success: false,
        error: "حدث خطأ أثناء جلب الطلب" 
      },
      { status: 500 }
    );
  }
}