import { getData } from '@/services/list'
import { Home } from '@/components/home'

export default async function MainPage() {
  const data = await getData({ from: 0, to: 11 })
  if (!data) {
    console.log('An error occurred')
    return
  }

  const formatedData = data.map((item) => {
    const { categories, ...resource } = item
    const { name } = categories ?? {}
    return {
      ...resource,
      category: name ?? ''
    }
  })

  return <Home data={formatedData} />
}
