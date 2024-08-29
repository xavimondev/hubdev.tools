'use client'

import { ArrowDownToLineIcon, LoaderCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function LoadMore({
  loadMoreResources,
  isLoading
}: {
  loadMoreResources: () => void
  isLoading: boolean
}) {
  return (
    <Button className='mt-2 rounded-full mx-auto flex justify-center' onClick={loadMoreResources}>
      {isLoading ? (
        <LoaderCircleIcon className='animate-spin size-4 md:size-5 mr-2' />
      ) : (
        <ArrowDownToLineIcon className='size-4 md:size-5 mr-2' />
      )}
      <span className='text-sm md:text-base'>Load more resources</span>
    </Button>
  )
}
