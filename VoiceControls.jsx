import { useState } from 'react'
export default function VoiceControls(){
  const [rec,setRec]=useState(false)
  async function recordAndSend(){
    if(!navigator.mediaDevices) return alert('No mediaDevices')
    const stream = await navigator.mediaDevices.getUserMedia({ audio:true })
    const mediaRecorder = new MediaRecorder(stream)
    let chunks=[]
    mediaRecorder.ondataavailable = e => chunks.push(e.data)
    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: 'audio/webm' })
      const fd = new FormData()
      fd.append('audio', blob, 'record.webm')
      const res = await fetch('/api/stt', { method: 'POST', body: fd })
      const j = await res.json()
      alert('STT result: ' + j.text)
    }
    mediaRecorder.start()
    setRec(true)
    setTimeout(()=>{ mediaRecorder.stop(); setRec(false) }, 3000)
  }
  return (<div><p>Voice Assistant</p><button onClick={recordAndSend}>{rec? 'Recording...':'Record 3s & Send'}</button></div>)
}
