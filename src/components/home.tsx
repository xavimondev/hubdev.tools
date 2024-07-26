'use client'

import { SVGProps, useRef, useState } from 'react'
import Link from 'next/link'
import { listResources } from '@/actions/resources/'
import { useMicVAD, utils } from '@ricky0123/vad-react'
import { PictureInPicture, RefreshCcwIcon } from 'lucide-react'

import { Alternative } from '@/types/alternative'
import { Resource } from '@/types/resource'

import { Button } from '@/components/ui/button'
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
          console.error('Too many requests. Please try again later.')
        } else {
          console.error((await response.text()) || 'An error occurred.')
        }
        return
      }

      const auu = new Audio(URL.createObjectURL(data))
      auu.play()

      const resourcesFromSearch = JSON.parse(results)
      // TODO: maybe display a notification
      if (resourcesFromSearch.length === 0) return

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
    <div className='flex flex-col min-h-screen container'>
      <header className='bg-background shadow-sm sticky top-0 z-40'>
        <div className='container flex items-center justify-between h-14 px-4 md:px-6'>
          <div className='flex items-center justify-between w-full'>
            <Link href='/' className='flex items-center gap-2 font-semibold' prefetch={false}>
              <PictureInPicture className='size-6' />
              <span>hubtools.dev</span>
            </Link>
            <Link
              href='https://github.com/xavimondev/hubtools.dev'
              target='_blank'
              className='text-muted-foreground hover:text-foreground transition-colors duration-200'
              prefetch={false}
              rel='noreferrer'
            >
              <GitHubIc className='size-5' />
            </Link>
          </div>
        </div>
      </header>
      <main className='flex-1 px-4 py-8 md:px-6 md:py-12'>
        <div className='relative flex items-center h-56'>
          <div className='absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(180deg,black,transparent)]'></div>
          <div className='relative px-8 md:px-4'>
            <h1 className='relative bg-gradient-to-br from-white to-white/50 bg-clip-text sm:text-xl text-2xl lg:text-5xl text-transparent text-balance font-bold'>
              Resources
            </h1>
            <p className='mt-6 max-w-lg text-muted-foreground text-pretty text-base lg:text-xl'>
              Discover an awesome list of resources for developers with cutting-edge AI features
            </p>
          </div>
        </div>

        <div className='bg-background rounded-lg shadow-sm mt-4'>
          <ListResource data={resources} setListResources={setListResources} />
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
      </main>
      <Toolbar setListResources={setListResources} />
      {/* <footer className='bg-background border-t shadow-sm fixed bottom-0 w-full'></footer> */}
    </div>
  )
}

function GitHubIc(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      fill='none'
      {...props}
    >
      <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
      <path d='M9 18c-4.51 2-5-2-7-2' />
    </svg>
  )
}
