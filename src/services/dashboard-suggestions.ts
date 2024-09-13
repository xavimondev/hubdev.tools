import { cookies } from 'next/headers'
import { getEmbeddings } from '@/actions/ai/embeddings'
import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

import { getPlaceholderImage } from '@/utils/generatePlaceholder'

export const getDashboardAISuggestions = async () => {
  const cookieStore = cookies()
  const history = cookieStore.get('history')
  if (!history) {
    return {
      data: []
    }
  }

  const historyValue = JSON.parse(history.value)

  const { text: query } = await generateText({
    model: openai('gpt-4o-mini'),
    prompt: `You are a helpful assistant that summarizes the user's search history.
  Based on the following search history:
  ${historyValue.join('\n')}

  Your tasks are:

  - Create a clear, 10-word summary that captures the most relevant and recurring search themes. Ensure the summary is optimized for semantic search.
  - Start directly with the summary; avoid phrases like "the requirement."
  - Exclude any symbols, special characters, or unnecessary punctuation from the summary.`
  })
  // console.log(query)
  const { data, error } = await getEmbeddings({ input: query, count: 6 })

  if (error || !data || data.length === 0) {
    return {
      error
    }
  }

  const promises = data.map(async (resource) => {
    const blurDataURL = await getPlaceholderImage(resource.image)
    return {
      ...resource,
      blurDataURL
    }
  })
  const formatedData = await Promise.all(promises)

  return {
    data: formatedData
  }
}
