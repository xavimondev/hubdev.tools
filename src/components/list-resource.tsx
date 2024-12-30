'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, PinIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useDebouncedCallback } from 'use-debounce'

import { Resource } from '@/types/resource'

import { DEFAULT_BLUR_DATA_URL, HREF_PREFIX } from '@/constants'
import { cn } from '@/utils/styles'
import { createSupabaseBrowserClient } from '@/utils/supabase-client'
import { addPin, removePinByResourceAndUser } from '@/services/pins'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { NoResultsSearch } from '@/components/empty-state'

type ResourceItemProps = {
  id: string
  title: string
  url: string
  summary: string
  image: string
  order: number
  placeholder: string | null
}
const DEFAULT_STYLE =
  'border-light-600/70 bg-light-600/20 hover:bg-light-600/70 dark:border-neutral-800/70 dark:bg-[#101010] dark:hover:bg-[#191919]'
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

  const debounced = useDebouncedCallback(async (isPinnedResult, pin) => {
    const { resource_id, user_id } = pin
    if (isPinnedResult) {
      const response = await addPin(pin)
      if (response === 'ok') {
        toast.success('Added to your Pins', {
          duration: 2000
        })
      }
      return
    }

    await removePinByResourceAndUser({ resourceId: resource_id, userId: user_id })
  }, 200)

  const pinResource = async ({ resourceId }: { resourceId: string }) => {
    const supabase = await createSupabaseBrowserClient()
    const {
      data: { user }
    } = await supabase.auth.getUser()
    if (!user) {
      toast.warning('You need to be logged in to pin a resource.')
      return
    }

    const { id } = user

    const pin = {
      resource_id: resourceId,
      user_id: id
    }

    try {
      const isPinnedResult = !isPinned

      // TODO: update using useOptimistic
      setIsPinned(isPinnedResult)

      debounced(isPinnedResult, pin)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <article
      className={cn(
        'rounded-lg shadow-sm border transition-colors duration-300 ease-in-out resource-item grid grid-rows-subgrid row-span-2 gap-5 p-3',
        isPinned
          ? 'border-orange-500/30 bg-orange-400/30 hover:bg-orange-600/30 dark:border-orange-200/40 dark:bg-orange-200/5 dark:hover:bg-orange-400/5'
          : isPinned
            ? 'bg-gradient-to-br bg-light-600/20 dark:from-neutral-950 dark:to-stone-900 border-light-600/70 dark:border-orange-300/20 dark:hover:border-orange-300/50'
            : DEFAULT_STYLE
      )}
    >
      <div className='flex flex-col gap-3'>
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
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='text-base md:text-lg font-semibold text-balance'>{title}</h2>
          <p className='text-sm text-gray-700 dark:text-link line-clamp-4 text-pretty'>{summary}</p>
        </div>
      </div>
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
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='cursor-pointer' onClick={() => pinResource({ resourceId: id })}>
                <PinIcon
                  className={cn(
                    'size-[22px] mr-2 hover:scale-110 text-orange-300',
                    isPinned && 'fill-orange-200/80'
                  )}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side='left' className='border-light-600 dark:border-neutral-800/70'>
              <p>{isPinned ? 'Remove from Pins' : 'Mark as a Pin'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </article>
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
        <NoResultsSearch />
      )}
    </>
  )
}
