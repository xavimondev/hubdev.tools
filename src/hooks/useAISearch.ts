import { useMicVAD, utils } from '@ricky0123/vad-react'
import { toast } from 'sonner'

import { useAIStore } from '@/store'

export function useAISearch() {
  const setSuggestionsFromInternet = useAIStore((state) => state.setSuggestionsFromInternet)
  const setResources = useAIStore((state) => state.setResources)
  const setHasResources = useAIStore((state) => state.setHasResources)
  const setIsLoadingSuggestions = useAIStore((state) => state.setIsLoadingSuggestions)

  const vad = useMicVAD({
    onSpeechEnd: async (audio) => {
      const wav = utils.encodeWAV(audio)
      const blob = new Blob([wav], { type: 'audio/wav' })
      const formData = new FormData()
      formData.append('input', blob, 'audio.wav')
      // await getResourcesFromSearch({ formData })
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
    const data = await response.json()
    console.log(data)
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

    setResources(resourcesFromSearch)
    await getSuggestions({ transcript })
    // hide button "load more resources" when semantic search is performed
    setHasResources(false)
  }

  const getSuggestions = async ({ transcript }: { transcript: string }) => {
    setIsLoadingSuggestions(true)

    const response = await fetch('/api/alternatives', {
      method: 'POST',
      body: JSON.stringify({ question: transcript })
    })

    const alternatives = await response.json()
    setSuggestionsFromInternet(alternatives)
    setIsLoadingSuggestions(false)
  }

  return {
    getResourcesFromSearch,
    isUserSpeaking: vad.userSpeaking
  }
}
