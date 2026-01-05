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
    
    let query = supabase.from('orders').update({ status });

    if (isUUID) {
      // If it's a UUID, only query by the 'id' column which is the UUID primary key
      const { data, error } = await query.eq('id', id).select();
      
      if (error) {
        console.error("❌ خطأ في تحديث الحالة (UUID):", error);
        return NextResponse.json(
          { success: false, error: "فشل تحديث الحالة: " + error.message },
          { status: 500 }
        );
      }

      if (data && data.length > 0) {
        return NextResponse.json({ success: true, order: data[0] });
      }
    } else {
      // If it's not a UUID, it must be the order_number (integer)
      const orderNumber = parseInt(id);
      if (!isNaN(orderNumber)) {
        const { data, error } = await query.eq('order_number', orderNumber).select();
        
        if (error) {
          console.error("❌ خطأ في تحديث الحالة (رقم الطلب):", error);
          return NextResponse.json(
            { success: false, error: "فشل تحديث الحالة: " + error.message },
            { status: 500 }
          );
        }

        if (data && data.length > 0) {
          return NextResponse.json({ success: true, order: data[0] });
        }
      }
    }

    // If we reached here, no order was found or updated
    console.error("❌ لم يتم العثور على الطلب لتحديثه:", id);
    return NextResponse.json(
      { success: false, error: "الطلب غير موجود في قاعدة البيانات" },
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
