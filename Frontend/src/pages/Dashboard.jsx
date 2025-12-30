import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/crops" className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-green-700">Browse Crops</h3>
          <p className="text-gray-600 text-sm mt-2">Location-based filters, negotiable/fixed, seasonal tags.</p>
        </Link>
        <Link to="/new" className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-green-700">Add Listing</h3>
          <p className="text-gray-600 text-sm mt-2">CSV/image detection, expiry alerts, inventory.</p>
        </Link>
        <Link to="/demand" className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-green-700">Demand Board</h3>
          <p className="text-gray-600 text-sm mt-2">Buyers post needs in real-time.</p>
        </Link>
      </div>
    </div>
  );
}
