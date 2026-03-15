// data/product-data.js
// Product data array - Contains skincare product information for Olive Young app
// Using local images from assets/images folder

export function imageList() {
  return IMAGELIST
}

const PRODUCTS = [
  {
    id: '1',
    name: 'Clean It Zero Original Cleansing Balm Set',
    brand: 'BANILA CO',
    price: 17.78,
    originalPrice: 25.25,
    category: 'Cleanser',
    subcategory: 'Skincare',
    description: 'As a top repurchased item, it removes waterproof makeup in one go, manages blackheads and sebum, and is a worry-free product with no concerns about double cleansing or dripping. This award-winning cleansing balm melts away makeup and impurities while nourishing your skin.',
    skinConcerns: ['Visible pores', 'Dry skin', 'Pimples'],
    shippingInfo: 'FedEx U.S.A, Canada, Guam, Puerto Rico\nEstimated to Arrive in 5-7 days\nFree shipping from US$60',
    // Local image for product list
    imageUri: require('../assets/images/product-main-4-list.png'),
    // Local images for carousel on detail page
    carouselImages: [
      require('../assets/images/main-product-detail-1.png'),
      require('../assets/images/main-product-detail-2.png'),
      require('../assets/images/main-product-detail-3.png')
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 2847
  },
  {
    id: '2',
    name: 'Super Melting Repair Softener',
    brand: 'ILSO',
    price: 24.50,
    originalPrice: 32.00,
    category: 'Toner',
    subcategory: 'Skincare',
    description: 'Award-winning sebum softener that melts away excess oil and impurities while maintaining skin moisture balance. Perfect for pore care and skin texture improvement. Winner of multiple Olive Young Awards.',
    skinConcerns: ['Large pores', 'Oily skin', 'Uneven texture'],
    shippingInfo: 'FedEx U.S.A, Canada, Guam, Puerto Rico\nEstimated to Arrive in 5-7 days\nFree shipping from US$60',
    imageUri: require('../assets/images/product-1-list.png'),
    inStock: true,
    rating: 4.7,
    reviewCount: 1523
  },
  {
    id: '3',
    name: 'Heartleaf Pore Control Cleansing Oil',
    brand: 'ANUA',
    price: 19.90,
    originalPrice: 26.00,
    category: 'Cleanser',
    subcategory: 'Skincare',
    description: 'Gentle yet effective cleansing oil infused with heartleaf extract. Removes makeup and impurities while soothing sensitive skin and controlling sebum production. Global bestseller with thousands of 5-star reviews.',
    skinConcerns: ['Sensitive skin', 'Large pores', 'Excess sebum'],
    shippingInfo: 'FedEx U.S.A, Canada, Guam, Puerto Rico\nEstimated to Arrive in 5-7 days\nFree shipping from US$60',
    imageUri: require('../assets/images/product-2-list.png'),
    inStock: true,
    rating: 4.9,
    reviewCount: 3201
  },
  {
    id: '4',
    name: 'Fresh Green Cleanser',
    brand: 'ARENCIA',
    price: 22.00,
    originalPrice: 28.00,
    category: 'Cleanser',
    subcategory: 'Skincare',
    description: 'Deep cleansing formula with natural green ingredients. Hydrates and purifies skin while maintaining moisture balance. Suitable for all skin types including sensitive skin. Clean beauty exclusive to Olive Young.',
    skinConcerns: ['Dull skin', 'Dehydration', 'Impurities'],
    shippingInfo: 'FedEx U.S.A, Canada, Guam, Puerto Rico\nEstimated to Arrive in 5-7 days\nFree shipping from US$60',
    imageUri: require('../assets/images/product-3-list.png'),
    inStock: true,
    rating: 4.6,
    reviewCount: 987
  },
  {
    id: '5',
    name: 'Red Blemish Soothing Cream',
    brand: 'MEDICUBE',
    price: 28.50,
    originalPrice: 35.00,
    category: 'Moisturizer',
    subcategory: 'Skincare',
    description: 'Intensive soothing cream that calms irritated skin and reduces redness. Formulated with centella asiatica and niacinamide for acne-prone and sensitive skin. Dermatologist tested and approved.',
    skinConcerns: ['Acne', 'Redness', 'Sensitive skin'],
    shippingInfo: 'FedEx U.S.A, Canada, Guam, Puerto Rico\nEstimated to Arrive in 5-7 days\nFree shipping from US$60',
    imageUri: require('../assets/images/product-4-home.png'),
    inStock: true,
    rating: 4.8,
    reviewCount: 2156
  },
];

// Helper function to get all products
export const getAllProducts = () => {
  return PRODUCTS;
};

// Helper function to get a single product by ID
export const getProductById = (id) => {
  return PRODUCTS.find(product => product.id === id);
};

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  return PRODUCTS.filter(product => product.category === category);
};