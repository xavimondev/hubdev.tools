import { Suspense } from 'react'
import { Metadata, ResolvingMetadata } from 'next'

import { AISuggestionsResources } from '@/components/ai-suggestions-resources'
import { Container } from '@/components/container'
import { FeatureResources } from '@/components/feature-resources'
import { LatestResources } from '@/components/latest-resources'
import { LoadingCards } from '@/components/loading'

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

export default async function MainPage() {
  return (
    <>
      <Container>
        <FeatureResources />
        <Suspense fallback={<LoadingCards />}>
          <AISuggestionsResources />
        </Suspense>
        <LatestResources />
      </Container>
    </>
  )
}
