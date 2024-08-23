import { search } from '@/actions/ai/search'

import { ErrorState } from '@/components/error-state'
import { PanelResources } from '@/components/panel-resources'
import { Summary } from '@/components/summary'

type HomeProps = {
  query?: string
  slug?: string
}

export async function Home({ query, slug }: HomeProps) {
  const data = await search({ q: query, slug })
  // @ts-ignore
  const { resources, summary, error } = data
  if (error) {
    return <ErrorState error={error ?? 'An error occured. Please try again later.'} />
  }

  return (
    <>
      {summary && <Summary summary={summary} />}
      <PanelResources resources={resources} />
    </>
  )
}
