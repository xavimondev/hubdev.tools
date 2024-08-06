import { Suspense } from 'react'

import { Container } from '@/components/container'
import { Hero } from '@/components/hero'
import { Home } from '@/components/home'
import Loading from '@/components/loading'

export const maxDuration = 60

export default async function MainPage({ searchParams }: { searchParams: { query: string } }) {
  const { query } = searchParams

  return (
    <>
      <Container>
        <Hero
          title='Resources'
          description='Discover an awesome list of resources for developers with cutting-edge AI features'
        />
        <Suspense fallback={<Loading />} key={query}>
          <Home query={query} />
        </Suspense>
      </Container>
    </>
  )
}
