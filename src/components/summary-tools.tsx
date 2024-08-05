import { removeMarkdownFormatting } from '@/utils'
import { LoaderCircleIcon, StopCircleIcon, Volume2Icon } from 'lucide-react'

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

export function SummaryTools({ summary, language }: { summary: string; language: string }) {
  const { speak, isPlaying, stop, isDownloading } = usePlayer()

  const play = async () => {
    await speak({
      input: removeMarkdownFormatting({
        markdownText: summary
      }),
      language: language || 'English'
    })
  }

  return (
    <div className='flex items-center gap-1.5 border-yellow-500 bg-gradient-to-tr from-yellow-50 to-yellow-200 p-1 rounded-md border'>
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              {isDownloading ? (
                <LoadingAudio />
              ) : (
                <>{isPlaying ? <StopButton stop={stop} /> : <PlayButton play={play} />}</>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side='bottom'>{isPlaying ? 'Stop' : 'Read Aloud'}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <CopySummaryButton summary={summary} />
            </div>
          </TooltipTrigger>
          <TooltipContent side='bottom'>Copy</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
