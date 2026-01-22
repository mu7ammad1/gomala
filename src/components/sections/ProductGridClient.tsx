"use client";

import Link from "next/link";
import { Product } from "@/types/supabase";
import { LucidePlus, LucideHeart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "../ui/button";
import { useState } from "react";

interface ProductGridClientProps {
  products: Product[];
}

export default function ProductGridClient({
  products,
}: ProductGridClientProps) {
  const { addToCart } = useCart();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleQuickAdd = (product: Product, price: number) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: price,
      quantity: 1,
      image: product.image || "https://placehold.co/600x400/png",
    });

    const cartButton = document.querySelector(
      "[data-cart-trigger]",
    ) as HTMLButtonElement;
    if (cartButton) cartButton.click();
  };

  return (
    <div className="py-8" dir="rtl">
      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {products.map((product, index) => {
          const discountAmount = product.discount || 0;
          const finalPrice = product.price - discountAmount;
          const mainImage = product.image || "https://placehold.co/600x400/png";
          const discountPercentage =
            discountAmount > 0
              ? Math.round((discountAmount / product.price) * 100)
              : 0;

          return (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              mainImage={mainImage}
              finalPrice={finalPrice}
              discountAmount={discountAmount}
              discountPercentage={discountPercentage}
              isHovered={hoveredId === product.id}
              onHover={() => setHoveredId(product.id)}
              onLeave={() => setHoveredId(null)}
              onQuickAdd={() => handleQuickAdd(product, finalPrice)}
            />
          );
        })}
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  index: number;
  mainImage: string;
  finalPrice: number;
  discountAmount: number;
  discountPercentage: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onQuickAdd: () => void;
}

function ProductCard({
  product,
  index,
  mainImage,
  finalPrice,
  discountAmount,
  discountPercentage,
  isHovered,
  onHover,
  onLeave,
  onQuickAdd,
}: ProductCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onLeave();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.03,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className="w-full h-full flex flex-col dark:bg-card bg-muted rounded-3xl duration-300 p-3 "
    >
      {/* Discount Badge */}
      {discountAmount > 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.2 + index * 0.03,
            type: "spring",
            stiffness: 200,
          }}
          className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-orange-500 text-white px-3 py-1.5 rounded-full"
        >
          <span className="text-xs font-bold tracking-tight">
            -{discountPercentage}%
          </span>
        </motion.div>
      )}

      {/* Image Container */}
      <Link
        href={`/${product.id}`}
        className="relative aspect-[4/3] rounded-3xl"
      >
        <motion.div
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={mainImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain p-2 rounded-3xl  "
          />
        </motion.div>        
      </Link>

      {/* Content */}
      <div className="flex flex-col p-5 pt-4">
        {/* Product Name */}
        <Link href={`/${product.id}`}>
          <motion.h3
            className="text-3xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-2 leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            {product.name}
          </motion.h3>
        </Link>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
            {finalPrice.toLocaleString()}
            <span className="text-sm font-normal mr-1">ج.م</span>
          </span>
          {discountAmount > 0 && (
            <span className="text-sm text-[#86868b] dark:text-[#6e6e73] line-through">
              {product.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Action Buttons */}
          <Button
            onClick={onQuickAdd}
            className="flex-1 font-medium rounded-full transition-all duration-200 h-11 text-base active:scale-95"
            aria-label={`أضف ${product.name} للسلة`}
          >
            <LucidePlus className="w-4 h-4 ml-1.5" />
            أضف للسلة
          </Button>
      </div>
    </motion.div>
  );
}
