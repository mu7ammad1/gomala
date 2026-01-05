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

    // Try updating by ID directly first (UUID or numeric)
    let { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select();

    // If not found by UUID/Internal ID, try order_number
    if (!error && (!data || data.length === 0)) {
      const { data: dataByNum, error: errorByNum } = await supabase
        .from('orders')
        .update({ status })
        .eq('order_number', id)
        .select();
      
      if (errorByNum) {
        console.error("❌ خطأ في تحديث الحالة (رقم الطلب):", errorByNum);
        return NextResponse.json(
          { success: false, error: "فشل تحديث الحالة: " + errorByNum.message },
          { status: 500 }
        );
      }

      if (dataByNum && dataByNum.length > 0) {
        data = dataByNum;
      }
    }

    if (error) {
      console.error("❌ خطأ في تحديث الحالة (ID):", error);
      // Fallback: try order_number even if first one errored (might be invalid UUID format)
      const { data: dataByNumFallback, error: errorByNumFallback } = await supabase
        .from('orders')
        .update({ status })
        .eq('order_number', id)
        .select();

      if (!errorByNumFallback && dataByNumFallback && dataByNumFallback.length > 0) {
        data = dataByNumFallback;
      } else {
        return NextResponse.json(
          { success: false, error: "فشل تحديث الحالة: " + error.message },
          { status: 500 }
        );
      }
    }

    if (!data || data.length === 0) {
      console.error("❌ لم يتم العثور على الطلب لتحديثه:", id);
      return NextResponse.json(
        { success: false, error: "الطلب غير موجود في قاعدة البيانات" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: data[0]
    });
  } catch (err: any) {
    console.error("❌ خطأ عام:", err);
    return NextResponse.json(
      { success: false, error: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}
