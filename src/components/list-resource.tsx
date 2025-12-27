'use client'

import Image from 'next/image'
import { ArrowUpRight, HeartIcon } from 'lucide-react'

import { Resource } from '@/types/resource'

import { inter, plusJakartaSans } from '@/fonts'

import { DEFAULT_BLUR_DATA_URL, HREF_PREFIX } from '@/constants'
import { cn } from '@/utils/styles'
import { useFavorite } from '@/hooks/useFavorite'
import { NoResultsSearch } from '@/components/empty-state'

type ResourceItemProps = {
  id: string
  title: string
  url: string
  summary: string
  brief: string | null
  image: string
  order: number
  placeholder: string | null
  isFavorite: boolean
}

export function ResourceItem({
  id,
  title,
  url,
  summary,
  brief,
  image,
  order,
  placeholder,
  isFavorite
}: ResourceItemProps) {
  const { handleToggleFavorite, isFav } = useFavorite(isFavorite, id)

  return (
    <article className='rounded-lg shadow-xs border transition-colors duration-300 ease-in-out resource-item grid grid-rows-subgrid row-span-2 gap-3 p-2.5 border-light-600/70 bg-light-600/20 hover:bg-light-600/70 dark:border-neutral-800/70 dark:bg-[#101010] dark:hover:bg-[#191919]'>
      <div className='flex flex-col gap-3'>
        <div className='relative w-full h-[190px] rounded-md overflow-hidden border'>
          <Image
            loading={order < 4 ? 'eager' : 'lazy'}
            src={image}
            fill
            priority={order === 0}
            alt={`Picture of ${title}`}
            className='object-cover object-center'
            decoding='async'
            placeholder='blur'
            blurDataURL={placeholder ?? DEFAULT_BLUR_DATA_URL}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
        <div className='flex flex-col gap-1.5'>
          <h2 className={cn(plusJakartaSans.className, 'font-semibold text-balance')}>{title}</h2>
          <p className={cn(inter.className, 'text-sm text-gray-700 dark:text-link text-pretty')}>
            {brief ?? summary}
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
          <ArrowUpRight className='size-4 duration-200 group-hover:translate-x-[1.5px] group-hover:opacity-100' />
        </a>
        <div className='flex gap-1.5'>
          <div
            className='cursor-pointer'
            onClick={handleToggleFavorite}
          >
            <HeartIcon
              className={cn(
                'size-4 mr-2 hover:scale-110 text-light-800 dark:text-red-400',
                isFav && 'fill-light-800 dark:fill-red-400'
              )}
            />
          </div>
        </div>
      </div>
    </article>
  )
}

type ListResourceProps = {
  data: Resource[]
  favoritesIds: string[]
}

export function ListResource({ data, favoritesIds }: ListResourceProps) {
  return (
    <>
      {data && data.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 py-6'>
          {data.map(({ id, title, url, summary, image, placeholder, brief }, index) => {
            return (
              <ResourceItem
                order={index}
                key={id}
                title={title}
                url={url}
                summary={summary}
                brief={brief}
                image={image}
                placeholder={placeholder}
                id={id}
                isFavorite={favoritesIds.includes(id)}
              />
            )
          })}
        </div>
      ) : (
        <NoResultsSearch />
      )}
    </>
  )
}
