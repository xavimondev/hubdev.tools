import { createStore } from 'zustand'

import { Pin } from '@/types/pin'

export interface PinsProps {
  pins: Pin[]
}

export interface PinsState extends PinsProps {
  updatePinState: (id: string) => void
  removePinState: (id: string) => void
  addPins: (pins: Pin[]) => void
}

export type PinStore = ReturnType<typeof createPinsStore>

export const createPinsStore = (initProps: Partial<PinsProps>) => {
  const DEFAULT_PROPS: PinsProps = {
    pins: []
  }
  return createStore<PinsState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    updatePinState: (id) =>
      set((state) => ({
        pins: state.pins.map((pin) => (pin.id === id ? { ...pin, isTop: !pin.isTop } : pin))
      })),
    removePinState: (id) => set((state) => ({ pins: state.pins.filter((pin) => pin.id !== id) })),
    addPins: (pins) => set((state) => ({ pins: state.pins.concat(pins) }))
  }))
}
