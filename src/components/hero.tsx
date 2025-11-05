type HeroProps = {
  title: string
  description: string
}

export function Hero({ title, description }: HeroProps) {
  return (
    <div className='flex flex-col gap-2'>
      <h1 className='text-2xl text-balance font-semibold text-light-800 dark:text-primary category'>
        {title}
      </h1>
      <p className='text-sm text-pretty max-w-lg text-muted-foreground'>{description}</p>
    </div>
  )
}
