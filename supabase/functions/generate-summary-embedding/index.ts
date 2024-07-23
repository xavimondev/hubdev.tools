import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

import { createClient } from 'npm:@supabase/supabase-js@2.44.4'

import { Database, Tables } from '@/types/supabase'

type ResourcesRecord = Tables<'resources'>
interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE'
  table: string
  record: ResourcesRecord
  schema: 'public'
  old_record: null | ResourcesRecord
}

const supabase = createClient<Database>(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const model = new Supabase.ai.Session('gte-small')

Deno.serve(async (req) => {
  const payload: WebhookPayload = await req.json()
  const { summary,id } = payload.record

  // Check if content has changed.
  if (summary === payload?.old_record?.summary) {
    return new Response('ok - no change')
  }

  // Generate embedding
  const embedding = await model.run(summary, {
    mean_pool: true,
    normalize: true
  })

  // Store in DB
  const { error } = await supabase
    .from('resources')
    .update({
      embedding: JSON.stringify(embedding)
    })
    .eq('id', id)
    
  if (error) console.warn(error.message)

  return new Response(JSON.stringify(embedding, null, 2))
})
