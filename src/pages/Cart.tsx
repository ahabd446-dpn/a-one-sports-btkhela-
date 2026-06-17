import React from "react";
import { Link } from "react-router-dom";
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck,
  CreditCard
} from "lucide-react";
import { useCartStore } from "@/src/store/useCartStore";
import { formatPrice, cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : subtotal === 0 ? 0 : 250;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <Helmet>
          <title>Your Cart | A One Sports Batkhela</title>
        </Helmet>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="w-10 h-10 text-white/20" />
          </div>
          <h2 className="text-3xl font-display font-black uppercase mb-4 tracking-tighter">Your cart is <span className="text-primary italic">empty</span></h2>
          <p className="text-white/40 mb-10 max-w-sm mx-auto font-medium">Looks like you haven't added anything to your kit yet. Let's get you geared up.</p>
          <Link to="/shop" className="inline-flex items-center gap-3 bg-primary text-black px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all transform hover:-translate-y-1">
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <Helmet>
        <title>Shopping Cart | A One Sports Batkhela</title>
      </Helmet>

      <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
        {/* Left Column: Cart Items */}
        <div className="lg:w-2/3 space-y-6">
          <div className="flex justify-between items-end mb-8">
            <h1 className="text-4xl font-display font-black uppercase tracking-tighter">Your <span className="text-primary italic">Kit</span></h1>
            <button 
              onClick={clearCart}
              className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-red-500 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-4 sm:p-6 flex gap-6"
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-[#0a0a0a] shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-sm sm:text-lg uppercase tracking-tight leading-none mb-1 text-white">{item.name}</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#a3e635]">Official Gear</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-600 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-4">
                      <div className="flex items-center gap-4 bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center hover:text-[#a3e635] transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-display font-bold text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:text-[#a3e635] transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-1">Total Price</p>
                        <span className="text-xl font-display font-black text-white">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Order Summary (Sticky) */}
        <div className="lg:w-1/3">
          <div className="sticky top-32 bg-[#111] border border-[#1f1f1f] rounded-3xl p-8 space-y-8">
            <h2 className="text-xl font-display font-black uppercase tracking-widest mb-6">Order <span className="text-[#a3e635] italic">Summary</span></h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold uppercase tracking-widest text-gray-600">Subtotal</span>
                <span className="font-bold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold uppercase tracking-widest text-gray-600">Shipping</span>
                <span className={cn("font-bold", shipping === 0 ? "text-[#a3e635]" : "")}>
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-[10px] font-bold text-[#a3e635]/60 uppercase tracking-widest animate-pulse">
                  Add {formatPrice(5000 - subtotal)} more for FREE delivery
                </p>
              )}
              <div className="pt-6 border-t border-[#1f1f1f] flex justify-between items-center">
                <span className="text-lg font-black uppercase tracking-widest">Total</span>
                <span className="text-3xl font-display font-black text-[#a3e635]">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <Link to="/checkout" className="w-full bg-[#a3e635] text-black py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-white transition-all transform hover:-translate-y-1 shadow-2xl shadow-[#a3e635]/20">
                Proceed To Checkout <ArrowRight className="w-5 h-5" />
              </Link>
              
              <div className="grid grid-cols-2 gap-3">
                 <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-gray-600 bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl p-3">
                    <ShieldCheck className="w-4 h-4 text-[#a3e635]" /> 100% Secure
                 </div>
                 <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-gray-600 bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl p-3">
                    <Truck className="w-4 h-4 text-[#a3e635]" /> Fast Shipping
                 </div>
                 <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-gray-600 bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl p-3">
                    <CreditCard className="w-4 h-4 text-[#a3e635]" /> Easy Checkout
                 </div>
                 <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-gray-600 bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl p-3">
                    <ShoppingBag className="w-4 h-4 text-[#a3e635]" /> Pro Gear
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
