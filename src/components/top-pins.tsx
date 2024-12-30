'use client'

import { usePinsContext } from '@/app/provider/use-pins-context'

import { CarouselPins } from './carousel-pins'

type TopPinsProps = {
  isPinsVisible: boolean
}

export function TopPins({ isPinsVisible }: TopPinsProps) {
  const pins = usePinsContext((store) => store.pins)
  const topPins = pins.filter((pin) => pin.isTop)

  if (topPins.length === 0) return null

  return (
    <div className='mb-10'>
      <CarouselPins topPins={topPins} isPinsVisible={isPinsVisible} />
    </div>
  )
}
