'use client'

import { SparkleIcon } from 'lucide-react'
import snarkdown from 'snarkdown'

import { SummaryTools } from '@/components/summary-tools'

export function Summary({ summary, language }: { summary: string; language: string }) {
  const html = snarkdown(summary)

  return (
    <>
      <div className='flex flex-col gap-2 rounded-lg border-2 border-yellow-500 bg-gradient-to-br from-red-100 from-30% via-sky-50 to-yellow-200 p-4 shadow-sm'>
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center gap-2 text-yellow-900'>
            <SparkleIcon className='size-6' />
            <h3 className='text-xl md:text-2xl font-semibold'>Summary Results</h3>
          </div>
          <SummaryTools summary={summary} language={language} />
        </div>
        <div
          className='text-sm md:text-base text-gray-700'
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </div>
    </>
  )
}
