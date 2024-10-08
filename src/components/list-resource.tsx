import Image from 'next/image'
import { extractDomain } from '@/utils'
import { Link2Icon } from 'lucide-react'

import { Resource } from '@/types/resource'

import { DEFAULT_BLUR_DATA_URL, HREF_PREFIX } from '@/constants'
import { EmptyState } from '@/components/empty-state'

type ResourceItemProps = {
  title: string
  url: string
  summary: string
  image: string
  order: number
  placeholder: string | null
}

export function ResourceItem({
  title,
  url,
  summary,
  image,
  order,
  placeholder
}: ResourceItemProps) {
  return (
    <a
      className='rounded-lg shadow-sm overflow-hidden border border-light-600/70 dark:border-neutral-800/70 bg-light-600/20 hover:bg-light-600/70 dark:bg-[#101010] dark:hover:bg-[#191919] transition-colors duration-300 ease-in-out resource-item'
      href={`${HREF_PREFIX}${url}`}
      target='_blank'
      rel='noopener noreferrer'
    >
      <Image
        loading={order < 4 ? 'eager' : 'lazy'}
        src={image}
        width={400}
        height={225}
        priority={order === 0}
        alt={`Picture of ${title}`}
        className='w-full h-40 object-cover'
        decoding='async'
        placeholder='blur'
        blurDataURL={placeholder ?? DEFAULT_BLUR_DATA_URL}
      />
      <div className='p-4'>
        <h2 className='text-base md:text-lg font-semibold text-balance'>{title}</h2>
        <div className='flex items-center justify-between mt-1'>
          <span className='text-xs text-blue-700 dark:text-anchor font-semibold flex items-center'>
            <Link2Icon className='size-4 mr-2' />
            <span className=''>{extractDomain(url)}</span>
          </span>
        </div>
        <p className='text-sm text-gray-700 dark:text-link line-clamp-4 mt-2 text-pretty'>
          {summary}
        </p>
      </div>
    </a>
  )
}

type ListResourceProps = {
  data: Resource[]
}

export function ListResource({ data }: ListResourceProps) {
  return (
    <>
      {data && data.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 py-6'>
          {data.map(({ id, title, url, summary, image, placeholder }, index) => {
            return (
              <ResourceItem
                order={index}
                key={id}
                title={title}
                url={url}
                summary={summary}
                image={image}
                placeholder={placeholder}
              />
            )
          })}
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  )
}
