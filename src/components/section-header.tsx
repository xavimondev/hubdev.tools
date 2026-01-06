import { inter, plusJakartaSans } from '@/fonts'
import { cn } from '@/utils/styles'

export function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className='flex flex-col gap-2'>
      <h2
        className={cn(
          plusJakartaSans.className,
          'text-2xl text-balance font-semibold text-light-800 dark:text-primary'
        )}
      >
        {title}
      </h2>
      <p className={cn(inter.className, 'text-sm text-pretty max-w-lg text-muted-foreground')}>
        {description}
      </p>
    </div>
  )
}
