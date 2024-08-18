'use client'

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { useSearchParams } from 'next/navigation'
import { generateAutoSuggestion } from '@/actions/ai/auto-suggestions'
import { LoaderCircleIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useDebouncedCallback } from 'use-debounce'
import { useEditable } from 'use-editable'

import { useOnClickOutside } from '@/hooks/useClickOutside'

function deletePortion({ input, short }: { input: string; short: string }) {
  if (input.endsWith(short)) {
    return input.slice(0, input.length - short.length)
  }

  return input
}

function deleteExtraTrailingSpace({ text }: { text: string }) {
  return text.endsWith('  ') ? text.slice(0, -1) : text
}

type FormSearchProps = {
  handleSearch: (term: string, save?: boolean) => void
  setShowSuggestions: Dispatch<SetStateAction<boolean>>
}

export function AIFormSearch({ handleSearch, setShowSuggestions }: FormSearchProps) {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')?.toString()
  const [inlineSuggestion, setInlineSuggestion] = useState<string>()
  const [inputText, setInputText] = useState<string | undefined>(query)
  const [showHint, setShowHint] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const firstTimeAutoSuggestion = useRef(true)
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false)
  const debounced = useDebouncedCallback(async (input: string) => {
    if (input.length === 0) return
    // console.log('input', input)
    const { suggestion, error } = await generateAutoSuggestion({ input })
    // isWindowsClosed.current ||
    if (error || !suggestion) return

    const portion = suggestion.slice(input.length)
    // console.log({ portion, suggestion, input })

    if (editorRef.current) {
      // TODO: improve this
      editorRef.current.scrollLeft = 300
    }

    setInlineSuggestion(portion)
    setIsFetchingSuggestions(false)

    // Just show the hint once
    if (firstTimeAutoSuggestion.current) {
      setShowHint(true)
      firstTimeAutoSuggestion.current = false
    }
  }, 500)

  useOnClickOutside(editorRef, () => {
    cancelSuggestionsGeneration()
  })

  useEditable(editorRef, (text) => {
    const inputUser = text.replaceAll('\n', '')
    if (!inputUser) {
      setInputText(undefined)
      return
    }

    if (showHint) {
      setShowHint(false)
    }

    const content = inlineSuggestion
      ? deletePortion({ input: inputUser, short: inlineSuggestion })
      : inputUser

    if (inlineSuggestion) {
      setInlineSuggestion('')
    }

    // console.log({ text, inlineSuggestion, content })
    setInputText(deleteExtraTrailingSpace({ text: content }))
    if (!isFetchingSuggestions) {
      setIsFetchingSuggestions(true)
    }

    debounced(deleteExtraTrailingSpace({ text: content }))
  })

  useLayoutEffect(() => {
    if (editorRef.current) {
      // prevents the editor from jump to add new line
      editorRef.current.contentEditable = 'true'
    }
  })

  useEffect(() => {
    if (query) {
      setInputText(query)
    }
  }, [query])

  const cancelSuggestionsGeneration = () => {
    setInlineSuggestion('')
    setShowHint(false)
    setShowSuggestions(false)
    setIsFetchingSuggestions(false)
    debounced.cancel()
  }

  const submit = useCallback((input: string) => {
    if (input.trim().length < 5) {
      toast.error('Please enter a valid search term')
      return
    }
    handleSearch(input, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        const inputText = e.currentTarget.innerText.replaceAll('\n', '')
        submit(inputText || '')
        cancelSuggestionsGeneration()
      } else if (e.key === 'Tab') {
        e.preventDefault()
        if (!inlineSuggestion || inlineSuggestion.trim().length === 0) return

        setInputText((prev) => prev + inlineSuggestion)
        // Adding cursor position after adding inline suggestion
        setTimeout(() => {
          const range = document.createRange()
          const selection = window.getSelection()
          if (editorRef.current) {
            range.setStart(editorRef.current.childNodes[0], editorRef.current.childNodes.length)
            range.collapse(true)
            selection?.removeAllRanges()
            selection?.addRange(range)
            // scroll to the end of the input
            editorRef.current.scrollLeft = editorRef.current.scrollWidth
          }
        }, 100)
        setInlineSuggestion('')
      }
    },
    [inlineSuggestion]
  )

  return (
    <div className='w-full px-2 py-1 relative'>
      <div
        ref={editorRef}
        key={query}
        suppressContentEditableWarning={true}
        className='relative flex h-10 w-full p-2 pr-10 border-none bg-transparent border border-input px-3 py-2 text-sm 
        focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 items-center 
        [&[contenteditable=true]]:empty:before:text-neutral-400 
        [&[contenteditable=true]]:empty:before:content-[attr(data-placeholder)] 
        [&[contenteditable=true]]:empty:before:absolute 
        [&[contenteditable=true]]:empty:before:pointer-events-none 
        [&[contenteditable=true]]:empty:before:left-3 
        [&[contenteditable=true]]:empty:before:top-2.5
        [&[contenteditable=true]]:empty:before:block !whitespace-nowrap overflow-hidden'
        contentEditable='true'
        role='textbox'
        tabIndex={0}
        aria-multiline='false'
        spellCheck='false'
        aria-label='javascript challenges'
        data-placeholder='javascript challenges'
        onKeyDown={handleKeyDown}
      >
        {inputText && (
          <span>
            {inputText}
            {inlineSuggestion && <span className='text-neutral-500'>{inlineSuggestion}</span>}
          </span>
        )}
      </div>
      <span className='absolute hidden sm:block text-yellow-200 text-xs top-[16px] right-4'>
        {showHint ? 'press [TAB]' : ''}
        {isFetchingSuggestions && <LoaderCircleIcon className='animate-spin size-5 ml-1' />}
      </span>
    </div>
  )
}
