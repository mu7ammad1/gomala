import EventCard from "@/components/sections/eventCard";
import CountdownTimer from "@/components/sections/countdown-timer";
import { getProducts } from "@/actions/products";
import ProductGridClient from "@/components/sections/ProductGridClient";
import { CarouselPlugin } from "@/components/blocks/home";

export default async function ProductsPage() {
  const products = await getProducts();

  if (products.length === 0) {
    return <div className="text-center py-20">عذراً، لا توجد منتجات تطابق بحثك.</div>;
  }

  return (
    <div className="flex flex-col w-full gap-20">
      <CarouselPlugin />
      
      <div className="px-4 md:px-8 space-y-20">
         <section className="text-center space-y-4 max-w-4xl mx-auto pt-10">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">عروض حصرية لفترة محدودة</h2>
            <p className="text-xl text-muted-foreground">احصل على أفضل المنتجات العالمية بأسعار لا تقبل المنافسة</p>
            <CountdownTimer />
         </section>

         <section>
            <div className="flex items-end justify-between mb-10">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold tracking-tight">أحدث المنتجات</h3>
                <p className="text-muted-foreground">اكتشف ما هو جديد في متجرنا</p>
              </div>
            </div>
            <ProductGridClient products={products} />
         </section>

         <EventCard />
      </div>
    </div>
  );
}
