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
  console.log("[CRON] track-prices called")

  try {
    const nestUrl = process.env.NEST_API_URL

    if (!nestUrl) {
      console.error("[CRON] Missing NEST_API_URL env variable")
      res.status(500).json({ error: "Missing NEST_API_URL env variable" })
      return
    }

    const endpoint = `${nestUrl}/scheduler/track-all-products`
    console.log(`[CRON] Sending POST to ${endpoint}`)

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const text = await response.text()
      console.error(`[CRON] NestJS API error (${response.status}): ${text}`)
      res.status(response.status).json({ error: `NestJS API error: ${text}` })
      return
    }

    const data = (await response.json()) as TrackResponse
    console.log("[CRON] Success:", data)

    res.status(200).json({ status: "ok", data })
  } catch (err) {
    console.error("[CRON] Error triggering tracking:", err)
    res.status(500).json({
      error: "Failed to trigger tracking",
      detail: err instanceof Error ? err.message : String(err),
    })
  }
}
