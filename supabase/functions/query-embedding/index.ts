import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { createClient } from "jsr:@supabase/supabase-js@2.44.4";
import { Database } from '@/types/supabase'


const supabase = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const model = new Supabase.ai.Session("gte-small");

Deno.serve(async (req) => {
  const { prompt, limit } = await req.json();
  if (!prompt) return new Response("Please provide a prompt!");
  // Generate embedding for prompt.
  const embedding = await model.run(prompt, {
    mean_pool: true,
    normalize: true,
  });

  // Query embeddings.
  const { data: result, error } = await supabase
    .rpc("query_embeddings", {
      embed: JSON.stringify(embedding),
      match_threshold: 0.8,
      match_count: limit ?? 10
    })
    .select("*")
    // .limit(3);
  if (error) {
    return Response.json(error);
  }

  return Response.json({ prompt, result });
})