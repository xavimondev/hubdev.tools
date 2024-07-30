import { Metadata } from 'next'

import { getCategoryDetails, getResourcesByCategorySlug } from '@/services/list'
import { Container } from '@/components/container'
import { Hero } from '@/components/hero'
import { ListResource } from '@/components/list-resource'
import { ListSuggestion } from '@/components/list-suggestion'
import { LoadMore } from '@/components/load-more'
import { Summary } from '@/components/summary'

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params
  const data = await getCategoryDetails({ slug })

  if (!data) {
    return {
      title: 'Categories'
    }
  }

  const category = data[0]
  const { name, description } = category

  return {
    title: name,
    description: description
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const data = await getCategoryDetails({ slug })
  if (!data) return

  const category = data[0]

  const { name, description } = category
  const resources = await getResourcesByCategorySlug({ from: 0, to: 11, slug })

  if (!resources) {
    console.log('An error occurred')
    return
  }

  const formatedData = resources.map((item) => {
    const { categories, ...resource } = item

    const { name } = categories ?? {}
    return {
      ...resource,
      category: name ?? ''
    }
  })

  return (
    <Container>
      <Hero title={name} description={description!} />
      <Summary />
      <ListResource data={formatedData} />
      <ListSuggestion />
      <LoadMore />
    </Container>
  )
}
