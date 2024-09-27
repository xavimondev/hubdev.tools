'use client'

import { useCallback, useEffect, useState } from 'react'
import { Pin, removePin } from '@/actions/pin'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowUpRight, ChevronLeft, ChevronRight, PinIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

type PinCardProps = {
  id: string
  index: number
  name: string
  url: string
  summary: string
}

function PinCard({ id, index, name, url, summary }: PinCardProps) {
  return (
    <div className='flex-[0_0_31.90%] min-w-0'>
      <div className='rounded-lg shadow-sm overflow-hidden border border-light-600/70 dark:border-orange-300/50 dark:hover:border-orange-500 bg-light-600/20 hover:bg-light-600/70 dark:bg-[#ff7a2b]/10 dark:hover:bg-orange-400/10 transition-colors duration-300 ease-in-out'>
        <div className='flex flex-col gap-5 p-3'>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-2'>
              <h2 className='text-base md:text-lg font-semibold text-balance'>{name}</h2>
              <p className='text-sm text-gray-700 dark:text-gray-300 line-clamp-4 text-pretty'>
                {summary}
              </p>
            </div>
            <div className='flex justify-between'>
              <a
                className='group flex gap-1 items-center text-sm text-blue-700 dark:text-anchor transition-colors duration-300 ease-in-out resource-item hover:underline underline-offset-2'
                href={`${url}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <span>Go to resource</span>
                <ArrowUpRight className='size-4 duration-200 group-hover:translate-x-[1.5px] group-hover:opacity-100' />
              </a>
              <Button
                variant='ghost'
                size='icon'
                aria-label='Remove pin'
                className='group hover:bg-red-800/20 dark:hover:bg-red-500/20'
                onClick={() => removePin({ resource_id: id })}
              >
                <span className='sr-only'>Delete</span>
                <svg
                  className='text-red-600 dark:text-red-400 group-hover:text-red-700 group-hover:dark:text-red-500 overflow-visible'
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M3 6h18' />
                  <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                  <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                  <path
                    className='origin-[20%_50%] transition-transform duration-300 ease-in-out group-hover:-rotate-45 group-hover:-translate-y-[1px]'
                    d='M4 6h16'
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ListPines({ pines }: { pines: Pin[] }) {
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
    <div className='mb-8'>
      <div className='flex items-center'>
        <h2 className='text-2xl font-bold mr-4 flex items-center gap-2'>
          <PinIcon className='size-[22px]' />
          Pines
        </h2>
        <div className='flex-grow h-px bg-light-600 dark:bg-neutral-700' />
        <div className='flex space-x-2 ml-4'>
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
      <div className='overflow-hidden mt-4' ref={emblaRef}>
        <div className='flex gap-6'>
          {pines.map(({ id, title, url, summary }, index) => (
            <PinCard key={id} id={id} index={index} name={title} url={url} summary={summary} />
          ))}
        </div>
      </div>
    </div>
  )
}
