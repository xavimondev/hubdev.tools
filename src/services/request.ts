import { createSupabaseBrowserClient } from '@/utils/supabase-client'

type RequestResource = {
  website: string
}

const addRequest = async ({ request }: { request: RequestResource }) => {
  const supabase = await createSupabaseBrowserClient()
  const { error } = await supabase.from('requests').insert(request)

  if (error) throw error

  return 'ok'
}

// First off, let's check if the resource is already added on resources table,
// Otherwise, we'll check whether it's submitted or not on the requests table
const isAlreadySubmittedOrAdded = async ({ url }: { url: string }) => {
  const supabase = await createSupabaseBrowserClient()
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

export const submitResource = async ({ formData }: { formData: FormData }) => {
  const request = {
    website: formData.get('url') as string
  }

  try {
    const isAdded = await isAlreadySubmittedOrAdded({
      url: request.website
    })
    if (!isAdded) {
      const response = await addRequest({
        request
      })
      return {
        msg: response
      }
    }

    return {
      msg: 'This resource has already been submitted or added.'
    }
  } catch (error) {
    // @ts-ignore
    const isAlreadyAdded = error.message.includes('duplicate key')
    if (isAlreadyAdded) {
      throw new Error('This resource has already been submitted or added.')
    }
    throw new Error('An error ocurred while submitting the resource.')
  }
}
