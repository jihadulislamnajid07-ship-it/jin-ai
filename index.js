import Head from 'next/head'
import ChatBox from '../components/ChatBox'
import VoiceControls from '../components/VoiceControls'
import CameraLive from '../components/CameraLive'

export default function Home(){
  return (
    <div style={{padding:20, fontFamily:'Arial'}}>
      <Head><title>JN Ai</title></Head>
      <h1>JN Ai</h1>
      <p>Welcome to JN Ai — features: Chat, Voice, OCR, Camera, Admin.</p>
      <ChatBox />
      <hr />
      <VoiceControls />
      <hr />
      <CameraLive />
      <p><a href="/admin">Admin Panel</a></p>
    </div>
  )
}
