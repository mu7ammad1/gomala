"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { motion, AnimatePresence } from "framer-motion";
import { LucideShoppingBag, Plus, Minus, Share2, Heart } from "lucide-react";
import { Product } from "@/types/supabase";
import { toast } from "sonner";

export default function ProductDetailsClient({
    product,
}: {
    product: Product;
}) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(product.image || "");
    const [showStickyBar, setShowStickyBar] = useState(false);

    const discountAmount = product.discount || 0;
    const finalPrice = product.price - discountAmount;

    useEffect(() => {
        const handleScroll = () => {
            const trigger = document.getElementById("action-trigger");
            if (trigger) {
                const rect = trigger.getBoundingClientRect();
                setShowStickyBar(rect.top < 0);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleOrder = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: finalPrice,
            quantity: quantity,
            image: mainImage || "https://placehold.co/600x400/png",
        });
        toast.success("تمت الإضافة للسلة بنجاح");
        const cartButton = document.querySelector("[data-cart-trigger]") as HTMLButtonElement;
        if (cartButton) cartButton.click();
    };

    const displayGallery =
        (product.gallery?.filter((img) => img) || []).length > 0
            ? product.gallery!.filter((img) => img)
            : [mainImage].filter((img) => img);

    return (
        <div className="w-full bg-white text-[#1d1d1f] antialiased" dir="rtl">
            {/* Sticky Bar */}
            <AnimatePresence>
                {showStickyBar && (
                    <motion.div
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        exit={{ y: -100 }}
                        className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-gray-100 py-3 px-4 flex items-center justify-between"
                    >
                        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4">
                            <div className="flex items-center gap-3">
                                <img src={mainImage} className="size-10 object-contain rounded-md bg-gray-50 p-1" alt="" />
                                <h4 className="font-semibold text-sm hidden sm:block">{product.name}</h4>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-left flex flex-col items-end">
                                    <span className="text-lg font-bold">{finalPrice.toLocaleString()} ج.م</span>
                                    {discountAmount > 0 && <span className="text-[10px] text-rose-500 font-medium">وفر {discountAmount} ج.م</span>}
                                </div>
                                <Button onClick={handleOrder} size="sm" className="bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full px-6 font-medium">
                                    شراء الآن
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="max-w-[1200px] mx-auto px-4 pt-8 md:pt-16 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Visuals Section */}
                    <div className="space-y-6">
                        <div className="aspect-square bg-[#f5f5f7] rounded-3xl overflow-hidden flex items-center justify-center p-8 relative group">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={mainImage}
                                    src={mainImage}
                                    alt={product.name}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="w-full h-full object-contain mix-blend-multiply"
                                />
                            </AnimatePresence>
                            {discountAmount > 0 && (
                                <div className="absolute top-6 right-6 bg-rose-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                    خصم حصرى
                                </div>
                            )}
                        </div>
                        
                        <div className="flex gap-4 justify-center">
                            {displayGallery.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setMainImage(img)}
                                    className={`size-16 rounded-2xl bg-[#f5f5f7] p-2 transition-all border-2 ${mainImage === img ? 'border-[#0071e3] scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img} className="w-full h-full object-contain mix-blend-multiply" alt="" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col pt-4">
                        <div className="mb-2">
                            <span className="text-[12px] font-semibold text-rose-500 tracking-wide uppercase">جديد</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
                            {product.name}
                        </h1>
                        <p className="text-gray-500 text-sm mb-8">كود المنتج: {product.code}</p>

                        <div className="mb-10">
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="text-3xl font-bold">{finalPrice.toLocaleString()} ج.م</span>
                                {discountAmount > 0 && (
                                    <span className="text-lg text-gray-400 line-through font-medium">
                                        {product.price.toLocaleString()} ج.م
                                    </span>
                                )}
                            </div>
                            {discountAmount > 0 && (
                                <div className="bg-rose-50 text-rose-600 inline-block px-3 py-1 rounded-full text-[12px] font-bold">
                                    وفر {discountAmount.toLocaleString()} ج.م اليوم
                                </div>
                            )}
                        </div>

                        <div className="space-y-8 mb-12">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">التفاصيل</h3>
                                <p className="text-lg leading-relaxed text-gray-600 whitespace-pre-line font-medium">
                                    {product.description || "استمتع بتجربة فريدة مع هذا المنتج المصمم بعناية ليناسب احتياجاتك اليومية بكل دقة."}
                                </p>
                            </div>
                        </div>

                        <div id="action-trigger" className="space-y-4">
                            <div className="flex items-center gap-4 bg-[#f5f5f7] rounded-2xl p-2 w-fit mb-4">
                                <button 
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="size-10 rounded-xl bg-white flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                                >
                                    <Minus className="size-4" />
                                </button>
                                <span className="w-12 text-center text-xl font-bold">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(q => Math.min(40, q + 1))}
                                    className="size-10 rounded-xl bg-white flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                                >
                                    <Plus className="size-4" />
                                </button>
                            </div>

                            <div className="flex gap-4">
                                <Button 
                                    onClick={handleOrder}
                                    className="flex-1 bg-[#0071e3] hover:bg-[#0077ed] text-white py-8 rounded-2xl text-xl font-bold transition-all active:scale-[0.98] shadow-lg shadow-blue-100"
                                >
                                    إضافة إلى الحقيبة
                                </Button>
                                <button className="size-16 rounded-2xl border-2 border-[#f5f5f7] flex items-center justify-center hover:bg-[#f5f5f7] transition-colors">
                                    <Heart className="size-6 text-gray-400" />
                                </button>
                                <button className="size-16 rounded-2xl border-2 border-[#f5f5f7] flex items-center justify-center hover:bg-[#f5f5f7] transition-colors">
                                    <Share2 className="size-6 text-gray-400" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-12 pt-12 border-t border-gray-100">
                            <div className="grid grid-cols-2 gap-8 text-xs text-gray-400 font-bold uppercase tracking-widest">
                                <div className="flex flex-col gap-2">
                                    <span>توصيل سريع</span>
                                    <span className="text-gray-900 normal-case font-bold">٢٤-٤٨ ساعة عمل</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span>الاسترجاع</span>
                                    <span className="text-gray-900 normal-case font-bold">١٤ يوم استبدال مجاني</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <section className="mt-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">ما يقوله عملاؤنا</h2>
                    </div>
                    
                    {product.reviews?.review_images && product.reviews.review_images.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {product.reviews.review_images.map((img, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="rounded-[2.5rem] overflow-hidden bg-[#f5f5f7] border border-gray-100 p-2"
                                >
                                    <img src={img} className="w-full h-auto rounded-[2rem] object-cover" alt="" />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-[#f5f5f7] rounded-[3rem] py-24 text-center">
                            <p className="text-gray-400 font-medium">لم يتم إضافة آراء مصورة بعد.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
