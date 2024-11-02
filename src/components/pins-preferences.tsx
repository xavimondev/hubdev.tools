import { SettingsIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { SettingsPinsForm } from '@/components/settings-pins-form'

export function PinsPreferences({ isPinVisible }: { isPinVisible: boolean }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='bg-light-800 dark:bg-neutral-800 text-white' size='icon'>
          <SettingsIcon className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='grid gap-4'>
          {/* <div className='space-y-2'>
            <h4 className='font-medium leading-none'>Top Pins Settings</h4>
            <p className='text-sm text-muted-foreground'>Adjust the settings for top pinned cards display.</p>
          </div> */}
          <SettingsPinsForm isPinVisible={isPinVisible} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
