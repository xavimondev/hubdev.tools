import { getUser } from '@/auth/server'

import { Categories } from '@/components/categories'
import { Discover, Pins } from '@/components/list-category'

function OptionHeader({ title }: { title: string }) {
  return (
    <div className='flex h-9 items-center px-2'>
      <span className='font-normal text-light-800 dark:text-gray-400 text-sm'>{title}</span>
    </div>
  )
}

function SidebarItem({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

async function PinItem() {
  const user = await getUser()

  if (!user) return null

  return (
    <SidebarItem>
      <OptionHeader title='Pins' />
      <Pins />
    </SidebarItem>
  )
}

export function SidebarOptions() {
  return (
    <div className='space-y-1'>
      <PinItem />
      <SidebarItem>
        <OptionHeader title='Explore' />
        <Discover />
      </SidebarItem>
      <SidebarItem>
        <OptionHeader title='Categories' />
        <Categories />
      </SidebarItem>
    </div>
  )
}
