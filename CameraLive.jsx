import { useRef } from 'react'
export default function CameraLive(){
  const videoRef = useRef(null)
  async function start(){
    const stream = await navigator.mediaDevices.getUserMedia({ video:true })
    videoRef.current.srcObject = stream
    videoRef.current.play()
  }
  async function capture(){
    const video = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth; canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video,0,0)
    const data = await new Promise(resolve=>canvas.toBlob(resolve,'image/png'))
    const fd = new FormData(); fd.append('image', data, 'snap.png')
    const res = await fetch('/api/analyze',{method:'POST', body: fd})
    const j = await res.json()
    alert('Analysis: ' + JSON.stringify(j))
  }
  return (<div>
    <p>Live Camera</p>
    <video ref={videoRef} style={{width:320,height:240,border:'1px solid #ccc'}} />
    <div><button onClick={start}>Start Camera</button><button onClick={capture}>Capture & Analyze</button></div>
  </div>)
}
