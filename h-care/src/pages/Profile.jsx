import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, ArrowLeft, Edit, Settings, FileText, Package, LogOut } from 'lucide-react';
import { currentUser, logout } from '../utils/auth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await currentUser();
      if (userData) {
        setUser(userData);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: 'Logged out successfully!', type: 'success' } }));
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <header className="flex items-center justify-between mb-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <User size={32} />
          My Profile
        </h1>
        <Link to="/home" className="text-sm text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </header>

      <div className="max-w-4xl mx-auto">
        <section className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 mb-6 shadow-2xl border border-gray-700">
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl ring-4 ring-emerald-500/20">
              <User size={64} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{user?.display_name || user?.username || 'User'}</h2>
              <p className="text-emerald-400 mb-4">{user?.email || 'user@example.com'}</p>
              <div className="flex gap-3 flex-wrap">
                <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
                  <Edit size={16} />
                  Edit Profile
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-all flex items-center gap-2">
                  <Settings size={16} />
                  Settings
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-all flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Settings size={24} />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/my-listings" className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 rounded-xl text-left no-underline transition-all transform hover:scale-[1.02] shadow-lg group">
              <div className="flex items-center gap-3 mb-2">
                <FileText size={32} />
              </div>
              <div className="font-bold text-lg mb-1">My Listings</div>
              <div className="text-sm text-blue-100">View and manage your products</div>
            </Link>
            <Link to="/purchases" className="p-6 bg-gradient-to-br from-purple-600 to-pink-700 hover:from-purple-700 hover:to-pink-800 rounded-xl text-left no-underline transition-all transform hover:scale-[1.02] shadow-lg group">
              <div className="flex items-center gap-3 mb-2">
                <Package size={32} />
              </div>
              <div className="font-bold text-lg mb-1">My Purchases</div>
              <div className="text-sm text-purple-100">Track your order history</div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
