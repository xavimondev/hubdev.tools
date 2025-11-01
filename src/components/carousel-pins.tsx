'use client'

import { usePathname } from 'next/navigation'
import { ArrowBigDownIcon, MoreVertical } from 'lucide-react'

import { Pin } from '@/types/pin'

import { HREF_PREFIX } from '@/constants'
import { usePin } from '@/hooks/usePin'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { CancelIcon } from '@/components/animated-icons/cancel'
import { MapPinOffIcon } from '@/components/animated-icons/map-pin-off'
import { PinsPreferences } from '@/components/pins-preferences'
import { SectionHeader } from '@/components/section-header'

type PinCardActionsProps = {
  id: string
}

function PinCardActions({ id }: PinCardActionsProps) {
  const { deletePin, updatePinStatus } = usePin()

  return (
    <DropdownMenu>
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
              action: 'remove'
            })
          }
        >
          <CancelIcon>
            <span>Remove from Highlights</span>
          </CancelIcon>
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
  const { name, url, summary, category, categoryColor, id } = pin
  const pathname = usePathname()

  return (
    <a
      href={`${HREF_PREFIX}${url}`}
      target='_blank'
      rel='noopener noreferrer'
    >
      <div className='flex flex-col gap-3 p-3'>
        <div className='flex items-center justify-between'>
          <img
            src={`https://www.google.com/s2/favicons?domain=${url}&sz=32`}
            alt={`Icon of resource`}
            className='rounded-md'
            width={32}
            height={32}
          />
          {pathname.includes('/favorites') && <PinCardActions id={id} />}
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='text-base font-semibold text-balance'>{name}</h2>
          <span
            style={{
              // @ts-ignore
              '--text-color': categoryColor,
              '--border-color': categoryColor
            }}
            className='text-xs font-medium rounded-sm px-2 py-1 w-fit text-(--text-color) border border-dashed border-(--border-color)'
          >
            {category}
          </span>
          <p className='text-sm text-muted-foreground line-clamp-4 text-pretty'>{summary}</p>
        </div>
      </div>
    </a>
  )
}

type ListTopPinsProps = {
  topPins: Pin[]
}

function ListTopPins({ topPins }: ListTopPinsProps) {
  return (
    <CarouselContent className='flex gap-5 ml-0'>
      {topPins.map((pin) => (
        <CarouselItem
          key={pin.id}
          className='flex-[0_0_100%] 
          sm:flex-[0_0_45%] 
          lg:flex-[0_0_31.90%] 
          p-0 
          group 
          rounded-lg 
          shadow-xs 
          overflow-hidden 
          transition-colors 
          duration-300 
          ease-in-out 
          bg-linear-to-br 
          bg-light-600/20 
          dark:from-neutral-950 
          dark:to-stone-900 
          border 
          border-light-600/70 
          dark:border-orange-300/20 
          dark:hover:border-orange-300/50'
        >
          <PinCard
            key={pin.id}
            pin={pin}
          />
        </CarouselItem>
      ))}
    </CarouselContent>
  )
}

const carouselButtonsColor = 'bg-light-800 dark:bg-neutral-800 text-white'

type CarouselPinsProps = {
  topPins: Pin[]
  isPinsVisible?: boolean
}

export function CarouselPins({ topPins, isPinsVisible }: CarouselPinsProps) {
  return (
    <Carousel>
      <div className='flex items-center justify-between'>
        <SectionHeader
          title='Highlighted Pins'
          description='Selection of the most important pins.'
        />
        <div className='flex space-x-2 ml-4'>
          {isPinsVisible !== undefined && <PinsPreferences isPinsVisible={isPinsVisible} />}
          <CarouselPrevious className={carouselButtonsColor} />
          <CarouselNext className={carouselButtonsColor} />
        </div>
      </div>
      <div className='mt-4'>
        <ListTopPins topPins={topPins} />
      </div>
    </Carousel>
  )
}
