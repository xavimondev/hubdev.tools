import Link from 'next/link'

import { AuthMenu } from '@/components/auth-menu'
import { GitHubIc } from '@/components/icons'
import { Logo } from '@/components/logo'
import { ModeToggle } from '@/components/mode-toggle'

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
            <ModeToggle />
            <a
              href='https://github.com/xavimondev/hubdev.tools'
              target='_blank'
              className='inline-flex items-center justify-center bg-background hover:bg-accent hover:text-accent-foreground transition-colors duration-200 size-10 rounded-md'
              rel='noreferrer noopener'
              aria-label='GitHub repository'
            >
              <GitHubIc className='size-5' />
            </a>
            <AuthMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
