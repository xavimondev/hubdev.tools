export function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-2xl text-balance font-semibold text-light-800 dark:text-primary'>
        {title}
      </h2>
      <p className='text-sm text-pretty max-w-lg text-muted-foreground'>{description}</p>
    </div>
  )
}
