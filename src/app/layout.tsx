import { GeistSans } from 'geist/font/sans'
import { ViewTransitions } from 'next-view-transitions'

import './globals.css'

import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'

import { APP_URL } from '@/constants'
import { AISearch } from '@/components/ai-search'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

const title = 'hubdev.tools - Developer Tools and Resources'
const description =
  'A great collection of resources and tools for developers. Discover UI inspiration, books, courses, testing tools, icons, and much more.'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    template: `%s | ${title}`,
    default: title
  },
  alternates: {
    canonical: '/'
  },
  description,
  keywords: [
    'dev resources',
    'developers tools',
    'developer resources',
    'tools',
    'libraries',
    'courses',
    'programming',
    'database',
    'open source',
    'icons',
    'ui',
    'design',
    'ai',
    'hosting',
    'docs',
    'animation'
  ],
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'hubdev',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/banner.jpg',
        width: 1835,
        height: 1000,
        type: 'image/jpeg'
      }
    ]
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html lang='en' className={`${GeistSans.variable}`} suppressHydrationWarning>
        <body className={`flex flex-col min-h-screen px-1 !sm:px-2`}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <div className='px-4 py-8 md:px-6 md:py-10 container'>
              <Sidebar />
              {children}
              <AISearch />
            </div>
          </ThemeProvider>
          <Toaster
            theme='system'
            toastOptions={{
              classNames: {
                toast: 'bg-background dark:border-input border-light-700/60',
                title: 'dark:text-white text-light-900',
                icon: 'dark:text-white text-light-900'
              }
            }}
          />
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  )
}
