// app/orders/[orderId]/page.tsx

"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Order } from "@/lib/supabase";

export default function SingleOrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const resolvedParams = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${resolvedParams.orderId}`);
      const data = await response.json();

      if (data.success) {
        setOrder(data.order);
      } else {
        setError(data.error || "الطلب غير موجود");
      }
    } catch (err) {
      setError("حدث خطأ في تحميل الطلب");
      console.error(err);
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
      pending: "bg-yellow-500",
      confirmed: "bg-blue-500",
      shipping: "bg-purple-500",
      delivered: "bg-green-500",
      cancelled: "bg-red-500",
    };
    return colorMap[status] || "bg-gray-500";
  };

  const getStatusIcon = (status: string) => {
    const iconMap: { [key: string]: string } = {
      pending: "⏳",
      confirmed: "✅",
      shipping: "🚚",
      delivered: "🎉",
      cancelled: "❌",
    };
    return iconMap[status] || "📦";
  };

  const copyLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    alert("تم نسخ رابط الطلب! ✅");
  };

  const copyOrderNumber = () => {
    if (order) {
      navigator.clipboard.writeText(`#${order.order_number}`);
      alert("تم نسخ رقم الطلب! ✅");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-[#A5B68D] mx-auto mb-4"></div>
          <p className="text-2xl font-bold">جاري تحميل الطلب...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl">
          <div className="text-6xl mb-6">😕</div>
          <h1 className="text-3xl font-bold mb-4">الطلب غير موجود</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/">
            <Button size="lg">العودة للرئيسية</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#A5B68D] to-[#8FA878] py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">📦</div>
            <h1 className="text-4xl font-bold mb-2" dir="rtl">
              تتبع الطلب
            </h1>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 inline-block cursor-pointer hover:bg-white/30 transition-all" onClick={copyOrderNumber}>
              <p className="text-3xl font-black">
                #{order.order_number}
              </p>
            </div>
            <p className="text-sm opacity-75 mt-2">اضغط للنسخ</p>
          </div>
        </div>
      </div>

      {/* Order Status Timeline */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex justify-center items-center mb-8">
            <div
              className={`${getStatusColor(
                order.status
              )} text-white px-8 py-4 rounded-full text-2xl font-bold flex items-center gap-3`}
            >
              <span>{getStatusIcon(order.status)}</span>
              <span>{getStatusText(order.status)}</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative" dir="rtl">
            <div className="absolute right-1/2 transform translate-x-1/2 h-full w-1 bg-gray-200"></div>

            <div className="space-y-8">
              {/* Pending */}
              <div className="flex items-center gap-4">
                <div className="flex-1 text-right">
                  <h3 className="font-bold text-lg">تم استلام الطلب</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleString("ar-EG")}
                  </p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full z-10 ${
                    order.status !== "cancelled" ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
                <div className="flex-1"></div>
              </div>

              {/* Confirmed */}
              <div className="flex items-center gap-4">
                <div className="flex-1"></div>
                <div
                  className={`w-6 h-6 rounded-full z-10 ${
                    ["confirmed", "shipping", "delivered"].includes(order.status)
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                ></div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-lg">تم تأكيد الطلب</h3>
                  {order.confirmed_at && (
                    <p className="text-sm text-gray-500">
                      {new Date(order.confirmed_at).toLocaleString("ar-EG")}
                    </p>
                  )}
                </div>
              </div>

              {/* Shipping */}
              <div className="flex items-center gap-4">
                <div className="flex-1 text-right">
                  <h3 className="font-bold text-lg">جاري الشحن</h3>
                  {order.shipped_at && (
                    <p className="text-sm text-gray-500">
                      {new Date(order.shipped_at).toLocaleString("ar-EG")}
                    </p>
                  )}
                </div>
                <div
                  className={`w-6 h-6 rounded-full z-10 ${
                    ["shipping", "delivered"].includes(order.status)
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                ></div>
                <div className="flex-1"></div>
              </div>

              {/* Delivered */}
              <div className="flex items-center gap-4">
                <div className="flex-1"></div>
                <div
                  className={`w-6 h-6 rounded-full z-10 ${
                    order.status === "delivered" ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-lg">تم التوصيل</h3>
                  {order.delivered_at && (
                    <p className="text-sm text-gray-500">
                      {new Date(order.delivered_at).toLocaleString("ar-EG")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Products List */}
          <div className="bg-white rounded-2xl shadow-lg p-8" dir="rtl">
            <h2 className="text-2xl font-bold mb-6 text-right">المنتجات المطلوبة</h2>
            <div className="space-y-4">
              {order.items && Array.isArray(order.items) ? (
                order.items.map((item: any, index: number) => (
                  <div key={index} className="flex gap-4 border-b pb-4 items-center">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="size-20 object-contain rounded-lg bg-gray-50"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-lg text-right">{item.name}</p>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-gray-600 text-sm">
                          الكمية: {item.quantity}
                        </p>
                        <p className="font-bold text-orange-600">
                          {item.price ? item.price.toLocaleString() : 0} جنيه
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="border-b pb-4">
                    <p className="text-gray-600 text-sm text-right">اسم المنتج</p>
                    <p className="font-bold text-xl text-right">{order.product_name}</p>
                  </div>

                  {order.product_description && (
                    <div className="border-b pb-4">
                      <p className="text-gray-600 text-sm text-right">الوصف</p>
                      <p className="text-right">{order.product_description}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600 text-sm text-right">الكمية</p>
                      <p className="font-bold text-2xl text-right">{order.quantity}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600 text-sm text-right">السعر</p>
                      <p className="font-bold text-2xl text-right">{order.price} جنيه</p>
                    </div>
                  </div>
                </>
              )}

              <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
                <p className="text-gray-600 text-sm text-right mb-2">الإجمالي النهائي</p>
                <p className="font-bold text-3xl text-orange-600 text-right">
                  {order.total_price.toLocaleString()} جنيه
                </p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white rounded-2xl shadow-lg p-8" dir="rtl">
            <h2 className="text-2xl font-bold mb-6 text-right">معلومات العميل</h2>
            <div className="space-y-4">
              {order.customer_name && (
                <div className="border-b pb-4">
                  <p className="text-gray-600 text-sm text-right">الاسم</p>
                  <p className="font-bold text-lg text-right">{order.customer_name}</p>
                </div>
              )}

              {order.customer_phone && (
                <div className="border-b pb-4">
                  <p className="text-gray-600 text-sm text-right">رقم الهاتف</p>
                  <p className="font-bold text-lg text-right" dir="ltr">
                    {order.customer_phone}
                  </p>
                </div>
              )}

              {order.customer_email && (
                <div className="border-b pb-4">
                  <p className="text-gray-600 text-sm text-right">البريد الإلكتروني</p>
                  <p className="font-bold text-lg text-right">{order.customer_email}</p>
                </div>
              )}

              {order.customer_city && (
                <div className="border-b pb-4">
                  <p className="text-gray-600 text-sm text-right">المدينة</p>
                  <p className="font-bold text-lg text-right">{order.customer_city}</p>
                </div>
              )}

              {order.customer_address && (
                <div className="border-b pb-4">
                  <p className="text-gray-600 text-sm text-right">العنوان</p>
                  <p className="font-bold text-lg text-right">{order.customer_address}</p>
                </div>
              )}

              {order.customer_notes && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm text-right mb-2">ملاحظات</p>
                  <p className="text-right">{order.customer_notes}</p>
                </div>
              )}

              {!order.customer_name &&
                !order.customer_phone &&
                !order.customer_email && (
                  <p className="text-gray-400 text-center py-8">
                    لا توجد معلومات عميل
                  </p>
                )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button onClick={copyLink} size="lg" className="text-lg">
              📋 نسخ رابط الطلب
            </Button>
            <Button onClick={copyOrderNumber} variant="secondary" size="lg" className="text-lg">
              #️⃣ نسخ رقم الطلب
            </Button>
            <Link href="/">
              <Button variant="outline" size="lg" className="text-lg w-full md:w-auto">
                🏠 العودة للرئيسية
              </Button>
            </Link>
            <a href="tel:01009758799">
              <Button variant="secondary" size="lg" className="text-lg w-full md:w-auto">
                📞 اتصل بنا
              </Button>
            </a>
          </div>
        </div>

        {/* Share on WhatsApp */}
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-8" dir="rtl">
          <h3 className="text-xl font-bold text-right mb-4 text-green-800">
            💬 مشاركة عبر واتساب
          </h3>
          <p className="text-right text-gray-700 mb-4">
            يمكنك مشاركة رابط التتبع مع أصدقائك أو عائلتك
          </p>
          <a
            href={`https://wa.me/?text=تتبع طلبي رقم #${order.order_number} من هنا: ${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button size="lg" className="w-full bg-green-600 hover:bg-green-700">
              مشاركة على واتساب 📱
            </Button>
          </a>
        </div>

        {/* Order ID */}
        <div className="text-center pb-8">
          <p className="text-sm text-gray-400">معرف النظام:</p>
          <p className="text-xs text-gray-400 font-mono">{order.id}</p>
        </div>
      </div>
    </div>
  );
}