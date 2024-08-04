'use client'

import { removeMarkdownFormatting } from '@/utils'
import { LoaderCircleIcon, SparkleIcon, StopCircleIcon, Volume2Icon } from 'lucide-react'
import snarkdown from 'snarkdown'

import { useAIStore } from '@/store'
import { usePlayer } from '@/hooks/usePlayer'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { CopySummaryButton } from '@/components/copy-summary'
import { ButtonSummary } from '@/components/summary-tools-button'

function PlayButton({ play }: { play: VoidFunction }) {
  return (
    <ButtonSummary fn={play}>
      <Volume2Icon className='size-5' />
      <span className='sr-only'>Read Aloud</span>
    </ButtonSummary>
  )
}

function StopButton({ stop }: { stop: VoidFunction }) {
  return (
    <ButtonSummary fn={stop}>
      <StopCircleIcon className='size-5' />
      <span className='sr-only'>Pause script</span>
    </ButtonSummary>
  )
}

function LoadingAudio() {
  return (
    <span className='size-8 p-0.5 rounded-md bg-transparent text-yellow-800 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
      <LoaderCircleIcon className='animate-spin size-5' />
    </span>
  )
}

export function Summary() {
  const summary = useAIStore((state) => state.summary)
  const language = useAIStore((state) => state.language)
  const { speak, isPlaying, stop, isDownloading } = usePlayer()
  const isLoadingSummary = useAIStore((state) => state.isLoadingSummary)

  const html = snarkdown(summary)

  const play = async () => {
    await speak({
      input: removeMarkdownFormatting({
        markdownText: summary
      }),
      language: language || 'English'
    })
  }

  return (
    <>
      {isLoadingSummary ? (
        <div className='h-[300px] w-full animate-pulse rounded-md bg-gray-500' />
      ) : (
        <>
          {summary ? (
            <div className='flex flex-col gap-2 rounded-lg border-2 border-yellow-500 bg-gradient-to-br from-red-100 from-30% via-slate-50 to-yellow-200 p-4 shadow-sm'>
              <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center gap-1 text-yellow-900'>
                  <SparkleIcon className='mr-2' />
                  <h3 className='text-xl md:text-2xl font-semibold'>Summary Results</h3>
                </div>
                <div className='flex items-center gap-1.5'>
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          {isDownloading ? (
                            <LoadingAudio />
                          ) : (
                            <>
                              {isPlaying ? <StopButton stop={stop} /> : <PlayButton play={play} />}
                            </>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side='bottom'>
                        {isPlaying ? 'Stop' : 'Read Aloud'}
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <CopySummaryButton />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side='bottom'>Copy</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
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
