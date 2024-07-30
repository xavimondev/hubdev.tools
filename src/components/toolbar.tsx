'use client'

import { useState } from 'react'
import { AudioLinesIcon, TextIcon } from 'lucide-react'

import { useAISearch } from '@/hooks/useAISearch'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { FormSearch } from '@/components/form-search'

export function Toolbar() {
  const { getResourcesFromSearch } = useAISearch()
  const [outputFormat, setOutputFormat] = useState<'Text' | 'Audio'>('Audio')
  const handleSubmit = async (input: string) => {
    await getResourcesFromSearch({ input })
  }

  const speakRight = async () => {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input:
          'Espero que estés bien. Soy un chatbot que puede ayudarte con tus preguntas. ¿Cómo puedo ayudarte hoy?'
      })
    })

    if (!response.ok) {
      throw new Error('Failed to fetch the audio')
    }

    const audioData = await response.arrayBuffer()
    const audioContext = new AudioContext()
    const pollyBufferSourceNode = audioContext.createBufferSource()

    pollyBufferSourceNode.buffer = await audioContext.decodeAudioData(audioData)
    pollyBufferSourceNode.connect(audioContext.destination)
    pollyBufferSourceNode.start()
  }

  return (
    <div className='flex fixed left-1/2 bottom-8 z-10 px-2.5 py-1.5 bg-[#1f1d1d] rounded-full w-auto border -translate-x-1/2 translate-y-[20px]'>
      <div className='flex items-center w-full'>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <div>
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='bg-transparent rounded-full'
                      onClick={speakRight}
                    >
                      {outputFormat === 'Audio' ? (
                        <AudioLinesIcon className='size-5' />
                      ) : (
                        <TextIcon className='size-5' />
                      )}
                      <span className='sr-only'>Open output settings</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{outputFormat} Summary</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='center' className='w-[390px] bg-[#1f1d1d]'>
            <DropdownMenuLabel>Select output format</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className='flex items-center' onClick={() => setOutputFormat('Audio')}>
                <AudioLinesIcon className='mr-3 size-6' />
                <div className='flex flex-col gap-1'>
                  <span>Voice</span>
                  <span className='text-muted-foreground text-sm'>
                    Hear results aloud. Ideal for hands-free use or listening preference.
                  </span>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className='flex items-center' onClick={() => setOutputFormat('Text')}>
                <TextIcon className='mr-3 size-5' />
                <div className='flex flex-col gap-1'>
                  <span>Text</span>
                  <span className='text-muted-foreground text-sm'>
                    Display results in text. Perfect for quick reading or reference.
                  </span>
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation='vertical' className='h-8 !mx-2 border-r border-[#444]' />
        <FormSearch handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}
