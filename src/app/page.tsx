import { Suspense } from 'react'
import { Metadata, ResolvingMetadata } from 'next'

import { Container } from '@/components/container'
import { Dashboard } from '@/components/dashboard'
import { Home } from '@/components/home'
import Loading from '@/components/loading'

export const maxDuration = 60

export async function generateMetadata(
  { searchParams }: { searchParams: { query: string | undefined } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { query } = searchParams

  const images = []
  if (query) {
    images.push(`/api/og?query=${query}`)
  } else {
    const previousImages = (await parent).openGraph?.images || []
    images.push(...previousImages)
  }

  return {
    openGraph: {
      images
    },
    twitter: {
      images
    }
  }
}

export default async function MainPage({ searchParams }: { searchParams: { query: string } }) {
  const { query } = searchParams
  return (
    <>
      <Container>
        {query ? (
          <Suspense key={query} fallback={<Loading />}>
            <Home query={query} />
          </Suspense>
        ) : (
          <Dashboard />
        )}
      </Container>
    </>
  )
}
