'use client'

import { SparkleIcon } from 'lucide-react'
import snarkdown from 'snarkdown'

import { useAIStore } from '@/store'
import { SummaryTools } from '@/components/summary-tools'

export function Summary() {
  const summary = useAIStore((state) => state.summary)
  const isLoadingSummary = useAIStore((state) => state.isLoadingSummary)

  const html = snarkdown(summary)

  return (
    <>
      {isLoadingSummary ? (
        <div className='h-[300px] w-full animate-pulse rounded-md bg-gray-500' />
      ) : (
        <>
          {summary ? (
            <div className='flex flex-col gap-2 rounded-lg border-2 border-yellow-500 bg-gradient-to-br from-red-100 from-30% via-slate-50 to-yellow-200 p-4 shadow-sm'>
              <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center gap-2 text-yellow-900'>
                  <SparkleIcon className='size-6' />
                  <h3 className='text-xl md:text-2xl font-semibold'>Summary Results</h3>
                </div>
                <SummaryTools />
              </div>
              <div
                className='text-sm md:text-base text-gray-700'
                dangerouslySetInnerHTML={{ __html: html }}
              ></div>
            </div>
          ) : null}
        </>
      )}
    </>
  )
}
