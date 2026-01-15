import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import CountdownTimer from "@/components/sections/countdown-timer";
import { getProducts } from "@/actions/products";
import ProductGridClient from "@/components/sections/ProductGridClient";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProductsPage() {
  const products = await getProducts();

  if (products.length === 0) {
    return <div className="text-center py-20">عذراً، لا توجد منتجات تطابق بحثك.</div>;
  }

  return (
    <div className="flex flex-col w-full gap-10 px-4 md:px-8">
      <HeroSection />
      <CategoriesSection />
      <CountdownTimer />
      <div id="products" className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">
            منتجات مميزة
          </h2>
          <Button asChild variant="outline">
            <Link href="/products">عرض الكل</Link>
          </Button>
        </div>
        <ProductGridClient products={products} />
      </div>
    </div>
  );
}