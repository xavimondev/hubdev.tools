import { useRef, useState } from 'react'

export function usePlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioContext = useRef<AudioContext | null>(null)
  const source = useRef<AudioBufferSourceNode | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const speak = async ({ input, language }: { input: string; language: string }) => {
    stop()
    setIsDownloading(true)
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

    setIsDownloading(false)

    if (!response.ok) {
      throw new Error('Failed to fetch the audio')
    }

    setIsPlaying(true)

    const audioData = await response.arrayBuffer()
    audioContext.current = new AudioContext()
    source.current = audioContext.current.createBufferSource()

    source.current.buffer = await audioContext.current.decodeAudioData(audioData)
    source.current.connect(audioContext.current.destination)
    source.current.start()

    source.current.onended = () => {
      stop()
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
    stop,
    isDownloading
  }
}
