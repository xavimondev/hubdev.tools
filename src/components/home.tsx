import { search } from '@/actions/ai/search'

import { Resource } from '@/types/resource'

import { ErrorState } from '@/components/error-state'
import { PanelResources } from '@/components/panel-resources'

type HomeProps = {
  query?: string
  slug?: string
  idsPines?: string[]
}

export async function Home({ query, slug, idsPines }: HomeProps) {
  const data = await search({ q: query, slug })
  // @ts-ignore
  const { resources, error } = data
  if (error) {
    return <ErrorState error={error ?? 'An error occured. Please try again later.'} />
  }

  const filteredResources =
    !idsPines || idsPines.length === 0
      ? resources
      : resources.filter((resource: Resource) => !idsPines.includes(resource.id))

  return <PanelResources resources={filteredResources} />
}
