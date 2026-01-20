import EventCard from "@/components/sections/eventCard";
import { CountdownBanner } from "@/components/blocks/countdown-banner";
import { getProducts } from "@/actions/products";
import ProductGridClient from "@/components/sections/ProductGridClient";

export default async function ProductsPage() {
  const products = await getProducts();

  if (products.length === 0) {
    return <div className="text-center py-20">عذراً، لا توجد منتجات تطابق بحثك.</div>;
  }

  return (
    <div className="flex flex-col w-full gap-10 px-4 md:px-8">
      <EventCard />
      <CountdownBanner />
      <ProductGridClient products={products} />
    </div>
  );
}