import CategoryCard from "@/components/sections/categoryCard";
import EventCard from "@/components/sections/eventCard";
import ProductCard from "@/components/sections/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex flex-row justify-center items-center w-full ">
        <EventCard />
      </div>
      <div className="flex flex-row justify-center items-center w-full">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
            slidesToScroll: 2,
          }}
          className="w-full h-auto max-w-7xl"
        >


          <CarouselContent className=" w-full  -ml-2">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-1/ basis-1/3 p-1"
              >
                <ProductCard
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  imageUrl={product.image}
                  name={product.name}
                  rate={product.rate}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className=" bottom-0 left-0" />
          <CarouselNext className=" bottom-0 right-0" />
        </Carousel>
      </div>


    </div>
  );
}
