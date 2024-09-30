'use server'

import { isAlreadySubmittedOrAdded, submitRequest } from '@/services/request'

export async function submitResource({ formData }: { formData: FormData }) {
  const request = {
    website: formData.get('url') as string
  }

  try {
    const isAdded = await isAlreadySubmittedOrAdded({ url: request.website })
    if (!isAdded) {
      const response = await submitRequest({ request })
      return {
        msg: response
      }
    }

    return {
      msg: 'This resource has already been submitted or added.'
    }
  } catch (error) {
    console.error(error)
    throw new Error('An error ocurred while submitting the resource.')
  }
}
