'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

type RevalidationType = 'tag' | 'path'

export const revalidate = async ({ key, type }: { key: string; type: RevalidationType }) => {
  if (type === 'tag') {
    revalidateTag(key)
    return
  }

  revalidatePath(key)
}
