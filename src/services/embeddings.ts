import { headers } from 'next/headers'
import { uptash } from '@/ratelimit'

import { Resource } from '@/types/resource'

import { createSupabaseServerClient } from '@/utils/supabase-server'

const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN ? uptash : false

export async function getEmbeddings({ input, count }: { input: string; count?: number }) {
  const supabase = await createSupabaseServerClient()

  try {
    if (process.env.NODE_ENV === 'production') {
      if (ratelimit) {
        const ip = (await headers()).get('x-forwarded-for') ?? 'local'

        const { success } = await ratelimit.limit(ip)
        if (!success) {
          return {
            error: 'You have reached your request limit for the day.'
          }
        }
      }
    }

    const { data, error } = await supabase.functions.invoke('query-embedding', {
      body: {
        prompt: input,
        limit: count ?? 11,
        threshold: 0.7
      }
    })

    if (error) {
      throw new Error(error.message)
    }

    const result = data.result as Resource[]
    return {
      data: result
    }
  } catch (error) {
    return {
      error: 'An error occurred while searching for resources.'
    }
  }
}
