import { search } from '@/actions/ai/search'

import { ErrorState } from '@/components/error-state'
import { ListResource } from '@/components/list-resource'
import { ListSuggestion } from '@/components/list-suggestion'
import { LoadMore } from '@/components/load-more'
import { Summary } from '@/components/summary'

type HomeProps = {
  query?: string
  slug?: string
}

export async function Home({ query, slug }: HomeProps) {
  const data = await search({ q: query, slug })
  // @ts-ignore
  const { resources, summary, suggestions, error, language } = data
  if (error) {
    return <ErrorState error={error ?? 'An error occured. Please try again later.'} />
  }

  const hasResources = resources && resources.length > 0
  return (
    <>
      {hasResources && summary && <Summary summary={summary} language={language} />}
      {<ListResource data={resources} />}
      {suggestions && <ListSuggestion suggestions={suggestions} />}
      {!summary && !suggestions && <LoadMore />}
    </>
  )
}
