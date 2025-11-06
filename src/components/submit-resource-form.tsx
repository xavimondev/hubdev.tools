import { Dispatch, SetStateAction, useState } from 'react'
import { extractDomain } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { inter } from '@/fonts'

import { cn } from '@/utils/styles'
import { isDomainInvalid } from '@/utils/isDomainInvalid'
import { submitResource } from '@/services/request'
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
  url: z.url({
    message: 'Invalid URL.'
  })
})

export function SubmitResourceForm({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const [successMessage, setSuccessMessage] = useState<string>('')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: ''
    }
  })

  const {
    formState: { isSubmitting, errors },
    setError
  } = form
  const hasErrors = Object.keys(errors).length > 0

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const domain = extractDomain(values.url)
    if (
      isDomainInvalid({
        url: domain
      })
    ) {
      setError('url', {
        type: 'manual',
        message: 'Invalid URL.'
      })
      return
    }

    try {
      const formData = new FormData()
      formData.append('url', values.url)

      const { msg } = await submitResource({
        formData
      })
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
        setError('root.api', {
          type: 'manual',
          message: error.message
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-4', inter.className)}
      >
        <FormField
          control={form.control}
          name='url'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input
                  placeholder='https://example.com'
                  {...field}
                  autoComplete='off'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {hasErrors && <p className='text-red-500 text-sm'>{errors?.root?.api?.message}</p>}
        {successMessage && (
          <p className='text-light-900 dark:text-green-500 text-sm font-semibold'>
            {successMessage}
          </p>
        )}
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
