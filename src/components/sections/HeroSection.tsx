"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative w-full h-[500px] bg-cover bg-center rounded-2xl overflow-hidden" style={{ backgroundImage: "url('/hero-background.jpeg')" }}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-6">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
        >
          مرحبًا بك في جملة
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-xl text-lg md:text-xl mb-8"
        >
          اكتشف أفضل المنتجات بأسعار الجملة.
        </motion.p>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-6 transition-transform hover:scale-105">
            <Link href="/#products">
              تصفح المنتجات
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
