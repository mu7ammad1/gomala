"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { placeOrder } from "@/actions/checkout";
import { toast } from "sonner";
import {
  LucideTruck,
  LucideCheckCircle,
  LucideShieldCheck,
  LucideTrash2,
  LucideMinus,
  LucidePlus,
  LucideShoppingCart,
  LucideMapPin,
} from "lucide-react";

const GOVERNORATES = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "الدقهلية",
  "البحر الأحمر",
  "البحيرة",
  "الفيوم",
  "الغربية",
  "الإسماعيلية",
  "المنوفية",
  "المنيا",
  "القليوبية",
  "الوادي الجديد",
  "السويس",
  "أسوان",
  "أسيوط",
  "بني سويف",
  "بورسعيد",
  "دمياط",
  "الشرقية",
  "جنوب سيناء",
  "كفر الشيخ",
  "مطروح",
  "الأقصر",
  "قنا",
  "شمال سيناء",
  "سوهاج",
];

function CheckoutContent() {
  const router = useRouter();
  const { cart, totalPrice: subtotal, clearCart, updateQuantity, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("cart");

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
    customerCity: "",
    customerNotes: "",
  });

  // Shipping Logic
  const SHIPPING_COST = 55;
  const FREE_SHIPPING_THRESHOLD = 880;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = isFreeShipping ? 0 : SHIPPING_COST;
  const finalTotal = subtotal + shippingFee;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCityChange = (value: string) => {
    setFormData({
      ...formData,
      customerCity: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);
    setError("");

    if (
      !formData.customerName ||
      !formData.customerPhone ||
      !formData.customerAddress ||
      !formData.customerCity
    ) {
      setError("الرجاء ملء جميع الحقول المطلوبة");
      setLoading(false);
      return;
    }

    try {
      const orderData = {
        items: cart,
        ...formData,
      };

      const result = await placeOrder(orderData);

      if (result.success && result.orderId) {
        clearCart();
        toast.success("تم استلام طلبك بنجاح!");
        router.push(`/orders/${result.orderId}`);
      } else {
        setError(result.error || "حدث خطأ في إتمام الطلب");
        toast.error(result.error || "فشل إرسال الطلب");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col justify-center items-center gap-6"
        dir="rtl"
      >
        <div className="bg-gray-100 p-6 rounded-full">
          <LucideCheckCircle className="size-16 text-gray-400" />
        </div>
        <p className="text-2xl font-bold text-gray-600">سلة التسوق فارغة</p>
        <Link href="/">
          <Button size="lg" className="rounded-xl px-8">
            العودة للتسوق
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-12 px-4 bg-gray-50/50" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            متابعة الشراء
          </h1>
          <p className="text-gray-500">خطوات بسيطة لإتمام طلبك</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white p-1 h-14 rounded-2xl border shadow-sm">
            <TabsTrigger
              value="cart"
              className="text-base rounded-xl data-[state=active]:bg-[#A5B68D] data-[state=active]:text-white transition-all"
            >
              <LucideShoppingCart className="ml-2 w-4 h-4" /> مراجعة السلة
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="text-base rounded-xl data-[state=active]:bg-[#A5B68D] data-[state=active]:text-white transition-all"
            >
              <LucideMapPin className="ml-2 w-4 h-4" /> بيانات الشحن
            </TabsTrigger>
          </TabsList>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className={`lg:col-span-2 ${activeTab === "shipping" ? "hidden lg:block" : ""}`}>
              <TabsContent value="cart" forceMount className={activeTab === 'cart' ? 'block' : 'hidden lg:hidden'}>
                <Card className="border-none shadow-lg rounded-3xl overflow-hidden">
                  <CardHeader className="bg-white border-b px-8 py-6">
                    <CardTitle>محتويات السلة ({cart.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {cart.map((item) => (
                        <div key={item.id} className="p-6 flex gap-4 hover:bg-gray-50/50 transition-colors">
                          <div className="size-24 rounded-2xl border bg-white p-2 shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight">
                                {item.name}
                              </h3>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-400 hover:text-red-500 hover:bg-red-50 -mt-2 -ml-2"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <LucideTrash2 size={18} />
                              </Button>
                            </div>

                            <div className="flex justify-between items-end mt-4">
                              <div className="flex items-center gap-3 bg-gray-100/80 rounded-xl p-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-lg bg-white shadow-sm hover:bg-gray-50"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <LucideMinus size={14} />
                                </Button>
                                <span className="w-4 text-center font-bold text-sm">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-lg bg-white shadow-sm hover:bg-gray-50"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  disabled={item.quantity >= 40}
                                >
                                  <LucidePlus size={14} />
                                </Button>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-primary">
                                  {(item.price * item.quantity).toLocaleString()} ج.م
                                </p>
                                {item.quantity > 1 && (
                                  <p className="text-xs text-muted-foreground">
                                    {item.price.toLocaleString()} ج.م للقطعة
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 bg-gray-50 border-t flex justify-end">
                    <Button
                      onClick={() => setActiveTab("shipping")}
                      className="rounded-xl px-8 py-6 text-lg font-bold shadow-lg"
                    >
                      متابعة للدفع
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="shipping" forceMount className={activeTab === 'shipping' ? 'block' : 'hidden lg:hidden'}>
                <Card className="border-none shadow-lg rounded-3xl overflow-hidden">
                  <CardHeader className="bg-white border-b px-8 py-6">
                    <CardTitle className="flex items-center gap-2">
                      <LucideShieldCheck className="text-primary" />
                      بيانات التوصيل
                    </CardTitle>
                    <CardDescription>
                      يرجى إدخال عنوان صحيح لضمان سرعة التوصيل
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form
                      id="checkout-form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="customerName">الاسم الكامل *</Label>
                          <Input
                            id="customerName"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            placeholder="مثال: محمد أحمد"
                            required
                            className="rounded-xl h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="customerPhone">رقم الهاتف *</Label>
                          <Input
                            id="customerPhone"
                            name="customerPhone"
                            type="tel"
                            value={formData.customerPhone}
                            onChange={handleChange}
                            placeholder="01xxxxxxxxx"
                            required
                            className="rounded-xl h-12 text-left"
                            dir="ltr"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="customerEmail">
                          البريد الإلكتروني (اختياري)
                        </Label>
                        <Input
                          id="customerEmail"
                          name="customerEmail"
                          type="email"
                          value={formData.customerEmail}
                          onChange={handleChange}
                          placeholder="example@email.com"
                          className="rounded-xl h-12 text-left"
                          dir="ltr"
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="customerCity">المحافظة *</Label>
                          <Select
                            name="customerCity"
                            value={formData.customerCity}
                            onValueChange={handleCityChange}
                            required
                          >
                            <SelectTrigger className="w-full rounded-xl h-12">
                              <SelectValue placeholder="اختر المحافظة" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[200px]" align="end">
                              {GOVERNORATES.map((gov) => (
                                <SelectItem key={gov} value={gov} className="cursor-pointer" dir="rtl">
                                  {gov}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="customerAddress">
                            العنوان بالتفصيل *
                          </Label>
                          <Input
                            id="customerAddress"
                            name="customerAddress"
                            value={formData.customerAddress}
                            onChange={handleChange}
                            placeholder="اسم الشارع، رقم العمارة، الشقة، علامة مميزة"
                            required
                            className="rounded-xl h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="customerNotes">ملاحظات إضافية</Label>
                        <textarea
                          id="customerNotes"
                          name="customerNotes"
                          value={formData.customerNotes}
                          onChange={handleChange}
                          placeholder="أي ملاحظات للمندوب..."
                          className="w-full min-h-[100px] px-3 py-3 rounded-xl border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-sm resize-none"
                        />
                      </div>

                      {error && (
                        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-sm font-medium">
                          {error}
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>

            {/* Left Column: Summary */}
            <div className="lg:col-span-1">
              <Card className="border-none shadow-lg rounded-3xl overflow-hidden sticky top-8">
                <CardHeader className="bg-gray-50/50 border-b px-6 py-5">
                  <CardTitle className="text-lg">ملخص الطلب</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">مجموع المنتجات</span>
                      <span className="font-bold">
                        {subtotal.toLocaleString()} ج.م
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2 text-gray-500">
                        <LucideTruck size={14} /> مصاريف الشحن
                      </span>
                      {isFreeShipping ? (
                        <span className="font-bold text-emerald-600">مجاناً</span>
                      ) : (
                        <span className="font-bold">{SHIPPING_COST} ج.م</span>
                      )}
                    </div>

                    {!isFreeShipping && (
                      <p className="text-xs text-muted-foreground mt-1 bg-yellow-50 p-2 rounded-lg border border-yellow-100">
                        ⭐ تلميح: أضف منتجات بقيمة {(
                          FREE_SHIPPING_THRESHOLD - subtotal
                        ).toLocaleString()} ج.م للحصول على شحن مجاني!
                      </p>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between items-center mb-6">
                    <span className="text-base font-bold text-gray-900">
                      الإجمالي النهائي
                    </span>
                    <span className="text-2xl font-black text-primary">
                      {finalTotal.toLocaleString()}{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        ج.م
                      </span>
                    </span>
                  </div>

                  <Button
                    type="submit"
                    form="checkout-form"
                    className="w-full py-6 text-lg rounded-xl font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all"
                    disabled={loading || activeTab === "cart"}
                    onClick={activeTab === "cart" ? () => setActiveTab("shipping") : undefined}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">⏳</span>
                        جاري المعالجة...
                      </span>
                    ) : (
                      activeTab === "cart" ? "متابعة بيانات الشحن" : "تأكيد الطلب الآن"
                    )}
                  </Button>
                </CardContent>
                <CardFooter className="bg-gray-50 px-6 py-4 justify-center">
                  <p className="text-xs text-gray-400 flex items-center gap-2">
                    <LucideShieldCheck size={12} />
                    بياناتك مشفرة ومحمية 100%
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg font-bold text-gray-600">
              جاري تحميل صفحة الدفع...
            </p>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
