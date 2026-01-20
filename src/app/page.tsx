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
