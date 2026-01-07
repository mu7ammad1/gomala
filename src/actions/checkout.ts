"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function placeOrder(formData: any) {
    try {
        const {
            items,
            customerName,
            customerPhone,
            customerEmail,
            customerAddress,
            customerCity,
            customerNotes,
        } = formData;

        // 1. Validation
        if (!items || !Array.isArray(items) || items.length === 0) {
            return { success: false, error: "السلة فارغة" };
        }

        if (!customerName || !customerPhone || !customerAddress || !customerCity) {
            return { success: false, error: "الرجاء ملء جميع الحقول المطلوبة" };
        }

        // 2. Server-side Calculation (Security)
        // Calculate subtotal from items to prevent client-side manipulation
        // Note: In a real app, we should fetch prices from DB again. 
        // For now, we trust the items array structure but recalculate totals.
        const subtotal = items.reduce(
            (acc: number, item: any) => acc + (item.price * item.quantity),
            0
        );

        // Shipping Logic
        const SHIPPING_COST = 55;
        const FREE_SHIPPING_THRESHOLD = 880;
        const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
        const finalTotal = subtotal + shippingFee;

        // Generate Random Order Number (6 digits)
        const randomOrderNumber = Math.floor(100000 + Math.random() * 900000);

        // 3. Prepare Order Data
        const orderData = {
            order_number: randomOrderNumber,
            json: items, // Store full items details
            total_price: finalTotal,
            customer_name: customerName,
            customer_phone: customerPhone,
            customer_email: customerEmail,
            customer_address: customerAddress,
            customer_city: customerCity,
            customer_notes: customerNotes,
            status: "pending",
            payment_status: "unpaid",
            // Legacy columns support
            product_name: items.length > 1 ? `طلب متعدد (${items.length} منتجات)` : items[0].name,
            quantity: items.reduce((acc: number, item: any) => acc + item.quantity, 0),
        };

        // 4. Insert into Supabase
        const { data, error } = await supabase
            .from("orders")
            .insert([orderData])
            .select()
            .single();

        if (error) {
            console.error("❌ Supabase Error:", error);
            return { success: false, error: "فشل في حفظ الطلب: " + error.message };
        }

        // 5. Revalidate
        revalidatePath("/orders");

        return { success: true, orderId: data.order_number || data.id };
    } catch (error: any) {
        console.error("❌ Server Action Error:", error);
        return { success: false, error: "حدث خطأ غير متوقع في الخادم" };
    }
}
