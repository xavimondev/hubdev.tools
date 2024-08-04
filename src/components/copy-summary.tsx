'use client'

import { useEffect, useState } from 'react'
import { copyToClipboard, removeMarkdownFormatting } from '@/utils'
import { CheckIcon, CopyIcon } from 'lucide-react'

import { useAIStore } from '@/store'
import { ButtonSummary } from '@/components/summary-tools-button'

export function CopySummaryButton() {
  const [clicked, setClicked] = useState(false)
  const summary = useAIStore((state) => state.summary)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    if (clicked) {
      timeoutId = setTimeout(() => {
        setClicked(false)
      }, 1500)
    }

    return () => clearTimeout(timeoutId)
  }, [clicked])

  return (
    <ButtonSummary
      styles={clicked && ''}
      fn={async () => {
        setClicked(true)
        const content = removeMarkdownFormatting({
          markdownText: summary
        })
        await copyToClipboard({ content })
      }}
    >
      {!clicked ? <CopyIcon className='size-5' /> : <CheckIcon className='size-5' />}
      <span className='sr-only'>Copy</span>
    </ButtonSummary>
  )
}
