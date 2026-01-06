import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Package, Trash2, CheckCircle, Leaf } from 'lucide-react';

const CART_KEY = 'hc_cart';
const PURCHASES_KEY = 'hc_purchases';

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function loadPurchases() {
  try { return JSON.parse(localStorage.getItem(PURCHASES_KEY) || '[]'); } catch (e) { return []; }
}

const Cart = () => {
  const [items, setItems] = useState(loadCart());
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setItems(loadCart());
    window.addEventListener('hc_cart_updated', handler);
    return () => window.removeEventListener('hc_cart_updated', handler);
  }, []);

  const removeItem = (index) => {
    const next = items.slice();
    next.splice(index, 1);
    localStorage.setItem(CART_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('hc_cart_updated'));
    setItems(next);
  };

  const clearCartLocal = () => {
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event('hc_cart_updated'));
    setItems([]);
  };

  const checkout = () => {
    if (items.length === 0) return;
    // move cart items to purchases
    const purchases = loadPurchases();
    const sessionRaw = localStorage.getItem('hc_session');
    let userEmail = null;
    try { userEmail = sessionRaw ? JSON.parse(sessionRaw).email : null; } catch(e){}

    const itemsForPurchase = items.map(it => ({ ...it, purchasedAt: Date.now(), buyer: userEmail }));
    const nextPurchases = [...purchases, ...itemsForPurchase];
    localStorage.setItem(PURCHASES_KEY, JSON.stringify(nextPurchases));
    window.dispatchEvent(new Event('hc_purchases_updated'));

    // clear cart
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event('hc_cart_updated'));
    setItems([]);

    // show confirmation toast and navigate to purchases
    window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: 'Checkout successful — items moved to Purchases', type: 'success' } }));
    navigate('/purchases');
  };

  const total = items.reduce((s, it) => s + (it.price || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50 p-6 flex flex-col">
      <div className="max-w-6xl mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3 text-gray-800">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
              <ShoppingCart size={28} className="text-white" />
            </div>
            Shopping Cart
          </h1>
          <p className="text-gray-600 ml-16">Review your items before checkout</p>
        </div>

        <div className="flex-1">
          {items.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-xl border-2 border-dashed border-gray-300">
              <div className="flex justify-center mb-4">
                <ShoppingCart size={96} className="text-gray-400" />
              </div>
              <div className="text-2xl font-bold mb-2 text-gray-800">Your cart is empty</div>
              <div className="text-gray-600 mb-6">Start adding eco-friendly products!</div>
              <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl font-semibold transition-all transform hover:scale-105 no-underline text-white shadow-lg">
                <Leaf size={20} />
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((it, i) => (
                <div key={i} className="bg-white rounded-xl p-6 flex gap-6 items-center shadow-lg border-2 border-gray-200 hover:border-emerald-300 hover:shadow-xl transition-all">
                  <div className="w-32 h-24 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center rounded-lg overflow-hidden border border-gray-200">
                    {it.image ? <img src={it.image} alt={it.title} className="max-h-20 object-contain" /> : <Package size={48} className="text-gray-400" />}
                  </div>

                  <div className="flex-1">
                    <div className="font-bold text-xl mb-2 text-gray-800">{it.title}</div>
                    <div className="text-sm text-gray-600 mb-1 flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-medium">{it.category}</span>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg font-medium">{it.condition || 'Used'}</span>
                    </div>
                    <div className="text-sm text-gray-500">Seller: {it.seller || 'N/A'}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-bold text-emerald-600 mb-3">₹{it.price}</div>
                    <button onClick={() => removeItem(i)} className="px-5 py-2.5 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-semibold transition-all transform hover:scale-105 flex items-center gap-2 text-white shadow-md">
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 bg-white rounded-2xl p-8 shadow-2xl border-2 border-gray-200">
          <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-gray-200">
            <span className="text-2xl font-bold text-gray-800">Total Amount:</span>
            <span className="text-4xl font-bold text-emerald-600">₹{total}</span>
          </div>
          <div className="flex gap-4">
            <button onClick={checkout} disabled={items.length === 0} className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2 text-white">
              <CheckCircle size={24} />
              Proceed to Checkout
            </button>
            <button onClick={clearCartLocal} disabled={items.length === 0} className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              <Trash2 size={20} />
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
