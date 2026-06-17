import { useState } from "react";
import { formatPrice, cn } from "@/src/lib/utils";
import { useProductStore } from "@/src/store/useProductStore";
import { Product } from "@/src/types/ecommerce";
import { Plus, Edit2, Trash2, Search, X, Image as ImageIcon, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { TourGuide } from "@/src/components/TourGuide";

export function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    image: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()));

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ name: "", slug: "", category: "Cricket", brand: "CA", price: "", salePrice: "", image: "" });
    setErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      category: product.category,
      brand: product.brand,
      price: product.price.toString(),
      salePrice: product.salePrice ? product.salePrice.toString() : "",
      image: product.image,
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (!formData.price.trim() || isNaN(Number(formData.price))) newErrors.price = "Valid price is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newProductData = {
      name: formData.name,
      slug: formData.slug,
      category: formData.category,
      brand: formData.brand,
      price: Number(formData.price),
      salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
      image: formData.image,
      rating: editingProduct ? editingProduct.rating : 4.5,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, newProductData);
    } else {
      addProduct(newProductData);
    }

    setIsModalOpen(false);
  };

  const adminProductsSteps = [
    {
      target: "body",
      content: "This is the Products Management screen. Here you have full control over your catalog.",
      placement: "center" as const,
      disableBeacon: true,
    },
    {
      target: "#tour-product-search",
      content: "Quickly find any product by typing its name or category here.",
    },
    {
      target: "#tour-add-product-btn",
      content: "Click this button to open the pro-level product creation form.",
    },
    {
      target: "#tour-product-actions",
      content: "Use these buttons to quickly Edit or Delete existing products. Edits happen instantly!",
    }
  ];

  return (
    <div className="space-y-6 relative h-full flex flex-col">
      <TourGuide steps={adminProductsSteps} tourKey="admin_products" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div id="tour-product-search" className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input 
            type="text" 
            placeholder="Search products..."
            className="w-full bg-[#111] border border-[#1f1f1f] rounded-xl py-2 pl-10 pr-4 text-sm focus:border-primary outline-none transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button 
          id="tour-add-product-btn"
          onClick={openAddModal}
          className="bg-primary text-black px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all flex items-center gap-2 shadow-xl shadow-primary/10 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl overflow-hidden flex-grow flex flex-col">
        <div className="overflow-x-auto flex-grow custom-scrollbar">
          <table className="w-full text-left">
            <thead className="bg-[#0a0a0a] sticky top-0 z-10">
              <tr className="border-b border-[#1f1f1f] text-gray-500 text-[10px] uppercase tracking-widest font-black">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th id="tour-product-actions" className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-[#1f1f1f]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-white/40">No products found.</td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#0a0a0a] shrink-0 border border-[#1f1f1f]">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-white mb-0.5">{product.name}</div>
                        <div className="text-[10px] text-white/40">{product.brand}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest">{product.category}</span>
                    </td>
                    <td className="p-4 font-bold">
                      {formatPrice(product.price)}
                    </td>
                    <td className="p-4">
                      <span className={cn("px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest", (product.stock && product.stock > 0) ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500")}>
                        {(product.stock && product.stock > 0) ? `${product.stock} In Stock` : "Out of Stock"}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => openEditModal(product)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors inline-block">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors inline-block">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pro Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-[#111] border-l border-[#1f1f1f] h-full overflow-y-auto custom-scrollbar flex flex-col shadow-2xl"
            >
              <div className="sticky top-0 bg-[#111]/80 backdrop-blur-xl border-b border-[#1f1f1f] p-6 flex justify-between items-center z-10">
                <h2 className="text-xl font-display font-black uppercase tracking-widest text-white">
                  {editingProduct ? "Edit Product" : "New Product"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors bg-[#0a0a0a] p-2 rounded-full border border-[#1f1f1f]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 flex-grow">
                {/* Image Preview */}
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#2a2a2a] rounded-2xl p-6 bg-[#0a0a0a] relative overflow-hidden group">
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" className="w-full h-48 object-contain z-10" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400?text=Invalid+Image')} />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="w-12 h-12 text-white/20 mx-auto mb-2" />
                      <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Image Preview</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors z-0" />
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Image URL</label>
                    <input type="text" value={formData.image} onChange={(e) => { setFormData({...formData, image: e.target.value}); setErrors({...errors, image: ""}); }} className={cn("w-full bg-[#0a0a0a] border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all", errors.image ? "border-red-500/50" : "border-[#2a2a2a] focus:border-primary/50")} placeholder="https://..." />
                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Product Name</label>
                    <input type="text" value={formData.name} onChange={(e) => { setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}); setErrors({...errors, name: ""}); }} className={cn("w-full bg-[#0a0a0a] border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all", errors.name ? "border-red-500/50" : "border-[#2a2a2a] focus:border-primary/50")} placeholder="Enter name" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Slug</label>
                    <input type="text" value={formData.slug} onChange={(e) => { setFormData({...formData, slug: e.target.value}); setErrors({...errors, slug: ""}); }} className={cn("w-full bg-[#0a0a0a] border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all", errors.slug ? "border-red-500/50" : "border-[#2a2a2a] focus:border-primary/50")} placeholder="product-slug" />
                    {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Category</label>
                      <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all appearance-none">
                        <option>Cricket</option>
                        <option>Football</option>
                        <option>Badminton</option>
                        <option>Shoes</option>
                        <option>Accessories</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Brand</label>
                      <input type="text" value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all" placeholder="Brand" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Regular Price (PKR)</label>
                      <input type="number" value={formData.price} onChange={(e) => { setFormData({...formData, price: e.target.value}); setErrors({...errors, price: ""}); }} className={cn("w-full bg-[#0a0a0a] border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all", errors.price ? "border-red-500/50" : "border-[#2a2a2a] focus:border-primary/50")} placeholder="0.00" />
                      {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Sale Price (Optional)</label>
                      <input type="number" value={formData.salePrice} onChange={(e) => setFormData({...formData, salePrice: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all" placeholder="0.00" />
                    </div>
                  </div>

                </div>
              </div>

              <div className="sticky bottom-0 bg-[#111] border-t border-[#1f1f1f] p-6 z-10 flex gap-4 mt-auto">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-[#0a0a0a] border border-[#1f1f1f] text-white py-3.5 rounded-xl font-bold hover:bg-[#1a1a1a] transition-all">
                  Cancel
                </button>
                <button onClick={handleSave} className="flex-1 bg-primary text-black py-3.5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl shadow-primary/20">
                  Save Product
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
