'use server'

import { revalidatePath } from 'next/cache'

export const revalidate = ({ path }: { path: string }) => {
  revalidatePath(path)
}
