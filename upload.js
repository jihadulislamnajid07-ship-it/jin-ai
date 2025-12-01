import nextConnect from 'next-connect'
import multer from 'multer'
import fs from 'fs'

const uploadDir = '/tmp/jn_ai_uploads'
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, uploadDir) },
  filename: function (req, file, cb) { cb(null, Date.now() + '-' + file.originalname) }
})
const upload = multer({ storage })

const apiRoute = nextConnect()
apiRoute.use(upload.single('file'))
apiRoute.post((req,res)=> {
  // In prod forward to S3/Supabase and enqueue training
  res.json({ ok:true, file: req.file })
})

export const config = { api: { bodyParser: false } }
export default apiRoute
