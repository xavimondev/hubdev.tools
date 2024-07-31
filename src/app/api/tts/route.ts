import { tts } from '@/polly'
import { LanguageCode, VoiceId } from '@aws-sdk/client-polly'

const TTS: Record<string, { code: LanguageCode; voice: VoiceId }> = {
  Spanish: {
    code: LanguageCode.es_ES,
    voice: VoiceId.Mia
  },
  English: {
    code: LanguageCode.en_US,
    voice: VoiceId.Ruth
  }
}

export async function POST(request: Request) {
  const { input, language } = (await request.json()) as { input: string; language: string }
  try {
    const { code, voice } = TTS[language]

    const response = await tts({ text: input, language: code, voice })
    const { AudioStream, $metadata } = response
    const audioBuffer = await AudioStream?.transformToByteArray()

    if ($metadata.httpStatusCode !== 200) {
      return new Response('Voice synthesis failed', { status: 500 })
    }

    return new Response(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg'
      }
    })
  } catch (error) {
    console.error(error)
    return new Response('Voice synthesis failed', { status: 500 })
  }
}
