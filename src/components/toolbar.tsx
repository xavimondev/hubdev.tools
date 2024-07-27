'use client'

import { BrainIcon, Mic2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { FormSearch } from '@/components/form-search'

type ToolbarProps = {
  play: () => void
  search: ({ formData }: { formData: FormData }) => Promise<void>
}

export function Toolbar({ play, search }: ToolbarProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await search({ formData })
    // console.log('formData', formData)
  }

  return (
    <div className='flex fixed left-1/2 bottom-8 z-10 px-2.5 py-1.5 bg-[#1c1a1a] rounded-full w-auto border -translate-x-1/2 translate-y-[20px]'>
      <div className='flex items-center w-full'>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='bg-transparent mr-1 rounded-full'
                onClick={play}
              >
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
        <FormSearch handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}
