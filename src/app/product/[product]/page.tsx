"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SheetProfile } from "@/components/auth-button";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const productsData: { [key: string]: { title: string; price: number; image: string; description: string; gallery?: string[] } } = {
  "1632548806": {
    title: "Apple IPhone Air With FaceTime - 1TB, 8GB RAM",
    price: 100,
    image: "https://static.mobilemasr.com/public/categories/683d9cd308f81_1748868307.webp",
    description: "This is product 1",
    gallery: [
      "https://static.mobilemasr.com/public/categories/683d9cd308f81_1748868307.webp",
      "https://static.mobilemasr.com/public/categories/683d9cc4c1307_1748868292.webp",
      "https://static.mobilemasr.com/public/categories/683d9cdb5a56d_1748868315.webp"
    ]
  },
  "163245508": {
    title: "Apple IPhone 17 Pro Max With FaceTime - 512GB, 12GB RAM",
    price: 200,
    image: "https://static.mobilemasr.com/public/categories/683d9cc4c1307_1748868292.webp",
    description: "This is product 2",
    gallery: [
      "https://static.mobilemasr.com/public/categories/683d9cc4c1307_1748868292.webp",
      "https://static.mobilemasr.com/public/categories/683d9cd308f81_1748868307.webp"
    ]
  },
  "613245581": {
    title: "Apple IPhone 16 Pro Max With FaceTime - 1TB, 8GB RAM",
    price: 300,
    image: "https://static.mobilemasr.com/public/categories/683d9cdb5a56d_1748868315.webp",
    description: "This is product 3",
    gallery: [
      "https://static.mobilemasr.com/public/categories/683d9cdb5a56d_1748868315.webp",
      "https://static.mobilemasr.com/public/categories/683d9cc4c1307_1748868292.webp"
    ]
  },
  "723245582": {
    title: "Apple IPhone 15 Mini With FaceTime - 256GB, 6GB RAM",
    price: 150,
    image: "https://static.mobilemasr.com/public/categories/683d9ce6ecda7_1748868326.webp",
    description: "This is product 4",
    gallery: [
      "https://static.mobilemasr.com/public/categories/683d9ce6ecda7_1748868326.webp",
      "https://static.mobilemasr.com/public/categories/683d9cd308f81_1748868307.webp"
    ]
  },
  "193295508": {
    title: "Apple IPhone 17 Pro Max With FaceTime - 512GB, 12GB RAM",
    price: 200,
    image: "https://static.mobilemasr.com/public/categories/683d9cc4c1307_1748868292.webp",
    description: "This is product 2",
    gallery: [
      "https://static.mobilemasr.com/public/categories/683d9cc4c1307_1748868292.webp",
      "https://static.mobilemasr.com/public/categories/683d9cd308f81_1748868307.webp"
    ]
  },
  "823245583": {
    title: "Apple IPhone 14 Pro Max With FaceTime - 512GB, 8GB RAM",
    price: 220,
    image: "https://static.mobilemasr.com/public/categories/683d9cfd3e58f_1748868349.webp",
    description: "This is product 5",
    gallery: [
      "https://static.mobilemasr.com/public/categories/683d9cfd3e58f_1748868349.webp",
      "https://static.mobilemasr.com/public/categories/683d9cd308f81_1748868307.webp"
    ]
  },
  "118925508": {
    title: "Apple IPhone 17 Pro Max With FaceTime - 512GB, 12GB RAM",
    price: 200,
    image: "https://static.mobilemasr.com/public/categories/683d9cc4c1307_1748868292.webp",
    description: "This is product 2",
    gallery: [
      "https://static.mobilemasr.com/public/categories/683d9cc4c1307_1748868292.webp",
      "https://static.mobilemasr.com/public/categories/683d9cd308f81_1748868307.webp"
    ]
  },
};

export default function Page() {
  const params = useParams();
  const productId = params.product as string;
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const productInfo = productsData[productId] || {
    title: "Huawei FreeBuds 7i",
    price: 3999,
    image: "https://static.mobilemasr.com/public/categories/683d9cd308f81_1748868307.webp",
    description: "Default product",
    gallery: ["https://static.mobilemasr.com/public/categories/683d9cd308f81_1748868307.webp"]
  };

  const [mainImage, setMainImage] = useState(productInfo.image);

  const handleIncrement = () => {
    if (quantity < 40) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleOrder = () => {
    addToCart({
      id: productId,
      name: productInfo.title,
      price: productInfo.price,
      quantity: quantity,
      image: productInfo.image,
    });
    setCartOpen(true);
  };

  return (
    <div className="w-full">
      <div className="flex gap-5 max-md:flex-col *:w-1/2 *:max-md:w-full pb-10 max-md:max-h-full max-lg:px-3">
        <div className="gap-3 flex flex-col border rounded-3xl p-0 overflow-hidden bg-white dark:bg-gray-900">
          <div className="relative h-96 w-full bg-secondary/10">
            <AnimatePresence mode="wait">
              <motion.img
                key={mainImage}
                src={mainImage}
                alt={productInfo.title}
                initial={ { opacity: 0, x: 20 } }
                animate={ { opacity: 1, x: 0 } }
                exit={ { opacity: 0, x: -20 } }
                transition={ { duration: 0.3, ease: "easeInOut" } }
                className="w-full h-full object-contain cursor-pointer"
              />
            </AnimatePresence>
          </div>

          <div className="flex gap-3 pb-3 px-3 overflow-x-auto no-scrollbar">
            {productInfo.gallery?.map((img, index) => (
              <motion.div
                key={index}
                whileHover={ { scale: 1.05 } }
                whileTap={ { scale: 0.95 } }
                className={`flex-shrink-0 size-16 rounded-2xl border-2 transition-colors cursor-pointer overflow-hidden ${
                  mainImage === img ? 'border-primary shadow-md' : 'border-transparent bg-secondary/20 hover:border-primary/50'
                }`}
                onClick={() => setMainImage(img)}
              >
                <img
                  src={img}
                  alt={`${productInfo.title} ${index}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div>
            <p className="text-muted-foreground text-sm mb-1 uppercase tracking-wider font-medium">Apple</p>
            <h2 className="text-2xl font-bold leading-tight text-foreground mb-4">
              {productInfo.title}
            </h2>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold text-rose-500">
                {productInfo.price.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-muted-foreground">EGP</span>
            </div>
          </div>

          <div className="mt-auto">
            <h2 className="text-sm font-bold text-foreground mb-4">
              عايز اعمل طلب جديد
            </h2>
            <div className="p-4 border rounded-2xl bg-white dark:bg-gray-800 shadow-sm">
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
                      if (val >= 1 && val <= 40) {
                        setQuantity(val);
                      }
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
                
                <Sheet open={cartOpen} onOpenChange={setCartOpen}>
                  <SheetTrigger asChild>
                    <Button
                      className="rounded-full px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 flex-1"
                      variant={"default"}
                      onClick={handleOrder}
                    >
                      إضافة للسلة
                    </Button>
                  </SheetTrigger>
                  <SheetProfile />
                </Sheet>
              </div>
            </div>

            <div className="mt-6 p-4 bg-secondary/10 rounded-2xl border border-secondary/20 flex justify-between items-center">
              <p className="text-sm font-medium text-muted-foreground">الإجمالي:</p>
              <p className="text-2xl font-black text-foreground">
                {(productInfo.price * quantity).toLocaleString()} <span className="text-sm font-normal">EGP</span>
              </p>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
      <div className="flex gap-5 min-h-screen">
        <section className="w-full flex flex-col gap-3 px-3 rounded-3xl">
          <ul style={{ listStyle: "none" }}>
            <li
              className="card"
              id={`card`}
              style={{
                position: "sticky",
                top: 0,
                paddingTop: `1em`,
              }}
            >
              <img
                src={`https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/11/x9d-site-eng-1-1-copy.webp`}
                alt={"dubaiphone"}
                className="w-full h-full object-contain rounded-3xl"
              />
            </li>
            <li
              className="card"
              id={`card_2`}
              style={{
                position: "sticky",
                top: 20,
                paddingTop: `1em`,
              }}
            >
              <img
                src={`https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/11/ahly-18-d-eng-copy-1.webp`}
                alt={"dubaiphone"}
                className="w-full h-full object-contain rounded-3xl"
              />
            </li>
            <li
              className="card"
              id={`card_2`}
              style={{
                position: "sticky",
                top: 40,
                paddingTop: `1em`,
              }}
            >
              <img
                src={`https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/11/valuy-15-eng-copy-1.webp`}
                alt={"dubaiphone"}
                className="w-full h-full object-contain rounded-3xl"
              />
            </li>
            <li
              className="card"
              id={`card`}
              style={{
                position: "sticky",
                top: 60,
                paddingTop: `1em`,
              }}
            >
              <img
                src={`https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/11/valuy-15-eng-copy-1.webp`}
                alt={"dubaiphone"}
                className="w-full h-full object-contain rounded-3xl"
              />
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}


const Products = [
  {
    product_id: "INV001",
    colors: "colors",
    brands: "Red, Green, Pastel",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    product_id: "INV002",
    colors: "Colors",
    brands: "Brand",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    product_id: "INV003",

    colors: "Colors",
    brands: "Brand",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    product_id: "INV004",
    colors: "Colors",
    brands: "Brand",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    product_id: "INV005",
    colors: "Colors",
    brands: "Brand",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    product_id: "INV006",
    colors: "Colors",
    brands: "Brand",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    product_id: "INV007",
    colors: "Colors",
    brands: "Brand",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function TableDemo() {
  return (
    <Table className="w">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader className="bg-border w-1/3">
        <TableRow className="w-1/5">
          <TableHead className="text-left">Basics</TableHead>
          <TableHead className="text-left">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Products.map((product) => (
          <TableRow key={product.product_id}>
            <TableCell className="font-medium text-left">
              {product.colors}
            </TableCell>
            <TableCell className="text-left">{product.brands}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
