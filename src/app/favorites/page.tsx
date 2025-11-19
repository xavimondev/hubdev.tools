import { getUser } from '@/auth/server'

import { getUserPins } from '@/services/list-pins'
import { Container } from '@/components/container'
import { ErrorState } from '@/components/error-state'
import { PinsContainer } from '@/components/pins-container'

export default async function Page() {
  const user = await getUser()

  if (!user) return <ErrorState error='You need to be logged in to view your favorites resources' />

  const userPins = await getUserPins({
    userId: user.id
  })

  return (
    <Container>
      <PinsContainer userPins={userPins} />
    </Container>
  )
}
