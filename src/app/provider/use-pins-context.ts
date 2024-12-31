import { useContext } from 'react'
import { useStore } from 'zustand'

import { PinsState } from '@/store'

import { PinsContext } from './pins-context'

export function usePinsContext<T>(selector: (state: PinsState) => T): T {
  const store = useContext(PinsContext)
  if (!store) throw new Error('Missing PinsContext.Provider in the tree')
  return useStore(store, selector)
}
