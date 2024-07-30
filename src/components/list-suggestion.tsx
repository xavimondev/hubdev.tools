'use client'

import Image from 'next/image'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

import { useAIStore } from '@/store'
import { Cloud } from '@/components/illustrations'

const SuggestionCard = ({
  suggestion
}: {
  suggestion: { name: string; url: string; snippet: string }
}) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href={suggestion.url}
      className='group relative size-full overflow-hidden rounded-xl bg-[#101010]'
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - left)
        mouseY.set(e.clientY - top)
      }}
    >
      <div className='absolute right-5 top-0 h-px w-80 bg-gradient-to-l from-transparent via-white/30 via-10% to-transparent' />
      <motion.div
        className='pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100'
        style={{
          background: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(38, 38, 38, 0.3), transparent 60%)`
        }}
      />
      <div className='size-full flex flex-col gap-3 rounded-xl border border-white/10 px-4 py-5'>
        <Image
          unoptimized
          src={`https://www.google.com/s2/favicons?domain=${suggestion.url}&sz=128`}
          alt={suggestion.url}
          className='p-1 rounded-md'
          width={44}
          height={44}
        />
        <div className='flex flex-col size-full'>
          <h6 className='text-sm font-semibold text-neutral-200'>{suggestion.name}</h6>
          <p className='text-xs text-muted-foreground line-clamp-2 mt-2 text-pretty'>
            {suggestion.snippet}
          </p>
        </div>
      </div>
    </a>
  )
}

export function ListSuggestion() {
  const isLoadingSuggestions = useAIStore((state) => state.isLoadingSuggestions)
  const suggestionsFromInternet = useAIStore((state) => state.suggestionsFromInternet)

  if (suggestionsFromInternet.length === 0) return null

  return (
    <div className='h-auto w-full shrink-0 rounded-md py-6'>
      <div className='flex flex-col'>
        <div className='flex items-center gap-4'>
          <Cloud width={50} height={50} />
          <h2 className='relative bg-gradient-to-br from-white to-white/50 bg-clip-text sm:text-base text-xl lg:text-3xl text-transparent text-balance font-semibold'>
            Suggestions
          </h2>
        </div>
        <p className='mt-6 max-w-lg text-muted-foreground text-pretty text-base lg:text-lg'>
          Displaying the latest and most accurate web search results
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6'>
        {isLoadingSuggestions ? (
          <>
            <div className='h-[168px] w-[290px] max-w-sm animate-pulse rounded-md bg-gray-500' />
            <div className='h-[168px] w-[290px] max-w-sm animate-pulse rounded-md bg-gray-500' />
            <div className='h-[168px] w-[290px] max-w-sm animate-pulse rounded-md bg-gray-500' />
            <div className='h-[168px] w-[290px] max-w-sm animate-pulse rounded-md bg-gray-500' />
            <div className='h-[168px] w-[290px] max-w-sm animate-pulse rounded-md bg-gray-500' />
            <div className='h-[168px] w-[290px] max-w-sm animate-pulse rounded-md bg-gray-500' />
            <div className='h-[168px] w-[290px] max-w-sm animate-pulse rounded-md bg-gray-500' />
            <div className='h-[168px] w-[290px] max-w-sm animate-pulse rounded-md bg-gray-500' />
          </>
        ) : (
          suggestionsFromInternet.map((sug) => <SuggestionCard suggestion={sug} key={sug.url} />)
        )}
      </div>
    </div>
  )
}