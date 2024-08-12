'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { addSearch } from '@/actions/history'

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
    <div className='flex flex-col fixed left-1/2 -translate-x-1/2 top-0 z-50 rounded-full h-[50px] w-[min(420px,calc(100%_-_110px))] shadow-md bg-gradient-to-br from-stone-800 to-neutral-900 translate-y-[8px] group focus-within:w-[calc(100%_-_8px)] focus-within:md:w-[600px] focus-within:h-[280px] focus-within:rounded-xl transition-multiple duration-300'>
      <FormSearch handleSearch={handleSearch} />
      <SearchSuggestions
        handleSearch={handleSearch}
        searchHistory={searchHistory}
        searchSuggestionsAI={searchSuggestionsAI}
      />
    </div>
  )
}
