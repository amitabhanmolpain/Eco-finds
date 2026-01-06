import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Plus, ArrowLeft, Leaf, Tag } from 'lucide-react';

const LISTINGS_KEY = 'hc_listings';

function loadListings() {
  try {
    return JSON.parse(localStorage.getItem(LISTINGS_KEY) || '[]');
  } catch (e) { return []; }
}

const MyListings = () => {
  const [listings, setListings] = useState(loadListings());

  useEffect(() => {
    const handler = () => setListings(loadListings());
    window.addEventListener('hc_listings_updated', handler);
    return () => window.removeEventListener('hc_listings_updated', handler);
  }, []);

  const myEmail = (() => {
    try {
      const s = localStorage.getItem('hc_session');
      return s ? JSON.parse(s).email : null;
    } catch (e) { return null; }
  })();

  const mine = listings.filter(l => l.seller === myEmail);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="text-emerald-600" size={28} />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">EcoFinds</span>
          </div>
          <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors">
            <ArrowLeft size={20} />
            <span>Back to Profile</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
              <Package className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Listings</h1>
              <p className="text-gray-600 mt-1">Manage your products</p>
            </div>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add new listing card */}
        <Link to="/add-listing" className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-dashed border-emerald-300 rounded-xl p-8 flex flex-col items-center justify-center hover:from-emerald-100 hover:to-teal-100 hover:border-emerald-400 transition-all no-underline group">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus className="text-white" size={32} />
          </div>
          <div className="text-lg font-semibold text-gray-800">Add New Listing</div>
          <div className="text-sm text-gray-600 mt-1">List your product</div>
        </Link>

        {mine.length === 0 ? (
          <div className="col-span-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
            <Package className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No listings yet</h3>
            <p className="text-gray-600 mb-6">Start adding your products to the marketplace</p>
            <Link to="/add-listing" className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg transition-all shadow-md">
              Add Your First Item
            </Link>
          </div>
        ) : (
          mine.map((l, i) => (
            <div key={i} className="bg-white border-2 border-gray-200 p-6 rounded-xl hover:shadow-lg transition-all">
              <div className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center mb-4">
                {l.image ? (
                  <img src={l.image} className="max-h-44 max-w-full object-contain" alt={l.title} />
                ) : (
                  <Package className="text-gray-400" size={64} />
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{l.title}</h3>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg font-semibold text-sm flex items-center gap-1">
                    <Tag size={14} />
                    ₹{l.price}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">{l.category}</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm">{l.status || 'Available'}</span>
                </div>
              </div>
            </div>
          ))
        )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default MyListings;
