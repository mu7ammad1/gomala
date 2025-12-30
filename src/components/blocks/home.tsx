"use client";
import Image from "next/image"

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function CarouselPlugin() {
  const plugin = React.useRef(Autoplay({
    delay: 2000,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
    stopOnFocusIn: true,
    stopOnLastSnap: false,
    playOnInit: true,
  }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-full h-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 7 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-3">
              <Card className="p-0">
                <CardContent className="flex h-auto items-center justify-center p-0">
                  <Image
                    src={"https://placehold.co/1000x400.png"}
                    width={100}
                    height={100}
                    alt="hero"
                    loading="lazy"
                    className="rounded-xl w-full object-contain"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
