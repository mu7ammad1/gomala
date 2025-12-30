"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LucidePackage,
  LucideCopy,
  LucideHome,
  LucidePhone,
  LucideExternalLink,
} from "lucide-react";
import { toast } from "sonner";

export default function SingleOrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const resolvedParams = use(params);
  const [order, setOrder] = useState<any | null>(null);
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
      pending: "bg-amber-500",
      confirmed: "bg-blue-500",
      shipping: "bg-purple-500",
      delivered: "bg-emerald-500",
      cancelled: "bg-rose-500",
    };
    return colorMap[status] || "bg-gray-500";
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Event has been created.");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center w-full">
        <div className="flex flex-col gap-5 justify-center items-center">
          <LucideCopy size={16} className="animate-spin size-10 text-center" />

          <p className="text-xl font-bold text-gray-600">
            جاري تحميل بيانات الطلب...
          </p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
        <div className="text-center bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold mb-2">عذراً، الطلب غير موجود</h1>
          <p className="text-gray-500 mb-6">{error}</p>
          <Button asChild className="w-full rounded-xl py-6">
            <Link href="/">العودة للتسوق</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12 w-full" dir="rtl">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-[#A5B68D] to-[#8FA878] pt-12 pb-20 px-4 text-white text-center">
        <LucidePackage className="mx-auto size-12 mb-4 opacity-90" />
        <h1 className="text-3xl font-bold mb-2">تفاصيل الطلب</h1>
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
          <span className="text-lg font-mono font-bold">
            #{order.order_number}
          </span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(order.order_number.toString());
              toast.success("تم نسخ رقم الطلب");
            }}
          >
            <LucideCopy size={16} />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-12">
        {/* Status Card */}
        <div className="bg-white rounded-3xl shadow-sm border p-6 mb-6 flex flex-col items-center">
          <div
            className={`${getStatusColor(order.status)} text-white px-6 py-2 rounded-full font-bold text-lg mb-4 shadow-sm`}
          >
            {getStatusText(order.status)}
          </div>
          <p className="text-gray-500 text-sm">
            تاريخ الطلب:{" "}
            {new Date(order.created_at).toLocaleDateString("ar-EG", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Main Content - Items (3/5) */}
          <div className="md:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span>📦</span> المنتجات المطلوبة
              </h2>

              <div className="space-y-4">
                {Array.isArray(order.json) ? (
                  order.json.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex gap-4 items-center p-3 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                    >
                      <div className="size-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 line-clamp-1">
                          {item.name}
                        </h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm text-gray-500">
                            الكمية: {item.quantity}
                          </span>
                          <span className="font-bold text-[#8FA878]">
                            {item.price.toLocaleString()} EGP
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 bg-gray-50 rounded-2xl text-center">
                    <p className="font-bold">{order.product_name}</p>
                    <p className="text-sm text-gray-500">
                      الكمية: {order.quantity}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-dashed">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">
                    الإجمالي النهائي
                  </span>
                  <span className="text-2xl font-black text-rose-500">
                    {order.total_price?.toLocaleString()} EGP
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={copyLink}
                variant="outline"
                className="rounded-2xl py-6 gap-2 border-2"
              >
                <LucideExternalLink size={18} /> نسخ الرابط
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-2xl py-6 gap-2 border-2"
              >
                <Link href="/">
                  <LucideHome size={18} /> الرئيسية
                </Link>
              </Button>
            </div>
          </div>

          {/* Sidebar - Customer Info (2/5) */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span>👤</span> بيانات الشحن
              </h2>
              <div className="space-y-4 text-sm">
                <div>
                  <label className="text-gray-400 block mb-1">
                    الاسم الكامل
                  </label>
                  <p className="font-bold text-gray-800">
                    {order.customer_name}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">رقم الهاتف</label>
                  <p className="font-bold text-gray-800" dir="ltr">
                    {order.customer_phone}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">العنوان</label>
                  <p className="font-bold text-gray-800">
                    {order.customer_city}, {order.customer_address}
                  </p>
                </div>
                {order.customer_notes && (
                  <div className="p-3 bg-amber-50 rounded-xl text-amber-800 border border-amber-100">
                    <label className="text-amber-600/70 block text-xs mb-1">
                      ملاحظات العميل
                    </label>
                    <p>{order.customer_notes}</p>
                  </div>
                )}
              </div>
            </div>

            <a href="tel:01009758799" className="block">
              <Button className="w-full rounded-3xl py-8 bg-[#A5B68D] hover:bg-[#8FA878] shadow-lg shadow-[#A5B68D]/20 gap-3 text-lg">
                <LucidePhone size={20} /> اتصل بالدعم الفني
              </Button>
            </a>

            <div className="text-center opacity-30 select-none pt-4">
              <p className="text-[10px] font-mono uppercase tracking-widest">
                System ID: {order.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
