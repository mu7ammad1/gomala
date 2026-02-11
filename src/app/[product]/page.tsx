import { getProductById } from "@/actions/products";
import { Metadata } from "next";
import ProductDetailsClient from "./ProductDetailsClient";
import { LucideShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ product: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.product);
  return {
    title: product?.json.name || "المنتج",
    description: product?.json.description || "تفاصيل المنتج",
  };
}

export default async function Page({ params }: { params: Promise<{ product: string }> }) {
  const resolvedParams = (await params).product;
  const product = await getProductById(resolvedParams);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        {resolvedParams}
        <div className="bg-secondary/20 p-6 rounded-full">
          <LucideShoppingBag className="size-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-center">
          عذراً، هذا المنتج غير متوفر حالياً
        </h2>
        <p className="text-muted-foreground text-center">
          ربما تم حذف المنتج أو الرابط غير صحيح.
        </p>
        <Link href="/">
          <Button variant="default">
            العودة للرئيسية
          </Button>
        </Link>
      </div>
    );
  }

  return <ProductDetailsClient product={product} />;
}
