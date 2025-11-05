'use client'

import Image from 'next/image'
import { ArrowUpRight, MoreVertical } from 'lucide-react'

import { Pin } from '@/types/pin'

import { DEFAULT_BLUR_DATA_URL, HREF_PREFIX } from '@/constants'
import { usePin } from '@/hooks/usePin'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MapPinOffIcon } from '@/components/animated-icons/map-pin-off'
import { SparklesIcon } from '@/components/animated-icons/sparkles'
import { NoPinsAdded } from '@/components/empty-state'
import { SectionHeader } from '@/components/section-header'

function PinCardActions({ id }: { id: string }) {
  const { deletePin, updatePinStatus } = usePin()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          size='icon'
          variant='outline'
          className='h-8 w-8'
        >
          <MoreVertical className='size-3.5' />
          <span className='sr-only'>More</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          className='group'
          onClick={() =>
            updatePinStatus({
              id,
              action: 'add'
            })
          }
        >
          <SparklesIcon>
            <span>Add to Highlights</span>
          </SparklesIcon>
        </DropdownMenuItem>
        <DropdownMenuItem
          className='group'
          onClick={() =>
            deletePin({
              id
            })
          }
        >
          <MapPinOffIcon>
            <span>Unpin</span>
          </MapPinOffIcon>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type PinCardProps = {
  pin: Pin
}

function PinCard({ pin }: PinCardProps) {
  const { name, url, summary, brief, category, categoryColor, id, image, placeholder } = pin

  return (
    <article className='relative size-full overflow-hidden rounded-lg border border-light-600/70 dark:border-neutral-800/70 bg-light-600/20 hover:bg-light-600/70 dark:bg-[#101010] dark:hover:bg-[#191919] transition-colors duration-300 ease-in-out resource-item grid grid-rows-subgrid row-span-2 gap-3 p-2.5'>
      <div className='absolute right-5 top-0 h-px w-80 bg-linear-to-l from-transparent via-orange-500/30 dark:via-orange-400/30 via-10% to-transparent' />
      <div className='flex flex-col gap-3'>
        {image && (
          <div className='relative w-full h-[190px] rounded-md overflow-hidden border'>
            <Image
              src={image}
              fill
              alt={`Picture of ${name}`}
              className='object-cover object-center'
              decoding='async'
              placeholder='blur'
              blurDataURL={placeholder ?? DEFAULT_BLUR_DATA_URL}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
        )}
        <div className='flex flex-col gap-2'>
          <h2 className='font-semibold text-balance'>{name}</h2>
          <span
            style={{
              // @ts-ignore
              '--text-color': categoryColor,
              '--border-color': categoryColor
            }}
            className='text-xs font-medium rounded-lg px-2 py-1 w-fit text-(--text-color) border border-dashed border-(--border-color)'
          >
            {category}
          </span>
          <p className='text-sm text-gray-700 dark:text-link text-pretty'>{brief ?? summary}</p>
        </div>
      </div>
      <div className='flex justify-between'>
        <a
          className='group flex gap-1 items-center text-xs text-blue-700 dark:text-anchor transition-colors duration-300 ease-in-out resource-item hover:underline underline-offset-2'
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
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 py-6'>
      {pins.map((pin: Pin) => (
        <PinCard
          key={pin.id}
          pin={pin}
        />
      ))}
    </div>
  )
}

type UserPinsProps = {
  userPins: Pin[]
}

export function UserPins({ userPins }: UserPinsProps) {
  return (
    <div className='h-auto w-full shrink-0 rounded-md'>
      <SectionHeader
        title='Pinned Resources'
        description='Explore all the pins you have saved for quick access.'
      />
      <>{userPins.length > 0 ? <ListPins pins={userPins} /> : <NoPinsAdded />}</>
    </div>
  )
}
