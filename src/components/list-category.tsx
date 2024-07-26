'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SLUG_ICONS } from '@/categories'
import { ListIcon } from 'lucide-react'

import { cn } from '@/utils/styles'

type CategoryProps = {
  name: string
  slug: string
  icon: any
  isVisited: boolean
}

function CategoryLink({ name, slug, icon, isVisited }: CategoryProps) {
  return (
    <Link href={slug} className='flex items-center gap-3 group'>
      {icon}
      <span
        className={cn(
          'text-neutral-400 text-[15px] leading-normal group-hover:text-yellow-300 transition-colors duration-200',
          isVisited && 'text-yellow-300'
        )}
      >
        {name}
      </span>
    </Link>
  )
}

function CategoryAll() {
  const slug = '/'
  const pathname = usePathname()
  const isVisited = pathname === slug

  return (
    <CategoryLink
      name='All'
      slug={slug}
      isVisited={isVisited}
      icon={
        <ListIcon
          className={cn(
            'size-4 group-hover:text-yellow-300 transition-colors duration-200',
            isVisited && 'text-yellow-300'
          )}
        />
      }
    />
  )
}

type Category = {
  id: number
  name: string
  slug: string | null
}

type ListCategoryProps = {
  data: Category[] | undefined
}

export function ListCategory({ data }: ListCategoryProps) {
  const pathname = usePathname()
  return (
    <aside className='w-full md:fixed md:h-full md:w-56 overflow-y-auto scrollbar-hide'>
      <nav className='flex gap-2 overflow-y-auto md:mb-24 md:flex-col md:overflow-y-visible pb-2 pt-1 md:pt-0'>
        <CategoryAll />
        {data &&
          data.length > 0 &&
          data.map((category) => {
            const slug = `/category/${category.slug}`
            const isVisited = pathname === slug
            const Icon = SLUG_ICONS.find((icon) => icon.slug === category.slug)!.icon
            return (
              <CategoryLink
                key={category.id}
                name={category.name}
                slug={slug}
                isVisited={isVisited}
                icon={
                  <Icon
                    className={cn(
                      'text-neutral-400 size-4 group-hover:text-yellow-300 transition-colors duration-200',
                      isVisited && 'text-yellow-300'
                    )}
                  />
                }
              />
            )
          })}
      </nav>
    </aside>
  )
}
