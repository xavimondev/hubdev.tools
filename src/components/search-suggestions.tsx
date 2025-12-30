import { ClockIcon, HistoryIcon, SparklesIcon } from 'lucide-react'

const SUGGESTIONS_SEARCH = [
  'books for learning TypeScript',
  'how to build a blog using Next.js, Tailwind and markdown',
  'platforms for sending emails'
]

function SearchSuggestionsAI({
  searchSuggestionsAI,
  handleSearch
}: {
  searchSuggestionsAI: string[]
  handleSearch: (term: string) => void
}) {
  return (
    <div className='flex flex-col gap-2 mt-3'>
      <span className='text-xs font-semibold text-neutral-400'>AI Suggestions</span>
      <div className='flex flex-col gap-0.5 w-full'>
        {searchSuggestionsAI.map((suggestion) => (
          <button
            aria-label={`Search for ${suggestion}`}
            key={suggestion}
            onClick={() => {
              handleSearch(suggestion)
            }}
            className='flex items-center p-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-light-600/40 text-light-900 dark:hover:bg-neutral-800 dark:text-white'
          >
            <SparklesIcon className='mr-2 size-3' />
            <span>{suggestion}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function SearchHistory({
  searchHistory,
  handleSearch
}: {
  searchHistory: string[]
  handleSearch: (term: string) => void
}) {
  return (
    <div className='flex flex-col gap-2'>
      <span className='text-xs font-semibold text-neutral-400'>Recent Searches</span>
      <div className='flex flex-col gap-0.5 w-full'>
        {searchHistory.map((suggestion) => (
          <button
            aria-label={`Search for ${suggestion}`}
            key={suggestion}
            onClick={() => {
              handleSearch(suggestion)
            }}
            className='flex items-center p-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-light-600/40 text-light-900 dark:hover:bg-neutral-800 dark:text-white'
          >
            <HistoryIcon className='mr-2 size-3' />
            <span>{suggestion}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function DefaultSuggestions({ handleSearch }: { handleSearch: (term: string) => void }) {
  return (
    <div className='flex flex-col gap-2'>
      <span className='text-xs font-semibold text-neutral-400'>Suggestions</span>
      <div className='flex flex-col gap-1 w-full'>
        {SUGGESTIONS_SEARCH.map((suggestion) => (
          <button
            aria-label={`Search for ${suggestion}`}
            key={suggestion}
            onClick={() => {
              handleSearch(suggestion)
            }}
            className='flex items-center p-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-light-600/40 text-light-900 dark:hover:bg-neutral-800 dark:text-white'
          >
            <ClockIcon className='mr-2 size-3' />
            <span>{suggestion}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

type SearchSuggestionsProps = {
  handleSearch: (term: string) => void
  searchHistory: string[]
  searchSuggestionsAI: string[]
}

export function SearchSuggestions({
  handleSearch,
  searchHistory,
  searchSuggestionsAI
}: SearchSuggestionsProps) {
  return (
    <div className='size-full border-t border-light-700 dark:border-t-neutral-700/40 overflow-y-auto p-3.5 hidden group-focus-within:block'>
      <>
        {searchHistory.length === 0 && searchSuggestionsAI.length === 0 ? (
          <DefaultSuggestions handleSearch={handleSearch} />
        ) : (
          <>
            <SearchHistory
              searchHistory={searchHistory}
              handleSearch={handleSearch}
            />
            <SearchSuggestionsAI
              searchSuggestionsAI={searchSuggestionsAI}
              handleSearch={handleSearch}
            />
          </>
        )}
      </>
    </div>
  )
}
