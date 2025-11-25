import { Container } from '@/components/container'
import { PinsContainer } from '@/components/pins-container'

export default async function Page() {
  const userPins = undefined

  return (
    <Container>
      <PinsContainer userPins={userPins} />
    </Container>
  )
}
