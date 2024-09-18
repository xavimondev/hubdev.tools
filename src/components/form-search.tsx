import React, { Dispatch, SetStateAction, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { queryClassify } from '@/actions/ai/query-classify'
import { AlertCircleIcon, ArrowRightIcon, LoaderCircleIcon } from 'lucide-react'
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

  const search = async (prompt: string) => {
    if (prompt.trim().length < 5) {
      toast.error('Please enter a valid search term')
      return
    }
    setIsClassifying(true)

    const { category, error } = await queryClassify({ input: prompt })

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
    <form className='flex w-full relative px-2 py-1' onSubmit={handleSubmit}>
      <div className='relative w-full sm:w-[calc(100%_-_58px)]'>
        <label className='sr-only' htmlFor='prompt'>
          Prompt
        </label>
        <Input
          key={searchParams.get('query')?.toString()}
          className='block 
          h-10 
          w-full 
          p-2 
          border-none 
          bg-transparent 
          border 
          border-input 
          focus-visible:outline-none 
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
        text-neutral-900'
          id='prompt'
          spellCheck='false'
          aria-label='Search'
          defaultValue={query}
          placeholder='Typescript books'
        />
      </div>
      <div className='absolute right-0 pr-3 top-[14px]'>
        <div className='flex gap-1'>
          <div className='text-black dark:text-yellow-200'>
            {promptEvaluationResult && !isMobile && (
              <ToolTipError promptEvaluationResult={promptEvaluationResult} />
            )}
          </div>
          <Button
            type='submit'
            size='icon'
            disabled={isClassifying || Boolean(promptEvaluationResult)}
            className='bg-transparent border-none hover:bg-transparent size-5 text-black dark:text-white disabled:opacity-50'
          >
            {isClassifying ? (
              <LoaderCircleIcon className='size-5 animate-spin' />
            ) : (
              <ArrowRightIcon className='size-5' />
            )}
          </Button>
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
              className='bg-transparent border-none hover:bg-transparent size-5'
            >
              <AlertCircleIcon className='text-red-500 dark:text-red-400 size-5' />
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent side='right' className='border-neutral-900'>
          <p>{promptEvaluationResult}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
