import { create } from 'zustand'

import { Resource } from '@/types/resource'
import { Suggestion } from '@/types/suggestion'

type AIState = {
  resources: Resource[] | undefined
  addResources: (resources: Resource[]) => void
  isLoadingResources: boolean
  setIsLoadingResources: (isLoadingResources: boolean) => void
  resourcesFirstFetch: Resource[]
  setResourcesFirstFetch: (resources: Resource[]) => void
  setResources: (resources: Resource[] | undefined) => void
  hasResources: boolean
  setHasResources: (hasResources: boolean) => void
  suggestionsFromInternet: Suggestion[]
  setSuggestionsFromInternet: (suggestions: Suggestion[]) => void
  isLoadingSuggestions: boolean
  setIsLoadingSuggestions: (isLoadingSuggestions: boolean) => void
  summary: string
  setSummary: (summary: string) => void
  clearSummary: () => void
  isLoadingSummary: boolean
  setIsLoadingSummary: (isLoadingSummary: boolean) => void
  language: string
  setLanguage: (lang: string) => void
  prompt: string
  setPrompt: (prompt: string) => void
}

export const useAIStore = create<AIState>()((set) => ({
  resources: [],
  addResources: (resources) =>
    set((state) => {
      if (!state.resources) return { resources: [] }
      return { resources: [...state.resources, ...resources] }
    }),
  isLoadingResources: false,
  setIsLoadingResources: (isLoadingResources) => set({ isLoadingResources }),
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
  isLoadingSummary: false,
  setIsLoadingSummary: (isLoadingSummary) => set({ isLoadingSummary }),
  language: '',
  setLanguage: (lang) => set({ language: lang }),
  prompt: '',
  setPrompt: (prompt) => set({ prompt })
}))
