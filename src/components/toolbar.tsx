'use client'

import { BrainIcon } from 'lucide-react'

import { useAISearch } from '@/hooks/useAISearch'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { FormSearch } from '@/components/form-search'

export function Toolbar() {
  const { getResourcesFromSearch } = useAISearch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await getResourcesFromSearch({ formData })
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
    <div className='flex fixed left-1/2 bottom-8 z-10 px-2.5 py-1.5 bg-[#1c1a1a] rounded-full w-auto border -translate-x-1/2 translate-y-[20px]'>
      <div className='flex items-center w-full'>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='bg-transparent rounded-full'
                onClick={speakRight}
              >
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
