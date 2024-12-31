import { generateSearchSuggestionsAI, getHistory } from '@/services/history'
import { Toolbar } from '@/components/toolbar'

export async function AISearch() {
  const history = await getHistory()
  const searchSuggestions = await generateSearchSuggestionsAI()

  return <Toolbar searchHistory={history} searchSuggestionsAI={searchSuggestions} />
}
