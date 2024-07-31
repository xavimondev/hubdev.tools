'use client'

import { usePathname } from 'next/navigation'
import { SLUG_ICONS } from '@/categories'
import { Link } from 'next-view-transitions'

import { cn } from '@/utils/styles'

type CategoryProps = {
  name: string
  slug: string
  icon: string
  isVisited: boolean
}

function CategoryLink({ name, slug, icon, isVisited }: CategoryProps) {
  return (
    <Link
      href={slug}
      className={cn(
        'flex items-center gap-3 group hover:bg-neutral-500/30 p-1.5 rounded-md',
        isVisited && 'bg-neutral-500/30 hover:bg-none'
      )}
    >
      <span>{icon}</span>
      <span
        className={cn(
          'text-neutral-500 text-[15px] leading-normal group-hover:text-white transition-colors duration-200',
          isVisited && 'text-white category'
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

  return <CategoryLink name='All' slug={slug} isVisited={isVisited} icon={'🌀'} />
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
      <nav className='flex gap-1 overflow-y-auto md:mb-32 md:flex-col md:overflow-y-visible pb-2 pt-1 md:pt-0'>
        <CategoryAll />
        {data &&
          data.length > 0 &&
          data.map((category) => {
            const slug = `/category/${category.slug}`
            const isVisited = pathname === slug
            const emoji = SLUG_ICONS.find((icon) => icon.slug === category.slug)!.icon
            return (
              <CategoryLink
                key={category.id}
                name={category.name}
                slug={slug}
                isVisited={isVisited}
                icon={emoji}
              />
            )
          })}
      </nav>
    </aside>
  )
}
