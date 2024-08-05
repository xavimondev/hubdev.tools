import { AsteriskIcon, HistoryIcon, SparkleIcon } from 'lucide-react'

const SUGGESTIONS_SEARCH = [
  'books for learning TypeScript',
  'librerías para autenticación',
  'how to build a blog using Next.js, Tailwind and markdown',
  'platforms for sending emails',
  'plataformas open source para analíticas'
]

function SearchSuggestionsAI({
  searchSuggestionsAI,
  handleSearch
}: {
  searchSuggestionsAI: string[]
  handleSearch: (term: string) => void
}) {
  return (
    <div className='flex flex-col gap-2 p-2'>
      <span className='text-xs font-semibold text-neutral-300 uppercase'>ai Suggestions</span>
      <div className='flex flex-wrap gap-2 items-center w-full'>
        {searchSuggestionsAI.map((suggestion) => (
          <button
            aria-label={`Search for ${suggestion}`}
            key={suggestion}
            onClick={() => {
              handleSearch(suggestion)
            }}
            className='flex items-center border border-neutral-600 bg-neutral-800 hover:bg-[#121212] p-2 rounded-md cursor-pointer transition duration-300'
          >
            <SparkleIcon className='mr-2 text-yellow-400 size-4' />
            <span className='text-gray-300 hover:text-white text-sm font-semibold text-left'>
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
    <div className='flex flex-col gap-2 p-2'>
      <span className='text-xs font-semibold text-neutral-300 uppercase'>search history</span>
      <div className='flex flex-wrap gap-2 items-center w-full'>
        {searchHistory.map((suggestion) => (
          <button
            aria-label={`Search for ${suggestion}`}
            key={suggestion}
            onClick={() => {
              handleSearch(suggestion)
            }}
            className='flex items-center border border-neutral-600 bg-neutral-800 hover:bg-[#121212] p-2 rounded-md cursor-pointer transition duration-300'
          >
            <HistoryIcon className='mr-2 text-yellow-400 size-4' />
            <span className='text-gray-300 hover:text-white text-sm font-semibold text-left'>
              {suggestion}
            </span>
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
    <div className='size-full hidden group-focus-within:block border-t border-t-neutral-700/40 overflow-y-auto scrollbar-hide'>
      <>
        {searchHistory.length === 0 && searchSuggestionsAI.length === 0 ? (
          <div className='flex flex-wrap gap-2 items-center p-2 w-full'>
            {SUGGESTIONS_SEARCH.map((suggestion) => (
              <button
                aria-label={`Search for ${suggestion}`}
                key={suggestion}
                onClick={() => {
                  handleSearch(suggestion)
                }}
                className='flex items-center border border-neutral-600 bg-neutral-800 hover:bg-[#121212] p-2 rounded-md cursor-pointer transition duration-300'
              >
                <AsteriskIcon className='mr-2 text-yellow-400 size-4' />
                <span className='text-gray-300 hover:text-white text-sm font-semibold text-left'>
                  {suggestion}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <>
            <SearchHistory searchHistory={searchHistory} handleSearch={handleSearch} />
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
