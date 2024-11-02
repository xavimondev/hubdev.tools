import { headers } from 'next/headers'
import { getUser } from '@/auth/server'

import { getTopPins } from '@/services/list-pins'
import { getPinsPreferences } from '@/services/server-pins-preferences'
import { ErrorState } from '@/components/error-state'
import { ListTopPins } from '@/components/list-top-pins'

export async function TopPins() {
  const pathname = headers().get('x-pathname')

  const isPinsVisible = await getPinsPreferences()

  const showTopPins = isPinsVisible || pathname === '/pins'

  if (!showTopPins) return null

  const user = await getUser()
  if (!user) return null

  const topPins = await getTopPins({ userId: user.id })
  if (!topPins) return <ErrorState error='Something went wrong' />

  return <>{topPins.length > 0 && <ListTopPins topPins={topPins} isPinVisible={isPinsVisible} />}</>
}
