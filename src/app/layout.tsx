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
            </section>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
