import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CarouselPlugin } from "@/components/blocks/home";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const v = (await searchParams).v;

  return (
    <main className="min-h-screen bg-[#8FA878] dark:bg-[#8FA878]/20 flex flex-col gap-0 items-center w-full transition-colors">
      <CarouselPlugin />
      <section className="w-full flex-col h-auto justify-center items-center flex gap-10 py-10">
        <h2 className="text-right w-[90%] text-4xl py-4 font-bold text-foreground" dir="rtl">
          مـصـاحـف الـقـرآن الـكـريــم
        </h2>
        <div className="flex gap-5 justify-end items-center h-auto w-[90%]">
          <Link
            href={"/product/1"}
            className="flex flex-col items-right gap-3 w-52"
          >
            <Image
              src={"https://placehold.co/400x600.png"}
              width={100}
              height={100}
              alt="hero"
              loading="lazy"
              className="rounded-xl w-full object-contain"
            />
            <h2 className="text-right text-foreground" dir="rtl">
              مصحف “اكتب كلام ربي”
            </h2>
          </Link>
          <Link
            href={"/product/2"}
            className="flex flex-col items-right gap-3 w-52"
          >
            <Image
              src={"https://placehold.co/400x600.png"}
              width={100}
              height={100}
              alt="hero"
              loading="lazy"
              className="rounded-xl w-full object-contain"
            />
            <h2 className="text-right text-foreground" dir="rtl">
              مصحف “بالتجويد”
            </h2>
          </Link>
          <Link
            href={"/product/3"}
            className="flex flex-col items-right gap-3 w-52"
          >
            <Image
              src={"https://placehold.co/400x600.png"}
              width={100}
              height={100}
              alt="hero"
              loading="lazy"
              className="rounded-xl w-full object-contain"
            />
            <h2 className="text-right text-foreground" dir="rtl">
              مصحف بلاستيك عادي
            </h2>
          </Link>
        </div>
      </section>
      <section className="w-full flex-col h-auto justify-center items-center flex bg-[#ECDFCC] dark:bg-[#ECDFCC]/10 gap-10 py-20">
        <h2 className="text-right w-[90%] text-4xl  font-medium text-foreground" dir="rtl">
          مصحف بلاستيك عادي
        </h2>
        <div
          className="w-[90%] flex flex-col justify-start items-start gap-0 text-foreground transition-colors"
          dir="rtl"
        >
          <li>ijlasjdg</li>
          <li>ijlasjdg</li>
          <li>ijlasjdg</li>
          <li>ijlasjdg</li>
        </div>
      </section>{" "}
      <section className="w-full flex-col h-auto justify-center items-center flex bg-[#DA8359] dark:bg-[#DA8359]/10 gap-10 py-20">
        <h2 className="text-right w-[90%] text-4xl  font-medium text-foreground" dir="rtl">
          مصحف “بالتجويد”
        </h2>
        <div
          className="w-[90%] flex flex-col justify-start items-start gap-0 text-foreground transition-colors"
          dir="rtl"
        >
          <li>ijlasjdg</li>
          <li>ijlasjdg</li>
          <li>ijlasjdg</li>
          <li>ijlasjdg</li>
        </div>
      </section>{" "}
      <section className="w-full flex-col h-auto justify-center items-center flex bg-[#C2A68C] dark:bg-[#C2A68C]/10 gap-10 py-20">
        <h2 className="text-right w-[90%] text-4xl  font-medium text-foreground" dir="rtl">
          مصحف “اكتب كلام ربي”
        </h2>
        <div
          className="w-[90%] flex flex-col justify-start items-start gap-0 text-foreground transition-colors"
          dir="rtl"
        >
          <li>ijlasjdg</li>
          <li>ijlasjdg</li>
          <li>ijlasjdg</li>
          <li>ijlasjdg</li>
        </div>
      </section>
      <section className="w-full">
        <div className="bg-[antiquewhite] dark:bg-muted/50 gap-10 flex flex-col justify-center items-center p-16 py-32 transition-colors">
          <div className="w-auto flex justify-around w-full *:*:py-2">
            <div className="w-auto text-center *:py-5">
              <h2 className="text-4xl font-medium text-center text-foreground" dir="rtl">
                اود الاستماع اليك ❤️
              </h2>
              <p className="text-foreground">01009758799</p>
              <Link href={"/auth/sign-up"}>
                <Button variant={"secondary"} size={"lg"} className=" ">
                  اطلب تلوقتي
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
