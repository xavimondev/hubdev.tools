import Link from 'next/link'

import { Container } from '@/components/container'

export default function NotFound() {
  return (
    <Container>
      <div className='flex flex-col items-center justify-center bg-background px-4 mt-[280px]'>
        <div className='text-center'>
          <h1 className='text-7xl sm:text-9xl font-bold text-foreground mb-4'>404</h1>
          <p className='text-base sm:text-xl text-muted-foreground mb-8 max-w-md'>
            The page you are looking for doesnt exist or has been moved.
          </p>
          <Link
            href='/'
            className='inline-block bg-secondary text-white px-4 py-2 rounded-md hover:bg-neutral-900 transition-colors duration-150'
          >
            Go back home
          </Link>
        </div>
      </div>
    </Container>
  )
}
