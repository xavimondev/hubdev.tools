'use client'

import { Pin } from '@/types/pin'

import { ErrorState } from '@/components/error-state'
import { TopPins } from '@/components/top-pins'
import { UserPins } from '@/components/user-pins'
import { PinsProvider } from '@/app/provider/pins-provider'

type ListPinsProps = {
  userPins: Pin[] | undefined
  topPins: Pin[] | undefined
  isPinsVisible: boolean
}

export function PinsContainer({ userPins, topPins, isPinsVisible }: ListPinsProps) {
  const ErrorMessage = <ErrorState error='Something went wrong' />

  const pinsData = userPins?.concat(topPins ?? []) ?? []

  return (
    <PinsProvider pins={pinsData}>
      {topPins ? <TopPins isPinsVisible={isPinsVisible} /> : ErrorMessage}
      {userPins ? <UserPins /> : ErrorMessage}
    </PinsProvider>
  )
}
