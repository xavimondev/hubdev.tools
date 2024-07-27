import { Inter } from 'next/font/google'
import { ViewTransitions } from 'next-view-transitions'

import './globals.css'

import { Toaster } from 'sonner'

import { AISearch } from '@/components/ai-search'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

const inter = Inter({ subsets: ['latin'] })

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
        </body>
      </html>
    </ViewTransitions>
  )
}
