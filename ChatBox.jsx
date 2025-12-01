import { useState } from 'react'
export default function ChatBox(){
  const [msg,setMsg]=useState(''); const [hist,setHist]=useState([])
  async function send(){
    if(!msg) return
    setHist(h=>[...h,{role:'user',text:msg}])
    const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:msg})})
    const j=await r.json()
    setHist(h=>[...h,{role:'bot',text:j.reply}])
    setMsg('')
  }
  return (<div style={{border:'1px solid #ddd',padding:12,borderRadius:6,maxWidth:800}}>
    <div style={{height:240,overflow:'auto',background:'#fafafa',padding:8}}>{hist.map((m,i)=><div key={i}><b>{m.role}:</b> {String(m.text)}</div>)}</div>
    <div style={{marginTop:8}}><input style={{width:'70%'}} value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Type a message..." /><button onClick={send} style={{marginLeft:8}}>Send</button></div>
  </div>)
}
