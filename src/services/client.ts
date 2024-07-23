import { createClient } from '@supabase/supabase-js'

import { Database } from '@/types/supabase'

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
)
