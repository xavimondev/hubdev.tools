import { cookies } from 'next/headers'
import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'

const AISchema = z.object({
  searchSuggestions: z.array(z.string())
})

export async function getHistory(): Promise<string[]> {
  const cookieStore = await cookies()
  const history = cookieStore.get('history')
  if (!history) {
    return []
  }

  const data = JSON.parse(history.value)
  return data
}

export async function generateSearchSuggestionsAI() {
  const cookieStore = await cookies()
  const history = cookieStore.get('history')
  if (!history) {
    return []
  }

  const data = JSON.parse(history.value)

  const ai = await generateObject({
    model: openai('gpt-4o-mini'),
    schema: AISchema,
    prompt: `You are an advanced AI designed to provide relevant and useful alternatives to user queries. Given the user's search history below, generate five related search suggestions that could further assist the user in finding valuable information.
    User's Search History: 
    ${data.join('\n')}

    Every suggestion should have maximum 30 characters.
    Generate 4 related search suggestions.`
  })

  const { searchSuggestions } = ai.object
  return searchSuggestions
}
