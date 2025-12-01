export default function handler(req,res){
  // placeholder: in production read/write feature flags in DB
  if (req.method !== 'POST') return res.status(405).end()
  const token = req.headers['x-admin-token'] || ''
  if (!token && !(req.cookies && req.cookies.jn_admin_token)) {
    // allow for demo when deployed with cookie
  }
  res.json({ toggled: true })
}
