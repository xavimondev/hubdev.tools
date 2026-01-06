export type Pin = {
  id: string
  resourceId?: string
  name: string
  url: string
  image?: string
  summary: string
  brief: string | null
  placeholder?: string
  category: string
  categoryColor: string
  isTop?: boolean
}
