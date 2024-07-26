import { Metadata } from 'next'

import { getCategoryDetails, getResourcesByCategorySlug } from '@/services/list'
import { Hero } from '@/components/hero'
import { ListResource } from '@/components/list-resource'

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
    <div className='ml-0 md:ml-56'>
      <Hero title={name} description={description!} />
      <ListResource data={formatedData} />
    </div>
  )
}
