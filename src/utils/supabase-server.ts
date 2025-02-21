'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

import { Database } from '@/types/supabase'

const fetchWithTags = (
  input: RequestInfo | URL,
  init?: RequestInit,
  tag?: string
): Promise<Response> => {
  return fetch(input, {
    ...init,
    next: {
      ...(init?.next || {}),
      tags: tag ? [tag] : []
    }
  })
}

export const createSupabaseServerClient = async (tag?: string) => {
  const cookieStore = await cookies()
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: (input: RequestInfo | URL, init?: RequestInit) => fetchWithTags(input, init, tag)
      },
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        }
      }
    }
  )
}
