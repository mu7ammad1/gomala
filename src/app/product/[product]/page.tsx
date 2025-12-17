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

const productsData: { [key: string]: { title: string; price: number; image: string; description: string } } = {
  "1632548806": {
    title: "Apple IPhone Air With FaceTime - 1TB, 8GB RAM",
    price: 100,
    image: "https://static.mobilemasr.com/public/categories/683d9cd308f81_1748868307.webp",
    description: "This is product 1"
  },
  "163245508": {
    title: "Apple IPhone 17 Pro Max With FaceTime - 512GB, 12GB RAM",
    price: 200,
    image: "https://static.mobilemasr.com/public/categories/683d9cc4c1307_1748868292.webp",
    description: "This is product 2"
  },
  "613245581": {
    title: "Apple IPhone 16 Pro Max With FaceTime - 1TB, 8GB RAM",
    price: 300,
    image: "https://static.mobilemasr.com/public/categories/683d9cdb5a56d_1748868315.webp",
    description: "This is product 3"
  },
  "723245582": {
    title: "Apple IPhone 15 Mini With FaceTime - 256GB, 6GB RAM",
    price: 150,
    image: "https://static.mobilemasr.com/public/categories/683d9ce6ecda7_1748868326.webp",
    description: "This is product 4"
  },
  "193295508": {
    title: "Apple IPhone 17 Pro Max With FaceTime - 512GB, 12GB RAM",
    price: 200,
    image: "https://static.mobilemasr.com/public/categories/683d9cc4c1307_1748868292.webp",
    description: "This is product 2"
  },
  "823245583": {
    title: "Apple IPhone 14 Pro Max With FaceTime - 512GB, 8GB RAM",
    price: 220,
    image: "https://static.mobilemasr.com/public/categories/683d9cfd3e58f_1748868349.webp",
    description: "This is product 5"
  },
  "118925508": {
    title: "Apple IPhone 17 Pro Max With FaceTime - 512GB, 12GB RAM",
    price: 200,
    image: "https://static.mobilemasr.com/public/categories/683d9cc4c1307_1748868292.webp",
    description: "This is product 2"
  },
};

export default function Page() {
  const params = useParams();
  const productId = params.product as string;
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const productInfo = productsData[productId] || {
    title: "Huawei FreeBuds 7i",
    price: 3999,
    image: "https://static.mobilemasr.com/public/categories/683d9cd308f81_1748868307.webp",
    description: "Default product"
  };

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
    const params = new URLSearchParams({
      productId: productId,
      productName: productInfo.title,
      productDescription: productInfo.description,
      price: productInfo.price.toString(),
      quantity: quantity.toString(),
      image: productInfo.image
    });
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <div className="flex gap-5 max-md:flex-col *:w-1/2 *:max-md:w-full pb-10 max-md:max-h-full max-lg:px-3">
        <div className=" gap-3 flex flex-col border rounded-3xl p-0">
          <img
            src={productInfo.image}
            alt={productInfo.title}
            className="w-full object-contain rounded-t-3xl h-96 aspect-square cursor-pointer"
          />

          <div className="flex gap-3 pb-2 pl-2">
            <Button
              className="size-14 rounded-xl p-1.5 cursor-pointer active:scale-90 active:p-2"
              variant={"outline"}
              size={"icon-lg"}
            >
              <img
                src={`https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/10/Mobile-1.svg`}
                alt={productInfo.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </Button>
            <Button
              className="size-14 rounded-xl p-1.5 cursor-pointer active:scale-90 active:p-2"
              variant={"outline"}
              size={"icon-lg"}
            >
              <img
                src={`https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/11/valuy-15-eng-copy-1.webp`}
                alt={productInfo.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </Button>
            <Button
              className="size-14 rounded-xl p-1.5 cursor-pointer active:scale-90 active:p-2"
              variant={"outline"}
              size={"icon-lg"}
            >
              <img
                src={`https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/11/valuy-15-eng-copy-1.webp`}
                alt={productInfo.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </Button>
            <Button
              className="size-14 rounded-xl p-1.5 cursor-pointer active:scale-90 active:p-2"
              variant={"outline"}
              size={"icon-lg"}
            >
              <img
                src={`https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/11/valuy-15-eng-copy-1.webp`}
                alt={productInfo.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </Button>
          </div>
        </div>

        <div className="">
          <div>
            <p className="text-muted-foreground">Apple</p>
            <h2 className="text-xl text-normal font-[400] leading-6 text-foreground">
              {productInfo.title}
            </h2>
            <h1 className="text-2xl my-5 text-rose-400 font-medium gap-3">
              {productInfo.price.toLocaleString()} <span className="font-[400] text-sm">EGP </span>
            </h1>
          </div>

          <h2 className="text-sm text-normal font-[500] leading-6 text-foreground my-5">
            عايز اعمل طلب جديد
          </h2>
          <div className="">
            <div className="gap-3 grid border p-2 rounded-xl w-full">
              <div className="text-sm flex gap-3 flex-row items-center justify-between w-full">
                <div className="flex gap-3 items-center">
                  <Button
                    className="rounded-3xl cursor-pointer"
                    variant={"secondary"}
                    size={"icon-sm"}
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
                    className="w-20 text-center border-none shadow-none focus:shadow-none"
                    min={1}
                    max={40}
                  />
                  <Button
                    className="rounded-3xl cursor-pointer"
                    variant={"secondary"}
                    size={"icon-sm"}
                    onClick={handleIncrement}
                  >
                    +
                  </Button>
                </div>
                <Button
                  className="rounded-3xl cursor-pointer"
                  variant={"default"}
                  size={"lg"}
                  onClick={handleOrder}
                >
                  طلب اوردر
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-secondary/30 rounded-xl">
            <p className="text-sm text-muted-foreground">الإجمالي:</p>
            <p className="text-xl font-bold text-foreground">
              {(productInfo.price * quantity).toLocaleString()} EGP
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-5 min-h-screen">
        <BlockDetails />
      </div>
    </div>
  );
}

function BlockDetails() {
  return (
    <Tabs defaultValue="item-1" className="w-full items-center">
      <TabsList className="bg-white/0 gap-3 w-full ">
        <TabsTrigger
          value="item-1"
          className="shadow-none data-[state=active]:shadow-none data-[state=active]:border-none data-[state=active]:bg-primary data-[state=active]:text-secondary dark:data-[state=active]:bg-primary bg-secondary text-sm p-5 rounded-xl"
        >
          لمحة عامة
        </TabsTrigger>
        <TabsTrigger
          value="item-2"
          className="shadow-none data-[state=active]:shadow-none data-[state=active]:border-none data-[state=active]:bg-primary data-[state=active]:text-secondary dark:data-[state=active]:bg-primary bg-secondary text-sm p-5 rounded-xl"
        >
          المواصفات العامة
        </TabsTrigger>

        <TabsTrigger
          value="item-3"
          className="shadow-none data-[state=active]:shadow-none data-[state=active]:border-none data-[state=active]:bg-primary data-[state=active]:text-secondary dark:data-[state=active]:bg-primary bg-secondary text-sm p-5 rounded-xl"
        >
          اراء المشترين
        </TabsTrigger>
        <TabsTrigger
          value="item-4"
          className="shadow-none data-[state=active]:shadow-none data-[state=active]:border-none data-[state=active]:bg-primary data-[state=active]:text-secondary dark:data-[state=active]:bg-primary bg-secondary text-sm p-5 rounded-xl"
        >
          ما في الطلب
        </TabsTrigger>
      </TabsList>
      <TabsContent value="item-1" className="w-full h-screen">
        <section className="w-full flex flex-col gap-0 rounded-3xl">
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
      </TabsContent>
      <TabsContent value="item-2" className="*:w-1/2 w-full">
        <TableDemo />
      </TabsContent>
      <TabsContent value="item-3">Change your password here.</TabsContent>
    </Tabs>
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
