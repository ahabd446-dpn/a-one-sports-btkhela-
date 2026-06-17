import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/src/types/ecommerce";

// Create a helper to map basic products to full products
const createFullProduct = (basic: Partial<Product> & { id: string; name: string; slug: string; price: number; category: string; brand: string; image: string; rating: number }): Product => ({
  ...basic,
  sku: basic.sku || `SKU-${basic.id}`,
  stock: basic.stock || 10,
  reviewCount: basic.reviewCount || 0,
  soldCount: basic.soldCount || 0,
  views: basic.views || 0,
  deliveryEstimate: basic.deliveryEstimate || "3-5 Business Days",
  deliveryCharge: basic.deliveryCharge || 200,
  images: basic.images || [{ id: `img-${basic.id}`, url: basic.image, alt: basic.name }],
  highlights: basic.highlights || ["Premium Quality", "Authentic Gear"],
  description: basic.description || "Experience top-tier performance with this product.",
  specifications: basic.specifications || [],
  variants: basic.variants || [],
  faqs: basic.faqs || []
});

const initialProducts: Product[] = [
  createFullProduct({ id: "p1", name: "SS TON Player Edition Bat", slug: "ss-ton-player-edition-bat", category: "Cricket", price: 65000, salePrice: 58500, brand: "SS", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=400", rating: 4.9 }),
  createFullProduct({ id: "2", name: "Professional Sialkot Football", slug: "professional-sialkot-football", category: "Football", price: 3500, brand: "Star", image: "https://images.unsplash.com/photo-1629031673322-81c81ef4f48b?auto=format&fit=crop&q=80&w=400", rating: 4.7 }),
  createFullProduct({ id: "3", name: "Olympic Grade Badminton Racket", slug: "olympic-badminton-racket", category: "Badminton", price: 8500, salePrice: 7200, brand: "Yonex", image: "https://images.unsplash.com/photo-1626225454284-d3c631481180?auto=format&fit=crop&q=80&w=400", rating: 4.8 }),
  createFullProduct({ id: "4", name: "Premium Cricket Kit Bag", slug: "premium-cricket-kit-bag", category: "Cricket", price: 12000, brand: "SS", image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=400", rating: 4.9 }),
  createFullProduct({ id: "5", name: "Sports Running Shoes X1", slug: "sports-running-shoes-x1", category: "Shoes", price: 6500, brand: "Nike", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400", rating: 4.6 }),
  createFullProduct({ id: "6", name: "Professional Cricket Helmet", slug: "professional-cricket-helmet", category: "Cricket", price: 5500, brand: "Masuri", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=400", rating: 4.8 }),
  createFullProduct({ id: "7", name: "Goal Keeper Gloves", slug: "goal-keeper-gloves", category: "Football", price: 2500, brand: "Adidas", image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7a0aab?auto=format&fit=crop&q=80&w=400", rating: 4.5 }),
  createFullProduct({ id: "8", name: "Badminton Shuttlecocks (12pc)", slug: "badminton-shuttlecocks-12pc", category: "Badminton", price: 1800, brand: "Yonex", image: "https://images.unsplash.com/photo-1626225454284-d3c631481180?auto=format&fit=crop&q=80&w=400", rating: 4.7 })
];



interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "sku" | "stock" | "reviewCount" | "soldCount" | "views" | "deliveryEstimate" | "deliveryCharge" | "images" | "highlights" | "description" | "specifications" | "variants" | "faqs"> & Partial<Product> & { image: string }) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: initialProducts,
      addProduct: (productData) => set((state) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newProduct = createFullProduct({
          ...productData,
          id
        });
        return { products: [newProduct, ...state.products] };
      }),
      updateProduct: (id, updatedData) => set((state) => ({
        products: state.products.map(p => p.id === id ? { ...p, ...updatedData } : p)
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
      })),
    }),
    {
      name: "aos-product-storage",
    }
  )
);
