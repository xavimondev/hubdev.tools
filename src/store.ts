import { create } from 'zustand'

import { Resource } from '@/types/resource'

type AIState = {
  resources: Resource[] | undefined
  addResources: (resources: Resource[]) => void
  resourcesFirstFetch: Resource[]
  setResourcesFirstFetch: (resources: Resource[]) => void
  setResources: (resources: Resource[] | undefined) => void
  hasResources: boolean
  setHasResources: (hasResources: boolean) => void
}

export const useAIStore = create<AIState>()((set) => ({
  resources: [],
  addResources: (resources) =>
    set((state) => {
      if (!state.resources) return { resources: [] }
      return { resources: [...state.resources, ...resources] }
    }),
  resourcesFirstFetch: [],
  setResourcesFirstFetch: (resources) => set({ resourcesFirstFetch: resources }),
  setResources: (resources) => set({ resources }),
  hasResources: false,
  setHasResources: (hasResources) => set({ hasResources })
}))
