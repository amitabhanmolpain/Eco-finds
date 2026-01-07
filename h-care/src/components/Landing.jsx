import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Leaf, Target, Flame, Star, ShoppingCart, CheckCircle, Sparkles, Package, UserPlus, TrendingUp, ArrowRight } from 'lucide-react';
import Navbar from "./Navbar";
import BannerCarousel from './BannerCarousel';
import productsData from '../constants/products';
import { getCategoryImage, CATEGORY_IMAGES } from '../utils/categoryImages';

const CART_KEY = "hc_cart";
const LISTINGS_KEY = 'hc_listings';

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function loadListings() {
  try {
    return JSON.parse(localStorage.getItem(LISTINGS_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

const LandingPage = () => {
  const [cart, setCart] = useState(loadCart());
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products from constants and localStorage (no API calls)
  useEffect(() => {
    const allProducts = [...productsData, ...loadListings()];
    setProducts(allProducts);
    setLoading(false);
  }, []);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const addToCart = (p) => {
    setCart((c) => {
      const next = [...c, p];
      try {
        localStorage.setItem('hc_cart', JSON.stringify(next));
        window.dispatchEvent(new Event('hc_cart_updated'));
        // custom toast event
        window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: `${p.title} added to cart`, type: 'success' } }));
      } catch (e) {}
      return next;
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen font-sans pt-4">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-xl">Loading products...</div>
        </div>
      </div>
    );
  }

  // For demo purposes, create categories from available products
  const categories = Object.entries(CATEGORY_IMAGES).map(([name, image]) => ({
    id: name,
    name: name,
    image: image
  }));

  // Curated sections - simple approach for integration
  const recentProducts = products.slice(0, 6);
  const trending = recentProducts.slice(0, 3);
  const featured = recentProducts.slice(3, 6);

  // Eco points demo: 100 points per purchase
  const ecoPoints = cart.length * 100;

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50 text-gray-900 min-h-screen font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Hero / Banner */}
        <section className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl p-8 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-sm font-semibold mb-4 text-white">
                <Sparkles size={16} />
                Sustainable Shopping
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-white">EcoFinds — Affordable essentials for students</h1>
              <p className="text-lg text-white/95 mb-6">Starter packs, second-hand furniture, books and electronics — curated for students and newcomers.</p>
              <div className="flex gap-4 flex-wrap">
                <button className="bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
                  <ShoppingCart size={20} />
                  Shop Starter Packs
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all backdrop-blur-sm flex items-center gap-2">
                  <Leaf size={20} />
                  Learn More
                </button>
              </div>
            </div>

            <div className="w-full md:w-64 bg-white rounded-2xl p-6 shadow-xl">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                    <Leaf size={32} className="text-white" />
                  </div>
                </div>
                <div className="text-xl font-semibold mb-1 text-gray-800">Eco Points</div>
                <div className="text-4xl font-bold mb-2 text-emerald-600">{ecoPoints}</div>
                <div className="text-sm text-gray-600">You saved ₹{ecoPoints * 10}</div>
                <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">Keep shopping to earn more!</div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Category Slider */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
            <Target size={28} className="text-emerald-600" />
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((c) => (
              <Link 
                key={c.id} 
                to={`/category/${encodeURIComponent(c.name)}`} 
                className="bg-white rounded-xl p-4 text-center no-underline hover:shadow-xl transition-all transform hover:scale-[1.02] border border-gray-200"
              >
                <div className="w-full h-28 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                  <img src={c.image} alt={c.name} className="max-h-24 object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-sm font-semibold text-gray-800 capitalize">{c.name.replace('_', ' ')}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Enhanced Trending Products */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
            <Flame size={28} className="text-red-500" />
            Trending Now
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trending.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="bg-white rounded-xl overflow-hidden flex flex-col no-underline hover:shadow-xl transition-all transform hover:scale-[1.02] border border-gray-200">
                <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden group">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="max-h-44 object-contain group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <Package size={64} className="text-gray-300" />
                  )}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1 shadow-md">
                    <Flame size={14} />
                    Hot
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="font-bold text-gray-800 text-lg mb-1">{p.title}</div>
                  <div className="text-emerald-600 font-bold text-xl mb-2">₹{p.price}</div>
                  <div className="text-xs text-gray-500 mb-3 inline-block px-2 py-1 bg-gray-100 rounded-full w-fit">{p.category}</div>
                  <div className="mt-auto flex items-center justify-between gap-2">
                    <button onClick={(e) => { e.preventDefault(); addToCart(p); }} className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-white shadow-md">
                      <ShoppingCart size={18} />
                      Add
                    </button>
                    <div className="text-xs text-emerald-600 font-semibold px-3 py-2 bg-emerald-50 rounded-lg flex items-center gap-1">
                      <CheckCircle size={14} />
                      Available
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Banner Carousel between sections */}
        <section className="mb-6">
          <BannerCarousel />
        </section>

        {/* Enhanced Featured Products */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
            <Star size={28} className="text-amber-500" />
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="bg-white rounded-xl overflow-hidden flex flex-col no-underline hover:shadow-xl transition-all transform hover:scale-[1.02] border border-gray-200">
                <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden group">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="max-h-44 object-contain group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <Package size={64} className="text-gray-300" />
                  )}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1 shadow-md">
                    <Star size={14} />
                    Featured
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="font-bold text-gray-800 text-lg mb-1">{p.title}</div>
                  <div className="text-emerald-600 font-bold text-xl mb-2">₹{p.price}</div>
                  <div className="text-xs text-gray-500 mb-3 inline-block px-2 py-1 bg-gray-100 rounded-full w-fit">{p.category}</div>
                  <div className="mt-auto flex items-center justify-between gap-2">
                    <button onClick={(e) => { e.preventDefault(); addToCart(p); }} className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 text-white flex items-center justify-center gap-2 shadow-md">
                      <ShoppingCart size={18} />
                      Add
                    </button>
                    <div className="text-xs text-blue-600 font-semibold px-3 py-2 bg-blue-50 rounded-lg flex items-center gap-1">
                      <Sparkles size={14} />
                      Featured
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Membership & Seller Benefits Banner */}
        <section className="mt-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Join as Member Banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-2xl p-8 shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <UserPlus size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Join as a Member</h3>
                </div>
                
                <p className="text-white/90 mb-6 text-lg">Receive exclusive benefits and be part of our eco-friendly community</p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-white/95">
                    <CheckCircle size={20} className="text-emerald-300" />
                    <span>Early access to new products</span>
                  </li>
                  <li className="flex items-center gap-2 text-white/95">
                    <CheckCircle size={20} className="text-emerald-300" />
                    <span>Exclusive member discounts</span>
                  </li>
                  <li className="flex items-center gap-2 text-white/95">
                    <CheckCircle size={20} className="text-emerald-300" />
                    <span>Earn eco points faster</span>
                  </li>
                  <li className="flex items-center gap-2 text-white/95">
                    <CheckCircle size={20} className="text-emerald-300" />
                    <span>Priority customer support</span>
                  </li>
                </ul>
                
                <Link to="/signup" className="inline-flex items-center gap-2 bg-white text-purple-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg no-underline">
                  Join Now
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            {/* List Your Products Banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-8 shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <TrendingUp size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">List Your Products</h3>
                </div>
                
                <p className="text-white/90 mb-6 text-lg">Start selling on EcoFinds and reach thousands of eco-conscious buyers</p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-white/95">
                    <CheckCircle size={20} className="text-amber-300" />
                    <span>Zero listing fees</span>
                  </li>
                  <li className="flex items-center gap-2 text-white/95">
                    <CheckCircle size={20} className="text-amber-300" />
                    <span>Reach local students & newcomers</span>
                  </li>
                  <li className="flex items-center gap-2 text-white/95">
                    <CheckCircle size={20} className="text-amber-300" />
                    <span>Easy product management</span>
                  </li>
                  <li className="flex items-center gap-2 text-white/95">
                    <CheckCircle size={20} className="text-amber-300" />
                    <span>Promote sustainability together</span>
                  </li>
                </ul>
                
                <Link to="/add-listing" className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg no-underline">
                  Start Selling
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
