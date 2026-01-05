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

    // تحديث البيانات باستخدام رقم الطلب (order_number) مباشرة كما طلب المستخدم
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('order_number', id)
      .select();

    if (error) {
      console.error("❌ خطأ في تحديث الحالة:", error);
      return NextResponse.json(
        { success: false, error: "فشل تحديث الحالة: " + error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      console.error("❌ لم يتم العثور على الطلب برقم:", id);
      return NextResponse.json(
        { success: false, error: "الطلب غير موجود برقم: " + id },
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
