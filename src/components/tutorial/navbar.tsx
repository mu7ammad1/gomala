"use client";

import Link from 'next/link';
import { LucideShoppingBag } from 'lucide-react';
import { SheetProfile } from '../auth-button';
import { useCart } from '@/hooks/use-cart';

export default function Navbar(){
  const { totalItems } = useCart();
  
  return (
      <nav className={`w-full `}>
        <p className='bg-teal-600 text-white text-center w-full'>اطلبه تلوقتي و ليك شحن مجاني لاي مكان</p>
        <div className="w-full flex justify-between items-center pt-3 pb-6 text-sm px-3">
          <div className="flex items-center font-semibold">
            <Link href={"/"} className='text-3xl font-bold momo-trust-display-regular'>Gomlla</Link>
          </div>
          <div className='flex gap-3 justify-between items-center text-orange-500'>
            <SheetProfile />
          </div>
        </div>
      </nav>
  );
};











