import CategoryCard from "@/components/sections/categoryCard";
import EventCard from "@/components/sections/eventCard";
import ProductCard from "@/components/sections/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LucideShoppingBag, LucideStar } from "lucide-react";

const products = [

  {

    id: 1632548806,

    title: "Apple IPhone Air With FaceTime - 1TB, 8GB RAM",

    name: "Product 1",

    description: "This is product 1",

    price: "100",

    rate: 4.5,

    image:

      "https://static.mobilemasr.com/public/categories/683d9cd308f81_1748868307.webp",

  },

  {

    id: 163245508,

    title: "Apple IPhone 17 Pro Max With FaceTime - 512GB, 12GB RAM",

    name: "Product 2",

    description: "This is product 2",

    price: "200",

    rate: 4.5,

    image:

      "https://static.mobilemasr.com/public/categories/683d9cc4c1307_1748868292.webp",

  },

  {

    id: 613245581,

    title: "Apple IPhone 16 Pro Max With FaceTime - 1TB, 8GB RAM",

    name: "Product 3",

    description: "This is product 3",

    price: "300",

    rate: 4.5,

    image:

      "https://static.mobilemasr.com/public/categories/683d9cdb5a56d_1748868315.webp",

  },

  {

    id: 723245582,

    title: "Apple IPhone 15 Mini With FaceTime - 256GB, 6GB RAM",

    name: "Product 4",

    description: "This is product 4",

    price: "150",

    rate: 4.0,

    image:

      "https://static.mobilemasr.com/public/categories/683d9ce6ecda7_1748868326.webp",

  },

  {

    id: 193295508,

    title: "Apple IPhone 17 Pro Max With FaceTime - 512GB, 12GB RAM",

    name: "Product 2",

    description: "This is product 2",

    price: "200",

    rate: 4.5,

    image:

      "https://static.mobilemasr.com/public/categories/683d9cc4c1307_1748868292.webp",

  },

  {

    id: 823245583,

    title: "Apple IPhone 14 Pro Max With FaceTime - 512GB, 8GB RAM",

    name: "Product 5",

    description: "This is product 5",

    price: "220",

    rate: 4.3,

    image:

      "https://static.mobilemasr.com/public/categories/683d9cfd3e58f_1748868349.webp",

  },

  {

    id: 118925508,

    title: "Apple IPhone 17 Pro Max With FaceTime - 512GB, 12GB RAM",

    name: "Product 2",

    description: "This is product 2",

    price: "200",

    rate: 4.5,

    image:

      "https://static.mobilemasr.com/public/categories/683d9cc4c1307_1748868292.webp",

  },

];


export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = (await searchParams).filters;
  if (products.length === 0) {
    return <div className="text-center py-20">عذراً، لا توجد منتجات تطابق بحثك.</div>;
  }
  return (
    <div className="flex flex-col w-full gap-10 px-4 md:px-8">
      <EventCard />

      {/* التعديل الجوهري هنا: استخدام Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {products?.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col bg-white rounded-2xl hover:shadow-md transition-shadow duration-300 border-2 border-secondary h-full"
          >
            {/* الجزء العلوي: الصورة والأزرار */}
            <div className="relative aspect-square bg-secondary/10 rounded-t-2xl flex items-center justify-center overflow-hidden">
              <div className="absolute top-2 right-2 flex flex-col gap-2 z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <Button
                  className="rounded-xl cursor-pointer bg-white/80 backdrop-blur-sm"
                  variant="secondary"
                  size="icon-sm"
                >
                  <LucideStar size={18} className="text-gray-600" />
                </Button>
                <Button
                  className="rounded-xl cursor-pointer bg-white/80 backdrop-blur-sm"
                  variant="secondary"
                  size="icon-sm"
                >
                  <LucideShoppingBag size={18} className="text-gray-600" />
                </Button>
              </div>

              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain p-4 transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* الجزء السفلي: تفاصيل المنتج */}
            <div className="p-4 flex flex-col flex-grow gap-3">
              <Link href={`/product/${product.id}`} className="flex-grow">
                <h3 className="text-sm md:text-base font-medium leading-tight line-clamp-2 hover:text-primary transition-colors">
                  {product.title}
                </h3>
              </Link>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <LucideStar
                    key={i}
                    size={14}
                    className={`${
                      i < Math.floor(product.rate)
                        ? "fill-orange-500 stroke-orange-500"
                        : "fill-gray-200 stroke-gray-200"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">{product.rate}</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-lg font-bold">${product.price}</span>
                <span className="text-sm text-gray-400 line-through">
                  ${product.price}
                </span>
                <span className="text-xs font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded">
                  -20%
                </span>
              </div>

              <Link href={`/product/${product.id}`} className="w-full mt-auto">
                <Button
                  className="w-full rounded-xl font-bold py-5 hover:cursor-pointer"
                  variant="default"
                >
                  طلب اوردر
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}