'use client'
import { useState } from 'react';
import { useSocket } from '../context/SocketProvider';
import styles from './page.module.css'
export default function Home() {
  const { sendMessage,messages} = useSocket();
  const [message, setMessage] = useState('');
  return (
    <div>
      <div>
        <input type="text" placeholder="Type your message here" className={styles['chat-input']} onChange={ (e) => setMessage(e.target.value)  } />
        <button onClick={()=>sendMessage(message)} className={styles['button']}>Send</button>
      </div>
      <div>
        <h1>All messages will appear here</h1>
        {messages.map((msg, index) => <p key={index}>{msg}</p>)}
      </div>
    </div>
  );
}
