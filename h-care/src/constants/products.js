const products = [
  // Furniture (10)
  { id: 'f1', title: 'Study Desk - Compact', category: 'furniture', price: 1200, condition: 'Used', image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg', trending: true },
  { id: 'f2', title: 'Wooden Bookshelf', category: 'furniture', price: 1800, condition: 'Used', image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg' },
  { id: 'f3', title: 'Single Bed Frame', category: 'furniture', price: 2500, condition: 'Used', image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg', discounted: true },
  { id: 'f4', title: 'Study Chair - Ergonomic', category: 'furniture', price: 900, condition: 'Used', image: 'https://images.pexels.com/photos/586744/pexels-photo-586744.jpeg' },
  { id: 'f5', title: 'Dining Table (4 seater)', category: 'furniture', price: 3200, condition: 'Used', image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg' },
  { id: 'f6', title: 'Side Table', category: 'furniture', price: 450, condition: 'Used', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg' },
  { id: 'f7', title: 'Wardrobe - 2 door', category: 'furniture', price: 4000, condition: 'Used', image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg' },
  { id: 'f8', title: 'Shoe Rack', category: 'furniture', price: 300, condition: 'Used', image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg' },
  { id: 'f9', title: 'Coffee Table', category: 'furniture', price: 700, condition: 'Used', image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg' },
  { id: 'f10', title: 'TV Stand', category: 'furniture', price: 850, condition: 'Used', image: 'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg' },

  // Shirts (10)
  { id: 's1', title: 'Cotton Shirt - Blue', category: 'clothes', price: 399, condition: 'Like New', image: 'https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg' },
  { id: 's2', title: 'Formal Shirt - White', category: 'clothes', price: 499, condition: 'Like New', image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg', trending: true },
  { id: 's3', title: 'Checked Shirt', category: 'clothes', price: 299, condition: 'Used', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg' },
  { id: 's4', title: 'Denim Shirt', category: 'clothes', price: 599, condition: 'Like New', image: 'https://images.pexels.com/photos/1336873/pexels-photo-1336873.jpeg' },
  { id: 's5', title: 'Polo Tee', category: 'clothes', price: 249, condition: 'Used', image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg' },
  { id: 's6', title: 'Hooded Shirt', category: 'clothes', price: 699, condition: 'Like New', image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg', discounted: true },
  { id: 's7', title: 'Graphic Tee', category: 'clothes', price: 199, condition: 'Used', image: 'https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg' },
  { id: 's8', title: 'Linen Shirt', category: 'clothes', price: 599, condition: 'Like New', image: 'https://images.pexels.com/photos/2050994/pexels-photo-2050994.jpeg' },
  { id: 's9', title: 'Striped Shirt', category: 'clothes', price: 349, condition: 'Used', image: 'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg' },
  { id: 's10', title: 'Flannel Shirt', category: 'clothes', price: 279, condition: 'Used', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg' },

  // Pants (10)
  { id: 'p1', title: 'Denim Jeans - Slim', category: 'clothes', price: 799, condition: 'Used', image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg', trending: true },
  { id: 'p2', title: 'Chinos - Khaki', category: 'clothes', price: 699, condition: 'Used', image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg' },
  { id: 'p3', title: 'Track Pants', category: 'clothes', price: 349, condition: 'Like New', image: 'https://images.pexels.com/photos/2827400/pexels-photo-2827400.jpeg' },
  { id: 'p4', title: 'Formal Trousers', category: 'clothes', price: 599, condition: 'Used', image: 'https://images.pexels.com/photos/1027130/pexels-photo-1027130.jpeg' },
  { id: 'p5', title: 'Cargo Pants', category: 'clothes', price: 499, condition: 'Used', image: 'https://images.pexels.com/photos/2766408/pexels-photo-2766408.jpeg' },
  { id: 'p6', title: 'Shorts', category: 'clothes', price: 199, condition: 'Used', image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg' },
  { id: 'p7', title: 'Joggers', category: 'clothes', price: 299, condition: 'Like New', image: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg' },
  { id: 'p8', title: 'Formal Pants - Black', category: 'clothes', price: 649, condition: 'Used', image: 'https://images.pexels.com/photos/1306246/pexels-photo-1306246.jpeg' },
  { id: 'p9', title: 'Linen Pants', category: 'clothes', price: 549, condition: 'Like New', image: 'https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg' },
  { id: 'p10', title: 'Stretch Pants', category: 'clothes', price: 429, condition: 'Used', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg' },

  // Jackets (10)
  { id: 'j1', title: 'Winter Jacket - Puffer', category: 'clothes', price: 1299, condition: 'Like New', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg', discounted: true },
  { id: 'j2', title: 'Leather Jacket', category: 'clothes', price: 2200, condition: 'Used', image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg' },
  { id: 'j3', title: 'Denim Jacket', category: 'clothes', price: 999, condition: 'Used', image: 'https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg' },
  { id: 'j4', title: 'Blazer', category: 'clothes', price: 1499, condition: 'Like New', image: 'https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg' },
  { id: 'j5', title: 'Rain Jacket', category: 'clothes', price: 799, condition: 'Used', image: 'https://images.pexels.com/photos/1103828/pexels-photo-1103828.jpeg' },
  { id: 'j6', title: 'Bomber Jacket', category: 'clothes', price: 899, condition: 'Used', image: 'https://images.pexels.com/photos/842979/pexels-photo-842979.jpeg' },
  { id: 'j7', title: 'Hooded Jacket', category: 'clothes', price: 699, condition: 'Used', image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg' },
  { id: 'j8', title: 'Fleece Jacket', category: 'clothes', price: 499, condition: 'Used', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg' },
  { id: 'j9', title: 'Windcheater', category: 'clothes', price: 399, condition: 'Used', image: 'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg' },
  { id: 'j10', title: 'Softshell Jacket', category: 'clothes', price: 1099, condition: 'Like New', image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg' },

  // Kitchen Appliances (10)
  { id: 'k1', title: 'Microwave (20L)', category: 'kitchen_appliances', price: 2200, condition: 'Used', image: 'https://images.pexels.com/photos/4686822/pexels-photo-4686822.jpeg', trending: true },
  { id: 'k2', title: 'Electric Kettle', category: 'kitchen_appliances', price: 450, condition: 'Like New', image: 'https://images.pexels.com/photos/4226901/pexels-photo-4226901.jpeg' },
  { id: 'k3', title: 'Mixer Grinder', category: 'kitchen_appliances', price: 1200, condition: 'Used', image: 'https://images.pexels.com/photos/5591664/pexels-photo-5591664.jpeg' },
  { id: 'k4', title: 'Toaster', category: 'kitchen_appliances', price: 350, condition: 'Used', image: 'https://images.pexels.com/photos/7936946/pexels-photo-7936946.jpeg' },
  { id: 'k5', title: 'Rice Cooker', category: 'kitchen_appliances', price: 900, condition: 'Used', image: 'https://images.pexels.com/photos/4226893/pexels-photo-4226893.jpeg' },
  { id: 'k6', title: 'Blender', category: 'kitchen_appliances', price: 650, condition: 'Like New', image: 'https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg' },
  { id: 'k7', title: 'Hand Mixer', category: 'kitchen_appliances', price: 299, condition: 'Used', image: 'https://images.pexels.com/photos/7937017/pexels-photo-7937017.jpeg' },
  { id: 'k8', title: 'Sandwich Maker', category: 'kitchen_appliances', price: 399, condition: 'Used', image: 'https://images.pexels.com/photos/4686961/pexels-photo-4686961.jpeg' },
  { id: 'k9', title: 'Induction Cooktop', category: 'kitchen_appliances', price: 1499, condition: 'Like New', image: 'https://images.pexels.com/photos/4226880/pexels-photo-4226880.jpeg' },
  { id: 'k10', title: 'Portable Gas Stove', category: 'kitchen_appliances', price: 799, condition: 'Used', image: 'https://images.pexels.com/photos/4226860/pexels-photo-4226860.jpeg' },

  // Study Material (10)
  { id: 'b1', title: 'Calculus Textbook', category: 'study_material', price: 250, condition: 'Used', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg' },
  { id: 'b2', title: 'Physics Notes Bundle', category: 'study_material', price: 199, condition: 'Used', image: 'https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg', discounted: true },
  { id: 'b3', title: 'Chemistry Lab Manual', category: 'study_material', price: 150, condition: 'Used', image: 'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg' },
  { id: 'b4', title: 'Programming Textbook', category: 'study_material', price: 399, condition: 'Used', image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg' },
  { id: 'b5', title: 'Reference Guide - English', category: 'study_material', price: 120, condition: 'Used', image: 'https://images.pexels.com/photos/5676744/pexels-photo-5676744.jpeg' },
  { id: 'b6', title: 'Exam Question Papers - Bundle', category: 'study_material', price: 99, condition: 'Used', image: 'https://images.pexels.com/photos/4855373/pexels-photo-4855373.jpeg' },
  { id: 'b7', title: 'NOTEBOOKS Pack (10)', category: 'study_material', price: 250, condition: 'New', image: 'https://images.pexels.com/photos/3807755/pexels-photo-3807755.jpeg' },
  { id: 'b8', title: 'Sketchbook', category: 'study_material', price: 180, condition: 'Used', image: 'https://images.pexels.com/photos/3807657/pexels-photo-3807657.jpeg' },
  { id: 'b9', title: 'Lab Coat', category: 'study_material', price: 350, condition: 'Used', image: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg' },
  { id: 'b10', title: 'Drawing Kit', category: 'study_material', price: 299, condition: 'Used', image: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg' },

  // Beddings (10)
  { id: 'bd1', title: 'Single Bed Sheet', category: 'beddings', price: 399, condition: 'New', image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg' },
  { id: 'bd2', title: 'Pillow Set', category: 'beddings', price: 299, condition: 'New', image: 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg' },
  { id: 'bd3', title: 'Comforter', category: 'beddings', price: 899, condition: 'Used', image: 'https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg' },
  { id: 'bd4', title: 'Blanket', category: 'beddings', price: 499, condition: 'Used', image: 'https://images.pexels.com/photos/1854649/pexels-photo-1854649.jpeg' },
  { id: 'bd5', title: 'Mattress Topper', category: 'beddings', price: 1299, condition: 'Like New', image: 'https://images.pexels.com/photos/4846092/pexels-photo-4846092.jpeg' },
  { id: 'bd6', title: 'Bed Runner', category: 'beddings', price: 199, condition: 'New', image: 'https://images.pexels.com/photos/6969868/pexels-photo-6969868.jpeg' },
  { id: 'bd7', title: 'Duvet Cover', category: 'beddings', price: 599, condition: 'Used', image: 'https://images.pexels.com/photos/1909791/pexels-photo-1909791.jpeg' },
  { id: 'bd8', title: 'Bedsheet Set (2)', category: 'beddings', price: 799, condition: 'New', image: 'https://images.pexels.com/photos/3757055/pexels-photo-3757055.jpeg' },
  { id: 'bd9', title: 'Bolster Cover', category: 'beddings', price: 149, condition: 'New', image: 'https://images.pexels.com/photos/6969880/pexels-photo-6969880.jpeg' },
  { id: 'bd10', title: 'Mattress Protector', category: 'beddings', price: 399, condition: 'New', image: 'https://images.pexels.com/photos/4846514/pexels-photo-4846514.jpeg' },
];

export const categories = [
  { id: 'c1', name: 'furniture', image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg' },
  { id: 'c2', name: 'clothes', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg' },
  { id: 'c3', name: 'electronics', image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg' },
  { id: 'c4', name: 'kitchen_appliances', image: 'https://images.pexels.com/photos/4686822/pexels-photo-4686822.jpeg' },
  { id: 'c5', name: 'study_material', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg' },
  { id: 'c6', name: 'beddings', image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg' },
  { id: 'c7', name: 'wearables', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg' },
  { id: 'c8', name: 'home_decor', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg' },
];

export default products;
