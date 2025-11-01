import { getCategories } from '@/services/list'
import { CategoryPill } from '@/components/category-pill'

export async function ListCategories() {
  const categories = await getCategories()

  return (
    <>
      {categories &&
        categories.length > 0 &&
        categories.map((category) => {
          const href = `/category/${category.slug}`
          return (
            <CategoryPill
              key={category.id}
              name={category.name}
              slug={category.slug as string}
              href={href}
            />
          )
        })}
    </>
  )
}
