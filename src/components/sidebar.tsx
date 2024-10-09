import { SidebarOptions } from '@/components/sidebar-options'

export async function Sidebar() {
  return (
    <aside className='w-full md:fixed md:h-full md:w-56 overflow-y-auto scrollbar-hide mb-8 md:mb-0'>
      <nav className='flex gap-1 overflow-y-auto md:mb-32 md:flex-col md:overflow-y-visible md:pb-2 pt-0 px-0.5 md:px-0'>
        <SidebarOptions />
      </nav>
    </aside>
  )
}
