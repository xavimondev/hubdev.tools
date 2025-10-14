import { SettingsIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { SettingsPinsForm } from '@/components/settings-pins-form'

export function PinsPreferences({ isPinsVisible }: { isPinsVisible: boolean }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className='bg-light-800 dark:bg-neutral-800 text-white'
          size='icon'
        >
          <SettingsIcon className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <SettingsPinsForm isPinsVisible={isPinsVisible} />
      </PopoverContent>
    </Popover>
  )
}
