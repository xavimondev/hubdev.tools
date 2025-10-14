import { search } from '@/services/search'
import { ErrorState } from '@/components/error-state'
import { PanelResources } from '@/components/panel-resources'

type HomeProps = {
  query?: string
  slug?: string
}

export async function Home({ query, slug }: HomeProps) {
  const data = await search({
    q: query,
    slug
  })
  // @ts-ignore
  const { resources, error } = data
  if (error) {
    return <ErrorState error={error ?? 'An error occured. Please try again later.'} />
  }

  return <PanelResources resources={resources} />
}
