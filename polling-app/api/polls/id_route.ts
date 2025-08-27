import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { question, options, creator_id } = await req.json()
  const { data, error } = await supabase.from("polls").insert([{ question, options, creator_id }]).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ poll: data[0] })
}

export async function GET() {
  const { data, error } = await supabase.from("polls").select("*")
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ polls: data })
}
