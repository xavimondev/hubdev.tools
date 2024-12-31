import { getUser } from '@/auth/server'

import { getTopPins } from '@/services/list-pins'
import { getPinsPreferences } from '@/services/server-pins-preferences'
import { CarouselPins } from '@/components/carousel-pins'

export async function ServerTopPins() {
  const isPinsVisible = await getPinsPreferences()
  if (!isPinsVisible) return null

  const user = await getUser()
  if (!user) return null

  const topPins = (await getTopPins({ userId: user.id })) ?? []

  return (
    <div className='mb-10'>
      <CarouselPins topPins={topPins} />
    </div>
  )
}
