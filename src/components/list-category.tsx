'use client'

import { memo } from 'react'
import { usePathname } from 'next/navigation'
import { Link } from 'next-view-transitions'

import { cn } from '@/utils/styles'

type CategoryProps = {
  name: string
  slug: string
  emoji: string | null
}

const CategoryLink = memo(function CategoryLink({ name, slug, emoji }: CategoryProps) {
  const pathname = usePathname()
  const isActive = pathname === slug

  return (
    <Link
      href={slug}
      className={cn(
        'flex items-center gap-1 md:gap-3 group bg-background p-2 rounded-md text-sm md:text-[15px] leading-normal text-light-900 dark:text-link transition-colors',
        isActive
          ? 'bg-light-700/50 dark:bg-neutral-500/30'
          : 'hover:bg-light-600/40 dark:hover:bg-neutral-600/20'
      )}
    >
      <span>{emoji ?? '🤔'}</span>
      <span className={cn(isActive && 'text-black dark:text-yellow-300 category')}>{name}</span>
    </Link>
  )
})

function Home() {
  const slug = '/'

  return <CategoryLink name='Home' slug={slug} emoji={'🏠'} />
}

type Category = {
  id: number
  name: string
  slug: string | null
  emoji: string | null
}

type ListCategoryProps = {
  data: Category[] | undefined
}

export function ListCategory({ data }: ListCategoryProps) {
  return (
    <aside className='w-full md:fixed md:h-full md:w-56 overflow-y-auto scrollbar-hide mb-8 md:mb-0'>
      <nav className='flex gap-1 overflow-y-auto md:mb-32 md:flex-col md:overflow-y-visible md:pb-2 pt-0 px-0.5 md:px-0'>
        <Home />
        {data &&
          data.length > 0 &&
          data.map((category) => {
            const slug = `/category/${category.slug}`
            return (
              <CategoryLink
                key={category.id}
                name={category.name}
                slug={slug}
                emoji={category.emoji}
              />
            )
          })}
      </nav>
    </aside>
  )
}
