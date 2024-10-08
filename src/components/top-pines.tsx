'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowBigDownIcon, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react'
import { toast } from 'sonner'

import { Pin } from '@/types/pin'

import { HREF_PREFIX } from '@/constants'
import { createSupabaseBrowserClient } from '@/utils/supabase-client'
import { removePin, updateIsTopStatus } from '@/services/pines'
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

type PinCardProps = {
  pin: Pin
  deletePin: ({ resourceId }: { resourceId: string }) => Promise<void>
  removePinFromTop: ({ id }: { id: string }) => Promise<void>
}

function PinCard({ pin, deletePin, removePinFromTop }: PinCardProps) {
  const { name, resourceId, url, summary, category, categoryColor, id } = pin
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
      <div className='flex flex-col gap-3 p-3'>
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
              <DropdownMenuItem
                className='group'
                onClick={() => deletePin({ resourceId: resourceId as string })}
              >
                <RemoveIc className='size-4 ml-[3px] mr-[9px] overflow-visible' />
                <span>Remove pin</span>
              </DropdownMenuItem>
              <DropdownMenuItem className='group' onClick={() => removePinFromTop({ id })}>
                <ArrowBigDownIcon className='size-[21px] mr-2 group-hover:translate-y-[2.5px] transition-transform duration-300 ease-in-out' />
                <span>Remove from Top</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='text-base font-semibold text-balance'>{name}</h2>
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
          <p className='text-sm text-muted-foreground line-clamp-4 text-pretty'>{summary}</p>
        </div>
      </div>
    </a>
  )
}

function ListTopPines({ topPines }: { topPines: Pin[] }) {
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

  const deletePin = async ({ resourceId }: { resourceId: string }) => {
    try {
      const supabase = await createSupabaseBrowserClient()
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (!user) {
        toast.error('You need to be logged in to pin a resource.')
        return
      }

      const { id } = user
      const response = await removePin({
        resource_id: resourceId,
        user_id: id
      })

      if (response === 'ok') {
        toast('🗑️ Pin removed successfully', {
          duration: 1000
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message)
      }
    }
  }

  const removePinFromTop = async ({ id }: { id: string }) => {
    try {
      const response = await updateIsTopStatus({ pinId: id, action: 'remove' })
      if (response === 'ok') {
        toast('😔 Pin removed from Top Pins', {
          duration: 1000
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message)
      }
    }
  }

  return (
    <div className='mb-10'>
      <div className='flex items-center justify-between'>
        <SectionHeader
          title='Top Pinned Cards'
          description='Here are some of the most popular pines'
        />
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
            {topPines.map((pin) => (
              <PinCard
                key={pin.id}
                pin={pin}
                deletePin={deletePin}
                removePinFromTop={removePinFromTop}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function TopPines({ topPines }: { topPines: Pin[] }) {
  return (
    <>
      {topPines.length > 0 ? (
        <ListTopPines topPines={topPines} />
      ) : (
        <div className='grid-cols-3'>No pines found</div>
      )}
    </>
  )
}
