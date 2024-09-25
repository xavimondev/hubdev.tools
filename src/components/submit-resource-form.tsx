import { Dispatch, SetStateAction, useState } from 'react'
import { submitResource } from '@/actions/submit-resource'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { isDomainInvalid } from '@/utils/isDomainInvalid'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  url: z.string().url({
    message: 'Invalid URL.'
  }),
  email: z.string().email({
    message: 'Invalid email address.'
  })
})

export function SubmitResourceForm({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const [successMessage, setSuccessMessage] = useState<string>('')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      email: ''
    }
  })

  const {
    formState: { isSubmitting, errors },
    setError
  } = form
  const hasErrors = Object.keys(errors).length > 0

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isDomainInvalid({ url: values.url })) {
      setError('url', {
        type: 'manual',
        message: 'Invalid URL.'
      })
      return
    }

    try {
      const formData = new FormData()
      formData.append('url', values.url)
      formData.append('email', values.email)

      const { msg } = await submitResource({ formData })
      if (msg !== 'ok') {
        setError('url', {
          type: 'manual',
          message: 'This resource has already been submitted or added.'
        })
        return
      }

      setSuccessMessage('Thank you for submitting your resource!')
      setTimeout(() => {
        setOpen(false)
      }, 2000)
    } catch (error) {
      if (error instanceof Error) {
        setError('root.api', { type: 'manual', message: error.message })
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='url'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input placeholder='https://example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='your@email.com' {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {hasErrors && <p className='text-red-500 text-sm'>{errors?.root?.api?.message}</p>}
        {successMessage && <p className='text-green-500 text-sm'>{successMessage}</p>}
        <Button
          type='submit'
          className='w-full'
          disabled={isSubmitting || Boolean(errors?.root?.api)}
        >
          {!isSubmitting || hasErrors ? 'Submit' : 'Submitting...'}
        </Button>
      </form>
    </Form>
  )
}
