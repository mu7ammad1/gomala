import EventCard from "@/components/sections/eventCard";
import CountdownTimer from "@/components/sections/countdown-timer";
import { getProducts } from "@/actions/products";
import ProductGridClient from "@/components/sections/ProductGridClient";

export default async function HomeScreen() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <div className="text-center py-20">عذراً، لا توجد منتجات تطابق بحثك.</div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-10 px-4">
      <section className="flex flex-col w-full items-center justify-center py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2
            className="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
            dir="rtl"
          >
            عروض استثنائية. <br />
            <span className="text-muted-foreground">صُممت لتناسب يومك.</span>
          </h2>
          <div className="dark:bg-card bg-muted rounded-[3rem] p-8 md:p-16 flex flex-col items-center gap-8">
            <p className="text-2xl md:text-3xl font-medium max-w-2xl mx-auto">
              استمتع بخصومات حصرية لفترة محدودة على أحدث التكنولوجيا والمنتجات
              العصرية.
            </p>
            <اا />
          </div>
        </div>
      </section>
      <ProductGridClient products={products} />
    </div>
  );
}
