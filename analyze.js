import formidable from 'formidable'
export const config = { api: { bodyParser: false } }
export default function handler(req,res){
  if (req.method !== 'POST') return res.status(405).end()
  const form = new formidable.IncomingForm()
  form.parse(req,(err,fields,files)=>{
    // placeholder: send image to model endpoint for object-detection or OCR
    res.json({ analysis: 'placeholder analysis result' })
  })
}
