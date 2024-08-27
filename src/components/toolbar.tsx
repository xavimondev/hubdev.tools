'use client'

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { addSearch } from '@/actions/history'

import { cn } from '@/utils/styles'
import { FormSearch } from '@/components/form-search'
import { SearchSuggestions } from '@/components/search-suggestions'

type ToolbarProps = {
  searchHistory: string[]
  searchSuggestionsAI: string[]
}

export function Toolbar({ searchHistory, searchSuggestionsAI }: ToolbarProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [showSuggestions, setShowSuggestions] = useState(false)

  function handleSearch(term: string, save?: boolean) {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)

    setTimeout(async () => {
      if (save) {
        await addSearch({ input: term })
      }
    }, 2000)
  }

  return (
    <div
      className={cn(
        'flex flex-col fixed left-1/2 -translate-x-1/2 top-0 z-50 rounded-xl h-[50px] w-[min(420px,calc(100%_-_110px))] shadow-sm bg-gradient-to-br from-stone-800 to-neutral-900 translate-y-[8px] transition-multiple duration-300',
        showSuggestions && 'w-[calc(100%_-_8px)] md:w-[600px] h-[280px]'
      )}
      onClick={() => setShowSuggestions(true)}
    >
      <FormSearch handleSearch={handleSearch} setShowSuggestions={setShowSuggestions} />
      {showSuggestions && (
        <SearchSuggestions
          handleSearch={handleSearch}
          searchHistory={searchHistory}
          searchSuggestionsAI={searchSuggestionsAI}
        />
      )}
    </div>
  )
}
