import { getUser } from '@/auth/server'

import { getUserPins } from '@/services/list-pins'
import { Container } from '@/components/container'
import { ErrorState } from '@/components/error-state'
import { TopPins } from '@/components/top-pins'
import { UserPins } from '@/components/user-pins'

export default async function Page() {
  const user = await getUser()

  if (!user) return <ErrorState error='You need to be logged in to view your pinned resources' />

  const pins = await getUserPins({ userId: user.id })

  if (!pins) return <ErrorState error='Something went wrong' />

  return (
    <Container>
      <TopPins />
      <UserPins userPins={pins} />
    </Container>
  )
}
