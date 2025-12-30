import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const API = import.meta.env.VITE_API || 'http://localhost:4000';

export default function Login({ onLogin, onLang }) {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('farmer@example.com');
  const [password, setPassword] = useState('password');
  const [role, setRole] = useState('farmer');
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      const { data } = await axios.post(`${API}/api/auth/login`, { email, password });
      localStorage.setItem('token', data.token);
      onLogin(data.token);
      // Optional: Redirect based on role
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'buyer') {
        navigate('/marketplace');
      } else {
        navigate('/');
      }
    } catch (e) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-green-800 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="flex max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Left Side - Welcome Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-green-700 text-white">
          {/* Logo Placeholder */}
          <div className="mb-6 flex items-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
              <span className="text-green-700 font-bold text-xl">K</span>
            </div>
            <h1 className="text-xl font-bold">Krishi Connect</h1>
          </div>

          {/* Welcome Message */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4">
              {/* Simple leaf logo placeholder */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-2-2 1.41-1.41L10 14.17l6-6L17.41 9.58z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Welcome to Krishi Connect</h2>
            <p className="text-sm opacity-90">
              Connecting farmers directly to markets. Eliminate middlemen, maximize profits, and grow your agricultural business with modern digital solutions.
            </p>
          </div>

          {/* Decorative flowers */}
          <div className="absolute top-10 left-8 opacity-20">
            <svg width="40" height="40" fill="currentColor" className="text-white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-2-2 1.41-1.41L10 14.17l6-6L17.41 9.58z" />
            </svg>
          </div>
          <div className="absolute bottom-10 right-8 opacity-20">
            <svg width="40" height="40" fill="currentColor" className="text-white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-2-2 1.41-1.41L10 14.17l6-6L17.41 9.58z" />
            </svg>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-6 flex items-center">
            <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center mr-3">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-2-2 1.41-1.41L10 14.17l6-6L17.41 9.58z" />
              </svg>
            </div>
            <h1 className="text-lg font-bold text-green-700">Krishi Connect</h1>
          </div>

          <h2 className="text-xl font-bold mb-1 text-gray-800">Login to Your Account</h2>
          <p className="text-sm text-gray-600 mb-6">Select your role and enter your credentials</p>

          {/* Role Selection Buttons */}
          <div className="flex gap-2 mb-6">
            {['farmer', 'buyer', 'admin'].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  role === r
                    ? 'bg-green-600 text-white'
                    : 'bg-white border border-green-300 text-green-700 hover:bg-green-50'
                }`}
              >
                {r === 'farmer' && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-2-2 1.41-1.41L10 14.17l6-6L17.41 9.58z" />
                  </svg>
                )}
                {r === 'buyer' && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-2-2 1.41-1.41L10 14.17l6-6L17.41 9.58z" />
                  </svg>
                )}
                {r === 'admin' && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-2-2 1.41-1.41L10 14.17l6-6L17.41 9.58z" />
                  </svg>
                )}
                {t(r)}
              </button>
            ))}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input id="remember" type="checkbox" className="mr-2" />
              <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
            </div>
            <button className="text-sm text-green-600 hover:text-green-700">Forgot Password?</button>
          </div>

          {/* Login Button */}
          <button
            onClick={signIn}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg py-2 transition"
          >
            Login
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-sm text-center text-gray-600">
  Don't have an account?{' '}
  <button
    onClick={() => navigate('/register')}
    className="text-green-600 hover:text-green-700 font-medium"
  >
    Sign Up
  </button>
</p>

          {/* Language Switcher */}
          <div className="mt-6 text-right">
            <button
              onClick={() => onLang(i18n.language === 'en' ? 'np' : 'en')}
              className="text-xs px-3 py-1 rounded bg-green-100 text-green-800 font-medium hover:bg-green-200 transition"
            >
              {i18n.language === 'en' ? 'नेपाली' : 'English'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}