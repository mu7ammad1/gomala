"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { motion } from "framer-motion";
import { LucideShoppingBag } from "lucide-react";
import { Product } from "@/types/supabase";

export default function ProductDetailsClient({
    product,
}: {
    product: Product;
}) {
    const router = useRouter();
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(product.image || "");

    const discountAmount = product.discount || 0;
    const finalPrice = product.price - discountAmount;

    const handleIncrement = () => {
        if (quantity < 40) setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleOrder = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: finalPrice,
            quantity: quantity,
            image: mainImage || "https://placehold.co/600x400/png",
        });

        const cartButton = document.querySelector(
            "[data-cart-trigger]",
        ) as HTMLButtonElement;
        if (cartButton) {
            cartButton.click();
        }
    };

    const displayGallery =
        (product.gallery?.filter((img) => img) || []).length > 0
            ? product.gallery!.filter((img) => img)
            : [mainImage].filter((img) => img);

    return (
        <div className="w-full mx-auto py-8 px-4" dir="rtl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-min w-full">
                <div className="flex flex-col gap-4 bg-card border rounded-xl h-full p-4">
                    <div className="relative flex items-center justify-center overflow-hidden w-full h-min">
                        {mainImage && (
                            <motion.img
                                key={mainImage}
                                src={mainImage}
                                alt={product.name}
                                initial={{ opacity: 0.8 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="w-full max-h-[550px] object-contain cursor-pointer rounded-2xl"
                            />
                        )}
                    </div>
                    <div className="flex gap-2 overflow-x-none no-scrollbar justify-center">
                        {displayGallery.map((img, index) => (
                            <motion.div
                                key={index + img}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex-shrink-0 size-14 rounded-xl border-2 transition-all duration-300 cursor-pointer overflow-hidden p-1.5 ${
                                    mainImage === img
                                        ? "border-primary ring-2 ring-primary/20"
                                        : "border-transparent bg-secondary/20 hover:border-primary/50"
                                }`}
                                onClick={() => setMainImage(img)}
                            >
                                <img
                                    src={img}
                                    alt={`${product.name} ${index}`}
                                    className="w-full h-full object-cover rounded-sm"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="w-full flex flex-col bg-card rounded-xl border h-min p-4">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                            كود المنتج: {product.code}
                        </span>
                        {discountAmount > 0 && (
                            <span className="bg-rose-500 text-white px-4 py-1.5 rounded-full text-xs font-bold animate-pulse">
                                وفر {discountAmount} ج.م
                            </span>
                        )}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-foreground mb-6 leading-tight">
                        {product.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-primary">
                                {finalPrice.toLocaleString()}
                            </span>
                            <span className="text-lg font-bold text-primary/70">
                                ج.م
                            </span>
                        </div>
                        {discountAmount > 0 && (
                            <span className="text-xl text-muted-foreground/60 line-through decoration-rose-500/50">
                                {product.price.toLocaleString()} ج.م
                            </span>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-foreground border-r-4 border-primary pr-3">
                                وصف المنتج
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-lg font-medium whitespace-pre-line">
                                {product.description ||
                                    "لا يوجد وصف متاح لهذا المنتج حالياً."}
                            </p>
                        </div>
                    </div>

                    <div className="pt-4">
                        <div className="w-full flex flex-col md:flex-row gap-4 items-center p-0">
                            <div className="flex items-center bg-muted rounded-xl p-2 w-full w-min justify-between">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-10 rounded-xl hover:bg-background transition-all shadow-sm active:scale-95"
                                    onClick={handleDecrement}
                                >
                                    -
                                </Button>
                                <Input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        if (val >= 1 && val <= 40)
                                            setQuantity(val);
                                    }}
                                    className="w-min text-center border-none shadow-none focus:ring-0 bg-muted dark:bg-muted text-xl font-black text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    min={1}
                                    max={40}
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-10 rounded-xl hover:bg-background transition-all shadow-sm active:scale-95"
                                    onClick={handleIncrement}
                                >
                                    +
                                </Button>
                            </div>

                            <div className="flex items-center p-0 w-full justify-between">
                                <Button
                                    className="rounded-xl w-full py-7 text-xl font-black active:scale-95 transition-all group flex items-center justify-center gap-3"
                                    variant={"default"}
                                    onClick={handleOrder}
                                >
                                    <LucideShoppingBag className="size-6 transition-transform group-hover:-translate-y-1" />
                                    إضافة للسلة
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="w-full mt-12 bg-card rounded-xl p-4 border"
                id="reviews"
            >
                <h2 className="text-4xl font-bold mb-6 flex items-center gap-2">
                    <span>الآراء</span>
                </h2>

                {product.reviews?.review_images &&
                product.reviews.review_images.length > 0 ? (
                    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
                        {product.reviews.review_images.map((img, idx) => (
                            <div
                                key={idx}
                                className="w-full rounded-xl overflow-hidden border bg-gray-50 shadow-sm"
                            >
                                <img
                                    src={img}
                                    alt={`Review ${idx + 1}`}
                                    className="w-full h-full object-contain hover:scale-[1.01] transition-transform duration-500"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-muted/20 rounded-xl border border-dashed">
                        <p className="text-muted-foreground font-medium">
                            لا توجد آراء مصورة لهذا المنتج حتى الآن.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
