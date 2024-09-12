'use server'

import { headers } from 'next/headers'
import { uptash } from '@/ratelimit'
import { openai } from '@ai-sdk/openai'
import { embed } from 'ai'

import { Resource } from '@/types/resource'

import { supabase } from '@/services/client'

const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN ? uptash : false

export async function getEmbeddings({ input, count }: { input: string; count?: number }) {
  try {
    if (process.env.NODE_ENV === 'production') {
      if (ratelimit) {
        const ip = headers().get('x-forwarded-for') ?? 'local'

        const { success } = await ratelimit.limit(ip)
        if (!success) {
          return { error: 'You have reached your request limit for the day.' }
        }
      }
    }

    const { embedding } = await embed({
      model: openai.embedding('text-embedding-3-small'),
      value: input
    })

    const request = await supabase.rpc('query_embeddings', {
      // @ts-ignore
      embed: embedding,
      match_threshold: 0.4,
      match_count: count ?? 11
    })

    const result = request.data as Resource[]
    return { data: result }
  } catch (error) {
    return { error: 'An error occurred while searching for resources.' }
  }
}
