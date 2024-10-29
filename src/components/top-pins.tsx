import { headers } from 'next/headers'
import { getUser } from '@/auth/server'

import { getTopPines } from '@/services/list-pines'
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

  const topPines = await getTopPines({ userId: user.id })
  if (!topPines) return <ErrorState error='Something went wrong' />

  return (
    <>{topPines.length > 0 && <ListTopPins topPines={topPines} isPinsVisible={isPinsVisible} />}</>
  )
}
