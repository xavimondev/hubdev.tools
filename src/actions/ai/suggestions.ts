import { z } from 'zod'

export async function getSuggestions({ question }: { question: string }) {
  const SERPER_API_KEY = process.env.SERPER_API_KEY

  if (process.env.NODE_ENV === 'development' && !SERPER_API_KEY) {
    return {
      error: 'Missing SERPER_API_KEY - make sure to add it to your .env file.'
    }
  }

  const response = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    // @ts-ignore
    headers: {
      'X-API-KEY': SERPER_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      q: question,
      num: 8
    })
  })

  const rawJSON = await response.json()

  const SerperJSONSchema = z.object({
    organic: z.array(z.object({ title: z.string(), link: z.string(), snippet: z.string() }))
  })

  const data = SerperJSONSchema.parse(rawJSON)

  const results = data.organic.map((result) => ({
    name: result.title,
    url: result.link,
    snippet: result.snippet
  }))

  return { data: results }
}
