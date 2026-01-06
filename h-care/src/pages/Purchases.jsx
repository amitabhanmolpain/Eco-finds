import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowLeft, Search, ShoppingBag, Leaf } from 'lucide-react';

const PURCHASES_KEY = 'hc_purchases';

function loadPurchases() {
  try {
    return JSON.parse(localStorage.getItem(PURCHASES_KEY) || '[]');
  } catch (e) { return []; }
}

const Purchases = () => {
  const [purchases, setPurchases] = useState(loadPurchases());

  useEffect(() => {
    const handler = () => setPurchases(loadPurchases());
    window.addEventListener('hc_purchases_updated', handler);
    return () => window.removeEventListener('hc_purchases_updated', handler);
  }, []);

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
              <ShoppingBag className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Previous Purchases</h1>
              <p className="text-gray-600 mt-1">Track your order history</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input placeholder="Search purchases..." className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-gray-800" />
            </div>
          </div>

      {purchases.length === 0 ? (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
          <Package className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No purchases yet</h3>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
          <Link to="/" className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg transition-all shadow-md">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {purchases.map((p, i) => (
            <div key={i} className="bg-white border-2 border-gray-200 p-6 rounded-xl hover:shadow-lg transition-all flex gap-6 items-center">
              <div className="w-28 h-28 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="max-h-24 max-w-24 object-contain" />
                ) : (
                  <Package className="text-gray-400" size={48} />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800 mb-2">{p.title}</h3>
                <div className="flex items-center gap-3 text-sm mb-2">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg font-semibold">₹{p.price}</span>
                  <span className="text-gray-600">{p.category}</span>
                </div>
                <div className="text-sm text-gray-500">Seller: {p.seller || 'N/A'}</div>
              </div>
              <div className="flex-shrink-0">
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold text-sm">Completed</span>
              </div>
            </div>
          ))}
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default Purchases;
