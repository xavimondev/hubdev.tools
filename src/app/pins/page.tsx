import { headers } from 'next/headers'
import { getUser } from '@/auth/server'

import { getTopPins, getUserPins } from '@/services/list-pins'
import { getPinsPreferences } from '@/services/server-pins-preferences'
import { Container } from '@/components/container'
import { ErrorState } from '@/components/error-state'
import { PinsContainer } from '@/components/pins-container'

export default async function Page() {
  const user = await getUser()

  if (!user) return <ErrorState error='You need to be logged in to view your pinned resources' />

  const userPins = await getUserPins({
    userId: user.id
  })
  const topPins = await getTopPins({ userId: user.id })

  const pathname = (await headers()).get('x-pathname')

  const isPinsVisible = await getPinsPreferences()

  const showTopPins = isPinsVisible || pathname === '/pins'

  if (!showTopPins) return null

  return (
    <Container>
      <PinsContainer userPins={userPins} topPins={topPins} isPinsVisible={isPinsVisible} />
    </Container>
  )
}
