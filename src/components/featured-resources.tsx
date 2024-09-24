import { Suspense } from 'react'
import Image from 'next/image'

import { DEFAULT_BLUR_DATA_URL, HREF_PREFIX } from '@/constants'
import { getFeaturedResourcesCached } from '@/services/cached-queries'
import { ErrorState } from '@/components/error-state'
import { LoadingBentoGrid } from '@/components/loading'

async function ListFeaturedResources() {
  const featuredResources = await getFeaturedResourcesCached()

  if (!featuredResources) {
    return <ErrorState error='Something went wrong' />
  }

  const [topResource, ...restResources] = featuredResources

  const { image, summary, title, url, placeholder } = topResource
  const nextTwoTopResources = restResources.slice(0, 2)

  const [secondPlace, thirdPlace] = nextTwoTopResources
  const nextThreeResources = restResources.splice(2)

  const { summary: secondPlaceSummary, title: secondPlaceTitle, url: secondPlaceUrl } = secondPlace
  const { summary: thirdPlaceSummary, title: thirdPlaceTitle, url: thirdPlaceUrl } = thirdPlace

  return (
    <div className='py-6 grid grid-cols-1 lg:grid-cols-[350px_repeat(2,_1fr)] xl:grid-cols-[500px_repeat(2,_1fr)] gap-4'>
      {/* First place */}
      <a
        className='size-full bg-gradient-to-br from-yellow-50 to-amber-200 dark:from-yellow-100 dark:to-amber-300 border-2 border-yellow-200 hover:border-yellow-500 hover:dark:border-yellow-700 transition-colors p-6 rounded-lg col-span-1 row-span-1 lg:row-span-2 xl:row-span-3'
        href={`${HREF_PREFIX}${url}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='flex items-center gap-2 mb-4'>
          <Image
            unoptimized
            src={`https://www.google.com/s2/favicons?domain=${url}&sz=128`}
            alt={`Logo for ${title}`}
            className='rounded-md'
            width={32}
            height={32}
          />
          <h2 className='text-base lg:text-3xl font-bold text-gray-900 dark:text-gray-800'>
            {title}
          </h2>
        </div>
        <p className='text-sm lg:text-base text-gray-700 mb-4 line-clamp-3 sm:line-clamp-5'>
          {summary}
        </p>
        <div className='h-[300px] w-full relative mt-24 shadow-lg rounded-md overflow-hidden hidden xl:block'>
          <Image
            src={image}
            fill
            alt={`Picture of ${title}`}
            className='object-cover'
            decoding='async'
            placeholder='blur'
            blurDataURL={placeholder ?? DEFAULT_BLUR_DATA_URL}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
      </a>
      {/* Second place */}
      <a
        className='bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-200 dark:via-red-50 dark:to-blue-200 border-2 border-blue-200 hover:border-blue-700 hover:dark:border-blue-600 transition-colors p-6 rounded-lg col-span-1 row-span-1 lg:row-span-2'
        href={`${HREF_PREFIX}${secondPlaceUrl}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='flex items-center gap-2 mb-4'>
          <Image
            unoptimized
            src={`https://www.google.com/s2/favicons?domain=${secondPlaceUrl}&sz=128`}
            alt={`Logo for ${secondPlaceTitle}`}
            className='rounded-md'
            width={32}
            height={32}
          />
          <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-800'>
            {secondPlaceTitle}
          </h2>
        </div>
        <p className='text-sm text-gray-700 line-clamp-4'>{secondPlaceSummary}</p>
      </a>
      {/* Third place */}
      <a
        className='bg-gradient-to-br from-neutral-700 to-gray-600 dark:from-neutral-900 dark:to-gray-800 border-2 border-gray-700 hover:border-gray-900 hover:dark:border-gray-500 transition-colors p-6 rounded-lg col-span-1 row-span-1 lg:row-span-2'
        href={`${HREF_PREFIX}${thirdPlace}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='flex items-center gap-2 mb-4'>
          <Image
            unoptimized
            src={`https://www.google.com/s2/favicons?domain=${thirdPlaceUrl}&sz=128`}
            alt={`Logo for ${thirdPlaceTitle}`}
            className='rounded-md'
            width={32}
            height={32}
          />
          <h2 className='text-lg font-semibold text-white'>{thirdPlaceTitle}</h2>
        </div>
        <p className='text-sm text-gray-200 line-clamp-4'>{thirdPlaceSummary}</p>
      </a>
      {/* Next three */}
      <div className='bg-gradient-to-br from-blue-100 to-pink-100 dark:from-blue-200 dark:to-pink-200 border-2 border-indigo-300 hover:border-indigo-500 hover:dark:border-indigo-700 transition-colors rounded-lg row-span-1 col-span-1 lg:col-span-3 xl:col-span-2 flex flex-col gap-1 divide-y divide-gray-600/20 text-gray-900 dark:text-gray-800'>
        {nextThreeResources.map(({ id, title, url, summary }) => {
          return (
            <div className='flex flex-col gap-4 p-6' key={id}>
              <a
                className='flex items-center gap-2'
                href={`${HREF_PREFIX}${url}`}
                rel='noopener noreferrer'
                target='_blank'
              >
                <Image
                  unoptimized
                  src={`https://www.google.com/s2/favicons?domain=${url}&sz=128`}
                  alt={`Logo for ${title}`}
                  className='rounded-lg'
                  width={32}
                  height={32}
                />
                <span className='text-lg font-semibold'>{title}</span>
              </a>
              <p className='text-sm line-clamp-3'>{summary}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export async function FeaturedResources() {
  return (
    <section>
      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl md:text-4xl text-balance text-yellow-800 dark:text-yellow-50 font-bold'>
          Featured
        </h2>
        <p className='text-base md:text-lg text-transparent bg-clip-text bg-gradient-to-t from-gray-600 to-gray-800 dark:from-orange-100 dark:to-orange-400'>
          Discover the most popular resources.
        </p>
      </div>
      <Suspense fallback={<LoadingBentoGrid />}>
        <ListFeaturedResources />
      </Suspense>
    </section>
  )
}
