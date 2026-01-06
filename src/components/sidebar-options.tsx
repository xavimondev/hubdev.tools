import { ListCategories } from './list-categories'
import { CategoryPill } from './category-pill'

function OptionHeader({ title }: { title: string }) {
  return (
    <div className='hidden md:flex h-9 items-center px-4'>
      <span className='font-normal text-light-800 dark:text-gray-400 text-sm'>{title}</span>
    </div>
  )
}

function Discover() {
  return (
    <CategoryPill
      name='Discover'
      slug='discover'
      href='/'
    />
  )
}

async function Favorites() {
  return (
    <CategoryPill
      name='Favorites'
      slug='favorites'
      href='/favorites'
    />
  )
}

export function SidebarOptions() {
  return (
    <div className='flex space-y-1 overflow-y-auto md:flex-col md:overflow-y-visible pt-0 px-0.5 md:px-0'>
      <Favorites />
      <Discover />
      <OptionHeader title='Categories' />
      <ListCategories />
    </div>
  )
}
