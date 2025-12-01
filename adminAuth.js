export function isAdmin(req){
  // in production verify JWT or cookie properly
  const token = (req.cookies && req.cookies.jn_admin_token) || ''
  return !!token
}
