import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API || 'http://localhost:4000';

export default function Demand(){
  const token = localStorage.getItem('token');
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ cropName:'Potato', quantity:50, unit:'kg', targetPrice:25, note:'' });

  const load = async () => {
    const { data } = await axios.get(`${API}/api/demand`);
    setList(data);
  };

  const post = async () => {
    await axios.post(`${API}/api/demand`, form, { headers: { Authorization: `Bearer ${token}` } });
    await load();
  };

  useEffect(()=>{ load(); },[]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <h3 className="font-semibold text-green-700 mb-2">Post Demand</h3>
        <div className="grid md:grid-cols-4 gap-3">
          <input className="border rounded px-3 py-2" placeholder="Crop" value={form.cropName} onChange={e=>setForm(v=>({...v, cropName:e.target.value}))} />
          <input className="border rounded px-3 py-2" placeholder="Qty" value={form.quantity} onChange={e=>setForm(v=>({...v, quantity:Number(e.target.value)}))} />
          <input className="border rounded px-3 py-2" placeholder="Target Price" value={form.targetPrice} onChange={e=>setForm(v=>({...v, targetPrice:Number(e.target.value)}))} />
          <input className="border rounded px-3 py-2" placeholder="Note" value={form.note} onChange={e=>setForm(v=>({...v, note:e.target.value}))} />
        </div>
        <button onClick={post} className="mt-3 px-4 py-2 rounded bg-green-600 text-white">Post</button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {list.map(i => (
          <div key={i._id} className="bg-white rounded-xl shadow p-4">
            <h4 className="font-semibold text-green-700">{i.cropName}</h4>
            <p className="text-sm text-gray-700">{i.quantity} {i.unit} @ Rs. {i.targetPrice}</p>
            {i.note && <p className="text-xs text-gray-600 mt-1">{i.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
