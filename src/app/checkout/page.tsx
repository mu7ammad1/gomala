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
        className="min-h-screen flex flex-col justify-center items-center gap-6 bg-background px-6"
        dir="rtl"
      >
        <div className="bg-muted p-8 rounded-full animate-in zoom-in duration-500">
          <LucideShoppingCart className="size-20 text-muted-foreground opacity-50" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-3xl font-black text-foreground">سلة التسوق فارغة</p>
          <p className="text-muted-foreground">يبدو أنك لم تضف أي منتجات بعد</p>
        </div>
        <Link href="/">
          <Button size="lg" className="rounded-2xl px-10 py-7 text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105">
            العودة للتسوق
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-8 md:py-12 px-4 bg-background transition-colors duration-300 pb-24" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl font-black text-foreground mb-3 tracking-tight">
            إتمام الطلب
          </h1>
          <p className="text-muted-foreground text-base">خطوات سريعة وسهلة لتصلك شحنتك</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-10 bg-card p-1.5 h-16 rounded-[2rem] border shadow-md sticky top-2 z-40 backdrop-blur-md bg-card/80 transition-all">
            <TabsTrigger
              value="cart"
              className="text-base font-bold rounded-3xl data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <span className="size-6 rounded-full bg-background/20 flex items-center justify-center text-xs">1</span>
                مراجعة السلة
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="text-base font-bold rounded-3xl data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <span className="size-6 rounded-full bg-background/20 flex items-center justify-center text-xs">2</span>
                بيانات الشحن
              </span>
            </TabsTrigger>
          </TabsList>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TabsContent value="cart" forceMount className={activeTab === 'cart' ? 'block' : 'hidden lg:hidden'}>
                <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-card">
                  <CardHeader className="bg-card border-b px-8 py-6">
                    <CardTitle className="text-foreground">محتويات السلة ({cart.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {cart.map((item) => (
                        <div key={item.id} className="p-6 flex gap-4 hover:bg-muted/50 transition-colors">
                          <div className="size-24 rounded-2xl border bg-card p-2 shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold text-foreground line-clamp-2 leading-tight">
                                {item.name}
                              </h3>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-white hover:bg-destructive -mt-2 -ml-2 rounded-xl transition-all"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <LucideTrash2 size={18} />
                              </Button>
                            </div>

                            <div className="flex justify-between items-end mt-4">
                              <div className="flex items-center gap-3 bg-muted rounded-xl p-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-lg bg-card shadow-sm hover:bg-accent"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <LucideMinus size={14} />
                                </Button>
                                <span className="w-4 text-center font-bold text-sm text-foreground">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-lg bg-card shadow-sm hover:bg-accent"
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
                  <CardFooter className="p-6 bg-muted/50 border-t flex justify-end">
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
                <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-card">
                  <CardHeader className="bg-card border-b px-8 py-6">
                    <CardTitle className="flex items-center gap-2 text-foreground">
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
                            <SelectContent className="w-min" align="end">
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
                        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-2xl text-sm font-bold animate-in fade-in slide-in-from-top-2">
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
              <Card className="border-none shadow-lg rounded-3xl overflow-hidden sticky top-8 bg-card">
                <CardHeader className="bg-muted/50 border-b px-6 py-5">
                  <CardTitle className="text-lg text-foreground">ملخص الطلب</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Item List Summary - Always Visible */}
                  <div className="mb-6 space-y-4">
                    <p className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                      <LucideShoppingCart size={16} /> المنتجات المختارة
                    </p>
                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 items-center group">
                          <div className="size-16 rounded-2xl border bg-background p-1.5 shrink-0 group-hover:scale-105 transition-transform">
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-foreground truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.quantity} × {item.price.toLocaleString()} ج.م</p>
                          </div>
                          <p className="text-sm font-black text-primary whitespace-nowrap">
                            {(item.price * item.quantity).toLocaleString()} ج.م
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="mb-6 opacity-50" />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">مجموع المنتجات</span>
                      <span className="font-bold text-foreground">
                        {subtotal.toLocaleString()} ج.م
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <LucideTruck size={14} /> مصاريف الشحن
                      </span>
                      {isFreeShipping ? (
                        <span className="font-bold text-emerald-600">مجاناً</span>
                      ) : (
                        <span className="font-bold text-foreground">{SHIPPING_COST} ج.م</span>
                      )}
                    </div>

                    {!isFreeShipping && (
                      <div className="text-xs text-muted-foreground mt-4 mb-6 bg-primary/5 p-4 rounded-2xl border border-primary/10 flex items-start gap-3">
                        <div className="bg-primary/20 p-2 rounded-xl text-primary shrink-0">⭐</div>
                        <p className="leading-relaxed">
                          أضف منتجات بقيمة <span className="font-black text-primary">{(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()} ج.م</span> للحصول على <span className="font-black">شحن مجاني!</span>
                        </p>
                      </div>
                    )}

                  </div>

                  <Separator className="mb-6 opacity-50" />

                  <div className="flex justify-between items-center mb-6">
                    <span className="text-base font-bold text-foreground">
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
                <CardFooter className="bg-muted/50 px-6 py-4 justify-center">
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
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
        <div className="min-h-screen flex justify-center items-center bg-background">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg font-bold text-muted-foreground">
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
