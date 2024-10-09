import { createSupabaseServerClient } from '@/utils/supabase-server'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { GitHubIc } from '@/components/icons'
import { LoginDialog } from '@/components/login-dialog'
import { LogoutForm } from '@/components/logout-form'
import { SubmitDialog } from '@/components/submit-dialog'

type UserNavbarProps = {
  avatar_url: string
  full_name: string
  user_name: string
}

export function UserNavbar({ avatar_url, full_name, user_name }: UserNavbarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={avatar_url} alt={user_name} />
            <AvatarFallback>{full_name.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1.5'>
            <p className='text-sm font-medium leading-none'>{full_name}</p>
            <p className='text-xs leading-none text-muted-foreground'>{user_name}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <a
              href='https://github.com/xavimondev/hubdev.tools'
              target='_blank'
              className='flex items-center w-full'
              rel='noreferrer noopener'
              aria-label='GitHub repository'
            >
              <GitHubIc className='mr-2 size-4' />
              <span>Github</span>
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutForm />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export async function AuthMenu() {
  const supabaseClient = await createSupabaseServerClient()

  const {
    data: { user }
  } = await supabaseClient.auth.getUser()

  if (!user) return <LoginDialog />

  const { user_metadata } = user
  const { avatar_url, full_name, user_name } = user_metadata

  return (
    <>
      <SubmitDialog />
      <UserNavbar avatar_url={avatar_url} full_name={full_name} user_name={user_name} />
    </>
  )
}
