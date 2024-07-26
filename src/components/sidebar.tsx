import { getCategories } from '@/services/list'
import { ListCategory } from '@/components/list-category'

export async function Sidebar() {
  const categories = await getCategories()
  return <ListCategory data={categories} />
}
