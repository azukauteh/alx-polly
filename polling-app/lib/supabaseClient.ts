import { createClient } from "@supabase/supabase-js";

// ✅ Create Supabase client using public env vars
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
