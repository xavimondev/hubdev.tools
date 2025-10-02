import { NextRequest, NextResponse } from 'next/server'
import { createGroq } from '@ai-sdk/groq'
import { generateObject } from 'ai'
import * as z from 'zod'

const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY
})

export async function POST(request: NextRequest) {
  const data = await request.json()
  const input = data.input

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

    return NextResponse.json({
      category: result.object.category
    })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong while classifying the prompt' })
  }
}
