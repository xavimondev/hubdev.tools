import { Suspense } from 'react'
import Image from 'next/image'
import { Medal } from 'lucide-react'

import { HREF_PREFIX } from '@/constants'
import { getFeaturedResources } from '@/services/dashboard'
import { ErrorState } from '@/components/error-state'
import { LoadingCards } from '@/components/loading'

async function ListFeatureResources() {
  const featuredResources = await getFeaturedResources()

  if (!featuredResources) {
    return <ErrorState error='Something went wrong' />
  }

  const [topResource, ...restResources] = featuredResources

  const { image, summary, title, url, blurDataURL } = topResource
  const nextTwoTopResources = restResources.slice(0, 2)

  const [secondPlace, thirdPlace] = nextTwoTopResources
  const nextThreeResources = restResources.splice(2)

  const { summary: secondPlaceSummary, title: secondPlaceTitle, url: secondPlaceUrl } = secondPlace
  const { summary: thirdPlaceSummary, title: thirdPlaceTitle, url: thirdPlaceUrl } = thirdPlace

  return (
    <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
      {/* First place */}
      <a
        className='bg-gradient-to-br from-yellow-100 to-amber-300 border-2 border-yellow-700 p-6 rounded-lg col-span-1 md:row-span-3 text-black'
        href={`${HREF_PREFIX}${url}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        <Medal className='md:size-12 mb-2 text-yellow-400' />
        <h2 className='text-xl font-semibold lowercase mb-4'>{title}</h2>
        <p className='text-sm text-gray-700 mb-4 line-clamp-4'>{summary}</p>
        <Image
          src={image}
          width={400}
          height={225}
          alt={`Picture of ${title}`}
          className='w-full h-40 object-cover rounded-sm'
          decoding='async'
          placeholder='blur'
          blurDataURL={blurDataURL}
        />
      </a>
      {/* Second place */}
      <a
        className='bg-gradient-to-br from-cyan-200 via-red-50 to-blue-200 p-6 rounded-lg col-span-1 row-span-2 text-gray-800'
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
          <h2 className='text-lg font-semibold'>{secondPlaceTitle}</h2>
        </div>
        <p className='text-sm text-gray-700 line-clamp-4'>{secondPlaceSummary}</p>
      </a>
      {/* Third place */}
      <a
        className='bg-gradient-to-br from-neutral-900 to-gray-800 p-6 rounded-lg col-span-1 row-span-2 text-white-800'
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
          <h2 className='text-lg font-semibold'>{thirdPlaceTitle}</h2>
        </div>
        <p className='text-sm text-gray-200 line-clamp-4'>{thirdPlaceSummary}</p>
      </a>
      {/* Next three */}
      <div className='bg-gradient-to-br from-blue-200 to-pink-200 rounded-lg col-span-2 row-span-1 text-gray-800 flex flex-col gap-1 divide-y divide-gray-600/20'>
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
              <p className='text-sm text-gray-800 line-clamp-3'>{summary}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export async function FeatureResources() {
  return (
    <section className='mb-4 md:mb-14'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl md:text-4xl text-balance mb-2 text-yellow-50'>Feature</h2>
        <p className='text-base md:text-xl text-transparent bg-clip-text bg-gradient-to-t from-orange-100 to-orange-400'>
          Discover the most popular resources.
        </p>
      </div>
      <Suspense fallback={<LoadingCards />}>
        <ListFeatureResources />
      </Suspense>
    </section>
  )
}
