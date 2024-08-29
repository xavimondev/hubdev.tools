import { createOpenAI } from '@ai-sdk/openai'
import { generateObject, generateText } from 'ai'
import { z } from 'zod'

import { Resource } from '@/types/resource'

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY
})

export async function getSummary({ data, input }: { data: Resource[]; input: string }) {
  try {
    const result = await generateObject({
      model: groq('llama-3.1-8b-instant'),
      schema: z.object({
        language: z.enum(['English', 'Spanish'])
      }),
      prompt: `The following text ${input} is writen in English or Spanish?. If you are not able to recognize, return English by default.`
    })

    const language = result.object.language

    const responseSummary = data.reduce((acc, resource) => {
      const { title, summary } = resource
      const res = acc + `- ${title}:\n${summary}\n\n`
      return res
    }, '')

    const { text: summary } = await generateText({
      model: groq('llama-3.1-8b-instant'),
      prompt: `You are a friendly assistant. Your task is to narrate in ${language} 
    the following summary of resources in a way that is informative.

    Additional instructions:
    - Mention the total number of resources. There are ${data.length - 1} resources.
    - Keep the summary of each resource under 40 words.
    - The summary should be generated in the language the user has requested. 
    - Use Markdown syntax with the following structure:
        1.Use bullet points for listing resources. The format should be: [Title]: [Summary]
        2.Ensure there are spaces between different sections and list items.
        3.Use headings for each section.
        4.Use bold for the title of each resource. 
    - Please, focus only the summary of the resources, don't add any unknown resources.
    Here is the summary of the resources:
    ${responseSummary}`
    })

    return { summary, language }
  } catch (error) {
    return { error: 'Something went wrong while generating the summary' }
  }
}
