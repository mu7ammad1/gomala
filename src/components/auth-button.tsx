"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogoutButton } from "./logout-button";
import { ThemeSwitcher } from "./theme-switcher";
import {
  LucideShoppingBag,
  LucideUser,
  LucideTrash2,
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

// --- مكون أزرار تسجيل الدخول ---
export function AuthButton() {
  return (
    <div className="flex gap-2">
      <Button asChild size="lg" variant={"secondary"}>
        <Link href="/auth/login">تسجيل دخول</Link>
      </Button>
      <Button asChild size="lg" variant={"default"}>
        <Link href="/auth/sign-up">ابدأ مع جملة</Link>
      </Button>
    </div>
  );
}

// --- مكون الملف الشخصي (Profile Sheet) ---
export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon"}
          className="p-0 shadow-none rounded-full"
          aria-label="Open user profile"
        >
          <LucideUser absoluteStrokeWidth />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>تعديل الملف الشخصي</SheetTitle>
          <SheetDescription>
            قم بإجراء التغييرات على حسابك هنا. اضغط حفظ عند الانتهاء.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 py-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">الاسم</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">اسم المستخدم</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
          <div className="flex flex-wrap gap-3">
            <ThemeSwitcher />
          </div>
        </div>
        <SheetFooter className="mt-auto">
          <LogoutButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// --- مكون سلة التسوق (Cart Sheet) ---
export function SheetProfile() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"default"}
          size={"icon"}
          className="p-0 shadow-none rounded-full relative"
          data-cart-trigger
          aria-label="Open shopping cart"
        >
          <LucideShoppingBag absoluteStrokeWidth />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] rounded-full size-4 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col h-full max-sm:w-full">
        <SheetHeader className="text-right">
          <SheetTitle className="text-left">سلة التسوق</SheetTitle>
          <SheetDescription className="text-right">
            لديك {totalItems} منتجات في السلة
          </SheetDescription>
        </SheetHeader>

        {/* محتوى السلة (المنتجات) */}
        <div className="flex-1 overflow-y-auto my-4 space-y-4 px-1 no-scrollbar">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <LucideShoppingBag size={48} className="mb-2 opacity-20" />
              <p>السلة فارغة</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-3 border-b pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="size-20 object-contain rounded-lg bg-secondary/20"
                />
                <div className="flex-1 space-y-1">
                  <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                  <p className="text-rose-500 font-bold">{item.price.toLocaleString()} EGP</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="outline" size="icon" className="size-7 rounded-full" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                    <span className="text-sm w-4 text-center">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="size-7 rounded-full" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                    <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-rose-500 mr-auto" onClick={() => removeFromCart(item.id)} aria-label="Remove item from cart">
                      <LucideTrash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* الجزء السفلي: الإجمالي وزر الدفع */}
        {cart.length > 0 && (
          <div className="space-y-4 p-4 border-t">
            <div className="flex justify-between items-center font-bold text-lg">
              <span>الإجمالي:</span>
              <span>{totalPrice.toLocaleString()} EGP</span>
            </div>

            <SheetFooter>
              {/* SheetClose هنا هو المسؤول عن غلق القائمة عند الضغط */}
              <SheetClose asChild>
                <Button asChild className="w-full rounded-full py-6 text-lg font-bold">
                  <Link href="/checkout">استكمال الدفع</Link>
                </Button>
              </SheetClose>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}