import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, ArrowLeft, ShoppingCart, Tag, User as UserIcon, Sparkles } from 'lucide-react';
import { ProductContext } from '../../context/ProductContext';
import { getCategoryImage } from '../utils/categoryImages';

const Product = () => {
  const { id } = useParams();
  const { getProductById, products: relatedProducts, getAllProducts } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const data = await getProductById(id);
      
      if (data) {
        setProduct(data);
        setError(null);
      } else {
        setError('Product not found');
      }
      setLoading(false);
    };

    fetchProduct();
    // Also fetch all products for related items
    getAllProducts();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50 p-6 flex items-center justify-center">
        <div className="text-xl text-gray-700">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50 p-6 flex items-center justify-center">
        <div className="text-xl text-red-600">Product not found</div>
      </div>
    );
  }

  const addToCart = () => {
    try {
      const raw = localStorage.getItem('hc_cart');
      const arr = raw ? JSON.parse(raw) : [];
      arr.push(product);
      localStorage.setItem('hc_cart', JSON.stringify(arr));
      window.dispatchEvent(new Event('hc_cart_updated'));
      window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: `${product.product_title || product.title} added to cart`, type: 'success' } }));
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
              <Package size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">EcoFinds</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        <button 
          onClick={() => window.history.back()} 
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-semibold transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center mb-6">
              {product.image ? (
                <img src={product.image} alt={product.product_title || product.title} className="max-h-88 max-w-full object-contain" />
              ) : (
                <img src={getCategoryImage(product.category)} alt={product.category} className="max-h-88 max-w-full object-cover" />
              )}
            </div>
            <div className="flex justify-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="w-2 h-2 bg-gray-300 rounded-full" />
              <span className="w-2 h-2 bg-gray-300 rounded-full" />
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.product_title || product.title}</h1>
            
            <div className="mb-6">
              <div className="text-4xl font-bold text-emerald-600 mb-4">₹{product.price}</div>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg flex items-center gap-2 font-semibold border border-emerald-200">
                  <Tag size={16} />
                  {product.category}
                </span>
                {product.condition && (
                  <span className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg flex items-center gap-2 font-semibold border border-blue-200">
                    <Sparkles size={16} />
                    {product.condition}
                  </span>
                )}
                {product.status && (
                  <span className={`px-3 py-2 rounded-lg flex items-center gap-2 font-semibold border ${
                    product.status === 'Available' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    <Package size={16} />
                    {product.status}
                  </span>
                )}
                {product.quantity && (
                  <span className="bg-gray-50 text-gray-700 px-3 py-2 rounded-lg flex items-center gap-2 font-semibold border border-gray-200">
                    Quantity: {product.quantity}
                  </span>
                )}
              </div>
            </div>

            {/* Product Description */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Description</h3>
              <div className="text-gray-600 leading-relaxed">
                {product.description || "This is a quality product in good condition. Perfect for students and anyone looking for affordable options."}
              </div>
            </div>

            {/* Additional Details */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {product.brand && (
                  <div>
                    <span className="text-gray-500 font-medium">Brand:</span>
                    <span className="ml-2 text-gray-800">{product.brand}</span>
                  </div>
                )}
                {product.model && (
                  <div>
                    <span className="text-gray-500 font-medium">Model:</span>
                    <span className="ml-2 text-gray-800">{product.model}</span>
                  </div>
                )}
                {(product.year || product.year_of_manufacture) && (
                  <div>
                    <span className="text-gray-500 font-medium">Year:</span>
                    <span className="ml-2 text-gray-800">{product.year || product.year_of_manufacture}</span>
                  </div>
                )}
                {product.color && (
                  <div>
                    <span className="text-gray-500 font-medium">Color:</span>
                    <span className="ml-2 text-gray-800">{product.color}</span>
                  </div>
                )}
                {product.material && (
                  <div>
                    <span className="text-gray-500 font-medium">Material:</span>
                    <span className="ml-2 text-gray-800">{product.material}</span>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <span className="text-gray-500 font-medium">Weight:</span>
                    <span className="ml-2 text-gray-800">{product.weight} kg</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="col-span-2">
                    <span className="text-gray-500 font-medium">Dimensions:</span>
                    <span className="ml-2 text-gray-800">
                      {product.dimensions.length} x {product.dimensions.width} x {product.dimensions.height} cm
                    </span>
                  </div>
                )}
                {product.original_packaging !== undefined && (
                  <div>
                    <span className="text-gray-500 font-medium">Original Packaging:</span>
                    <span className="ml-2 text-gray-800">{product.original_packaging ? 'Yes' : 'No'}</span>
                  </div>
                )}
                {product.manual_included !== undefined && (
                  <div>
                    <span className="text-gray-500 font-medium">Manual Included:</span>
                    <span className="ml-2 text-gray-800">{product.manual_included ? 'Yes' : 'No'}</span>
                  </div>
                )}
                {product.working_condition_description && (
                  <div className="col-span-2">
                    <span className="text-gray-500 font-medium">Working Condition:</span>
                    <span className="ml-2 text-gray-800">{product.working_condition_description}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={addToCart} 
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button 
                onClick={() => window.location.href = '/cart'} 
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Package size={20} />
                Buy Now
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Package size={18} className="text-emerald-600" />
                <span>Free pickup available on campus</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700 mt-3">
                <UserIcon size={18} className="text-emerald-600" />
                <span>Contact seller for more details</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700 mt-3">
                <Sparkles size={18} className="text-emerald-600" />
                <span>Secure transaction guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts
              .filter(p => p.category === product.category && p._id !== product._id && p.status === 'Available')
              .slice(0, 4)
              .map(p => (
                <div key={p._id} className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all border border-gray-200">
                  <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    <img src={p.image} alt={p.product_title} className="max-h-28 object-contain" />
                  </div>
                  <div className="font-semibold text-sm mb-1 text-gray-800">{p.product_title}</div>
                  <div className="text-emerald-600 font-bold mb-3">₹{p.price}</div>
                  <button 
                    onClick={() => window.location.href = `/product/${p._id}`}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-3 py-2 rounded-lg text-sm transition-all shadow-md"
                  >
                    View Details
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
