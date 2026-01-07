import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowLeft, Search, ShoppingBag, Leaf, MapPin, Calendar, X } from 'lucide-react';
import { OrderContext } from '../../context/OrderContext';

const Purchases = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { orders, loading, getUserOrders } = useContext(OrderContext);

  useEffect(() => {
    getUserOrders();
  }, []);

  const filteredOrders = orders.filter(order =>
    order.buyer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items?.some(item => item.product_title?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Confirmed': return 'bg-blue-100 text-blue-700';
      case 'Shipped': return 'bg-purple-100 text-purple-700';
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
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
              <input 
                placeholder="Search purchases..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-gray-800" 
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-gray-600">Loading your orders...</div>
            </div>
          ) : filteredOrders.length === 0 ? (
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
              {filteredOrders.map((order) => (
                <div key={order._id} className="bg-white border-2 border-gray-200 rounded-xl hover:shadow-lg transition-all">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Order #{order._id?.slice(-8).toUpperCase()}</div>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600">
                            <Calendar size={16} className="inline mr-2" />
                            {formatDate(order.order_date)}
                          </span>
                          <span className={`px-3 py-1 rounded-lg font-semibold text-sm ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-600">₹{order.total_amount}</div>
                        <div className="text-sm text-gray-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            {item.image ? (
                              <img src={item.image} alt={item.product_title} className="max-h-14 object-contain" />
                            ) : (
                              <Package size={32} className="text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{item.product_title}</h4>
                            <div className="flex gap-2 mt-1">
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{item.category}</span>
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Qty: {item.quantity}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-emerald-600">₹{item.price}</div>
                            <div className="text-xs text-gray-500">by {item.seller_name}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {order.address && (
                      <button 
                        onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                        className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2"
                      >
                        <MapPin size={16} />
                        {selectedOrder?._id === order._id ? 'Hide' : 'Show'} Delivery Address
                      </button>
                    )}
                  </div>

                  {selectedOrder?._id === order._id && order.address && (
                    <div className="border-t border-gray-200 bg-gray-50 p-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Delivery Address</h4>
                          <div className="text-gray-700 text-sm space-y-1">
                            <div>{order.address.street}</div>
                            <div>{order.address.city}, {order.address.state} {order.address.postal_code}</div>
                            <div>{order.address.country}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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