export function LoadingCards() {
  return (
    <>
      <div className='flex flex-col gap-3 mt-8'>
        <div className='h-8 w-56 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
        <div className='h-8 max-w-full w-[600px] animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 py-6'>
        <div className='h-[200px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
        <div className='h-[200px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
        <div className='h-[200px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
        <div className='h-[200px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
        <div className='h-[200px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
        <div className='h-[200px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
      </div>
    </>
  )
}

export function LoadingResources() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 py-6'>
      <div className='h-[280px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
      <div className='h-[280px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
      <div className='h-[280px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
      <div className='h-[280px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
      <div className='h-[280px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
      <div className='h-[280px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
      <div className='h-[280px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
      <div className='h-[280px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
    </div>
  )
}
