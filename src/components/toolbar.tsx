'use client'

import { useState } from 'react'

import { useAISearch } from '@/hooks/useAISearch'
import { FormSearch } from '@/components/form-search'

const SUGGESTIONS_SEARCH = [
  'books for learning TypeScript',
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
    <div className='flex flex-col fixed left-1/2 top-0 z-50 rounded-full h-[50px] w-auto md:w-[400px] shadow-md bg-neutral-700/30 backdrop-blur-2xl backdrop-brightness-125 -translate-x-1/2 translate-y-[8px] group focus-within:w-[600px] focus-within:h-[230px] focus-within:rounded-xl transition-multiple duration-300'>
      <FormSearch handleSubmit={handleSubmit} prompt={prompt} setPrompt={setPrompt} />
      <div className='size-full hidden group-focus-within:block border-t border-t-neutral-700/40 overflow-y-auto scrollbar-hide'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 p-2'>
          {SUGGESTIONS_SEARCH.map((suggestion) => (
            <button
              key={suggestion}
              onClick={async () => {
                setPrompt(suggestion)
                await handleSubmit(suggestion)
              }}
              className='flex items-center bg-[#565656] hover:bg-[#070707] p-2 rounded-md cursor-pointer transition duration-300'
            >
              {/* <div className='rounded-full bg-yellow-700 size-2'></div> */}
              <span className='text-white text-sm font-semibold text-left'>{suggestion}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
