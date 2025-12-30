import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API || 'http://localhost:4000';

export default function Crops(){
  const [list, setList] = useState([]);
  const [q, setQ] = useState('');
  const [negotiable, setNegotiable] = useState('any');

  const fetchList = async () => {
    const params = {};
    if (q) params.q = q;
    if (negotiable !== 'any') params.negotiable = negotiable;
    const { data } = await axios.get(`${API}/api/crops`, { params });
    setList(data);
  };

  useEffect(() => { fetchList(); }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex gap-3 mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." className="border rounded px-3 py-2 flex-1" />
        <select value={negotiable} onChange={e=>setNegotiable(e.target.value)} className="border rounded px-3 py-2">
          <option value="any">Any</option>
          <option value="true">Negotiable</option>
          <option value="false">Fixed</option>
        </select>
        <button onClick={fetchList} className="px-4 py-2 rounded bg-green-600 text-white">Apply</button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {list.map(item => (
          <div key={item._id} className="bg-white rounded-xl shadow p-4">
            {item.imageUrl && <img src={item.imageUrl} className="h-40 w-full object-cover rounded" />}
            <h3 className="mt-2 font-semibold text-green-700">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.quantity} {item.unit} • Grade {item.grade}</p>
            <p className="text-sm text-gray-800 mt-1">Rs. {item.expectedPrice} / {item.unit} {item.negotiable ? '(Negotiable)' : '(Fixed)'}</p>
            {item.seasonalTags?.length ? <p className="text-xs text-amber-700 mt-1">Tags: {item.seasonalTags.join(', ')}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
