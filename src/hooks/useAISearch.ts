import { alternatives } from '@/actions/ai/alternatives'
import { getCache, saveCache } from '@/actions/ai/cache'
import { search } from '@/actions/ai/search'
import { summarize } from '@/actions/ai/summary'
// import { useMicVAD, utils } from '@ricky0123/vad-react'
import { readStreamableValue } from 'ai/rsc'
import { toast } from 'sonner'

import { Suggestion } from '@/types/suggestion'

import { useAIStore } from '@/store'

export function useAISearch() {
  const setSuggestionsFromInternet = useAIStore((state) => state.setSuggestionsFromInternet)
  const setResources = useAIStore((state) => state.setResources)
  const setHasResources = useAIStore((state) => state.setHasResources)
  const setIsLoadingResources = useAIStore((state) => state.setIsLoadingResources)
  const setIsLoadingSuggestions = useAIStore((state) => state.setIsLoadingSuggestions)
  const setSummary = useAIStore((state) => state.setSummary)
  const clearSummary = useAIStore((state) => state.clearSummary)
  const setIsLoadingSummary = useAIStore((state) => state.setIsLoadingSummary)
  const setLanguage = useAIStore((state) => state.setLanguage)

  // const vad = useMicVAD({
  //   onSpeechEnd: async (audio) => {
  //     const wav = utils.encodeWAV(audio)
  //     const blob = new Blob([wav], { type: 'audio/wav' })
  //     const formData = new FormData()
  //     formData.append('input', blob, 'audio.wav')
  //     // await getResourcesFromSearch({ formData })
  //   },
  //   workletURL: '/vad.worklet.bundle.min.js',
  //   modelURL: '/silero_vad.onnx',
  //   positiveSpeechThreshold: 0.6,
  //   minSpeechFrames: 4,
  //   ortConfig(ort) {
  //     const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  //     ort.env.wasm = {
  //       wasmPaths: {
  //         'ort-wasm-simd-threaded.wasm': '/ort-wasm-simd-threaded.wasm',
  //         'ort-wasm-simd.wasm': '/ort-wasm-simd.wasm',
  //         'ort-wasm.wasm': '/ort-wasm.wasm',
  //         'ort-wasm-threaded.wasm': '/ort-wasm-threaded.wasm'
  //       },
  //       numThreads: isSafari ? 1 : 4
  //     }
  //   }
  // })

  const getResourcesFromSearch = async ({ input }: { input: string }) => {
    setIsLoadingResources(true)
    setIsLoadingSummary(true)
    setIsLoadingSuggestions(true)
    setHasResources(false)

    clearSummary()

    // Check if the query is already cached
    const cached = await getCache({ input })
    if (cached) {
      const { resources, suggestions, summary } = cached.data
      setResources(resources)
      setSuggestionsFromInternet(suggestions)
      setSummary(summary)
      setIsLoadingResources(false)
      setIsLoadingSummary(false)
      setIsLoadingSuggestions(false)
      return
    }

    const { data: result, error: searchError } = await search({ input })

    if (searchError) {
      setIsLoadingResources(false)
      setIsLoadingSummary(false)
      setIsLoadingSuggestions(false)

      toast.error(searchError)

      return
    }

    if (!result || result.length === 0) {
      setIsLoadingResources(false)
      setIsLoadingSummary(false)
      setIsLoadingSuggestions(false)

      clearResults()
      return
    }

    //Generating summary
    const { output, language, error } = await summarize({ data: result, input })
    if (error || !output) {
      setIsLoadingSummary(false)
      toast.error(error)
      return
    }

    setIsLoadingSummary(false)

    let summaryText = ''
    for await (const delta of readStreamableValue(output)) {
      if (delta) {
        setSummary(delta)
        summaryText += delta
      }
    }
    setLanguage(language)

    // Looking for suggestions on the internet
    const suggestions = await getSuggestions({ transcript: input })

    setIsLoadingSuggestions(false)
    setIsLoadingResources(false)
    setResources(result)

    // hide button "load more resources" when semantic search is performed
    setHasResources(false)

    // Save the query in the cache
    const cache = {
      input,
      data: {
        resources: result,
        suggestions: suggestions as Suggestion[],
        summary: summaryText
      }
    }

    await saveCache({ cache })
  }

  const getSuggestions = async ({ transcript }: { transcript: string }) => {
    const { data, error } = await alternatives({ question: transcript })

    if (!data || error) {
      toast.error(error)
      return
    }
    setSuggestionsFromInternet(data)
    return data
  }

  const clearResults = () => {
    setResources(undefined)
    setSuggestionsFromInternet([])
    setSummary('')
  }

  return {
    getResourcesFromSearch,
    isUserSpeaking: false
  }
}
