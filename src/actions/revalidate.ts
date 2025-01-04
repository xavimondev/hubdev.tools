'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidate = ({ key, type }: { key: string; type: 'tag' | 'path' }) => {
  if (type === 'tag') {
    revalidateTag(key)
    return
  }

  revalidatePath(key)
}
