import { getUser } from '@/auth/server'

import { getTopPines, getUserPines } from '@/services/list-pines'
import { Container } from '@/components/container'
import { ErrorState } from '@/components/error-state'
import { TopPines } from '@/components/top-pines'
import { UserPines } from '@/components/user-pines'

export default async function Page() {
  const user = await getUser()

  if (!user) return <ErrorState error='You need to be logged in to view your pinned resources' />

  const pines = await getUserPines()
  const topPines = await getTopPines({ userId: user.id })

  if (!topPines || !pines) return <ErrorState error='Something went wrong' />

  return (
    <Container>
      <TopPines topPines={topPines} />
      <UserPines userPines={pines} />
    </Container>
  )
}
