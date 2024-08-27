import React, { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { generateAutoSuggestion } from '@/actions/ai/auto-suggestions'
import { queryClassify } from '@/actions/ai/query-classify'
import { LoaderCircleIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useDebouncedCallback } from 'use-debounce'

import { useOnClickOutside } from '@/hooks/useClickOutside'

type FormSearchProps = {
  handleSearch: (term: string, save?: boolean) => void
  setShowSuggestions: Dispatch<SetStateAction<boolean>>
}

export function FormSearch({ handleSearch, setShowSuggestions }: FormSearchProps) {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')?.toString() ?? ''
  const [showHint, setShowHint] = useState(false)
  const [content, setContent] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false)
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

    toast.loading('Classifying query...')

    const { category, error } = await queryClassify({ input })
    toast.dismiss()

    if (error || !category) {
      toast.error(`Something went wrong while classifying the query: ${input}`)
      return
    }

    if (category === 'non-technical') {
      toast.error(
        `Sorry, but we don't have resources for non-technical queries yet. Please try a different one.`,
        {
          duration: 4000
        }
      )
      return
    }

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
      }
    },
    [suggestion]
  )

  return (
    <div className='w-full px-2 py-1 relative'>
      <div className='relative w-full overflow-hidden'>
        <div
          ref={contentEditableRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          className='relative flex h-10 w-full p-2 pr-10 border-none bg-transparent border border-input 
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
      <span className='absolute hidden sm:block text-yellow-200 text-xs top-[16px] right-4'>
        {showHint ? 'press [TAB]' : ''}
        {isFetchingSuggestions && <LoaderCircleIcon className='animate-spin size-4 ml-1' />}
      </span>
    </div>
  )
}
