"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const productId = searchParams.get("productId") || "";
  const productName = searchParams.get("productName") || "";
  const productDescription = searchParams.get("productDescription") || "";
  const price = parseInt(searchParams.get("price") || "0");
  const quantity = parseInt(searchParams.get("quantity") || "1");
  const image = searchParams.get("image") || "";

  const totalPrice = price * quantity;

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
    customerCity: "",
    customerNotes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.customerName || !formData.customerPhone || !formData.customerAddress) {
      setError("الرجاء ملء جميع الحقول المطلوبة");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          productName,
          productDescription,
          quantity,
          price,
          ...formData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.error || `خطأ في الخادم: ${response.status}`);
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.success && data.order) {
        const orderId = data.order.order_number || data.order.id;
        if (orderId) {
          router.push(`/orders/${orderId}`);
        } else {
          router.push("/orders");
        }
      } else {
        setError(data.error || "حدث خطأ في إتمام الطلب");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("حدث خطأ في الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  if (!productId) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4">
        <p className="text-xl">لا يوجد منتج محدد</p>
        <Link href="/">
          <Button>العودة للصفحة الرئيسية</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-8 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-[#A5B68D] to-[#8FA878] py-8 px-6 rounded-3xl mb-8">
          <h1 className="text-3xl font-bold text-white text-center">
            إتمام الطلب
          </h1>
          <p className="text-white/90 text-center mt-2">
            أدخل بياناتك لإتمام عملية الشراء
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-bold mb-4">تفاصيل المنتج</h2>
            
            {image && (
              <img
                src={image}
                alt={productName}
                className="w-full h-48 object-contain rounded-xl mb-4 bg-gray-100"
              />
            )}
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">اسم المنتج</p>
                <p className="font-medium">{productName}</p>
              </div>
              
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">السعر</p>
                  <p className="font-medium">{price.toLocaleString()} EGP</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الكمية</p>
                  <p className="font-medium">{quantity}</p>
                </div>
              </div>
              
              <div className="pt-3 border-t">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">الإجمالي</p>
                  <p className="text-2xl font-bold text-rose-500">
                    {totalPrice.toLocaleString()} EGP
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-bold mb-4">بيانات التوصيل</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="customerName">الاسم الكامل *</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="أدخل اسمك الكامل"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="customerPhone">رقم الهاتف *</Label>
                <Input
                  id="customerPhone"
                  name="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  placeholder="01xxxxxxxxx"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="customerEmail">البريد الإلكتروني</Label>
                <Input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="customerCity">المدينة *</Label>
                <Input
                  id="customerCity"
                  name="customerCity"
                  value={formData.customerCity}
                  onChange={handleChange}
                  placeholder="القاهرة"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="customerAddress">العنوان بالتفصيل *</Label>
                <Input
                  id="customerAddress"
                  name="customerAddress"
                  value={formData.customerAddress}
                  onChange={handleChange}
                  placeholder="الشارع، المنطقة، رقم العمارة، الشقة"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="customerNotes">ملاحظات إضافية</Label>
                <textarea
                  id="customerNotes"
                  name="customerNotes"
                  value={formData.customerNotes}
                  onChange={handleChange}
                  placeholder="أي ملاحظات أو تعليمات إضافية..."
                  className="mt-1 w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                />
              </div>

              {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full py-6 text-lg rounded-xl"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    جاري إتمام الطلب...
                  </span>
                ) : (
                  "تأكيد الطلب"
                )}
              </Button>

              <Link href={`/product/${productId}`} className="block">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-xl"
                >
                  العودة للمنتج
                </Button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#A5B68D] mx-auto mb-4"></div>
          <p className="text-2xl font-bold">جاري التحميل...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
