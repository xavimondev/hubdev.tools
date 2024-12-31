import { createContext } from 'react'

import { PinStore } from '@/store'

export const PinsContext = createContext<PinStore | null>(null)
