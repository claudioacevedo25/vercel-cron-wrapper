import type { VercelRequest, VercelResponse } from "@vercel/node"

interface TrackResponse {
  status: string
  updated?: string[]
  count?: number
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  try {
    const nestUrl = process.env.NEST_API_URL

    if (!nestUrl) {
      res.status(500).json({ error: "Missing NEST_API_URL env variable" })
      return
    }

    const response = await fetch(`${nestUrl}/scheduler/track-all-products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const text = await response.text()
      res.status(response.status).json({ error: `NestJS API error: ${text}` })
      return
    }

    const data = (await response.json()) as Promise<TrackResponse>

    res.status(200).json({ status: "ok", data })
  } catch (err) {
    console.error("Error triggering tracking:", err)
    res.status(500).json({
      error: "Failed to trigger tracking",
      detail: err instanceof Error ? err.message : String(err),
    })
  }
}
