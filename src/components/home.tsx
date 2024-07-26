'use client'

import { useRef, useState } from 'react'
import { listResources } from '@/actions/resources/'
import { useMicVAD, utils } from '@ricky0123/vad-react'
import { RefreshCcwIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Alternative } from '@/types/alternative'
import { Resource } from '@/types/resource'

import { Button } from '@/components/ui/button'
import { Hero } from '@/components/hero'
import ListAlternative from '@/components/list-alternative'
import { ListResource } from '@/components/list-resource'
import { Toolbar } from '@/components/toolbar'

type HomeProps = {
  data: Resource[]
}

const NUMBER_OF_GENERATIONS_TO_FETCH = 11

export function Home({ data }: HomeProps) {
  const [resources, setListResources] = useState<Resource[]>(data)
  const [alternatives, setListAlternatives] = useState<Alternative[]>([
    {
      name: "What's the best place or website to learn react.js? : r/reactjs - Reddit",
      url: 'https://www.reddit.com/r/reactjs/comments/10xo017/whats_the_best_place_or_website_to_learn_reactjs/',
      snippet:
        'Apple, Inc. engages in the design, manufacture, and sale of smartphones, personal computers, tablets, wearables and accessories, and other varieties of ...'
    },
    {
      name: 'How To Learn React As A Beginner In 2024 - DreamHost',
      url: 'https://www.dreamhost.com/blog/learn-react/',
      snippet:
        'Get the latest Apple Inc (AAPL) real-time quote, historical performance, charts, and other financial information to help you make more informed trading and ...'
    },
    {
      name: 'What is the easiest way to learn React.js? - Quora',
      url: 'https://www.quora.com/What-is-the-easiest-way-to-learn-React-js',
      snippet:
        'Get the latest Apple Inc (AAPL) real-time quote, historical performance, charts, and other financial information to help you make more informed trading and ...'
    },
    {
      name: 'Courses - React',
      url: 'https://legacy.reactjs.org/community/courses.html',
      snippet:
        'Get the latest Apple Inc (AAPL) real-time quote, historical performance, charts, and other financial information to help you make more informed trading and ...'
    }
  ])
  const isLastRequest = useRef(false)
  const [isLoadingAlternatives, setIsLoadingAlternatives] = useState(false)

  const vad = useMicVAD({
    startOnLoad: false,
    onSpeechEnd: async (audio) => {
      const wav = utils.encodeWAV(audio)
      const blob = new Blob([wav], { type: 'audio/wav' })
      const formData = new FormData()
      formData.append('input', blob, 'audio.wav')
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

      const auu = new Audio(URL.createObjectURL(data))
      auu.play()

      const resourcesFromSearch = JSON.parse(results)

      if (resourcesFromSearch.length === 0) {
        toast.info('No results were found')
        return
      }

      setListResources(resourcesFromSearch)

      // console.log(transcript)
      await getAlternatives({ transcript })

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

  const getAlternatives = async ({ transcript }: { transcript: string }) => {
    setIsLoadingAlternatives(true)

    const response = await fetch('/api/alternatives', {
      method: 'POST',
      body: JSON.stringify({ question: transcript })
    })

    const alternatives = await response.json()
    setIsLoadingAlternatives(false)
    setListAlternatives(alternatives)
  }
  // TODO: check when user is talking and displays some UI effects: use vad.
  // Besides, play the audio programatically
  const loadMoreResources = async () => {
    if (isLastRequest.current) return

    const newResources = await listResources({
      from: resources.length,
      to: resources.length + NUMBER_OF_GENERATIONS_TO_FETCH
    })

    if (!newResources) return

    if (newResources.length > 0) {
      const formatedData: Resource[] = newResources.map((item) => {
        const { categories, ...resource } = item
        const { name } = categories ?? {}
        return {
          ...resource,
          category: name ?? ''
        }
      })

      setListResources((data) => [...data, ...formatedData])
    }

    if (newResources.length < NUMBER_OF_GENERATIONS_TO_FETCH + 1) {
      isLastRequest.current = true
    }
  }

  return (
    <>
      <main>
        <div className='ml-0 md:ml-56'>
          <Hero
            title='Resources'
            description='Discover an awesome list of resources for developers with cutting-edge AI features'
          />
          <div className='mt-4'>
            <ListResource data={resources} />
            {/* TODO: put this botton in the toolbar */}
            <Button
              className='mt-2 rounded-full mx-auto flex justify-center'
              onClick={loadMoreResources}
            >
              <RefreshCcwIcon className='size-5 mr-2' />
              <span>Load more resources</span>
            </Button>
            <ListAlternative alternatives={alternatives} isLoading={isLoadingAlternatives} />
          </div>
        </div>
      </main>
      <Toolbar setListResources={setListResources} />
    </>
  )
}
