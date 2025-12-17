"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const EventCards = [
  {
    id: 1,
    hover: "laptop",
    image:
      "https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/11/x9d-site-eng-1-1-copy.webp",
  },
  {
    id: 2,
    hover: "headphones",
    image:
      "https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/11/ahly-18-d-eng-copy-1.webp",
  },
  {
    id: 3,
    hover: "Mobiles",
    image:
      "https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/11/valuy-15-eng-copy-1.webp",
  },
  {
    id: 4,
    hover: "Printers",
    image:
      "https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/11/valuy-15-eng-copy-1.webp",
  },
  {
    id: 5,
    hover: "TVs",
    image:
      "https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/11/valuy-15-eng-copy-1.webp",
  },
  {
    id: 6,
    hover: "Category 6",
    image:
      "https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/11/valuy-15-eng-copy-1.webp",
  },
  {
    id: 7,
    hover: "Category 7",
    image:
      "https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/11/valuy-15-eng-copy-1.webp",
  },
  {
    id: 8,
    hover: "Category 8",
    image:
      "https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/11/valuy-15-eng-copy-1.webp",
  },
  {
    id: 9,
    hover: "Category 9",
    image:
      "https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/11/valuy-15-eng-copy-1.webp",
  },
  {
    id: 10,
    hover: "Category 10",
    image:
      "https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/11/valuy-15-eng-copy-1.webp",
  },
  {
    id: 11,
    hover: "Category 11",
    image:
      "https://assets-dubaiphone.dubaiphone.net/dp-prod/wp-content/uploads/2025/11/valuy-15-eng-copy-1.webp",
  },
];


export default function EventCard() {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000, // 2s between slides
          stopOnInteraction: false, // keep playing after drag/click
          stopOnMouseEnter: true, // pause on hover (optional)
        }),
      ]}
      className="w-full max-w-7xl"
    >
      <CarouselContent className="w-full gap-0.5">
        {EventCards.map((category) => (
          <CarouselItem
            key={category.id}
            className="basis-full flex justify-center items-center"
          >
            <div className="rounded-2xl shadow-none w-full p-0">
              <img
                src={category?.image}
                alt={category?.hover}
                className="w-full h-full object-contain rounded-2xl "
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="sticky bottom-0 right-0 bg-black hidden" />
      <CarouselNext className="sticky bottom-0 right-10 hidden" />
    </Carousel>
  );
}
