'use client'

import { ArrowDownToLineIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function LoadMore({ loadMoreResources }: { loadMoreResources: () => Promise<void> }) {
  return (
    <Button className='mt-2 rounded-full mx-auto flex justify-center' onClick={loadMoreResources}>
      <ArrowDownToLineIcon className='size-4 md:size-5 mr-2' />
      <span className='text-sm md:text-base'>Load more resources</span>
    </Button>
  )
}
