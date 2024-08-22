import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { CopySummaryButton } from '@/components/copy-summary'

export function SummaryTools({ summary }: { summary: string }) {
  return (
    <div className='flex items-center gap-1.5 border-yellow-500 bg-gradient-to-tr from-yellow-50 to-yellow-200 p-1 rounded-md border'>
      <TooltipProvider delayDuration={300}>
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
