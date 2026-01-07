import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Package, Trash2, CheckCircle, Leaf, MapPin, Phone, Mail } from 'lucide-react';
import { OrderContext } from '../../context/OrderContext';

const CART_KEY = 'hc_cart';

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

const Cart = () => {
  const [items, setItems] = useState(loadCart());
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'India',
  });
  const navigate = useNavigate();
  const { createOrder, loading } = useContext(OrderContext);

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

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const validateAddress = () => {
    if (!address.street.trim() || !address.city.trim() || !address.state.trim() || !address.postal_code.trim()) {
      window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: 'Please fill all address fields', type: 'error' } }));
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: 'Cart is empty', type: 'error' } }));
      return;
    }

    if (!showAddressForm) {
      setShowAddressForm(true);
      return;
    }

    if (!validateAddress()) return;

    const total = items.reduce((s, it) => s + (it.price || 0), 0);
    const orderData = items.map(item => ({
      _id: item._id || item.id,
      product_title: item.product_title || item.title,
      price: item.price,
      quantity: item.quantity || 1,
      category: item.category,
      seller: item.seller || item.seller_id,
      seller_name: item.seller_name || item.seller,
      image: item.image,
    }));

    const result = await createOrder(orderData, address, total);
    
    if (result) {
      // Clear cart after successful order
      localStorage.removeItem(CART_KEY);
      window.dispatchEvent(new Event('hc_cart_updated'));
      setItems([]);
      setShowAddressForm(false);
      setAddress({ street: '', city: '', state: '', postal_code: '', country: 'India' });
      
      // Navigate to purchases
      navigate('/purchases');
    }
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
                    {it.image ? <img src={it.image} alt={it.product_title || it.title} className="max-h-20 object-contain" /> : <Package size={48} className="text-gray-400" />}
                  </div>

                  <div className="flex-1">
                    <div className="font-bold text-xl mb-2 text-gray-800">{it.product_title || it.title}</div>
                    <div className="text-sm text-gray-600 mb-1 flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-medium">{it.category}</span>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg font-medium">{it.condition || 'Used'}</span>
                    </div>
                    <div className="text-sm text-gray-500">Seller: {it.seller_name || it.seller || 'N/A'}</div>
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

        {items.length > 0 && (
          <>
            {showAddressForm && (
              <div className="mt-8 bg-white rounded-2xl p-8 shadow-2xl border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-gray-200">
                  <MapPin className="text-emerald-600" size={28} />
                  <h2 className="text-2xl font-bold text-gray-800">Delivery Address</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address *</label>
                    <input
                      type="text"
                      name="street"
                      value={address.street}
                      onChange={handleAddressChange}
                      placeholder="House no. & Street name"
                      className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleAddressChange}
                      placeholder="City"
                      className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={address.state}
                      onChange={handleAddressChange}
                      placeholder="State"
                      className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Postal Code *</label>
                    <input
                      type="text"
                      name="postal_code"
                      value={address.postal_code}
                      onChange={handleAddressChange}
                      placeholder="PIN Code"
                      className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={address.country}
                      onChange={handleAddressChange}
                      className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 bg-white rounded-2xl p-8 shadow-2xl border-2 border-gray-200">
              <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-gray-200">
                <span className="text-2xl font-bold text-gray-800">Total Amount:</span>
                <span className="text-4xl font-bold text-emerald-600">₹{total}</span>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={handleCheckout} 
                  disabled={items.length === 0 || loading}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2 text-white"
                >
                  <CheckCircle size={24} />
                  {loading ? 'Processing...' : showAddressForm ? 'Complete Order' : 'Proceed to Checkout'}
                </button>
                <button 
                  onClick={clearCartLocal} 
                  disabled={items.length === 0}
                  className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Trash2 size={20} />
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;


