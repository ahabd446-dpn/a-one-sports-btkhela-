
export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userImage?: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  isVerified: boolean;
  helpfulVotes: number;
  images?: string[];
}

export interface Question {
  id: string;
  productId: string;
  userName: string;
  question: string;
  answer?: string;
  date: string;
  helpfulCount: number;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g., "Size: Short Handle"
  sku: string;
  price: number;
  salePrice?: number;
  stock: number;
  images?: string[];
}

export interface Specification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  sku: string;
  price: number;
  salePrice?: number;
  stock: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  views: number;
  deliveryEstimate: string;
  deliveryCharge: number;
  images: ProductImage[];
  image: string;
  highlights: string[];
  description: string;
  specifications: Specification[];
  variants: ProductVariant[];
  faqs: { q: string; a: string }[];
}
