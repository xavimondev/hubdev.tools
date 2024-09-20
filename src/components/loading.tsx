export default function Loading() {
  return (
    <div>
      <div className='h-72 w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 py-6'>
        <div className='h-[200px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
        <div className='h-[200px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
        <div className='h-[200px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
        <div className='h-[200px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
        <div className='h-[200px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
        <div className='h-[200px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
      </div>
      <div className='h-10 w-64 md:w-80 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 py-6 mt-2'>
        <div className='h-36 w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
        <div className='h-36 w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
        <div className='h-36 w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
      </div>
    </div>
  )
}

export function LoadingCards() {
  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 py-6'>
        <div className='h-[200px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
        <div className='h-[200px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
        <div className='h-[200px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
        <div className='h-[200px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
        <div className='h-[200px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
        <div className='h-[200px] w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-900' />
      </div>
    </div>
  )
}

export function LoadingBentoGrid() {
  return (
    <div className='mt-4 grid grid-cols-1 md:grid-cols-[500px_repeat(2,_1fr)] gap-4'>
      {/* First place */}
      <div className='bg-neutral-200 dark:bg-neutral-900 animate-pulse rounded-lg col-span-1 md:row-span-3'></div>
      {/* Second place */}
      <div className='bg-neutral-200 dark:bg-neutral-900 animate-pulse rounded-lg col-span-1 row-span-2 h-44'></div>
      {/* Third place */}
      <div className='bg-neutral-200 dark:bg-neutral-900 animate-pulse rounded-lg col-span-1 row-span-2 h-44'></div>
      {/* Next three */}
      <div className='bg-neutral-200 dark:bg-neutral-900 rounded-lg col-span-2 row-span-1 h-[410px]'></div>
    </div>
  )
}
