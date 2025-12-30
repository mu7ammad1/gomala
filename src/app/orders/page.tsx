// app/orders/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Order } from "@/lib/supabase";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/checkout");
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error("خطأ في جلب الطلبات:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: "قيد الانتظار",
      confirmed: "مؤكد",
      shipping: "جاري الشحن",
      delivered: "تم التوصيل",
      cancelled: "ملغي",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: string } = {
      pending: "bg-yellow-200 text-yellow-800",
      confirmed: "bg-blue-200 text-blue-800",
      shipping: "bg-purple-200 text-purple-800",
      delivered: "bg-green-200 text-green-800",
      cancelled: "bg-red-200 text-red-800",
    };
    return colorMap[status] || "bg-gray-200 text-gray-800";
  };

  const getPaymentStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      unpaid: "غير مدفوع",
      paid: "مدفوع",
      refunded: "مسترد",
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#A5B68D] mx-auto mb-4"></div>
          <p className="text-2xl font-bold">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#A5B68D] to-[#8FA878] py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4" dir="rtl">
            طلباتي 📦
          </h1>
          <p className="text-xl text-white/90" dir="rtl">
            تتبع جميع طلباتك من هنا
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold" dir="rtl">
            عدد الطلبات: {orders.length}
          </h2>
          <Link href="/">
            <Button variant="outline">العودة للرئيسية</Button>
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-2xl text-gray-500 mb-6" dir="rtl">
              لا توجد طلبات بعد
            </p>
            <Link href="/">
              <Button size="lg">تصفح المنتجات</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-200"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div className="flex-1" dir="rtl">
                    <div className="flex items-center justify-end gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-right">
                        {order.items && Array.isArray(order.items) 
                          ? `${order.items[0].name} ${order.items.length > 1 ? `و ${order.items.length - 1} منتجات أخرى` : ''}`
                          : order.product_name}
                      </h3>
                      <span className="bg-[#A5B68D] text-white px-3 py-1 rounded-full text-sm font-bold">
                        #{order.order_number}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        order.payment_status === "paid"
                          ? "bg-green-200 text-green-800"
                          : "bg-orange-200 text-orange-800"
                      }`}
                    >
                      {getPaymentStatusText(order.payment_status)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded-lg" dir="rtl">
                    <p className="text-gray-600 text-right mb-1">عدد المنتجات</p>
                    <p className="font-bold text-xl text-right">
                      {order.items && Array.isArray(order.items) 
                        ? order.items.reduce((sum: number, item: any) => sum + item.quantity, 0)
                        : order.quantity}
                    </p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg col-span-3" dir="rtl">
                    <p className="text-gray-600 text-right mb-1">الإجمالي النهائي</p>
                    <p className="font-bold text-2xl text-orange-600 text-right">
                      {order.total_price ? order.total_price.toLocaleString() : 0} جنيه
                    </p>
                  </div>
                </div>

                {(order.customer_name || order.customer_phone) && (
                  <div className="border-t pt-4 mt-4">
                    <p className="text-sm text-gray-600 mb-2" dir="rtl">
                      معلومات العميل:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm" dir="rtl">
                      {order.customer_name && (
                        <p className="text-right">
                          <span className="font-semibold">الاسم:</span>{" "}
                          {order.customer_name}
                        </p>
                      )}
                      {order.customer_phone && (
                        <p className="text-right">
                          <span className="font-semibold">الهاتف:</span>{" "}
                          {order.customer_phone}
                        </p>
                      )}
                      {order.customer_email && (
                        <p className="text-right">
                          <span className="font-semibold">البريد:</span>{" "}
                          {order.customer_email}
                        </p>
                      )}
                      {order.customer_city && (
                        <p className="text-right">
                          <span className="font-semibold">المدينة:</span>{" "}
                          {order.customer_city}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4 pt-4 border-t  w-full">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500" dir="rtl">
                      {new Date(order.created_at).toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex gap-2 w-full">
                    <Link href={`/orders/${order.order_number}`}>
                      <Button variant="outline" size="sm">
                        تتبع #{order.order_number} 📦
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}