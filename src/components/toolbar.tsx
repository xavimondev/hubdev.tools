'use client'

import { Dispatch, SetStateAction } from 'react'
import { ArrowRightIcon, BrainIcon, Mic2Icon } from 'lucide-react'
import { toast } from 'sonner'

import { Resource } from '@/types/resource'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type ToolbarProps = {
  setListResources: Dispatch<SetStateAction<Resource[]>>
}

export function Toolbar({ setListResources }: ToolbarProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const response = await fetch('/api/search', {
      method: 'POST',
      body: formData
    })
    const data = await response.blob()
    const transcript = decodeURIComponent(response.headers.get('X-Transcript') || '')
    const results = decodeURIComponent(response.headers.get('X-Data') || '')

    if (!response.ok || !transcript || !data || !response.body) {
      if (response.status === 429) {
        toast.error('Too many requests. Please try again later.')
      } else {
        toast.error((await response.text()) || 'An error occurred.')
      }
      return
    }

    const resourcesFromSearch = JSON.parse(results) as Resource[]

    if (resourcesFromSearch.length === 0) {
      toast.info('No results were found')
      return
    }

    setListResources(resourcesFromSearch)

    const auu = new Audio(URL.createObjectURL(data))
    auu.play()
  }

  return (
    <div className='flex fixed left-1/2 bottom-8 z-10 px-2.5 py-1.5 bg-[#1c1a1a] rounded-full w-auto border -translate-x-1/2 translate-y-[20px]'>
      <div className='flex items-center w-full'>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='icon' className='bg-transparent mr-1 rounded-full'>
                <Mic2Icon className='size-5' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Microphone</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='icon' className='bg-transparent rounded-full'>
                <BrainIcon className='size-5' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Brain</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Separator orientation='vertical' className='h-8 !mx-2 border-r border-[#444]' />
        <form className='w-96 !mx-0.5' onSubmit={handleSubmit}>
          <div className='relative w-full'>
            <label className='sr-only' htmlFor='input'>
              Prompt
            </label>
            <Input
              type='input'
              id='input'
              name='input'
              placeholder='Tell me about a stack to build a static site'
              className='block w-full p-2 pr-10 text-sm text-foreground border-none bg-transparent rounded-md focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
            />
            <Button
              variant='ghost'
              size='icon'
              type='submit'
              className='absolute inset-y-0 right-0 flex items-center rounded-full'
            >
              <ArrowRightIcon className='size-5 text-muted-foreground' />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
