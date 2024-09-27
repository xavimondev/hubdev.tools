'use client'

import { useCallback, useEffect, useState } from 'react'
import { extractDomain } from '@/utils'
import useEmblaCarousel from 'embla-carousel-react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, LinkIcon, PinIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface Paper {
  id: string
  year: number
  field: string
  title: string
  authors: string
  link: string
  summary: string
}

const initialResources: Paper[] = [
  {
    id: '1',
    year: 2024,
    field: 'Machine learning',
    title: 'Keeping neural networks simple by minimizing the description length of the weights',
    authors: 'Geoffrey E. Hinton, Drew van Camp',
    link: 'https://example.com/paper1',
    summary:
      'This paper explores techniques to simplify neural networks by reducing the complexity of weight descriptions.'
  },
  {
    id: '2',
    year: 2024,
    field: 'Meta',
    title: 'Exploring Scaling Trends in LLM Robustness',
    authors:
      'Nikolhaus Howe, Michal Zajac, Ian McKenzie, Oskar Hollinsworth, Tom Tseng, Pierre-Luc Bacon, Adam Gleave',
    link: 'https://example.com/paper2',
    summary:
      'An investigation into how the robustness of large language models changes as they scale in size and complexity.'
  },
  {
    id: '3',
    year: 2024,
    field: 'Meta',
    title: 'VGGHeads: A Large-Scale Synthetic Dataset for 3D Human Heads',
    authors: 'Orest Kupyn, Eugene Khvedchenia, Christian Rupprecht',
    link: 'https://example.com/paper3',
    summary:
      'This paper introduces a new synthetic dataset for 3D human head modeling and analysis.'
  },
  {
    id: '4',
    year: 2024,
    field: 'Meta',
    title: 'VGGHeads: A Large-Scale Synthetic Dataset for 3D Human Heads',
    authors: 'Orest Kupyn, Eugene Khvedchenia, Christian Rupprecht',
    link: 'https://example.com/paper3',
    summary:
      'This paper introduces a new synthetic dataset for 3D human head modeling and analysis.'
  }
]

type PinCardProps = {
  id: string
  index: number
  name: string
  url: string
  summary: string
}

function PinCard({ id, index, name, url, summary }: PinCardProps) {
  return (
    <motion.div
      key={id}
      className='flex-[0_0_33.33%] min-w-0'
      initial={index === 0 ? { opacity: 0, scale: 0.8 } : { opacity: 1, x: '-100%' }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: '100%' }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        opacity: { duration: index === 0 ? 1.5 : 0.2 }
      }}
    >
      <div className='rounded-lg shadow-sm overflow-hidden border border-light-600/70 dark:border-orange-300/50 dark:hover:border-orange-500 bg-light-600/20 hover:bg-light-600/70 dark:bg-[#ff7a2b]/10 dark:hover:bg-orange-400/10 transition-colors duration-300 ease-in-out'>
        <div className='flex flex-col gap-5 p-3'>
          <a className='flex flex-col gap-3' href={url} target='_blank' rel='noopener noreferrer'>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-1'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-base md:text-lg font-semibold text-balance'>{name}</h2>
                  <Button
                    variant='ghost'
                    size='icon'
                    aria-label='Remove pin'
                    className='group hover:bg-red-800/20 dark:hover:bg-red-500/20'
                  >
                    <span className='sr-only'>Delete</span>
                    <svg
                      className='text-red-600 dark:text-red-400 group-hover:text-red-700 group-hover:dark:text-red-500 trash-can'
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M3 6h18' />
                      <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                      <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                      <path className='trash-lid' d='M4 6h16' />
                    </svg>
                  </Button>
                </div>
                <div className='flex items-center justify-between mt-1'>
                  <span className='text-xs text-blue-700 dark:text-anchor font-semibold flex items-center'>
                    <LinkIcon className='size-4 mr-2' />
                    <span className=''>{extractDomain('https://google.com.pe')}</span>
                  </span>
                </div>
              </div>
              <p className='text-sm text-gray-700 dark:text-gray-300 line-clamp-4 text-pretty'>
                {summary}
              </p>
            </div>
          </a>
        </div>
      </div>
      {/* <Card
                  className={`${index === 0 ? 'bg-blue-100 shine-effect' : index % 3 === 1 ? 'bg-yellow-100' : 'bg-purple-100'} flex flex-col h-[300px] relative overflow-hidden`}
                >
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-lg font-bold flex items-center gap-2'>
                      <Pin className='size-4 stroke-2' />
                      {paper.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='flex-grow overflow-hidden'>
                    <div className='flex items-center text-sm text-gray-600 mb-2'>
                      <LinkIcon className='size-4 stroke-2 mr-1' />
                      <a
                        href={paper.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline'
                      >
                        {paper.link}
                      </a>
                    </div>
                    <p className='text-sm line-clamp-4'>{paper.summary}</p>
                  </CardContent>
                  <CardFooter className='flex justify-between mt-auto'>
                    <div className='text-xs text-gray-500'>
                      {paper.year} • {paper.field}
                    </div>
                    <div className='text-xs text-gray-500'>{paper.authors}</div>
                  </CardFooter>
                </Card> */}
    </motion.div>
  )
}

export function ListPines() {
  const [papers, setPapers] = useState(initialResources)
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    emblaApi.on('select', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className='mb-4'>
      <div className='flex items-center mb-4'>
        <h2 className='text-2xl font-bold mr-4 flex items-center gap-2'>
          <PinIcon className='size-[22px]' />
          Pines
        </h2>
        <div className='flex-grow h-px bg-light-600 dark:bg-neutral-700' />
        <div className='flex space-x-2 ml-4'>
          <Button
            className='bg-light-800 dark:bg-neutral-800 text-white'
            size='icon'
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft className='size-4 stroke-[4px]' />
          </Button>
          <Button
            className='bg-light-800 dark:bg-neutral-800 text-white'
            size='icon'
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight className='size-4 stroke-[4px]' />
          </Button>
        </div>
      </div>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex gap-6'>
          <AnimatePresence initial={false}>
            {papers.map(({ id, title, link, summary }, index) => (
              <PinCard key={id} id={id} index={index} name={title} url={link} summary={summary} />
            ))}
          </AnimatePresence>
        </div>
      </div>
      <style jsx global>{`
        .trash-can {
          overflow: visible;
        }
        .trash-can .trash-lid {
          transform-origin: 20% 50%;
          transition: transform 0.3s ease-in-out;
        }
        .trash-can:hover .trash-lid {
          transform: rotate(-45deg) translateY(-1px);
        }
      `}</style>
    </div>
  )
}
