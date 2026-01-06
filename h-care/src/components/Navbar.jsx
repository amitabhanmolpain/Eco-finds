import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, Leaf, Package } from 'lucide-react';
import products from '../constants/products';

const LISTINGS_KEY = 'hc_listings';

function loadListings() {
  try {
    return JSON.parse(localStorage.getItem(LISTINGS_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cartCount, setCartCount] = useState(() => {
    try {
      const raw = localStorage.getItem('hc_cart');
      const arr = raw ? JSON.parse(raw) : [];
      return arr.length;
    } catch (e) {
      return 0;
    }
  });

  useEffect(() => {
    const handler = () => {
      try {
        const raw = localStorage.getItem('hc_cart');
        const arr = raw ? JSON.parse(raw) : [];
        setCartCount(arr.length);
      } catch (e) {
        setCartCount(0);
      }
    };
    window.addEventListener('hc_cart_updated', handler);
    return () => window.removeEventListener('hc_cart_updated', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Local search (no API calls)
    const allProducts = [...products, ...loadListings()];
    const results = allProducts.filter(p => 
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
    setShowResults(true);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
              <Leaf className="text-white" size={24} />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">EcoFinds</div>
          </Link>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="flex items-center bg-gray-50 border border-gray-300 rounded-lg overflow-hidden hover:border-emerald-500 transition-all focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
                placeholder="Search products, furniture, electronics..."
              />
              <button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-5 py-2.5 font-semibold text-white transition-all duration-200 flex items-center gap-2">
                <Search size={18} />
                <span className="hidden sm:inline">Search</span>
              </button>
            </form>
          </div>

          {/* Right: Cart and Profile */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link to="/cart" aria-label="Go to cart" className="relative text-gray-700 hover:text-emerald-600 transition-all">
              <ShoppingCart size={28} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/profile" aria-label="Go to profile" className="inline-block group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Enhanced Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-2xl z-50 max-h-96 overflow-y-auto border-t-2 border-emerald-500">
          <div className="max-w-7xl mx-auto px-4 py-2">
            {searchResults.slice(0, 10).map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="block p-4 hover:bg-emerald-50 border-b border-gray-100 text-gray-800 no-underline transition-all rounded-lg my-1"
                onClick={() => setShowResults(false)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center shadow-sm">
                    {product.image ? (
                      <img src={product.image} alt={product.title} className="max-h-14 max-w-14 object-contain" />
                    ) : (
                      <Package size={32} className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{product.title}</div>
                    <div className="text-sm text-emerald-600 font-medium">₹{product.price} • <span className="text-gray-500">{product.category}</span></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
