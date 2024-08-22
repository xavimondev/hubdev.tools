import { createOpenAI, openai } from '@ai-sdk/openai'
import { generateObject, generateText } from 'ai'
import { z } from 'zod'

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: 'YOUR_API_KEY'
})

export async function generateSlug({ url }: { url: string }) {
  const { text: slug } = await generateText({
    model: groq('llama-3.1-8b-instant'),
    prompt: `Generate a one word slug for this url ${url}. 
    Requirements:
    - The slug must be a single word.
    - The slug must be lowercase.
    - The slug must not contain any special characters.
    - The slug must not contain any numbers.
    - The slug must not contain any symbols or punctuation.
    - The slug must not contain any spaces.
    - Don't add any other text or symbols like commas, etc.
    - Use a word from the URL as the slug.
    
    Return only the slug.`
  })

  return slug
}

export async function generateSummaryAndCategory({
  webDescription,
  htmlContent,
  url
}: {
  webDescription: string
  htmlContent: string
  url: string
}) {
  // Fetch categories from the database...
  const categories = ['ai', 'ui', 'books']

  const { object } = await generateObject({
    model: openai('gpt-4o-mini'),
    schema: z.object({
      resource: z.object({
        category: z.string(),
        summary: z.string()
      })
    }),
    prompt: `You are a helpful assistant with expertise in summarizing content for semantic search purposes.

    Given the following resource and its content:

    Resource URL: ${url}
    Content: ${webDescription} - ${htmlContent}

    Please summarize the content in a concise manner, ensuring the summary is useful for semantic search. Keep the summary under 300 words.
    Don't mention the name of the resource in the summary.

    Additionally, categorize the resource based on the following categories: ${categories.join(',')}.

    Return both the summary and the appropriate category.`
  })

  const { resource } = object
  return resource
}
