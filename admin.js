import { useState } from 'react'
import Router from 'next/router'

export default function Admin(){
  const [code,setCode] = useState('')
  const [msg,setMsg] = useState('')

  async function submit(e){
    e.preventDefault()
    const res = await fetch('/api/admin/unlock', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ code })
    })
    const j = await res.json()
    if (j.ok) {
      // store token in cookie and redirect to admin panel page (same page shows)
      document.cookie = `jn_admin_token=${j.token}; path=/; max-age=86400`
      Router.reload()
    } else {
      setMsg(j.error || 'Failed')
    }
  }

  // check cookie to see if unlocked
  const unlocked = (typeof document !== 'undefined' && document.cookie.includes('jn_admin_token='))

  return (
    <div style={{padding:20,fontFamily:'Arial'}}>
      <h1>JN Ai — Admin</h1>
      {!unlocked ? (
        <form onSubmit={submit}>
          <label>Enter Admin Code:</label><br/>
          <input value={code} onChange={e=>setCode(e.target.value)} /><br/>
          <button type="submit">Unlock</button>
        </form>
      ) : (
        <div>
          <p style={{color:'green'}}>Admin unlocked.</p>
          <h3>Upload training data</h3>
          <form action="/api/upload" method="post" encType="multipart/form-data">
            <input type="file" name="file" />
            <button type="submit">Upload</button>
          </form>
          <h3>Feature toggles</h3>
          <button onClick={async()=>{ await fetch('/api/admin/toggle',{method:'POST'}); alert('Toggled (placeholder)')}}>Toggle Feature (placeholder)</button>
          <h3>Trigger retrain</h3>
          <button onClick={async()=>{ const r=await fetch('/api/admin/retrain',{method:'POST'}); const j=await r.json(); alert(JSON.stringify(j))}}>Trigger Retrain</button>
        </div>
      )}
      {msg && <p style={{color:'red'}}>{msg}</p>}
      <p><a href="/">Back</a></p>
    </div>
  )
}
