'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { ArrowUpRightIcon, HeartIcon } from 'lucide-react'
import { DEFAULT_BLUR_DATA_URL, HREF_PREFIX } from '@/constants'
import { cn } from '@/utils/styles'
import { inter, plusJakartaSans } from '@/fonts'
import { addFavorite, removeFavorite } from '@/actions/favorites'

type SpecialCardProps = {
  resource: {
    id: string
    name: string
    url: string
    brief: string
    category: string
    clicks: number
    image: string
    placeholder: string
    order: number
  }
  isFavorite: boolean
}

export function SpecialCard({ resource, isFavorite }: SpecialCardProps) {
  const { id, name, url, brief, category, image, placeholder, order } = resource
  const [isFav, setIsFav] = useState(isFavorite)
  const router = useRouter()

  async function handleToggleFavorite() {
    if (isFav) {
      const result = await removeFavorite(id)
      if (result.error) {
        toast.error(result.error)
        return
      }

      setIsFav(false)
      router.refresh()
    } else {
      const result = await addFavorite(id)
      if (result.error) {
        toast.error(result.error)
        return
      }

      setIsFav(true)
      router.refresh()
    }
  }

  return (
    <article
      className='rounded-lg 
        shadow-xs 
        transition-colors 
        duration-300 
        ease-in-out 
        bg-linear-to-br 
        bg-light-600/20 
        dark:from-neutral-950 
        dark:to-stone-900 
        border 
        border-light-600/70 
        dark:border-orange-300/10 
        dark:hover:border-orange-300/50 p-2.5 grid grid-rows-subgrid row-span-2 gap-3'
    >
      <div className='flex flex-col gap-3'>
        <div className='relative w-full h-[190px] rounded-md overflow-hidden border'>
          <Image
            loading={order < 4 ? 'eager' : 'lazy'}
            src={image}
            fill
            priority={order === 0}
            alt={`Picture of ${name}`}
            className='object-cover object-center'
            decoding='async'
            placeholder='blur'
            blurDataURL={placeholder ?? DEFAULT_BLUR_DATA_URL}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
        <div className='flex flex-col gap-1.5'>
          <div className='flex justify-between items-center'>
            <h2 className={cn(plusJakartaSans.className, 'font-semibold text-balance')}>{name}</h2>
            <span className='text-[10px] font-medium uppercase tracking-widest text-muted-foreground'>
              {category}
            </span>
          </div>
          <p className={cn(inter.className, 'text-sm text-gray-700 dark:text-link text-pretty')}>
            {brief}
          </p>
        </div>
      </div>
      <div className='flex justify-between'>
        <a
          className='group flex gap-1 items-center text-xs text-blue-700 dark:text-anchor transition-colors duration-300 ease-in-out resource-item hover:underline underline-offset-2'
          href={`${HREF_PREFIX}${url}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <span className={inter.className}>Go to resource</span>
          <ArrowUpRightIcon className='size-4 duration-200 group-hover:translate-x-[1.5px] group-hover:opacity-100' />
        </a>
        <div className='flex gap-1.5'>
          <div
            className='cursor-pointer'
            onClick={handleToggleFavorite}
          >
            <HeartIcon
              className={cn(
                'size-4 mr-2 hover:scale-110 text-light-800 dark:text-red-400 transition-all duration-200',
                isFav && 'fill-light-800 dark:fill-red-400'
              )}
            />
          </div>
        </div>
      </div>
    </article>
  )
}
