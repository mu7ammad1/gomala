"use client";

import { useEffect, useState, useMemo } from "react";
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
  LucideLayoutDashboard,
  LucideCalendar,
  LucideFilter,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function OrdersAdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

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

  const updateStatus = async (orderNumber: string, newStatus: string) => {
    try {
      console.log("Updating order number:", orderNumber, "to", newStatus);
      const response = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderNumber, status: newStatus }),
      });
      
      const data = await response.json();
      if (data.success) {
        setOrders(prev => prev.map(o => o.order_number === orderNumber ? { ...o, status: newStatus } : o));
        toast.success("تم تحديث حالة الطلب بنجاح");
      } else {
        toast.error(data.error || "فشل تحديث الحالة");
      }
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء التحديث");
    }
  };

  const stats = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const lastWeek = today - 7 * 24 * 60 * 60 * 1000;
    const lastMonth = today - 30 * 24 * 60 * 60 * 1000;

    return {
      daily: orders.filter(o => new Date(o.created_at).getTime() >= today),
      weekly: orders.filter(o => new Date(o.created_at).getTime() >= lastWeek),
      monthly: orders.filter(o => new Date(o.created_at).getTime() >= lastMonth),
      total: orders
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    switch (activeTab) {
      case "daily": return stats.daily;
      case "weekly": return stats.weekly;
      case "monthly": return stats.monthly;
      default: return stats.total;
    }
  }, [activeTab, stats]);

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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "قيد الانتظار";
      case "confirmed": return "مؤكد";
      case "shipping": return "جاري الشحن";
      case "delivered": return "تم التوصيل";
      case "cancelled": return "ملغي";
      default: return status;
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
        <LucideLayoutDashboard className="mx-auto size-12 mb-4 opacity-90" />
        <h1 className="text-3xl font-bold mb-2">إدارة الطلبات</h1>
        <p className="opacity-80">نظام الإشراف والمتابعة الشامل</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-12">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border text-center">
            <div className="text-gray-400 text-sm mb-1">اليوم</div>
            <div className="text-2xl font-bold text-primary">{stats.daily.length}</div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border text-center">
            <div className="text-gray-400 text-sm mb-1">الأسبوع</div>
            <div className="text-2xl font-bold text-[#A5B68D]">{stats.weekly.length}</div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border text-center">
            <div className="text-gray-400 text-sm mb-1">الشهر</div>
            <div className="text-2xl font-bold text-blue-500">{stats.monthly.length}</div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border text-center">
            <div className="text-gray-400 text-sm mb-1">الإجمالي</div>
            <div className="text-2xl font-bold text-rose-500">{stats.total.length}</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <div className="p-4 md:p-6 border-b flex flex-col md:flex-row justify-between items-center bg-gray-50/50 gap-4">
              <div className="flex items-center gap-4">
                <LucideFilter className="text-gray-400" size={20} />
                <TabsList className="bg-white border rounded-full p-1 h-auto">
                  <TabsTrigger value="all" className="rounded-full px-6 py-2 data-[state=active]:bg-[#A5B68D] data-[state=active]:text-white">الكل</TabsTrigger>
                  <TabsTrigger value="daily" className="rounded-full px-6 py-2 data-[state=active]:bg-[#A5B68D] data-[state=active]:text-white">يومي</TabsTrigger>
                  <TabsTrigger value="weekly" className="rounded-full px-6 py-2 data-[state=active]:bg-[#A5B68D] data-[state=active]:text-white">أسبوعي</TabsTrigger>
                  <TabsTrigger value="monthly" className="rounded-full px-6 py-2 data-[state=active]:bg-[#A5B68D] data-[state=active]:text-white">شهري</TabsTrigger>
                </TabsList>
              </div>
              <Button onClick={fetchOrders} variant="outline" size="sm" className="rounded-full h-10 px-6 font-bold">
                تحديث البيانات
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-bold border-b">الطلب</th>
                    <th className="px-6 py-4 font-bold border-b">العميل</th>
                    <th className="px-6 py-4 font-bold border-b">التاريخ</th>
                    <th className="px-6 py-4 font-bold border-b">الإجمالي</th>
                    <th className="px-6 py-4 font-bold border-b">الحالة</th>
                    <th className="px-6 py-4 font-bold border-b text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        جاري تحميل الطلبات...
                      </td>
                    </tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        لا توجد طلبات في هذه الفترة
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-mono font-bold text-primary">#{order.order_number}</div>
                          <div className="text-[10px] text-gray-400 truncate max-w-[100px]">{order.id}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold">{order.customer_name}</div>
                          <div className="text-xs text-gray-400">{order.customer_phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs">
                            {new Date(order.created_at).toLocaleDateString('ar-EG')}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            {new Date(order.created_at).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-rose-500 whitespace-nowrap">
                          {order.total_price?.toLocaleString()} EGP
                        </td>
                        <td className="px-6 py-4">
                          <Select
                            defaultValue={order.status}
                            onValueChange={(val: string) => updateStatus(order.order_number, val)}
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
                        </td>
                        <td className="px-6 py-4 text-center">
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
          </Tabs>
        </div>
      </div>
    </div>
  );
}
