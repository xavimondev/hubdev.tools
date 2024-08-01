'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { LoaderCircleIcon, SearchIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type FormSearchProps = {
  prompt: string
  setPrompt: Dispatch<SetStateAction<string>>
  handleSubmit: (input: string) => Promise<void>
}

export function FormSearch({ handleSubmit, prompt, setPrompt }: FormSearchProps) {
  const [isLoading, setIsLoading] = useState(false)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const input = e.currentTarget.input.value
    await handleSubmit(input)
    setIsLoading(false)
  }

  return (
    <form className='w-full px-2 py-1' onSubmit={submit}>
      <div className='relative w-full'>
        <label className='sr-only' htmlFor='input'>
          Prompt
        </label>
        <Input
          type='input'
          id='input'
          name='input'
          placeholder='tell me about a stack to build a static site'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className='block w-full p-2 pr-10 text-sm border-none bg-transparent rounded-md focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-neutral-300 focus-within:placeholder:text-neutral-500'
        />
        <Button
          variant='ghost'
          size='icon'
          type='submit'
          className='absolute inset-y-0 right-0 flex items-center rounded-full'
          disabled={isLoading}
          aria-label='Submit'
        >
          {isLoading ? (
            <LoaderCircleIcon className='size-5 text-muted-foreground animate-spin' />
          ) : (
            <SearchIcon className='size-5 text-muted-foreground' />
          )}
        </Button>
      </div>
    </form>
  )
}
