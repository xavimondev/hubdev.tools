'use client'

import { useState } from 'react'
import { ArrowRightIcon, LoaderCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type FormSearchProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

export function FormSearch({ handleSubmit }: FormSearchProps) {
  const [isLoading, setIsLoading] = useState(false)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault()
    setIsLoading(true)
    await handleSubmit(e)
    setIsLoading(false)
  }

  return (
    <form className='w-96 !mx-0.5' onSubmit={submit}>
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
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderCircleIcon className='size-5 text-muted-foreground animate-spin' />
          ) : (
            <ArrowRightIcon className='size-5 text-muted-foreground' />
          )}
        </Button>
      </div>
    </form>
  )
}
