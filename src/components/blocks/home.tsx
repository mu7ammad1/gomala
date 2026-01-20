"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const HERO_SLIDES = [
  {
    title: "Mafioso 4 Qadaya",
    subtitle: "الأناقة تلتقي بالقوة",
    description: "اكتشف المجموعة الجديدة من المنتجات الفاخرة التي تم تصميمها خصيصاً لتناسب ذوقك الرفيع.",
    image: "https://cdn.pixabay.com/photo/2024/05/14/11/37/tv-8760949_1280.png",
    color: "bg-[#000000]",
    textColor: "text-white"
  },
  {
    title: "التكنولوجيا بين يديك",
    subtitle: "عالم من الابتكار",
    description: "استمتع بأحدث التقنيات وأفضل الأسعار في عالم الإلكترونيات.",
    image: "https://cdn.pixabay.com/photo/2024/05/14/11/37/tv-8760950_1280.png",
    color: "bg-[#f5f5f7]",
    textColor: "text-black"
  }
];

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
    })
  );

  return (
    <section className="w-full h-[80vh] md:h-[90vh] overflow-hidden bg-black">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
      >
        <CarouselContent className="h-full ml-0">
          {HERO_SLIDES.map((slide, index) => (
            <CarouselItem key={index} className="pl-0 h-[80vh] md:h-[90vh]">
              <div className={`relative w-full h-full flex flex-col items-center justify-center text-center px-6 ${slide.color} ${slide.textColor}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="z-10 max-w-3xl"
                >
                  <span className="text-sm md:text-xl font-medium tracking-tight mb-2 block opacity-80">
                    {slide.subtitle}
                  </span>
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl opacity-70 mb-8 max-w-xl mx-auto leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button size="lg" className="rounded-full px-8 py-6 text-lg bg-primary hover:bg-primary/90">
                      تسوق الآن
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-2">
                      اعرف المزيد
                    </Button>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  whileInView={{ opacity: 0.4, scale: 1 }}
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0 z-0"
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-contain p-20 opacity-40"
                    priority={index === 0}
                  />
                </motion.div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
