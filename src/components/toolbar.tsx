'use client'

import { useState } from 'react'
import { AsteriskIcon } from 'lucide-react'

import { useAISearch } from '@/hooks/useAISearch'
import { FormSearch } from '@/components/form-search'

const SUGGESTIONS_SEARCH = [
  'books for learning TypeScript',
  'webs for inspiration',
  'how to build a blog using Next.js, Tailwind and markdown',
  'platforms for sending emails',
  'herramientas de testing para React',
  'plataformas open source para analíticas',
  'librerías para autenticación'
]

export function Toolbar() {
  const [prompt, setPrompt] = useState('')
  const { getResourcesFromSearch } = useAISearch()

  const handleSubmit = async (input: string) => {
    await getResourcesFromSearch({ input })
  }

  return (
    <div className='flex flex-col fixed left-1/2 -translate-x-1/2 top-0 z-50 rounded-full h-[50px] w-[min(420px,calc(100%_-_150px))] shadow-md bg-gradient-to-br from-stone-800 to-neutral-900 translate-y-[8px] group focus-within:w-[calc(100%_-_8px)] focus-within:md:w-[600px] focus-within:h-[230px] focus-within:rounded-xl transition-multiple duration-300'>
      <FormSearch handleSubmit={handleSubmit} prompt={prompt} setPrompt={setPrompt} />
      <div className='size-full hidden group-focus-within:block border-t border-t-neutral-700/40 overflow-y-auto scrollbar-hide'>
        <div className='flex flex-wrap gap-2 items-center p-2 w-full'>
          {SUGGESTIONS_SEARCH.map((suggestion) => (
            <button
              aria-label='Search for resources'
              key={suggestion}
              onClick={async () => {
                setPrompt(suggestion)
                await handleSubmit(suggestion)
              }}
              className='flex items-center border border-neutral-600 bg-neutral-800 hover:bg-[#121212] p-2 rounded-md cursor-pointer transition duration-300'
            >
              <AsteriskIcon className='mr-2 text-yellow-400 size-4' />
              <span className='text-white text-sm font-semibold text-left'>{suggestion}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
