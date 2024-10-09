'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowBigDownIcon, ArrowBigUpIcon, ArrowUpRight, MoreVertical, PinIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Resource } from '@/types/resource'

import { DEFAULT_BLUR_DATA_URL, HREF_PREFIX } from '@/constants'
import { cn } from '@/utils/styles'
import { createSupabaseBrowserClient } from '@/utils/supabase-client'
import {
  addPin,
  getPin,
  removePin,
  updateIsTopStatus,
  updateIsTopStatusByResourceId
} from '@/services/pines'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { EmptyState } from '@/components/empty-state'
import { RemoveIc } from '@/components/icons'

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
  const [isTopPinned, setIsTopPinned] = useState(false)

  // TODO: update this function, maybe remove the option to set a top pin
  const updatePinStatus = async ({ resourceId }: { resourceId: string }) => {
    setIsPinned(false)
    try {
      const supabase = await createSupabaseBrowserClient()

      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (!user) {
        toast.error('You need to be logged in to pin a resource.')
        return
      }

      const { id: userId } = user

      const isPinnedResult = !isTopPinned

      const pinData = await getPin({ resourceId, userId })

      // At this point this resources is not pin, so let's added to database and then update its status
      if (pinData.length === 0) {
        const response = await addPin({ resource_id: resourceId, user_id: userId })
        if (response === 'ok') {
          const response = await updateIsTopStatusByResourceId({
            resourceId,
            action: 'add',
            userId
          })
          if (response === 'ok') {
            toast.success('Status updated successfully', {
              duration: 2000
            })
            setIsTopPinned(isPinnedResult)
          }
        }

        return
      }

      const pinId = pinData[0].id
      const action = isPinnedResult ? 'add' : 'remove'
      const response = await updateIsTopStatus({ pinId, action, userId })
      if (response === 'ok') {
        toast.success('Status updated successfully', {
          duration: 2000
        })

        if (action === 'remove') {
          setIsPinned(true)
        }

        setIsTopPinned(isPinnedResult)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  const pinResource = async ({ resource_id }: { resource_id: string }) => {
    const supabase = await createSupabaseBrowserClient()
    const {
      data: { user }
    } = await supabase.auth.getUser()
    if (!user) {
      toast.error('You need to be logged in to pin a resource.')
      return
    }

    const { id } = user

    const pin = {
      resource_id,
      user_id: id
    }

    try {
      const isPinnedResult = !isPinned

      if (isPinnedResult) {
        const response = await addPin(pin)
        if (response === 'ok') {
          toast.success('Pin added successfully', {
            duration: 2000
          })
          setIsPinned(isPinnedResult)
        }
        return
      }

      const response = await removePin(pin)
      if (response === 'ok') {
        toast.info('Pin removed successfully')
        setIsPinned(isPinnedResult)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <article
      className={cn(
        'rounded-lg shadow-sm overflow-hidden border transition-colors duration-300 ease-in-out resource-item',
        isPinned
          ? 'border-orange-500/30 bg-orange-400/30 hover:bg-orange-600/30 dark:border-orange-200/40 dark:bg-orange-200/5 dark:hover:bg-orange-400/5'
          : isTopPinned
            ? 'bg-gradient-to-br bg-light-600/20 dark:from-neutral-950 dark:to-stone-900 border-light-600/70 dark:border-orange-300/20 dark:hover:border-orange-300/50'
            : DEFAULT_STYLE
      )}
    >
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size='icon' variant='outline' className='h-8 w-8'>
                <MoreVertical className='size-3.5' />
                <span className='sr-only'>More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                className='group'
                onClick={() => updatePinStatus({ resourceId: id })}
              >
                {!isTopPinned ? (
                  <>
                    <ArrowBigUpIcon className='size-[21px] mr-[5px] group-hover:-translate-y-[2.5px] transition-transform duration-300 ease-in-out' />
                    <span>Mark as Top Pin</span>
                  </>
                ) : (
                  <>
                    <ArrowBigDownIcon className='size-[21px] mr-2 group-hover:translate-y-[2.5px] transition-transform duration-300 ease-in-out' />
                    <span>Remove from Top</span>
                  </>
                )}
              </DropdownMenuItem>
              {!isTopPinned && (
                <DropdownMenuItem
                  className='group'
                  onClick={() => pinResource({ resource_id: id })}
                >
                  {!isPinned ? (
                    <>
                      <PinIcon className='size-4 ml-[2px] mr-2 group-hover:animate-scale-pulse' />
                      <span>Pin</span>
                    </>
                  ) : (
                    <>
                      <RemoveIc className='size-4 ml-[3px] mr-[9px] overflow-visible' />
                      <span>Remove pin</span>
                    </>
                  )}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
        <EmptyState />
      )}
    </>
  )
}
