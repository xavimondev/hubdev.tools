'use client'

import { useParams } from 'next/navigation'
import { SLUG_ICONS } from '@/categories'

import { cn } from '@/utils/styles'

type HeroProps = {
  title: string
  description: string
}

export function Hero({ title, description }: HeroProps) {
  const pathname = useParams<{ slug: string }>()
  const color =
    SLUG_ICONS.find((icon) => icon.slug === pathname.slug)?.bg ??
    'bg-[radial-gradient(ellipse_80%_50%_at_65%_-25%,rgba(120,119,198,0.2),rgba(255,255,255,0))]'

  return (
    <div className='relative flex items-center h-56'>
      <div className={cn('absolute top-0 z-[-2] h-full w-full bg-transparent', color)}></div>
      <div className='absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(180deg,black,transparent)]'></div>
      <div className='relative px-8 md:px-4'>
        <h1 className='relative bg-gradient-to-br from-white to-white/50 bg-clip-text sm:text-xl text-2xl lg:text-5xl text-transparent text-balance font-bold category'>
          {title}
        </h1>
        <p className='mt-6 max-w-lg text-muted-foreground text-pretty text-base lg:text-xl'>
          {description}
        </p>
      </div>
    </div>
  )
}
