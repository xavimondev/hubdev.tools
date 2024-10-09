import { createSupabaseServerClient } from '@/utils/supabase-server'

type RequestResource = {
  website: string
}

export const submitRequest = async ({ request }: { request: RequestResource }) => {
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('requests').insert(request)

  if (error) throw error

  return 'ok'
}

// First off, let's check if the resource is already added on resources table,
// Otherwise, we'll check whether it's submitted or not on the requests table
export const isAlreadySubmittedOrAdded = async ({ url }: { url: string }) => {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from('resources').select('id').eq('url', url)

  if (error) throw error

  if (data.length === 1) return true

  const { data: requestData, error: requestError } = await supabase
    .from('requests')
    .select('id')
    .eq('website', url)
    .eq('isAdded', false)

  if (requestError) throw requestError

  return requestData.length === 1
}
