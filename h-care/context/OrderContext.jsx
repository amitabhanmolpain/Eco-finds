import React, { createContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  // Create a new order
  const createOrder = async (cartItems, address, totalAmount) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('You must be logged in to place an order');
        return false;
      }

      const response = await axios.post(`${backendUrl}/api/orders`, {
        items: cartItems,
        address,
        total_amount: totalAmount,
      }, {
        headers: {
          token: token,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        toast.success('Order placed successfully!');
        return response.data.data;
      } else {
        toast.error(response.data.error || 'Failed to create order');
        return false;
      }
    } catch (error) {
      console.error('Create order error:', error);
      toast.error(error.response?.data?.error || error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get user's orders
  const getUserOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        return [];
      }

      const response = await axios.get(`${backendUrl}/api/orders/my-orders`, {
        headers: {
          token: token,
        },
      });

      if (response.data.success) {
        setOrders(response.data.data);
        return response.data.data;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Get orders error:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Get single order by ID
  const getOrderById = async (orderId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        return null;
      }

      const response = await axios.get(`${backendUrl}/api/orders/${orderId}`, {
        headers: {
          token: token,
        },
      });

      if (response.data.success) {
        setCurrentOrder(response.data.data);
        return response.data.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Get order error:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Cancel an order
  const cancelOrder = async (orderId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('You must be logged in');
        return false;
      }

      const response = await axios.patch(`${backendUrl}/api/orders/${orderId}/cancel`, {}, {
        headers: {
          token: token,
        },
      });

      if (response.data.success) {
        toast.success('Order cancelled successfully');
        // Refresh orders list
        await getUserOrders();
        return true;
      } else {
        toast.error(response.data.error || 'Failed to cancel order');
        return false;
      }
    } catch (error) {
      console.error('Cancel order error:', error);
      toast.error(error.response?.data?.error || error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    orders,
    loading,
    currentOrder,
    createOrder,
    getUserOrders,
    getOrderById,
    cancelOrder,
    setCurrentOrder,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
