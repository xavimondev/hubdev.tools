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
    <div className='flex flex-col gap-2'>
      <span className='text-xs font-semibold text-light-900 dark:text-white'>ai Suggestions</span>
      <div className='flex flex-wrap gap-2 items-center w-full'>
        {searchSuggestionsAI.map((suggestion) => (
          <button
            aria-label={`Search for ${suggestion}`}
            key={suggestion}
            onClick={() => {
              handleSearch(suggestion)
            }}
            className='group flex items-center border border-neutral-600/30 dark:border-neutral-600/50 bg-light-300 dark:bg-neutral-800 hover:bg-light-600/40 dark:hover:bg-neutral-900 p-2 rounded-md cursor-pointer transition-colors duration-300'
          >
            <SparklesIcon className='mr-2 text-yellow-700 dark:text-yellow-300 size-4' />
            <span className='text-gray-900 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white text-sm text-left'>
              {suggestion}
            </span>
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
    <div className='flex flex-col gap-2 mt-4'>
      <span className='text-xs font-semibold text-light-900 dark:text-white'>Recent Searches</span>
      <div className='flex flex-wrap gap-2 items-center w-full'>
        {searchHistory.map((suggestion) => (
          <button
            aria-label={`Search for ${suggestion}`}
            key={suggestion}
            onClick={() => {
              handleSearch(suggestion)
            }}
            className='group flex items-center border border-neutral-600/30 dark:border-neutral-600/50 bg-light-300 dark:bg-neutral-800 hover:bg-light-600/40 dark:hover:bg-neutral-900 p-2 rounded-md cursor-pointer transition-colors duration-300'
          >
            <HistoryIcon className='mr-2 text-yellow-700 dark:text-yellow-300 size-4' />
            <span className='text-gray-900 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white text-sm text-left'>
              {suggestion}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function DefaultSuggestions({ handleSearch }: { handleSearch: (term: string) => void }) {
  return (
    <div className='flex flex-col gap-2'>
      <span className='text-xs font-semibold text-light-900 dark:text-white'>Suggestions</span>
      <div className='flex flex-col gap-1.5 w-full'>
        {SUGGESTIONS_SEARCH.map((suggestion) => (
          <button
            aria-label={`Search for ${suggestion}`}
            key={suggestion}
            onClick={() => {
              handleSearch(suggestion)
            }}
            className='flex items-center p-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-light-600/40 hover:text-light-800 text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 dark:text-neutral-400'
          >
            <ClockIcon className='mr-2 size-3' />
            <span className='text-sm'>{suggestion}</span>
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
    <div className='size-full border-t border-light-700 dark:border-t-neutral-700/40 overflow-y-auto scrollbar-hide p-3.5 hidden group-focus-within:block'>
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
