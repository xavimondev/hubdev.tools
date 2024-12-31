import { getUser } from '@/auth/server'

import { Categories } from '@/components/categories'
import { Discover, Pins } from '@/components/list-category'

function OptionHeader({ title }: { title: string }) {
  return (
    <div className='hidden md:flex h-9 items-center px-2'>
      <span className='font-normal text-light-800 dark:text-gray-400 text-sm'>{title}</span>
    </div>
  )
}

async function PinItem() {
  const user = await getUser()

  if (!user) return null

  return (
    <>
      <OptionHeader title='Saved' />
      <Pins />
    </>
  )
}

export function SidebarOptions() {
  return (
    <div className='flex space-y-1 overflow-y-auto md:flex-col md:overflow-y-visible pt-0 px-0.5 md:px-0'>
      <PinItem />
      <OptionHeader title='Explore' />
      <Discover />
      <OptionHeader title='Categories' />
      <Categories />
    </div>
  )
}
