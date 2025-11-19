'use client'

import { Pin } from '@/types/pin'

import { ErrorState } from '@/components/error-state'
import { UserPins } from '@/components/user-pins'

type ListPinsProps = {
  userPins: Pin[] | undefined
}

export function PinsContainer({ userPins }: ListPinsProps) {
  const ErrorMessage = <ErrorState error='Something went wrong' />

  return <>{userPins ? <UserPins userPins={userPins} /> : ErrorMessage}</>
}
