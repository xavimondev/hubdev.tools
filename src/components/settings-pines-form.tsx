'use client'

import { Dispatch, SetStateAction } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

const FormSchema = z.object({
  showTopPinnedOnCategories: z.boolean().default(false),
  numberOfTopPinned: z.number().min(1).max(10).default(4)
})

type SettingsPinesFormProps = {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  children?: React.ReactNode
}

export function SettingsPinesForm({ setIsDialogOpen, children }: SettingsPinesFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      showTopPinnedOnCategories: false,
      numberOfTopPinned: 4
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    setIsDialogOpen(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='showTopPinnedOnCategories'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-md border p-3'>
              <div className='space-y-0.5'>
                <FormLabel>Show on Categories</FormLabel>
                <FormDescription>Show pinned cards on all category pages</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='numberOfTopPinned'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-md border p-3'>
              <div className='space-y-0.5'>
                <FormLabel>Number of Top Pinned Cards</FormLabel>
                <FormDescription>Set max 10 pinned cards to display</FormDescription>
              </div>
              <FormControl>
                <Input
                  type='number'
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  min={1}
                  max={10}
                  className='w-16'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  )
}
