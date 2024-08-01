'use server'

import { createOpenAI } from '@ai-sdk/openai'
import { generateText, streamText } from 'ai'
import { createStreamableValue } from 'ai/rsc'

import { Resource } from '@/types/resource'

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY
})

export async function summarize({ data, input }: { data: Resource[]; input: string }) {
  const stream = createStreamableValue('')

  try {
    const { text: language } = await generateText({
      model: groq('llama-3.1-8b-instant'),
      prompt: `The following text ${input} is writen in English or Spanish?. Please return only Spanish or English.
    If you are not able to recognize, return English by default. Don't add any other text or end the response with a period.`
    })

    const responseSummary = data.reduce((acc, resource) => {
      const { title, summary } = resource
      const res = acc + `- ${title}:\n${summary}\n\n`
      return res
    }, '')

    ;(async () => {
      const { textStream } = await streamText({
        model: groq('llama-3.1-8b-instant'),
        prompt: `You are a friendly and engaging voice assistant. Begin with a warm greeting. Your task is to narrate in ${language} 
    the following summary of resources in a way that is informative yet conversational.
    Aim to make the narration sound like you are commenting on the resources found, rather than just reading them out.

    Additional instructions:
    - Mention the total number of resources.
    - Highlight the top three resources with concise descriptions, each with a maximum of 20 words.
    - Briefly mention the remaining resources without detailed descriptions.
    - The summary should be generated in the language the user has requested. 
    - Keep the tone natural and approachable.
    - Use Markdown syntax with the following structure:
        1.Use bullet points for listing resources.
        2.Ensure there are spaces between different sections and list items.
        3.Use headings for each section.
    - Focus only the summary of the resources, don't add any other text.
    Here is the summary of the resources:
    ${responseSummary}
    
    Please keep your response under 250 words.`
      })

      for await (const delta of textStream) {
        stream.update(delta)
      }
      stream.done()
    })()
    return { output: stream.value, language }
  } catch (error) {
    return { error: 'Something went wrong while generating the summary' }
  }
}
