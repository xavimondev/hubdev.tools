'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowBigDownIcon, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react'

import { HREF_PREFIX } from '@/constants'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { RemoveIc } from '@/components/icons'
import { SectionHeader } from '@/components/section-header'
import { SettingsPinesDialog } from '@/components/settings-pines-dialog'

type Pin = {
  id: string
  title: string
  url: string
  summary: string
  category: string
}

type PinCardProps = {
  id: string
  index: number
  name: string
  url: string
  summary: string
  category: string
}

function PinCard({ id, index, name, url, summary, category }: PinCardProps) {
  return (
    <a
      className='group 
      flex-[0_0_31.90%] 
      rounded-lg 
      shadow-sm 
      overflow-hidden 
      transition-colors 
      duration-300 
      ease-in-out 
      bg-gradient-to-br 
      bg-light-600/20 
      dark:from-neutral-950
      dark:to-stone-900 
      border 
      border-light-600/70 
      dark:border-orange-300/20 
      dark:hover:border-orange-300/50'
      href={`${HREF_PREFIX}${url}`}
      target='_blank'
      rel='noopener noreferrer'
    >
      <div className='flex flex-col gap-4 p-3'>
        <div className='flex items-center justify-between'>
          <img
            src={`https://www.google.com/s2/favicons?domain=${url}&sz=32`}
            alt={`Icon of resource`}
            className='rounded-md'
            width={32}
            height={32}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size='icon' variant='outline' className='h-8 w-8'>
                <MoreVertical className='size-3.5' />
                <span className='sr-only'>More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem className='group'>
                <RemoveIc className='size-4 ml-[3px] mr-[9px] overflow-visible' />
                <span>Remove pin</span>
              </DropdownMenuItem>
              <DropdownMenuItem className='group'>
                <ArrowBigDownIcon className='size-[21px] mr-2 group-hover:translate-y-[2.5px] transition-transform duration-300 ease-in-out' />
                <span>Remove from Top</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='text-base font-semibold text-balance'>{name}</h2>
          <span className='text-xs font-medium rounded-sm text-light-900 dark:text-yellow-300 border px-2 py-1 w-fit'>
            {category}
          </span>
          <p className='text-sm text-muted-foreground line-clamp-4 text-pretty'>{summary}</p>
        </div>
      </div>
    </a>
  )
}

export function ListTopPines({ pines }: { pines: Pin[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    emblaApi.on('select', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  if (!pines || pines.length === 0) return null

  return (
    <div className='mb-10'>
      <div className='flex items-center justify-between'>
        <SectionHeader
          title='Top Pinned Cards'
          description='Here are some of the most popular pines'
        />
        {/* <div className='flex-grow h-px bg-light-600 dark:bg-neutral-700' /> */}
        <div className='flex space-x-2 ml-4'>
          <SettingsPinesDialog />
          <Button
            className='bg-light-800 dark:bg-neutral-800 text-white'
            size='icon'
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft className='size-4 stroke-[4px]' />
          </Button>
          <Button
            className='bg-light-800 dark:bg-neutral-800 text-white'
            size='icon'
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight className='size-4 stroke-[4px]' />
          </Button>
        </div>
      </div>
      <div className='mt-4'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex gap-6'>
            {pines.map(({ id, title, url, summary, category }, index) => (
              <PinCard
                key={id}
                id={id}
                index={index}
                name={title}
                url={url}
                summary={summary}
                category={category}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
