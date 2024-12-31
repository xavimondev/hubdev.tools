'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { AsteriskIcon, FrownIcon } from 'lucide-react'

export function NoResultsSearch() {
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
          <p className='mt-1 text-yellow-900 dark:text-yellow-500 text-lg'>
            {searchParams.get('query')?.toString()}
          </p>
        </div>
      </div>
      <div className='grid gap-4 mt-5'>
        <span className='text-gray-700 dark:text-link'>
          However there are some suggestions that might help:
        </span>
        <ul className='grid gap-2 text-sm'>
          <li
            className='flex items-center border border-neutral-600/30 dark:border-neutral-600/50 hover:bg-light-600/40 dark:hover:bg-neutral-900 p-2 rounded-md cursor-pointer transition duration-300'
            onClick={() => {
              handleSearch('courses for javascript beginners')
            }}
          >
            <AsteriskIcon className='mr-2 text-yellow-700 dark:text-yellow-300 size-4' />
            <span className='text-gray-700 dark:text-white font-semibold text-left'>
              Courses for javascript beginners
            </span>
          </li>
          <li
            className='flex items-center border border-neutral-600/30 dark:border-neutral-600/50 hover:bg-light-600/40 dark:hover:bg-neutral-900 p-2 rounded-md cursor-pointer transition duration-300'
            onClick={() => {
              handleSearch('open source analytics platform')
            }}
          >
            <AsteriskIcon className='mr-2 text-yellow-700 dark:text-yellow-300 size-4' />
            <span className='text-gray-700 dark:text-white font-semibold text-left'>
              Open source analytics platform
            </span>
          </li>
          <li
            className='flex items-center border border-neutral-600/30 dark:border-neutral-600/50 hover:bg-light-600/40 dark:hover:bg-neutral-900 p-2 rounded-md cursor-pointer transition duration-300'
            onClick={() => {
              handleSearch('open source libraries for animations')
            }}
          >
            <AsteriskIcon className='mr-2 text-yellow-700 dark:text-yellow-300 size-4' />
            <span className='text-gray-700 dark:text-white font-semibold text-left'>
              Open source libraries for animations
            </span>
          </li>
          <li
            className='flex items-center border border-neutral-600/30 dark:border-neutral-600/50 hover:bg-light-600/40 dark:hover:bg-neutral-900 p-2 rounded-md cursor-pointer transition duration-300'
            onClick={() => {
              handleSearch('alternatives to store data on the cloud')
            }}
          >
            <AsteriskIcon className='mr-2 text-yellow-700 dark:text-yellow-300 size-4' />
            <span className='text-gray-700 dark:text-white font-semibold text-left'>
              Alternatives to store data on the cloud
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export function NoPinsAdded() {
  return (
    <div className='flex items-center justify-center w-full h-full bg-background mt-[190px]'>
      <div className='flex flex-col items-center justify-center p-8 max-w-md w-full text-center'>
        <div className='size-48 mb-8 text-muted-foreground'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='size-full'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1}
              d='M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z'
            />
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1} d='M9 10h6m-3-3v6' />
          </svg>
        </div>
        <h2 className='text-2xl sm:text-4xl font-semibold text-foreground mb-2'>No pins yet</h2>
        <p className='text-muted-foreground mb-6'>
          Start pinning important resources to keep them easily accessible. Pinned items will appear
          here for quick reference.
        </p>
        <Link
          href='/category/ai'
          className='rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2'
        >
          Pin a Resource
        </Link>
      </div>
    </div>
  )
}