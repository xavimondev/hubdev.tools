type HeroProps = {
  title: string
  description: string
}

export function Hero({ title, description }: HeroProps) {
  return (
    <div className='relative flex items-center h-48'>
      <div className='absolute top-0 z-[-2] h-full w-full bg-transparent bg-[radial-gradient(ellipse_80%_50%_at_65%_-25%,rgba(105,105,105,0.2),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_50%_at_65%_-25%,rgba(120,119,198,0.2),rgba(255,255,255,0))]'></div>
      <div className='absolute inset-0 bg-grid-light-900/30 dark:bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(180deg,black,transparent)]'></div>
      <div className='relative px-4'>
        <h1 className='text-2xl md:text-4xl text-balance font-bold bg-gradient-to-br from-light-800 to-light-900 dark:from-white dark:to-white/50 bg-clip-text text-transparent category'>
          {title}
        </h1>
        <p className='text-sm md:text-base text-pretty mt-2 xl:mt-6 max-w-lg text-muted-foreground'>
          {description}
        </p>
      </div>
    </div>
  )
}
