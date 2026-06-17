import { Trophy, ChevronRight, Star, ShoppingBag, ShieldCheck, Truck, Zap, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { cn, formatPrice } from "@/src/lib/utils";

import { useProductStore } from "@/src/store/useProductStore";

const categories = [
  { name: "Cricket", icon: Trophy, count: "120+ Products", color: "from-primary/20" },
  { name: "Football", icon: Star, count: "45+ Products", color: "from-blue-500/20" },
  { name: "Badminton", icon: Zap, count: "30+ Products", color: "from-yellow-500/20" },
  { name: "Shoes", icon: ShoppingBag, count: "60+ Products", color: "from-red-500/20" }
];

export function Home() {
  const products = useProductStore((state) => state.products);
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative min-h-[55vh] md:min-h-[65vh] flex items-start pt-4 sm:pt-6 md:pt-8 pb-10 sm:pb-16 md:pb-20 lg:pb-24 overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover opacity-20 scale-105"
            alt="Sports Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-2 sm:pt-4">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 text-primary font-bold tracking-[0.25em] text-[10px] sm:text-xs uppercase mb-3">
                <span className="w-8 sm:w-16 h-[2px] bg-primary"></span>
                Official Store of Batkhela
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black leading-[0.95] sm:leading-[0.9] tracking-tighter mb-4 selection:text-black uppercase">
                FUEL YOUR <br />
                <span className="text-primary italic">CHAMPION</span> <br />
                WITHIN
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-white/70 mb-6 max-w-xl leading-relaxed font-medium"
            >
              Equipping the athletes of Batkhela with international standard sports gear. From Professional Cricket Bats to Sialkot-made Footballs, we bring the pro game to you.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-start gap-4 sm:gap-5 w-full sm:w-auto"
            >
              <Link to="/shop" className="w-full sm:w-auto bg-primary text-black px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[11px] sm:text-xs flex items-center justify-center gap-2.5 hover:bg-white transition-all transform hover:-translate-y-0.5 shadow-[0_10px_25px_-10px_rgba(163,230,53,0.5)]">
                Shop Premium Gear <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link to="/categories" className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[11px] sm:text-xs flex items-center justify-center gap-2.5 hover:bg-white/10 transition-all backdrop-blur-md">
                Explore Categories
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 mt-8 sm:mt-12">
        <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          <div className="glass-card p-3 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-center gap-3 sm:gap-6 group hover:border-primary/50 transition-all">
            <div className="bg-primary/10 p-2 sm:p-4 rounded-lg sm:rounded-xl text-primary group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5 sm:w-8 sm:h-8" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-[10px] sm:text-base md:text-lg text-white">Genuine</h3>
              <p className="text-[8px] sm:text-xs text-white/50 hidden xs:block mt-0.5 sm:mt-1">100% Authorized</p>
            </div>
          </div>
          <div className="glass-card p-3 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-center gap-3 sm:gap-6 group hover:border-primary/50 transition-all">
            <div className="bg-primary/10 p-2 sm:p-4 rounded-lg sm:rounded-xl text-primary group-hover:scale-110 transition-transform">
              <Truck className="w-5 h-5 sm:w-8 sm:h-8" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-[10px] sm:text-base md:text-lg text-white">Fast Ship</h3>
              <p className="text-[8px] sm:text-xs text-white/50 hidden xs:block mt-0.5 sm:mt-1">Across Pakistan</p>
            </div>
          </div>
          <div className="glass-card p-3 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-center gap-3 sm:gap-6 group hover:border-primary/50 transition-all">
            <div className="bg-primary/10 p-2 sm:p-4 rounded-lg sm:rounded-xl text-primary group-hover:scale-110 transition-transform">
              <Star className="w-5 h-5 sm:w-8 sm:h-8" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-[10px] sm:text-base md:text-lg text-white">Advice</h3>
              <p className="text-[8px] sm:text-xs text-white/50 hidden xs:block mt-0.5 sm:mt-1">Expert Guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - Rule 4 spacing */}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a3e635] mb-2">Editor's Choice</p>
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter text-white">Pro <span className="text-[#a3e635] italic">Selection</span></h2>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#a3e635] hover:text-white transition-colors">
              Explore Collection <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {featuredProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
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
                    <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-white text-black p-1.5 sm:p-2 rounded-lg opacity-0 sm:group-hover:opacity-100 transition-opacity transform translate-y-2 sm:group-hover:translate-y-0 hidden sm:block">
                      <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-[#a3e635] font-bold uppercase tracking-widest mb-1">{product.category}</p>
                  <h3 className="font-bold text-xs sm:text-base md:text-lg mb-1 sm:mb-2 line-clamp-2 text-white min-h-[2.5rem] sm:min-h-0">{product.name}</h3>
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
        </div>
      </section>

      {/* Category Grid - Rule 4 spacing */}
      <section className="bg-[#111] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-black mb-4 uppercase text-white">SHOP BY <span className="text-[#a3e635] italic">SPORT</span></h2>
            <p className="text-gray-500 font-medium">Professional gear for every discipline</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat, idx) => (
              <Link 
                key={cat.name} 
                to={`/categories/${cat.name.toLowerCase()}`}
                className={cn(
                  "p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br transition-all hover:-translate-y-2 group relative overflow-hidden",
                  cat.color,
                  "border border-white/5 hover:border-primary/50"
                )}
              >
                <cat.icon className="w-8 h-8 sm:w-12 sm:h-12 text-primary mb-4 sm:mb-6 group-hover:rotate-12 transition-transform" />
                <h3 className="text-lg sm:text-2xl font-display font-extrabold mb-1 sm:mb-2">{cat.name}</h3>
                <p className="text-xs sm:text-sm text-white/50">{cat.count}</p>
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <cat.icon className="w-24 h-24 sm:w-32 sm:h-32" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Locations */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="glass-card rounded-3xl sm:rounded-[2.5rem] md:rounded-[3rem] p-6 sm:p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10 blur-3xl rounded-full"></div>
          
          <div className="flex-1 w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-4 sm:mb-6 uppercase text-white">VISIT OUR <br /><span className="text-primary italic">STORE</span></h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex gap-3 sm:gap-4">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-base sm:text-lg text-white">Batkhela Center</h4>
                  <p className="text-xs sm:text-sm text-white/60 mt-0.5 sm:mt-1">Main Bazar Batkhela, Khyber Pakhtunkhwa, Pakistan</p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-base sm:text-lg text-white">Hours</h4>
                  <p className="text-xs sm:text-sm text-white/60 mt-0.5 sm:mt-1">Mon - Sun: 8 AM - 8 PM (Fri: 8 AM - 12 PM)</p>
                </div>
              </div>
            </div>
            <Link to="/contact" className="inline-block text-center w-full sm:w-auto mt-6 sm:mt-10 bg-white text-black px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-primary transition-all">
              Get Directions
            </Link>
          </div>

          <div className="flex-1 w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden border border-white/10">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13146.402434407335!2d71.9575195!3d34.6148384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dc2ec1d4f64d4b%3A0xc3c509373ea2f6bf!2sBatkhela%2C%20Malakand%2C%20Khyber%20Pakhtunkhwa!5e0!3m2!1sen!2spk!4v1718395000000!5m2!1sen!2spk" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
