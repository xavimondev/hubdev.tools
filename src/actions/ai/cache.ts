'use server'

import { redis } from '@/ratelimit/redis'

import { Resource } from '@/types/resource'
import { Suggestion } from '@/types/suggestion'

type CacheQuery = {
  input: string
  data: {
    resources: Resource[]
    suggestions: Suggestion[]
    summary: string
  }
  language: string
}

export const getCache = async ({ input }: { input: string }) => {
  const queryCached = (await redis.get(`q:${input}`)) as CacheQuery | null
  if (queryCached != null) {
    return queryCached
  }
}

export const saveCache = async ({ cache }: { cache: CacheQuery }) => {
  const { input, data, language } = cache
  await redis.set(`q:${input}`, JSON.stringify({ data, language }), {
    ex: 60 * 60 * 12 // 12 hours
  })
}
