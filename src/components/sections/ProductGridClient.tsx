"use client";

import Link from "next/link";
import { Product } from "@/types/supabase";
import { LucidePlus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { motion } from "framer-motion";

interface ProductGridClientProps {
  products: Product[];
}

export default function ProductGridClient({ products }: ProductGridClientProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (product: Product, price: number) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: price,
      quantity: 1,
      image: product.image || "https://placehold.co/600x400/png",
    });

    const cartButton = document.querySelector("[data-cart-trigger]") as HTMLButtonElement;
    if (cartButton) cartButton.click();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full p-6 bg-[#f5f5f7] dark:bg-[#000000] transition-colors duration-500">
      {products.map((product, index) => {
        const discountAmount = product.discount || 0;
        const finalPrice = product.price - discountAmount;
        const mainImage = product.image || "https://placehold.co/600x400/png";

        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className="group relative flex flex-col bg-white dark:bg-[#1c1c1e] rounded-[28px] p-6 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] hover:-translate-y-1 border border-transparent dark:border-[#333333]/30"
          >
            {/* Badge - Apple Style (Subtle) */}
            {discountAmount > 0 && (
              <span className="absolute top-6 right-6 z-10 text-[11px] font-bold tracking-tight text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-400/10 px-2.5 py-1 rounded-full uppercase">
                توفير {discountAmount} ج.م
              </span>
            )}

            {/* Image Container */}
            <Link href={`/${product.id}`} className="relative aspect-[4/3] mb-8 overflow-hidden flex items-center justify-center bg-transparent">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transform transition-transform duration-700 ease-out group-hover:scale-110 drop-shadow-xl"
              />
            </Link>

            {/* Product Meta Data */}
            <div className="flex flex-col items-center text-center flex-grow">
              <Link href={`/${product.id}`} className="group-hover:opacity-70 transition-opacity">
                <h3 className="text-[17px] md:text-[19px] font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-2 leading-tight">
                  {product.name}
                </h3>
              </Link>

              <div className="flex flex-col items-center gap-1 mb-8">
                <span className="text-[17px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">
                   {finalPrice.toLocaleString()} ج.م
                </span>
                {discountAmount > 0 && (
                  <span className="text-[14px] text-[#86868b] dark:text-[#a1a1a6] line-through">
                    {product.price.toLocaleString()} ج.م
                  </span>
                )}
              </div>

              {/* Action Buttons - Apple Style Pill Buttons */}
              <div className="mt-auto flex flex-col w-full gap-4">
                <button
                  onClick={() => handleQuickAdd(product, finalPrice)}
                  className="w-full bg-[#0071e3] hover:bg-[#0077ed] dark:bg-[#0071e3] dark:hover:bg-[#0077ed] text-white text-[14px] font-medium py-2.5 rounded-full transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <LucidePlus className="size-4" />
                  أضف للسلة
                </button>

                <Link 
                  href={`/${product.id}`} 
                  className="text-[14px] text-[#0066cc] dark:text-[#2997ff] hover:underline font-medium flex items-center justify-center gap-1 group/link"
                >
                  عرض التفاصيل 
                  <span className="inline-block transform transition-transform group-hover/link:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}