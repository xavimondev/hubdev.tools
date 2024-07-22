import { SVGProps } from 'react'
import Link from 'next/link'
import { RESOURCES } from '@/resources'
import { extractDomain } from '@/utils'
import { Link2Icon, PictureInPicture } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Toolbar } from '@/components/toolbar'

export function Home() {
  return (
    <div className='flex flex-col min-h-screen container'>
      <header className='bg-background shadow-sm sticky top-0 z-40'>
        <div className='container flex items-center justify-between h-14 px-4 md:px-6'>
          <div className='flex items-center justify-between w-full'>
            <Link href='/' className='flex items-center gap-2 font-semibold' prefetch={false}>
              <PictureInPicture className='size-6' />
              <span>hubtools.dev</span>
            </Link>
            <Link
              href='https://github.com/xavimondev/hubtools.dev'
              target='_blank'
              className='text-muted-foreground hover:text-foreground transition-colors duration-200'
              prefetch={false}
              rel='noreferrer'
            >
              <GitHubIc className='size-5' />
            </Link>
          </div>
        </div>
      </header>
      <main className='flex-1 px-4 py-8 md:px-6 md:py-12'>
        <div className='relative flex items-center h-56'>
          <div className='absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(180deg,black,transparent)]'></div>
          <div className='relative px-8 md:px-4'>
            <h1 className='relative bg-gradient-to-br from-white to-white/50 bg-clip-text sm:text-xl text-2xl lg:text-5xl text-transparent text-balance font-bold'>
              Resources
            </h1>
            <p className='mt-6 max-w-lg text-muted-foreground text-pretty text-base lg:text-xl'>
              Discover an awesome list of resources for developers with cutting-edge AI features
            </p>
          </div>
        </div>
        <div className='bg-background rounded-lg shadow-sm border mt-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
            {RESOURCES.map(({ id, title, url, summary, urlImage, category }) => {
              return (
                <Link
                  className='rounded-lg shadow-sm overflow-hidden border border-neutral-900 bg-[#101010] hover:bg-[#191919] transition-colors duration-300 ease-in-out'
                  key={id}
                  href={url}
                  target='_blank'
                  prefetch={false}
                >
                  <img
                    src='https://res.cloudinary.com/di19fkmzs/image/upload/v1721531374/nextui_r5rslj.webp'
                    width={400}
                    height={225}
                    alt='Resource Image'
                    className='w-full h-40 object-cover'
                  />
                  <div className='p-4'>
                    <h3 className='text-lg font-semibold text-balance'>{title}</h3>
                    <div className='flex items-center justify-between mt-1'>
                      <span className='text-xs text-blue-200 font-semibold flex items-center'>
                        <Link2Icon className='size-4 mr-2' />
                        <span className=''>{extractDomain(url)}</span>
                      </span>
                      <Badge variant='secondary' className='text-xs'>
                        {category}
                      </Badge>
                    </div>
                    <p className='text-sm text-muted-foreground line-clamp-4 mt-2 text-pretty'>
                      {summary}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      <Toolbar />
      {/* <footer className='bg-background border-t shadow-sm fixed bottom-0 w-full'></footer> */}
    </div>
  )
}

function GitHubIc(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      fill='none'
      {...props}
    >
      <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
      <path d='M9 18c-4.51 2-5-2-7-2' />
    </svg>
  )
}
