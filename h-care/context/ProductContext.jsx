import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Get all products with optional filters
  const getAllProducts = async (filters = {}) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filters).toString();
      const { data } = await axios.get(`${backendUrl}/api/products?${queryParams}`);

      if (data.success) {
        setProducts(data.data);
        return data;
      } else {
        toast.error(data.error || "Failed to fetch products");
        return null;
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch products");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get product by ID
  const getProductById = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/products/${id}`);

      if (data.success) {
        setCurrentProduct(data.data);
        return data.data;
      } else {
        toast.error(data.error || "Product not found");
        return null;
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch product");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Search products
  const searchProducts = async (query) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/products/search?q=${query}`);

      if (data.success) {
        setProducts(data.data);
        return data.data;
      } else {
        toast.error(data.error || "Search failed");
        return [];
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Search failed");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Get current user's products (listings)
  const getUserProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const { data } = await axios.get(`${backendUrl}/api/products/user/my-products`, {
        headers: {
          token: token,
        },
      });

      if (data.success) {
        return data.data;
      } else {
        toast.error(data.error || "Failed to fetch products");
        return [];
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch products");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Get products by category
  const getProductsByCategory = async (category) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/products/category/${category}`);

      if (data.success) {
        setProducts(data.data);
        return data.data;
      } else {
        toast.error(data.error || "Failed to fetch products");
        return [];
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch products");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Create new product (requires auth)
  const createProduct = async (productData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const { data } = await axios.post(`${backendUrl}/api/products`, productData, {
        headers: {
          token: token,
        },
      });

      if (data.success) {
        toast.success(data.message || "Product created successfully");
        // Refresh products list
        await getAllProducts();
        return data.data;
      } else {
        toast.error(data.error || "Failed to create product");
        return null;
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create product");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update product (requires auth)
  const updateProduct = async (id, productData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const { data } = await axios.put(`${backendUrl}/api/products/${id}`, productData, {
        headers: {
          token: token,
        },
      });

      if (data.success) {
        toast.success(data.message || "Product updated successfully");
        // Update current product if it's the same
        if (currentProduct?._id === id) {
          setCurrentProduct(data.data);
        }
        // Refresh products list
        await getAllProducts();
        return data.data;
      } else {
        toast.error(data.error || "Failed to update product");
        return null;
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update product");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update product status (requires auth)
  const updateProductStatus = async (id, status) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const { data } = await axios.patch(
        `${backendUrl}/api/products/${id}/status`,
        { status },
        {
          headers: {
            token: token,
          },
        }
      );

      if (data.success) {
        toast.success(data.message || "Status updated successfully");
        // Update current product if it's the same
        if (currentProduct?._id === id) {
          setCurrentProduct(data.data);
        }
        // Refresh products list
        await getAllProducts();
        return data.data;
      } else {
        toast.error(data.error || "Failed to update status");
        return null;
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update status");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete product (requires auth)
  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const { data } = await axios.delete(`${backendUrl}/api/products/${id}`, {
        headers: {
          token: token,
        },
      });

      if (data.success) {
        toast.success(data.message || "Product deleted successfully");
        // Remove from products list
        setProducts((prev) => prev.filter((p) => p._id !== id));
        if (currentProduct?._id === id) {
          setCurrentProduct(null);
        }
        return true;
      } else {
        toast.error(data.error || "Failed to delete product");
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to delete product");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load all products on mount
  useEffect(() => {
    getAllProducts();
  }, []);

  const value = {
    products,
    loading,
    currentProduct,
    getAllProducts,
    getProductById,
    searchProducts,
    getProductsByCategory,
    getUserProducts,
    createProduct,
    updateProduct,
    updateProductStatus,
    deleteProduct,
    setCurrentProduct,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
