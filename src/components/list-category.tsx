import Link from 'next/link'
import { CATEGORIES } from '@/categories'

type CategoryProps = {
  name: string
  slug: string
  icon: any
}

function CategoryLink({ name, slug, icon }: CategoryProps) {
  return (
    <Link href={slug} className='flex items-center gap-3'>
      {icon}
      <span className='text-muted-foreground leading-relaxed text-[15px] hover:text-white transition-colors duration-200'>
        {name}
      </span>
    </Link>
  )
}

export function ListCategory() {
  return (
    <aside className='w-full md:fixed md:h-full md:w-56 overflow-y-auto scrollbar-hide pb-10'>
      <nav className='flex gap-1.5 overflow-y-auto md:mb-3 md:flex-col md:space-x-0 md:space-y-1 md:overflow-y-visible px-6 md:px-0 pb-2 pt-1 md:pt-0'>
        {CATEGORIES.map((category) => (
          <CategoryLink
            key={category.name}
            name={category.name}
            slug={category.slug}
            icon={
              <category.icon className='size-4 hover:text-white transition-colors duration-200' />
            }
          />
        ))}
      </nav>
    </aside>
  )
}
