import fetch from 'node-fetch'
export default async function handler(req,res){
  if (req.method !== 'POST') return res.status(405).json({ error:'Method not allowed' })
  const { message, sessionId } = req.body || {}
  if (!message) return res.status(400).json({ error:'missing message' })

  const MODEL_API_URL = process.env.MODEL_API_URL
  const MODEL_API_KEY = process.env.MODEL_API_KEY
  const MODEL_NAME = process.env.MODEL_NAME || 'jin 1'

  if (!MODEL_API_URL || !MODEL_API_KEY) {
    return res.status(500).json({ error: 'Model API not configured. Set MODEL_API_URL and MODEL_API_KEY.' })
  }

  try {
    const r = await fetch(MODEL_API_URL, {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${MODEL_API_KEY}` },
      body: JSON.stringify({ model: MODEL_NAME, input: message, session: sessionId })
    })
    const data = await r.json()
    const reply = data.output || data.result || data
    res.status(200).json({ reply })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Model request failed' })
  }
}
