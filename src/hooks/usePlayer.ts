import { useRef, useState } from 'react'

export function usePlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioContext = useRef<AudioContext | null>(null)
  const source = useRef<AudioBufferSourceNode | null>(null)

  const speak = async ({
    input,
    language,
    callback
  }: {
    input: string
    language: string
    callback: () => void
  }) => {
    stop()
    setIsPlaying(true)

    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input,
        language
      })
    })

    if (!response.ok) {
      throw new Error('Failed to fetch the audio')
    }

    const audioData = await response.arrayBuffer()
    audioContext.current = new AudioContext()
    source.current = audioContext.current.createBufferSource()

    source.current.buffer = await audioContext.current.decodeAudioData(audioData)
    source.current.connect(audioContext.current.destination)
    source.current.start()

    source.current.onended = () => {
      stop()
      callback()
    }
  }

  const stop = () => {
    audioContext.current?.close()
    audioContext.current = null
    setIsPlaying(false)
  }

  return {
    isPlaying,
    speak,
    stop
  }
}
