"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function PollForm() {
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState(["", ""])

  const addOption = () => setOptions([...options, ""])
  const handleChange = (i: number, val: string) => {
    const updated = [...options]
    updated[i] = val
    setOptions(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ question, options })
  }

  return (
    <Card className="p-6 max-w-lg">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Poll question" value={question} onChange={(e) => setQuestion(e.target.value)} required />
          {options.map((opt, i) => (
            <Input key={i} placeholder={`Option ${i + 1}`} value={opt} onChange={(e) => handleChange(i, e.target.value)} required />
          ))}
          <Button type="button" variant="secondary" onClick={addOption}>Add Option</Button>
          <Button type="submit" className="w-full">Create Poll</Button>
        </form>
      </CardContent>
    </Card>
  )
}
