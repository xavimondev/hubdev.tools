'use server'

import { cookies } from 'next/headers'

export type Pin = {
  id: string
  title: string
  url: string
  summary: string
}

export const addPin = ({ pin }: { pin: Pin }): { success: boolean; msg: string } => {
  const cookieStore = cookies()
  const listOfPines = cookieStore.get('pines')
  if (!listOfPines) {
    cookieStore.set('pines', JSON.stringify([pin]), { secure: true })
    return {
      success: true,
      msg: 'Pin added successfully'
    }
  }

  // max length of pines is 5
  const data = JSON.parse(listOfPines.value) as Pin[]
  if (data.length === 5) {
    return {
      success: false,
      msg: 'You have reached your pin limit of 5. Please remove a pin before adding a new one.'
    }
  }

  const newData = [pin, ...data]
  cookies().set('pines', JSON.stringify(newData), { secure: true })

  return {
    success: true,
    msg: 'Pin added successfully'
  }
}

export const getPines = (): { data: Pin[] } => {
  const cookieStore = cookies()
  const listOfPines = cookieStore.get('pines')
  if (!listOfPines || listOfPines.value.length === 0) {
    return { data: [] }
  }

  const data = JSON.parse(listOfPines.value) as Pin[]

  return { data }
}

export const removePin = ({
  resource_id
}: {
  resource_id: string
}): { success: boolean; msg?: string } => {
  const cookieStore = cookies()
  const listOfPines = cookieStore.get('pines')
  if (!listOfPines) {
    return {
      success: true
    }
  }

  const data = JSON.parse(listOfPines.value) as Pin[]
  const newData = data.filter((item) => item.id !== resource_id)

  cookies().set('pines', JSON.stringify(newData), { secure: true })

  return {
    success: true,
    msg: 'Pin removed successfully'
  }
}
