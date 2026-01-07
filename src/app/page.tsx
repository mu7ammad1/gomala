import CategoryCard from "@/components/sections/categoryCard";
import EventCard from "@/components/sections/eventCard";
import ProductCard from "@/components/sections/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LucideShoppingBag, LucideStar } from "lucide-react";
import CountdownTimer from "@/components/sections/countdown-timer";
import { getProducts } from "@/lib/api";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = (await searchParams).filters;
  const products = await getProducts();

  if (products.length === 0) {
    return <div className="text-center py-20">عذراً، لا توجد منتجات تطابق بحثك.</div>;
  }
  return (
    <div className="flex flex-col w-full gap-10 px-4 md:px-8">
      <EventCard />
      <CountdownTimer />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {products?.map((product) => {
          // Calculate active discount
          const activeDiscount = product.discount?.discounts?.find(d => d.is_active);
          const discountAmount = activeDiscount?.amount_off || 0;
          const discountPercentage = activeDiscount?.percentage || 0;

          // Calculate final price
          let finalPrice = product.price;
          if (discountAmount > 0) {
            finalPrice = product.price - discountAmount;
          } else if (discountPercentage > 0) {
            finalPrice = product.price - (product.price * (discountPercentage / 100));
          }

          const mainImage = product.tumblers?.main_image || "https://placehold.co/600x400/png";
          const rating = product.reviews?.average_rating || 0;

          return (
            <div
              key={product.id}
              className="group flex flex-col bg-white rounded-2xl hover:shadow-md transition-shadow duration-300 border-2 border-secondary h-full"
            >
              {/* الجزء العلوي: الصورة والأزرار */}
              <div className="relative aspect-square bg-secondary/10 rounded-t-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute top-2 right-2 flex flex-col gap-2 z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <Button
                    className="rounded-xl cursor-pointer bg-white/80 backdrop-blur-sm"
                    variant="secondary"
                    size="icon-sm"
                  >
                    <LucideStar size={18} className="text-gray-600" />
                  </Button>
                  <Button
                    className="rounded-xl cursor-pointer bg-white/80 backdrop-blur-sm"
                    variant="secondary"
                    size="icon-sm"
                  >
                    <LucideShoppingBag size={18} className="text-gray-600" />
                  </Button>
                </div>

                <img
                  src={mainImage}
                  alt={product.title}
                  className="w-full h-full object-contain p-4 transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* الجزء السفلي: تفاصيل المنتج */}
              <div className="p-4 flex flex-col flex-grow gap-3">
                <Link href={`/product/${product.id}`} className="flex-grow">
                  <h3 className="text-sm md:text-base font-medium leading-tight line-clamp-2 hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                </Link>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <LucideStar
                      key={i}
                      size={14}
                      className={`${i < Math.floor(rating)
                        ? "fill-orange-500 stroke-orange-500"
                        : "fill-gray-200 stroke-gray-200"
                        }`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">{rating}</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg font-bold">{finalPrice} ج.م</span>
                  {(discountAmount > 0 || discountPercentage > 0) && (
                    <>
                      <span className="text-sm text-gray-400 line-through">
                        {product.price} ج.م
                      </span>
                      <span className="text-xs font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded">
                        {discountPercentage > 0 ? `-${discountPercentage}%` : `-${discountAmount} ج.م`}
                      </span>
                    </>
                  )}
                </div>

                <Link href={`/product/${product.id}`} className="w-full mt-auto">
                  <Button
                    className="w-full rounded-xl font-bold py-5 hover:cursor-pointer"
                    variant="default"
                  >
                    طلب اوردر
                  </Button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}