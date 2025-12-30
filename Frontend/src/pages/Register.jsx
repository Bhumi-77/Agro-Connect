// src/pages/Register.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const API = import.meta.env.VITE_API || 'http://localhost:4000';

export default function Register({ onLang }) {
  const { t, i18n } = useTranslation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('9800000000');
  const [district, setDistrict] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('farmer');
  const navigate = useNavigate();

  const districts = [
    'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Chitwan', 'Pokhara', 'Dharan',
    'Nepalgunj', 'Butwal', 'Hetauda', 'Janakpur', 'Dhangadhi', 'Ilam'
  ];

  const handleRegister = async () => {
    try {
      const location = {
        address: municipality,
        district: district,
        province: '', // Optional: you can auto-fill based on district
        lat: 0, // Optional: use geocoding later
        lng: 0
      };

      const response = await axios.post(`${API}/api/auth/register`, {
        name: `${firstName} ${lastName}`,
        email,
        password,
        role,
        phone,
        location,
        language: i18n.language
      });

      alert('Account created successfully!');
      navigate('/login'); // Redirect to login after successful registration

    } catch (e) {
      alert(e.response?.data?.error || 'Registration failed. Please try again.');
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
            <h2 className="text-2xl font-bold mb-4">Join Krishi Connect</h2>
            <p className="text-sm opacity-90 mb-6">
              Connect with thousands of farmers and buyers across Nepal
            </p>

            {/* Benefits List */}
            <div className="space-y-3 text-left">
              {[
                'Direct market access without middlemen',
                'AI-powered price predictions',
                'Secure payment options',
                'Real-time chat with buyers/sellers',
                'Location-based search'
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 py-2 px-3 bg-white/20 rounded-md">
                  <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414l3.293 3.293a1 1 0 011.414 0l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
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

        {/* Right Side - Registration Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-6 flex items-center">
            <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center mr-3">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-2-2 1.41-1.41L10 14.17l6-6L17.41 9.58z" />
              </svg>
            </div>
            <h1 className="text-lg font-bold text-green-700">Krishi Connect</h1>
          </div>

          <h2 className="text-xl font-bold mb-1 text-gray-800">Create Your Account</h2>
          <p className="text-sm text-gray-600 mb-6">Select your role and fill in your details</p>

          {/* Role Selection Buttons */}
          <div className="flex gap-2 mb-6">
            {['farmer', 'buyer'].map((r) => (
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
                {t(r)}
              </button>
            ))}
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter last name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              type="email"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <div className="flex gap-2">
              <select className="border border-gray-300 rounded-lg px-3 py-2 w-20 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>+977</option>
              </select>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="9800000000"
                type="tel"
              />
            </div>
          </div>

          {/* District & Municipality */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select District</option>
                {districts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Municipality *</label>
              <input
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter municipality"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg py-2 transition"
          >
            Register
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Login Link */}
          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Login
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