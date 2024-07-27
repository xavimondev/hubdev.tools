'use client'

import { useAISearch } from '@/hooks/useAISearch'

import { Toolbar } from './toolbar'

export function AISearch() {
  const { play, getResourcesFromSearch, isUserSpeaking } = useAISearch()
  return <Toolbar play={play} search={getResourcesFromSearch} />
}
