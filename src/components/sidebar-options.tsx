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

export function SidebarOptions() {
  return (
    <div className='space-y-1'>
      <SidebarItem>
        <OptionHeader title='Pins' />
        <Pins />
      </SidebarItem>
      <SidebarItem>
        <OptionHeader title='Discover' />
        <Discover />
      </SidebarItem>
      <SidebarItem>
        <OptionHeader title='Categories' />
        <Categories />
      </SidebarItem>
    </div>
  )
}
