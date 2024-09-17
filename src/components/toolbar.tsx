'use client'

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { addSearch } from '@/actions/history'

import { ClassifyStatus } from '@/types/classify'

import { cn } from '@/utils/styles'
import { FormSearch } from '@/components/form-search'
import { SearchSuggestions } from '@/components/search-suggestions'

type ToolbarProps = {
  searchHistory: string[]
  searchSuggestionsAI: string[]
}

function getStatusStyles({ status }: { status: ClassifyStatus }) {
  const styles = {
    idle: 'shadow-sm',
    error: 'shadow-[0_0_12px_2px_rgba(179,64,43,0.5)] border border-red-700 dark:border-red-400/50'
  }

  return styles[status]
}

export function Toolbar({ searchHistory, searchSuggestionsAI }: ToolbarProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [statusForm, setStatusForm] = useState<ClassifyStatus>('idle')
  const styles = getStatusStyles({ status: statusForm })

  const [promptEvaluationResult, setPromptEvaluationResult] = useState<string | undefined>()

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
        `flex 
         flex-col 
         fixed 
         left-1/2 
         -translate-x-1/2 
         top-0 
         z-50 
         rounded-xl 
         h-[50px] 
         w-[min(450px,calc(100%_-_110px))] 
         bg-gradient-to-br 
         dark:from-stone-800 
         dark:to-neutral-900 
         from-stone-50
         to-light-400
         translate-y-[8px] 
         transition-multiple 
         duration-300 border border-light-600 dark:border-neutral-800/70`,
        showSuggestions && 'w-[calc(100%_-_8px)] md:w-[600px] h-[280px]',
        styles
      )}
      onClick={() => setShowSuggestions(true)}
    >
      <FormSearch
        handleSearch={handleSearch}
        setShowSuggestions={setShowSuggestions}
        setStatusForm={setStatusForm}
        setPromptEvaluationResult={setPromptEvaluationResult}
        promptEvaluationResult={promptEvaluationResult}
      />
      {showSuggestions && (
        <SearchSuggestions
          handleSearch={handleSearch}
          searchHistory={searchHistory}
          searchSuggestionsAI={searchSuggestionsAI}
        />
      )}
      {!showSuggestions && Boolean(promptEvaluationResult) && (
        <span className='my-2 w-full text-red-700 dark:text-red-400 text-sm'>
          {promptEvaluationResult}
        </span>
      )}
    </div>
  )
}
