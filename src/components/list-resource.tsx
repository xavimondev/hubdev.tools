'use client'

import { useState } from 'react'
import Image from 'next/image'
import { addPin, Pin, removePin } from '@/actions/pin'
import { ArrowUpRight, PinIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Resource } from '@/types/resource'

import { DEFAULT_BLUR_DATA_URL, HREF_PREFIX } from '@/constants'
import { cn } from '@/utils/styles'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/empty-state'

type ResourceItemProps = {
  id: string
  title: string
  url: string
  summary: string
  image: string
  order: number
  placeholder: string | null
}

export function ResourceItem({
  id,
  title,
  url,
  summary,
  image,
  order,
  placeholder
}: ResourceItemProps) {
  const [isPinned, setIsPinned] = useState(false)

  const pinResource = async (pin: Pin) => {
    const isPinnedResult = !isPinned
    setIsPinned(isPinnedResult)

    if (isPinnedResult) {
      const res = await addPin({ pin })
      toast(res.msg)
      return
    }

    const res = await removePin({ resource_id: pin.id })
    toast(res.msg)
  }

  return (
    <div className='rounded-lg shadow-sm overflow-hidden border border-light-600/70 dark:border-neutral-800/70 bg-light-600/20 hover:bg-light-600/70 dark:bg-[#101010] dark:hover:bg-[#191919] transition-colors duration-300 ease-in-out resource-item'>
      <div className='flex flex-col gap-5 p-3'>
        <a
          className='flex flex-col gap-3'
          href={`${HREF_PREFIX}${url}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <div className='relative w-full h-[160px] rounded-md overflow-hidden border'>
            <Image
              loading={order < 4 ? 'eager' : 'lazy'}
              src={image}
              fill
              priority={order === 0}
              alt={`Picture of ${title}`}
              className='object-cover'
              decoding='async'
              placeholder='blur'
              blurDataURL={placeholder ?? DEFAULT_BLUR_DATA_URL}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <h2 className='text-base md:text-lg font-semibold text-balance'>{title}</h2>
            <p className='text-sm text-gray-700 dark:text-link line-clamp-4 text-pretty'>
              {summary}
            </p>
          </div>
        </a>
        <div className='flex justify-between'>
          <a
            className='group flex gap-1 items-center text-sm text-blue-700 dark:text-anchor transition-colors duration-300 ease-in-out resource-item hover:underline underline-offset-2'
            href={`${HREF_PREFIX}${url}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <span>Go to resource</span>
            <ArrowUpRight className='size-4 duration-200 group-hover:translate-x-[1.5px] group-hover:opacity-100' />
          </a>
          <Button
            className='group hover:bg-light-800/20 dark:hover:bg-orange-500/20'
            variant='ghost'
            size='icon'
            aria-label={isPinned ? 'Pin' : 'Remove pin'}
            onClick={() => {
              pinResource({ id, title, url, summary })
            }}
          >
            <div className={cn(isPinned && 'animate-scale-pulse')}>
              <PinIcon
                className={cn(
                  `size-6 rotate-[50deg] transition-all duration-300 ease-in-out transform group-hover:scale-105 text-light-900/50 dark:text-orange-500/50 group-hover:text-light-900 group-hover:dark:text-orange-500`,
                  isPinned &&
                    'text-light-900 fill-light-900 dark:fill-orange-500 dark:text-orange-500'
                )}
              />
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

type ListResourceProps = {
  data: Resource[]
}

export function ListResource({ data }: ListResourceProps) {
  return (
    <>
      {data && data.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 py-6'>
          {data.map(({ id, title, url, summary, image, placeholder }, index) => {
            return (
              <ResourceItem
                order={index}
                key={id}
                title={title}
                url={url}
                summary={summary}
                image={image}
                placeholder={placeholder}
                id={id}
              />
            )
          })}
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  )
}
