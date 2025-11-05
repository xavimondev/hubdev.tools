import { SidebarOptions } from '@/components/sidebar-options'

export async function Sidebar() {
  return (
    <aside className='w-full md:fixed md:h-full md:w-56 overflow-y-auto scrollbar-hide mb-4 md:mb-0'>
      <nav className='md:mb-32 md:pb-2'>
        <SidebarOptions />
      </nav>
    </aside>
  )
}
