"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LucidePackage,
  LucideEye,
  LucideCheckCircle,
  LucideTruck,
  LucideClock,
  LucideXCircle,
  LucideLock,
  LucideShoppingBag,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrdersAdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const checkPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "mu7ammad2004") {
      setIsAuthorized(true);
      fetchOrders();
    } else {
      toast.error("كلمة المرور غير صحيحة");
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/orders");
      
      // Check if response is ok and has content
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const text = await response.text();
      if (!text) {
        setOrders([]);
        return;
      }

      const data = JSON.parse(text);
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error("فشل تحميل الطلبات");
      }
    } catch (err) {
      console.error("خطأ في جلب الطلبات:", err);
      toast.error("حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        toast.success("تم تحديث حالة الطلب بنجاح");
      } else {
        toast.error("فشل تحديث الحالة");
      }
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء التحديث");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <LucideClock className="text-amber-500" />;
      case "confirmed": return <LucideCheckCircle className="text-blue-500" />;
      case "shipping": return <LucideTruck className="text-purple-500" />;
      case "delivered": return <LucideCheckCircle className="text-emerald-500" />;
      case "cancelled": return <LucideXCircle className="text-rose-500" />;
      default: return <LucidePackage className="text-gray-500" />;
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4" dir="rtl">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <LucideLock size={32} className="text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">لوحة التحكم</h1>
          <p className="text-gray-500 text-center mb-8">يرجى إدخال كلمة المرور للمتابعة</p>
          <form onSubmit={checkPassword} className="space-y-4">
            <Input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl py-6 text-center text-lg"
              autoFocus
            />
            <Button type="submit" className="w-full rounded-xl py-6 text-lg font-bold">
              دخول
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 w-full" dir="rtl">
      <div className="bg-[#A5B68D] pt-12 pb-20 px-4 text-white text-center">
        <LucidePackage className="mx-auto size-12 mb-4 opacity-90" />
        <h1 className="text-3xl font-bold mb-2">إدارة الطلبات</h1>
        <p className="opacity-80">عرض وتعديل حالات الطلبات الواردة</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-12">
        <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold">قائمة الطلبات ({orders.length})</h2>
            <Button onClick={fetchOrders} variant="outline" size="sm" className="rounded-full">
              تحديث البيانات
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-bold border-b">رقم الطلب</th>
                  <th className="px-6 py-4 font-bold border-b">العميل</th>
                  <th className="px-6 py-4 font-bold border-b">المنتجات</th>
                  <th className="px-6 py-4 font-bold border-b">الإجمالي</th>
                  <th className="px-6 py-4 font-bold border-b">الحالة</th>
                  <th className="px-6 py-4 font-bold border-b">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      جاري تحميل الطلبات...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      لا توجد طلبات حالياً
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-primary">
                        #{order.order_number}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold">{order.customer_name}</div>
                        <div className="text-xs text-gray-400">{order.customer_phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm max-w-[200px] truncate">
                          {Array.isArray(order.json) 
                            ? order.json.map((i:any) => i.name).join('، ')
                            : order.product_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-rose-500 whitespace-nowrap">
                        {order.total_price?.toLocaleString()} EGP
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Select
                            defaultValue={order.status}
                            onValueChange={(val: string) => updateStatus(order.id, val)}
                          >
                            <SelectTrigger className="w-[140px] rounded-full h-9 text-xs font-bold border-2">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(order.status)}
                                <SelectValue />
                              </div>
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl">
                              <SelectItem value="pending">قيد الانتظار</SelectItem>
                              <SelectItem value="confirmed">مؤكد</SelectItem>
                              <SelectItem value="shipping">جاري الشحن</SelectItem>
                              <SelectItem value="delivered">تم التوصيل</SelectItem>
                              <SelectItem value="cancelled">ملغي</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Button asChild variant="ghost" size="sm" className="rounded-full hover:bg-primary/10 text-primary">
                          <Link href={`/orders/${order.order_number}`} target="_blank">
                            <LucideEye size={18} />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
