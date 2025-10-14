'use client'

import { Pin } from '@/types/pin'

import { CarouselPins } from './carousel-pins'

type TopPinsProps = {
  topPins: Pin[]
  isPinsVisible: boolean
}

export function TopPins({ topPins, isPinsVisible }: TopPinsProps) {
  if (topPins.length === 0) return null

  return (
    <div className='mb-10'>
      <CarouselPins
        topPins={topPins}
        isPinsVisible={isPinsVisible}
      />
    </div>
  )
}
