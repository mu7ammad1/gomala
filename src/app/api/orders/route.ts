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

    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("❌ خطأ في تحديث الحالة:", error);
      return NextResponse.json(
        { success: false, error: "فشل تحديث الحالة" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order: data
    });
  } catch (err: any) {
    console.error("❌ خطأ عام:", err);
    return NextResponse.json(
      { success: false, error: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}
