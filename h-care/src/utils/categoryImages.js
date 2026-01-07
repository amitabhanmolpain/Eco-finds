// Category images mapping
export const CATEGORY_IMAGES = {
  Furniture: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop',
  Clothes: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=400&fit=crop',
  Electronics: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop',
  Beddings: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop',
  Wearables: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=400&fit=crop',
  'Home Decor': 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=400&fit=crop',
  'Study Material': 'https://images.unsplash.com/photo-150784272343-583f20270319?w=500&h=400&fit=crop',
  'Kitchen Appliances': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop',
};

export const getCategoryImage = (category) => {
  return CATEGORY_IMAGES[category] || 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=400&fit=crop';
};
