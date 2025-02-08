import { Suspense } from 'react'
import { Metadata } from 'next'

import { getCategoryDetails } from '@/services/list'
import { Container } from '@/components/container'
import { ErrorState } from '@/components/error-state'
import { Hero } from '@/components/hero'
import { Home } from '@/components/home'
import Loading from '@/components/loading'
import { ServerTopPins } from '@/components/server-top-pins'

export const maxDuration = 60

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  if (slug == 'all') {
    return {
      title: 'Resources'
    }
  }

  const data = await getCategoryDetails({ slug })

  if (!data) {
    return {
      title: 'Categories'
    }
  }

  const category = data[0]
  const { name, description } = category

  return {
    title: `${name} - ${description}`,
    description,
    openGraph: {
      images: [`/api/og/${slug}`]
    },
    twitter: {
      images: [`/api/og/${slug}`]
    }
  }
}

export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ query: string }>
}) {
  const { slug } = await params
  let heroTitle = ''
  let heroDescription = ''

  if (slug === 'all') {
    heroTitle = 'Resources'
    heroDescription = 'Discover an awesome list of resources for developers.'
  } else {
    const data = await getCategoryDetails({ slug })
    if (!data) return <ErrorState error='An error occurred. Please try again later.' />

    const category = data[0]

    const { name, description: categoryDescription } = category
    heroTitle = name
    heroDescription = categoryDescription as string
  }

  const { query } = await searchParams

  return (
    <Container>
      <ServerTopPins />
      <Hero title={heroTitle} description={heroDescription!} />
      <Suspense fallback={<Loading />} key={query}>
        <Home query={query} slug={slug} />
      </Suspense>
    </Container>
  )
}
