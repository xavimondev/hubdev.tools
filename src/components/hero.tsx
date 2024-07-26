type HeroProps = {
  title: string
  description: string
}

export function Hero({ title, description }: HeroProps) {
  return (
    <div className='relative flex items-center h-56'>
      <div className='absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(180deg,black,transparent)]'></div>
      <div className='relative px-8 md:px-4'>
        <h1 className='relative bg-gradient-to-br from-white to-white/50 bg-clip-text sm:text-xl text-2xl lg:text-5xl text-transparent text-balance font-bold'>
          {title}
        </h1>
        <p className='mt-6 max-w-lg text-muted-foreground text-pretty text-base lg:text-xl'>
          {description}
        </p>
      </div>
    </div>
  )
}
