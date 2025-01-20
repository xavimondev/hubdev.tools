'use client'

import { Pin } from '@/types/pin'

import { ErrorState } from '@/components/error-state'
import { TopPins } from '@/components/top-pins'
import { UserPins } from '@/components/user-pins'

type ListPinsProps = {
  userPins: Pin[] | undefined
  topPins: Pin[] | undefined
  isPinsVisible: boolean
}

export function PinsContainer({ userPins, topPins, isPinsVisible }: ListPinsProps) {
  const ErrorMessage = <ErrorState error='Something went wrong' />

  return (
    <>
      {topPins ? <TopPins topPins={topPins} isPinsVisible={isPinsVisible} /> : ErrorMessage}
      {userPins ? <UserPins userPins={userPins} /> : ErrorMessage}
    </>
  )
}
