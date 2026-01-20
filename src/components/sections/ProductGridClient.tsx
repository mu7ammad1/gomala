"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/supabase";
import { LucidePlus, LucideShoppingBag } from "lucide-react";
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

        // Trigger cart drawer if possible
        const cartButton = document.querySelector("[data-cart-trigger]") as HTMLButtonElement;
        if (cartButton) cartButton.click();
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 w-full p-2">
            {products.map((product) => {
                const discountAmount = product.discount || 0;
                const finalPrice = product.price - discountAmount;
                const mainImage = product.image || "https://placehold.co/600x400/png";

                return (
                    <div
                        key={product.id}
                        className="group flex flex-col h-full"
                    >
                        {/* Image Container - Shopify Style: Clean, Square, Sale Badge */}
                        <div className="relative aspect-square mb-3 overflow-hidden rounded-lg bg-[#f7f7f7] border border-transparent group-hover:border-primary/20 transition-all duration-300">
                            {discountAmount > 0 && (
                                <div className="absolute top-2 right-2 z-10">
                                    <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm tracking-tighter uppercase">
                                        Sale
                                    </span>
                                </div>
                            )}

                            <Link href={`/${product.id}`} className="block w-full h-full">
                                <img
                                    src={mainImage}
                                    alt={product.name}
                                    className="w-full h-full object-contain mix-blend-multiply transform transition-transform duration-700 group-hover:scale-105"
                                />
                            </Link>

                            {/* Quick Add Overlay Button */}
                            <button
                                onClick={() => handleQuickAdd(product, finalPrice)}
                                className="absolute bottom-2 left-2 right-2 bg-white/95 text-black text-[12px] font-bold py-2.5 rounded-sm shadow-sm translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center gap-2 hover:bg-black hover:text-white"
                            >
                                <LucidePlus className="size-3" />
                                أضف للسلة
                            </button>
                        </div>

                        {/* Product Meta Data */}
                        <div className="flex flex-col flex-grow text-center md:text-right px-1">
                            <Link href={`/${product.id}`} className="mb-1">
                                <h3 className="text-[13px] md:text-[14px] font-medium text-foreground/90 line-clamp-2 hover:underline decoration-1 underline-offset-4">
                                    {product.name}
                                </h3>
                            </Link>

                            <div className="flex items-center justify-center md:justify-start gap-2 pt-1">
                                <span className="text-[15px] font-bold text-black dark:text-white">
                                    {finalPrice.toLocaleString()} ج.م
                                </span>
                                {discountAmount > 0 && (
                                    <span className="text-[12px] text-muted-foreground line-through opacity-70">
                                        {product.price.toLocaleString()} ج.م
                                    </span>
                                )}
                            </div>

                            {/* Details Button for Mobile / Simple Focus */}
                            <div className="mt-4 md:mt-auto">
                                <Link href={`/${product.id}`}>
                                    <Button variant="outline" className="w-full h-9 text-[12px] font-bold border-black hover:bg-black hover:text-white transition-all rounded-sm md:hidden">
                                        التفاصيل
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
