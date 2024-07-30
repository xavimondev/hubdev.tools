import { search } from '@/actions/ai/search'
import { summarize } from '@/actions/ai/summary'
import { useMicVAD, utils } from '@ricky0123/vad-react'
import { readStreamableValue } from 'ai/rsc'
import { toast } from 'sonner'

import { useAIStore } from '@/store'

export function useAISearch() {
  const setSuggestionsFromInternet = useAIStore((state) => state.setSuggestionsFromInternet)
  const setResources = useAIStore((state) => state.setResources)
  const setHasResources = useAIStore((state) => state.setHasResources)
  const setIsLoadingSuggestions = useAIStore((state) => state.setIsLoadingSuggestions)
  const setSummary = useAIStore((state) => state.setSummary)

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

  const getResourcesFromSearch = async ({ input }: { input: string }) => {
    const { data: result } = await search({ input })

    if (result.length === 0) {
      toast.info('No results were found')
      return
    }

    //Generating summary
    const { output, error } = await summarize({ data: result, input })
    if (error || !output) {
      toast.error(error)
      return
    }

    for await (const delta of readStreamableValue(output)) {
      if (delta) {
        setSummary(delta)
      }
    }

    // Looking for suggestions on the internet
    await getSuggestions({ transcript: input })
    setResources(result)
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
