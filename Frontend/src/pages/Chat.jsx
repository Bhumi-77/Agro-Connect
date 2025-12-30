import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API || 'http://localhost:4000';

export default function Chat(){
  const token = localStorage.getItem('token');
  const [chatId, setChatId] = useState('');
  const [other, setOther] = useState(''); // other user id
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const start = async () => {
    const { data } = await axios.post(`${API}/api/chat/start`, { otherUserId: other }, { headers: { Authorization: `Bearer ${token}` } });
    setChatId(data._id);
  };

  const load = async () => {
    if (!chatId) return;
    const { data } = await axios.get(`${API}/api/chat/${chatId}/messages`, { headers: { Authorization: `Bearer ${token}` } });
    setMessages(data);
  };

  const send = async () => {
    await axios.post(`${API}/api/chat/${chatId}/message`, { text }, { headers: { Authorization: `Bearer ${token}` } });
    setText('');
    await load();
  };

  useEffect(()=>{ const t = setInterval(load, 2000); return ()=>clearInterval(t); }, [chatId]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex gap-2 mb-3">
          <input className="border rounded px-3 py-2 flex-1" placeholder="Other user id" value={other} onChange={e=>setOther(e.target.value)} />
          <button onClick={start} className="px-4 py-2 rounded bg-green-600 text-white">Start</button>
        </div>
        {chatId && <p className="text-xs text-gray-500 mb-2">Chat ID: {chatId}</p>}

        <div className="h-64 overflow-y-auto border rounded p-3 space-y-2">
          {messages.map(m => (
            <div key={m._id} className="bg-green-50 border border-green-200 rounded p-2">
              <div className="text-sm">{m.text}</div>
              {m.priceOffer ? <div className="text-xs text-emerald-800">Offer: Rs. {m.priceOffer}</div> : null}
            </div>
          ))}
        </div>

        <div className="mt-3 flex gap-2">
          <input className="border rounded px-3 py-2 flex-1" value={text} onChange={e=>setText(e.target.value)} placeholder="Type message or price offer..." />
          <button onClick={send} className="px-4 py-2 rounded bg-green-600 text-white">Send</button>
        </div>
      </div>
    </div>
  );
}
