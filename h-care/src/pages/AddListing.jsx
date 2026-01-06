import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Upload, ArrowLeft, Plus, CheckCircle, Leaf } from 'lucide-react';

const LISTINGS_KEY = 'hc_listings';

function loadListings() {
  try { return JSON.parse(localStorage.getItem(LISTINGS_KEY) || '[]'); } catch (e) { return []; }
}

function saveListings(list) {
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event('hc_listings_updated'));
}

const AddListing = () => {
  const [imageData, setImageData] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Furniture');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState('Used');
  const [year, setYear] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [lengthVal, setLengthVal] = useState('');
  const [widthVal, setWidthVal] = useState('');
  const [heightVal, setHeightVal] = useState('');
  const [weight, setWeight] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [originalPackaging, setOriginalPackaging] = useState(false);
  const [manualIncluded, setManualIncluded] = useState(false);
  const [workingConditionDesc, setWorkingConditionDesc] = useState('');
  const [status, setStatus] = useState('Available');

  const navigate = useNavigate();

  const handleImage = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageData(reader.result);
    };
    reader.readAsDataURL(f);
  };

  const submit = (e) => {
    e.preventDefault();
    // basic validation
    if (!title.trim() || !price) {
      window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: 'Please provide title and price', type: 'error' } }));
      return;
    }

    const session = JSON.parse(localStorage.getItem('hc_session') || 'null');
    const seller = session ? session.email : 'unknown';
    const listings = loadListings();
    const id = `L${Date.now()}`;
    const dims = {
      length: lengthVal || null,
      width: widthVal || null,
      height: heightVal || null,
    };

    const item = {
      id,
      image: imageData,
      title,
      category,
      description,
      price: Number(price),
      quantity: Number(quantity || 1),
      condition,
      year: year || null,
      brand: brand || null,
      model: model || null,
      dimensions: dims,
      weight: weight || null,
      material: material || null,
      color: color || null,
      originalPackaging: !!originalPackaging,
      manualIncluded: !!manualIncluded,
      workingConditionDesc: workingConditionDesc || null,
      status,
      seller,
      createdAt: new Date().toISOString(),
    };

    listings.push(item);
    saveListings(listings);
    window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: 'Listing added successfully!', type: 'success' } }));
    navigate('/my-listings');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50 p-6">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-md mb-6 -mt-6 -mx-6 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="text-emerald-600" size={28} />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">EcoFinds</span>
          </div>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
              <Plus className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
              <p className="text-gray-600 mt-1">List your item on the marketplace</p>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Upload size={16} />
              Product Image
            </label>
            <div className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center mb-3">
              {imageData ? (
                <img src={imageData} alt="preview" className="max-h-44 object-contain rounded-lg" />
              ) : (
                <div className="text-center text-gray-400">
                  <Package size={48} className="mx-auto mb-2 opacity-40" />
                  <div className="text-sm">No image selected</div>
                </div>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleImage} className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 file:cursor-pointer" />
          </div>

          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Title *</label>
              <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-gray-800" placeholder="Enter product name" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-gray-800">
                  <option value="furniture">Furniture</option>
                  <option value="clothes">Clothes</option>
                  <option value="electronics">Electronics</option>
                  <option value="beddings">Beddings</option>
                  <option value="wearables">Wearables</option>
                  <option value="home_decor">Home Decor</option>
                  <option value="study_material">Study Material</option>
                  <option value="kitchen_appliances">Kitchen Appliances</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹) *</label>
                <input value={price} onChange={e=>setPrice(e.target.value)} type="number" className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-gray-800" placeholder="0.00" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Description</label>
              <textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-gray-800" rows={4} placeholder="Describe your product in detail..."></textarea>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
            <input value={quantity} onChange={e=>setQuantity(e.target.value)} type="number" min={1} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Condition</label>
            <select value={condition} onChange={e=>setCondition(e.target.value)} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-gray-800">
              <option>New</option>
              <option>Like New</option>
              <option>Used</option>
              <option>Refurbished</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Year of Manufacture</label>
            <input value={year} onChange={e=>setYear(e.target.value)} type="number" min={1900} max={2099} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-gray-800" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
            <input value={brand} onChange={e=>setBrand(e.target.value)} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-gray-800" placeholder="e.g., Apple" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Model</label>
            <input value={model} onChange={e=>setModel(e.target.value)} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-gray-800" placeholder="e.g., MacBook Pro" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
            <input value={weight} onChange={e=>setWeight(e.target.value)} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-gray-800" placeholder="0.0" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Dimensions (L x W x H) cm</label>
            <div className="grid grid-cols-3 gap-2">
              <input placeholder="L" value={lengthVal} onChange={e=>setLengthVal(e.target.value)} className="p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-gray-800 text-sm" />
              <input placeholder="W" value={widthVal} onChange={e=>setWidthVal(e.target.value)} className="p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-gray-800 text-sm" />
              <input placeholder="H" value={heightVal} onChange={e=>setHeightVal(e.target.value)} className="p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-gray-800 text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Material</label>
            <input value={material} onChange={e=>setMaterial(e.target.value)} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-gray-800" placeholder="e.g., Wood, Plastic" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
            <input value={color} onChange={e=>setColor(e.target.value)} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-gray-800" placeholder="e.g., Blue, Black" />
          </div>
        </div>

        <div className="flex gap-6 items-start">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={originalPackaging} onChange={e=>setOriginalPackaging(e.target.checked)} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 rounded" />
            <span className="text-sm text-gray-700">Original Packaging</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={manualIncluded} onChange={e=>setManualIncluded(e.target.checked)} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 rounded" />
            <span className="text-sm text-gray-700">Manual / Instructions Included</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Working Condition Description</label>
          <textarea value={workingConditionDesc} onChange={e=>setWorkingConditionDesc(e.target.value)} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-gray-800" rows={3} placeholder="Describe the condition and any defects..."></textarea>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select value={status} onChange={e=>setStatus(e.target.value)} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-gray-800">
              <option>Available</option>
              <option>Sold</option>
            </select>
          </div>

          <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl">
            <CheckCircle size={20} />
            Add Item
          </button>
        </div>
      </form>
        </div>
      </div>
    </div>
  );
};

export default AddListing;