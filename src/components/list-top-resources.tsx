'use client'

import { ErrorState } from '@/components/error-state'
import { SpecialCard } from '@/components/special-card'

type ListFeaturedResourcesProps = {
  data:
    | {
        category: string
        id: string
        title: string
        url: string
        image: string
        brief: string | null
        placeholder: string | null
        clicks: number
      }[]
    | undefined
}

export function ListFeaturedResources({ data }: ListFeaturedResourcesProps) {
  if (!data) {
    return <ErrorState error='Something went wrong' />
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 py-6'>
      {data.map(({ id, title, url, image, brief, placeholder, clicks, category }, index) => (
        <SpecialCard
          key={id}
          resource={{
            name: title,
            category,
            brief: brief ?? '',
            url,
            image,
            placeholder: placeholder ?? '',
            order: index,
            clicks
          }}
        />
      ))}
    </div>
  )
}
