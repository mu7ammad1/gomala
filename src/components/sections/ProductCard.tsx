import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideRat, LucideShoppingBag, LucideStar } from "lucide-react";
import { Button } from "../ui/button";

interface ProductCardProps {
  id: number;
  title: string;
  name: string;
  description: string;
  price: string;
  rate: number;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  rate,
  imageUrl,
}) => {
  return (
    <Card className="p-0 rounded-2xl shadow-none w-full h-full gap-0">
      <CardContent className="p-0 rounded-t-2xl h-full relative bg-secondary/10 justify-center items-center flex">
        <Button
          className="rounded-xl cursor-pointer absolute top-2 right-12 z-50"
          variant={"secondary"}
          size={"icon-sm"}
        >
          <LucideStar absoluteStrokeWidth />
        </Button>
        <Button
          className="rounded-xl cursor-pointer absolute top-2 right-2 z-50"
          variant={"secondary"}
          size={"icon-sm"}
        >
          <LucideShoppingBag absoluteStrokeWidth />
        </Button>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full aspect-square object-contain rounded-t-2xl max-h-96"
        />
      </CardContent>
      <CardFooter className="p-3 grid gap-2 rounded-b-2xl bg-secondary h-full">
        <CardTitle>
          <p className="text-sm font-thin text-gray-800 hidden">
            Snickers & Shoes
          </p>
          <Link href={`/product/${id}`}>
            <p className="text-normal font-[400] leading-6">{title}</p>
          </Link>
        </CardTitle>
        <CardDescription className="text-sm gap-1 items-center w-full flex">
          <LucideStar
            size={14}
            className={`stroke-orange-500 fill-orange-500 storke-none outline-none border-none inline`}
          />
          <LucideStar
            size={14}
            className={`stroke-orange-500 fill-orange-500 storke-none outline-none border-none inline`}
          />
          <LucideStar
            size={14}
            className={`stroke-orange-500 fill-orange-500 storke-none outline-none border-none inline`}
          />
          <LucideStar
            size={14}
            className={`stroke-orange-500 fill-orange-500 storke-none outline-none border-none inline`}
          />
          <LucideStar
            size={14}
            className={`stroke-orange-500 fill-orange-500 storke-none outline-none border-none inline`}
          />
          <span className="pl-2">{rate}</span>
        </CardDescription>
        <CardDescription className="text-sm flex gap-3 *:py-1 ">
          <p className="text-base font-thin">${price}</p>
          <p className="text-base font-thin line-through">${price}</p>
          <p className="text-base font-thin text-rose-400">-%20</p>
        </CardDescription>

        <Link href={`/product/${id}`} className="w-full">
          <Button
            className="rounded-xl cursor-pointer w-full"
            variant={"outline"}
            size={"lg"}
          >
            طلب اوردر
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
