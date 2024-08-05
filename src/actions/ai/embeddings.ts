'use server'

import { headers } from 'next/headers'
import { uptash } from '@/ratelimit'
import { openai } from '@ai-sdk/openai'
import { embed, generateObject } from 'ai'
import { z } from 'zod'

import { Resource } from '@/types/resource'

import { supabase } from '@/services/client'

const AISchema = z.object({
  requirement: z.object({
    summary: z.string(),
    limit: z.number()
  })
})

const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN ? uptash : false

export async function getEmbeddings({ input }: { input: string }) {
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

    const ai = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: AISchema,
      prompt: `You are a helpful assistant that helps developers clarify requirements.

    Please analyze the following requirement:
    ${input}

    Your tasks are:

    1.Translate the developer's requirement to English, if it is in another language.
    2.Improve the clarity of the requirement to ensure it makes sense.
    3.Determine the number of resources or options the user is asking for. If not specified set the limit to 12.
    4.If the number of resources is greather than 12, set the limit to 12.
    5.The summary should be in 15 words or less.
    6.Don't start the summary with "the requirement", just go straight to the summary.
    7.You do not have access to up-to-date information, so you should not provide real-time data.
    8.You are not capable of performing actions other than responding to the user.`
    })

    const { summary, limit } = ai.object.requirement
    // console.log(ai.object.requirement)
    const { embedding } = await embed({
      model: openai.embedding('text-embedding-3-small'),
      value: summary
    })

    const request = await supabase.rpc('query_embeddings', {
      // @ts-ignore
      embed: embedding,
      match_threshold: 0.46,
      match_count: limit
    })

    const result = request.data as Resource[]
    return { data: result }
  } catch (error) {
    return { error: 'An error occurred while searching for resources.' }
  }
}
