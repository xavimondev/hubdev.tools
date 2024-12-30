import { useRef } from 'react'

import { createPinsStore, PinsProps, PinStore } from '@/store'

import { PinsContext } from './pins-context'

type BearProviderProps = React.PropsWithChildren<PinsProps>

export function PinsProvider({ children, ...props }: BearProviderProps) {
  const storeRef = useRef<PinStore>()
  if (!storeRef.current) {
    storeRef.current = createPinsStore(props)
  }
  return <PinsContext.Provider value={storeRef.current}>{children}</PinsContext.Provider>
}
