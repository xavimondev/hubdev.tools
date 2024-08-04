import { cn } from '@/utils/styles'
import { Button } from '@/components/ui/button'

export function ButtonSummary({
  fn,
  styles,
  children
}: {
  fn: VoidFunction
  styles?: boolean | string
  children: React.ReactNode
}) {
  return (
    <Button
      variant='ghost'
      size='icon'
      className={cn(
        'size-8 p-0.5 rounded-md bg-transparent text-yellow-800 hover:text-yellow-900 hover:bg-yellow-500 transition-colors duration-200',
        styles
      )}
      onClick={fn}
    >
      {children}
    </Button>
  )
}
