import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-start gap-10'>
      <h2 className='text-9xl font-bold momo-trust-display-regular'>404</h2>
      <p>انت بدور علي صفحة غير موجودة او كانت موجودة</p>
      <div className='flex gap-5'>
        <Button className='rounded-3xl' variant={"outline"} size={"lg"}>
          <Link href="/feed">تواصل بالمبيعات</Link>
        </Button>
        <Button className='rounded-3xl' variant={"default"} size={"lg"}>
          <Link href="/feed">صفحة الرئيسية</Link>
        </Button>
      </div>
    </div>
  )
}