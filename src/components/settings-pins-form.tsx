'use client'

import { revalidate } from '@/actions/revalidate'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Preferences } from '@/types/preferences'

import { createSupabaseBrowserClient } from '@/utils/supabase-client'
import { getPreferences, updatePreferences } from '@/services/preferences'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'

const FormSchema = z.object({
  showTopPinnedOnCategories: z.boolean()
})

export function SettingsPinsForm({ isPinsVisible }: { isPinsVisible: boolean }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      showTopPinnedOnCategories: isPinsVisible
    }
  })

  const onSubmit = async ({ isPinsVisible }: { isPinsVisible: boolean }) => {
    const supabase = await createSupabaseBrowserClient()
    const {
      data: { user }
    } = await supabase.auth.getUser()
    if (!user) {
      console.log('You need to be logged in to pin a resource.')
      return
    }

    const preferences: Preferences = {
      isPinsVisible,
      user_id: user.id
    }

    const pref = await getPreferences()

    if (pref) {
      preferences.id = pref.id
    }

    await updatePreferences(preferences)
    revalidate({ key: '/category', type: 'path' })
  }

  return (
    <Form {...form}>
      <form className='space-y-6'>
        <FormField
          control={form.control}
          name='showTopPinnedOnCategories'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between'>
              <div className='space-y-0.5'>
                <FormLabel>Show on Categories</FormLabel>
                <FormDescription>Show pinned cards on all category pages</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(e) => {
                    onSubmit({ isPinsVisible: e })
                    field.onChange(e)
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
