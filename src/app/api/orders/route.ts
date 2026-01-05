// src/app/api/orders/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("❌ خطأ في جلب جميع الطلبات:", error);
      return NextResponse.json(
        { success: false, error: "فشل جلب الطلبات" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orders: data
    });
  } catch (err: any) {
    console.error("❌ خطأ عام:", err);
    return NextResponse.json(
      { success: false, error: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "بيانات ناقصة" },
        { status: 400 }
      );
    }

    // Check if the provided ID is a valid UUID format
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    
    // We strictly want to UPDATE, not upsert, based on user requirements.
    // However, if the user sees "Not found", it means our query isn't hitting the right record.
    
    if (isUUID) {
      // Try updating by ID (UUID)
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select();
      
      if (!error && data && data.length > 0) {
        return NextResponse.json({ success: true, order: data[0] });
      }

      // If UUID didn't match 'id', maybe it's stored in 'order_number' (unlikely but safe)
      // or maybe the user wants us to try harder.
    }

    // Try updating by order_number (numeric or string)
    const { data: dataByNum, error: errorByNum } = await supabase
      .from('orders')
      .update({ status })
      .eq('order_number', id)
      .select();

    if (!errorByNum && dataByNum && dataByNum.length > 0) {
      return NextResponse.json({ success: true, order: dataByNum[0] });
    }

    // If still not found, and it's a numeric-looking ID, try parsing it
    const numericId = parseInt(id);
    if (!isNaN(numericId)) {
      const { data: dataByParsedNum, error: errorByParsedNum } = await supabase
        .from('orders')
        .update({ status })
        .eq('order_number', numericId)
        .select();

      if (!errorByParsedNum && dataByParsedNum && dataByParsedNum.length > 0) {
        return NextResponse.json({ success: true, order: dataByParsedNum[0] });
      }
    }

    // Last resort: If the user insists on "upsert" behavior or if the record is missing,
    // but they explicitly said "wants it to update, not create new", 
    // we should stick to finding why it's not found.
    
    console.error("❌ لم يتم العثور على الطلب لتحديثه:", id);
    return NextResponse.json(
      { success: false, error: "الطلب غير موجود في قاعدة البيانات. تأكد من صحة المعرف." },
      { status: 404 }
    );
  } catch (err: any) {
    console.error("❌ خطأ عام:", err);
    return NextResponse.json(
      { success: false, error: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}
