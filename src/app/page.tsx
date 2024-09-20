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
          <>
            <div className='flex flex-col gap-4'>
              <h1 className='bg-gradient-to-br from-light-800 to-light-900 dark:from-white dark:to-white/50 bg-clip-text text-3xl md:text-4xl xl:text-5xl text-transparent text-balance font-bold'>
                Results
              </h1>
              <div className='flex items-center justify-between'>
                <p className='text-base md:text-lg text-gray-600 dark:text-muted-foreground'>
                  Based on your input, there are found several relevant resources tailored to your
                  needs.
                </p>
              </div>
            </div>
            <Suspense key={query} fallback={<Loading />}>
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
