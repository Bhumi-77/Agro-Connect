import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";

import Login from "./Login.jsx";
import Register from "./Register.jsx"; // ✅ ADD THIS
import Dashboard from "./Dashboard.jsx";
import Crops from "./Crops.jsx";
import NewListing from "./NewListing.jsx";
import Demand from "./Demand.jsx";
import Chat from "./Chat.jsx";
import Inventory from "./Inventory.jsx";

import { useTranslation } from "react-i18next";

export default function App() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  useEffect(() => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  }, [lang, i18n]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    navigate("/"); // ✅ go to dashboard after login
  };

  // ✅ simple route guard
  const RequireAuth = ({ children }) => {
    if (!token) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <div className="min-h-screen">
      {token && (
        <nav className="flex items-center justify-between px-4 py-3 bg-white shadow sticky top-0">
          <div className="flex gap-4 items-center">
            <Link to="/" className="font-bold text-green-700">
              FarmLink
            </Link>
            <Link to="/crops" className="text-gray-700">
              {t("crops")}
            </Link>
            <Link to="/new" className="text-gray-700">
              {t("addListing")}
            </Link>
            <Link to="/demand" className="text-gray-700">
              {t("demandBoard")}
            </Link>
            <Link to="/chat" className="text-gray-700">
              {t("chat")}
            </Link>
            <Link to="/inventory" className="text-gray-700">Inventory</Link>

          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "np" : "en")}
              className="px-3 py-1 rounded bg-green-100 text-green-800"
            >
              {t("switchLang")}
            </button>
            <button
              onClick={logout}
              className="px-3 py-1 rounded bg-red-100 text-red-800"
            >
              {t("logout")}
            </button>
          </div>
        </nav>
      )}

      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} onLang={setLang} />} />
        <Route path="/register" element={<Register onLang={setLang} />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/crops"
          element={
            <RequireAuth>
              <Crops />
            </RequireAuth>
          }
        />
        <Route
          path="/new"
          element={
            <RequireAuth>
              <NewListing />
            </RequireAuth>
          }
        />
        <Route
          path="/demand"
          element={
            <RequireAuth>
              <Demand />
            </RequireAuth>
          }
        />
        <Route
          path="/chat"
          element={
            <RequireAuth>
              <Chat />
            </RequireAuth>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace />} />
        <Route path="/inventory" element={<RequireAuth><Inventory /></RequireAuth>} />

      </Routes>
    </div>
  );
}
