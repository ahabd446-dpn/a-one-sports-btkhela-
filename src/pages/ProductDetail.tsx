import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  MessageSquare, 
  ChevronRight, 
  Minus, 
  Plus,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ThumbsUp,
  Camera,
  PlayCircle,
  Trophy
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";
import { formatPrice, cn } from "@/src/lib/utils";
import { useCartStore } from "@/src/store/useCartStore";
import { useAuthStore } from "@/src/store/useAuthStore";
import { useProductStore } from "@/src/store/useProductStore";
import { Product, Review } from "@/src/types/ecommerce";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews" | "faqs">("description");
  const { addItem } = useCartStore();
  const { user } = useAuthStore();
  
  const products = useProductStore((state) => state.products);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const storeProduct = products.find(p => p.slug === slug);
        if (storeProduct) {
          setProduct(storeProduct);
          // Load dummy reviews
          setReviews([
            { id: "r1", productId: storeProduct.id, userName: "Ahmed K.", rating: 5, title: "Amazing quality!", text: "This exceeded my expectations.", date: "2 days ago", isVerified: true, helpfulVotes: 12 },
            { id: "r2", productId: storeProduct.id, userName: "Usman A.", rating: 4, title: "Good gear", text: "Very solid performance. Happy with the purchase.", date: "1 week ago", isVerified: true, helpfulVotes: 4 }
          ]);
        } else {
          // Fallback just in case
          const res = await fetch(`/api/products/${slug}`);
          if (!res.ok) throw new Error("Product not found");
          const data = await res.json();
          setProduct(data);
          
          const reviewsRes = await fetch(`/api/products/${data.id}/reviews`);
          const reviewsData = await reviewsRes.json();
          setReviews(reviewsData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <AlertCircle className="w-16 h-16 text-white/20 mb-6" />
      <h1 className="text-3xl font-display font-black uppercase mb-4">Product Not <span className="text-primary">Found</span></h1>
      <Link to="/shop" className="bg-primary text-black px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs">Back to Shop</Link>
    </div>
  );

  const currentPrice = product.variants?.[selectedVariant]?.salePrice || product.variants?.[selectedVariant]?.price || product.price;
  const originalPrice = product.variants?.[selectedVariant]?.price || product.price;
  const hasDiscount = !!product.variants?.[selectedVariant]?.salePrice || !!product.salePrice;

  return (
    <div className="min-h-screen pb-24">
      <Helmet>
        <title>{`${product.name} | A One Sports Batkhela`}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images?.[0]?.url || product.image || ""} />
      </Helmet>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/30">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-primary transition-colors">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/60 truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Section 1: Gallery - Rule 5 */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#111] border border-[#1f1f1f] group">
              <motion.img 
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={product.images?.[selectedImage]?.url || product.image || ""} 
                alt={product.images?.[selectedImage]?.alt || product.name}
                className="w-full h-full object-cover transform hover:scale(1.05) transition-transform duration-300 cursor-zoom-in"
              />
              {hasDiscount && (
                <div className="absolute top-6 left-6 bg-[#a3e635] text-black font-black text-[10px] px-3 py-1.5 rounded-lg shadow-xl uppercase tracking-widest">
                  -{Math.round((1 - (product.salePrice || product.variants?.[0]?.salePrice || 0) / originalPrice) * 100)}%
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-5 gap-4">
              {(product.images || []).map((img, idx) => (
                <button 
                  key={img.id}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "aspect-square rounded-xl overflow-hidden border-2 transition-all",
                    selectedImage === idx ? "border-[#a3e635] ring-2 ring-[#a3e635] opacity-100 scale-105" : "border-transparent opacity-50 hover:opacity-100"
                  )}
                >
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Product Info & Purchase - Rule 5 */}
          <div className="flex flex-col space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-[#a3e635]/10 text-[#a3e635] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {product.brand} Official
                </span>
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">SKU: {product.sku}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-black uppercase leading-tight mb-4 text-white">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "text-[#a3e635] fill-[#a3e635]" : "text-gray-800")} />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{product.reviewCount} Reviews</span>
                <div className="w-1 h-1 rounded-full bg-gray-800"></div>
                <span className="text-xs font-bold text-[#a3e635] uppercase tracking-widest leading-none mt-0.5">{product.soldCount} Sold</span>
              </div>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-display font-black text-[#a3e635]">{formatPrice(currentPrice)}</span>
                {hasDiscount && (
                  <span className="text-xl font-bold text-gray-700 line-through">{formatPrice(originalPrice)}</span>
                )}
              </div>
            </div>

            {/* Variants Selection - Rule 5 */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-1">Select Version / Size</label>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(idx)}
                    className={cn(
                      "px-6 h-14 rounded-xl font-bold text-[10px] uppercase tracking-widest border transition-all",
                      selectedVariant === idx ? "border-[#a3e635] bg-[#a3e635]/10 text-[#a3e635]" : "border-[#1f1f1f] bg-[#111] text-gray-500 hover:border-gray-700"
                    )}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Purchase Options - Rule 5 */}
            <div className="space-y-6 pt-4 border-t border-[#1f1f1f]">
              <div className="flex items-center gap-6">
                <div className="bg-[#111] border border-[#1f1f1f] rounded-xl flex items-center h-14">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-14 h-full flex items-center justify-center hover:text-[#a3e635] transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-display font-black text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-14 h-full flex items-center justify-center hover:text-[#a3e635] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-grow">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-1">Availability</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse"></div>
                    <span className="text-xs font-bold text-[#a3e635] uppercase tracking-widest">{product.stock} Units left in stock</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => addItem({
                  id: product.id,
                  name: product.name,
                  price: currentPrice,
                  image: product.images?.[0]?.url || product.image || "",
                  quantity: quantity
                })}
                className="w-full bg-[#a3e635] text-black h-16 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#bef264] transition-all transform hover:-translate-y-1 shadow-2xl shadow-[#a3e635]/10"
              >
                <ShoppingBag className="w-5 h-5" /> Add To Cart
              </button>
              
              <div className="flex gap-4">
                <button className="flex-1 h-14 bg-[#111] border border-[#1f1f1f] rounded-xl flex items-center justify-center hover:bg-[#1a1a1a] transition-colors text-gray-400">
                  <Heart className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied!");
                  }}
                  className="flex-1 h-14 bg-[#111] border border-[#1f1f1f] rounded-xl flex items-center justify-center hover:bg-[#1a1a1a] transition-colors text-gray-400"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 space-y-6">
               <div className="flex items-start gap-4">
                 <Truck className="w-5 h-5 text-[#a3e635] mt-0.5" />
                 <div>
                   <h3 className="font-bold text-[10px] uppercase tracking-widest text-white mb-1">Standard Delivery</h3>
                   <p className="text-xs text-gray-500 font-medium">Estimated: {product.deliveryEstimate}</p>
                   <p className="text-xs text-[#a3e635] font-black mt-1">Fee: {formatPrice(product.deliveryCharge)}</p>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <RotateCcw className="w-5 h-5 text-[#a3e635] mt-0.5" />
                 <div>
                   <h3 className="font-bold text-[10px] uppercase tracking-widest text-white mb-1">7 Days Return</h3>
                   <p className="text-xs text-gray-500 font-medium">Change of mind is applicable. 100% money back guarantee.</p>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Section 3: Interactive Tabs (Description, Specs, Reviews) */}
        <div className="mt-32">
          <div className="flex overflow-x-auto gap-8 border-b border-white/5 mb-12 no-scrollbar px-1">
            {["description", "specs", "reviews", "faqs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "pb-6 text-sm font-black uppercase tracking-[0.2em] transition-all relative",
                  activeTab === tab ? "text-primary border-b-2 border-primary" : "text-white/30 hover:text-white"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="min-h-[400px]">
             {activeTab === "description" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-12">
                   <div className="prose prose-invert max-w-none">
                      <p className="text-xl text-white/60 leading-relaxed">{product.description}</p>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-display font-black uppercase tracking-tight">Key <span className="text-primary italic">Highlights</span></h3>
                        <ul className="space-y-4">
                            {product.highlights.map((h, i) => (
                                <li key={i} className="flex items-center gap-4 text-white/70 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                    {h}
                                </li>
                            ))}
                        </ul>
                      </div>
                      <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-primary/5 to-transparent flex flex-col justify-center">
                        <MessageSquare className="w-12 h-12 text-primary mb-6" />
                        <h4 className="text-xl font-bold mb-3 uppercase tracking-tight leading-none">Need professional advice?</h4>
                        <p className="text-sm text-white/50 mb-8 font-medium">Our master craftsmen in Batkhela can help you choose the right gear for your playing style.</p>
                        <button className="bg-white/5 border border-white/10 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors">Contact Expert</button>
                      </div>
                   </div>
                </motion.div>
             )}

             {activeTab === "specs" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
                   <table className="w-full text-left">
                     <tbody>
                        {product.specifications.map((spec, i) => (
                            <tr key={i} className="border-b border-white/5 transition-colors hover:bg-white/5">
                                <td className="py-5 text-xs font-black uppercase tracking-widest text-white/40">{spec.label}</td>
                                <td className="py-5 text-sm font-bold text-white">{spec.value}</td>
                            </tr>
                        ))}
                     </tbody>
                   </table>
                </motion.div>
             )}

             {activeTab === "reviews" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16">
                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                      <div className="glass-card rounded-[2.5rem] p-10 text-center flex flex-col justify-center items-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Average Rating</p>
                        <h2 className="text-7xl font-display font-black text-primary mb-4">{product.rating}</h2>
                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={cn("w-5 h-5", i < Math.floor(product.rating) ? "text-yellow-500 fill-yellow-500" : "text-white/20")} />
                            ))}
                        </div>
                        <p className="text-sm font-bold text-white/40">Based on {product.reviewCount} customer reviews</p>
                      </div>

                      <div className="lg:col-span-2 flex flex-col justify-center space-y-4">
                        {[5, 4, 3, 2, 1].map((star) => (
                           <div key={star} className="flex items-center gap-4">
                              <span className="w-12 text-xs font-black text-white/40 uppercase tracking-widest">{star} Stars</span>
                              <div className="flex-grow bg-white/5 h-2 rounded-full overflow-hidden">
                                 <motion.div 
                                    initial={{ width: 0 }} 
                                    animate={{ width: star === 5 ? "85%" : star === 4 ? "10%" : "2%" }} 
                                    className="h-full bg-primary"
                                 ></motion.div>
                              </div>
                              <span className="w-12 text-right text-xs font-bold text-white/60">{star === 5 ? "85%" : star === 4 ? "10%" : "2%"}</span>
                           </div>
                        ))}
                      </div>
                   </div>

                   <div className="space-y-12">
                      <div className="flex justify-between items-center px-2">
                        <h3 className="text-xl font-display font-black uppercase tracking-widest">Recent <span className="text-primary italic">Feedback</span></h3>
                        {!user ? (
                           <p className="text-[10px] font-black font-mono text-primary animate-pulse uppercase tracking-[0.2em]">Login to write a review</p>
                        ) : (
                           <button className="bg-primary/10 text-primary border border-primary/20 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all">Submit Review</button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {reviews.length > 0 ? reviews.map(review => (
                           <div key={review.id} className="bg-[#111] border border-[#1f1f1f] rounded-3xl p-8 hover:border-[#a3e635]/30 transition-all">
                              <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-[#0a0a0a] rounded-full overflow-hidden border border-[#1f1f1f] flex items-center justify-center font-display font-black text-[#a3e635] uppercase">
                                    {review.userName.charAt(0)}
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-sm uppercase tracking-tight">{review.userName}</h4>
                                    <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">{review.date}</p>
                                  </div>
                                </div>
                                {review.isVerified && (
                                  <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-green-500/20">
                                    Verified Buyer
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-0.5 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={cn("w-3 h-3", i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-white/10")} />
                                ))}
                              </div>
                              <h5 className="font-black text-white text-lg uppercase tracking-tight mb-3 truncate">{review.title}</h5>
                              <p className="text-sm text-white/50 leading-relaxed font-medium mb-6 line-clamp-3">{review.text}</p>
                              <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                                 <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-primary transition-colors">
                                    <ThumbsUp className="w-3 h-3" /> Helpful ({review.helpfulVotes})
                                 </button>
                                 <button className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-red-500 transition-colors">Report</button>
                              </div>
                           </div>
                        )) : (
                            <div className="col-span-full py-20 text-center opacity-30">
                                <MessageSquare className="w-16 h-16 mx-auto mb-6" />
                                <p className="font-display font-black uppercase tracking-widest">No reviews yet for this product</p>
                            </div>
                        )}
                      </div>
                   </div>
                </motion.div>
             )}

             {activeTab === "faqs" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-12">
                   <div className="flex justify-between items-center mb-10">
                      <h3 className="text-xl font-display font-black uppercase tracking-widest">Customer <span className="text-primary italic">Q&A</span></h3>
                      {!user ? (
                           <p className="text-[10px] font-black font-mono text-primary animate-pulse uppercase tracking-[0.2em]">Login to ask a question</p>
                        ) : (
                           <button className="bg-primary/10 text-primary border border-primary/20 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all">Ask A Question</button>
                        )}
                   </div>
                   
                   <div className="space-y-8">
                      {product.faqs.length > 0 ? product.faqs.map((faq, i) => (
                         <div key={i} className="bg-[#111] border border-[#1f1f1f] rounded-[2rem] p-8 border-l-4 border-l-[#a3e635]">
                            <div className="flex gap-4 mb-6">
                               <div className="w-8 h-8 rounded-lg bg-[#a3e635] text-black flex items-center justify-center font-black text-xs shrink-0 mt-1">Q</div>
                               <p className="text-lg font-bold uppercase tracking-tight text-white">{faq.q}</p>
                            </div>
                            <div className="flex gap-4 pl-4 border-l border-[#1f1f1f]">
                               <div className="w-8 h-8 rounded-lg bg-[#0a0a0a] text-gray-500 flex items-center justify-center font-black text-xs shrink-0 mt-1">A</div>
                               <p className="text-sm text-gray-500 leading-relaxed font-medium">{faq.a}</p>
                            </div>
                            <div className="mt-8 flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/20 pt-6 border-t border-white/5">
                               <span>Found this helpful?</span>
                               <button className="hover:text-primary transition-colors flex items-center gap-2">
                                  <ThumbsUp className="w-3 h-3" /> Yes (2)
                               </button>
                            </div>
                         </div>
                      )) : (
                        <div className="py-20 text-center opacity-30">
                            <AlertCircle className="w-16 h-16 mx-auto mb-6" />
                            <p className="font-display font-black uppercase tracking-widest text-sm">No questions asked yet</p>
                        </div>
                      )}
                   </div>
                </motion.div>
             )}
          </div>
        </div>

        {/* Section 4: Related Products - Rule 5 scrollable row on mobile */}
        <section className="mt-32">
            <h3 className="text-2xl font-display font-black uppercase tracking-tight mb-10 text-white">Related <span className="text-[#a3e635] italic">Products</span></h3>
            <div className="flex overflow-x-auto snap-x gap-8 pb-8 md:grid md:grid-cols-4 md:pb-0 scrollbar-hide">
                {[
                    { name: "Adidas Match Football", slug: "professional-sialkot-football", price: 4500, category: "Football", image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=400" },
                    { name: "Yonex Arcsaber 11", slug: "olympic-badminton-racket", price: 28000, category: "Badminton", image: "https://images.unsplash.com/photo-1617083270696-082421967b7e?q=80&w=400" },
                    { name: "SS Pro Batting Gloves", slug: "ss-ton-player-edition-bat", price: 3500, category: "Cricket", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=400" },
                    { name: "Puma Future Boots", slug: "sports-running-shoes-x1", price: 18500, category: "Football", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400" }
                ].map((item, i) => (
                    <Link to={`/product/${item.slug}`} key={i} className="min-w-[280px] snap-start bg-[#111] border border-[#1f1f1f] rounded-3xl p-6 group hover:translate-y-[-8px] transition-all duration-500">
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-[#0a0a0a]">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a3e635] mb-2">{item.category}</p>
                        <h4 className="font-bold text-sm uppercase tracking-tight mb-4 group-hover:text-[#a3e635] transition-colors text-white">{item.name}</h4>
                        <div className="flex justify-between items-center">
                            <span className="font-display font-black text-white">{formatPrice(item.price)}</span>
                            <div className="w-8 h-8 rounded-full bg-[#0a0a0a] border border-[#1f1f1f] flex items-center justify-center group-hover:bg-[#a3e635] group-hover:text-black transition-all">
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>

        {/* Section 5: Trust Banner */}
        <section className="mt-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
            {[
                { icon: ShieldCheck, title: "Secure Checkout", desc: "100% protected payments" },
                { icon: Trophy, title: "Original Gear", desc: "Authentic pro equipment" },
                { icon: Truck, title: "Fast Shipping", desc: "Express delivery in PK" },
                { icon: RotateCcw, title: "Easy Returns", desc: "Hassle-free guarantee" }
            ].map((item, i) => (
                <div key={i} className="text-center group">
                    <div className="w-20 h-20 bg-[#111] border border-[#1f1f1f] rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:bg-[#a3e635] transition-all duration-500 group-hover:scale-110">
                        <item.icon className="w-8 h-8 text-[#a3e635] group-hover:text-black transition-colors" />
                    </div>
                    <h4 className="font-display font-black uppercase tracking-widest text-sm mb-2 text-white">{item.title}</h4>
                    <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                </div>
            ))}
        </section>
      </div>
    </div>
  );
}
