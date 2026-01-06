import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AlertCircleIcon, LoaderCircleIcon } from 'lucide-react'
import { isMobile } from 'react-device-detect'
import { toast } from 'sonner'

import { ClassifyStatus } from '@/types/classify'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type FormSearchProps = {
  handleSearch: (term: string, save?: boolean) => void
  setStatusForm: Dispatch<SetStateAction<ClassifyStatus>>
  setPromptEvaluationResult: Dispatch<SetStateAction<string | undefined>>
  promptEvaluationResult: string | undefined
}

export function FormSearch({
  handleSearch,
  setStatusForm,
  setPromptEvaluationResult,
  promptEvaluationResult
}: FormSearchProps) {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')?.toString() ?? ''
  const [isClassifying, setIsClassifying] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!inputRef.current) return

      const isInForm =
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'

      if (event.key.toLowerCase() === 's' && !isInForm) {
        event.preventDefault()
        inputRef.current.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const search = async (prompt: string) => {
    if (prompt.trim().length < 5) {
      toast.error('Please enter a valid search term')
      return
    }

    inputRef.current?.blur()

    setIsClassifying(true)

    const response = await fetch('/api/query-classify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: prompt
      })
    })
    const { category, error } = await response.json()

    setIsClassifying(false)

    if (error || !category) {
      toast.error(`Something went wrong while classifying the query: ${prompt}`)
      return
    }

    if (category === 'non-technical') {
      setStatusForm('error')
      setPromptEvaluationResult(`No resources for non-technical queries.`)
      return
    }

    handleSearch(prompt, true)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const input = event.currentTarget.prompt.value
    await search(input)
  }

  return (
    <form
      className='flex w-full items-center px-2 py-1'
      onSubmit={handleSubmit}
    >
      <div className='relative w-full'>
        <label
          className='sr-only'
          htmlFor='prompt'
        >
          Prompt
        </label>
        <Input
          key={query}
          ref={inputRef}
          className='block 
          h-10 
          w-full 
          p-2 
          border-none 
          focus-visible:outline-hidden 
          focus-visible:ring-0 
          focus-visible:ring-offset-0 
          whitespace-nowrap 
          overflow-hidden
          placeholder:text-neutral-500 
          focus-within:placeholder:text-neutral-300
          dark:placeholder:text-neutral-300 
          dark:focus-within:placeholder:text-neutral-500
        dark:focus-within:text-white 
        dark:text-neutral-400 
        focus-within:text-black 
        text-neutral-900 shadow-none'
          id='prompt'
          spellCheck='false'
          aria-label='Search'
          defaultValue={query}
          placeholder='Typescript books'
          autoComplete='off'
          onChange={() => {
            if (promptEvaluationResult) {
              setStatusForm('idle')
              setPromptEvaluationResult(undefined)
            }
          }}
        />
      </div>
      <div className='flex justify-end mx-1'>
        <div className='flex gap-1'>
          <div className='text-black dark:text-yellow-200'>
            {promptEvaluationResult && !isMobile && (
              <ToolTipError promptEvaluationResult={promptEvaluationResult} />
            )}
          </div>
          {isClassifying && <LoaderCircleIcon className='size-5 animate-spin' />}
          {!isMobile && !isClassifying && !promptEvaluationResult && (
            <kbd className='bg-light-600 dark:bg-neutral-700 text-light-900 dark:text-white rounded-md px-2 py-1 text-xs'>
              S
            </kbd>
          )}
        </div>
      </div>
    </form>
  )
}

function ToolTipError({ promptEvaluationResult }: { promptEvaluationResult: string }) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Button
              variant='outline'
              size='icon'
              className='bg-transparent border-none hover:bg-transparent size-5 mt-1.5'
            >
              <AlertCircleIcon className='text-red-500 dark:text-red-400 size-5' />
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side='right'
          className='border-light-600 dark:border-neutral-800/70'
        >
          <p>{promptEvaluationResult}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
