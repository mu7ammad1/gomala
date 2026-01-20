"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideShoppingBag, LucideStar } from "lucide-react";
import { Button } from "../ui/button";
import { useCart } from "@/hooks/use-cart";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: string | number;
  title: string;
  name: string;
  description: string;
  price: string | number;
  rate: number;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  rate,
  imageUrl,
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: id.toString(),
      name: title,
      price: typeof price === 'string' ? parseFloat(price.replace(/,/g, "")) : price,
      quantity: 1,
      image: imageUrl,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group h-full"
    >
      <Card className="border-none shadow-none bg-[#f5f5f7] rounded-3xl overflow-hidden h-full flex flex-col">
        <Link href={`/product/${id}`} className="flex-1 flex flex-col">
          <CardContent className="p-8 flex-1 flex items-center justify-center relative min-h-[300px]">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              src={imageUrl}
              alt={title}
              className="max-w-full max-h-full object-contain mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </CardContent>
          
          <CardFooter className="p-8 pt-0 flex flex-col items-center text-center gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold tracking-tight text-[#1d1d1f] line-clamp-2">
                {title}
              </h3>
              <div className="flex items-center justify-center gap-1 text-orange-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <LucideStar
                    key={i}
                    size={14}
                    className={i < Math.floor(rate) ? "fill-current" : "opacity-30"}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">{rate}</span>
              </div>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-[#1d1d1f]">
                {Number(price).toLocaleString()} ج.م
              </span>
            </div>

            <div className="flex gap-2 w-full pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
               <Button
                className="flex-1 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white py-6"
                onClick={handleAddToCart}
              >
                إضافة للسلة
              </Button>
            </div>
          </CardFooter>
        </Link>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
