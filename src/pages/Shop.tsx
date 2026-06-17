import { useState, useEffect } from "react";
import { Search, Filter, ChevronDown, ShoppingBag, Star } from "lucide-react";
import { formatPrice } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useCartStore } from "@/src/store/useCartStore";
import { Link, useParams } from "react-router-dom";
import { useProductStore } from "@/src/store/useProductStore";
import { TourGuide } from "@/src/components/TourGuide";

const categories = ["All", "Cricket", "Football", "Badminton", "Shoes", "Accessories"];
const brands = ["All", "CA", "SS", "Yonex", "Nike", "Adidas", "Masuri"];

export function Shop() {
  const { category } = useParams<{ category: string }>();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const products = useProductStore((state) => state.products);

  useEffect(() => {
    if (category) {
      const found = categories.find((c) => c.toLowerCase() === category.toLowerCase());
      setSelectedCategory(found || "All");
    } else {
      setSelectedCategory("All");
    }
  }, [category]);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesBrand = selectedBrand === "All" || p.brand === selectedBrand;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBrand && matchesSearch;
  });

  const shopSteps = [
    {
      target: "body",
      content: "Welcome to the Shop page! Let's see how your customers will interact with it.",
      placement: "center" as const,
      disableBeacon: true,
    },
    {
      target: "#tour-shop-search",
      content: "Customers can quickly search for products by name here.",
    },
    {
      target: "#tour-shop-filters",
      content: "These filters allow users to narrow down products by Category.",
    },
    {
      target: "#tour-shop-product-first",
      content: "Click on any product to view its details, or use the Add to Cart button to instantly buy it.",
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 sm:px-6 lg:px-8">
      <TourGuide steps={shopSteps} tourKey="shop_page" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold uppercase text-white">THE <span className="text-[#a3e635] italic">ARMORY</span></h1>
          <p className="text-gray-500 font-medium">Equip yourself with the finest pro-grade sports gear.</p>
        </div>

        <div id="tour-shop-search" className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input 
              type="text" 
              placeholder="Search products..."
              className="w-full bg-surface border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:border-primary outline-none transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className="md:hidden flex items-center justify-center gap-2 bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-colors"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-5 h-5" /> Filters
          </button>
        </div>
      </div>

      <div className="flex gap-12">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block w-64 space-y-10 shrink-0">
          <div>
            <h3 className="font-bold uppercase tracking-widest text-xs text-primary mb-6">Categories</h3>
            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block text-sm font-medium transition-colors ${selectedCategory === cat ? "text-primary px-3 py-1 bg-primary/10 rounded-lg w-full text-left" : "text-white/60 hover:text-white"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-widest text-xs text-primary mb-6">Brands</h3>
            <div className="space-y-3">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`block text-sm font-medium transition-colors ${selectedBrand === brand ? "text-primary px-3 py-1 bg-primary/10 rounded-lg w-full text-left" : "text-white/60 hover:text-white"}`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid - Rule 6 */}
        <div className="flex-grow">
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  id={idx === 0 ? "tour-shop-product-first" : undefined}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Link to={`/product/${product.slug}`} className="block bg-[#111] border border-[#1f1f1f] rounded-xl sm:rounded-2xl p-3 sm:p-4 group hover:border-[#a3e635]/50 transition-all">
                    <div className="aspect-square rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4 relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.salePrice && (
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
                          SALE
                        </div>
                      )}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addItem({ ...product, quantity: 1, image: product.image });
                        }}
                        className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-white text-black p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-xl hover:bg-[#a3e635] transition-all transform translate-y-2 opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 z-10 hidden sm:block"
                      >
                        <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                    <p className="text-[9px] sm:text-[10px] text-[#a3e635] font-bold uppercase tracking-widest mb-1">{product.category}</p>
                    <h3 className="font-bold text-xs sm:text-base md:text-lg mb-1 sm:mb-2 line-clamp-2 text-white min-h-[2.5rem] sm:min-h-0">{product.name}</h3>
                    <p className="text-gray-500 text-[10px] sm:text-xs mb-1.5 sm:mb-2 font-medium">Brand: {product.brand}</p>
                    <div className="flex items-center gap-1.5 mb-2 sm:mb-3">
                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-[10px] sm:text-xs text-gray-500 font-medium">{product.rating}</span>
                    </div>
                    <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
                      {product.salePrice ? (
                        <>
                          <span className="text-sm sm:text-lg md:text-xl font-bold text-white">{formatPrice(product.salePrice)}</span>
                          <span className="text-[10px] sm:text-sm text-gray-600 line-through">{formatPrice(product.price)}</span>
                        </>
                      ) : (
                        <span className="text-sm sm:text-lg md:text-xl font-bold text-white">{formatPrice(product.price)}</span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-24 bg-[#111] border border-[#1f1f1f] rounded-3xl">
              <ShoppingBag className="w-16 h-16 text-white/5 mx-auto mb-6" />
              <h3 className="text-2xl font-display font-black uppercase text-white mb-2">No products found</h3>
              <p className="text-gray-500 font-medium text-sm">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => { setSelectedCategory("All"); setSelectedBrand("All"); setSearchQuery(""); }}
                className="mt-6 text-[#a3e635] font-black uppercase tracking-widest text-[10px] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
