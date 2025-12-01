export default async function handler(req,res){
  // placeholder: in production enqueue a retrain job on GPU worker or external service
  if (req.method !== 'POST') return res.status(405).end()
  // read uploaded files from storage and start job
  res.json({ started: true, message: 'Retrain job enqueued (placeholder)' })
}
