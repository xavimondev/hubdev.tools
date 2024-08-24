'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { AsteriskIcon, FrownIcon } from 'lucide-react'

export function EmptyState() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='flex flex-col justify-center bg-background px-4 py-12 mx-auto max-w-lg'>
      <div className='flex flex-col items-center justify-center'>
        <div className='text-center'>
          <FrownIcon className='mx-auto size-36 text-primary' />
          <h3 className='mt-4 text-xl font-bold tracking-tight text-foreground sm:text-3xl'>
            No results found in database for
          </h3>
          <p className='mt-1 text-yellow-500 text-lg'>{searchParams.get('query')?.toString()}</p>
        </div>
      </div>
      <div className='grid gap-4 mt-5'>
        <span className='text-link'>However there are some suggestions that might help:</span>
        <ul className='grid gap-2 text-sm'>
          <li
            className='flex items-center border hover:bg-neutral-900 p-2 rounded-md cursor-pointer transition duration-300'
            onClick={() => {
              handleSearch('courses for javascript beginners')
            }}
          >
            <AsteriskIcon className='mr-2 text-yellow-400 size-4' />
            <span className='text-white font-semibold text-left'>
              Courses for javascript beginners
            </span>
          </li>
          <li
            className='flex items-center border hover:bg-neutral-900 p-2 rounded-md cursor-pointer transition duration-300'
            onClick={() => {
              handleSearch('open source analytics platform')
            }}
          >
            <AsteriskIcon className='mr-2 text-yellow-400 size-4' />
            <span className='text-white font-semibold text-left'>
              Open source analytics platform
            </span>
          </li>
          <li
            className='flex items-center border hover:bg-neutral-900 p-2 rounded-md cursor-pointer transition duration-300'
            onClick={() => {
              handleSearch('open source libraries for animations')
            }}
          >
            <AsteriskIcon className='mr-2 text-yellow-400 size-4' />
            <span className='text-white font-semibold text-left'>
              Open source libraries for animations
            </span>
          </li>
          <li
            className='flex items-center border hover:bg-neutral-900 p-2 rounded-md cursor-pointer transition duration-300'
            onClick={() => {
              handleSearch('alternatives to store data on the cloud')
            }}
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
