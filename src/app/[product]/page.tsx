import { getProductById } from "@/actions/products";
import { Metadata } from "next";
import ProductDetailsClient from "./ProductDetailsClient";
import { LucideShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ product: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.product);
  
  if (!product) {
    return {
      title: "المنتج غير موجود",
    };
  }

  return {
    title: product.name,
    description: product.description || "تفاصيل المنتج",
    openGraph: {
      images: [product.image || "https://placehold.co/600x400/png"],
      title: product.name,
      description: product.description || "تفاصيل المنتج"
    }
  };
}

export default async function Page({ params }: { params: Promise<{ product: string }> }) {
  const resolvedParams = await params;
  const productId = resolvedParams.product;
  
  // Server-side data fetching
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <ProductDetailsClient product={product} />
    </div>
  );
}
