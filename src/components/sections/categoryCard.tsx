"use client";

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import { Button } from "../ui/button";

const CategoryCards = [
  {
    id: 1,
    name: "laptop",
    image: "https://i.pinimg.com/736x/62/00/8d/62008da885ca7a67b67cba75b6764bcb.jpg"
  },
  {
    id: 2,
    name: "headphones",
    image: "https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/10/headphones.svg"
  },
  {
    id: 3,
    name: "Mobiles",
    image: "https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/10/Mobile-1.svg"
  },
  {
    id: 4,
    name: "Printers",
    image: "https://i.pinimg.com/1200x/9e/cf/e5/9ecfe500d289a3ffbe3525c971dcafb3.jpg"
  },
  {
    id: 5,
    name: "TVs",
    image: "https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/10/TV.svg"
  },
  {
    id: 6,
    name: "Category 6",
    image: "https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/10/Mobile-1.svg"
  },
  {
    id: 7,
    name: "Category 7",
    image: "https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/10/Mobile-1.svg"
  },
  {
    id: 8,
    name: "Category 8",
    image: "https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/10/Mobile-1.svg"
  },
  {
    id: 9,
    name: "Category 9",
    image: "https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/10/Mobile-1.svg"
  },
  {
    id: 10,
    name: "Category 10",
    image: "https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/10/Mobile-1.svg"
  },
  {
    id: 11,
    name: "Category 11",
    image: "https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/10/Mobile-1.svg"
  }
];

interface ProductCardProps {
  id: number
  imageUrl: string
  name: string
}

export function CateCard({ id, name, imageUrl } :ProductCardProps) {
  return (
    <Card className="p-3 rounded-2xl shadow-none gap-1 border-0 bg-[#f6f6f8] dark:bg-border">
      <CardContent className="p-0 gap-4 text-center">
        <Link href={`/products/${name.toLocaleLowerCase()}`}>
          <img src={imageUrl} alt={name} className="w-full h-full aspect-square object-contain rounded-2xl max-h-32 mb-4" />
        </Link>
        <Link href={`/products/${name}`}>
          <p className="text-base font-normal ">{name}</p>
        </Link>
      </CardContent>
    </Card>
  )
}



export default function CategoryCard() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        dragFree: true,
        slidesToScroll: 1,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-full max-w-7xl"
    >
      <div className="flex justify-between items-center">
        <h2 className="font-thin text-xl pb-3">Shop by category</h2>
          <Link href={`/products/category`}>
            <Button className="font-thin text-base pb-3" variant={"link"}>
              categorys more
            </Button>
          </Link>
      </div>
      <CarouselContent className="p-0 w-full">
      {CategoryCards.map((category) => (
          <CarouselItem key={category.id} className="basis-1/4 lg:basis-1/9">
            <div className="p-0">
              <CateCard key={category.id} id={category.id} imageUrl={category.image} name={category.name} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="sticky bottom-0 right-0 bg-black hidden" />
      <CarouselNext className="sticky bottom-0 right-10 hidden" />
    </Carousel>
  )
}







