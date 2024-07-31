import { create } from 'zustand'

import { Resource } from '@/types/resource'
import { Suggestion } from '@/types/suggestion'

type AIState = {
  resources: Resource[]
  addResources: (resources: Resource[]) => void
  resourcesFirstFetch: Resource[]
  setResourcesFirstFetch: (resources: Resource[]) => void
  setResources: (resources: Resource[]) => void
  hasResources: boolean
  setHasResources: (hasResources: boolean) => void
  suggestionsFromInternet: Suggestion[]
  setSuggestionsFromInternet: (suggestions: Suggestion[]) => void
  isLoadingSuggestions: boolean
  setIsLoadingSuggestions: (isLoadingSuggestions: boolean) => void
  summary: string
  setSummary: (summary: string) => void
  clearSummary: () => void
  language: string
  setLanguage: (lang: string) => void
}

export const useAIStore = create<AIState>()((set) => ({
  resources: [],
  addResources: (resources) => set((state) => ({ resources: [...state.resources, ...resources] })),
  resourcesFirstFetch: [],
  setResourcesFirstFetch: (resources) => set({ resourcesFirstFetch: resources }),
  setResources: (resources) => set({ resources }),
  hasResources: false,
  setHasResources: (hasResources) => set({ hasResources }),
  suggestionsFromInternet: [],
  setSuggestionsFromInternet: (suggestions) => set({ suggestionsFromInternet: suggestions }),
  isLoadingSuggestions: false,
  setIsLoadingSuggestions: (isLoadingSuggestions) => set({ isLoadingSuggestions }),
  summary: '',
  setSummary: (chunk) => set((state) => ({ summary: state.summary + chunk })),
  clearSummary: () => set({ summary: '' }),
  language: '',
  setLanguage: (lang) => set({ language: lang })
}))
