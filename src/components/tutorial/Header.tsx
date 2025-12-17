import Link from 'next/link';

export default function Header(){
  return (
      <header className={`flex justify-center m-5 p-5 rounded-3xl min-h-72`}>
        <div className="w-full flex justify-between items-start">
          <div className="flex gap-5 items-start font-semibold basis-1/1 max-md:basis-1/3 w-full">
            <Link href={"/"} className='text-3xl text-orange-500 font-bold handjet-700'>Gommla</Link>
          </div>
          
          
          
        </div>
      </header>
  );
};