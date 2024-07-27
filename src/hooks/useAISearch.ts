import { useMicVAD, utils } from '@ricky0123/vad-react'
import { toast } from 'sonner'

export function useAISearch() {
  const vad = useMicVAD({
    startOnLoad: false,
    onSpeechEnd: async (audio) => {
      const wav = utils.encodeWAV(audio)
      const blob = new Blob([wav], { type: 'audio/wav' })
      const formData = new FormData()
      formData.append('input', blob, 'audio.wav')
      await getResourcesFromSearch({ formData })
      // TODO: validate mozilla
      // player.play(response.body, () => {
      //   const isFirefox = navigator.userAgent.includes('Firefox')
      //   if (isFirefox) vad.start()
      // })

      // const isFirefox = navigator.userAgent.includes('Firefox')
      // if (isFirefox) vad.pause()
    },
    workletURL: '/vad.worklet.bundle.min.js',
    modelURL: '/silero_vad.onnx',
    positiveSpeechThreshold: 0.6,
    minSpeechFrames: 4,
    ortConfig(ort) {
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

      ort.env.wasm = {
        wasmPaths: {
          'ort-wasm-simd-threaded.wasm': '/ort-wasm-simd-threaded.wasm',
          'ort-wasm-simd.wasm': '/ort-wasm-simd.wasm',
          'ort-wasm.wasm': '/ort-wasm.wasm',
          'ort-wasm-threaded.wasm': '/ort-wasm-threaded.wasm'
        },
        numThreads: isSafari ? 1 : 4
      }
    }
  })

  const getResourcesFromSearch = async ({ formData }: { formData: FormData }) => {
    const response = await fetch('/api/search', {
      method: 'POST',
      body: formData
    })
    const data = await response.blob()

    const transcript = decodeURIComponent(response.headers.get('X-Transcript') || '')
    const results = decodeURIComponent(response.headers.get('X-Data') || '')

    if (!response.ok || !transcript || !data || !response.body) {
      if (response.status === 429) {
        toast.error('Too many requests. Please try again later.')
      } else {
        toast.error((await response.text()) || 'An error occurred.')
      }
      return
    }

    const resourcesFromSearch = JSON.parse(results)

    if (resourcesFromSearch.length === 0) {
      toast.info('No results were found')
      return
    }

    const auu = new Audio(URL.createObjectURL(data))
    auu.play()

    // setListResources(resourcesFromSearch)
    await getAlternatives({ transcript })
  }

  const getAlternatives = async ({ transcript }: { transcript: string }) => {
    // setIsLoadingAlternatives(true)

    const response = await fetch('/api/alternatives', {
      method: 'POST',
      body: JSON.stringify({ question: transcript })
    })

    const alternatives = await response.json()
    // setIsLoadingAlternatives(false)
    // setListAlternatives(alternatives)
  }

  const play = () => {
    vad.start()
  }

  return {
    play,
    getResourcesFromSearch,
    isUserSpeaking: vad.userSpeaking
  }
}
