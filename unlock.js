export default function handler(req,res){
  if (req.method !== 'POST') return res.status(405).end()
  const { code } = req.body || {}
  if (!code) return res.status(400).json({ error: 'missing code' })
  if (code === process.env.ADMIN_CODE) {
    // issue a simple token (in production use JWT)
    const token = 'admin-' + Date.now()
    return res.status(200).json({ ok: true, token })
  } else {
    return res.status(403).json({ ok: false, error: 'invalid code' })
  }
}
