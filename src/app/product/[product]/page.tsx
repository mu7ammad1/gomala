"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { motion, AnimatePresence } from "framer-motion";
import { LucideShoppingBag } from "lucide-react";
import { getProductById } from "@/lib/api";
import { Product } from "@/types/supabase";

export default function Page({ params }: { params: Promise<{ product: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.product;
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;
      setLoading(true);
      try {
        const data = await getProductById(productId);
        setProduct(data);
        if (data) {
          const img = data.tumblers?.main_image || "";
          setMainImage(img);
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  const handleIncrement = () => {
    if (quantity < 40) setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleOrder = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.title,
      price: product.price, // Note: You might want to handle discounted price here if needed
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">جاري تحميل المنتج...</p>
      </div>
    )
  }

  // إذا لم يتم العثور على المنتج
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="bg-secondary/20 p-6 rounded-full">
          <LucideShoppingBag className="size-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-center">
          عذراً، هذا المنتج غير متوفر حالياً
        </h2>
        <p className="text-muted-foreground text-center">
          ربما تم حذف المنتج أو الرابط غير صحيح.
        </p>
        <Button onClick={() => router.push("/")} variant="default">
          العودة للرئيسية
        </Button>
      </div>
    );
  }

  // Calculate generic gallery from tumblers
  const gallery = product.tumblers?.tumbler_images || [mainImage];
  // Ensure main image is in gallery if specific list not provided, or combine them
  const displayGallery = gallery.length > 0 ? gallery : [mainImage];

  return (
    <div className="w-full">
      <div className="flex gap-5 max-md:flex-col *:w-1/2 *:max-md:w-full pb-10 max-md:max-h-full max-lg:px-3">
        <div className="gap-3 flex flex-col border rounded-3xl p-0 overflow-hidden bg-white dark:bg-gray-900">
          <div className="relative h-96 w-full bg-secondary/10">
            <AnimatePresence mode="popLayout">
              {mainImage && (
                <motion.img
                  key={mainImage}
                  src={mainImage}
                  alt={product.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full h-full object-contain cursor-pointer"
                />
              )}
            </AnimatePresence>
          </div>
          <div className="flex gap-3 overflow-hidden no-scrollbar justify-start">
            {displayGallery.map((img, index) => (
              <motion.div
                key={index + img}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 size-16 rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden p-2 m-2 ${mainImage === img
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent bg-secondary/20 hover:border-primary/50"
                  }`}
                onClick={() => setMainImage(img)}
              >
                <img
                  src={img}
                  alt={`${product.title} ${index}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div>
            <p className="text-muted-foreground text-sm mb-1 uppercase tracking-wider font-medium">
              Product code: {product.product_number}
            </p>
            <h2 className="text-2xl font-bold leading-tight text-foreground mb-4">
              {product.title}
            </h2>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold text-rose-500">
                {product.price.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                EGP
              </span>
            </div>
            {product.description && (
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          <div className="mt-auto">
            <h2 className="text-sm font-bold text-foreground mb-4">
              عايز اعمل طلب جديد
            </h2>
            <div className="p-4 border rounded-2xl bg-white dark:bg-gray-800 shadow-none">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center bg-secondary/20 rounded-full px-2 py-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
                    onClick={handleDecrement}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val >= 1 && val <= 40) setQuantity(val);
                    }}
                    className="w-12 text-center border-none shadow-none focus:ring-0 bg-transparent font-bold"
                    min={1}
                    max={40}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
                    onClick={handleIncrement}
                  >
                    +
                  </Button>
                </div>

                <Button
                  className="rounded-lg w-auto px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all active:scale-95"
                  variant={"default"}
                  onClick={handleOrder}
                >
                  إضافة للسلة
                </Button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-secondary/10 rounded-2xl border border-secondary/20 flex justify-between items-center">
              <p className="text-sm font-medium text-muted-foreground">
                الإجمالي:
              </p>
              <p className="text-2xl font-black text-foreground">
                {(product.price * quantity).toLocaleString()}{" "}
                <span className="text-sm font-normal">EGP</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="w-full mt-12 bg-white rounded-3xl p-8 border">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>الآراء ({product.reviews?.average_rating || 0} من 5)</span>
          <span className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={i < Math.floor(product.reviews?.average_rating || 0) ? "#f97316" : "#e5e7eb"}
                className="w-6 h-6"
              >
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
            ))}
          </span>
        </h2>

        {product.reviews?.review_images && product.reviews.review_images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {product.reviews.review_images.map((img, idx) => (
              <div key={idx} className="aspect-square rounded-2xl overflow-hidden border bg-gray-50">
                <img
                  src={img}
                  alt={`Review ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">لا توجد آراء مصورة لهذا المنتج حتى الآن.</p>
        )}
      </div>

      <div className="flex gap-5 min-h-screen mt-10">
        <section className="w-full flex flex-col gap-3 px-3 rounded-3xl">
          <ul style={{ listStyle: "none" }}>
            {/* Ads or extra content can remain here */}
            <li
              className="card"
              style={{ position: "sticky", top: 0, paddingTop: `1em` }}
            >
              <img
                src="https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/11/x9d-site-eng-1-1-copy.webp"
                alt="ads"
                className="w-full h-full object-contain rounded-3xl"
              />
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
