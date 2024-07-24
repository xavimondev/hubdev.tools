'use server'

import { getData } from '@/services/list'

export const listResources = async ({ from, to }: { from: number; to: number }) => {
  const data = await getData({ from, to })
  return data
}
