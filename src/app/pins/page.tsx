import { getUser } from '@/auth/server'

import { NUMBER_OF_GENERATIONS_TO_FETCH } from '@/constants'
import { getUserPins } from '@/services/list-pins'
import { Container } from '@/components/container'
import { ErrorState } from '@/components/error-state'
import { TopPins } from '@/components/top-pins'
import { UserPins } from '@/components/user-pins'

export default async function Page() {
  const user = await getUser()

  if (!user) return <ErrorState error='You need to be logged in to view your pinned resources' />

  const pins = await getUserPins({ userId: user.id, from: 0, to: NUMBER_OF_GENERATIONS_TO_FETCH })

  if (!pins) return <ErrorState error='Something went wrong' />

  return (
    <Container>
      <TopPins />
      <UserPins userPins={pins} />
    </Container>
  )
}
