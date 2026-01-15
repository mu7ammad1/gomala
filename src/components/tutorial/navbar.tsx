"use client";
import Link from 'next/link';
import { SheetProfile } from '../auth-button';
import { useCart } from '@/hooks/use-cart';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="w-full bg-background transition-colors duration-300">
      <p className='bg-primary text-primary-foreground md:text-lg text-center w-full font-bold p-2.5 transition-all'>
        اطلب دلوقتي و ليك شحن مجاني للطلبيات فوق 880 جنيه
      </p>
      <div className="w-full flex justify-between items-center py-4 px-4 md:px-8">
        <div className="flex items-center">
          <Link href={"/"} className='text-3xl font-black text-foreground momo-trust-display-regular tracking-tighter'>
            Gomlla
          </Link>
        </div>
        <div className='flex gap-4 justify-between items-center text-primary'>
          <SheetProfile />
        </div>
      </div>
    </nav>
  );
};











