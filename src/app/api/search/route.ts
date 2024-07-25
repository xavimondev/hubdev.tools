import { NextResponse } from 'next/server'
import { createOpenAI, openai } from '@ai-sdk/openai'
import { generateObject, generateText } from 'ai'
import Groq from 'groq-sdk'
import { z } from 'zod'

// import { zfd } from 'zod-form-data'

import { Resource } from '@/types/resource'

const groqModel = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY
})

const groq = new Groq()

// const schema = zfd.formData({
//   input: z.union([zfd.text(), zfd.file()])
// })

const AISchema = z.object({
  requirement: z.object({
    summary: z.string(),
    limit: z.number()
  })
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const input = formData.get('input') as File
    //   const { data, success } = schema.safeParse(formData)
    //   console.log(`Data from client:`)
    //   console.log(data)
    //   if (!success) return new Response('Invalid request', { status: 400 })

    const requirement = await getTranscript(input)
    if (!requirement) return new Response('Invalid audio', { status: 400 })
    console.log(requirement)

    const { text: language } = await generateText({
      model: groqModel('llama3-8b-8192'),
      prompt: `Given the following script: "${requirement}"
      Tell me the language.
      Return only the language.`
    })
    // console.log(`Language: ${language}`)

    const ai = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: AISchema,
      prompt: `You are a helpful assistant that helps developers clarify requirements.

    Please analyze the following requirement:
    ${requirement}

    Your tasks are:

    1.Translate the developer's requirement to English, if it is in another language.
    2.Improve the clarity of the requirement to ensure it makes sense.
    3.Determine the number of resources the user is asking for. If not specified set the limit to 10.
    4.If the number of resources is greather than 15, set the limit to 10.
    5.The summary should be in 15 words or less.
    6.Don't start the summary with "the requirement", just go straight to the summary.
    7.You do not have access to up-to-date information, so you should not provide real-time data.
    8.You are not capable of performing actions other than responding to the user.`
    })
    const { summary, limit } = ai.object.requirement

    const request = await fetch(`${process.env.SUPABASE_URL}/functions/v1/query-embedding`, {
      method: 'POST',
      body: JSON.stringify({
        prompt: summary,
        limit
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    })
    const { result } = (await request.json()) as { result: Resource[] }

    const responseSummary = result.reduce((acc, resource) => {
      const { title, summary } = resource
      const res = acc + `- ${title}:\n${summary}\n\n`
      return res
    }, '')

    const { text: summaryFromAssistant } = await generateText({
      model: groqModel('llama3-8b-8192'),
      prompt: `You are a friendly and engaging voice assistant. Your task is to narrate in ${language} the following summary of resources in a way that is informative yet conversational. 
      Aim to make the narration sound like you are commenting on the resources found, rather than just reading them out. 
      Make sure to mention the total number of resources at the beginning and keep the tone natural and approachable. 
      Each description should be concise, with a maximum of 20 words.
      Additionally, the summary should be generated in the language the user has requested. Here is the summary of the resources:
      ${responseSummary}`
    })

    // console.log(`Summary from groq: ${summaryFromAssistant}`)

    //TODO: THINK TO STREAM THE AUDIO
    const response = await fetch(
      'https://api.elevenlabs.io/v1/text-to-speech/cgSgspJ2msm6clMCkdW9',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Xi-Api-Key': process.env.ELEVENLABS_API_KEY!
        },
        body: JSON.stringify({
          text: summaryFromAssistant,
          model_id: 'eleven_turbo_v2_5',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
            use_speaker_boost: true
          }
        })
      }
    )

    const data = await response.blob()

    return new Response(data, {
      headers: {
        'X-Transcript': encodeURIComponent(requirement),
        'X-Data': encodeURIComponent(JSON.stringify(result)),
        'Content-Type': 'audio/mpeg'
      }
    })
    // return NextResponse.json({ data: ['cool'] })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

const getTranscript = async (input: string | File) => {
  if (typeof input === 'string') return input

  try {
    const { text } = await groq.audio.transcriptions.create({
      file: input,
      model: 'whisper-large-v3'
    })

    return text.trim() || null
  } catch {
    return null
  }
}
