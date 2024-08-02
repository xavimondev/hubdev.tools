import { Inter } from 'next/font/google'
import { ViewTransitions } from 'next-view-transitions'

import './globals.css'

import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'sonner'

import { APP_URL } from '@/constants'
import { AISearch } from '@/components/ai-search'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

const inter = Inter({ subsets: ['latin'] })

const title = 'hubtools.dev - Developer Tools and Resources | Find Everything Here'
const description =
  'A great collection of essential resources and tools for developers, thoughtfully categorized. Simplify your searches with our powerful semantic search engine. Discover UI inspiration, books, courses, testing tools, icons, and much more.'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title,
  description,
  keywords: [
    'dev resources',
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
    siteName: 'vdbs',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/banner.jpg',
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
      <html lang='en'>
        <body className={`${inter.className} dark flex flex-col min-h-screen container`}>
          <Header />
          <div className='px-4 py-8 md:px-6 md:py-10'>
            <Sidebar />
            {children}
            <AISearch />
          </div>
          <Toaster theme='dark' />
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  )
}
