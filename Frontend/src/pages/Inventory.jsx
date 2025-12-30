import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:4000";

const statusPill = (status) => {
  const base = "px-3 py-1 rounded-full text-xs font-semibold";
  if (status === "Available") return `${base} bg-green-100 text-green-800`;
  if (status === "Low Stock") return `${base} bg-orange-100 text-orange-800`;
  if (status === "Out of Stock") return `${base} bg-red-100 text-red-800`;
  if (status === "Reserved") return `${base} bg-blue-100 text-blue-800`;
  return `${base} bg-gray-100 text-gray-700`;
};

export default function Inventory() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [summary, setSummary] = useState({
    totalProducts: 0,
    availableStock: 0,
    reserved: 0,
    soldThisMonth: 0,
    lowStockItems: 0,
  });

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("name");

  const headers = useMemo(
    () => ({ Authorization: `Bearer ${token}` }),
    [token]
  );

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [s, list] = await Promise.all([
        axios.get(`${API}/api/crops/inventory/summary`, { headers }),
        axios.get(`${API}/api/crops/inventory`, {
          headers,
          params: { search, category, status, sort },
        }),
      ]);
      setSummary(s.data);
      setItems(list.data);
    } catch (e) {
      alert(
        e?.response?.data?.error ||
          e?.response?.data?.detail ||
          e.message ||
          "Failed to load inventory"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // refetch on filters
  useEffect(() => {
    const t = setTimeout(() => fetchAll(), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, status, sort]);

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [items]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API}/api/crops/${id}`, { headers });
      fetchAll();
    } catch (e) {
      alert(e?.response?.data?.error || e.message || "Delete failed");
    }
  };

  const handleQuickEdit = async (item) => {
    // minimal edit: update available qty by prompt (keeps UI same)
    const val = prompt("Update available stock (kg):", item.availableQty ?? 0);
    if (val === null) return;
    const num = Number(val);
    if (Number.isNaN(num)) return alert("Enter a valid number");

    try {
      await axios.patch(
        `${API}/api/crops/${item.id}`,
        { availableQty: num },
        { headers }
      );
      fetchAll();
    } catch (e) {
      alert(e?.response?.data?.error || e.message || "Update failed");
    }
  };

  const lowStockBanner = summary.lowStockItems > 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-green-900 flex items-center gap-2">
              Inventory Management <span className="text-sm">📦</span>
            </h1>
            <p className="text-sm text-gray-500">
              Track and manage your product inventory
            </p>
          </div>

          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded border border-green-200 bg-white text-green-800 text-sm font-semibold"
              onClick={() => window.print()}
            >
              Export
            </button>
            <button
              className="px-4 py-2 rounded bg-green-700 text-white text-sm font-semibold"
              onClick={() => navigate("/new")}
            >
              Add Product
            </button>
          </div>
        </div>

        {/* Low stock alert */}
        {lowStockBanner && (
          <div className="mt-5 bg-orange-50 border-l-4 border-orange-400 rounded px-4 py-3 text-sm">
            <div className="font-semibold text-orange-800">Low Stock Alert</div>
            <div className="text-orange-700">
              {summary.lowStockItems} products are running low on stock. Please
              restock soon to avoid out-of-stock situations.
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-5">
          <StatCard title="Total Products" value={summary.totalProducts} sub="↑ based on your listings" />
          <StatCard title="Available Stock" value={`${Math.round(summary.availableStock)} kg`} sub="current" />
          <StatCard title="Reserved" value={`${Math.round(summary.reserved)} kg`} sub="pending orders" />
          <StatCard title="Sold This Month" value={`${Math.round(summary.soldThisMonth)} kg`} sub="sales" />
          <StatCard title="Low Stock Items" value={summary.lowStockItems} sub="needs restocking" />
        </div>

        {/* Quick actions (optional tiles like screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <ActionTile title="Stock Report" desc="Generate inventory report" />
          <ActionTile title="Bulk Update" desc="Update multiple products" />
          <ActionTile title="Low Stock Alerts" desc="View items to restock" />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border mt-5 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="text-xs text-gray-500">Search</label>
              <input
                className="w-full mt-1 px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-green-200"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Category</label>
              <select
                className="w-full mt-1 px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-green-200"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === "All" ? "All Categories" : c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500">Status</label>
              <select
                className="w-full mt-1 px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-green-200"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Available">Available</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Reserved">Reserved</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500">Sort By</label>
              <select
                className="w-full mt-1 px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-green-200"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="stock">Stock</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border mt-5 p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-green-900">Product Inventory</h2>
            <div className="text-xs text-gray-500">
              Showing {items.length} products
            </div>
          </div>

          {loading ? (
            <div className="py-10 text-center text-gray-500">Loading...</div>
          ) : items.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              No products found. Click <b>Add Product</b> to create one.
            </div>
          ) : (
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm">
                <thead className="text-left text-gray-500 border-b">
                  <tr>
                    <th className="py-3">Product</th>
                    <th>Category</th>
                    <th>Available</th>
                    <th>Reserved</th>
                    <th>Sold</th>
                    <th>Stock Level</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((p) => {
                    const total = Math.max((p.availableQty || 0) + (p.reservedQty || 0) + (p.soldQty || 0), 1);
                    const percent = Math.min(100, Math.max(0, ((p.availableQty || 0) / total) * 100));

                    return (
                      <tr key={p.id} className="border-b last:border-b-0">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-green-50 flex items-center justify-center text-green-700 font-bold">
                              {p.name?.[0]?.toUpperCase() || "C"}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800">{p.name}</div>
                              <div className="text-xs text-gray-500">{p.unit || "kg"}</div>
                            </div>
                          </div>
                        </td>

                        <td>{p.category}</td>
                        <td>{Math.round(p.availableQty || 0)} kg</td>
                        <td>{Math.round(p.reservedQty || 0)} kg</td>
                        <td>{Math.round(p.soldQty || 0)} kg</td>

                        <td>
                          <div className="w-36 bg-gray-100 rounded h-2">
                            <div
                              className="h-2 rounded bg-green-600"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </td>

                        <td>
                          <span className={statusPill(p.status)}>{p.status}</span>
                        </td>

                        <td>₹{Number(p.pricePerUnit || 0).toFixed(0)}/{p.unit || "kg"}</td>

                        <td className="text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              className="px-3 py-1 rounded bg-orange-50 text-orange-700 border border-orange-100"
                              onClick={() => handleQuickEdit(p)}
                            >
                              Edit
                            </button>
                            <button
                              className="px-3 py-1 rounded bg-red-50 text-red-700 border border-red-100"
                              onClick={() => handleDelete(p.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="h-10" />
      </div>
    </div>
  );
}

function StatCard({ title, value, sub }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="text-2xl font-bold text-green-900 mt-1">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{sub}</div>
    </div>
  );
}

function ActionTile({ title, desc }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 flex items-center justify-between">
      <div>
        <div className="font-semibold text-gray-800">{title}</div>
        <div className="text-xs text-gray-500">{desc}</div>
      </div>
      <div className="w-10 h-10 rounded bg-green-50 flex items-center justify-center">⬤</div>
    </div>
  );
}
