'use client'

import { PlaySquareIcon, SparkleIcon } from 'lucide-react'
import snarkdown from 'snarkdown'

import { useAIStore } from '@/store'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function Summary() {
  const summary = useAIStore((state) => state.summary)
  if (!summary) return null
  const html = snarkdown(summary)

  return (
    <div className='flex flex-col gap-2 rounded-lg border-2 border-yellow-500 bg-gradient-to-br from-slate-100 from-30% via-yellow-50 to-yellow-200 p-4 shadow-sm'>
      <div className='flex items-center justify-between mb-2'>
        <div className='flex items-center gap-1 text-yellow-900'>
          <SparkleIcon className='mr-2' />
          <h3 className='text-2xl font-semibold'>Summary Results</h3>
        </div>
        <div>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-md bg-transparent text-yellow-900 hover:text-yellow-950 hover:bg-transparent transition-colors duration-200'
                  onClick={() => console.log('speak')}
                >
                  <PlaySquareIcon className='size-7' />
                  <span className='sr-only'>Play script</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Play the summary out loud</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className='text-base text-gray-700' dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  )
}
