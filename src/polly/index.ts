import {
  LanguageCode,
  OutputFormat,
  PollyClient,
  SynthesizeSpeechCommand,
  VoiceId,
  type SynthesizeSpeechCommandInput
} from '@aws-sdk/client-polly'

export const pollyClient = new PollyClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
  }
})

const params: SynthesizeSpeechCommandInput = {
  OutputFormat: OutputFormat.MP3,
  Text: undefined,
  VoiceId: undefined,
  TextType: 'text',
  LanguageCode: undefined,
  Engine: 'neural'
}

export const tts = async ({
  text,
  language,
  voice
}: {
  text: string
  language: LanguageCode
  voice: VoiceId
}) => {
  return await pollyClient.send(
    new SynthesizeSpeechCommand({ ...params, Text: text, LanguageCode: language, VoiceId: voice })
  )
}
