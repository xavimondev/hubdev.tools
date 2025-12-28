'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { AsteriskIcon, FrownIcon, HeartIcon } from 'lucide-react'
import Link from 'next/link'

import { inter, plusJakartaSans } from '@/fonts'

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

export function NoFavorites() {
  return (
    <div className='flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-6 mt-[250px]'>
      <div className='relative'>
        <div className='size-24 rounded-full bg-muted flex items-center justify-center'>
          <HeartIcon
            className='size-12 text-muted-foreground'
            strokeWidth={1.5}
          />
        </div>
      </div>
      <div className='space-y-3'>
        <h1 className='text-2xl font-medium tracking-tight text-foreground'>No favorites found</h1>
        <p className='text-muted-foreground leading-relaxed text-balance text-sm'>
          Resource you favorite will appear here. Start exploring and save your favorite items to
          access them quickly.
        </p>
      </div>
      <Link
        href='/'
        className={`mt-2 inline-block bg-primary text-white dark:text-black px-4 py-2 rounded-md dark:hover:bg-neutral-900 transition-colors duration-150 text-sm ${inter.className}`}
      >
        Start exploring
      </Link>
    </div>
  )
}
