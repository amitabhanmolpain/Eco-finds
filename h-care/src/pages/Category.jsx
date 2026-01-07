import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Package, Leaf, Tag, Trash2, Edit2 } from 'lucide-react';
import { ProductContext } from '../../context/ProductContext';
import { getCategoryImage } from '../utils/categoryImages';

const Category = () => {
  const { name } = useParams();
  const { getProductsByCategory, loading } = useContext(ProductContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!name) return;
      
      const decodedName = decodeURIComponent(name);
      const results = await getProductsByCategory(decodedName);
      setItems(results || []);
    };
    
    fetchCategoryProducts();
  }, [name]);

  const addToCart = (p) => {
    try {
      const raw = localStorage.getItem('hc_cart') || '[]';
      const cart = JSON.parse(raw);
      cart.push(p);
      localStorage.setItem('hc_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('hc_cart_updated'));
      window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: `${p.product_title} added to cart`, type: 'success' } }));
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="text-emerald-600" size={28} />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">EcoFinds</span>
          </div>
          <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
              <Tag size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 capitalize">Category: {decodeURIComponent(name).replace('_', ' ')}</h1>
              <p className="text-gray-600 mt-1">Showing up to 10 items related to {decodeURIComponent(name).replace('_', ' ')}</p>
            </div>
          </div>
        </div>

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl p-12 text-center shadow-xl border-2 border-dashed border-gray-300">
            <Package className="mx-auto text-gray-400 mb-4" size={64} />
            <div className="text-xl font-semibold text-gray-800 mb-2">No items found</div>
            <div className="text-gray-600">No products available in this category.</div>
          </div>
        )}

        {items.map(p => (
          <div key={p._id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all transform hover:scale-[1.02] flex flex-col">
            <Link to={`/product/${p._id}`} className="no-underline text-inherit flex-1 flex flex-col">
              <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden group">
                {p.image ? (
                  <img src={p.image} alt={p.product_title} className="max-h-44 object-contain group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <img src={getCategoryImage(p.category)} alt={p.category} className="max-h-44 object-cover group-hover:scale-110 transition-transform duration-300" />
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="font-bold text-gray-800 text-lg mb-2">{p.product_title}</div>
                <div className="text-emerald-600 font-bold text-xl mb-2">₹{p.price}</div>
                <div className="text-xs text-gray-500 mb-3 inline-block px-2 py-1 bg-gray-100 rounded-full w-fit capitalize">{p.category?.replace('_', ' ')}</div>
              </div>
            </Link>
            <div className="px-4 pb-4">
              <button 
                onClick={() => addToCart(p)} 
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-4 py-2.5 rounded-lg font-semibold transition-all transform hover:scale-105 text-white flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </main>
      </div>
    </div>
  );
};

export default Category;
