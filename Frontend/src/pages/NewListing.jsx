import React, { useState } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API || 'http://localhost:4000';

export default function NewListing(){
  const [form, setForm] = useState({ name:'Tomato', quantity:100, unit:'kg', grade:'A', expectedPrice:50, negotiable:true });
  const token = localStorage.getItem('token');

  const submit = async () => {
    const { data } = await axios.post(`${API}/api/crops`, form, { headers: { Authorization: `Bearer ${token}` } });
    alert('Created: ' + data.name);
  };

  const csvUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    const { data } = await axios.post(`${API}/api/crops/bulk-csv`, fd, { headers: { Authorization: `Bearer ${token}` } });
    alert(`Inserted ${data.inserted}`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold text-green-700 mb-3">Add Listing</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {['name','quantity','unit','grade','expectedPrice'].map(k => (
            <div key={k}>
              <label className="block text-sm capitalize">{k}</label>
              <input className="border rounded px-3 py-2 w-full" value={form[k]}
                onChange={e=>setForm(v=>({...v,[k]: (k==='quantity'||k==='expectedPrice')?Number(e.target.value):e.target.value}))} />
            </div>
          ))}
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.negotiable} onChange={e=>setForm(v=>({...v, negotiable:e.target.checked}))} />
            <span>Negotiable</span>
          </div>
        </div>
        <button onClick={submit} className="mt-4 px-4 py-2 rounded bg-green-600 text-white">Create</button>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Bulk upload via CSV</h3>
          <input type="file" accept=".csv" onChange={csvUpload} />
        </div>
      </div>
    </div>
  );
}
