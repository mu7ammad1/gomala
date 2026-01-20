import EventCard from "@/components/sections/eventCard";
import CountdownTimer from "@/components/sections/countdown-timer";
import { getProducts } from "@/actions/products";
import ProductGridClient from "@/components/sections/ProductGridClient";
import { CarouselPlugin } from "@/components/blocks/home";
import { motion } from "framer-motion";

export default async function ProductsPage() {
  const products = await getProducts();

  if (products.length === 0) {
    return <div className="text-center py-20 font-medium">عذراً، لا توجد منتجات متاحة حالياً.</div>;
  }

  return (
    <div className="flex flex-col w-full bg-white text-[#1d1d1f]">
      {/* Hero Section */}
      <CarouselPlugin />
      
      <main className="flex flex-col gap-32 pb-32">
        {/* Promotional Section */}
        <section className="pt-24 px-4 md:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              عروض استثنائية. <br />
              <span className="text-muted-foreground">صُممت لتناسب يومك.</span>
            </h2>
            <div className="bg-[#f5f5f7] rounded-[3rem] p-8 md:p-16 flex flex-col items-center gap-8">
               <p className="text-2xl md:text-3xl font-medium max-w-2xl mx-auto">
                 استمتع بخصومات حصرية لفترة محدودة على أحدث التكنولوجيا والمنتجات العصرية.
               </p>
               <CountdownTimer />
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight">أحدث ما وصلنا.</h3>
                <p className="text-xl text-muted-foreground font-medium">مجموعة مختارة بعناية لأجلك.</p>
              </div>
            </div>
            <ProductGridClient products={products} />
          </div>
        </section>

        {/* Brand Event / Banner */}
        <section className="px-4 md:px-8">
          <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden bg-[#f5f5f7]">
            <EventCard />
          </div>
        </section>
      </main>
    </div>
  );
}
