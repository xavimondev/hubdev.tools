import { getUserPines } from '@/services/list-pines'
import { Container } from '@/components/container'
import { ListPines } from '@/components/list-pines'

export default async function Page() {
  const pines = await getUserPines()

  return (
    <Container>
      <ListPines pines={pines} />
    </Container>
  )
}
