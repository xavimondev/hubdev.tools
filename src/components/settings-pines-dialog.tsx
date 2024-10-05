import { useState } from 'react'
import { SettingsIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { SettingsPinesForm } from '@/components/settings-pines-form'

export function SettingsPinesDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className='bg-light-800 dark:bg-neutral-800 text-white' size='icon'>
          <SettingsIcon className='size-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Top Pinned Cards Settings</DialogTitle>
          <DialogDescription>Adjust the settings for top pinned cards display.</DialogDescription>
        </DialogHeader>
        <SettingsPinesForm setIsDialogOpen={setIsDialogOpen}>
          <DialogFooter>
            <Button type='submit'>Accept</Button>
          </DialogFooter>
        </SettingsPinesForm>
      </DialogContent>
    </Dialog>
  )
}
