export function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className='flex flex-col gap-3'>
      <h2 className='text-2xl md:text-3xl text-balance font-bold bg-linear-to-br from-light-800 to-light-900 dark:from-white dark:to-white/70 bg-clip-text text-transparent'>
        {title}
      </h2>
      <p className='text-sm md:text-base text-pretty max-w-lg text-muted-foreground'>
        {description}
      </p>
    </div>
  )
}
