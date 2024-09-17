import { CircleX } from 'lucide-react'

export function ErrorState({ error }: { error: string }) {
  return (
    <div className='flex flex-col justify-center bg-background px-4 py-12 mx-auto max-w-lg'>
      <div className='flex flex-col items-center justify-center'>
        <div className='text-center'>
          <CircleX className='mx-auto size-36 text-primary' />
          <h3 className='mt-4 text-xl font-bold tracking-tight text-foreground sm:text-3xl'>
            Error
          </h3>
          <p className='mt-1 text-yellow-800 dark:text-yellow-500 text-lg'>{error}</p>
        </div>
      </div>
    </div>
  )
}
