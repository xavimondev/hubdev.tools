import { Suspense } from 'react'
import { Metadata, ResolvingMetadata } from 'next'

import { Container } from '@/components/container'
import { Dashboard } from '@/components/dashboard'
import { Home } from '@/components/home'
import { LoadingResources } from '@/components/loading'

export const maxDuration = 60

export async function generateMetadata(
  {
    searchParams
  }: {
    searchParams: Promise<{
      query: string | undefined
    }>
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { query } = await searchParams

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

export default async function MainPage({
  searchParams
}: {
  searchParams: Promise<{
    query: string
  }>
}) {
  const { query } = await searchParams
  return (
    <>
      <Container>
        {query ? (
          <>
            <div className='flex flex-col gap-2'>
              <h1 className='text-2xl text-balance font-semibold text-light-800 dark:text-primary'>
                Results
              </h1>
              <p className='text-sm text-pretty max-w-lg text-muted-foreground'>
                Based on your input, there are found several relevant resources tailored to your
                needs.
              </p>
            </div>
            <Suspense
              key={query}
              fallback={<LoadingResources />}
            >
              <Home query={query} />
            </Suspense>
          </>
        ) : (
          <Dashboard />
        )}
      </Container>
    </>
  )
}
