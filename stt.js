import fetch from 'node-fetch'
import fs from 'fs'
import formidable from 'formidable'

export const config = { api: { bodyParser: false } }

export default function handler(req,res){
  if (req.method !== 'POST') return res.status(405).end()
  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message })
    const audio = files.audio
    if (!audio) return res.status(400).json({ error: 'no audio uploaded' })
    // In production send to Whisper/AssemblyAI/etc. Here we return placeholder text.
    res.json({ text: 'Transcribed text placeholder. Replace handler to call real STT API.' })
  })
}
