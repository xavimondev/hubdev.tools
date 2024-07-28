import { create } from 'zustand'

import { Resource } from '@/types/resource'

type AIState = {
  resources: Resource[]
  addResources: (resources: Resource[]) => void
  resourcesFirstFetch: Resource[]
  setResourcesFirstFetch: (resources: Resource[]) => void
  setResources: (resources: Resource[]) => void
  hasResources: boolean
  setHasResources: (hasResources: boolean) => void
}

export const useAIStore = create<AIState>()((set) => ({
  resources: [],
  addResources: (resources) => set((state) => ({ resources: [...state.resources, ...resources] })),
  resourcesFirstFetch: [],
  setResourcesFirstFetch: (resources) => set({ resourcesFirstFetch: resources }),
  setResources: (resources) => set({ resources }),
  hasResources: false,
  setHasResources: (hasResources) => set({ hasResources })
}))
