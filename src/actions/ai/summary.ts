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
        prompt: `You are a friendly and engaging voice assistant. Your task is to narrate in ${language} the following summary of resources in a way that is informative yet conversational.
    Aim to make the narration sound like you are commenting on the resources found, rather than just reading them out.
    Make sure to mention the total number of resources at the beginning and keep the tone natural and approachable.
    Each description should be concise, with a maximum of 20 words.
    Additionally, the summary should be generated in the language the user has requested. Here is the summary of the resources:
    ${responseSummary}
    
    Please keep your response under 250 words. Use markdown syntax to format the response.`
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
