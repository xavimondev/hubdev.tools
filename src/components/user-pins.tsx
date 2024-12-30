'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowBigUpIcon, ArrowUpRight, MoreVertical } from 'lucide-react'
import { toast } from 'sonner'

import { Pin } from '@/types/pin'

import { DEFAULT_BLUR_DATA_URL, HREF_PREFIX, NUMBER_OF_GENERATIONS_TO_FETCH } from '@/constants'
import { usePin } from '@/hooks/usePin'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { NoPinsAdded } from '@/components/empty-state'
import { RemoveIc } from '@/components/icons'
import { LoadMore } from '@/components/load-more'
import { SectionHeader } from '@/components/section-header'
import { usePinsContext } from '@/app/provider/use-pins-context'

function PinCardActions({ id }: { id: string }) {
  const { deletePin, updatePinStatus } = usePin()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='outline' className='h-8 w-8'>
          <MoreVertical className='size-3.5' />
          <span className='sr-only'>More</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem className='group' onClick={() => updatePinStatus({ id, action: 'add' })}>
          <ArrowBigUpIcon className='size-[21px] mr-[7px] group-hover:-translate-y-[2.5px] transition-transform duration-300 ease-in-out' />
          <span>Add to Top</span>
        </DropdownMenuItem>
        <DropdownMenuItem className='group' onClick={() => deletePin({ id })}>
          <RemoveIc className='size-4 ml-[3px] mr-[9px] overflow-visible' />
          <span>Remove pin</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type PinCardProps = {
  pin: Pin
}

function PinCard({ pin }: PinCardProps) {
  const { name, url, summary, category, categoryColor, id, image, placeholder } = pin

  return (
    <article className='relative size-full overflow-hidden rounded-lg border border-light-600/70 dark:border-neutral-800/70 bg-light-600/20 hover:bg-light-600/70 dark:bg-[#101010] dark:hover:bg-[#191919] transition-colors duration-300 ease-in-out resource-item grid grid-rows-subgrid row-span-2 gap-5 p-3'>
      <div className='absolute right-5 top-0 h-px w-80 bg-gradient-to-l from-transparent via-orange-500/30 dark:via-orange-400/30 via-10% to-transparent' />
      <div className='flex flex-col gap-3'>
        {image && (
          <div className='relative w-full h-[160px] rounded-md overflow-hidden border'>
            <Image
              src={image}
              fill
              alt={`Picture of ${name}`}
              className='object-cover'
              decoding='async'
              placeholder='blur'
              blurDataURL={placeholder ?? DEFAULT_BLUR_DATA_URL}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
        )}
        <div className='flex flex-col gap-2'>
          <h2 className='text-base md:text-lg font-semibold text-balance'>{name}</h2>
          <span
            style={{
              // @ts-ignore
              '--text-color': categoryColor,
              '--border-color': categoryColor
            }}
            className='text-xs font-medium rounded-sm px-2 py-1 w-fit text-[var(--text-color)] border border-dashed border-[var(--border-color)]'
          >
            {category}
          </span>
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
        <PinCardActions id={id} />
      </div>
    </article>
  )
}

type ListPinsProps = {
  pins: Pin[]
}

function ListPins({ pins }: ListPinsProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 py-6'>
      {pins.map((pin: Pin) => (
        <PinCard key={pin.id} pin={pin} />
      ))}
    </div>
  )
}

export function UserPins() {
  const addPins = usePinsContext((store) => store.addPins)
  const pins = usePinsContext((store) => store.pins)
  const userPins = pins.filter((pin) => !pin.isTop)

  const isLastRequest = useRef(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasResources, setHasResources] = useState(userPins.length > NUMBER_OF_GENERATIONS_TO_FETCH)

  const loadMorePins = async () => {
    if (isLastRequest.current || !userPins) return

    let results: any = []
    const from = userPins.length
    const to = userPins.length + NUMBER_OF_GENERATIONS_TO_FETCH

    setIsLoading(true)

    const response = await fetch(`/api/pins?from=${from}&to=${to}`)
    if (response.status !== 200) {
      toast.error('Unable to fetch pinned resources')
      return
    }

    const data = await response.json()
    results = data.data

    setIsLoading(false)

    if (!results) return

    if (results.length > 0) {
      addPins(results)
    }

    // Hidding the load more button
    if (results.length < NUMBER_OF_GENERATIONS_TO_FETCH + 1) {
      isLastRequest.current = true
      setHasResources(false)
    }
  }

  return (
    <div className='h-auto w-full shrink-0 rounded-md'>
      <SectionHeader
        title='Pinned Resources'
        description='Explore all the pins you have saved for quick access.'
      />
      <>
        {userPins.length > 0 ? <ListPins pins={userPins} /> : <NoPinsAdded />}
        {hasResources && <LoadMore loadMoreResources={loadMorePins} isLoading={isLoading} />}
      </>
    </div>
  )
}
