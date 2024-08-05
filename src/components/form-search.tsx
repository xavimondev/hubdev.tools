'use client'

import { useSearchParams } from 'next/navigation'
import { SearchIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type FormSearchProps = {
  handleSearch: (term: string) => void
}

export function FormSearch({ handleSearch }: FormSearchProps) {
  const searchParams = useSearchParams()

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = e.currentTarget.input.value
    handleSearch(input)
  }

  return (
    <form className='w-full px-2 py-1' onSubmit={submit}>
      <div className='relative w-full'>
        <label className='sr-only' htmlFor='input'>
          Prompt
        </label>
        <Input
          key={searchParams.get('query')?.toString()}
          type='input'
          id='input'
          name='input'
          placeholder='tell me about a stack to build a static site'
          defaultValue={searchParams.get('query')?.toString()}
          className='block w-full p-2 pr-10 text-sm border-none bg-transparent rounded-md focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-neutral-300 focus-within:placeholder:text-neutral-500'
        />
        <Button
          variant='ghost'
          size='icon'
          type='submit'
          className='absolute inset-y-0 right-0 flex items-center rounded-full'
          aria-label='Submit'
        >
          <SearchIcon className='size-5 text-muted-foreground' />
        </Button>
      </div>
    </form>
  )
}
