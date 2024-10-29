import { getUser } from '@/auth/server'

import { getUserPines } from '@/services/list-pines'
import { Container } from '@/components/container'
import { ErrorState } from '@/components/error-state'
import { TopPins } from '@/components/top-pins'
import { UserPines } from '@/components/user-pines'

// @ts-ignore
export default async function Page() {
  const user = await getUser()

  if (!user) return <ErrorState error='You need to be logged in to view your pinned resources' />

  const pines = await getUserPines({ userId: user.id })

  if (!pines) return <ErrorState error='Something went wrong' />

  return (
    <Container>
      <TopPins />
      <UserPines userPines={pines} />
    </Container>
  )
}
