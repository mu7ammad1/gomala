import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/tutorial/navbar";
import { Toaster } from "@/components/ui/sonner";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Gomlla - جـمـلـة سهلتها عليك و سهلتها على عميلك",
  description: "جوملا - منصة التجارة الإلكترونية المتكاملة التي تسهل عليك وعلى عملائك عمليات الشراء والبيع بكل سهولة وأمان.",
};

import { LucideShoppingCart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { CartProvider } from "@/hooks/use-cart";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`rubik-700 antialiased bg-background w-full transition-all duration-300`}
      >
        <GoogleTagManager gtmId="GTM-5K9S9CLK" />
        <GoogleTagManager gtmId="GTM-EF3FBJQJ5M" />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme={true}
          storageKey="theme"
          disableTransitionOnChange
        >
          <CartProvider>
            <section className="w-full justify-center items-center flex flex-col mx-auto">
              <Navbar />
              {children}
              <Toaster />
              <Link
                href="https://wa.me/201009758799"
                target="_blank"
                rel="noopener noreferrer"
                className={`size-12 bg-primary rounded-full fixed bottom-10 right-10 justify-center items-center flex border-5 border-secondary animate-bounce z-[5000]`}
              >
                <MessageCircle className="size-6 text-white" />
              </Link>
            </section>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
