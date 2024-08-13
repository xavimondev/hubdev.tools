import type { MetadataRoute } from 'next'

import { APP_URL } from '@/constants'
import { getCategories } from '@/services/list'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategories()

  if (!categories) {
    return [
      {
        url: APP_URL,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1
      }
    ]
  }

  const mappedCategories = categories.map((category) => ({
    url: `${APP_URL}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1
  }))

  return [
    {
      url: APP_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    },
    // @ts-ignore
    ...mappedCategories
  ]
}
