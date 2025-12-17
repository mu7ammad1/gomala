import Link from 'next/link';
import { Button } from '../ui/button';
import { LucideShoppingBag } from 'lucide-react';

export default function Navbar(){
  return (
      <nav className={`w-full px-3`}>
        <p className='bg-teal-600 text-white text-center'>اطلبه تلوقتي و ليك شحن مجاني لاي مكان</p>
        <div className="w-full flex justify-between items-center pt-3 pb-6 text-sm">
          <div className="flex items-center font-semibold">
            <Link href={"/"} className='text-3xl font-bold momo-trust-display-regular'>Gomlla</Link>
          </div>
          <div className='flex gap-3 justify-between items-center text-orange-500'>
            <Button
              className="rounded-xl cursor-pointer"
              variant={"default"}
              size={"icon"}
            >
              <LucideShoppingBag absoluteStrokeWidth />
            </Button>
            <Button
              variant={"secondary"}
              size={"default"}
              className="shadow-none rounded-full"
            >
              تواصل مع المبيعات
            </Button>
           
          </div>
        </div>
      </nav>
  );
};











