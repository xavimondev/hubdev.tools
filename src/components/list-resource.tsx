import Image from 'next/image'
import Link from 'next/link'
import { extractDomain } from '@/utils'
import { Link2Icon } from 'lucide-react'

import { Resource } from '@/types/resource'

import { Badge } from '@/components/ui/badge'

function ResourceItem({ id, title, url, summary, image, category }: Resource) {
  return (
    <Link
      className='rounded-lg shadow-sm overflow-hidden border border-neutral-900 bg-[#101010] hover:bg-[#191919] transition-colors duration-300 ease-in-out'
      key={id}
      href={url}
      target='_blank'
      prefetch={false}
    >
      <Image
        src={image}
        width={400}
        height={225}
        alt='Resource Image'
        className='w-full h-40 object-cover'
      />
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-balance'>{title}</h3>
        <div className='flex items-center justify-between mt-1'>
          <span className='text-xs text-blue-200 font-semibold flex items-center'>
            <Link2Icon className='size-4 mr-2' />
            <span className=''>{extractDomain(url)}</span>
          </span>
          <Badge variant='secondary' className='text-xs'>
            {category}
          </Badge>
        </div>
        <p className='text-sm text-muted-foreground line-clamp-4 mt-2 text-pretty'>{summary}</p>
      </div>
    </Link>
  )
}

type ListResourceProps = {
  data: Resource[]
}

export function ListResource({ data }: ListResourceProps) {
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6'>
        {data.map(({ id, title, url, summary, image, category }) => {
          return (
            <ResourceItem
              key={id}
              id={id}
              title={title}
              url={url}
              summary={summary}
              image={image}
              category={category}
            />
          )
        })}
      </div>
    </>
  )
}
