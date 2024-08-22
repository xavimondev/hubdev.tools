'use server'

import { createOpenAI } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY
})

export async function queryClassify({ input }: { input: string }) {
  try {
    const result = await generateObject({
      model: groq('llama-3.1-8b-instant'),
      schema: z.object({
        category: z.enum(['technical', 'non-technical'])
      }),
      prompt: `You are a classification assistant designed to categorize user input based on its relevance to technological subjects. 
      Your job is to analyze the user's input and classify it.
      
      User's Input: ${input}`
    })

    return {
      category: result.object.category
    }
  } catch (error) {
    return { error: 'Something went wrong while classifying the prompt' }
  }
}
