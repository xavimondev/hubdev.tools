import { GeistSans } from 'geist/font/sans'
import { ViewTransitions } from 'next-view-transitions'

import './globals.css'

import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'sonner'

import { APP_URL } from '@/constants'
import { AISearch } from '@/components/ai-search'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

export const revalidate = 60 // revalidate every hour

const title = 'hubdev.tools - Developer Tools and Resources | Find Everything Here'
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
    siteName: 'hubdev',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/og.jpg',
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
      <html lang='en' className={`${GeistSans.variable}`}>
        <body className={`dark flex flex-col min-h-screen px-1 !sm:px-2`}>
          <Header />
          <div className='px-4 py-8 md:px-6 md:py-10 container'>
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
