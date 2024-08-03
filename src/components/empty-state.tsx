import { AsteriskIcon, FrownIcon } from 'lucide-react'

import { useAISearch } from '@/hooks/useAISearch'

export function EmptyState() {
  const { getResourcesFromSearch } = useAISearch()

  return (
    <div className='flex flex-col justify-center bg-background px-4 py-12 mx-auto max-w-lg'>
      <div className='flex flex-col items-center justify-center'>
        <div className='text-center'>
          <FrownIcon className='mx-auto size-36 text-primary' />
          <h3 className='mt-4 text-xl font-bold tracking-tight text-foreground sm:text-3xl'>
            No Results Found For
          </h3>
          <p className='mt-1 text-yellow-500 text-lg'>
            How to look for something cool on the internet? that is what we are here for.
          </p>
        </div>
      </div>
      <div className='grid gap-4 mt-5'>
        <div className='text-[#b9b9b9]'>Here are some suggestions that might help:</div>
        <ul className='grid gap-2 text-sm'>
          <li
            className='flex items-center border hover:bg-neutral-900 p-2 rounded-md cursor-pointer transition duration-300'
            onClick={async () =>
              await getResourcesFromSearch({ input: 'courses for javascript beginners' })
            }
          >
            <AsteriskIcon className='mr-2 text-yellow-400 size-4' />
            <span className='text-white font-semibold text-left'>
              Courses for javascript beginners
            </span>
          </li>
          <li
            className='flex items-center border hover:bg-neutral-900 p-2 rounded-md cursor-pointer transition duration-300'
            onClick={async () => await getResourcesFromSearch({ input: 'analytics platform' })}
          >
            <AsteriskIcon className='mr-2 text-yellow-400 size-4' />
            <span className='text-white font-semibold text-left'>
              Open source analytics platform
            </span>
          </li>
          <li
            className='flex items-center border hover:bg-neutral-900 p-2 rounded-md cursor-pointer transition duration-300'
            onClick={async () =>
              await getResourcesFromSearch({ input: 'open source libraries for animations' })
            }
          >
            <AsteriskIcon className='mr-2 text-yellow-400 size-4' />
            <span className='text-white font-semibold text-left'>
              Open source libraries for animations
            </span>
          </li>
          <li
            className='flex items-center border hover:bg-neutral-900 p-2 rounded-md cursor-pointer transition duration-300'
            onClick={async () =>
              await getResourcesFromSearch({ input: 'alternatives to store data' })
            }
          >
            <AsteriskIcon className='mr-2 text-yellow-400 size-4' />
            <span className='text-white font-semibold text-left'>
              Alternatives to store data on the cloud
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
