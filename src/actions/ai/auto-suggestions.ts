'use server'

import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY
})

export async function generateAutoSuggestion({ input }: { input: string }) {
  try {
    // const history = await getHistory()

    // const promptHistory =
    //   history.length > 0 ? `User's Search History:\n\n${history.join('\n')}\n\n` : ''

    const { text: suggestion } = await generateText({
      model: groq('llama-3.1-8b-instant'),
      prompt: `You are a smart and efficient auto-completion assistant designed to help users quickly complete their tech-related queries. 
      Your job is to complete the user's input only if it meets the following conditions:

      Begin the suggestion with the user's partial input exactly as provided, including the exact spelling, casing, and spacing.
      The input is related to academic or technological topics, such as programming, software development, web design, computer science, or other tech-related subjects.
      The input length is less than 20 characters. If the input is 20 characters or longer, do not generate any suggestion and return an empty response.
      
      When generating a suggestion:
      2. Add between 2 to 4 additional words that naturally complete the user's query. These words should be relevant and help the user find what they are looking for.
      3. If the user's input is in a language other than English, generate the suggestion in that language.
      4. If there are any typos, misspellings, or extra spaces in the user's input, do not correct them—generate the suggestion as is.
      
      User's Partial Input: "${input}"

      Return only the suggestion, don't include any other text, double quotes, break lines, or symbols.`
    })

    return { suggestion }
  } catch (error) {
    return { error: 'Something went wrong while generating the summary' }
  }
}
