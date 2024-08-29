import React, { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { generateAutoSuggestion } from '@/actions/ai/auto-suggestions'
import { queryClassify } from '@/actions/ai/query-classify'
import { AlertCircleIcon, LoaderCircleIcon } from 'lucide-react'
import { isMobile } from 'react-device-detect'
import { toast } from 'sonner'
import { useDebouncedCallback } from 'use-debounce'

import { ClassifyStatus } from '@/types/classify'

import { useOnClickOutside } from '@/hooks/useClickOutside'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type FormSearchProps = {
  handleSearch: (term: string, save?: boolean) => void
  setShowSuggestions: Dispatch<SetStateAction<boolean>>
  setStatusForm: Dispatch<SetStateAction<ClassifyStatus>>
  setPromptEvaluationResult: Dispatch<SetStateAction<string | undefined>>
  promptEvaluationResult: string | undefined
}

export function FormSearch({
  handleSearch,
  setShowSuggestions,
  setStatusForm,
  setPromptEvaluationResult,
  promptEvaluationResult
}: FormSearchProps) {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')?.toString() ?? ''
  const [showHint, setShowHint] = useState(false)
  const [content, setContent] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false)
  const [isClassifying, setIsClassifying] = useState(false)
  const contentEditableRef = useRef<HTMLDivElement>(null)
  const firstTimeAutoSuggestion = useRef(true)
  const isCancelled = useRef(false)
  const debounced = useDebouncedCallback(async (input: string) => {
    setIsFetchingSuggestions(true)

    if (input.length === 0) return

    const { suggestion, error } = await generateAutoSuggestion({ input })
    setIsFetchingSuggestions(false)

    if (error || !suggestion || isCancelled.current) return

    const portion = suggestion.slice(input.length)

    setSuggestion(portion)

    // Just show the hint once
    if (firstTimeAutoSuggestion.current) {
      setShowHint(true)
      firstTimeAutoSuggestion.current = false
    }
  }, 700)

  useOnClickOutside(contentEditableRef, () => {
    cancelSuggestionsGeneration()
  })

  const cancelSuggestionsGeneration = useCallback(() => {
    debounced.cancel()
    isCancelled.current = true
    if (contentEditableRef.current) {
      contentEditableRef.current.blur()
    }

    setSuggestion('')
    setShowHint(false)
    setShowSuggestions(false)
    setIsFetchingSuggestions(false)
  }, [])

  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    const input = event.currentTarget.textContent || ''
    setContent(input)

    isCancelled.current = false

    if (suggestion) {
      setSuggestion('')
    }

    if (showHint) {
      setShowHint(false)
    }

    if (promptEvaluationResult) {
      setPromptEvaluationResult(undefined)
    }

    debounced(input)
  }

  const moveCursorToEnd = (content: string) => {
    if (contentEditableRef.current) {
      contentEditableRef.current.textContent = content.replaceAll('\n', '')
      const range = document.createRange()
      const sel = window.getSelection()
      range.selectNodeContents(contentEditableRef.current)
      range.collapse(false)
      sel?.removeAllRanges()
      sel?.addRange(range)
      contentEditableRef.current.scrollLeft = contentEditableRef.current.scrollWidth
    }
  }

  const submit = useCallback(async (input: string) => {
    if (input.trim().length < 5) {
      toast.error('Please enter a valid search term')
      return
    }
    setIsClassifying(true)

    const { category, error } = await queryClassify({ input })

    setIsClassifying(false)

    if (error || !category) {
      toast.error(`Something went wrong while classifying the query: ${input}`)
      return
    }

    if (category === 'non-technical') {
      setStatusForm('error')
      setPromptEvaluationResult(`No resources for non-technical queries.`)
      return
    }

    setStatusForm('success')

    handleSearch(input, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Tab') {
        event.preventDefault()
        if (!suggestion) return

        setContent((prevContent) => prevContent + suggestion)
        moveCursorToEnd(`${content}${suggestion}`)
        setSuggestion('')
      } else if (event.key === 'Enter') {
        event.preventDefault()
        const inputText = event.currentTarget.innerText
        // console.log(inputText)
        submit(inputText)
        cancelSuggestionsGeneration()
      } else if (isMobile && event.code === 'Space') {
        // event.preventDefault()
        // console.log('space', content, suggestion)
        if (!suggestion) return
        setContent((prevContent) => prevContent + suggestion)
        moveCursorToEnd(`${content}${suggestion}`)
        setSuggestion('')
      }
    },
    [suggestion]
  )

  return (
    <div className='flex w-full relative px-2 py-1'>
      <div className='relative w-full sm:w-[calc(100%_-_62px)] overflow-hidden'>
        <div
          ref={contentEditableRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          className='relative flex h-10 w-full p-2 border-none bg-transparent border border-input 
        focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 items-center 
        [&[contenteditable=true]]:empty:before:text-neutral-400 
        [&[contenteditable=true]]:empty:before:content-[attr(data-placeholder)] 
        [&[contenteditable=true]]:empty:before:absolute 
        [&[contenteditable=true]]:empty:before:pointer-events-none 
        [&[contenteditable=true]]:empty:before:left-2 
        [&[contenteditable=true]]:empty:before:top-2
        [&[contenteditable=true]]:empty:before:block whitespace-nowrap overflow-hidden 
        focus-within:text-white 
        text-neutral-400'
          data-placeholder='typescript books'
          spellCheck='false'
          role='textbox'
        >
          {query}
        </div>
        {suggestion && (
          <div className='absolute top-0 left-0 p-2 pointer-events-none whitespace-nowrap overflow-hidden'>
            <span className='invisible'>{content}</span>
            <span className='opacity-50'>{suggestion}</span>
          </div>
        )}
      </div>
      <div className='absolute text-yellow-200 text-xs right-0 pr-3 top-[16px]'>
        <span className='text-xs'>{showHint && !isMobile ? 'press [TAB]' : ''}</span>
        {(isFetchingSuggestions || isClassifying) && (
          <LoaderCircleIcon className='animate-spin size-4 ml-1' />
        )}
        {promptEvaluationResult && !isMobile && (
          <ToolTipError promptEvaluationResult={promptEvaluationResult} />
        )}
      </div>
    </div>
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
              className='bg-transparent border-none hover:bg-transparent size-4'
            >
              <AlertCircleIcon className='text-red-400 size-4' />
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
