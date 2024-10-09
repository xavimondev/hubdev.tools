import { createSupabaseServerClient } from '@/utils/supabase-server'

export const updateClicks = async ({ url }: { url: string }) => {
  const { success, data, message, code } = await verifyUrl({ url })

  if (!success || !data) {
    return {
      success: false,
      message,
      code
    }
  }

  const { id } = data[0]

  return await incrementClicks({ id })
}

const verifyUrl = async ({ url }: { url: string }) => {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from('resources').select('id').eq('url', url)
  if (error) {
    console.error(error)
    return {
      success: false,
      code: 500,
      message: 'Something went wrong'
    }
  }

  if (data.length === 0) {
    return {
      success: false,
      code: 404,
      message: 'Resource Not Found'
    }
  }

  return {
    success: true,
    data,
    code: 200
  }
}

const incrementClicks = async ({ id }: { id: string }) => {
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.rpc('increment_clicks', { resource_id: id })
  if (error) {
    console.error(error)
    return {
      success: false,
      code: 500,
      message: 'Something went wrong'
    }
  }

  return {
    success: true,
    code: 200
  }
}
