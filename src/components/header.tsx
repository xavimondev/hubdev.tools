import { SVGProps } from 'react'
import Link from 'next/link'

import { Logo } from '@/components/logo'
import { ModeToggle } from '@/components/mode-toggle'
import { SubmitDialog } from '@/components/submit-dialog'

export function Header() {
  return (
    <header className='bg-background shadow-sm sticky top-0 z-40'>
      <div className='flex items-center justify-between h-16 px-4 md:px-6'>
        <div className='hidden sm:flex items-center justify-between w-full'>
          <Link
            href='/'
            className='flex items-center gap-2 font-semibold'
            prefetch={false}
            aria-label='Linkg to home page'
          >
            <Logo className='size-6 md:size-7' />
            <span className='hidden md:block text-sm md:text-base'>hubdev</span>
          </Link>
          <div className='flex items-center gap-2'>
            <SubmitDialog />
            <ModeToggle />
            <a
              href='https://github.com/xavimondev/hubdev.tools'
              target='_blank'
              className='inline-flex items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors duration-200 size-10 rounded-md'
              rel='noreferrer noopener'
              aria-label='GitHub repository'
            >
              <GitHubIc className='size-5' />
            </a>
          </div>
        </div>
      </div>
    </header>
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
